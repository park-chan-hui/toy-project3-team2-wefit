import { Link } from 'react-router-dom';

import blankProfile from '@/assets/user/blank-user.webp';
import { UserProps } from '@/types/user';
import { cn } from '@/utils/cn';

type SimpleProfileProps = Pick<
  UserProps,
  'user_id' | 'user_image' | 'nickname'
> & {
  imageSize?: 'small' | 'medium' | 'large';
  textSize?: 'small' | 'medium' | 'large';
};

type SizeStyles = {
  small: string;
  medium: string;
  large: string;
};

const imageSizeStyles: SizeStyles = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-6 w-6',
};

const textSizeStyles: SizeStyles = {
  small: 'text-small',
  medium: 'text-medium',
  large: 'text-large',
};

const SimpleProfile = (userData: SimpleProfileProps) => {
  const { imageSize = 'medium', textSize = 'small' } = userData; // props로 값을 설정하지 않을 때 기본값

  return (
    <Link to={`/author/${userData.user_id}`} className="inline-block">
      <div className="flex items-center gap-1">
        <figure
          className={
            'flex justify-center overflow-auto rounded-full border border-none'
          }
        >
          <img
            src={userData.user_image ? userData.user_image : blankProfile}
            alt={`${userData.nickname}님의 프로필`}
            className={cn('object-cover', imageSizeStyles[imageSize])}
          />
        </figure>
        <div
          className={cn(
            'overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-gray',
            textSizeStyles[textSize],
          )}
        >
          {userData.nickname || '데이터가 없습니다.'}
        </div>
      </div>
    </Link>
  );
};

export default SimpleProfile;
