import { useEffect, useRef } from 'react';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { fetchVideos, fetchVideo, fetchSelectVideos } from '@/api/videos';

interface UseVideosOptions {
  videoId?: string;
  videosId?: string[];
  category?: string;
  useInfiniteScroll?: boolean;
}

const useVideos = ({
  videoId,
  videosId,
  category,
  useInfiniteScroll = true,
}: UseVideosOptions = {}) => {
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

  // 무한 스크롤 관련 로직
  const { ref: infiniteScrollRef, inView } = useInView({
    threshold: 0.1,
  });

  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (
      useInfiniteScroll &&
      inView &&
      videosQuery.hasNextPage &&
      !videosQuery.isFetchingNextPage
    ) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        videosQuery.fetchNextPage();
      }, 300);
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [inView, videosQuery, useInfiniteScroll]);

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
    infiniteScrollRef,
    fetchNextPage: videosQuery.fetchNextPage,
    hasNextPage: videosQuery.hasNextPage,
    isFetchingNextPage: videosQuery.isFetchingNextPage,
  };
};

export { useVideos };
