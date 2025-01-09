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

type UpdateData = {
  user_image?: string;
  nickname?: string;
  description: string;
};

export type { UserProps, UpdateData };
