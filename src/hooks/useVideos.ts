import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { ROUTER_PATH } from '@/constants/constants';

import {
  fetchVideos,
  fetchVideo,
  fetchSelectVideos,
  addVideo,
  fetchUserUploadVideos,
} from '@/api/videos';
import { UploadVideoProps } from '@/types/video';
import { useUsers } from './useUsers';
import { toastError, toastSuccess } from '@/utils/toast';

interface UseVideosOptions {
  videoId?: string;
  videosId?: string[];
  userId?: string;
  category?: string;
  useInfiniteScroll?: boolean;
}

const useVideos = ({
  videoId,
  videosId,
  userId,
  category,
  useInfiniteScroll = true,
}: UseVideosOptions = {}) => {
  const navigate = useNavigate();
  const { currentUserQuery } = useUsers();

  // 무한 스크롤을 위한 비디오 목록 쿼리
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

  // 단일 비디오 조회 쿼리
  const videoQuery = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => fetchVideo(videoId!),
    select: data => ({
      ...data,
      created_at: new Date(data.created_at),
    }),
    enabled: !!videoId,
  });

  // 선택된 비디오들 조회 쿼리
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

  // 사용자가 업로드한 비디오 조회 쿼리
  const userUploadedVideosQuery = useQuery({
    queryKey: ['userUploadedVideos', userId],
    queryFn: () => fetchUserUploadVideos(userId!),
    select: data => {
      return data.map(video => ({
        ...video,
        created_at: new Date(video.created_at),
      }));
    },
    enabled: !!userId,
  });

  // 비디오 업로드 뮤테이션
  const addVideoMutation = useMutation({
    mutationFn: (newVideo: UploadVideoProps) =>
      addVideo({
        ...newVideo,
        user_id: currentUserQuery.data.user_id,
        nickname: currentUserQuery.data.nickname,
        like_heart: 0,
        is_bookmarked: false,
        created_at: new Date(),
      }),
    onSuccess: () => {
      toastSuccess('업로드에 성공했어요!');
      navigate(ROUTER_PATH.HOME);
    },
    onError: (error: Error) => {
      console.error('업로드 실패:', error);
      toastError('동영상 업로드 중 오류가 발생했습니다.');
    },
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
    userUploadedVideosQuery,
    addVideoMutation,
    allVideos,
    infiniteScrollRef,
    fetchNextPage: videosQuery.fetchNextPage,
    hasNextPage: videosQuery.hasNextPage,
    isFetchingNextPage: videosQuery.isFetchingNextPage,
  };
};

export { useVideos };
