import thumnailUpload from '@/assets/thumnail-upload.svg';

import { ThumbnailUploadProps } from '@/types/thumbnail';
import { useSelectImage } from '@/hooks/useSelectImage';

const ThumbnailUpload = ({
  title = '썸네일',
  message = '썸네일을 추가해보아요!',
  imgFile,
  onImageChange,
  isEditPage,
}: ThumbnailUploadProps) => {
  const { imgRef, saveImgFile, handleInput } = useSelectImage(onImageChange);

  if (isEditPage) {
    return (
      <figure className="flex flex-col gap-2">
        <p className="text-base font-bold">{title}</p>
        <div className="aspect-video w-full overflow-auto rounded-medium">
          <div className="flex aspect-video cursor-pointer flex-col items-center justify-center bg-gray-100 p-0 shadow-inner">
            <img
              src={imgFile}
              alt="프로필 이미지"
              className="h-full w-full object-cover"
              onClick={handleInput}
            />
          </div>
        </div>
        <input
          id="profileImg"
          ref={imgRef}
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={saveImgFile}
          className="hidden"
        />
      </figure>
    );
  }

  return (
    <figure className="flex flex-col gap-2">
      <p className="text-base font-bold">{title}</p>
      <div className="aspect-video w-full overflow-auto rounded-medium">
        {imgFile ? (
          <img
            src={imgFile}
            alt="프로필 이미지"
            className="h-full w-full cursor-pointer object-cover"
            onClick={handleInput}
          />
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center bg-gray-100 p-medium shadow-inner">
            <img
              src={thumnailUpload}
              alt="썸네일 업로드 이미지"
              className="cursor-pointer"
              onClick={handleInput}
            />
            <p className="text-small font-bold">{message}</p>
          </div>
        )}
      </div>
      <input
        id="profileImg"
        ref={imgRef}
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={saveImgFile}
        className="hidden"
      />
    </figure>
  );
};

export default ThumbnailUpload;
