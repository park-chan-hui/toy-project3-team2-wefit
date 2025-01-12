/* eslint-disable */

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

type UserStore = {
  user: UserProps | null;
  setUser: (userData: UserProps) => void;
  clearUser: () => void;
};
export type { UserProps, UpdateData, UserStore };
