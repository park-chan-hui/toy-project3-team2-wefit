import EmptyResult from '@/components/empty/EmptyResult';
import MyUploadVideoList from '@/components/my-page/MyUploadVideoList';
import MyUploadVideoPageListSkeleton from '@/components/skeleton/my-page/MyUploadVideoListSkeleton';

import { useVideos } from '@/hooks/useVideos';
import { useUserStore } from '@/store/useUserStore';

const MyUploadVideoPage = () => {
  const currentUserData = useUserStore(state => state.user!);
  const { userUploadedVideosQuery: myUploadVideos } = useVideos({
    userId: currentUserData.user_id,
  });
  const { data: uploadVideos, isLoading } = myUploadVideos;

  if (isLoading) {
    return <MyUploadVideoPageListSkeleton />;
  }
  return (
    <main>
      <p className="mb-4 text-lg font-bold">내가 업로드한 동영상</p>
      {uploadVideos?.length === 0 ? (
        <EmptyResult message="업로드한 영상이 없어요!" />
      ) : (
        <MyUploadVideoList videos={uploadVideos!} />
      )}
    </main>
  );
};

export default MyUploadVideoPage;
