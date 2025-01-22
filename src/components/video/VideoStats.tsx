import { BsClockHistory } from 'react-icons/bs';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { VscComment } from 'react-icons/vsc';
import { FaStar, FaRegStar } from 'react-icons/fa';

import { useComments } from '@/hooks/useComments';
import { formatNumber } from '@/utils/formatNumber';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { VideoStatsProps } from '@/types/video';
import { useBookmark } from '@/hooks/useBookmarks';
import { useVideoLikes } from '@/hooks/useVideoLikes';

const VideoStats = ({ video_id, created_at }: VideoStatsProps) => {
  const { totalCount } = useComments({ videoId: video_id });
  const { isBookmarked, toggleBookmark, isBookmarkLoading } =
    useBookmark(video_id);
  const { isLiked, likesCount, toggleLike, isLikeLoading } =
    useVideoLikes(video_id);

  return (
    <div className="flex items-center gap-2 text-gray">
      <time className="flex items-center">
        <BsClockHistory size={16} className="mr-1" />
        <span className="text-xs">{getTimeAgo(created_at)}</span>
      </time>

      <button
        onClick={() => toggleLike()}
        disabled={isLikeLoading}
        className="flex items-center"
      >
        {isLiked ? (
          <IoHeart size={16} className="mr-1 text-red-500" />
        ) : (
          <IoHeartOutline size={16} className="mr-1" />
        )}
        <span className="text-xs">{formatNumber(Number(likesCount))}</span>
      </button>

      <div className="flex items-center">
        <VscComment size={16} className="mr-1" />
        <span className="text-xs">{formatNumber(totalCount)}</span>
      </div>

      <button
        onClick={() => toggleBookmark()}
        className="flex items-center"
        disabled={isBookmarkLoading}
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
