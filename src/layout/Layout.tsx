import { Outlet, useLocation } from 'react-router-dom';

import NavigationBar from '@/components/navigation-bar/NavigationBar';
import LogoHeader from '@/components/header/LogoHeader';
import { ROUTER_PATH } from '@/constants/constants';
import { cn } from '@/utils/cn';

const Layout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === ROUTER_PATH.LOGIN;

  return (
    <main className="flex min-h-screen justify-center">
      <section className="relative w-full max-w-container bg-white">
        {!isLoginPage && <LogoHeader />}
        <div className={cn('px-3', !isLoginPage && 'pb-28')}>
          <Outlet />
        </div>
        {!isLoginPage && <NavigationBar />}
      </section>
    </main>
  );
};

export default Layout;
