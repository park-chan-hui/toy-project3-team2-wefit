import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import MainLogoHeader from '@/components/header/MainLogoHeader';
import { ROUTER_PATH } from '@/constants/constants';

const SplashPage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const { HOME, LOGIN } = ROUTER_PATH;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? HOME : LOGIN);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate, HOME, LOGIN]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <MainLogoHeader isSplashPage />
    </div>
  );
};

export default SplashPage;
