import { supabase } from './supabase';

export async function toggleVideoLike(userId: string, videoId: string) {
  const { data: existingLike } = await supabase
    .from('video_likes')
    .select('*')
    .eq('user_id', userId)
    .eq('video_id', videoId)
    .maybeSingle();

  if (existingLike) {
    const { error } = await supabase
      .from('video_likes')
      .delete()
      .eq('user_id', userId)
      .eq('video_id', videoId);

    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase.from('video_likes').insert({
      like_id: crypto.randomUUID(),
      user_id: userId,
      video_id: videoId,
    });

    if (error) throw error;
    return true;
  }
}

export async function fetchVideoLikeStatus(userId: string, videoId: string) {
  const { data: like, error } = await supabase
    .from('video_likes')
    .select('*')
    .eq('user_id', userId)
    .eq('video_id', videoId)
    .maybeSingle();

  if (error) {
    console.error('영상 좋아요 정보를 가져오는 데 실패했어요: ', error);
    return false;
  }

  return !!like;
}

export async function fetchVideoLikesCount(videoId: string) {
  const { count, error } = await supabase
    .from('video_likes')
    .select('*', { count: 'exact', head: true })
    .eq('video_id', videoId);

  if (error) {
    console.error('영상 좋아요 수를 가져오는 데 실패했어요: ', error);
    return 0;
  }

  return count || 0;
}
