import { supabase } from '@/api/supabase';
import { getKSTDate } from '@/utils/getTimeNow';

type SaveCategoriesProps = {
  checkedVideos: Record<string, boolean>;
  title: string;
  imgFile: string;
  userId: string;
  category_id?: string;
};

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

// 카테고리 저장 함수
export async function saveCategories(props: SaveCategoriesProps) {
  const { checkedVideos, title, imgFile, userId } = props;
  const uuid = crypto.randomUUID();

  const videoIds = Object.keys(checkedVideos).filter(
    videoId => checkedVideos[videoId],
  );

  const now = getKSTDate();

  const category = {
    categoried_videos: videoIds,
    category_id: uuid,
    updated_at: now,
    user_id: userId,
    title: title,
    category_thumbnail: imgFile,
    is_open: true,
    is_like: true,
  };

  const { data, error } = await supabase.from('categories').insert([category]);

  if (error) throw error;
  return data || [];
}

// 카테고리 수정 함수

export async function updateCategories(object: SaveCategoriesProps) {
  const { checkedVideos, title, imgFile, userId, category_id } = object;

  const videoIds = Object.keys(checkedVideos).filter(
    videoId => checkedVideos[videoId],
  );

  const now = getKSTDate();

  const categoryUpdate = {
    categoried_videos: videoIds,
    updated_at: now,
    user_id: userId,
    title: title,
    category_thumbnail: imgFile,
    is_open: true,
    is_like: true,
  };

  const { data, error } = await supabase
    .from('categories')
    .update(categoryUpdate)
    .eq('category_id', category_id);

  if (error) throw error;
  return data || [];
}

// 카테고리 삭제 함수

export async function deleteCategories(category_id: string) {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('category_id', category_id);

  if (error) throw error;

  return data;
}
