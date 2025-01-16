const BookmarkItemSkeleton = () => {
  return (
    <div className="rounded-md0 h-[30vh] w-full p-5">
      <div className="flex">
        <div className="h-20 w-36 rounded-md bg-gray-200" />
        <div className="flex flex-col">
          <div className="ml-4 h-8 w-48 rounded-md bg-gray-200" />
          <div className="mt-1 flex items-center">
            <div className="ml-4 h-11 w-11 rounded-full bg-gray-200" />
            <div className="ml-1 h-8 w-36 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mt-9 flex">
        <div className="h-20 w-36 rounded-md bg-gray-200" />
        <div className="flex flex-col">
          <div className="ml-4 h-8 w-48 rounded-md bg-gray-200" />
          <div className="mt-1 flex items-center">
            <div className="ml-4 h-11 w-11 rounded-full bg-gray-200" />
            <div className="ml-1 h-8 w-36 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItemSkeleton;
