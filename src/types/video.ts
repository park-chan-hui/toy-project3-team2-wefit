/* eslint-disable */
type VideoProps = {
  video_id: string;
  video_url: string;
  user_id: string;
  nickname: string;
  thumbnail: string;
  title: string;
  hash_tag: string[];
  like_heart: number;
  is_bookmarked: boolean;
  created_at: string | Date;
  isVideoDetailPage?: boolean;
};

type VideoCategoryProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

interface VideoListProps {
  videos: VideoProps[];
}

type VideoStatsProps = Omit<
  Pick<VideoProps, 'created_at' | 'like_heart' | 'is_bookmarked'> & {
    video_id: string;
  },
  ''
>;

type VideoUploadCategoryProps = {
  initialCategories: string[];
  selectedTags: string[];
  isAddVideoCategory: boolean;
  newCategory: string;
  toggleTag: (tag: string) => void;
  setNewCategory: (value: string) => void;
  setIsAddVideoCategory: (state: boolean) => void;
  addCategory: () => void;
};

type UploadVideoProps = {
  video_url: string;
  user_id?: string;
  nickname?: string;
  thumbnail: string;
  title: string;
  like_heart?: number;
  is_bookmarked?: boolean;
  hash_tag: string[];
  created_at?: string | Date;
};

type VideoUpdateDataProps = {
  video_url: string;
  thumbnail: string;
  title: string;
  hash_tag: string[];
};

export type {
  VideoProps,
  VideoCategoryProps,
  VideoListProps,
  VideoStatsProps,
  VideoUploadCategoryProps,
  UploadVideoProps,
  VideoUpdateDataProps,
};
