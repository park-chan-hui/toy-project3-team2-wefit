import { useMutation, useQuery } from '@tanstack/react-query';

import {
  fetchVideos,
  fetchVideo,
  fetchSelectVideos,
  addVideo,
  fetchUserUploadVideos,
} from '@/api/videos';
import { UploadVideoProps } from '@/types/video';
import { useUsers } from './useUsers';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '@/utils/toast';

const useVideos = (videoId?: string, videosId?: string[], userId?: string) => {
  const navigate = useNavigate();
  const { currentUserQuery } = useUsers();

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
      navigate('/home');
    },
    onError: (error: Error) => {
      console.error('업로드 실패:', error);
      toastError('동영상 업로드 중 오류가 발생했습니다.');
    },
  });
  return {
    videosQuery,
    videoQuery,
    selectVideosQuery,
    userUploadedVideosQuery,
    addVideoMutation,
  };
};

export { useVideos };
