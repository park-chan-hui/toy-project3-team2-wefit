import { useState } from 'react';

import VideoCategory from '@/components/video/VideoCategory';
import VideoList from '@/components/video/VideoList';
import EmptyResult from '@/components/empty/EmptyResult';
import VideoListSkeleton from '@/components/skeleton/video/VideoListSkeleton';
import { useVideos } from '@/hooks/useVideos';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { videosQuery } = useVideos();

  const { data: videos, isLoading } = videosQuery;

  if (isLoading) {
    return (
      <main className="flex flex-col gap-2">
        <VideoCategory
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <VideoListSkeleton />
      </main>
    );
  }

  if (!videos) return <EmptyResult message="영상이 아무것도 없어요!" />;

  const filteredVideos = videos.filter(video => {
    if (selectedCategory === '전체') return true;
    return video.hash_tag.includes(selectedCategory);
  });

  return (
    <main className="flex flex-col gap-2">
      <VideoCategory
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {!filteredVideos.length ? (
        <EmptyResult message="해당 카테고리에 대한 영상이 없어요!" />
      ) : (
        <VideoList videos={filteredVideos} />
      )}
    </main>
  );
};

export default HomePage;
