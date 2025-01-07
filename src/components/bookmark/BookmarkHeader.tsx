import Button from '@/components/common/button/Button';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '@/constants/constants';

type BookmarkHeaderProps = {
  title: string;
};
const BookmarkHeader = ({ title }: BookmarkHeaderProps) => {
  const { BOOKMARK_CATEGORY_ADD } = ROUTER_PATH;

  return (
    <div className="flex flex-row justify-between">
      <h2 className="my-1 text-large font-bold text-black">{title}</h2>
      <Link to={BOOKMARK_CATEGORY_ADD}>
        <Button variant="secondary">카테고리 추가</Button>
      </Link>
    </div>
  );
};

export default BookmarkHeader;
