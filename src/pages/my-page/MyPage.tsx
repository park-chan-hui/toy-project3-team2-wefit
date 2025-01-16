import Button from '@/components/common/button/Button';
import EmptyResult from '@/components/empty/EmptyResult';
import MyPageProfile from '@/components/my-page/MyPageProfile';
import MyPageUploadVideoList from '@/components/my-page/MyPageUploadVideoList';
import MyPageUserComments from '@/components/my-page/MyPageUserComments';
import WatchedVideoList from '@/components/my-page/WatchedVideoList';
import MyPageSkeleton from '@/components/skeleton/my-page/MyPageSkeleton';
import { ROUTER_PATH } from '@/constants/constants';
import { useUsers } from '@/hooks/useUsers';
import { useVideoLikes } from '@/hooks/useVideoLikes';
import { useVideos } from '@/hooks/useVideos';
import { useUserStore } from '@/store/useUserStore';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const { MY_UPLOAD_VIDEO } = ROUTER_PATH;
  const { currentUserQuery } = useUsers();
  const { data: currentUserData } = currentUserQuery;
  const setUser = useUserStore(state => state.setUser);
  setUser(currentUserData);

  const { likeVideoListQuery } = useVideoLikes();
  const { data: likeVideoList } = likeVideoListQuery;
  const { selectVideosQuery: myVideoQuery } = useVideos({
    videosId: likeVideoList,
  });
  const { data: likeVideosData, isLoading: likeVideosLoding } = myVideoQuery;

  const { userUploadedVideosQuery: myUploadVideos } = useVideos({
    userId: currentUserData.user_id,
  });
  const { data: uploadVideos, isLoading: myUploadVideosLoding } =
    myUploadVideos;

  if (likeVideosLoding || myUploadVideosLoding) {
    return <MyPageSkeleton />;
  }

  return (
    <main className="flex flex-col gap-2">
      <MyPageProfile userData={currentUserData} />

      <section>
        <p className="text-lg font-bold">내가 좋아요한 동영상</p>
        <hr className="my-2" aria-hidden="true" />
        {!likeVideosData ? (
          <EmptyResult message="영상 데이터가 없거나 불러오는 데 실패했어요 새로고침 해주세요!" />
        ) : (
          <WatchedVideoList videos={likeVideosData} />
        )}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">내가 업로드한 동영상</p>
          <Link to={MY_UPLOAD_VIDEO}>
            <Button size="small">더보기</Button>
          </Link>
        </div>
        <hr className="my-2" aria-hidden="true" />
        {!uploadVideos ? (
          <EmptyResult message="영상 데이터가 없거나 불러오는 데 실패했어요 새로고침 해주세요!" />
        ) : (
          <MyPageUploadVideoList videos={uploadVideos} />
        )}
      </section>

      <MyPageUserComments userId={currentUserData.user_id} />
    </main>
  );
};

export default MyPage;
