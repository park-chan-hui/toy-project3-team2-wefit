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
    <article className="mb-1 flex h-xlarge w-full flex-row">
      <Link to={`/video/${video_id}`}>
        <img
          src={thumbnail}
          alt={title}
          className="h-xlarge max-w-xxlarge rounded-medium object-cover"
        />
      </Link>
      <figure className="relative mb-3 ml-3 aspect-video h-full w-full overflow-hidden">
        <Link to={`/video/${video_id}`}>
          <p className="whitespace-nowrap text-small text-black">{title}</p>
        </Link>
        {userData && <SimpleProfile {...userData} />}
        <BookmarkStatus
          {...{ like_heart, comments, created_at, is_bookmarked }}
        />
      </figure>
    </article>
  );
};

export default BookmarkItem;
