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
type CheckedVideos = {
  [key: string]: boolean;
};

const BookmarkCategoryEditPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [errors, setErrors] = useState({
    categoryName: '',
    imgFile: '',
    videos: '',
  });
  const [checkedVideos, setCheckedVideos] = useState<CheckedVideos>({});

  const { videosQuery } = useVideos();
  const navigate = useNavigate();

  const filteredVideos: VideoProps[] =
    videosQuery.data?.filter(video => {
      return video.is_bookmarked === true;
    }) || [];

  const handleClick = (videoId: string) => {
    setCheckedVideos(prevState => ({
      ...prevState,
      [videoId]: !prevState[videoId],
    }));
  };

  const validInputs = () => {
    let is_valid = true;
    const newErrors = {
      categoryName: '',
      imgFile: '',
      videos: '',
    };

    if (!categoryName) {
      newErrors.categoryName = '카테고리 명을 입력해주세요';
      is_valid = false;
    }
    if (!imgFile) {
      newErrors.imgFile = '썸네일을 추가해주세요';
      is_valid = false;
    }
    const hasCheckedVideos = Object.values(checkedVideos).some(
      value => value === true,
    );
    if (!hasCheckedVideos) {
      newErrors.videos = '최소 하나 영상을 선택해주세요';
      is_valid = false;
    }

    setErrors(newErrors);
    return is_valid;
  };

  const handleSave = async () => {
    if (!validInputs()) {
      if (errors.categoryName) {
        toastError(errors.categoryName);
      }
      if (errors.imgFile) {
        toastError(errors.imgFile);
      }
      if (errors.videos) {
        toastError(errors.videos);
      }
      return;
    }

    const userId = 'user1';

    try {
      await SaveCategories({
        checkedVideos,
        title: categoryName,
        imgFile,
        userId,
      });
      toastSuccess('카테고리 저장 성공!');
      navigate(-1);
    } catch (error) {
      toastError('다시 한번 시도해 주세요!');
      console.error('카테고리 저장 중 오류 발생:', error);
    }
  };

  return (
    <>
      <LabelInput
        title="카테고리 명"
        placeholder="카테고리 명을 입력해주세요."
        value={categoryName}
        onChange={e => setCategoryName(e.target.value)}
      />

      <ThumbnailUpload
        title="카테고리 썸네일"
        message="카테고리 썸네일을 추가해보아요!"
        imgFile={imgFile}
        onImageChange={setImgFile}
        isEditPage={false}
      />

      <div className="flex flex-col gap-4">
        <p className="mt-2 text-base font-bold">카테고리에 넣을 영상</p>

        <div className="flex h-[30vh] w-full flex-col gap-5 overflow-y-auto">
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

        <Button
          variant="secondary"
          className="w-full rounded-medium"
          onClick={handleSave}
        >
          해당 카테고리 추가
        </Button>
      </div>
    </>
  );
};

export default BookmarkCategoryEditPage;
