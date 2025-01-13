import SimpleProfile from '@/components/common/simple-profile/SimpleProfile';
import { UserProps } from '@/types/user';
import { cn } from '@/utils/cn';
import { useVideos } from '@/hooks/useVideos';

type PlayListItemProps = {
  video: string;
  thumbnail: string;
  // eslint-disable-next-line no-unused-vars
  onThumbnailChange: (thumbnail: string) => void;
  // eslint-disable-next-line no-unused-vars
  onVideoUrlChange: (videoUrl: string) => void;
  userData?: UserProps;
};

const PlayListItem = ({
  video,
  thumbnail,
  onThumbnailChange,
  onVideoUrlChange,
  userData,
}: PlayListItemProps) => {
  const { videoQuery } = useVideos(video);

  const videoData = videoQuery.data;

  return (
    <>
      {videoData && (
        <div
          key={videoData.video_id}
          className={cn(
            'flex cursor-pointer items-center gap-2',
            videoData.thumbnail === thumbnail ? 'bg-gray-300' : '',
          )}
          onClick={() => {
            onThumbnailChange(videoData.thumbnail);
            onVideoUrlChange(videoData.video_url);
          }}
        >
          <figure className="relative flex h-full w-32 items-center">
            <img
              src={videoData.thumbnail}
              alt={videoData.title}
              className="aspect-video h-full max-w-32 rounded-small object-cover"
            />
          </figure>

          <div className="flex min-w-0 flex-col">
            <p className="mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-black">
              {videoData.title}
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
      )}
    </>
  );
};

export default PlayListItem;
