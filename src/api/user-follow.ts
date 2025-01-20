import { supabase } from './supabase';

export async function toggleFollowButton(
  followerId: string,
  followingId: string,
) {
  const { data: existingFollow } = await supabase
    .from('user_follow')
    .select('*')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .maybeSingle();

  // 현재 사용자의 팔로워 수 조회
  const { data: userData } = await supabase
    .from('users')
    .select('follower, following')
    .eq('user_id', followingId)
    .single();

  const currentFollowerCount = userData?.follower || 0;

  // 현재 사용자의 팔로잉 수 조회
  const { data: followerData } = await supabase
    .from('users')
    .select('following')
    .eq('user_id', followerId)
    .single();

  const currentFollowingCount = followerData?.following || 0;

  if (existingFollow) {
    const { error: deleteError } = await supabase
      .from('user_follow')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);

    if (deleteError) throw deleteError;

    const { error: updateFollowerError } = await supabase
      .from('users')
      .update({ follower: currentFollowerCount - 1 })
      .eq('user_id', followingId);

    if (updateFollowerError) throw updateFollowerError;

    const { error: updateFollowingError } = await supabase
      .from('users')
      .update({ following: currentFollowingCount - 1 })
      .eq('user_id', followerId);

    if (updateFollowingError) throw updateFollowingError;

    return false;
  } else {
    const { error: insertError } = await supabase.from('user_follow').insert([
      {
        id: crypto.randomUUID(),
        follower_id: followerId,
        following_id: followingId,
      },
    ]);

    if (insertError) throw insertError;

    const { error: updateFollowerError } = await supabase
      .from('users')
      .update({ follower: currentFollowerCount + 1 })
      .eq('user_id', followingId);

    if (updateFollowerError) throw updateFollowerError;

    const { error: updateFollowingError } = await supabase
      .from('users')
      .update({ following: currentFollowingCount + 1 })
      .eq('user_id', followerId);

    if (updateFollowingError) throw updateFollowingError;

    return true;
  }
}

export async function fetchFollowStatus(
  followerId: string,
  followingId: string,
) {
  const { data, error } = await supabase
    .from('user_follow')
    .select('*')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .maybeSingle();

  if (error) {
    console.error('팔로우 정보를 가져오는 데 실패했어요: ', error);
    return false;
  }

  return !!data;
}

export async function fetchFollowings(userId: string) {
  const { data, error } = await supabase
    .from('user_follow')
    .select('following_id')
    .eq('follower_id', userId);

  if (error) throw error;

  return data;
}
