import { Link } from 'react-router-dom';

import { useMusics } from '@/hooks/useMusics';
import { cn } from '@/utils/cn';
import { getTimeAgo } from '@/utils/getTimeAgo';

type MusicCategoryListProps = {
  selectedCategory?: string;
};

const PlayMusicList = ({ selectedCategory }: MusicCategoryListProps) => {
  const { data: musics, isLoading } = useMusics();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div
        className={` ${musics?.length !== 0 && selectedCategory === '전체' && 'grid w-full grid-cols-2 gap-4'}`}
      >
        {musics?.map(music => (
          <Link to={`/playlist/${music.list_id}`} key={music.list_id}>
            <div className="mb-4">
              <figure className="relative mb-2 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
                <img
                  src={music.category_thumbnail}
                  alt={music.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div
                className={cn(
                  'flex w-full flex-row justify-between',
                  selectedCategory === '전체' && 'flex-col',
                )}
              >
                <div
                  className={cn(
                    'relative flex flex-row overflow-hidden whitespace-nowrap',
                    selectedCategory === '전체' ? 'w-[100%]' : 'w-[70%]',
                  )}
                >
                  <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                    {music.title}
                  </h2>
                  <h2 className="font-bold">
                    ({(music.categoried_videos || []).length})
                  </h2>
                </div>
                <div
                  className={cn(
                    'flex items-center',
                    selectedCategory === '음악만 보기' && 'justify-end',
                  )}
                >
                  <p className="mr-1 min-w-[31%] items-center text-xsmall">
                    최종 수정일 {getTimeAgo(music.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PlayMusicList;
