import { UserProps } from '@/types/user';
import editLogo from '@/assets/basil_edit-outline.svg';
import { formatNumber } from '@/utils/formatNumber';
import { Link } from 'react-router-dom';

const MyPageProfile = (props: { userData: UserProps }) => {
  const userData = props.userData;

  return (
    <figure className="flex flex-col gap-3">
      <div className="flex w-full justify-between">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <img
            src={userData.user_image}
            alt="프로필 사진"
            className="w-ull h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 font-bold">
          <div className="text-xlarge">{userData.nickname}</div>
          <div className="flex justify-around gap-2">
            <div>팔로우: {formatNumber(userData.follower)}</div>
            <div>팔로잉: {formatNumber(userData.following)}</div>
          </div>
        </div>
        <Link to="/mypage/edit">
          <img src={editLogo} alt="수정 로고" className="self-start" />
        </Link>
      </div>
      <div className="text-small">{userData.description}</div>
    </figure>
  );
};

export default MyPageProfile;
