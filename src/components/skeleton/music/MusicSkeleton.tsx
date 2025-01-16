const MusicSkeleton = () => {
  return (
    <div className="flex h-[31vh] w-full animate-pulse justify-center gap-5 rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="h-20 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-24 rounded-md bg-gray-200" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-20 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-24 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="h-20 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-24 rounded-md bg-gray-200" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-20 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-40 rounded-md bg-gray-200" />
          <div className="h-4 w-24 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default MusicSkeleton;
