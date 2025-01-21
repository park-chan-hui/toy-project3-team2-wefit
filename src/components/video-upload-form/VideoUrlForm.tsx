import { Control, Controller } from 'react-hook-form';

import VideoUploadBox from '../video/VideoUploadBox';

const VideoUrlForm = ({
  control,
  error,
}: {
  control: Control<{
    title: string;
    video_url: string;
    hash_tag: string[];
    thumbnail?: string | undefined;
  }>;
  error?: string;
}) => {
  return (
    <section>
      <Controller
        name="video_url"
        control={control}
        render={({ field }) => (
          <VideoUploadBox videoURL={field.value} setVideoURL={field.onChange} />
        )}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </section>
  );
};

export default VideoUrlForm;
