import YouTube from 'react-youtube';

import { getYoutubeVideoId } from '@/utils/getYoutubeVideoId';
import { cn } from '@/utils/cn';

type EmbedYoutubeVideoProps = {
  videoUrl: string;
  className?: string;
};

const EmbedYoutubeVideo = ({ videoUrl, className }: EmbedYoutubeVideoProps) => {
  const videoOption = {
    width: '100%',
    height: '100%',
  };

  return (
    <figure
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-lg',
        className,
      )}
    >
      <YouTube
        videoId={getYoutubeVideoId(videoUrl)}
        title="youtube 동영상"
        opts={videoOption}
        className="absolute inset-0"
      />
    </figure>
  );
};

export default EmbedYoutubeVideo;
