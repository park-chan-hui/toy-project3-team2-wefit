import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleFollowButton, fetchFollowStatus } from '@/api/user-follow';
import { useUsers } from '@/hooks/useUsers';
import { toastSuccess, toastError } from '@/utils/toast';

export const useFollow = (targetUserId: string) => {
  const queryClient = useQueryClient();
  const { currentUserQuery } = useUsers();

  const followQuery = useQuery({
    queryKey: ['follow', targetUserId, currentUserQuery.data?.user_id],
    queryFn: () =>
      fetchFollowStatus(currentUserQuery.data!.user_id, targetUserId),
    enabled:
      !!currentUserQuery.data && currentUserQuery.data.user_id !== targetUserId,
  });

  const toggleFollowMutation = useMutation({
    mutationFn: () => {
      if (currentUserQuery.data?.user_id === targetUserId) {
        throw new Error('SELF_FOLLOW_ERROR');
      }
      return toggleFollowButton(currentUserQuery.data!.user_id, targetUserId);
    },
    onSuccess: isFollowing => {
      // 팔로우 상태 갱신
      queryClient.invalidateQueries({
        queryKey: ['follow', targetUserId, currentUserQuery.data?.user_id],
      });
      // 유저 정보 갱신
      queryClient.invalidateQueries({
        queryKey: ['user', targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ['user', currentUserQuery.data?.user_id],
      });

      toastSuccess(isFollowing ? '팔로우했어요!' : '팔로우를 취소했어요!');
    },
    onError: error => {
      if (error.message === 'SELF_FOLLOW_ERROR') {
        toastError('자기 자신을 팔로우할 수 없어요!');
      } else {
        toastError('팔로우 처리에 실패했어요. 다시 시도해주세요!');
        console.error('팔로우 처리 실패:', error);
      }
    },
  });

  return {
    isFollowing: followQuery.data ?? false,
    toggleFollow: toggleFollowMutation.mutateAsync,
    isFollowLoading: followQuery.isLoading || toggleFollowMutation.isPending,
  };
};
