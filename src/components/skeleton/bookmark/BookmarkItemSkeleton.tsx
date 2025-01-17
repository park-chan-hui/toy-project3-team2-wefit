const BookmarkItemSkeleton = () => {
  return (
    <div className="h-[30vh] w-full animate-pulse rounded-md">
      <div className="flex">
        <div className="aspect-[16/9] h-20 w-36 rounded-md bg-gray-200" />
        <div className="flex flex-col">
          <div className="ml-4 aspect-[4/1] h-8 w-48 rounded-md bg-gray-200" />
          <div className="mt-1 flex items-center">
            <div className="ml-4 aspect-square h-11 w-11 rounded-full bg-gray-200" />
            <div className="ml-1 aspect-[4/1] h-8 w-36 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mt-9 flex">
        <div className="aspect-[16/9] h-20 w-36 rounded-md bg-gray-200" />
        <div className="flex flex-col">
          <div className="ml-4 aspect-[4/1] h-8 w-48 rounded-md bg-gray-200" />
          <div className="mt-1 flex items-center">
            <div className="ml-4 aspect-square h-11 w-11 rounded-full bg-gray-200" />
            <div className="ml-1 aspect-[4/1] h-8 w-36 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItemSkeleton;
