import { VideoProps } from '@/types/video';

type PlayListProps = {
  list_id: string;
  updated_at: Date;
  is_like: boolean;
  is_open: boolean;
  nickname: string;
  category_thumbnail: string;
  title: string;
  user_id: string;
  categoried_videos: VideoProps[];
};

type PlayListVideoProps = {
  object: PlayListProps;
  // eslint-disable-next-line no-unused-vars
  onThumbnailChange?: (thumbnail: string) => void;
  thumbnail: string;
  updated_at?: Date;
};

export type { PlayListProps, PlayListVideoProps };
