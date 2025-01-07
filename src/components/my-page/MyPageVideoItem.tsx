import { Link } from 'react-router-dom';
import SimpleProfile from '../common/simple-profile/SimpleProfile';
import { mockUsers } from '@/mocks/mockUsers';
import MyPageVideoStats from './MyPageVideoStats';
import { VideoProps } from '@/types/video';

const MyPageVideoItem = ({
  thumbnail,
  title,
  user_id,
  like_heart,
  comments,
  video_id,
  myUploadVideos,
}: VideoProps & { myUploadVideos?: boolean }) => {
  const userData = mockUsers.find(user => user.user_id === user_id);

  return (
    <article className="mb-1 w-40">
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
          {userData && <SimpleProfile imageSize="small" {...userData} />}
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
