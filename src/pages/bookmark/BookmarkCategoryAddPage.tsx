import { SaveCategories } from '@/api/categories';
import BookmarkItem from '@/components/bookmark/BookmarkItem';
import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import ThumbnailUpload from '@/components/thumbnail/ThumbnailUpload';
import { useVideos } from '@/hooks/useVideos';
import { VideoProps } from '@/types/video';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '@/utils/toast';
import { useForm, Controller } from 'react-hook-form';
import { categorySchema } from '@/schema/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '@/hooks/useUsers';

type CheckedVideos = {
  [key: string]: boolean;
};

type CheckInput = {
  categoryName: string;
  imgFile: string;
  videos: string;
};

const BookmarkCategoryAddPage = () => {
  const { currentUserQuery } = useUsers();
  const userId = currentUserQuery.data.user_id;
  const [checkedVideos, setCheckedVideos] = useState<CheckedVideos>({});

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm<CheckInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: '',
      imgFile: '',
      videos: '',
    },
  });

  const { videosQuery } = useVideos();
  const navigate = useNavigate();

  const filteredVideos: VideoProps[] =
    videosQuery.data?.filter(video => video.is_bookmarked === true) || [];

  const handleClick = (videoId: string) => {
    setCheckedVideos(prevState => {
      const newState = {
        ...prevState,
        [videoId]: !prevState[videoId],
      };

      const selectedVideos = Object.keys(newState).filter(id => newState[id]);
      if (selectedVideos.length > 0) {
        setValue('videos', selectedVideos.join(','));
        clearErrors('videos');
      } else {
        setValue('videos', '');
      }
      return newState;
    });
  };

  const handleImageChange = (imageFile: string) => {
    setValue('imgFile', imageFile, { shouldValidate: true });
  };

  const getSelectedVideos = () => {
    return Object.keys(checkedVideos).filter(videoId => checkedVideos[videoId]);
  };

  const onSubmit = async (data: CheckInput) => {
    const selectedVideos = getSelectedVideos();

    if (selectedVideos.length === 0) {
      toastError('최소 하나의 동영상을 선택해주세요!');
      return;
    }

    try {
      await SaveCategories({
        checkedVideos: selectedVideos.reduce(
          (videos, videoId) => {
            videos[videoId] = true;
            return videos;
          },
          {} as Record<string, boolean>,
        ),
        title: data.categoryName,
        imgFile: data.imgFile,
        userId,
      });
      toastSuccess('카테고리 저장 성공!');
      navigate(-1);
    } catch (error) {
      toastError('다시 한번 시도해 주세요!');
      console.error(error); // Lint 관련 에러로 추가
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-h-[75vh] flex-1 overflow-y-auto">
        <div className="space-y-3">
          <div>
            <Controller
              name="categoryName"
              control={control}
              render={({ field }) => (
                <LabelInput
                  title="카테고리 명"
                  placeholder="카테고리 명을 입력해주세요."
                  onChange={e => {
                    field.onChange(e);
                    if (e.target.value) {
                      clearErrors('categoryName');
                    }
                  }}
                  value={field.value}
                />
              )}
            />
            {errors.categoryName && (
              <p className="text-sm text-red-500">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          <div>
            <ThumbnailUpload
              title="카테고리 썸네일"
              message="카테고리 썸네일을 추가해보아요!"
              imgFile={control._formValues.imgFile}
              onImageChange={handleImageChange}
              isEditPage={false}
            />
            {errors.imgFile && (
              <p className="mt-2 text-sm text-red-500">
                {errors.imgFile.message}
              </p>
            )}
          </div>

          <div>
            <p className="my-2 text-base font-bold">카테고리에 넣을 영상</p>
            <div className="flex flex-col gap-5">
              {filteredVideos.map(video => (
                <div key={video.video_id} className="flex items-center gap-2">
                  {checkedVideos[video.video_id] ? (
                    <FaCheckCircle
                      className="flex-shrink-0 cursor-pointer text-3xl"
                      onClick={() => handleClick(video.video_id)}
                    />
                  ) : (
                    <FaRegCircle
                      className="flex-shrink-0 cursor-pointer text-3xl"
                      onClick={() => handleClick(video.video_id)}
                    />
                  )}

                  <div
                    className="w-full cursor-pointer overflow-hidden"
                    onClick={() => handleClick(video.video_id)}
                  >
                    <div className="pointer-events-none flex-1 overflow-hidden">
                      <BookmarkItem {...video} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.videos && (
              <p className="my-2 text-sm text-red-500">
                {errors.videos.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0">
        <Button
          variant="secondary"
          className="my-2 w-full rounded-medium"
          type="submit"
        >
          해당 카테고리 추가
        </Button>
      </div>
    </form>
  );
};

export default BookmarkCategoryAddPage;
