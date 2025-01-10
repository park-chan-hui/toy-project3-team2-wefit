import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchCommentsByVideoId, addComment, addReply } from '@/api/comments';
import { Comment } from '@/types/comment';

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

  return {
    comments: data ?? [],
    isLoading,
    error,
    addComment: addCommentAsync,
    isAddingComment,
    addReply: addReplyAsync,
    isAddingReply,
  };
};

export { useComments };
