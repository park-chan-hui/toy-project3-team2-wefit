import videoUpload from '@/assets/video-upload.svg';
import { useState } from 'react';
import YouTube from 'react-youtube';
import LabelInput from '../common/label-input/LabelInput';
import Button from '../common/button/Button';

type VideoUploadBoxProps = {
  isEditPage?: boolean;
  videoURL?: string;
};
const VideoUploadBox = (videoUploadProps: VideoUploadBoxProps) => {
  const [youTubeUrl, setYouTubeUrl] = useState('');
  const [isClick, setIsClick] = useState(false);

  const videoOption = {
    width: '100%',
  };
  const regex = /(?<=youtu\.be\/)([^?]+)?/g;
  const regex2 = /(?<=v=)([^?]+)?/g;

  const findVideoId = (url: string) => {
    const match = url.match(regex);
    const match2 = url.match(regex2);
    if (match !== null) {
      return match[0];
    } else if (match2 !== null) {
      return match2[0];
    }
  };
  const clickVideoUpload = () => {
    setIsClick(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsClick(false);
    setYouTubeUrl(e.target.value);
  };

  if (videoUploadProps.isEditPage) {
    return (
      <YouTube
        videoId={findVideoId(youTubeUrl)}
        className="[&>div]:aspect-video"
        title="youtube 동영상"
      />
    );
  }
  return (
    <section className="flex flex-col gap-2">
      <header className="flex items-center gap-2 [&>div]:w-full">
        <LabelInput
          title="영상URL"
          placeholder="원하는 동영상의 URL을 입력해주세요"
          value={youTubeUrl}
          onChange={handleInputChange}
        />
        <Button
          className="text-nowrap py-[18px]"
          size="large"
          onClick={clickVideoUpload}
        >
          임베드
        </Button>
      </header>
      <>
        {!isClick ? (
          <div className="flex aspect-video flex-col items-center justify-center rounded-medium bg-gray-100 p-medium shadow-inner">
            <img src={videoUpload} alt="영상 업로드 이미지" />
          </div>
        ) : (
          <YouTube
            videoId={findVideoId(youTubeUrl)}
            title="youtube 동영상"
            opts={videoOption}
          />
        )}
      </>
    </section>
  );
};

export default VideoUploadBox;
