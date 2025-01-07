import { mockUsers } from '@/mocks/mockUsers';
import type { BookmarkProps } from '@/types/bookmark';
import PlayListItem from '@/components/playlist/PlayListItem';

type PlayListProps = {
  bookmark: BookmarkProps;
  // eslint-disable-next-line no-unused-vars
  onThumbnailChange: (thumbnail: string) => void;
  thumbnail: string;
};

const PlayList = ({
  bookmark,
  onThumbnailChange,
  thumbnail,
}: PlayListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {bookmark.video_list.map(video => {
        const userData = mockUsers.find(user => user.user_id === video.user_id);
        return (
          <PlayListItem
            key={video.video_id}
            video={video}
            thumbnail={thumbnail}
            onThumbnailChange={onThumbnailChange}
            userData={userData}
          />
        );
      })}
    </div>
  );
};

export default PlayList;
