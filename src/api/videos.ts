import { UploadVideoProps } from '@/types/video';
import { supabase } from './supabase';

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

// 여러 영상 조회
export async function fetchSelectVideos(videoIds: string[]) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .in('video_id', videoIds);

  if (error) throw error;
  return data;
}

// 영상 추가
export async function addVideo(newVideo: UploadVideoProps) {
  const { data, error } = await supabase
    .from('videos')
    .insert(newVideo)
    .select();

  if (error) throw error;
  return data;
}

// 사용자가 업로드한 영상 조회
export async function fetchUserUploadVideos(userId: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}
