import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/Layout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import MyPage from '@/pages/my-page/MyPage';
import MyPageEdit from '@/pages/my-page/MyPageEdit';
import AuthorDetailPage from '@/pages/AuthorDetailPage';
import VideoAddPage from '@/pages/VideoAddPage';
import VideoDetailPage from '@/pages/VideoDetailPage';
import BookmarkPage from '@/pages/BookmarkPage';
import PlayListPage from '@/pages/playlist/PlayListPage';
import PlayListDetailPage from '@/pages/playlist/PlayListDetailPage';
import { ROUTER_PATH } from '@/constants/constants';

const Router = () => {
  const {
    HOME,
    MY_PAGE,
    PLAYLIST,
    VIDEO_ADD,
    BOOKMARK,
    LOGIN,
    AUTHOR_DETAIL,
    MY_PAGE_EDIT,
    PLAYLIST_DETAIL,
    VIDEO_DETAIL,
  } = ROUTER_PATH;

  const router = createBrowserRouter([
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
        { path: BOOKMARK, element: <BookmarkPage /> },
        { path: AUTHOR_DETAIL, element: <AuthorDetailPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
