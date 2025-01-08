import { Link } from 'react-router-dom';
import SimpleProfile from '../common/simple-profile/SimpleProfile';
import { mockUsers } from '@/mocks/mockUsers';
import { VideoProps } from '@/types/video';
import editLogo from '@/assets/basil_edit-outline.svg';
import { FaRegTrashAlt } from 'react-icons/fa';

const MyUploadVideoItem = ({
  thumbnail,
  title,
  user_id,
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

          <div className="mt-1 flex w-14 justify-between text-gray">
            <div className="flex flex-grow items-center">
              <FaRegTrashAlt size={25} className="mr-1 cursor-pointer" />

              <Link to={`/mypage/video-edit/${video_id}`}>
                <img
                  src={editLogo}
                  alt="수정 로고"
                  className="h-[30px] w-[30px] self-start"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyUploadVideoItem;
