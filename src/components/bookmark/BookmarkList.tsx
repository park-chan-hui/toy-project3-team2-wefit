import BookmarkItem from './BookmarkItem';
import EmptyResult from '@/components/empty/EmptyResult';
import BookmarkItemSkeleton from '@/components/skeleton/bookmark/BookmarkItemSkeleton';

import { useBookmarkCheck } from '@/hooks/useBookmarks';
import { VideoListProps } from '@/types/video';
import { useUsers } from '@/hooks/useUsers';

const BookmarkList = ({ videos }: VideoListProps) => {
  const { currentUserQuery } = useUsers();
  const userId = currentUserQuery.data?.user_id;

  const bookmarkCheckQuery = useBookmarkCheck(userId || '');
  const bookmarkedIds =
    bookmarkCheckQuery.data?.map(bookmark => bookmark.video_id) || [];

  if (currentUserQuery.isLoading || bookmarkCheckQuery.isLoading) {
    return <BookmarkItemSkeleton />;
  }

  const bookmarkedVideos = videos.filter(video =>
    bookmarkedIds.includes(video.video_id),
  );

  const handleToggleBookmark = async () => {
    await bookmarkCheckQuery.refetch();
  };

  return (
    <div className="flex flex-col gap-5">
      {bookmarkedVideos.length === 0 ? (
        <EmptyResult message="북마크를 추가해볼까요?" />
      ) : (
        bookmarkedVideos.map(video => (
          <div key={video.video_id}>
            <BookmarkItem {...video} onToggleBookmark={handleToggleBookmark} />
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkList;
