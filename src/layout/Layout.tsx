import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="flex min-h-screen justify-center bg-gray-100">
      <section className="relative w-full max-w-[600px] border-x-2 bg-white">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
