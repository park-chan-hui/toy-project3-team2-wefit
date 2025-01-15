import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchCommentsByVideoId,
  addComment,
  addReply,
  deleteComment,
  deleteReply,
} from '@/api/comments';
import { Comment } from '@/types/comment';
import { toastSuccess } from '@/utils/toast';

const useComments = (videoId: string) => {
  const queryClient = useQueryClient();

  // 모든 댓글 조회
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => fetchCommentsByVideoId(videoId),
  });

  // 댓글 추가
  const { mutateAsync: addCommentAsync, isPending: isAddingComment } =
    useMutation({
      mutationFn: ({
        content,
        userId,
        nickname,
      }: {
        content: string;
        userId: string;
        nickname: string;
      }) => addComment(videoId, content, userId, nickname),
      onSuccess: newComment => {
        queryClient.setQueryData<Comment[]>(
          ['comments', videoId],
          (oldComments = []) => [...oldComments, newComment],
        );
      },
    });

  // 대댓글 추가
  const { mutateAsync: addReplyAsync, isPending: isAddingReply } = useMutation({
    mutationFn: ({
      commentId,
      content,
      userId,
      nickname,
    }: {
      commentId: string;
      content: string;
      userId: string;
      nickname: string;
    }) => addReply(commentId, content, userId, nickname),
    onSuccess: (newReply, { commentId }) => {
      queryClient.setQueryData<Comment[]>(
        ['comments', videoId],
        (oldComments = []) =>
          oldComments.map(comment =>
            comment.comment_id === commentId
              ? { ...comment, replies: [...comment.replies, newReply] }
              : comment,
          ),
      );
    },
  });

  // 댓글 삭제
  const { mutateAsync: deleteCommentAsync, isPending: isDeletingComment } =
    useMutation({
      mutationFn: (commentId: string) => deleteComment(commentId),
      onSuccess: (_, commentId) => {
        queryClient.setQueryData<Comment[]>(
          ['comments', videoId],
          (oldComments = []) =>
            oldComments.filter(comment => comment.comment_id !== commentId),
        );

        toastSuccess('작성하신 댓글이 삭제되었어요!');
      },
    });

  // 대댓글 삭제
  const { mutateAsync: deleteReplyAsync, isPending: isDeletingReply } =
    useMutation({
      mutationFn: (replyId: string) => deleteReply(replyId),
      onSuccess: (_, replyId) => {
        queryClient.setQueryData<Comment[]>(
          ['comments', videoId],
          (oldComments = []) =>
            oldComments.map(comment => ({
              ...comment,
              replies: comment.replies.filter(
                reply => reply.reply_id !== replyId,
              ),
            })),
        );

        toastSuccess('작성하신 대댓글이 삭제되었어요!');
      },
    });

  return {
    comments: data ?? [],
    isLoading,
    error,
    addComment: addCommentAsync,
    isAddingComment,
    addReply: addReplyAsync,
    isAddingReply,
    deleteComment: deleteCommentAsync,
    isDeletingComment,
    deleteReply: deleteReplyAsync,
    isDeletingReply,
  };
};

export { useComments };
