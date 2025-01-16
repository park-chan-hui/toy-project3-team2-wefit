import MusicSkeleton from '@/components/skeleton/music/MusicSkeleton';
import { useMusics } from '@/hooks/useMusics';
import { cn } from '@/utils/cn';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { Link } from 'react-router-dom';

const PlayMusicList = ({ selectedCategory }: { selectedCategory?: string }) => {
  const { data: musics, isLoading } = useMusics();

  if (isLoading) {
    return <MusicSkeleton />;
  }

  return (
    <>
      <div
        className={` ${musics?.length !== 0 && selectedCategory === '전체' && 'grid w-full grid-cols-2 gap-4'}`}
      >
        {musics?.map(music => (
          <Link to={`/playlist/${music.list_id}`} key={music.list_id}>
            <div className="mb-2">
              <figure className="relative mb-3 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
                <img
                  src={music.category_thumbnail}
                  alt={music.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div
                className={cn(
                  'flex w-full flex-row justify-between gap-1',
                  selectedCategory === '전체' && 'flex-col',
                )}
              >
                <div className="relative flex w-[65%] flex-row overflow-hidden whitespace-nowrap">
                  <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                    {music.title}
                  </h2>
                  <h2 className="font-bold">
                    ({(music.categoried_videos || []).length})
                  </h2>
                </div>
                <p className="mr-1 flex items-center text-small">
                  최종 수정일 {getTimeAgo(music.updated_at)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PlayMusicList;
