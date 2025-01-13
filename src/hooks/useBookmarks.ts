import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchBookmarkStatus, toggleBookmark } from '@/api/bookmarks';
import { useUsers } from '@/hooks/useUsers';
import { toastSuccess, toastError } from '@/utils/toast';

export const useBookmark = (videoId: string) => {
  const queryClient = useQueryClient();
  const { currentUserQuery } = useUsers();

  const bookmarkQuery = useQuery({
    queryKey: ['bookmark', videoId, currentUserQuery.data?.user_id],
    queryFn: () => fetchBookmarkStatus(currentUserQuery.data!.user_id, videoId),
    enabled: !!currentUserQuery.data,
  });

  const toggleBookmarkMutation = useMutation({
    mutationFn: () => toggleBookmark(currentUserQuery.data!.user_id, videoId),
    onSuccess: isBookmarked => {
      queryClient.invalidateQueries({
        queryKey: ['bookmark', videoId, currentUserQuery.data?.user_id],
      });

      toastSuccess(
        isBookmarked ? '북마크에 추가됐어요!' : '북마크에서 삭제됐어요!',
      );
    },
    onError: error => {
      toastError('북마크 추가에 실패했어요. 다시 시도해주세요!');
      console.error('북마크 추가에 실패했어요. 다시 시도해주세요!', error);
    },
  });

  return {
    isBookmarked: bookmarkQuery.data ?? false,
    toggleBookmark: toggleBookmarkMutation.mutateAsync,
    isLoading: bookmarkQuery.isLoading || toggleBookmarkMutation.isPending,
  };
};
