import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/api/Supabase';
import { ROUTER_PATH } from '@/constants/constants';

const useAuth = () => {
  const kakaoLoginMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}${ROUTER_PATH.KAKAO_REDIRECT}`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return {
    handleKakaoLogin: kakaoLoginMutation.mutate,
    isLoading: kakaoLoginMutation.isPending,
  };
};

export { useAuth };
