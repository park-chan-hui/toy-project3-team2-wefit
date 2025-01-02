import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/components/common/button/Button';
import logoSvg from '@/assets/we-fit-logo.svg';
import treadmillSvg from '@/assets/treadmill.svg';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <header className="mb-12 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col justify-start gap-2">
          <h1 className="text-2xl font-bold">당신의 운동 파트너🏃‍♂️</h1>
          <img src={logoSvg} alt="WeFitlogo" className="h-auto w-64" />
        </div>
        <img src={treadmillSvg} alt="treadmillIcon" className="h-64 w-64" />
      </header>

      <main className="flex w-full flex-col gap-2">
        <p className="font-semibold">5초만에 빠른 로그인을 해보아요!</p>
        <Button variant="kakao" size="large">
          <div className="flex items-center justify-center gap-2">
            <RiKakaoTalkFill size={22} />
            카카오 계정으로 로그인하기
          </div>
        </Button>
        <Button variant="google" size="large">
          <div className="flex items-center justify-center gap-2">
            <FcGoogle size={22} />
            구글 계정으로 로그인하기
          </div>
        </Button>
      </main>
    </div>
  );
};

export default LoginPage;
