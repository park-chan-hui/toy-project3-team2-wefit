import { supabase } from './supabase';

import { Comment, Reply, CommentResponse } from '@/types/comment';

type RawComment = Omit<Comment, 'replies'>;

// 모든 댓글과 대댓글 조회
export async function fetchCommentsByVideoId(
  videoId: string,
): Promise<CommentResponse> {
  try {
    // 댓글 수 조회
    const { count: commentsCount, error: countError } = await supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .eq('video_id', videoId);

    if (countError) throw countError;

    // 댓글 조회
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('video_id', videoId)
      .order('created_at', { ascending: false });

    if (commentsError) throw commentsError;
    if (!comments) return { comments: [], totalCount: 0 };

    const rawComments = comments as RawComment[];

    // 대댓글 수 조회
    const { count: repliesCount, error: repliesCountError } = await supabase
      .from('replies')
      .select('*', { count: 'exact' })
      .in(
        'comment_id',
        rawComments.map(comment => comment.comment_id),
      );

    if (repliesCountError) throw repliesCountError;

    // 대댓글 조회
    const { data: replies, error: repliesError } = await supabase
      .from('replies')
      .select('*')
      .in(
        'comment_id',
        rawComments.map(comment => comment.comment_id),
      )
      .order('created_at', { ascending: false });

    if (repliesError) throw repliesError;

    const commentsWithReplies: Comment[] = rawComments.map(comment => ({
      ...comment,
      replies: (replies || []).filter(
        reply => reply.comment_id === comment.comment_id,
      ) as Reply[],
    }));

    return {
      comments: commentsWithReplies,
      totalCount: (commentsCount || 0) + (repliesCount || 0),
    };
  } catch (error) {
    console.error('영상에 대한 댓글을 가져오는 데에 오류가 발생했어요!', error);
    throw error;
  }
}

// 댓글 추가
export async function addComment(
  videoId: string,
  content: string,
  userId: string,
  nickname: string,
): Promise<Comment> {
  const newComment = {
    comment_id: crypto.randomUUID(),
    video_id: videoId,
    user_id: userId,
    nickname,
    comment: content,
    created_at: new Date(),
    thumb_up: 0,
    thumb_down: 0,
  };

  const { data, error } = await supabase
    .from('comments')
    .insert([newComment])
    .select('*')
    .single();

  if (error) throw error;
  if (!data) throw new Error('댓글을 추가하는 데에 실패했어요!');

  return {
    ...data,
    replies: [],
  } as Comment;
}

// 대댓글 추가
export async function addReply(
  commentId: string,
  content: string,
  userId: string,
  nickname: string,
): Promise<Reply> {
  const newReply = {
    reply_id: crypto.randomUUID(),
    comment_id: commentId,
    user_id: userId,
    nickname,
    reply_comment: content,
    created_at: new Date(),
    thumb_up: 0,
    thumb_down: 0,
  };

  const { data, error } = await supabase
    .from('replies')
    .insert([newReply])
    .select('*')
    .single();

  if (error) throw error;
  if (!data) throw new Error('대댓글을 추가하는 데에 실패했어요!');

  return data as Reply;
}

// 댓글 삭제
export async function deleteComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('comment_id', commentId);

  if (error) throw error;
}

// 대댓글 삭제
export async function deleteReply(replyId: string): Promise<void> {
  const { error } = await supabase
    .from('replies')
    .delete()
    .eq('reply_id', replyId);

  if (error) throw error;
}
