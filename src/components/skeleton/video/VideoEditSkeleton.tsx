import Button from '@/components/common/button/Button';
import { videoCategories } from '@/mocks/videoCategories';

const VideoEditSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 p-4">
      <section>
        <div className="flex aspect-video items-center justify-center rounded-small bg-gray-200" />
      </section>

      <section>
        <label className="text-base font-bold">영상 제목</label>
        <input
          type="text"
          className="block w-full rounded-md border bg-gray-200 p-2 shadow-sm focus:outline-none"
        />
      </section>

      <section>
        <label className="text-base font-bold">해시 태그</label>
        <div className="flex flex-wrap gap-2">
          {videoCategories.map((tag, index) => (
            <Button key={index} size="small" variant="outline">
              {tag}
            </Button>
          ))}
          <Button key="addHashTag" size="small" variant="outline">
            추가입력
          </Button>
        </div>
      </section>

      <section>
        <label className="text-base font-bold">썸네일</label>
        <div className="flex aspect-video items-center justify-center rounded-small bg-gray-200" />
      </section>

      <div className="flex w-full gap-small">
        <Button type="submit" className="w-1/2">
          업로드
        </Button>
        <Button type="reset" variant="outline" className="w-1/2">
          초기화
        </Button>
      </div>
    </div>
  );
};
export default VideoEditSkeleton;
