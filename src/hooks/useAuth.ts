import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/api/supabase';
import { ROUTER_PATH } from '@/constants/constants';

type Provider = 'kakao' | 'google';
type RedirectPath = 'KAKAO_REDIRECT' | 'GOOGLE_REDIRECT';

const getRedirectPath = (provider: Provider): RedirectPath => {
  return `${provider.toUpperCase()}_REDIRECT` as RedirectPath;
};

const useAuth = (provider: Provider) => {
  const loginMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${ROUTER_PATH[getRedirectPath(provider)]}`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return {
    handleLogin: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
};

export { useAuth };
