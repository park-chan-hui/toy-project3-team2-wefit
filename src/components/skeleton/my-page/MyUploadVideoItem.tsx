const MyUploadVideoItemSkeleton = () => {
  return (
    <article className="mb-1 flex h-16 w-full animate-pulse">
      <figure className="relative flex h-full w-32 items-center">
        <div className="h-16 w-32 rounded-small bg-gray-200" />
      </figure>

      <div className="ml-2 flex w-full min-w-0 flex-col">
        <div className="mb-1 h-5 w-full rounded-small bg-gray-200" />

        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-6 w-6 rounded-full bg-gray-200" />
              <div className="h-4 w-20 rounded-small bg-gray-200" />
            </div>
          </div>

          <div className="flex justify-between text-gray">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-small bg-gray-200" />
              <div className="h-5 w-5 rounded-small bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyUploadVideoItemSkeleton;
