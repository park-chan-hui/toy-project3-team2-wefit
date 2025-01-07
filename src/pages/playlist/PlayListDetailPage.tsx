import SimpleProfile from '@/components/common/simple-profile/SimpleProfile';
import PlayList from '@/components/playlist/PlayList';
import { mockUsers } from '@/mocks/mockUsers';
import { mockBookmarks } from '@/mocks/mockVideos';
import { Link, useParams } from 'react-router-dom';

const PlayListDetailPage = () => {
  const { playlistId } = useParams();

  const filteredBookmarks = mockBookmarks.filter(
    bookmark => bookmark.bookmark_id === playlistId,
  );

  return (
    <>
      {filteredBookmarks.map(bookmark => (
        <div key={bookmark.bookmark_id}>
          <PlayList bookmark={bookmark} />
          <div className="flex flex-col gap-4">
            {bookmark.video_list.map(video => {
              const userData = mockUsers.find(
                user => user.user_id === video.user_id,
              );
              return (
                <div key={video.video_id} className="flex items-center gap-2">
                  <Link to={`/video/${video.video_id}`}>
                    <figure className="relative flex h-full w-32 items-center">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="aspect-video h-full max-w-32 rounded-small object-cover"
                      />
                    </figure>
                  </Link>

                  <div className="flex min-w-0 flex-col">
                    <Link to={`/video/${video.video_id}`}>
                      <p className="mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-black">
                        {video.title}
                      </p>
                    </Link>

                    {userData && (
                      <SimpleProfile
                        {...userData}
                        imageSize="large"
                        textSize="small"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default PlayListDetailPage;
