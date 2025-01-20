import { useCategories } from '@/hooks/useCategories';
import { Link, useLocation } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import EmptyResult from '@/components/empty/EmptyResult';
import Button from '@/components/common/button/Button';
import { ROUTER_PATH } from '@/constants/constants';
import { useFollow } from '@/hooks/useFollow';
import { BookmarkCategoryItem } from '@/components/bookmark/BookmarkCategoryItem';

const BookmarkCategoryList = ({
  selectedCategory,
}: {
  selectedCategory?: string;
}) => {
  const { currentUserQuery } = useUsers();
  const { categoriesQuery, allCategoriesQuery } = useCategories(
    currentUserQuery.data?.user_id,
  );
  const { BOOKMARK_CATEGORY_ADD } = ROUTER_PATH;
  const location = useLocation();
  const isBookmark = location.pathname.endsWith('/bookmark');
  const { followingsIds, isFollowLoading } = useFollow(
    currentUserQuery.data?.user_id,
  );

  const isLoading = categoriesQuery.isLoading || isFollowLoading;

  if (categoriesQuery.isError) {
    return <div>Error: {categoriesQuery.error?.message}</div>;
  }

  const filteredCategories = [
    ...(isBookmark
      ? categoriesQuery.data?.filter(
          category => category.user_id === currentUserQuery.data?.user_id,
        ) || []
      : [
          ...(allCategoriesQuery.data?.filter(category =>
            followingsIds.some(
              followingId => followingId.following_id === category.user_id,
            ),
          ) || []),
          ...(categoriesQuery.data?.filter(
            category => category.user_id === currentUserQuery.data?.user_id,
          ) || []),
        ]),
  ];

  const message = isBookmark
    ? '카테고리를 추가해볼까요?'
    : '플레이리스트를 추가해볼까요?';

  if (filteredCategories?.length === 0) {
    return (
      <>
        <EmptyResult message={message} />
        {!isBookmark && (
          <div className="flex justify-center">
            <Link to={BOOKMARK_CATEGORY_ADD}>
              <Button variant="secondary" className="items-center">
                플레이리스트 추가하기
              </Button>
            </Link>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`${selectedCategory === '전체' && 'grid w-full grid-cols-2 gap-4'}`}
    >
      {filteredCategories.map(category => (
        <BookmarkCategoryItem
          key={category.category_id}
          category={category}
          selectedCategory={selectedCategory}
          isLoading={isLoading}
          isBookmark={isBookmark}
        />
      ))}
    </div>
  );
};

export default BookmarkCategoryList;
