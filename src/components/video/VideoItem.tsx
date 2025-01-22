import { Link } from 'react-router-dom';

import VideoStats from './VideoStats';
import EmbedYoutubeVideo from './EmbedYoutubeVideo';
import SimpleProfile from '../common/simple-profile/SimpleProfile';
import Button from '../common/button/Button';

import { VideoProps } from '@/types/video';
import { useUsers } from '@/hooks/useUsers';
import { useFollow } from '@/hooks/useFollow';

const VideoItem = ({
  thumbnail,
  video_url,
  title,
  user_id,
  hash_tag,
  like_heart,
  is_bookmarked,
  created_at,
  video_id,
  isVideoDetailPage = false,
}: VideoProps) => {
  const { userQuery, currentUserQuery } = useUsers(user_id);
  const { isFollowLoading, isFollowing, toggleFollow } = useFollow(user_id);

  const userData = userQuery.data;
  const isSameUser = currentUserQuery.data?.user_id === user_id;

  const ThumbnailContent =
    isVideoDetailPage && video_url ? (
      <EmbedYoutubeVideo videoUrl={video_url} className="mb-3" />
    ) : (
      <figure className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </figure>
    );

  const TitleContent = (
    <h2 className="text-base font-bold text-black">{title}</h2>
  );

  const HashTagContent = (
    <div className="flex flex-wrap gap-1">
      {hash_tag.map((tag, index) => (
        <span key={index} className="text-xs text-gray">
          #{tag}
        </span>
      ))}
    </div>
  );

  return (
    <article className="mb-1 w-full">
      {isVideoDetailPage ? (
        ThumbnailContent
      ) : (
        <Link to={`/video/${video_id}`}>{ThumbnailContent}</Link>
      )}

      <div className="px-1">
        <div className="mb-2 flex items-center justify-between">
          {userData && <SimpleProfile {...userData} />}

          {isVideoDetailPage ? (
            !isSameUser && (
              <Button
                variant={isFollowing ? 'primary' : 'outline'}
                size="small"
                onClick={() => toggleFollow()}
                disabled={isFollowLoading}
              >
                {isFollowing ? '팔로잉' : '팔로우'}
              </Button>
            )
          ) : (
            <VideoStats
              {...{ video_id, created_at, is_bookmarked, like_heart }}
            />
          )}
        </div>

        {isVideoDetailPage ? (
          <footer>
            {TitleContent}
            {HashTagContent}
            <div className="mt-2">
              <VideoStats
                {...{ video_id, created_at, is_bookmarked, like_heart }}
              />
            </div>
          </footer>
        ) : (
          <Link to={`/video/${video_id}`}>
            {TitleContent}
            {HashTagContent}
          </Link>
        )}
      </div>
    </article>
  );
};

export default VideoItem;
