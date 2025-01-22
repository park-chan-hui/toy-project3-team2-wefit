import Button from '@/components/common/button/Button';

const BookmarkCategoryAddSkeleton = () => {
  return (
    <>
      <div className="max-h-[75vh] flex-1 overflow-y-auto">
        <div className="space-y-3">
          <div>
            <div className="mb-2 max-w-container">
              <p className="text-base font-bold">카테고리 명</p>
              <div className="mt-1 h-11 w-full animate-pulse rounded-medium border border-gray-200 bg-gray-100" />
            </div>
          </div>

          <div>
            <figure className="flex flex-col gap-2">
              <p className="text-base font-bold">카테고리 썸네일</p>
              <div className="aspect-video w-full overflow-auto rounded-medium">
                <div className="flex aspect-video animate-pulse flex-col items-center justify-center bg-gray-100">
                  <div className="h-16 w-16 rounded-xl bg-gray-200" />
                  <div className="mt-2 h-5 w-44 rounded-md bg-gray-200" />
                </div>
              </div>
            </figure>
          </div>

          <div>
            <p className="my-2 text-base font-bold">카테고리에 넣을 영상</p>
            <div className="flex min-h-72 flex-col gap-5">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-8 w-8 flex-shrink-0 animate-pulse rounded-full bg-gray-200" />
                  <div className="w-full overflow-hidden">
                    <article className="h-18 mb-1 flex w-full">
                      <figure className="relative flex h-full w-32 items-center">
                        <div className="aspect-video h-full w-32 animate-pulse rounded-small bg-gray-200" />
                      </figure>
                      <div className="ml-3 flex w-full min-w-0 flex-col">
                        <div className="mb-1 h-5 w-3/4 animate-pulse rounded-small bg-gray-200" />
                        <div className="flex w-full flex-row items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
                            <div className="h-4 w-24 animate-pulse rounded-small bg-gray-200" />
                          </div>
                          <div className="h-6 w-6 animate-pulse rounded-small bg-gray-200" />
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0">
        <Button
          variant="secondary"
          className="my-2 w-full rounded-medium"
          type="submit"
          disabled
        >
          해당 카테고리 추가
        </Button>
      </div>
    </>
  );
};

export default BookmarkCategoryAddSkeleton;
