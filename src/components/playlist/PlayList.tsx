import { mockUsers } from '@/mocks/mockUsers';
import SimpleProfile from '@/components/common/simple-profile/SimpleProfile';
import { cn } from '@/utils/cn';
import type { BookmarkProps } from '@/types/bookmark';

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
          <div
            key={video.video_id}
            className={cn(
              'flex cursor-pointer items-center gap-2',
              video.thumbnail === thumbnail ? 'bg-gray-300' : '',
            )}
            onClick={() => {
              onThumbnailChange(video.thumbnail);
            }}
          >
            <figure className="relative flex h-full w-32 items-center">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="aspect-video h-full max-w-32 rounded-small object-cover"
              />
            </figure>

            <div className="flex min-w-0 flex-col">
              <p className="mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-black">
                {video.title}
              </p>

              {userData && (
                <div className="pointer-events-none">
                  <SimpleProfile
                    {...userData}
                    imageSize="large"
                    textSize="small"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayList;
