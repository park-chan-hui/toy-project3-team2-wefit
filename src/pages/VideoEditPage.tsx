import { useParams } from 'react-router-dom';

import VideoEditSkeleton from '@/components/skeleton/video/VideoEditSkeleton';
import VideoUploadForm from '@/components/video-upload-form/VideoUploadForm';

import { useVideos } from '@/hooks/useVideos';

const VideoEditPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { videoQuery } = useVideos({ videoId });
  const { data: videoData, isLoading } = videoQuery;

  if (isLoading) {
    return <VideoEditSkeleton />;
  }

  return <VideoUploadForm isEditPage videoData={videoData} />;
};

export default VideoEditPage;
