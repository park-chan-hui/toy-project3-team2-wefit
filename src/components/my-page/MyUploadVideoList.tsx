import { VideoListProps } from '@/types/video';
import MyUploadVideoItem from './MyUploadVideoItem';

const MyUploadVideoList = ({ videos }: VideoListProps) => {
  return (
    <div className="flex flex-col gap-5">
      {videos.map(video => (
        <MyUploadVideoItem key={video.video_id} {...video} />
      ))}
    </div>
  );
};

export default MyUploadVideoList;
