import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

import { formatNumber } from '@/utils/formatNumber';
import { CommentActionsProps } from '@/types/comment';

const CommentActions = ({
  thumb_up,
  thumb_down,
  hasReplies,
  comment_id,
  isExpanded,
  onToggle,
}: CommentActionsProps) => {
  return (
    <div className="flex items-center gap-4 text-sm text-gray">
      <button className="tansition-colors flex items-center gap-1 duration-300 hover:text-primary">
        <IoMdThumbsUp size={14} />
        <span>{formatNumber(thumb_up)}</span>
      </button>
      <button className="tansition-colors flex items-center gap-1 duration-300 hover:text-primary">
        <IoMdThumbsDown size={14} />
        <span>{formatNumber(thumb_down)}</span>
      </button>

      {hasReplies && (
        <button
          onClick={() => onToggle(comment_id)}
          className="flex items-center gap-1 transition-colors duration-300 hover:text-primary"
        >
          답글{' '}
          {isExpanded ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}
        </button>
      )}
    </div>
  );
};

export default CommentActions;
