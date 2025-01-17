import SimpleProfile from '@/components/common/simple-profile/SimpleProfile';
import { cn } from '@/utils/cn';
import { useVideos } from '@/hooks/useVideos';
import { useUsers } from '@/hooks/useUsers';
import MusicItemSkeleton from '@/components/skeleton/music/MusicItemSkeleton';

type PlayListItemProps = {
  video: string;
  // eslint-disable-next-line no-unused-vars
  onVideoUrlChange: (videoUrl: string) => void;
};

const PlayListItem = ({ video, onVideoUrlChange }: PlayListItemProps) => {
  const { videoQuery } = useVideos({ videoId: video });

  const videoData = videoQuery.data;
  const { userQuery } = useUsers(videoData?.user_id);

  if (videoQuery.isLoading || userQuery.isLoading) {
    return <MusicItemSkeleton />;
  }

  const userData =
    videoData && userQuery.data
      ? {
          user_id: userQuery.data.user_id,
          nickname: userQuery.data.nickname,
          user_image: userQuery.data.user_image,
        }
      : null;

  if (videoQuery.error)
    return <div>비디오 오류: {videoQuery.error.message}</div>;
  if (userQuery.error) return <div>사용자 오류: {userQuery.error.message}</div>;

  return (
    <>
      {videoData && (
        <div
          key={videoData.video_id}
          className={cn('flex cursor-pointer items-center gap-2')}
          onClick={() => {
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
