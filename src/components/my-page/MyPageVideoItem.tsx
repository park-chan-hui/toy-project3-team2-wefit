import { Link } from 'react-router-dom';
import SimpleProfile from '../common/simple-profile/SimpleProfile';
import { mockUsers } from '@/mocks/mockUsers';
import MyPageVideoStats from './MyPageVideoStats';

type MyPageVideoProps = {
  video_id: string;
  video_url: string;
  user_id: string;
  nickname: string;
  thumbnail: string;
  title: string;
  hash_tag: string[];
  like_heart: number;
  comments: string[];
  is_bookmarked: boolean;
  created_at: Date;
  myUploadVideos?: boolean;
};
const MyPageVideoItem = ({
  thumbnail,
  title,
  user_id,
  like_heart,
  comments,
  video_id,
  myUploadVideos,
}: MyPageVideoProps) => {
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
          {userData && <SimpleProfile {...userData} />}
        </div>

        <Link to={`/video/${video_id}`}>
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold text-black">
            {title}
          </h2>
        </Link>
        {myUploadVideos && <MyPageVideoStats {...{ comments, like_heart }} />}
      </div>
    </article>
  );
};

export default MyPageVideoItem;
