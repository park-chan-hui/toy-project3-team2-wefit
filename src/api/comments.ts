import { supabase } from './Supabase';

import { Comment, Reply } from '@/types/comment';

type RawComment = Omit<Comment, 'replies'>;

// 모든 댓글과 대댓글 조회
export async function fetchCommentsByVideoId(
  videoId: string,
): Promise<Comment[]> {
  try {
    // 댓글 조회
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('video_id', videoId)
      .order('created_at', { ascending: false });

    if (commentsError) throw commentsError;
    if (!comments) return [];

    const rawComments = comments as RawComment[];

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

    return commentsWithReplies;
  } catch (error) {
    console.error('영상에 대한 댓글을 가져오는 데에 오류가 발생했어요!', error);
    throw error;
  }
}

// 댓글 추가
export async function addComment(
  videoId: string,
  content: string,
  userId: string, // 사용자 정보가 없어서 임시로 추가
  nickname: string, // 사용자 정보가 없어서 임시로 추가
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
  userId: string, // 사용자 정보가 없어서 임시로 추가
  nickname: string, // 사용자 정보가 없어서 임시로 추가
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
