import { YOUTUBE_REGEX } from '@/constants/constants';

const getYoutubeVideoId = (url: string) => {
  const urlMatch = url.match(YOUTUBE_REGEX.URL);
  const shortUrlMatch = url.match(YOUTUBE_REGEX.SHORT_URL);
  return urlMatch?.[0] || shortUrlMatch?.[0] || null;
};

export { getYoutubeVideoId };
