import NotFoundPage from '../NotFoundPage';
import PlayListVideo from '@/components/playlist/PlayListVideo';
import PlayList from '@/components/playlist/PlayList';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useVideos } from '@/hooks/useVideos';
import { PlayListProps } from '@/types/playList';

const PlayListDetailPage = () => {
  const { playlistId } = useParams();
  const [thumbnail, setThumbnail] = useState('');

  const { videosQuery } = useVideos();
  const categoriesQuery = useCategories('user1');

  if (videosQuery.isLoading || categoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (videosQuery.isError) {
    return <div>Error: {videosQuery.error?.message}</div>;
  }

  if (categoriesQuery.isError) {
    return <div>Error: {categoriesQuery.error?.message}</div>;
  }

  // 북마크한 동영상 필터링
  const filteredBookmarks: PlayListProps[] = (videosQuery.data || []).filter(
    video => {
      return video.video_id === String(playlistId);
    },
  );

  // 카테고리 필터링
  const filteredPlayLists: PlayListProps[] = (
    categoriesQuery.data || []
  ).filter(category => {
    return category.category_id === String(playlistId);
  });

  const handleThumbnailChange = (newThumbnail: string) => {
    setThumbnail(newThumbnail);
  };

  if (filteredBookmarks.length > 0) {
    return (
      <>
        {filteredBookmarks.map(bookmark => (
          <div key={bookmark.list_id}>
            <PlayListVideo object={bookmark} thumbnail={thumbnail} />
            <PlayList
              object={bookmark}
              onThumbnailChange={handleThumbnailChange}
              thumbnail={thumbnail}
            />
          </div>
        ))}
      </>
    );
  } else if (filteredPlayLists.length > 0) {
    return (
      <>
        {filteredPlayLists.map(playlist => (
          <div key={playlist.list_id}>
            <PlayListVideo object={playlist} thumbnail={thumbnail} />
            <PlayList
              object={playlist}
              onThumbnailChange={handleThumbnailChange}
              thumbnail={thumbnail}
            />
          </div>
        ))}
      </>
    );
  } else {
    return <NotFoundPage />;
  }
};

export default PlayListDetailPage;
