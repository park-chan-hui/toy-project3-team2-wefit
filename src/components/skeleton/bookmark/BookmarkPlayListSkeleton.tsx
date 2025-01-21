const BookmarkPlayListSkeleton = () => {
  return (
    <section className="flex animate-pulse flex-col">
      <div className="flex h-[40vh] w-full flex-wrap gap-1">
        <div className="mb-9 flex w-full gap-4">
          <div className="flex w-1/2 flex-col gap-2">
            <div className="aspect-[2/1] h-24 w-full rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-40 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <div className="aspect-[2/1] h-24 w-full rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-40 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-1/2 flex-col gap-1">
            <div className="aspect-[2/1] h-24 w-full rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-40 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <div className="aspect-[2/1] h-24 w-full rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-40 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookmarkPlayListSkeleton;
