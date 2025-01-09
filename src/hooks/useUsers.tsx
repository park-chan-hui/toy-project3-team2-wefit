import { useMutation, useQuery } from '@tanstack/react-query';

import {
  addUser,
  deleteUser,
  fetchUsers,
  fetchUserById,
  updateUser,
} from '@/api/users';

import { UserProps, UpdateData } from '@/types/user';

const useUsers = (userId?: string) => {
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
    }) => updateUser(userId, updateData),
  });

  return {
    usersQuery,
    userQuery,
    addUserMutation,
    deleteUserMutation,
    updateUserMutation,
  };
};

export { useUsers };
