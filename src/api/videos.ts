import { UploadVideoProps, VideoUpdateDataProps } from '@/types/video';
import { supabase } from './supabase';
import { PAGE_SIZE } from '@/constants/constants';

interface FetchVideosParams {
  pageParam?: number;
  category?: string;
}

// 모든 영상 조회 (카테고리 지원)
export async function fetchVideos({
  pageParam = 0,
  category,
}: FetchVideosParams) {
  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('videos')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // 카테고리가 '전체'가 아닌 경우에만 필터 적용
  if (category && category !== '전체') {
    query = query.contains('hash_tag', [category]);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  const uniqueVideos = data?.filter(
    (video, index, self) =>
      index === self.findIndex(v => v.video_id === video.video_id),
  );

  return {
    videos: uniqueVideos,
    nextPage: count && to < count - 1 ? pageParam + 1 : undefined,
    totalCount: count,
  };
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

// 영상 삭제
export async function deleteVideo(videoId: string) {
  const { data, error } = await supabase
    .from('videos')
    .delete()
    .eq('video_id', videoId)
    .select();

  if (error) throw error;
  return data;
}

//영상 수정
export async function updateVideo(
  videoId: string,
  videoUpdateData: VideoUpdateDataProps,
) {
  const { data, error } = await supabase
    .from('videos')
    .update(videoUpdateData)
    .eq('video_id', videoId);

  if (error) throw error;
  return data;
}
