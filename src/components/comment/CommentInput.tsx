import { useEffect } from 'react';

import CommentSubmitForm from './CommentSubmitForm';
import { useComments } from '@/hooks/useComments';
import { useCommentStore } from '@/store/useCommentStore';

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
    const userId = 'user9'; // 임시 사용자 정보
    const nickname = '댓글맨3'; // 임시 사용자 정보

    if (isReplyMode) {
      await addReply({
        commentId: activeCommentId,
        userId,
        nickname,
        content,
      });
      setActiveCommentId(null);
      onCancel?.();
    } else {
      await addComment({ userId, nickname, content });
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
