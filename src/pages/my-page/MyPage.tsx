import Button from '@/components/common/button/Button';
import EmptyResult from '@/components/empty/EmptyResult';
import MyPageProfile from '@/components/my-page/MyPageProfile';
import MyPageUploadVideoList from '@/components/my-page/MyPageUploadVideoList';
import WatchedVideoList from '@/components/my-page/WatchedVideoList';
import MyPageProfileSkeleton from '@/components/skeleton/my-page/MyPageProfileSkeleton';
import MyPageVideoListSkeleton from '@/components/skeleton/my-page/MyPageVideoListSkeleton';
import { ROUTER_PATH } from '@/constants/constants';
import { useUsers } from '@/hooks/useUsers';
import { useVideos } from '@/hooks/useVideos';
import { useUserStore } from '@/store/useUserStore';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const { MY_UPLOAD_VIDEO } = ROUTER_PATH;
  const { currentUserQuery } = useUsers();
  const { data: currentUserData, isLoading: userDataLoading } =
    currentUserQuery;
  const setUser = useUserStore(state => state.setUser);
  setUser(currentUserData);

  const myVideoList = [
    ...(currentUserData?.my_upload_video || []),
    ...(currentUserData?.my_watched_video || []),
  ];

  const { selectVideosQuery: myVideoQuery } = useVideos({
    videosId: myVideoList,
  });
  const { data: videosData, isLoading: myVideosLoding } = myVideoQuery;

  const watchedVideos = videosData?.filter(video =>
    currentUserData?.my_watched_video.includes(video.video_id),
  );
  const uploadVideos = videosData?.filter(video =>
    currentUserData?.my_upload_video.includes(video.video_id),
  );

  if (userDataLoading || myVideosLoding) {
    return (
      <main className="flex flex-col gap-2">
        <MyPageProfileSkeleton />

        <section>
          <p className="text-lg font-bold">내가 시청한 동영상</p>
          <hr className="my-2" aria-hidden="true" />
          <MyPageVideoListSkeleton />
        </section>

        <section>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">내가 업로드한 동영상</p>
            <Link to={MY_UPLOAD_VIDEO}>
              <Button size="small">더보기</Button>
            </Link>
          </div>
          <hr className="my-2" aria-hidden="true" />
          <MyPageVideoListSkeleton />
        </section>

        <section>
          <p className="text-lg font-bold">내 댓글</p>
          <hr className="my-2" aria-hidden="true" />
          <div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
              댓글이 달린 동영상: 댓글 동영상
            </p>
            <p className="text-xsmall text-gray">댓글내용</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-2">
      <MyPageProfile userData={currentUserData} />

      <section>
        <p className="text-lg font-bold">내가 시청한 동영상</p>
        <hr className="my-2" aria-hidden="true" />
        {watchedVideos?.length === 0 ? (
          <EmptyResult message="시청 영상이 없어요!" />
        ) : (
          <WatchedVideoList videos={watchedVideos!} />
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
        {uploadVideos?.length === 0 ? (
          <EmptyResult message="업로드한 영상이 없어요!" />
        ) : (
          <MyPageUploadVideoList videos={uploadVideos!} />
        )}
      </section>

      <section>
        <p className="text-lg font-bold">내 댓글</p>
        <hr className="my-2" aria-hidden="true" />
        <div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
            댓글이 달린 동영상: 댓글 동영상
          </p>
          <p className="text-xsmall text-gray">댓글내용</p>
        </div>
      </section>
    </main>
  );
};

export default MyPage;
