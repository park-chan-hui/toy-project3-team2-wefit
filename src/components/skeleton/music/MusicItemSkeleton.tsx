const MusicItemSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center gap-2">
      <figure className="relative flex h-full w-32 items-center">
        <div className="h-16 w-32 rounded-small bg-gray-200" />
      </figure>

      <div className="flex w-full flex-col">
        <div className="mb-1 h-5 w-full rounded-small bg-gray-200" />

        <div className="pointer-events-none">
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded-small bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicItemSkeleton;
