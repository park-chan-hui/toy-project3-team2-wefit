import { Link } from 'react-router-dom';

import BookmarkStatus from './BookmarkStatus';
import SimpleProfile from '../common/simple-profile/SimpleProfile';

import { VideoProps } from '@/types/video';
import { useUsers } from '@/hooks/useUsers';

interface BookmarkItemProps extends VideoProps {
  onToggleBookmark?: () => Promise<void>;
}

const BookmarkItem = ({
  video_id,
  title,
  thumbnail,
  user_id,
  onToggleBookmark,
}: BookmarkItemProps) => {
  const { userQuery } = useUsers(user_id);
  const userData = userQuery.data;

  return (
    <article className="mb-1 flex">
      <figure className="relative flex aspect-video w-32 items-center">
        <Link to={`/video/${video_id}`}>
          <img
            src={thumbnail}
            alt={title}
            className="aspect-video max-w-32 rounded-small object-cover"
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
            videoId={video_id}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      </div>
    </article>
  );
};

export default BookmarkItem;
