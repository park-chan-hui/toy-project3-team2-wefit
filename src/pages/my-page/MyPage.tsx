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
import { Link } from 'react-router-dom';

const MyPage = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const { MY_UPLOAD_VIDEO } = ROUTER_PATH;
  const { currentUserQuery } = useUsers();
  const { data: currentUserData, isLoading: userDataLoading } =
    currentUserQuery;

  const myUploadVideos = currentUserData?.my_upload_video || [];
  const myWatchedVideos = currentUserData?.my_watched_video || [];

  // 비디오 쿼리 실행 (조건부로 실행)
  const { videoQuery: myUploadVideoQuery } = useVideos(myUploadVideos);
  const { data: uploadVideosData, isLoading: myuploadLoding } =
    myUploadVideoQuery;

  const { videoQuery: myWatchedVideoQuery } = useVideos(myWatchedVideos);
  const { data: watchedVideosData, isLoading: myWatchedLoding } =
    myWatchedVideoQuery;

  if (userDataLoading || myuploadLoding || myWatchedLoding) {
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
        {!watchedVideosData ? (
          <EmptyResult message="영상이 아무것도 없어요!" />
        ) : (
          <WatchedVideoList videos={[]} />
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
        {!uploadVideosData ? (
          <EmptyResult message="영상이 아무것도 없어요!" />
        ) : (
          <MyPageUploadVideoList videos={uploadVideosData} />
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
