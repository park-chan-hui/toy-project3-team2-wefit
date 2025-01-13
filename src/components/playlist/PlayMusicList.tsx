import { useMusics } from '@/hooks/useMusics';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { Link } from 'react-router-dom';

const PlayMusicList = () => {
  const { data: musics, isLoading } = useMusics();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {musics?.map(music => (
        <Link to={`/playlist/${music.list_id}`} key={music.list_id}>
          <div className="mb-2">
            <figure className="relative mb-3 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
              <img
                src={music.thumbnail}
                alt={music.title}
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="flex w-full flex-row justify-between gap-1">
              <div className="relative flex w-[65%] flex-row overflow-hidden whitespace-nowrap">
                <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                  {music.title}
                </h2>
                <h2 className="font-bold">({music.video_list.length})</h2>
              </div>
              <p className="mr-1 flex items-center text-small">
                최종 수정일 {getTimeAgo(music.created_at)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default PlayMusicList;
