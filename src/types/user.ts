type UserProps = {
  user_id: string;
  user_image?: string;
  nickname: string;
  description: string;
  follower: number;
  following: number;
  my_upload_video: string[];
  my_watched_video: string[];
};

export type { UserProps };
