import SimpleProfile from '../common/simple-profile/SimpleProfile';
import CommentActions from './CommentActions';
import { CommentItemProps } from '@/types/comment';
import { mockUsers } from '@/mocks/mockUsers';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { cn } from '@/utils/cn';

const CommentItem = ({
  comment,
  isReply = false,
  expandedComments,
  onToggle,
}: CommentItemProps) => {
  const user = mockUsers.find(user => user.user_id === comment.user_id);
  const hasReplies = !isReply && comment.replies && comment.replies.length > 0;
  const isExpanded = expandedComments.includes(comment.comment_id);

  return (
    <section
      className={cn(
        'mx-1 mt-4 flex flex-col gap-1 rounded-sm p-0.5 transition-colors duration-300 hover:bg-gray-100',
        isReply && 'ml-10',
      )}
    >
      <article className="flex items-center justify-between">
        <figure className="flex items-center gap-2">
          {user && (
            <SimpleProfile
              user_id={user.user_id}
              user_image={user.user_image}
              nickname={user.nickname}
            />
          )}
          <span className="text-xs text-gray">
            {getTimeAgo(comment.created_at)}
          </span>
        </figure>
      </article>

      <article className="mx-4 flex flex-col gap-2">
        <p className="whitespace-pre-wrap text-sm">
          {isReply ? comment.reply_comment : comment.comment}
        </p>
        <CommentActions
          thumb_up={comment.thumb_up}
          thumb_down={comment.thumb_down}
          hasReplies={hasReplies}
          comment_id={comment.comment_id}
          isExpanded={isExpanded}
          onToggle={onToggle}
        />
      </article>
    </section>
  );
};

export default CommentItem;
