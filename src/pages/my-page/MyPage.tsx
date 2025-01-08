import Button from '@/components/common/button/Button';
import MyPageProfile from '@/components/my-page/MyPageProfile';
import MyPageUploadVideoList from '@/components/my-page/MyPageUploadVideoList';
import WatchedVideoList from '@/components/my-page/WatchedVideoList';
import { ROUTER_PATH } from '@/constants/constants';
import { mockUsers } from '@/mocks/mockUsers';
import { mockVideos } from '@/mocks/mockVideos';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const userData = mockUsers[0];
  const { MY_UPLOAD_VIDEO } = ROUTER_PATH;
  const watchedVideos = mockVideos.filter(watch =>
    userData.my_watched_video.includes(watch.video_id),
  );
  const uploadVideos = mockVideos.filter(watch =>
    userData.my_watched_video.includes(watch.video_id),
  );
  return (
    <main className="flex flex-col gap-2">
      <MyPageProfile userData={userData} />

      <section>
        <p className="text-lg font-bold">내가 시청한 동영상</p>
        <hr className="my-2" aria-hidden="true" />
        <WatchedVideoList videos={watchedVideos} />
      </section>

      <section>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">내가 업로드한 동영상</p>
          <Link to={MY_UPLOAD_VIDEO}>
            <Button size="small">더보기</Button>
          </Link>
        </div>
        <hr className="my-2" aria-hidden="true" />
        <MyPageUploadVideoList videos={uploadVideos} />
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
