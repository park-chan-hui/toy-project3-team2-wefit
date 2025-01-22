import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchBookmarkCheck,
  fetchBookmarkStatus,
  toggleBookmark,
} from '@/api/bookmarks';
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
    isBookmarkLoading:
      bookmarkQuery.isLoading || toggleBookmarkMutation.isPending,
  };
};

export const useBookmarkCheck = (userId: string) => {
  const bookmarkQuery = useQuery({
    queryKey: ['bookmarkCheck', userId],
    queryFn: () => fetchBookmarkCheck(userId),
    select: data =>
      Array.isArray(data)
        ? data.map(bookmark => ({
            ...bookmark,
            created_at: new Date(bookmark.created_at),
          }))
        : [], // 데이터가 배열이 아닐 경우 빈 배열 반환
    enabled: !!userId,
  });

  return bookmarkQuery;
};
