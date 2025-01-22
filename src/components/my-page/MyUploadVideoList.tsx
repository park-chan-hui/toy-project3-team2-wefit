import MyUploadVideoItem from './MyUploadVideoItem';

import { VideoListProps } from '@/types/video';

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
