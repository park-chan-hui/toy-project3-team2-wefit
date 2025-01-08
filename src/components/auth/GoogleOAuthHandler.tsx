import { useAuthHandler } from '@/hooks/useAuthHandler';

const GoogleOAuthHandler = () => {
  useAuthHandler();

  return <div className="text-2xl font-bold">구글 로그인 진행 중입니다...</div>;
};

export default GoogleOAuthHandler;
