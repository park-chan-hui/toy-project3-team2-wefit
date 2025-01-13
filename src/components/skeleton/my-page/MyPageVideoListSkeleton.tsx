import MyPageVideoItemSkeleton from './MyPageVideoItemSkeleton';

const MyPageVideoListSkeleton = () => {
  const emptyArray = Array.from({ length: 3 }, (_, index) => index + 1);

  return (
    <div className="flex gap-4">
      {emptyArray.map(item => (
        <MyPageVideoItemSkeleton key={item} />
      ))}
    </div>
  );
};

export default MyPageVideoListSkeleton;
