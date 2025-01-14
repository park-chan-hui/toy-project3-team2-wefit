import { useCategories } from '@/hooks/useCategories';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { Link } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import EmptyResult from '@/components/empty/EmptyResult';

const BookmarkCategoryList = () => {
  const { currentUserQuery } = useUsers();

  const categoriesQuery = useCategories(currentUserQuery.data.user_id);

  if (categoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesQuery.isError) {
    return <div>Error: {categoriesQuery.error?.message}</div>;
  }

  const filteredCategories = categoriesQuery.data?.filter(category => {
    return category.is_like === true;
  });

  return (
    <>
      {filteredCategories?.length === 0 ? (
        <EmptyResult message="카테고리를 추가해볼까요?" />
      ) : (
        filteredCategories?.map(category => (
          <Link
            to={`/playlist/${category.category_id}`}
            key={category.category_id}
          >
            <div className="mb-2">
              <figure className="relative mb-3 aspect-video h-[80%] w-full overflow-hidden rounded-lg">
                <img
                  src={category.category_thumbnail}
                  alt={category.category_id}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="flex w-full flex-row justify-between gap-1">
                <div className="relative flex w-[65%] flex-row overflow-hidden whitespace-nowrap">
                  <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                    {category.title}
                  </h2>
                  <h2 className="font-bold">
                    ({category.categoried_videos?.length || 0})
                  </h2>
                </div>
                <p className="mr-1 flex items-center text-small">
                  최종 수정일 {getTimeAgo(category.updated_at)}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default BookmarkCategoryList;
