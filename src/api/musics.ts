import { supabase } from './supabase';

// 모든 음악 플레이리스트

export async function fetchMusics() {
  const { data, error } = await supabase.from('musics').select('*');

  if (error) throw error;
  return data;
}
