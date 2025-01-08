import { RiKakaoTalkFill } from 'react-icons/ri';

import { useAuthHandler } from '@/hooks/useAuthHandler';

const KakaoOAuthHandler = () => {
  useAuthHandler();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FEE500]">
      <section className="flex flex-col items-center gap-2 rounded-lg bg-white/20 p-10 shadow-lg backdrop-blur-md">
        <div className="relative">
          <RiKakaoTalkFill size={64} />
        </div>
        <div className="text-center">
          <h1 className="mb-3 text-xl font-bold text-gray">
            카카오 계정으로 로그인 중
          </h1>
          <p className="text-base text-gray">잠시만 기다려주세요...</p>
        </div>
      </section>
    </main>
  );
};

export default KakaoOAuthHandler;
