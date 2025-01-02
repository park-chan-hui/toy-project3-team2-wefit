import thumbnail1 from '@/assets/thumbnail/thumbnail1.jpg';
import thumbnail2 from '@/assets/thumbnail/thumbnail2.jpg';
import thumbnail3 from '@/assets/thumbnail/thumbnail3.jpg';
import thumbnail4 from '@/assets/thumbnail/thumbnail4.jpg';
import thumbnail5 from '@/assets/thumbnail/thumbnail5.jpg';

const mockVideos = [
  {
    video_id: '1',
    video_url: 'https://www.youtube.com/watch?v=8ZcNBT35HO0',
    user_id: 'user1',
    nickname: 'Allright24_박재훈',
    thumbnail: thumbnail1,
    title: '움직이는 모아이 석상(feat.핑윤롱) I 중국 투어 ep.3',
    hash_tag: ['가슴', '올라잇', '모아이', '핑윤롱', '중국'],
    like_heart: 123445,
    comments: ['와우', '대박', '좋아요'],
    is_bookmarked: false,
    created_at: new Date('2025-01-02'),
  },
  {
    video_id: '2',
    video_url:
      'https://www.youtube.com/watch?v=jhioxpxkces&pp=ygUJ67CV7J6s7ZuI',
    user_id: 'user1',
    nickname: 'Allright24_박재훈',
    thumbnail: thumbnail2,
    title: '주말에 하면 딱 좋은 팔 운동 루틴',
    hash_tag: ['팔', '올라잇', '팔운동', '루틴'],
    like_heart: 40592,
    comments: ['와우', '대박', '좋아요'],
    is_bookmarked: false,
    created_at: new Date('2025-01-01'),
  },
  {
    video_id: '3',
    video_url: 'https://www.youtube.com/watch?v=lh933Kr475U',
    user_id: 'user2',
    nickname: '내추럴 우형재',
    thumbnail: thumbnail3,
    title:
      '형, 왜 저희 채널에서만 그러세요 (feat.총총) | 미처버린 등 운동 vol.2',
    hash_tag: ['등', '등운동', '내추럴', '총총', '성악'],
    like_heart: 20352,
    comments: ['와우', '대박', '좋아요'],
    is_bookmarked: true,
    created_at: new Date('2024-12-31'),
  },
  {
    video_id: '4',
    video_url: 'https://www.youtube.com/watch?v=NUfroxwfFJU&t=765s',
    user_id: 'user1',
    nickname: 'Allright24_박재훈',
    thumbnail: thumbnail4,
    title: '챔피언과 등 운동 I R.T.O S3 16화',
    hash_tag: ['등', '등운동', 'RTO', '키온 피어슨', '챔피언'],
    like_heart: 303556,
    comments: ['와우', '대박', '좋아요'],
    is_bookmarked: false,
    created_at: new Date('2024-11-27'),
  },
  {
    video_id: '5',
    video_url: 'https://www.youtube.com/watch?v=v7FCNMQfJwI',
    user_id: 'user3',
    nickname: '아모띠 amotti',
    thumbnail: thumbnail5,
    title: '피지크, 보디빌딩 다 해보고 알려주는 프로의 어깨 운동',
    hash_tag: ['어깨', '보디빌딩', '피지크', '아모띠'],
    like_heart: 96840,
    comments: ['와우', '대박', '좋아요'],
    is_bookmarked: true,
    created_at: new Date('2024-12-02'),
  },
];

export { mockVideos };
