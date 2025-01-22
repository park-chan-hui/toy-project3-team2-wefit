import { useState } from 'react';

import EmbedYoutubeVideo from './EmbedYoutubeVideo';
import LabelInput from '../common/label-input/LabelInput';
import Button from '../common/button/Button';

type VideoUploadBoxProps = {
  isEditPage?: boolean;
  videoURL: string;
  setVideoURL?: React.Dispatch<React.SetStateAction<string>>;
};
const VideoUploadBox = (videoUploadProps: VideoUploadBoxProps) => {
  const { isEditPage, videoURL, setVideoURL } = videoUploadProps;
  const [isClick, setIsClick] = useState(false);

  const clickVideoUpload = () => {
    setIsClick(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsClick(false);
    setVideoURL!(e.target.value);
  };

  if (isEditPage) {
    return <EmbedYoutubeVideo videoUrl={videoURL} />;
  }
  return (
    <section className="flex flex-col gap-2">
      <header className="flex items-center gap-2 [&>div]:w-full">
        <LabelInput
          title="영상URL"
          placeholder="원하는 동영상의 URL을 입력해주세요"
          value={videoURL}
          onChange={handleInputChange}
        />
      </header>
      <>
        {!isClick ? (
          <div className="flex aspect-video flex-col items-center justify-center rounded-medium bg-gray-100 p-medium shadow-inner">
            <Button
              className="text-nowrap"
              onClick={clickVideoUpload}
              disabled={!videoURL}
            >
              영상 확인하기
            </Button>
          </div>
        ) : (
          <EmbedYoutubeVideo videoUrl={videoURL} />
        )}
      </>
    </section>
  );
};

export default VideoUploadBox;
