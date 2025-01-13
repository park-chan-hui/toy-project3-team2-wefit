import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import ThumbnailUpload from '@/components/thumbnail/ThumbnailUpload';
import VideoUploadBox from '@/components/video/VideoUploadBox';
import MyPageVideoCategories from '@/components/my-page/MyPageVideoCategories';
import { useVideoCategories } from '@/hooks/useVideoCategories';
import { useVideos } from '@/hooks/useVideos';
import { getYoutubeVideoId } from '@/utils/getYoutubeVideoId';
import { VideoFormValues, videoSchema } from '@/schema/videoUploadSchema';

const VideoAddPage = () => {
  const basicVideoCategories = [
    '가슴',
    '등',
    '어깨',
    '하체',
    '복근',
    '팔',
    '엉덩이',
    '종아리',
    '음악',
  ];

  const {
    selectedTags,
    isAddVideoCategory,
    addVideoCategoryValue,
    videoCategories,
    toggleTag,
    addVideoCategories,
    handleAddVideoCategoryValue,
    setSelectedTags,
    setVideoCategories,
    setIsAddVideoCategory,
    setAddVideoCategoryValue,
  } = useVideoCategories(basicVideoCategories);

  const { addVideoMutation } = useVideos();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
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

    addVideoMutation.mutate(videoUploadForm);
  };

  const handleReset = () => {
    reset();
    setVideoCategories(basicVideoCategories);
    setIsAddVideoCategory(false);
    setAddVideoCategoryValue('');
    setSelectedTags([]);
  };

  return (
    <main className="flex flex-col gap-4">
      <Controller
        name="video_url"
        control={control}
        render={({ field }) => (
          <VideoUploadBox videoURL={field.value} setVideoURL={field.onChange} />
        )}
      />
      {errors.video_url && (
        <p style={{ color: 'red' }}>{errors.video_url.message}</p>
      )}

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
      {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

      <Controller
        name="hash_tag"
        control={control}
        render={({ field }) => (
          <MyPageVideoCategories
            selectedTags={field.value || []}
            isAddVideoCategory={isAddVideoCategory}
            addVideoCategoryValue={addVideoCategoryValue}
            videoCategories={videoCategories}
            toggleTag={tag => {
              toggleTag(tag); // 상태 업데이트
              if (field.value?.includes(tag)) {
                field.onChange(field.value.filter(t => t !== tag)); // 태그 제거
              } else {
                field.onChange([...(field.value || []), tag]); // 태그 추가
              }
            }}
            addVideoCategories={addVideoCategories}
            handleAddVideoCategoryValue={handleAddVideoCategoryValue}
          />
        )}
      />
      {errors.hash_tag && (
        <p style={{ color: 'red' }}>{errors.hash_tag.message}</p>
      )}

      <Controller
        name="thumbnail"
        control={control}
        render={({ field }) => (
          <ThumbnailUpload
            imgFile={field.value || ''}
            onImageChange={field.onChange}
          />
        )}
      />

      <div className="flex w-full gap-small">
        <Button
          type="submit"
          className="w-1/2"
          onClick={handleSubmit(onSubmit)}
        >
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
    </main>
  );
};

export default VideoAddPage;
