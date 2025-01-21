import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
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
import BookmarkCategoryAddPage from '@/pages/bookmark/BookmarkCategoryAddPage';
import PlayListPage from '@/pages/playlist/PlayListPage';
import PlayListDetailPage from '@/pages/playlist/PlayListDetailPage';
import MyUploadVideoPage from '@/pages/my-page/MyUploadVideoPage';
import NotFoundPage from '@/pages/NotFoundPage';
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
      element: <Layout />,
      children: [
        { path: SPLASH, element: <SplashPage /> },
        { path: KAKAO_REDIRECT, element: <KakaoOAuthHandler /> },
        { path: GOOGLE_REDIRECT, element: <GoogleOAuthHandler /> },
        { path: LOGIN, element: <LoginPage /> },
        {
          path: HOME,
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: MY_PAGE,
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <MyPage /> },
            { path: MY_PAGE_EDIT, element: <MyPageEdit /> },
            { path: MY_UPLOAD_VIDEO, element: <MyUploadVideoPage /> },
            { path: VIDEO_EDIT, element: <VideoEditPage /> },
          ],
        },
        {
          path: PLAYLIST,
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <PlayListPage /> },
            { path: PLAYLIST_DETAIL, element: <PlayListDetailPage /> },
          ],
        },
        {
          path: VIDEO_ADD,
          element: (
            <ProtectedRoute>
              <VideoAddPage />
            </ProtectedRoute>
          ),
        },
        {
          path: VIDEO_DETAIL,
          element: (
            <ProtectedRoute>
              <VideoDetailPage />
            </ProtectedRoute>
          ),
        },
        {
          path: BOOKMARK,
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <BookmarkPage /> },
            {
              path: BOOKMARK_CATEGORY_ADD,
              element: <BookmarkCategoryAddPage />,
            },
          ],
        },
        {
          path: AUTHOR_DETAIL,
          element: (
            <ProtectedRoute>
              <AuthorDetailPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: (
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
