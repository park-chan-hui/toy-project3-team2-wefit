import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchThumbStatus, toggleThumb } from '@/api/comments-thumb';
import { ThumbType } from '@/types/comment';
import { useUsers } from '@/hooks/useUsers';

const useCommentsThumb = (
  id: string,
  commentId: string,
  videoId: string,
  isReply = false,
) => {
  const queryClient = useQueryClient();
  const { currentUserQuery } = useUsers();
  const userId = currentUserQuery.data?.user_id;

  // 현재 유저의 좋아요/싫어요 상태 조회
  const { data: thumbStatus } = useQuery({
    queryKey: ['commentThumb', id, commentId, userId, isReply],
    queryFn: () => fetchThumbStatus(id, commentId, userId, isReply),
    enabled: !!userId,
  });

  // 좋아요/싫어요 토글
  const { mutateAsync: toggleThumbAsync, isPending: isTogglingThumb } =
    useMutation({
      mutationFn: async ({ thumbType }: { thumbType: ThumbType }) =>
        toggleThumb(id, commentId, userId, thumbType, isReply),
      onSuccess: newThumbType => {
        // 좋아요/싫어요 상태 업데이트
        queryClient.setQueryData(
          ['commentThumb', id, commentId, userId, isReply],
          newThumbType
            ? {
                comment_id: commentId,
                reply_id: isReply ? id : null,
                user_id: userId,
                thumb_type: newThumbType,
              }
            : null,
        );

        queryClient.invalidateQueries({
          queryKey: ['comments', videoId],
        });
      },
    });

  const handleThumbClick = async (thumbType: ThumbType) => {
    if (isTogglingThumb) return;
    await toggleThumbAsync({ thumbType });
  };

  return {
    thumbStatus,
    handleThumbClick,
    isTogglingThumb,
  };
};

export { useCommentsThumb };
