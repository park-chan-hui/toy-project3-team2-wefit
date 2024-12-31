import { Link } from 'react-router-dom';

import weFitLogo from '@/assets/we-fit-logo.svg';
import { ROUTER_PATH } from '@/constants/constants';

const LogoHeader = () => {
  return (
    <div className="flex items-center p-4">
      <Link to={ROUTER_PATH.HOME}>
        <img src={weFitLogo} alt="WeFit Logo" className="h-auto w-24" />
      </Link>
    </div>
  );
};

export default LogoHeader;
