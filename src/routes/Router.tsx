import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/Layout';
import SplashPage from '@/pages/SplashPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import MyPage from '@/pages/my-page/MyPage';
import MyPageEdit from '@/pages/my-page/MyPageEdit';
import AuthorDetailPage from '@/pages/AuthorDetailPage';
import VideoAddPage from '@/pages/VideoAddPage';
import VideoEditPage from '@/pages/VideoEditPage';
import VideoDetailPage from '@/pages/VideoDetailPage';
import BookmarkPage from '@/pages/bookmark/BookmarkPage';
import BookmarkCategoryEditPage from '@/pages/bookmark/BookmarkCategoryEditPage';
import PlayListPage from '@/pages/playlist/PlayListPage';
import PlayListDetailPage from '@/pages/playlist/PlayListDetailPage';
import MyUploadVideoPage from '@/pages/my-page/MyUploadVideoPage';
import KakaoOAuthHandler from '@/components/auth/KakaoOAuthHandler';
import GoogleOAuthHandler from '@/components/auth/GoogleOAuthHandler';
import { ROUTER_PATH } from '@/constants/constants';

const Router = () => {
  const {
    SPLASH,
    HOME,
    MY_PAGE,
    PLAYLIST,
    VIDEO_ADD,
    BOOKMARK,
    BOOKMARK_CATEGORY_ADD,
    LOGIN,
    AUTHOR_DETAIL,
    MY_PAGE_EDIT,
    MY_UPLOAD_VIDEO,
    PLAYLIST_DETAIL,
    VIDEO_DETAIL,
    VIDEO_EDIT,
    KAKAO_REDIRECT,
    GOOGLE_REDIRECT,
  } = ROUTER_PATH;

  const router = createBrowserRouter([
    {
      path: SPLASH,
      element: <SplashPage />,
    },
    { path: KAKAO_REDIRECT, element: <KakaoOAuthHandler /> },
    { path: GOOGLE_REDIRECT, element: <GoogleOAuthHandler /> },
    {
      element: <Layout />,
      children: [
        { path: LOGIN, element: <LoginPage /> },
        { path: HOME, element: <HomePage /> },
        {
          path: MY_PAGE,
          children: [
            { index: true, element: <MyPage /> },
            { path: MY_PAGE_EDIT, element: <MyPageEdit /> },
            { path: MY_UPLOAD_VIDEO, element: <MyUploadVideoPage /> },
            { path: VIDEO_EDIT, element: <VideoEditPage /> },
          ],
        },
        {
          path: PLAYLIST,
          children: [
            { index: true, element: <PlayListPage /> },
            { path: PLAYLIST_DETAIL, element: <PlayListDetailPage /> },
          ],
        },
        { path: VIDEO_ADD, element: <VideoAddPage /> },
        { path: VIDEO_DETAIL, element: <VideoDetailPage /> },
        {
          path: BOOKMARK,
          children: [
            { index: true, element: <BookmarkPage /> },
            {
              path: BOOKMARK_CATEGORY_ADD,
              element: <BookmarkCategoryEditPage />,
            },
          ],
        },
        { path: AUTHOR_DETAIL, element: <AuthorDetailPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
