import { Link } from 'react-router-dom';
import { GoTrash } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';

import SimpleProfile from '../common/simple-profile/SimpleProfile';
import MyPageVideoStats from './MyPageVideoStats';

import { VideoProps } from '@/types/video';
import { useUserStore } from '@/store/useUserStore';
import { useComments } from '@/hooks/useComments';
import { useVideos } from '@/hooks/useVideos';

const MyUploadVideoItem = ({
  thumbnail,
  title,
  video_id,
  like_heart,
}: VideoProps) => {
  const userData = useUserStore(state => state.user);
  const { comments } = useComments({ videoId: video_id });
  const { deleteVideoMutation } = useVideos({ videoId: video_id });
  const deleteVideos = () => {
    if (window.confirm('선택한 동영상을 삭제하시겠습니까?')) {
      deleteVideoMutation.mutate(video_id);
    }
  };
  return (
    <article className="mb-1 flex h-16 w-full">
      <figure className="relative flex h-full w-32 items-center">
        <Link to={`/video/${video_id}`}>
          <img
            src={thumbnail}
            alt={title}
            className="aspect-video max-w-32 rounded-small object-cover"
          />
        </Link>
      </figure>

      <div className="ml-2 flex w-full min-w-0 flex-col">
        <Link to={`/video/${video_id}`}>
          <p className="mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-black">
            {title}
          </p>
        </Link>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            {userData && <SimpleProfile {...userData} textSize="small" />}
            <MyPageVideoStats {...{ comments, like_heart }} />
          </div>

          <div className="flex justify-between text-gray">
            <div className="flex items-center gap-1.5">
              <GoTrash
                size={20}
                className="cursor-pointer"
                onClick={deleteVideos}
              />
              <Link to={`/mypage/video-edit/${video_id}`}>
                <FiEdit size={20} className="cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyUploadVideoItem;
