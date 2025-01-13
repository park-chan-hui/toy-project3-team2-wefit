import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchVideos, fetchVideo, fetchSelectVideos } from '@/api/videos';

const useVideos = (videoId?: string, videosId?: string[]) => {
  const videosQuery = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    getNextPageParam: lastPage => lastPage.nextPage,
    select: data => ({
      pages: data.pages.map(page => ({
        ...page,
        videos: page.videos.map(video => ({
          ...video,
          created_at: new Date(video.created_at),
        })),
      })),
      pageParams: data.pageParams,
    }),
    initialPageParam: 0,
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

  // 모든 비디오 데이터를 한 번에 가져오는 편의 함수
  const allVideos = videosQuery.data?.pages.flatMap(page => page.videos) ?? [];

  return {
    videosQuery,
    videoQuery,
    selectVideosQuery,
    allVideos,
    fetchNextPage: videosQuery.fetchNextPage,
    hasNextPage: videosQuery.hasNextPage,
    isFetchingNextPage: videosQuery.isFetchingNextPage,
  };
};

export { useVideos };
