import { supabase } from './Supabase';

// 모든 영상 조회
export async function fetchVideos() {
  const { data, error } = await supabase.from('videos').select('*');

  if (error) throw error;
  return data;
}

// 단일 영상 조회
export async function fetchVideo(videoId: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('video_id', videoId)
    .single();

  if (error) throw error;
  return data;
}
