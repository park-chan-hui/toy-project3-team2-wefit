import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';

import { useCommentStore } from '@/store/useCommentStore';
import { CommentActionsProps } from '@/types/comment';
import { formatNumber } from '@/utils/formatNumber';
import { cn } from '@/utils/cn';

const CommentActions = ({
  thumb_up,
  thumb_down,
  hasReplies,
  comment_id,
  isExpanded,
  isReply = false,
}: CommentActionsProps) => {
  const { toggleReplies, setInputFocus } = useCommentStore();

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

      {!isReply && (
        <button
          onClick={() => setInputFocus(true)}
          className="flex items-center gap-1 transition-colors duration-300 hover:text-primary"
        >
          댓글 달기
        </button>
      )}

      {hasReplies && (
        <button
          onClick={() => toggleReplies(comment_id)}
          className="flex items-center gap-1 transition-colors duration-300 hover:text-primary"
        >
          답글{' '}
          <div
            className={cn(
              'transform transition-transform duration-300',
              isExpanded && 'rotate-180',
            )}
          >
            <IoChevronDown size={16} />
          </div>
        </button>
      )}
    </div>
  );
};

export default CommentActions;
