const BookmarkItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(8)].map((_, index) => (
        <article key={index} className="h-18 mb-1 flex w-full animate-pulse">
          <figure className="relative flex h-full w-32 items-center">
            <div className="aspect-video h-full w-32 rounded-small bg-gray-200" />
          </figure>
          <div className="ml-3 flex w-full min-w-0 flex-col">
            <div className="mb-1 h-6 w-3/4 rounded-small bg-gray-200" />
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="h-6 w-6 rounded-full bg-gray-200" />
                <div className="h-5 w-24 rounded-small bg-gray-200" />
              </div>
              <div className="h-6 w-6 rounded-small bg-gray-200" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BookmarkItemSkeleton;
