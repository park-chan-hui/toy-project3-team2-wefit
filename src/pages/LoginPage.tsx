import MainLogoHeader from '@/components/header/MainLogoHeader';
import SocialLoginButton from '@/components/auth/SocialLoginButton';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <MainLogoHeader />

      <main className="flex w-full flex-col gap-2">
        <p className="font-semibold">5초만에 빠른 로그인을 해보아요!</p>
        <SocialLoginButton provider="kakao" />
        <SocialLoginButton provider="google" />
      </main>
    </div>
  );
};

export default LoginPage;
