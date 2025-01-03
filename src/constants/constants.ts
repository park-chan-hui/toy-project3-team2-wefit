const ROUTER_PATH = {
  SPLASH: '/',
  HOME: '/home',
  LOGIN: '/login',
  MY_PAGE: '/mypage',
  MY_PAGE_EDIT: '/mypage/edit',
  PLAYLIST: '/playlist',
  PLAYLIST_DETAIL: '/playlist/:playlistId',
  VIDEO_ADD: '/video-add',
  VIDEO_DETAIL: '/video/:videoId',
  VIDEO_EDIT: '/mypage/video-edit/:videoId',
  AUTHOR_DETAIL: '/author/:userId',
  BOOKMARK: '/bookmark',
  BOOKMARK_CATEGORY_ADD: '/bookmark/category-add',
};

const NAVIGATION_BAR = {
  HOME: 'HOME',
  PLAYLIST: 'PLAYLIST',
  BOOKMARK: 'BOOKMARK',
  MY_PAGE: 'MYPAGE',
};

export { ROUTER_PATH, NAVIGATION_BAR };
