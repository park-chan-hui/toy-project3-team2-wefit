import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchVideoLikeStatus,
  fetchVideoLikesCount,
  toggleVideoLike,
} from '@/api/video-likes';
import { useUsers } from './useUsers';
import { toastSuccess, toastError } from '@/utils/toast';

const useVideoLikes = (videoId: string) => {
  const queryClient = useQueryClient();
  const { currentUserQuery } = useUsers();

  const likeQuery = useQuery({
    queryKey: ['videoLike', videoId, currentUserQuery.data?.user_id],
    queryFn: () =>
      fetchVideoLikeStatus(currentUserQuery.data?.user_id, videoId),
    enabled: !!currentUserQuery.data?.user_id,
  });

  const likesCountQuery = useQuery({
    queryKey: ['videoLikesCount', videoId],
    queryFn: () => fetchVideoLikesCount(videoId),
  });

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleVideoLike(currentUserQuery.data?.user_id, videoId),
    onSuccess: isLiked => {
      queryClient.invalidateQueries({
        queryKey: ['videoLike', videoId, currentUserQuery.data?.user_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['videoLikesCount', videoId],
      });

      toastSuccess(
        isLiked
          ? '해당 영상에 좋아요를 눌렀어요!'
          : '해당 영상 좋아요를 취소했어요!',
      );
    },
    onError: error => {
      toastError('좋아요를 누르는 데 실패했어요!');
      console.error('좋아요를 누르는 데 실패했어요: ', error);
    },
  });

  return {
    isLiked: likeQuery.data,
    likesCount: likesCountQuery.data,
    toggleLike: toggleLikeMutation.mutateAsync,
    isLikeLoading: likeQuery.isLoading || likesCountQuery.isLoading,
  };
};

export { useVideoLikes };
