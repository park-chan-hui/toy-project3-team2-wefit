import { useParams } from 'react-router-dom';

import VideoItem from '@/components/video/VideoItem';
import VideoComment from '@/components/comment/VideoComment';
import { mockVideos } from '@/mocks/mockVideos';
import { VideoProps } from '@/types/video';

const VideoDetailPage = () => {
  const { videoId } = useParams<{ videoId: string }>();

  const videoData = mockVideos.find(
    video => video.video_id === videoId,
  ) as VideoProps;

  if (!videoId || !videoData) {
    return null;
  }

  return (
    <>
      <VideoItem {...videoData} isVideoDetailPage />
      <VideoComment videoId={videoId} />
    </>
  );
};

export default VideoDetailPage;
