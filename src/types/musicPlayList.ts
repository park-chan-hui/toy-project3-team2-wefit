import { VideoProps } from '@/types/video';

type MusicPlayListProps = {
  playlist_id: string;
  title: string;
  thumbnail: string;
  created_at: Date;
  video_list: VideoProps[];
  user_id: string;
  nickname: string;
  is_open: boolean;
  is_like: boolean;
};

export type { MusicPlayListProps };
