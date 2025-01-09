import { VideoProps } from '@/types/video';

type playListProps = {
  list_id: string;
  created_at: Date;
  is_like: boolean;
  is_open: boolean;
  nickname: string;
  thumbnail: string;
  title: string;
  user_id: string;
  video_list: VideoProps[];
};

export type { playListProps };
