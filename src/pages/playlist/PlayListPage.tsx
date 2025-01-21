import { useState } from 'react';

import BookmarkCategoryList from '@/components/bookmark/BookmarkCategoryList';
import PlayListCategory from '@/components/playlist/PlayListCategory';
import PlayListHeader from '@/components/playlist/PlayListHeader';
import PlayMusicList from '@/components/playlist/PlayMusicList';
import MusicSkeleton from '@/components/skeleton/music/MusicSkeleton';

import { useMusics } from '@/hooks/useMusics';
import { useUsers } from '@/hooks/useUsers';
import { useCategories } from '@/hooks/useCategories';

const PlayListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { currentUserQuery } = useUsers();
  const { categoriesQuery } = useCategories(currentUserQuery.data?.user_id);
  const { data: musics, isLoading: isMusicsLoading } = useMusics();

  if (isMusicsLoading || categoriesQuery.isLoading) {
    return null;
  }

  const mainPlayList = selectedCategory === '전체' && (
    <>
      <BookmarkCategoryList selectedCategory={selectedCategory} />
      <hr className="border-gray my-2 border" />
      <p className="text-large font-bold text-black">
        운동할 때 듣기 좋은 플리
      </p>
      <PlayMusicList selectedCategory={selectedCategory} />
    </>
  );

  const mainMusicPlayList = selectedCategory === '전체' && (
    <>
      <hr className="border-gray my-3 border" />
      <p className="text-large font-bold text-black">
        운동할 때 듣기 좋은 플리
      </p>
      <div className="flex w-full flex-col gap-1">
        <PlayMusicList />
      </div>
    </>
  );

  const onlyPlayList = selectedCategory === '플리만 보기' && (
    <div className="flex w-full flex-col gap-5">
      <BookmarkCategoryList selectedCategory={selectedCategory} />
    </div>
  );

  const onlyMusicPlayList = selectedCategory === '음악만 보기' && (
    <div className="flex w-full flex-col gap-1">
      <PlayMusicList />
    </div>
  );

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

      {!musics?.length && !(selectedCategory === '음악만 보기') ? (
        <>{mainMusicPlayList}</>
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
