import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';

import { useCommentStore } from '@/store/useCommentStore';
import { CommentActionsProps } from '@/types/comment';
import { formatNumber } from '@/utils/formatNumber';
import { useCommentsThumb } from '@/hooks/useCommentsThumb';
import { cn } from '@/utils/cn';

const CommentActions = ({
  thumb_up,
  thumb_down,
  hasReplies,
  comment_id,
  original_comment_id,
  isExpanded,
  videoId,
  isReply = false,
}: CommentActionsProps) => {
  const { toggleReplies, setInputFocus, setActiveCommentId } =
    useCommentStore();
  const { thumbStatus, handleThumbClick, isTogglingThumb } = useCommentsThumb(
    comment_id,
    original_comment_id,
    videoId,
    isReply,
  );

  const handleReplyClick = () => {
    setActiveCommentId(comment_id);
    setInputFocus(true);
  };

  return (
    <div className="flex items-center gap-4 text-sm text-gray">
      <button
        onClick={() => handleThumbClick('up')}
        className={cn(
          'flex items-center gap-1 transition-colors duration-300 hover:text-primary',
          thumbStatus?.thumb_type === 'up' && 'text-primary',
        )}
        disabled={isTogglingThumb}
      >
        <IoMdThumbsUp size={14} />
        <span>{formatNumber(thumb_up)}</span>
      </button>

      <button
        onClick={() => handleThumbClick('down')}
        className={cn(
          'flex items-center gap-1 transition-colors duration-300 hover:text-primary',
          thumbStatus?.thumb_type === 'down' && 'text-primary',
        )}
        disabled={isTogglingThumb}
      >
        <IoMdThumbsDown size={14} />
        <span>{formatNumber(thumb_down)}</span>
      </button>

      {!isReply && (
        <button
          onClick={handleReplyClick}
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
