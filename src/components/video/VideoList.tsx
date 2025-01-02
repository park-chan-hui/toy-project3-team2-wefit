import VideoItem from './VideoItem';
import { VideoProps } from '@/types/video';

interface VideoListProps {
  videos: VideoProps[];
}

const VideoList = ({ videos }: VideoListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {videos.map(video => (
        <VideoItem key={video.video_id} {...video} />
      ))}
    </div>
  );
};

export default VideoList;
