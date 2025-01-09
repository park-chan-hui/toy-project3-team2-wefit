const AuthorProfileSkeleton = () => {
  return (
    <section className="flex animate-pulse flex-col gap-3">
      <header className="flex items-center gap-4">
        <div className="h-7 w-40 rounded-md bg-gray-200" />
        <div className="h-7 w-16 rounded-md bg-gray-200" />
      </header>

      <article className="flex items-center gap-6 px-2">
        <div className="h-16 w-16 rounded-full bg-gray-200" />

        <dl className="flex items-center gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="text-center">
              <div className="mb-1 h-4 w-12 rounded bg-gray-200" />
              <div className="h-6 w-12 rounded bg-gray-200" />
            </div>
          ))}
        </dl>
      </article>

      <div className="px-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>
    </section>
  );
};

export default AuthorProfileSkeleton;
