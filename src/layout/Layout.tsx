import { Outlet, useLocation } from 'react-router-dom';

import NavigationBar from '@/components/navigation-bar/NavigationBar';
import LogoHeader from '@/components/header/LogoHeader';
import BackHeader from '@/components/header/BackHeader';
import ScrollToTop from '@/components/common/scroll/ScrollToTop';
import { ROUTER_PATH } from '@/constants/constants';
import { cn } from '@/utils/cn';

const Layout = () => {
  const { pathname } = useLocation();

  const isLoginPage = pathname === ROUTER_PATH.LOGIN;
  const isSplashPage = pathname === ROUTER_PATH.SPLASH;
  const isOAuthRedirectPage = [
    ROUTER_PATH.KAKAO_REDIRECT,
    ROUTER_PATH.GOOGLE_REDIRECT,
  ].includes(pathname);
  const shouldHideHeaderAndNav =
    isLoginPage || isSplashPage || isOAuthRedirectPage;

  const shouldShowBackButton = [
    ROUTER_PATH.MY_PAGE_EDIT,
    ROUTER_PATH.MY_UPLOAD_VIDEO,
    ROUTER_PATH.VIDEO_DETAIL.replace(':videoId', ''),
    ROUTER_PATH.VIDEO_EDIT.replace(':videoId', ''),
    ROUTER_PATH.PLAYLIST_DETAIL.replace(':playlistId', ''),
    ROUTER_PATH.AUTHOR_DETAIL.replace(':userId', ''),
    ROUTER_PATH.BOOKMARK_CATEGORY_ADD,
  ].some(path => pathname.startsWith(path));

  return (
    <main className="flex min-h-screen justify-center">
      <ScrollToTop />
      <section className="relative w-full max-w-container bg-white">
        {!shouldHideHeaderAndNav &&
          (shouldShowBackButton ? <BackHeader /> : <LogoHeader />)}
        <div className={cn('px-3', !shouldHideHeaderAndNav && 'pb-28')}>
          <Outlet />
        </div>
        {!shouldHideHeaderAndNav && <NavigationBar />}
      </section>
    </main>
  );
};

export default Layout;
