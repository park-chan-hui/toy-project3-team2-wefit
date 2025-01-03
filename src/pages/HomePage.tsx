import { useState } from 'react';

import VideoCategory from '@/components/video/VideoCategory';
import VideoList from '@/components/video/VideoList';
import EmptyResult from '@/components/empty/EmptyResult';
import { mockVideos } from '@/mocks/mockVideos';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredVideos = mockVideos.filter(video => {
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
