const VideoItemSkeleton = () => {
  return (
    <article className="mb-1 w-full animate-pulse">
      <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-lg bg-gray-200" />

      <div className="px-1">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-5 w-24 rounded bg-gray-200" />
          </div>

          <div className="flex gap-2">
            <div className="h-5 w-14 rounded bg-gray-200" />
            <div className="h-5 w-14 rounded bg-gray-200" />
            <div className="h-5 w-14 rounded bg-gray-200" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="h-4 w-12 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default VideoItemSkeleton;
