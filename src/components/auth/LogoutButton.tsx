import { useNavigate } from 'react-router-dom';

import Button from '../common/button/Button';
import { supabase } from '@/api/supabase';
import { toastSuccess, toastError } from '@/utils/toast';
import { ROUTER_PATH } from '@/constants/constants';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toastSuccess('로그아웃 되었어요!');
      navigate(ROUTER_PATH.LOGIN);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toastError('로그아웃에 실패했어요. 다시 시도해주세요!');
    }
  };

  return (
    <Button size="small" variant="primary" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
