const BookmarkPlayListSkeleton = () => {
  return (
    <section className="flex animate-pulse flex-col">
      <div className="grid w-full grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="aspect-video w-full rounded-md bg-gray-200" />
            <div className="h-5 w-full rounded-md bg-gray-200" />
            <div className="flex items-center gap-1">
              <div className="h-6 w-6 rounded-full bg-gray-200" />
              <div className="h-4 w-24 rounded-md bg-gray-200" />
            </div>
            <div className="h-4 w-24 rounded-md bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookmarkPlayListSkeleton;
