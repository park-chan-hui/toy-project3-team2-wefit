import { VideoProps } from '@/types/video';

type PlayListProps = {
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

type PlayListVideoProps = {
  bookmark?: PlayListProps;
  playlist?: PlayListProps;
  // eslint-disable-next-line no-unused-vars
  onThumbnailChange: (thumbnail: string) => void;
  thumbnail: string;
};

export type { PlayListVideoProps };
