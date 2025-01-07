import { useRef } from 'react';
import PlusCircle from '@/assets/plus-circle.svg';
import { ThumbnailUploadProps } from '@/types/thumbnail';

const MyPageEditProfileImage = ({
  userImage,
  onImageChange,
  imgFile,
}: ThumbnailUploadProps & { userImage: string }) => {
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    if (imgRef.current?.files && imgRef.current.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          onImageChange(reader.result as string);
        }
      };
    }
  };
  const handleInput = () => {
    imgRef.current?.click();
  };
  return (
    <section className="flex flex-col items-center">
      <div className="h-24 w-24 overflow-hidden rounded-full">
        {imgFile ? (
          <img
            src={imgFile}
            alt="프로필 사진"
            className="w-ull h-full object-cover"
          />
        ) : (
          <img
            src={userImage}
            alt="프로필 사진"
            className="w-ull h-full object-cover"
          />
        )}
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
