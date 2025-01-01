import { Outlet } from 'react-router-dom';

import NavigationBar from '@/components/navigation-bar/NavigationBar';
import LogoHeader from '@/components/header/LogoHeader';

const Layout = () => {
  return (
    <main className="flex min-h-screen justify-center">
      <section className="relative w-full max-w-container bg-white">
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
