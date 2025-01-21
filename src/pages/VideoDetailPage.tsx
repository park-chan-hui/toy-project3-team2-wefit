import { useParams } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';
import VideoItem from '@/components/video/VideoItem';
import VideoComment from '@/components/comment/VideoComment';
import VideoItemSkeleton from '@/components/skeleton/video/VideoItemSkeleton';

import { useVideos } from '@/hooks/useVideos';

const VideoDetailPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { videoQuery } = useVideos({ videoId });

  const { data: video, isLoading, isError } = videoQuery;

  if (!videoId) return <NotFoundPage />;
  if (isLoading) return <VideoItemSkeleton />;
  if (isError || !video) return <NotFoundPage />;

  return (
    <>
      <VideoItem {...video} isVideoDetailPage />
      <VideoComment videoId={videoId} />
    </>
  );
};

export default VideoDetailPage;
