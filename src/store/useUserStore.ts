import { UserProps } from '@/types/user';
import { create } from 'zustand';

const useUserStore = create(set => ({
  user: null,
  setUser: (userData: UserProps) => set(userData),
  clearUser: () => set(null),
}));

export { useUserStore };
