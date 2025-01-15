const BookmarkMainSkeleton = () => {
  return (
    <>
      <section className="flex animate-pulse flex-col gap-3">
        <header className="flex items-center gap-4">
          <div className="h-7 w-16 rounded-md bg-gray-200" />
          <div className="h-7 w-16 rounded-md bg-gray-200" />
          <div className="h-7 w-16 rounded-md bg-gray-200" />
        </header>
        <div className="flex w-full justify-end">
          <div className="h-7 w-36 rounded-md bg-gray-200" />
        </div>
        <div className="h-[30vh] w-full rounded-md bg-gray-200 p-5">
          <div className="flex">
            <div className="h-20 w-36 rounded-md bg-gray-300" />
            <div className="flex flex-col">
              <div className="ml-4 h-8 w-48 rounded-md bg-gray-300" />
              <div className="mt-1 flex items-center">
                <div className="ml-4 h-11 w-11 rounded-full bg-gray-300" />
                <div className="ml-1 h-8 w-36 rounded-md bg-gray-300" />
              </div>
            </div>
          </div>

          <div className="mt-7 flex">
            <div className="h-20 w-36 rounded-md bg-gray-300" />
            <div className="flex flex-col">
              <div className="ml-4 h-8 w-48 rounded-md bg-gray-300" />
              <div className="mt-1 flex items-center">
                <div className="ml-4 h-11 w-11 rounded-full bg-gray-300" />
                <div className="ml-1 h-8 w-36 rounded-md bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray my-3 border" />
        <div className="h-[30vh] w-full rounded-md bg-gray-200" />
      </section>
    </>
  );
};

export default BookmarkMainSkeleton;
