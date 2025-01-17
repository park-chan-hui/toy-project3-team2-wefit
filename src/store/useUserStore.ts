import { UserProps, UserStore } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist<UserStore>(
    set => ({
      user: null,
      setUser: (userData: UserProps) => {
        set({ user: userData });
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'userStorage',
    },
  ),
);

export { useUserStore };
