import { ROUTER_PATH } from '@/constants/constants';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

type userData = {
  user_id: string;
  user_image: string;
  nickname: string;
};

const SimpleProfile = (userData: userData) => {
  return (
    <Link
      to={ROUTER_PATH.AUTHOR_DETAIL}
      className="inline-block cursor-pointer"
    >
      <div className="flex items-center">
        <div className="flex h-5 w-5 justify-center overflow-auto rounded-full border border-none">
          {userData.user_image ? (
            <img src={userData.user_image} alt="프로필사진" />
          ) : (
            <CgProfile size={20} />
          )}
        </div>
        <div className="ml-1 text-xxsmall">
          {userData.nickname || '데이터가 없습니다.'}
        </div>
      </div>
    </Link>
  );
};

export default SimpleProfile;
