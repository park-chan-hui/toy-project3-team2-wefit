import { useMutation, useQuery } from '@tanstack/react-query';

import {
  addUser,
  deleteUser,
  fetchUsers,
  fetchUserById,
  updateUser,
  fetchCurrentUser,
  checkNickname,
} from '@/api/users';

import { UserProps, UpdateData } from '@/types/user';
import { toastError, toastSuccess } from '@/utils/toast';
import { ROUTER_PATH } from '@/constants/constants';
import { useNavigate } from 'react-router-dom';

const useUsers = (userId?: string) => {
  const navigate = useNavigate();
  // 모든 사용자 조회
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // 단일 사용자 조회
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId!),
    enabled: !!userId,
  });

  // 현재 사용자 조회
  const currentUserQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => fetchCurrentUser(),
  });

  // 사용자 추가
  const addUserMutation = useMutation({
    mutationFn: (newUser: UserProps) => addUser(newUser),
  });

  // 사용자 삭제
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
  });

  // 사용자 정보 수정
  const updateUserMutation = useMutation({
    mutationFn: ({
      userId,
      updateData,
    }: {
      userId: string;
      updateData: UpdateData;
    }) =>
      updateUser(
        userId,
        updateData.nickname === ''
          ? { ...updateData, nickname: currentUserQuery.data.nickname }
          : updateData,
      ),
    onSuccess: () => {
      toastSuccess('프로필을 수정했습니다.');
      navigate(ROUTER_PATH.MY_PAGE);
    },
    onError: (error: Error) => {
      console.error('수정 데이터 업로드 실패:', error);
      toastError('프로필 수정 중 오류가 발생했습니다.');
    },
  });

  // 닉네임 중복 확인
  const checkUserNicknameMutation = useMutation({
    mutationFn: ({ userId, nickname }: { userId: string; nickname: string }) =>
      checkNickname(userId, nickname),
  });

  return {
    usersQuery,
    userQuery,
    currentUserQuery,
    addUserMutation,
    deleteUserMutation,
    updateUserMutation,
    checkUserNicknameMutation,
  };
};

export { useUsers };
