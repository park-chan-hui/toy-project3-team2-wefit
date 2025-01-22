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
  category_id: string;
};

type PlayListVideoProps = {
  object?: PlayListProps;
  // eslint-disable-next-line no-unused-vars
  onVideoUrlChange?: (videoUrl: string) => void;
  videoUrl?: string;
  updated_at?: Date;
};

type MockCategoriedVideosProps = {
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

export type {
  PlayListProps,
  PlayListVideoProps,
  VideoProps,
  MockCategoriedVideosProps,
};
