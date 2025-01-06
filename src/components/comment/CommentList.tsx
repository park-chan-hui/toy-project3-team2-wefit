import CommentItem from './CommentItem';
import { CommentListProps } from '@/types/comment';

const CommentList = ({
  comments,
  expandedComments,
  onToggle,
}: CommentListProps) => {
  return (
    <ul className="space-y-6">
      {comments.map(comment => {
        const hasReplies = comment.replies && comment.replies.length > 0;
        const isExpanded = expandedComments.includes(comment.comment_id);
        const isShowReplies = hasReplies && isExpanded;

        return (
          <li key={comment.comment_id}>
            <CommentItem
              comment={comment}
              expandedComments={expandedComments}
              onToggle={onToggle}
            />

            {isShowReplies && (
              <ul className="space-y-6">
                {comment.replies.map(reply => (
                  <li key={reply.reply_id}>
                    <CommentItem
                      comment={reply}
                      isReply={true}
                      expandedComments={expandedComments}
                      onToggle={onToggle}
                    />
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
