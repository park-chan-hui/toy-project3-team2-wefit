import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
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
        <div
          className={
            'flex justify-center overflow-auto rounded-full border border-none'
          }
        >
          {userData.user_image ? (
            <img
              src={userData.user_image}
              alt="프로필사진"
              className={cn('object-cover', imageSizeStyles[imageSize])}
            />
          ) : (
            <CgProfile size={20} />
          )}
        </div>
        <div
          className={
            (cn('font-semibold text-gray', textSizeStyles[textSize]),
            'overflow-hidden text-ellipsis whitespace-nowrap')
          }
        >
          {userData.nickname || '데이터가 없습니다.'}
        </div>
      </div>
    </Link>
  );
};

export default SimpleProfile;
