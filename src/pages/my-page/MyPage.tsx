import Button from '@/components/common/button/Button';
import MyPageProfile from '@/components/my-page/MyPageProfile';
import MyPageVideoList from '@/components/my-page/MyPageVideoList';
import { ROUTER_PATH } from '@/constants/constants';
import { mockUsers } from '@/mocks/mockUsers';
import { mockVideos } from '@/mocks/mockVideos';
import ScrollContainer from 'react-indiana-drag-scroll';
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
    <main>
      <MyPageProfile userData={userData} />

      <section>
        <p className="my-3 text-lg font-bold">내가 시청한 동영상</p>
        <hr className="my-3" aria-hidden="true" />
        <ScrollContainer>
          <MyPageVideoList videos={watchedVideos} />
        </ScrollContainer>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <p className="my-3 text-lg font-bold">내가 업로드한 동영상</p>
          <Link to={MY_UPLOAD_VIDEO}>
            <Button variant="primary">더보기</Button>
          </Link>
        </div>
        <hr className="my-3" aria-hidden="true" />
        <ScrollContainer>
          <MyPageVideoList videos={uploadVideos} myUploadVideos />
        </ScrollContainer>
      </section>

      <section>
        <p className="my-3 text-lg font-bold">내 댓글</p>
        <hr className="my-3" aria-hidden="true" />
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
