import { useState } from 'react';
import BookmarkCategory from '@/components/bookmark/BookmarkCategory';
import { mockVideos } from '@/mocks/mockVideos';
import BookmarkHeader from '@/components/bookmark/BookmarkHeader';
import BookmarkItem from '@/components/bookmark/BookmarkItem';
import BookmarkCategoryList from '@/components/bookmark/BookmarkCategoryList';

const BookmarkCategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredVideos = mockVideos.filter(video => {
    if (selectedCategory === '전체' && video.is_bookmarked === true)
      return true;
    return video.hash_tag.includes(selectedCategory);
  });

  return (
    <main className="flex flex-col gap-2">
      <BookmarkCategory
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BookmarkHeader />
      <div className="flex h-[30vh] w-full flex-col gap-5 overflow-y-auto">
        {filteredVideos.map(video => (
          <div key={video.video_id}>
            <div className="pointer-events-none flex-1 overflow-hidden">
              <BookmarkItem {...video} />
            </div>
          </div>
        ))}
      </div>
      <hr className="border-gray my-3 border"></hr>
      <p className="text-base font-bold">북마크 카테고리</p>
      <div className="flex h-[32vh] w-full flex-col gap-1 overflow-y-auto">
        <BookmarkCategoryList />
      </div>
    </main>
  );
};

export default BookmarkCategoryPage;
