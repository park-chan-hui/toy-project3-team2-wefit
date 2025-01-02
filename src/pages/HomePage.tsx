import VideoCategory from '@/components/video/VideoCategory';
import VideoList from '@/components/video/VideoList';
import { mockVideos } from '@/mocks/mockVideos';

const HomePage = () => {
  return (
    <main className="flex flex-col gap-2">
      <VideoCategory />
      <VideoList videos={mockVideos} />
    </main>
  );
};

export default HomePage;
