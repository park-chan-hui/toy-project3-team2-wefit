import { Control, Controller } from 'react-hook-form';
import ThumbnailUpload from '../thumbnail/ThumbnailUpload';
import { VideoProps } from '@/types/video';

const VideoThumnailForm = ({
  control,
  videoData,
}: {
  control: Control<{
    title: string;
    video_url: string;
    hash_tag: string[];
    thumbnail?: string | undefined;
  }>;
  videoData?: VideoProps;
}) => {
  return (
    <section>
      <Controller
        name="thumbnail"
        control={control}
        render={({ field }) => (
          <ThumbnailUpload
            imgFile={field.value || videoData?.thumbnail || ''}
            onImageChange={field.onChange}
          />
        )}
      />
    </section>
  );
};

export default VideoThumnailForm;
