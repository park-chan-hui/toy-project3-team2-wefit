import MyUploadVideoPageItemSkeleton from './MyUploadVideoItem';

const MyUploadVideoPageListSkeleton = () => {
  const emptyArray = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <>
      <p className="mb-4 text-lg font-bold">내가 업로드한 동영상</p>
      <div className="flex flex-col gap-4">
        {emptyArray.map(item => (
          <MyUploadVideoPageItemSkeleton key={item} />
        ))}
      </div>
    </>
  );
};

export default MyUploadVideoPageListSkeleton;
