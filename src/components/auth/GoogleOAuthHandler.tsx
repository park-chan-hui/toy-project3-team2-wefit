import { FcGoogle } from 'react-icons/fc';

import { useAuthHandler } from '@/hooks/useAuthHandler';

const GoogleOAuthHandler = () => {
  useAuthHandler();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <FcGoogle size={64} />
        </div>
        <h1 className="text-xl font-bold text-gray">
          Google 계정으로 로그인 중
        </h1>
      </div>
    </div>
  );
};

export default GoogleOAuthHandler;
