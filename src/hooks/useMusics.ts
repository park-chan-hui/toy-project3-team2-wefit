import { useQuery } from '@tanstack/react-query';
import { fetchMusics } from '@/api/musics';

const useMusics = () => {
  const musicsQuery = useQuery({
    queryKey: ['musics'],
    queryFn: fetchMusics,
    select: data => {
      return data.map(music => ({
        ...music,
        created_at: new Date(music.created_at),
      }));
    },
  });

  return musicsQuery;
};

export { useMusics };
