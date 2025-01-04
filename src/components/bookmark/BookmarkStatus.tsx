import { FaStar } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { VideoStatsProps } from '@/types/video';

const BookmarkStatus = ({ is_bookmarked }: VideoStatsProps) => {
  return (
    <div className="mt-1 flex w-14 justify-between text-gray">
      <div className="flex flex-grow items-center">
        <FaRegTrashAlt size={25} className="mr-1 cursor-pointer" />
        <FaStar
          size={25}
          className={`${is_bookmarked ? 'text-primary' : ''} cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default BookmarkStatus;
