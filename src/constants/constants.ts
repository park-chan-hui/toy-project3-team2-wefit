const ROUTER_PATH = {
  SPLASH: '/',
  HOME: '/home',
  LOGIN: '/login',
  MY_PAGE: '/mypage',
  MY_PAGE_EDIT: '/mypage/edit',
  MY_UPLOAD_VIDEO: '/mypage/myupload-video',
  PLAYLIST: '/playlist',
  PLAYLIST_DETAIL: '/playlist/:playlistId',
  VIDEO_ADD: '/video-add',
  VIDEO_DETAIL: '/video/:videoId',
  VIDEO_EDIT: '/mypage/video-edit/:videoId',
  AUTHOR_DETAIL: '/author/:userId',
  BOOKMARK: '/bookmark',
  BOOKMARK_CATEGORY_ADD: '/bookmark/category-add',
  BOOKMARK_CATEGORY: '/bookmark/category',
  KAKAO_REDIRECT: '/oauth/kakao',
  GOOGLE_REDIRECT: '/oauth/google',
};

const NAVIGATION_BAR = {
  HOME: 'HOME',
  PLAYLIST: 'PLAYLIST',
  BOOKMARK: 'BOOKMARK',
  MY_PAGE: 'MYPAGE',
};

const YOUTUBE_REGEX = {
  URL: /(?<=v=)([^?]+)?/g,
  SHORT_URL: /(?<=youtu\.be\/)([^?]+)?/g,
};

const PAGE_SIZE = 10;

export { ROUTER_PATH, NAVIGATION_BAR, YOUTUBE_REGEX, PAGE_SIZE };
