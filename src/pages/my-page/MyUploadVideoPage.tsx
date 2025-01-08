import MyUploadVideoList from '@/components/my-page/MyUploadVideoList';
import { mockUsers } from '@/mocks/mockUsers';
import { mockVideos } from '@/mocks/mockVideos';

const MyUploadVideoPage = () => {
  const userData = mockUsers[0];
  const uploadVideos = mockVideos.filter(watch =>
    userData.my_watched_video.includes(watch.video_id),
  );

  return (
    <main>
      <p className="mb-4 text-lg font-bold">내가 업로드한 동영상</p>

      <MyUploadVideoList videos={uploadVideos} />
    </main>
  );
};

export default MyUploadVideoPage;
