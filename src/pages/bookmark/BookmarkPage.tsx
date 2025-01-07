import { useState } from 'react';
import BookmarkCategory from '@/components/bookmark/BookmarkCategory';
import EmptyResult from '@/components/empty/EmptyResult';
import { mockBookmarks, mockVideos } from '@/mocks/mockVideos';
import BookmarkHeader from '@/components/bookmark/BookmarkHeader';
import BookmarkCategoryList from '@/components/bookmark/BookmarkCategoryList';
import BookmarkList from '@/components/bookmark/BookmarkList';

const BookmarkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredVideos = mockVideos.filter(video => {
    if (selectedCategory === '전체' || selectedCategory === '북마크만 보기') {
      return video.is_bookmarked === true;
    }
    return video.hash_tag.includes(selectedCategory);
  });

  const filteredBookmarks = mockBookmarks.filter(bookmark => {
    return bookmark;
  });

  return (
    <main className="flex flex-col gap-2">
      <BookmarkCategory
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BookmarkHeader
        title={
          selectedCategory === '전체' || selectedCategory === '북마크만 보기'
            ? '나의 북마크 목록'
            : '북마크 카테고리'
        }
      />
      {!filteredVideos.length && !filteredBookmarks.length ? (
        <EmptyResult
          message={
            selectedCategory === '카테고리'
              ? '카테고리를 추가해볼까요?'
              : '북마크를 추가해볼까요?'
          }
        />
      ) : (
        <>
          {selectedCategory === '전체' && (
            <>
              <div className="flex h-[30vh] w-full flex-col gap-5 overflow-y-auto">
                <BookmarkList videos={filteredVideos} />
              </div>
              <hr className="border-gray my-3 border" />
              <p className="text-large font-bold text-black">북마크 카테고리</p>
              <div className="flex w-full flex-col gap-1 overflow-y-auto">
                <BookmarkCategoryList />
              </div>
            </>
          )}

          {selectedCategory === '카테고리' && (
            <div className="flex w-full flex-col gap-1 overflow-y-auto">
              <BookmarkCategoryList />
            </div>
          )}

          {selectedCategory === '북마크만 보기' && (
            <div className="flex w-full flex-col gap-5 overflow-y-auto">
              <BookmarkList videos={filteredVideos} />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default BookmarkPage;
