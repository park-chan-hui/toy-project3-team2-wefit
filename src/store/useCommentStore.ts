import { create } from 'zustand';

import { CommentStore } from '@/types/comment';
import { mockComments } from '@/mocks/mockComment';

const useCommentStore = create<CommentStore>(set => ({
  comments: [],
  expandedComments: [],
  fetchCommentsByVideoId: (video_id: string) => {
    const comments = mockComments.filter(
      comment => comment.video_id === video_id,
    );
    set({ comments, expandedComments: [] });
  },
  toggleReplies: (comment_id: string) => {
    set(state => ({
      expandedComments: state.expandedComments.includes(comment_id)
        ? state.expandedComments.filter(id => id !== comment_id)
        : [...state.expandedComments, comment_id],
    }));
  },
}));

export { useCommentStore };
