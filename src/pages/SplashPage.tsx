import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import MainLogoHeader from '@/components/header/MainLogoHeader';
import { ROUTER_PATH } from '@/constants/constants';
import { useUsers } from '@/hooks/useUsers';

const SplashPage = () => {
  const { currentUserQuery } = useUsers();
  const { HOME, LOGIN } = ROUTER_PATH;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(currentUserQuery.data ? HOME : LOGIN);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUserQuery.data, navigate, HOME, LOGIN]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <MainLogoHeader isSplashPage />
    </div>
  );
};

export default SplashPage;
