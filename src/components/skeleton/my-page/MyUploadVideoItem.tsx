const MyUploadVideoItemSkeleton = () => {
  return (
    <article className="mb-1 flex h-16 w-full animate-pulse">
      <figure className="relative flex h-full w-32 items-center">
        <div className="aspect-video h-full max-w-32 rounded-small bg-gray-200 object-cover" />
      </figure>

      <div className="ml-3 flex w-full min-w-0 flex-col">
        <div className="mb-1 h-6 w-full overflow-hidden whitespace-nowrap bg-gray-200"></div>

        <div className="flex h-7 w-full flex-row items-center justify-between">
          <div className="flex items-center gap-1">
            <figure className="flex justify-center overflow-auto rounded-full border border-none">
              <div className="h-6 w-6 bg-gray-200 object-cover" />
            </figure>
            <div className="h-3 w-20 overflow-hidden whitespace-nowrap bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="mr-1 h-4 w-4 bg-gray-200" />
            </div>

            <div className="flex items-center">
              <div className="mr-1 h-4 w-4 bg-gray-200" />
            </div>
          </div>

          <div className="mt-1 flex w-14 justify-between text-gray">
            <div className="flex flex-grow items-center">
              <div className="mr-1 h-[25px] w-[25px] bg-gray-200" />

              <div className="h-[25px] w-[25px] self-start bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyUploadVideoItemSkeleton;
