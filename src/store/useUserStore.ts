import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserProps, UserStore } from '@/types/user';

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
