import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import { mockUsers } from '@/mocks/mockUsers';
import { useState } from 'react';
import MyPageEditProfileImage from '@/components/my-page/MyPageEditProfileImage';

const MyPageEdit = () => {
  const userData = mockUsers[0];
  const [imgFile, setImgFile] = useState('');

  const handleImageReset = () => {
    setImgFile('');
  };

  return (
    <figure>
      <MyPageEditProfileImage
        userImage={userData.user_image as string}
        onImageChange={setImgFile}
        imgFile={imgFile}
      />

      <LabelInput
        title="닉네임"
        placeholder="수정할 닉네임을 작성해 주세요"
        description={userData.nickname}
      />

      <LabelInput
        title="소개"
        placeholder="한 줄 평을 작성해 주세요"
        description={userData.description}
      />

      <div className="my-3 flex w-full gap-small">
        <Button type="submit" className="w-1/2">
          수정하기
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="w-1/2"
          onClick={handleImageReset}
        >
          초기화
        </Button>
      </div>
    </figure>
  );
};

export default MyPageEdit;
