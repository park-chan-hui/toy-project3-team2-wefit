import { useEffect } from 'react';

import CommentSubmitForm from './CommentSubmitForm';
import { useComments } from '@/hooks/useComments';
import { useCommentStore } from '@/store/useCommentStore';
import { useUsers } from '@/hooks/useUsers';

interface CommentInputProps {
  videoId: string;
  commentId?: string;
  isReply?: boolean;
  onCancel?: () => void;
}

const CommentInput = ({ videoId, onCancel }: CommentInputProps) => {
  const isInputFocused = useCommentStore(state => state.isInputFocused);
  const setInputFocus = useCommentStore(state => state.setInputFocus);
  const activeCommentId = useCommentStore(state => state.activeCommentId);
  const setActiveCommentId = useCommentStore(state => state.setActiveCommentId);
  const { addComment, addReply, isAddingComment, isAddingReply } =
    useComments(videoId);
  const { currentUserQuery } = useUsers();

  const isReplyMode = !!activeCommentId;

  useEffect(() => {
    if (isInputFocused) {
      const input = document.querySelector('input[name="content"]');
      if (input) {
        input.scrollIntoView({ behavior: 'smooth' });

        // 포커스는 스크롤이 완료된 후에 설정
        setTimeout(() => {
          (input as HTMLInputElement).focus();
          setInputFocus(false);
        }, 500);
      }
    }
  }, [isInputFocused, setInputFocus]);

  const handleCancel = () => {
    setActiveCommentId(null);
    onCancel?.();
  };

  const handleSubmit = async (content: string) => {
    if (isReplyMode) {
      await addReply({
        commentId: activeCommentId,
        userId: currentUserQuery.data.user_id,
        nickname: currentUserQuery.data.nickname,
        content,
      });
      setActiveCommentId(null);
      onCancel?.();
    } else {
      await addComment({
        userId: currentUserQuery.data.user_id,
        nickname: currentUserQuery.data.nickname,
        content,
      });
    }
  };

  return (
    <div className="mt-2">
      <CommentSubmitForm
        isReplyMode={isReplyMode}
        isSubmitting={isAddingComment || isAddingReply}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CommentInput;
