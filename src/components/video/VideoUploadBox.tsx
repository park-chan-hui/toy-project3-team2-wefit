import { useState } from 'react';
import YouTube from 'react-youtube';
import LabelInput from '../common/label-input/LabelInput';
import Button from '../common/button/Button';
import { YOUTUBE_REGEX } from '@/constants/constants';

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

  const findVideoId = (url: string) => {
    const matchURL = url.match(YOUTUBE_REGEX.URL);
    const matchShortUrl = url.match(YOUTUBE_REGEX.SHORT_URL);
    if (matchURL !== null) {
      return matchURL[0];
    } else if (matchShortUrl !== null) {
      return matchShortUrl[0];
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
        title="youtube 동영상"
        opts={videoOption}
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
      </header>
      <>
        {!isClick ? (
          <div className="flex aspect-video flex-col items-center justify-center rounded-medium bg-gray-100 p-medium shadow-inner">
            <Button className="text-nowrap" onClick={clickVideoUpload}>
              영상 확인하기
            </Button>
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
