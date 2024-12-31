import { Outlet } from 'react-router-dom';

import NavigationBar from '@/components/navigation-bar/NavigationBar';

const Layout = () => {
  return (
    <main className="flex min-h-screen justify-center bg-gray-100">
      <section className="relative w-full max-w-[600px] bg-white">
        <Outlet />
        <NavigationBar />
      </section>
    </main>
  );
};

export default Layout;
