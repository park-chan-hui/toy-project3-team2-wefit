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
      <p className="my-2 text-base font-bold">카테고리에 넣을 영상</p>
      <div className="my-2 h-[32vh] w-full overflow-y-auto">
        {filteredVideos.map(video => (
          <div key={video.video_id} className="my-3 flex items-center">
            {checkedVideos[video.video_id] ? (
              <FaCheckCircle
                className="mx-2 flex-shrink-0 cursor-pointer text-3xl"
                onClick={() => handleClick(video.video_id)}
              />
            ) : (
              <FaRegCircle
                className="mx-2 flex-shrink-0 cursor-pointer text-3xl"
                onClick={() => handleClick(video.video_id)}
              />
            )}
            <div className="flex-1 overflow-hidden">
              <BookmarkItem {...video} />
            </div>
          </div>
        ))}
      </div>
      <Button variant="secondary" className="w-full rounded-medium">
        해당 카테고리 추가
      </Button>
    </>
  );
};

export default BookmarkCategoryEditPage;
