import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

import Button from '../common/button/Button';

import { useAuth } from '@/hooks/useAuth';

type SocialProvider = 'kakao' | 'google';

interface SocialLoginButtonProps {
  provider: SocialProvider;
}

const PROVIDER_CONFIG = {
  kakao: {
    variant: 'kakao',
    icon: RiKakaoTalkFill,
    text: '카카오 계정으로 로그인하기',
  },
  google: {
    variant: 'google',
    icon: FcGoogle,
    text: '구글 계정으로 로그인하기',
  },
} as const;

const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => {
  const { handleLogin, isLoading } = useAuth(provider);
  const config = PROVIDER_CONFIG[provider];
  const Icon = config.icon;

  return (
    <Button
      variant={config.variant}
      size="large"
      disabled={isLoading}
      onClick={() => handleLogin()}
    >
      <div className="flex items-center justify-center gap-2 font-semibold">
        <Icon size={22} />
        {isLoading ? '로그인 중...' : config.text}
      </div>
    </Button>
  );
};

export default SocialLoginButton;
