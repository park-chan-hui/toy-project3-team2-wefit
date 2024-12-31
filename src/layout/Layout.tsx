import { Outlet } from 'react-router-dom';

import NavigationBar from '@/components/navigation-bar/NavigationBar';
import LogoHeader from '@/components/header/LogoHeader';

const Layout = () => {
  return (
    <main className="flex min-h-screen justify-center bg-gray-100">
      <section className="relative w-full max-w-[600px] bg-white">
        <LogoHeader />
        <div className="pb-28">
          <Outlet />
        </div>
        <NavigationBar />
      </section>
    </main>
  );
};

export default Layout;
