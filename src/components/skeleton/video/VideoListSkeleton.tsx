import VideoItemSkeleton from './VideoItemSkeleton';

const VideoListSkeleton = () => {
  const emptyArray = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4">
      {emptyArray.map(item => (
        <VideoItemSkeleton key={item} />
      ))}
    </div>
  );
};

export default VideoListSkeleton;
