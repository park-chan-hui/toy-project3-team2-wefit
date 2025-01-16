import Button from '@/components/common/button/Button';
import MyPageProfileSkeleton from './MyPageProfileSkeleton';
import MyPageVideoListSkeleton from './MyPageVideoListSkeleton';

const MyPageSkeleton = () => {
  return (
    <main className="flex flex-col gap-2">
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
        <div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
            댓글이 달린 동영상: 댓글 동영상
          </p>
          <p className="text-xsmall text-gray">댓글내용</p>
        </div>
      </section>
    </main>
  );
};

export default MyPageSkeleton;
