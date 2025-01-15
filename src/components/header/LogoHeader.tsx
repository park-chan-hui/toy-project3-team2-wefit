import { Link, useLocation } from 'react-router-dom';

import weFitLogo from '@/assets/we-fit-logo.svg';
import { ROUTER_PATH } from '@/constants/constants';
import LogoutButton from '../auth/LogoutButton';

const LogoHeader = () => {
  const { pathname } = useLocation();
  const isMyPage = pathname === ROUTER_PATH.MY_PAGE;

  return (
    <header className="flex items-center justify-between px-3 py-4">
      <Link to={ROUTER_PATH.HOME}>
        <img src={weFitLogo} alt="WeFit Logo" className="h-auto w-24" />
      </Link>
      {isMyPage && <LogoutButton />}
    </header>
  );
};

export default LogoHeader;
