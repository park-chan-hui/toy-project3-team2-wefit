import Button from '@/components/common/button/Button';
import LabelInput from '@/components/common/label-input/LabelInput';
import { useState } from 'react';
import { videoCategories } from '@/mocks/videoCategories';
import VideoUploadBox from '@/components/video/VideoUploadBox';
import ThumbnailUpload from '@/components/thumbnail/ThumbnailUpload';
import { mockVideos } from '@/mocks/mockVideos';

const VideoEditPage = () => {
  const video = mockVideos[0];
  const hashTagList = [...videoCategories, ...video.hash_tag];
  const setHashTagList = new Set(hashTagList);
  const uniqueHashTagList = [...setHashTagList];

  const [imgFile, setImgFile] = useState(video.thumbnail);
  const [selectedTags, setSelectedTags] = useState<string[]>(video.hash_tag);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  const handleImageReset = () => {
    setImgFile(video.thumbnail);
  };
  return (
    <main className="flex flex-col gap-4">
      <VideoUploadBox edit videoURL={video.video_url} />

      <LabelInput
        title="영상 제목"
        placeholder="영상 제목을 입력해주세요."
        description={video.title}
      />

      <section className="flex flex-col gap-2">
        <p className="text-base font-bold">해시 태그</p>
        <nav className="flex flex-wrap gap-small">
          {uniqueHashTagList.map((tag, index) => (
            <Button
              size="small"
              variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
              key={index}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
          <Button key="addHashTag" size="small" variant="outline">
            추가 입력
          </Button>
        </nav>
      </section>

      <ThumbnailUpload imgFile={imgFile} onImageChange={setImgFile} edit />

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

export default VideoEditPage;
