import { useState } from 'react';

import { useParams } from 'react-router-dom';

import VideoList from '@/components/video/VideoList';
import VideoSortNav from '@/components/video/VideoSortNav';
import AuthorProfile from '@/components/author/AuthorProfile';
import EmptyResult from '@/components/empty/EmptyResult';
import AuthorProfileSkeleton from '@/components/skeleton/author/AuthorProfileSkeleton';
import VideoListSkeleton from '@/components/skeleton/video/VideoListSkeleton';

import { useVideos } from '@/hooks/useVideos';
import { useUsers } from '@/hooks/useUsers';

const AuthorDetailPage = () => {
  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');
  const { userId } = useParams<{ userId: string }>();
  const { userQuery } = useUsers(userId);
  const { userUploadedVideosQuery } = useVideos({ userId });

  const { data: author, isLoading: isAuthorLoading } = userQuery;
  const { data: authorVideos, isLoading: isVideosLoading } =
    userUploadedVideosQuery;

  if (isAuthorLoading || isVideosLoading) {
    return (
      <main className="flex flex-col">
        <AuthorProfileSkeleton />
        <hr className="my-3" aria-hidden="true" />
        <header className="mb-2 flex items-center justify-between">
          <h2 className="font-bold">작성자가 업로드한 영상</h2>
          <VideoSortNav sortType={sortType} onSortChange={setSortType} />
        </header>
        <VideoListSkeleton />
      </main>
    );
  }

  const sortedVideos = [...(authorVideos || [])].sort((a, b) => {
    if (sortType === 'latest') {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return b.like_heart - a.like_heart;
  });

  return (
    <main className="flex flex-col">
      <AuthorProfile author={author} authorVideos={sortedVideos} />
      <hr className="my-3" aria-hidden="true" />

      <section aria-label="업로드한 영상 목록">
        <header className="mb-2 flex items-center justify-between">
          <h2 className="font-bold">
            작성자가 업로드한 영상 ({sortedVideos.length}개)
          </h2>
          <VideoSortNav sortType={sortType} onSortChange={setSortType} />
        </header>

        {sortedVideos.length > 0 ? (
          <VideoList videos={sortedVideos} />
        ) : (
          <EmptyResult message="작성자가 업로드한 영상이 없어요!" />
        )}
      </section>
    </main>
  );
};

export default AuthorDetailPage;
