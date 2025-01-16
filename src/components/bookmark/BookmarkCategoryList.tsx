import { useCategories } from '@/hooks/useCategories';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { Link, useLocation } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import EmptyResult from '@/components/empty/EmptyResult';
import { cn } from '@/utils/cn';
import BookmarkCategorySkeleton from '@/components/skeleton/bookmark/BookmarkCategorySkeleton';
import MusicSkeleton from '@/components/skeleton/music/MusicSkeleton';

const BookmarkCategoryList = ({
  selectedCategory,
}: {
  selectedCategory?: string;
}) => {
  const { currentUserQuery } = useUsers();

  const { categoriesQuery } = useCategories(currentUserQuery.data.user_id);
  const location = useLocation();
  const isBookmark = location.pathname.endsWith('/bookmark');

  if (categoriesQuery.isLoading) {
    return isBookmark ? <BookmarkCategorySkeleton /> : <MusicSkeleton />;
  }

  if (categoriesQuery.isError) {
    return <div>Error: {categoriesQuery.error?.message}</div>;
  }

  const filteredCategories = categoriesQuery.data?.filter(category => {
    return category.is_like === true;
  });

  return (
    <>
      <div
        className={` ${filteredCategories?.length !== 0 && selectedCategory === '전체' && 'grid w-full grid-cols-2 gap-4'}`}
      >
        {filteredCategories?.length === 0 ? (
          <EmptyResult message="카테고리를 추가해볼까요?" />
        ) : (
          filteredCategories?.map(category => (
            <Link
              to={`/playlist/${category.category_id}`}
              key={category.category_id}
            >
              <div className="mb-2">
                <figure className="relative mb-2 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
                  <img
                    src={category.category_thumbnail}
                    alt={category.category_id}
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div
                  className={cn(
                    'flex w-full flex-row justify-between gap-1',
                    selectedCategory === '전체' && 'flex-col',
                  )}
                >
                  <div className="relative flex w-[65%] flex-row overflow-hidden whitespace-nowrap">
                    <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                      {category.title}
                    </h2>
                    <h2 className="font-bold">
                      ({category.categoried_videos?.length || 0})
                    </h2>
                  </div>
                  <p className="flex items-center text-small">
                    최종 수정일 {getTimeAgo(category.updated_at)}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default BookmarkCategoryList;
