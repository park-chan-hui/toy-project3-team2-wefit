import Button from '@/components/common/button/Button';
import MyPageProfileSkeleton from './MyPageProfileSkeleton';
import MyPageVideoListSkeleton from './MyPageVideoListSkeleton';

const MyPageSkeleton = () => {
  return (
    <main className="flex flex-col gap-5">
      <MyPageProfileSkeleton />

      <section>
        <p className="text-lg font-bold">내가 좋아요한 동영상</p>
        <hr className="my-2" aria-hidden="true" />
        <MyPageVideoListSkeleton />
      </section>

      <section>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">내가 업로드한 동영상</p>
          <Button size="small">더보기</Button>
        </div>
        <hr className="my-2" aria-hidden="true" />
        <MyPageVideoListSkeleton />
      </section>

      <section>
        <p className="text-lg font-bold">내 댓글</p>
        <hr className="my-2" aria-hidden="true" />
        <div className="flex animate-pulse flex-col gap-2">
          <div className="h-5 w-full rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </section>
    </main>
  );
};

export default MyPageSkeleton;
