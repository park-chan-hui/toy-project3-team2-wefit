import Button from '@/components/common/button/Button';

const BookmarkCategoryAddSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-base font-bold">카테고리 명</p>
        <input className="w-full rounded-medium border border-black p-2 px-4 focus:!border-primary focus:outline-none" />
        <section className="flex animate-pulse flex-col gap-3">
          <div className="h-[30vh] w-full rounded-md bg-gray-200" />
        </section>
        <p className="text-base font-bold">카테고리에 넣을 영상</p>
        <section className="flex animate-pulse flex-col gap-3">
          <div className="mt-1 flex">
            <div className="h-20 w-40 rounded-md bg-gray-200" />
            <div className="flex flex-col">
              <div className="ml-4 h-8 w-48 rounded-md bg-gray-200" />
              <div className="mt-1 flex items-center">
                <div className="ml-4 h-11 w-11 rounded-full bg-gray-200" />
                <div className="ml-1 h-8 w-36 rounded-md bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="mt-1 flex">
            <div className="h-20 w-40 rounded-md bg-gray-200" />
            <div className="flex flex-col">
              <div className="ml-4 h-8 w-48 rounded-md bg-gray-200" />
              <div className="mt-1 flex items-center">
                <div className="ml-4 h-11 w-11 rounded-full bg-gray-200" />
                <div className="ml-1 h-8 w-36 rounded-md bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="mt-1 flex">
            <div className="h-8 w-40 rounded-md bg-gray-200" />
            <div className="flex flex-col">
              <div className="ml-4 h-4 w-48 rounded-md bg-gray-200" />
              <div className="mt-1 flex items-center">
                <div className="ml-4 h-4 w-11 rounded-full bg-gray-200" />
                <div className="ml-1 h-4 w-36 rounded-md bg-gray-200" />
              </div>
            </div>
          </div>
        </section>
        <div className="sticky bottom-0">
          <Button
            variant="secondary"
            className="my-2 w-full rounded-medium"
            type="submit"
          >
            해당 카테고리 추가
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookmarkCategoryAddSkeleton;
