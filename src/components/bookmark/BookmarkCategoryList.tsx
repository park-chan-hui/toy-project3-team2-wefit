import { mockBookmarks } from '@/mocks/mockVideos';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { Link } from 'react-router-dom';

const BookmarkCategoryList = () => {
  return (
    <>
      {mockBookmarks.map(bookmark => (
        <Link to={`/playlist/${bookmark.list_id}`} key={bookmark.list_id}>
          <div className="mb-2">
            <figure className="relative mb-3 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
              <img
                src={bookmark.thumbnail}
                alt={bookmark.title}
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="flex w-full flex-row justify-between gap-1">
              <div className="relative flex w-[65%] flex-row overflow-hidden whitespace-nowrap">
                <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                  {bookmark.title}
                </h2>
                <h2 className="font-bold">({bookmark.video_list.length})</h2>
              </div>
              <p className="mr-1 flex items-center text-small">
                최종 수정일 {getTimeAgo(bookmark.created_at)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default BookmarkCategoryList;
