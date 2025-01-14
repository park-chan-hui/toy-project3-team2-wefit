import MyUploadVideoList from '@/components/my-page/MyUploadVideoList';
import { useVideos } from '@/hooks/useVideos';
import { useUserStore } from '@/store/useUserStore';

const MyUploadVideoPage = () => {
  const currentUserData = useUserStore(state => state.user!);
  const { userUploadedVideosQuery: myUploadVideos } = useVideos({
    userId: currentUserData.user_id,
  });
  const { data: uploadVideos } = myUploadVideos;

  return (
    <main>
      <p className="mb-4 text-lg font-bold">내가 업로드한 동영상</p>

      <MyUploadVideoList videos={uploadVideos!} />
    </main>
  );
};

export default MyUploadVideoPage;
