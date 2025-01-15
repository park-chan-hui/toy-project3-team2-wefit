import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import { useEffect } from 'react';
import { videoCategories } from '@/mocks/videoCategories';
import VideoUploadBox from '@/components/video/VideoUploadBox';
import ThumbnailUpload from '@/components/thumbnail/ThumbnailUpload';
import { useParams } from 'react-router-dom';
import { useVideos } from '@/hooks/useVideos';
import { getYoutubeVideoId } from '@/utils/getYoutubeVideoId';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { VideoFormValues, videoSchema } from '@/schema/videoUploadSchema';
import { useVideoCategories } from '@/hooks/useVideoCategories';
import MyPageVideoCategories from '@/components/my-page/MyPageVideoCategories';
import VideoEditSkeleton from '@/components/skeleton/video/VideoEditSkeleton';

const VideoEditPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { videoQuery } = useVideos({ videoId: videoId });
  const { data: videoData, isLoading } = videoQuery;
  const hashTagList = [...videoCategories, ...videoData.hash_tag];
  hashTagList.shift();
  const setHashTagList = new Set(hashTagList);
  const uploadVideoCategories = [...setHashTagList];

  const {
    selectedTags,
    isAddVideoCategory,
    addVideoCategoryValue,
    videoCategoryList,
    toggleTag,
    addVideoCategories,
    handleAddVideoCategoryValue,
    setSelectedTags,
    setVideoCategoryList,
    setIsAddVideoCategory,
    setAddVideoCategoryValue,
  } = useVideoCategories(uploadVideoCategories);
  useEffect(() => {
    setSelectedTags(videoData.hash_tag);
  }, [setSelectedTags, videoData.hash_tag]);

  const { updateVideoMutation } = useVideos();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      video_url: videoData.video_url,
      title: videoData.title,
      thumbnail: videoData.thumnail,
      hash_tag: videoData.hash_tag,
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

    updateVideoMutation.mutate({
      videoId: videoData.video_id,
      updateData: videoUploadForm,
    });
  };

  const handleReset = () => {
    reset();
    setVideoCategoryList(uploadVideoCategories);
    setIsAddVideoCategory(false);
    setAddVideoCategoryValue('');
    setSelectedTags([videoData.hash_tag]);
  };
  if (isLoading) {
    return <VideoEditSkeleton />;
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <VideoUploadBox isEditPage videoURL={videoData.video_url} />
      </section>

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
        {errors.title && (
          <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
        )}
      </section>

      <section>
        <Controller
          name="hash_tag"
          control={control}
          render={({ field }) => (
            <MyPageVideoCategories
              selectedTags={field.value}
              isAddVideoCategory={isAddVideoCategory}
              addVideoCategoryValue={addVideoCategoryValue}
              videoCategories={videoCategoryList}
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
          <p className="mt-2 text-sm text-red-500">{errors.hash_tag.message}</p>
        )}
      </section>

      <section>
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <ThumbnailUpload
              imgFile={field.value || videoData.thumbnail}
              onImageChange={field.onChange}
            />
          )}
        />
      </section>

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

export default VideoEditPage;
