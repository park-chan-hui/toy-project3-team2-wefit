import { useState } from 'react';
import BookmarkCategory from '@/components/bookmark/BookmarkCategory';
import BookmarkHeader from '@/components/bookmark/BookmarkHeader';
import BookmarkCategoryList from '@/components/bookmark/BookmarkCategoryList';
import BookmarkList from '@/components/bookmark/BookmarkList';
import { useVideos } from '@/hooks/useVideos';
import { VideoProps } from '@/types/video';
import { useUsers } from '@/hooks/useUsers';
import { useBookmarkCheck } from '@/hooks/useBookmarks';

const BookmarkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('북마크');
  const { videosAllQuery } = useVideos();
  const { currentUserQuery } = useUsers();

  const bookmarkQuery = useBookmarkCheck(currentUserQuery.data.user_id);

  const filteredVideos: VideoProps[] =
    videosAllQuery.data?.filter((video: VideoProps) => {
      if (selectedCategory === '북마크') {
        return bookmarkQuery.data?.some(
          bookmark => bookmark.video_id === video.video_id,
        );
      }
    }) || [];

  return (
    <main className="flex flex-col gap-2">
      <BookmarkCategory
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BookmarkHeader
        title={
          selectedCategory === '북마크'
            ? '나의 북마크 목록'
            : '나의 북마크 카테고리'
        }
      />

      {selectedCategory === '북마크' && (
        <div className="flex w-full flex-col gap-5 overflow-y-auto">
          <BookmarkList videos={filteredVideos} />
        </div>
      )}

      {selectedCategory === '카테고리' && (
        <div className="flex w-full flex-col gap-1 overflow-y-auto">
          <BookmarkCategoryList />
        </div>
      )}
    </main>
  );
};

export default BookmarkPage;
