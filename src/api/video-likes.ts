import { supabase } from './supabase';

export async function toggleVideoLike(userId: string, videoId: string) {
  const { data: existingLike } = await supabase
    .from('video_likes')
    .select('*')
    .eq('user_id', userId)
    .eq('video_id', videoId)
    .maybeSingle();

  const { data: videoData } = await supabase
    .from('videos')
    .select('like_heart')
    .eq('video_id', videoId)
    .maybeSingle();

  const currentLikes = videoData?.like_heart || 0;

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from('video_likes')
      .delete()
      .eq('user_id', userId)
      .eq('video_id', videoId);

    if (deleteError) throw deleteError;

    // videos 테이블에서 좋아요 카운트 감소
    const { error: updateError } = await supabase
      .from('videos')
      .update({ like_heart: currentLikes - 1 })
      .eq('video_id', videoId);

    if (updateError) throw updateError;
    return false;
  } else {
    const { error: insertError } = await supabase.from('video_likes').insert([
      {
        like_id: crypto.randomUUID(),
        user_id: userId,
        video_id: videoId,
      },
    ]);

    if (insertError) throw insertError;

    // videos 테이블에서 좋아요 카운트 증가
    const { error: updateError } = await supabase
      .from('videos')
      .update({ like_heart: currentLikes + 1 })
      .eq('video_id', videoId);

    if (updateError) throw updateError;
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

export async function fetchUsersLikeVideos(userId: string) {
  const { data, error } = await supabase
    .from('video_likes')
    .select('video_id')
    .eq('user_id', userId);

  if (error) throw { error };

  const videoIds = data?.map(item => item.video_id) || [];

  return videoIds;
}
