const MyPageProfileSkeleton = () => {
  return (
    <figure className="flex animate-pulse flex-col gap-3">
      <div className="flex w-full justify-between">
        <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="h-8 w-56 rounded bg-gray-200"></div>
          <div className="h-6 w-56 rounded bg-gray-200"></div>
        </div>
        <div className="self-start" />
      </div>
      <div className="h-5 w-3/4 rounded bg-gray-200"></div>
    </figure>
  );
};

export default MyPageProfileSkeleton;
