import { VideoProps } from '@/types/video';
import MyPageVideoItem from './MyPageVideoItem';

type UploadVideoListProps = {
  videos: VideoProps[];
};

const UploadVideoList = ({ videos }: UploadVideoListProps) => {
  return (
    <div className="flex gap-4 overflow-scroll [&::-webkit-scrollbar]:hidden">
      {videos.map((video: VideoProps) => (
        <div className="flex flex-col" key={video.video_id}>
          <MyPageVideoItem {...video} myUploadVideos />
        </div>
      ))}
    </div>
  );
};

export default UploadVideoList;
