import { FaStar } from 'react-icons/fa';
import { useBookmark } from '@/hooks/useBookmarks';

interface BookmarkStatusProps {
  videoId: string;
  onToggleBookmark?: () => Promise<void>;
}

const BookmarkStatus = ({ videoId, onToggleBookmark }: BookmarkStatusProps) => {
  const { toggleBookmark } = useBookmark(videoId);

  const handleClick = async () => {
    await toggleBookmark();
    if (onToggleBookmark) {
      await onToggleBookmark();
    }
  };

  return (
    <div className="mt-1 flex w-14 justify-between text-gray">
      <div className="flex flex-grow items-center">
        <FaStar
          size={25}
          className="cursor-pointer text-primary"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  );
};

export default BookmarkStatus;
