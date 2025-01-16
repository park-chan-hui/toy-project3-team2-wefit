import { GoTrash } from 'react-icons/go';

import SimpleProfile from '../common/simple-profile/SimpleProfile';
import CommentActions from './CommentActions';
import { useCommentStore } from '@/store/useCommentStore';
import { useUsers } from '@/hooks/useUsers';
import { CommentItemProps } from '@/types/comment';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { cn } from '@/utils/cn';
import { useComments } from '@/hooks/useComments';

const CommentItem = ({
  comment,
  isReply = false,
  videoId,
}: CommentItemProps) => {
  const { expandedComments } = useCommentStore();
  const { userQuery, currentUserQuery } = useUsers(comment.user_id);
  const { deleteComment, deleteReply } = useComments({ videoId: videoId });

  const user = userQuery.data;
  const hasReplies = !isReply && comment.replies && comment.replies.length > 0;
  const isExpanded = expandedComments.includes(comment.comment_id);
  const isAuthor = currentUserQuery.data?.user_id === comment.user_id;

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (isReply) {
        await deleteReply(comment.reply_id!);
      } else {
        await deleteComment(comment.comment_id);
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했어요: ', error);
    }
  };

  return (
    <section
      className={cn(
        'mx-1 mt-4 flex flex-col gap-1 rounded-sm p-0.5 transition-colors duration-300 hover:bg-gray-100',
        isReply && 'ml-10',
      )}
    >
      <article className="flex w-full items-center justify-between">
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
        {isAuthor && (
          <button onClick={handleDelete}>
            <GoTrash size={16} />
          </button>
        )}
      </article>

      <article className="mx-6 flex flex-col gap-2">
        <p className="whitespace-pre-wrap text-sm">
          {isReply ? comment.reply_comment : comment.comment}
        </p>
        <CommentActions
          thumb_up={comment.thumb_up}
          thumb_down={comment.thumb_down}
          hasReplies={hasReplies}
          comment_id={comment.comment_id}
          isExpanded={isExpanded}
          isReply={isReply}
        />
      </article>
    </section>
  );
};

export default CommentItem;
