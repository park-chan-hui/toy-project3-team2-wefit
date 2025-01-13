import { BsClockHistory } from 'react-icons/bs';
import { IoHeartOutline } from 'react-icons/io5';
import { VscComment } from 'react-icons/vsc';
import { FaStar, FaRegStar } from 'react-icons/fa';

import { useComments } from '@/hooks/useComments';
import { formatNumber } from '@/utils/formatNumber';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { VideoStatsProps } from '@/types/video';

import { useBookmark } from '@/hooks/useBookmarks';

const VideoStats = ({ video_id, created_at, like_heart }: VideoStatsProps) => {
  const { comments } = useComments(video_id);
  const { isBookmarked, toggleBookmark, isLoading } = useBookmark(video_id);

  return (
    <div className="flex items-center gap-2 text-gray">
      <time className="flex items-center">
        <BsClockHistory size={16} className="mr-1" />
        <span className="text-xs">{getTimeAgo(created_at)}</span>
      </time>

      <div className="flex items-center">
        <IoHeartOutline size={16} className="mr-1" />
        <span className="text-xs">{formatNumber(like_heart)}</span>
      </div>

      <div className="flex items-center">
        <VscComment size={16} className="mr-1" />
        <span className="text-xs">{formatNumber(comments.length)}</span>
      </div>

      <button
        onClick={() => toggleBookmark()}
        className="flex items-center"
        disabled={isLoading}
      >
        {isBookmarked ? (
          <FaStar size={16} className="text-primary" />
        ) : (
          <FaRegStar size={16} />
        )}
      </button>
    </div>
  );
};

export default VideoStats;
