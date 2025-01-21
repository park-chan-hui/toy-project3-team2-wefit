const BookmarkPlayListSkeleton = () => {
  return (
    <section className="flex animate-pulse flex-col">
      <div className="grid h-[45vh] w-full grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="aspect-[2/1] h-24 w-full rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-40 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
            <div className="aspect-[2/1] h-4 w-24 rounded-md bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookmarkPlayListSkeleton;
