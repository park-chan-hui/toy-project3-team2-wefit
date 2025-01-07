import SimpleProfile from '@/components/common/simple-profile/SimpleProfile';
import { mockUsers } from '@/mocks/mockUsers';
import { mockBookmarks } from '@/mocks/mockVideos';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { LuTableOfContents } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const PlayListDetailPage = () => {
  const bookmark_id = window.location.pathname.split('/').pop();
  const filteredBookmarks = mockBookmarks.filter(
    bookmark => bookmark.bookmark_id === bookmark_id,
  );

  return (
    <>
      {filteredBookmarks.map(bookmark => (
        <>
          <div className="sticky top-0 z-10 mb-2 bg-white">
            <figure className="relative mb-3 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
              <img
                src={bookmark.thumbnail}
                alt={bookmark.title}
                className="h-full w-full object-cover"
              />
            </figure>

            <div className="flex w-full flex-row justify-between gap-1">
              <div className="relative flex w-[90%] flex-row overflow-hidden whitespace-nowrap">
                <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                  {bookmark.title}
                </h2>
              </div>

              {bookmark.is_like ? (
                <IoHeartSharp size={24} className="mr-1" />
              ) : (
                <IoHeartOutline size={24} className="mr-1" />
              )}
            </div>

            <p>{bookmark.nickname}</p>

            <p className="mr-1 flex items-center gap-2 text-small">
              <span>{bookmark.is_open ? '공개' : '비공개'}</span>
              <span>/</span>
              <span>{getTimeAgo(bookmark.created_at)}</span>
            </p>

            <div className="mt-2 flex flex-row items-center">
              <LuTableOfContents size={24} className="mr-1" />
              재생목록{' '}
              <h2 className="font-bold">({bookmark.video_list.length})</h2>
            </div>
          </div>

          <div className="flex-1">
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
        </>
      ))}
    </>
  );
};

export default PlayListDetailPage;
