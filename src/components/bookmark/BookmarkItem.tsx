import { Link } from 'react-router-dom';
import BookmarkStatus from './BookmarkStatus';
import SimpleProfile from '../simple-profile/SimpleProfile';
import { mockUsers } from '@/mocks/mockUsers';
import { VideoProps } from '@/types/video';

const BookmarkItem = ({
  thumbnail,
  user_id,
  title,
  like_heart,
  is_bookmarked,
  comments,
  created_at,
  video_id,
}: VideoProps) => {
  const userData = mockUsers.find(user => user.user_id === user_id);

  return (
    <article className="mb-1 flex h-16 w-full">
      <figure className="relative flex h-full w-32 items-center">
        <Link to={`/video/${video_id}`}>
          <img
            src={thumbnail}
            alt={title}
            className="aspect-video h-full max-w-32 rounded-small object-cover"
          />
        </Link>
      </figure>
      <div className="ml-3 flex w-full min-w-0 flex-col">
        <Link to={`/video/${video_id}`}>
          <p className="mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-black">
            {title}
          </p>
        </Link>
        <div className="flex w-full flex-row items-center justify-between">
          {userData && (
            <SimpleProfile {...userData} imageSize="large" textSize="small" />
          )}
          <BookmarkStatus
            {...{ like_heart, comments, created_at, is_bookmarked }}
          />
        </div>
      </div>
    </article>
  );
};

export default BookmarkItem;
