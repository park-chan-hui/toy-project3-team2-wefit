import PlayListVideo from '@/components/playlist/PlayListVideo';
import PlayList from '@/components/playlist/PlayList';
import { mockBookmarks } from '@/mocks/mockVideos';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PlayListDetailPage = () => {
  const { playlistId } = useParams();
  const [thumbnail, setThumbnail] = useState('');

  const filteredBookmarks = mockBookmarks.filter(
    bookmark => bookmark.bookmark_id === playlistId,
  );

  const handleThumbnailChange = (newThumbnail: string) => {
    setThumbnail(newThumbnail);
  };

  return (
    <>
      {filteredBookmarks.map(bookmark => (
        <div key={bookmark.bookmark_id}>
          <PlayListVideo bookmark={bookmark} thumbnail={thumbnail} />
          <PlayList
            bookmark={bookmark}
            onThumbnailChange={handleThumbnailChange}
            thumbnail={thumbnail}
          />
        </div>
      ))}
    </>
  );
};

export default PlayListDetailPage;
