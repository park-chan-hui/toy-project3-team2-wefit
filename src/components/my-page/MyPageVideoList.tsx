import { VideoProps } from '@/types/video';
import MyPageVideoItem from './MyPageVideoItem';
import { BsClockHistory } from 'react-icons/bs';
import { getTimeAgo } from '@/utils/getTimeAgo';

type MyPageVideoProps = {
  videos: VideoProps[];
  myUploadVideos?: boolean;
};
const MyPageVideoList = ({ videos, myUploadVideos }: MyPageVideoProps) => {
  return (
    <div className="flex gap-4 overflow-scroll [&::-webkit-scrollbar]:hidden">
      {videos.map((video: VideoProps) => (
        <div className="flex flex-col" key={video.video_id}>
          <MyPageVideoItem {...video} myUploadVideos={myUploadVideos} />
          {!myUploadVideos && (
            <time className="flex flex-row-reverse">
              <span className="text-xs">{getTimeAgo(video.created_at)}</span>
              <BsClockHistory size={16} className="mr-1" />
            </time>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyPageVideoList;
