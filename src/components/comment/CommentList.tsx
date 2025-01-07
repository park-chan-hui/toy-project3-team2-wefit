import CommentItem from './CommentItem';
import { useCommentStore } from '@/store/useCommentStore';
import { cn } from '@/utils/cn';

const CommentList = () => {
  const { comments, expandedComments } = useCommentStore();

  return (
    <ul className="space-y-6">
      {comments.map(comment => {
        const hasReplies = comment.replies && comment.replies.length > 0;
        const isExpanded = expandedComments.includes(comment.comment_id);

        return (
          <li key={comment.comment_id}>
            <CommentItem comment={comment} />
            {hasReplies && (
              <ul
                className={cn(
                  'origin-top space-y-6 overflow-hidden transition-all duration-300',
                  isExpanded
                    ? 'max-h-[1000px] opacity-100'
                    : 'max-h-0 opacity-0',
                )}
              >
                {comment.replies.map(reply => (
                  <li key={reply.reply_id}>
                    <CommentItem comment={reply} isReply={true} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
