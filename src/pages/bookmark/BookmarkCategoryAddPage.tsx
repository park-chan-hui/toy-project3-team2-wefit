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

type CheckedVideos = {
  [key: string]: boolean;
};

const BookmarkCategoryEditPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [imgFile, setImgFile] = useState('');
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

  const handleSave = async () => {
    const userId = 'user1';

    try {
      await SaveCategories({
        checkedVideos,
        title: categoryName,
        imgFile,
        userId,
      });
      navigate(-1);
    } catch (error) {
      console.error('카테고리 저장 중 오류 발생:', error);
      alert('카테고리 저장에 실패했습니다. 다시 시도해주세요.');
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
