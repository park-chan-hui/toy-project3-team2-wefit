import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchVideos, fetchVideo, fetchSelectVideos } from '@/api/videos';

interface UseVideosOptions {
  videoId?: string;
  videosId?: string[];
  category?: string;
}

const useVideos = ({ videoId, videosId, category }: UseVideosOptions = {}) => {
  const videosQuery = useInfiniteQuery({
    queryKey: ['videos', category],
    queryFn: ({ pageParam }) => fetchVideos({ pageParam, category }),
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

  // 현재 카테고리의 모든 비디오 데이터
  const allVideos =
    Array.from(
      new Map(
        videosQuery.data?.pages
          .flatMap(page => page.videos)
          .map(video => [video.video_id, video]),
      ).values(),
    ) ?? [];

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
