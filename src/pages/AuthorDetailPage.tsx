import { useParams } from 'react-router-dom';

import Button from '@/components/common/button/Button';
import VideoList from '@/components/video/VideoList';
import AuthorProfile from '@/components/author/AuthorProfile';
import { mockUsers } from '@/mocks/mockUsers';
import { mockVideos } from '@/mocks/mockVideos';

const AuthorDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const author = mockUsers.find(user => user.user_id === userId);
  const authorVideos = mockVideos.filter(video => video.user_id === userId);

  if (!author) {
    return (
      <main className="p-4">
        <h1>존재하지 않는 유저입니다.</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col">
      <AuthorProfile author={author} authorVideos={authorVideos} />
      <hr className="my-3" aria-hidden="true" />

      <section aria-label="업로드한 영상 목록">
        <header className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            작성자가 업로드한 영상 ({authorVideos.length}개)
          </h2>
          <nav className="flex items-center gap-2">
            <Button variant="outline" size="small">
              최신순
            </Button>
            <Button variant="outline" size="small">
              인기순
            </Button>
          </nav>
        </header>
        <VideoList videos={authorVideos} />
      </section>
    </main>
  );
};

export default AuthorDetailPage;
