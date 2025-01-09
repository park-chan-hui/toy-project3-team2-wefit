import PlayListVideo from '@/components/playlist/PlayListVideo';
import PlayList from '@/components/playlist/PlayList';
import { mockBookmarks, mockPlayLists } from '@/mocks/mockVideos';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PlayListDetailPage = () => {
  const { playlistId } = useParams();
  const [thumbnail, setThumbnail] = useState('');

  const filteredBookmarks = mockBookmarks.filter(
    bookmark => bookmark.list_id === playlistId,
  );

  const filteredPlayLists = mockPlayLists.filter(
    playlist => playlist.list_id === playlistId,
  );

  const handleThumbnailChange = (newThumbnail: string) => {
    setThumbnail(newThumbnail);
  };

  return (
    <>
      {filteredBookmarks.length > 0
        ? filteredBookmarks.map(bookmark => (
            <div key={bookmark.list_id}>
              <PlayListVideo bookmark={bookmark} thumbnail={thumbnail} />
              <PlayList
                bookmark={bookmark}
                onThumbnailChange={handleThumbnailChange}
                thumbnail={thumbnail}
              />
            </div>
          ))
        : filteredPlayLists.map(playlist => (
            <div key={playlist.list_id}>
              <PlayListVideo playlist={playlist} thumbnail={thumbnail} />
              <PlayList
                playlist={playlist}
                onThumbnailChange={handleThumbnailChange}
                thumbnail={thumbnail}
              />
            </div>
          ))}
    </>
  );
};

export default PlayListDetailPage;
