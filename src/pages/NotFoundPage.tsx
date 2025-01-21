import { Link } from 'react-router-dom';

import Button from '@/components/common/button/Button';
import warningSvg from '@/assets/warning.svg';

import { ROUTER_PATH } from '@/constants/constants';

const NotFoundPage = () => {
  return (
    <div className="mt-20 flex h-full flex-col items-center justify-center gap-3">
      <img src={warningSvg} alt="warning" className="h-24 w-24" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-lg font-bold text-gray">
          해당 페이지는 없는 페이지에요!
        </h1>
        <Link to={ROUTER_PATH.HOME}>
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
