import { IoHeartOutline } from 'react-icons/io5';
import { VscComment } from 'react-icons/vsc';

import { formatNumber } from '@/utils/formatNumber';
import { Comment } from '@/types/comment';

type MyPageVideoStatsParops = {
  comments: Comment[];
  like_heart: number;
};
const MyPageVideoStats = ({ comments, like_heart }: MyPageVideoStatsParops) => {
  return (
    <div className="flex items-center gap-2 text-gray">
      <div className="flex items-center">
        <IoHeartOutline size={16} className="mr-1" />
        <span className="text-xs">{formatNumber(like_heart)}</span>
      </div>

      <div className="flex items-center">
        <VscComment size={16} className="mr-1" />
        <span className="text-xs">{formatNumber(comments.length)}</span>
      </div>
    </div>
  );
};

export default MyPageVideoStats;
