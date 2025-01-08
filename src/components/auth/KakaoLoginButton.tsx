import { RiKakaoTalkFill } from 'react-icons/ri';

import Button from '../common/button/Button';
import { useAuth } from '@/hooks/useAuth';

const KakaoLoginButton = () => {
  const { handleKakaoLogin, isLoading } = useAuth();

  return (
    <Button
      variant="kakao"
      size="large"
      disabled={isLoading}
      onClick={() => handleKakaoLogin()}
    >
      <div className="flex items-center justify-center gap-2 font-semibold">
        <RiKakaoTalkFill size={22} />
        {isLoading ? '로그인 중...' : '카카오 계정으로 로그인하기'}
      </div>
    </Button>
  );
};

export default KakaoLoginButton;
