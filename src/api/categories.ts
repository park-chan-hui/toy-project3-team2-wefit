import { supabase } from '@/api/supabase';
import { getKSTDate } from '@/utils/getTimeNow';
import { v4 as uuidv4 } from 'uuid';

type SaveCategoriesProps = {
  checkedVideos: Record<string, boolean>;
  title: string;
  imgFile: string;
  userId: string;
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
export async function SaveCategories(props: SaveCategoriesProps) {
  const { checkedVideos, title, imgFile, userId } = props;

  const videoIds = Object.keys(checkedVideos).filter(
    videoId => checkedVideos[videoId],
  );

  const now = getKSTDate();

  const category = {
    categoried_videos: videoIds,
    category_id: uuidv4(),
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
