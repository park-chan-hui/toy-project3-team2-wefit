import { useQuery } from '@tanstack/react-query';

import { fetchVideos, fetchVideo } from '@/api/videos';

const useVideos = (videoId?: string) => {
  const videosQuery = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    select: data => {
      return data.map(video => ({
        ...video,
        created_at: new Date(video.created_at),
      }));
    },
  });

  const videoQuery = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => fetchVideo(videoId!),
    select: data => ({
      ...data,
      created_at: new Date(data.created_at),
    }),
    enabled: !!videoId,
  });

  return {
    videosQuery,
    videoQuery,
  };
};

export { useVideos };
