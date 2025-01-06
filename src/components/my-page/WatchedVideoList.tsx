import { VideoProps } from '@/types/video';
import MyPageVideoItem from './MyPageVideoItem';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { BsClockHistory } from 'react-icons/bs';

type MyPageVideoProps = {
  videos: VideoProps[];
};

const WatchedVideoList = ({ videos }: MyPageVideoProps) => {
  return (
    <div className="flex gap-4 overflow-scroll [&::-webkit-scrollbar]:hidden">
      {videos.map((video: VideoProps) => (
        <div className="flex flex-col" key={video.video_id}>
          <MyPageVideoItem {...video} />
          <time className="flex flex-row-reverse">
            <span className="text-xs">{getTimeAgo(video.created_at)}</span>
            <BsClockHistory size={16} className="mr-1" />
          </time>
        </div>
      ))}
    </div>
  );
};

export default WatchedVideoList;
