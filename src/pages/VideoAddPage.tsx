import { useState } from 'react';

import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import ThumbnailUpload from '@/components/thumbnail/ThumbnailUpload';
import { videoCategories } from '@/mocks/videoCategories';
import VideoUploadBox from '@/components/video/VideoUploadBox';

const VideoAddPage = () => {
  const [imgFile, setImgFile] = useState('');

  const handleImageReset = () => {
    setImgFile('');
  };

  return (
    <main className="flex flex-col gap-4">
      <VideoUploadBox />

      <LabelInput title="영상 제목" placeholder="영상 제목을 입력해주세요." />

      <section className="flex flex-col gap-2">
        <p className="text-base font-bold">해시 태그</p>
        <nav className="flex flex-wrap gap-small">
          {videoCategories.map((tag, index) => (
            <Button size="small" variant="outline" key={index}>
              {tag}
            </Button>
          ))}
          <Button key="addHashTag" size="small" variant="outline">
            추가 입력
          </Button>
        </nav>
      </section>

      <ThumbnailUpload imgFile={imgFile} onImageChange={setImgFile} />

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
    </main>
  );
};

export default VideoAddPage;
