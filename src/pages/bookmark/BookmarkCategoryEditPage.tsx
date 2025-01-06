import LabelInput from '@/components/common/label-input/LabelInput';
import ThumbnailUpload from '@/components/thumbnail/ThumbnailUpload';
import { ThumbnailUploadProps } from '@/types/thumbnail';
import { useState } from 'react';

const BookmarkCategoryEditPage = (thumbnail: ThumbnailUploadProps) => {
  const [imgFile, setImgFile] = useState(thumbnail.imgFile);

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
        isEditPage={true}
      />
    </>
  );
};

export default BookmarkCategoryEditPage;
