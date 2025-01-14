import { useState } from 'react';

import VideoCategory from '@/components/video/VideoCategory';
import VideoList from '@/components/video/VideoList';
import EmptyResult from '@/components/empty/EmptyResult';
import VideoListSkeleton from '@/components/skeleton/video/VideoListSkeleton';
import { useVideos } from '@/hooks/useVideos';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { videosQuery, infiniteScrollRef, isFetchingNextPage, allVideos } =
    useVideos({
      category: selectedCategory,
    });

  const { data, isLoading } = videosQuery;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return (
      <main className="flex flex-col gap-2">
        <VideoCategory
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <VideoListSkeleton />
      </main>
    );
  }

  if (!data?.pages) return <EmptyResult message="영상이 아무것도 없어요!" />;

  return (
    <main className="flex flex-col gap-2">
      <VideoCategory
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {!allVideos.length ? (
        <EmptyResult message="해당 카테고리에 대한 영상이 없어요!" />
      ) : (
        <>
          <VideoList videos={allVideos} />
          <div ref={infiniteScrollRef} className="h-4" />
          {isFetchingNextPage && <VideoListSkeleton />}
        </>
      )}
    </main>
  );
};

export default HomePage;
