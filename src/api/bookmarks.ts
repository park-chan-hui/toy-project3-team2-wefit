import { supabase } from './supabase';

// 북마크 토글링(추가/삭제)
export async function toggleBookmark(userId: string, videoId: string) {
  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .eq('video_id', videoId)
    .maybeSingle();

  if (existingBookmark) {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('video_id', videoId);

    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase.from('bookmarks').insert([
      {
        bookmark_id: crypto.randomUUID(),
        user_id: userId,
        video_id: videoId,
        created_at: new Date(),
      },
    ]);

    if (error) throw error;
    return true;
  }
}

// 북마크 상태 가져오기
export async function fetchBookmarkStatus(userId: string, videoId: string) {
  const { data: bookmark, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .eq('video_id', videoId)
    .maybeSingle();

  if (error) {
    console.error('북마크 정보를 가져오는 데 에러가 발생했어요: ', error);
    return false;
  }

  return !!bookmark;
}
