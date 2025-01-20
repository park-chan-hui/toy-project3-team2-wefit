import { supabase } from './supabase';
import { toastError } from '@/utils/toast';
import { ThumbType } from '@/types/comment';

// 좋아요/싫어요 상태 조회
export async function fetchThumbStatus(commentId: string, userId: string) {
  const { data, error } = await supabase
    .from('comments_thumb')
    .select('*')
    .eq('comment_id', commentId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('댓글 좋아요/싫어요 상태 조회 중 오류가 발생했어요!', error);
    throw error;
  }

  return data;
}

// 좋아요/싫어요 토글
export async function toggleThumb(
  commentId: string,
  userId: string,
  thumbType: ThumbType,
) {
  const { data: commentData } = await supabase
    .from('comments')
    .select('thumb_up, thumb_down')
    .eq('comment_id', commentId)
    .single();

  if (!commentData) throw new Error('댓글을 찾을 수 없어요!');

  const existingThumb = await fetchThumbStatus(commentId, userId);

  const updateCommentThumb = async () => {
    if (existingThumb) {
      // 이미 동일 유형의 좋아요/싫어요를 눌렀을 경우 취소하기
      if (existingThumb.thumb_type === thumbType) {
        const { error: deleteError } = await supabase
          .from('comments_thumb')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_id', userId);

        if (deleteError) throw deleteError;

        const { error: updateError } = await supabase
          .from('comments')
          .update({
            [thumbType === 'up' ? 'thumb_up' : 'thumb_down']:
              commentData[thumbType === 'up' ? 'thumb_up' : 'thumb_down'] - 1,
          })
          .eq('comment_id', commentId);

        if (updateError) throw updateError;

        return null;
      } else {
        // 다른 유형의 좋아요/싫어요로 변경
        const { error: updateThumbError } = await supabase
          .from('comments_thumb')
          .update({ thumb_type: thumbType })
          .eq('comment_id', commentId)
          .eq('user_id', userId);

        if (updateThumbError) throw updateThumbError;

        const { error: updateCommentError } = await supabase
          .from('comments')
          .update({
            thumb_up: commentData.thumb_up + (thumbType === 'up' ? 1 : -1),
            thumb_down:
              commentData.thumb_down + (thumbType === 'down' ? 1 : -1),
          })
          .eq('comment_id', commentId);

        if (updateCommentError) throw updateCommentError;

        return thumbType;
      }
    } else {
      // 새롭게 좋아요/싫어요 추가
      const { error: insertError } = await supabase
        .from('comments_thumb')
        .insert([
          {
            comment_id: commentId,
            user_id: userId,
            thumb_type: thumbType,
          },
        ]);

      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from('comments')
        .update({
          [thumbType === 'up' ? 'thumb_up' : 'thumb_down']:
            commentData[thumbType === 'up' ? 'thumb_up' : 'thumb_down'] + 1,
        })
        .eq('comment_id', commentId);

      if (updateError) throw updateError;

      return thumbType;
    }
  };

  try {
    return await updateCommentThumb();
  } catch (error) {
    toastError('좋아요/싫어요 업데이트 중 오류가 발생했어요!');
    console.error('좋아요/싫어요 업데이트 중 오류가 발생했어요: ', error);
  }
}
