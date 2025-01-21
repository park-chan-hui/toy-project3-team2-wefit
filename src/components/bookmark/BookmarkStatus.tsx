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
    <div className="mt-1 flex w-14 justify-end text-gray">
      <FaStar
        size={25}
        className="mr-3 cursor-pointer text-primary"
        onClick={() => handleClick()}
      />
    </div>
  );
};

export default BookmarkStatus;
