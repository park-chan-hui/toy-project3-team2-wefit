import PlusCircle from '@/assets/plus-circle.svg';
import { ThumbnailUploadProps } from '@/types/thumbnail';
import { useSelectImage } from '@/hooks/useSelectImage';

const MyPageEditProfileImage = ({
  userImage,
  onImageChange,
  imgFile,
}: ThumbnailUploadProps & { userImage: string }) => {
  const { imgRef, saveImgFile, handleInput } = useSelectImage(onImageChange);
  return (
    <section className="flex flex-col items-center">
      <div className="h-24 w-24 overflow-hidden rounded-full">
        <img
          src={imgFile ? imgFile : userImage}
          alt="프로필 사진"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative bottom-10 left-10 cursor-pointer overflow-hidden rounded-full bg-white">
        <img
          src={PlusCircle}
          alt="프로필 이미지 추가 버튼"
          onClick={handleInput}
        />
        <input
          id="profileImg"
          ref={imgRef}
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={saveImgFile}
          className="hidden"
        />
      </div>
    </section>
  );
};

export default MyPageEditProfileImage;
