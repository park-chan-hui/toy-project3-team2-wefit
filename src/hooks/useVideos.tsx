import { useQuery } from '@tanstack/react-query';

import { fetchVideos, fetchVideo, fetchSelectVideos } from '@/api/videos';

const useVideos = (videosId?: string[], videoId?: string) => {
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

  const selectVideosQuery = useQuery({
    queryKey: ['selectVideos', videosId],
    queryFn: () => fetchSelectVideos(videosId!),
    select: data => {
      return data.map(video => ({
        ...video,
        created_at: new Date(video.created_at),
      }));
    },
    enabled: !!videosId,
  });

  return {
    videosQuery,
    videoQuery,
    selectVideosQuery,
  };
};

export { useVideos };
