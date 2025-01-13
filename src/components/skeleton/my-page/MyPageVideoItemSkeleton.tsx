const MyPageVideoItemSkeleton = () => {
  return (
    <article className="mb-1 flex w-full flex-col">
      <div className="aspect-video h-full max-w-32 rounded-small bg-gray-200 object-cover" />

      <div className="mt-1 flex w-full max-w-32 flex-col">
        <div className="mb-1 h-3 w-full bg-gray-200 text-black"></div>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center gap-1">
            <figure
              className={
                'flex justify-center overflow-auto rounded-full border border-none bg-gray-200 text-gray'
              }
            >
              <div className="object-cover, h-5 w-5 bg-gray-200 text-gray" />
            </figure>
            <div className="h-3 w-20 overflow-hidden bg-gray-200"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyPageVideoItemSkeleton;
