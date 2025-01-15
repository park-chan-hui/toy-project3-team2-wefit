import { getTimeAgo } from '@/utils/getTimeAgo';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { LuTableOfContents } from 'react-icons/lu';
import type { PlayListVideoProps } from '@/types/playList';
import EmbedYoutubeVideo from '@/components/video/EmbedYoutubeVideo';
import Button from '@/components/common/button/Button';
import { useUsers } from '@/hooks/useUsers';
import { useCategories } from '@/hooks/useCategories';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '@/constants/constants';
const PlayListVideo = ({ object, videoUrl }: PlayListVideoProps) => {
  const navigate = useNavigate();
  const { currentUserQuery } = useUsers();
  const { deleteCategoriesQuery } = useCategories(
    currentUserQuery.data.user_id,
  );
  const { BOOKMARK_CATEGORY_ADD } = ROUTER_PATH;

  if (!object) {
    return;
  }
  const videoListLength = object.categoried_videos
    ? object.categoried_videos.length
    : 0;

  const handleEdit = () => {
    navigate(BOOKMARK_CATEGORY_ADD, { state: { object } });
  };

  const handleDelete = (category_id: string) => {
    const confirmDelete = window.confirm('북마크 카테고리를 삭제하시겠어요?');
    if (confirmDelete) {
      deleteCategoriesQuery.mutate(category_id);
      navigate(-1);
    }
  };

  return (
    <div className="sticky top-0 z-10 mb-2 bg-white">
      {videoUrl ? (
        <EmbedYoutubeVideo videoUrl={videoUrl} className="mb-3" />
      ) : (
        <figure className="relative mb-3 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
          <img
            src={object.category_thumbnail}
            alt={object.title}
            className="h-full w-full object-cover"
          />
        </figure>
      )}

      <div className="flex w-full flex-row justify-between gap-1">
        <div className="relative flex w-[90%] flex-row overflow-hidden whitespace-nowrap">
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
            {object.title}
          </h2>
        </div>

        {object.is_like ? (
          <IoHeartSharp size={24} className="mr-1" />
        ) : (
          <IoHeartOutline size={24} className="mr-1" />
        )}
      </div>

      <p>{object.nickname}</p>

      <p className="mr-1 flex items-center gap-2 text-small">
        <span>{object.is_open ? '공개' : '비공개'}</span>
        <span>/</span>
        <span>{getTimeAgo(object.updated_at)}</span>
      </p>

      <div className="mt-2 flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <LuTableOfContents size={24} className="mr-1" />
          재생목록
          <h2 className="font-bold">({videoListLength})</h2>
        </div>
        <div>
          {object.user_id === currentUserQuery.data.user_id && (
            <div className="flex gap-2">
              <Button variant="primary" size="small" onClick={handleEdit}>
                수정
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleDelete(object.category_id)}
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayListVideo;
