import { Control, Controller } from 'react-hook-form';
import LabelInput from '../common/label-input/LabelInput';

const VideoTitleForm = ({
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
        name="title"
        control={control}
        render={({ field }) => (
          <LabelInput
            title="영상 제목"
            placeholder="영상 제목을 입력해주세요."
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </section>
  );
};

export default VideoTitleForm;
