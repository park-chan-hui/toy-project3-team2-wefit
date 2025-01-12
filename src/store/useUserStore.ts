import { UserProps, UserStore } from '@/types/user';
import { create } from 'zustand';

const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: (userData: UserProps) => {
    set({ user: userData });
  },
  clearUser: () => set({ user: null }),
}));

export { useUserStore };
