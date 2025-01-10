import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useUsers } from './useUsers';
import { supabase } from '@/api/supabase';
import { ROUTER_PATH } from '@/constants/constants';
import { UserProps } from '@/types/user';

const useAuthHandler = () => {
  const processedRef = useRef(false);
  const navigate = useNavigate();
  const { addUserMutation } = useUsers();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (processedRef.current) return;

        if (event === 'SIGNED_IN' && session) {
          try {
            processedRef.current = true;

            const { data: existingUser, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('user_id', session.user.id)
              .maybeSingle();

            if (userError) throw userError;

            if (!existingUser) {
              const newUser: UserProps = {
                user_id: session.user.id,
                user_image: session.user.user_metadata.avatar_url,
                nickname:
                  session.user.user_metadata.full_name ||
                  `회원${session.user.id.slice(0, 5)}`,
                description: `안녕하세요! ${session.user.user_metadata.full_name}입니다!`,
                follower: 0,
                following: 0,
                my_upload_video: [],
                my_watched_video: [],
              };

              await addUserMutation.mutateAsync(newUser, {
                onSuccess: () => {
                  navigate(ROUTER_PATH.HOME);
                },
                onError: error => {
                  console.error('사용자 추가 중 에러가 발생했어요: ', error);
                  processedRef.current = false;
                },
              });
            } else {
              navigate(ROUTER_PATH.HOME);
            }
          } catch (error) {
            console.error('에러가 발생했어요: ', error);
            processedRef.current = false;
          }
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, addUserMutation]);
};

export { useAuthHandler };
