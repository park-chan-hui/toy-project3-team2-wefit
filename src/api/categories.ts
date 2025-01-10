import { supabase } from '@/api/supabase';

// 특정 사용자 북마크 카테고리 조회
export async function fetchCategories(userId: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
