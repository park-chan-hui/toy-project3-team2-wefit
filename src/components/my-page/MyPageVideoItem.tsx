import { Link } from 'react-router-dom';
import SimpleProfile from '../common/simple-profile/SimpleProfile';
import MyPageVideoStats from './MyPageVideoStats';
import { VideoProps } from '@/types/video';
import { useComments } from '@/hooks/useComments';
import { useUsers } from '@/hooks/useUsers';

const MyPageVideoItem = ({
  thumbnail,
  title,
  user_id,
  like_heart,
  video_id,
  myUploadVideos,
}: VideoProps & { myUploadVideos?: boolean }) => {
  const { comments } = useComments(video_id);
  const { userQuery } = useUsers(user_id);
  const { data: profileData } = userQuery;

  return (
    <article className="mb-1">
      <Link to={`/video/${video_id}`}>
        <figure className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
        </figure>
      </Link>

      <div className="px-1">
        <div className="mb-2 flex items-center justify-between">
          {profileData && <SimpleProfile imageSize="small" {...profileData} />}
        </div>

        <Link to={`/video/${video_id}`}>
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-black">
            {title}
          </h2>
        </Link>
        {myUploadVideos && <MyPageVideoStats {...{ comments, like_heart }} />}
      </div>
    </article>
  );
};

export default MyPageVideoItem;
