import { FaRegTrashAlt } from 'react-icons/fa';
import { IoHeartOutline } from 'react-icons/io5';
import { VscComment } from 'react-icons/vsc';
import editLogo from '@/assets/basil_edit-outline.svg';
import blankProfile from '@/assets/user/blank-user.webp';

const MyUploadVideoItemSkeleton = () => {
  return (
    <article className="mb-1 flex h-16 w-full animate-pulse">
      <figure className="relative flex h-full w-32 items-center">
        <div className="aspect-video h-full max-w-32 rounded-small bg-gray-200 object-cover" />
      </figure>

      <div className="ml-3 flex w-full min-w-0 flex-col">
        <div className="mb-1 h-6 w-full overflow-hidden whitespace-nowrap bg-gray-200"></div>

        <div className="flex h-7 w-full flex-row items-center justify-between">
          <div className="flex items-center gap-1">
            <figure
              className={
                'flex justify-center overflow-auto rounded-full border border-none'
              }
            >
              <img
                src={blankProfile}
                alt="빈 프로필"
                className="h-6 w-6 object-cover"
              />
            </figure>
            <div className="h-3 w-32 overflow-hidden whitespace-nowrap bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <IoHeartOutline size={16} className="mr-1" />
              <div className="h-3 w-3"></div>
            </div>

            <div className="flex items-center">
              <VscComment size={16} className="mr-1" />
              <div className="h-3 w-3"></div>
            </div>
          </div>

          <div className="mt-1 flex w-14 justify-between text-gray">
            <div className="flex flex-grow items-center">
              <FaRegTrashAlt size={25} className="mr-1" />

              <img
                src={editLogo}
                alt="수정 로고"
                className="h-[30px] w-[30px] self-start"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyUploadVideoItemSkeleton;
