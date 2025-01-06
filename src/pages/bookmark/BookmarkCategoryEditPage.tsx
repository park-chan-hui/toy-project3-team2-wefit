import BookmarkItem from '@/components/bookmark/BookmarkItem';
import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import ThumbnailUpload from '@/components/thumbnail/ThumbnailUpload';
import { mockVideos } from '@/mocks/mockVideos';
import { ThumbnailUploadProps } from '@/types/thumbnail';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa6';

type CheckedVideos = {
  [key: string]: boolean;
};

const BookmarkCategoryEditPage = (thumbnail: ThumbnailUploadProps) => {
  const [imgFile, setImgFile] = useState(thumbnail.imgFile);
  const [checkedVideos, setCheckedVideos] = useState<CheckedVideos>({});

  const filteredVideos = mockVideos.filter(video => {
    return video.is_bookmarked === true;
  });

  const handleClick = (videoId: string) => {
    setCheckedVideos(prevState => ({
      ...prevState,
      [videoId]: !prevState[videoId],
    }));
  };

  return (
    <>
      <LabelInput
        title="카테고리 명"
        placeholder="카테고리 명을 입력해주세요."
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

        <Button variant="secondary" className="w-full rounded-medium">
          해당 카테고리 추가
        </Button>
      </div>
    </>
  );
};

export default BookmarkCategoryEditPage;
