import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import { useRef, useState } from 'react';
import { FaMagnifyingGlassPlus } from 'react-icons/fa6';

const VideoAddPage = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    imgRef.current?.click();
  };

  const saveImgFile = () => {
    if (imgRef.current?.files && imgRef.current.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImgFile(reader.result as string);
        }
      };
    }
  };

  const handleImageReset = () => {
    setImgFile('');
    if (imgRef.current) {
      imgRef.current.value = '';
    }
  };
  return (
    <div className="mt-4">
      <div className="mb-4">
        <p className="mb-2 text-large font-bold">영상 업로드</p>
        <div className="flex flex-col items-center">
          <FaMagnifyingGlassPlus className="mb-5 h-20 w-full" />
          <p className="text-xsmall font-bold">
            업로드 할 동영상을 선택하세요!
          </p>
        </div>
      </div>
      <div className="mb-2">
        <LabelInput
          title="영상 제목"
          placeholder="영상 제목을 입력해주세요."
          description=""
        ></LabelInput>
      </div>
      <div className="mb-2">
        <p className="mb-2 text-large font-bold">해시 태그</p>
        <div className="flex flex-wrap gap-small">
          <Button size="small" variant="outline">
            가슴
          </Button>
          <Button size="small" variant="outline">
            엉덩이
          </Button>
          <Button size="small" variant="outline">
            등
          </Button>
          <Button size="small" variant="outline">
            어깨
          </Button>
          <Button size="small" variant="outline">
            하체
          </Button>
          <Button size="small" variant="outline">
            복근
          </Button>
          <Button size="small" variant="outline">
            팔
          </Button>
          <Button size="small" variant="outline">
            추가 입력
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-large font-bold">썸네일</p>
        <div className="w-full overflow-auto">
          {imgFile ? (
            <img src={imgFile} alt="프로필 이미지" />
          ) : (
            <div className="flex flex-col items-center">
              <FaMagnifyingGlassPlus
                className="mb-5 h-20 w-full cursor-pointer"
                onClick={handleInput}
              />
              <p className="text-xsmall font-bold">
                업로드할 썸네일을 선택해 보세요!
              </p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
          ref={imgRef}
          className="hidden"
        />
      </div>
      <div className="flex w-full gap-small">
        <Button type="submit" className="w-1/2">
          업로드
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="w-1/2"
          onClick={handleImageReset}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default VideoAddPage;
