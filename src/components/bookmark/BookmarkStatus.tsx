import { FaStar } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { VideoStatsProps } from '@/types/video';
import { cn } from '@/utils/cn';

const BookmarkStatus = ({
  is_bookmarked,
}: Pick<VideoStatsProps, 'is_bookmarked'>) => {
  return (
    <div className="mt-1 flex w-14 justify-between text-gray">
      <div className="flex flex-grow items-center">
        <FaRegTrashAlt size={25} className="mr-1 cursor-pointer" />
        <FaStar
          size={25}
          className={cn('cursor-pointer', is_bookmarked ? 'text-primary' : '')}
        />
      </div>
    </div>
  );
};

export default BookmarkStatus;
