import { supabase } from './supabase';
import { toastError } from '@/utils/toast';
import { ThumbType } from '@/types/comment';

// 좋아요/싫어요 상태 조회
export async function fetchThumbStatus(
  id: string,
  commentId: string,
  userId: string,
  isReply = false,
) {
  const { data: existingThumb } = await supabase
    .from('comments_thumb')
    .select('*')
    .eq('comment_id', commentId)
    .eq('user_id', userId);

  if (!existingThumb) {
    return null;
  }

  // isReply에 따라 적절한 thumb 찾기
  const targetThumb = existingThumb.find(thumb =>
    isReply ? thumb.reply_id === id : !thumb.reply_id,
  );

  return targetThumb || null;
}

// 좋아요/싫어요 토글
export async function toggleThumb(
  id: string,
  commentId: string,
  userId: string,
  thumbType: ThumbType,
  isReply = false,
) {
  // 댓글/대댓글 데이터 조회
  const { data: targetData } = await supabase
    .from(isReply ? 'replies' : 'comments')
    .select('thumb_up, thumb_down')
    .eq(isReply ? 'reply_id' : 'comment_id', id)
    .single();

  if (!targetData)
    throw new Error(
      isReply ? '대댓글을 찾을 수 없어요!' : '댓글을 찾을 수 없어요!',
    );

  const existingThumb = await fetchThumbStatus(id, commentId, userId, isReply);

  const updateThumb = async () => {
    if (existingThumb) {
      // 이미 동일 유형의 좋아요/싫어요를 눌렀을 경우 취소하기
      if (existingThumb.thumb_type === thumbType) {
        const { error: deleteError } = await supabase
          .from('comments_thumb')
          .delete()
          .eq('id', existingThumb.id);

        if (deleteError) throw deleteError;

        const { error: updateError } = await supabase
          .from(isReply ? 'replies' : 'comments')
          .update({
            [thumbType === 'up' ? 'thumb_up' : 'thumb_down']:
              targetData[thumbType === 'up' ? 'thumb_up' : 'thumb_down'] - 1,
          })
          .eq(isReply ? 'reply_id' : 'comment_id', id);

        if (updateError) throw updateError;

        return null;
      } else {
        // 다른 유형의 좋아요/싫어요로 변경
        const { error: updateThumbError } = await supabase
          .from('comments_thumb')
          .update({ thumb_type: thumbType })
          .eq('id', existingThumb.id);

        if (updateThumbError) throw updateThumbError;

        const { error: updateTargetError } = await supabase
          .from(isReply ? 'replies' : 'comments')
          .update({
            thumb_up: targetData.thumb_up + (thumbType === 'up' ? 1 : -1),
            thumb_down: targetData.thumb_down + (thumbType === 'down' ? 1 : -1),
          })
          .eq(isReply ? 'reply_id' : 'comment_id', id);

        if (updateTargetError) throw updateTargetError;

        return thumbType;
      }
    } else {
      // 새롭게 좋아요/싫어요 추가
      const thumbId = crypto.randomUUID();
      const { error: insertError } = await supabase
        .from('comments_thumb')
        .insert([
          {
            id: thumbId,
            comment_id: commentId,
            reply_id: isReply ? id : null,
            user_id: userId,
            thumb_type: thumbType,
          },
        ]);

      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from(isReply ? 'replies' : 'comments')
        .update({
          [thumbType === 'up' ? 'thumb_up' : 'thumb_down']:
            targetData[thumbType === 'up' ? 'thumb_up' : 'thumb_down'] + 1,
        })
        .eq(isReply ? 'reply_id' : 'comment_id', id);

      if (updateError) throw updateError;

      return thumbType;
    }
  };

  try {
    return await updateThumb();
  } catch (error) {
    toastError('좋아요/싫어요 업데이트 중 오류가 발생했어요!');
    console.error('좋아요/싫어요 업데이트 중 오류가 발생했어요: ', error);
  }
}
