import PlayListVideo from '@/components/playlist/PlayListVideo';
import PlayList from '@/components/playlist/PlayList';
import { mockBookmarks } from '@/mocks/mockVideos';
import { useParams } from 'react-router-dom';

const PlayListDetailPage = () => {
  const { playlistId } = useParams();

  const filteredBookmarks = mockBookmarks.filter(
    bookmark => bookmark.bookmark_id === playlistId,
  );

  return (
    <>
      {filteredBookmarks.map(bookmark => (
        <div key={bookmark.bookmark_id}>
          <PlayListVideo bookmark={bookmark} />
          <PlayList bookmark={bookmark} />
        </div>
      ))}
    </>
  );
};

export default PlayListDetailPage;
