const MyPageProfileSkeleton = () => {
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex w-full justify-between">
        <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          <div className="w-ull h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="h-8 w-56 bg-gray-200"></div>
          <div className="h-8 w-56 bg-gray-200"></div>
        </div>
        <div className="self-start" />
      </div>
      <div className="h-4 w-[100%] bg-gray-200"></div>
    </figure>
  );
};

export default MyPageProfileSkeleton;
