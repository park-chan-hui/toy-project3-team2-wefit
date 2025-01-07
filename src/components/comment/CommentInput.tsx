import { useRef, useEffect } from 'react';

import { IoMdSend } from 'react-icons/io';

import { useCommentStore } from '@/store/useCommentStore';
import Button from '../common/button/Button';

const CommentInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isInputFocused = useCommentStore(state => state.isInputFocused);
  const setInputFocus = useCommentStore(state => state.setInputFocus);

  useEffect(() => {
    if (isInputFocused && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
      setInputFocus(false);
    }
  }, [isInputFocused, setInputFocus]);

  return (
    <div className="mt-6 flex gap-2 border-t pt-4">
      <input
        ref={inputRef}
        className="w-full rounded-lg border p-2 text-sm focus:border-primary focus:outline-none"
        placeholder="댓글을 입력하세요..."
      />
      <Button variant="outline" size="small">
        <IoMdSend size={20} />
      </Button>
    </div>
  );
};

export default CommentInput;
