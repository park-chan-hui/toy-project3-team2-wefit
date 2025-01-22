import { create } from 'zustand';

import { CommentStore } from '@/types/comment';

const useCommentStore = create<CommentStore>(set => ({
  expandedComments: [],
  isInputFocused: false,
  activeCommentId: null,
  toggleReplies: (comment_id: string) => {
    set(state => ({
      expandedComments: state.expandedComments.includes(comment_id)
        ? state.expandedComments.filter(id => id !== comment_id)
        : [...state.expandedComments, comment_id],
    }));
  },
  setInputFocus: (isFocused: boolean) => {
    set({ isInputFocused: isFocused });
  },
  resetExapandedComments: () => {
    set({ expandedComments: [] });
  },
  setActiveCommentId: comment_id => set({ activeCommentId: comment_id }),
}));

export { useCommentStore };
