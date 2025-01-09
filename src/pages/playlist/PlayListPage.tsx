import BookmarkCategoryList from '@/components/bookmark/BookmarkCategoryList';
import Button from '@/components/common/button/Button';
import EmptyResult from '@/components/empty/EmptyResult';
import PlayListCategory from '@/components/playlist/PlayListCategory';
import PlayListHeader from '@/components/playlist/PlayListHeader';
import PlayMusicList from '@/components/playlist/PlayMusicList';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '@/constants/constants';
import { mockBookmarks } from '@/mocks/mockVideos';

const PlayListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { BOOKMARK_CATEGORY_ADD } = ROUTER_PATH;

  const filteredVideos = mockBookmarks.filter(bookmark => {
    return bookmark;
  });

  const mainPlayList =
    selectedCategory === '전체' ? (
      <>
        <div className="grid w-full grid-cols-2 gap-4 text-sm [&>a>div>div>div]:w-full [&>a>div>div]:flex-col">
          <BookmarkCategoryList />
        </div>
        <hr className="border-gray my-3 border" />
        <p className="text-large font-bold text-black">
          운동할 때 듣기 좋은 플리
        </p>
        <div className="grid w-full grid-cols-2 gap-4 text-sm [&>a>div>div>div]:w-full [&>a>div>div]:flex-col">
          <PlayMusicList />
        </div>
      </>
    ) : null;

  const mainMusicPlayList =
    selectedCategory === '전체' ? (
      <>
        <hr className="border-gray my-3 border" />
        <p className="text-large font-bold text-black">
          운동할 때 듣기 좋은 플리
        </p>
        <div className="flex w-full flex-col gap-1">
          <PlayMusicList />
        </div>
      </>
    ) : null;

  const onlyPlayList =
    selectedCategory === '플리만 보기' ? (
      <div className="flex w-full flex-col gap-5">
        <BookmarkCategoryList />
      </div>
    ) : null;
  const onlyMusicPlayList =
    selectedCategory === '음악만 보기' ? (
      <div className="flex w-full flex-col gap-1">
        <PlayMusicList />
      </div>
    ) : null;

  return (
    <main className="flex flex-col gap-2">
      <PlayListCategory
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <PlayListHeader
        title={
          selectedCategory === '전체' || selectedCategory === '플리만 보기'
            ? '플레이리스트'
            : '음악할 때 듣기 좋은 플리'
        }
      />

      {!filteredVideos.length && !(selectedCategory === '음악만 보기') ? (
        <>
          <EmptyResult
            message={
              selectedCategory === '전체' || selectedCategory === '플리만 보기'
                ? '현재 플레이리스트가 없어요!'
                : ''
            }
          />
          <div className="flex justify-center">
            <Link to={BOOKMARK_CATEGORY_ADD}>
              <Button variant="secondary" className="items-center">
                플레이리스트 추가하기
              </Button>
            </Link>
          </div>
          {mainMusicPlayList}
        </>
      ) : (
        <>
          {mainPlayList}
          {onlyPlayList}
          {onlyMusicPlayList}
        </>
      )}
    </main>
  );
};

export default PlayListPage;
