import VideoCategoriesForm from './VideoCategoriesForm';
import VideoTitleForm from './VideoTitleForm';
import Button from '../common/button/Button';
import VideoThumnailForm from './VideoThumnailForm';
import VideoUrlForm from './VideoUrlForm';
import { VideoProps } from '@/types/video';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VideoFormValues, videoSchema } from '@/schema/videoUploadSchema';
import VideoUploadBox from '../video/VideoUploadBox';
import { useVideos } from '@/hooks/useVideos';
import { useVideoCategories } from '@/hooks/useVideoCategories';
import { getYoutubeVideoId } from '@/utils/getYoutubeVideoId';

const VideoUploadForm = ({
  isEditPage,
  videoData,
}: {
  isEditPage: boolean;
  videoData?: VideoProps;
}) => {
  const {
    selectedTags,
    initialCategories,
    isAddVideoCategory,
    newCategory,
    toggleTag,
    setNewCategory,
    setIsAddVideoCategory,
    addCategory,
  } = useVideoCategories(videoData?.hash_tag);

  const { updateVideoMutation, addVideoMutation } = useVideos();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: isEditPage
      ? {
          video_url: videoData?.video_url,
          title: videoData?.title,
          thumbnail: videoData?.thumbnail,
          hash_tag: videoData?.hash_tag,
        }
      : {
          video_url: '',
          title: '',
          thumbnail: '',
          hash_tag: [],
        },
  });
  const imgFile = watch('thumbnail');

  const onSubmit = (data: VideoFormValues) => {
    const videoURLId = getYoutubeVideoId(data.video_url);
    const newThumbnail =
      imgFile || `https://img.youtube.com/vi/${videoURLId}/0.jpg`;

    const videoUploadForm = {
      ...data,
      thumbnail: newThumbnail,
      hash_tag: selectedTags,
    };

    if (isEditPage) {
      updateVideoMutation.mutate({
        videoId: videoData!.video_id,
        updateData: videoUploadForm,
      });
    } else {
      addVideoMutation.mutate(videoUploadForm);
    }
  };

  const handleReset = () => {
    reset();
    setNewCategory('');
    setIsAddVideoCategory(false);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {isEditPage && videoData ? (
        <section>
          <VideoUploadBox isEditPage videoURL={videoData.video_url} />
        </section>
      ) : (
        <VideoUrlForm control={control} error={errors.video_url?.message} />
      )}

      <VideoTitleForm control={control} error={errors.title?.message} />

      <VideoCategoriesForm
        control={control}
        error={errors.hash_tag?.message}
        initialCategories={initialCategories}
        selectedTags={selectedTags}
        isAddVideoCategory={isAddVideoCategory}
        newCategory={newCategory}
        toggleTag={toggleTag}
        setNewCategory={setNewCategory}
        setIsAddVideoCategory={setIsAddVideoCategory}
        addCategory={addCategory}
      />

      <VideoThumnailForm control={control} videoData={videoData} />

      <div className="flex w-full gap-small">
        <Button type="submit" className="w-1/2">
          업로드
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="w-1/2"
          onClick={handleReset}
        >
          초기화
        </Button>
      </div>
    </form>
  );
};

export default VideoUploadForm;
