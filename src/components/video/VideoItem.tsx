import VideoStats from './VideoStats';
import SimpleProfile from '../simple-profile/SimpleProfile';
import { mockUsers } from '@/mocks/mockUsers';
import { VideoProps } from '@/types/video';

const VideoItem = ({
  thumbnail,
  title,
  user_id,
  hash_tag,
  like_heart,
  is_bookmarked,
  comments,
  created_at,
}: VideoProps) => {
  const userData = mockUsers.find(user => user.user_id === user_id);

  return (
    <article className="mb-1 w-full">
      <figure className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="px-1">
        <div className="mb-2 flex items-center justify-between">
          {userData && <SimpleProfile {...userData} />}

          <VideoStats
            {...{ created_at, comments, is_bookmarked, like_heart }}
          />
        </div>

        <h2 className="text-base font-bold text-black">{title}</h2>

        <footer className="flex flex-wrap gap-1">
          {hash_tag.map((tag, index) => (
            <span key={index} className="text-gray-600 text-xs">
              #{tag}
            </span>
          ))}
        </footer>
      </div>
    </article>
  );
};

export default VideoItem;
