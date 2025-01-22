const MyPageVideoItemSkeleton = () => {
  return (
    <article className="mb-1 animate-pulse">
      <figure className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg">
        <div className="h-full w-full bg-gray-200" />
      </figure>

      <div className="px-1">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded-small bg-gray-200" />
          </div>
        </div>

        <h2 className="mb-1 h-5 w-full rounded-small bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="h-4 w-2/5 rounded-small bg-gray-200" />
          <div className="h-4 w-2/5 rounded-small bg-gray-200" />
        </div>
      </div>
    </article>
  );
};

export default MyPageVideoItemSkeleton;
