import { FcGoogle } from 'react-icons/fc';

import Button from '../common/button/Button';

const GoogleLoginButton = () => {
  return (
    <Button variant="google" size="large">
      <div className="flex items-center justify-center gap-2 font-semibold">
        <FcGoogle size={22} />
        구글 계정으로 로그인하기
      </div>
    </Button>
  );
};

export default GoogleLoginButton;
