type VideoProps = {
  video_id: string;
  video_url: string;
  user_id: string;
  nickname: string;
  thumbnail: string;
  title: string;
  hash_tag: string[];
  like_heart: number;
  comments: string[];
  is_bookmarked: boolean;
  created_at: Date;
};

export type { VideoProps };
