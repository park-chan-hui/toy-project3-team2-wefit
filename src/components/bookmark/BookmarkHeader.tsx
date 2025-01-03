import Button from '@/components/common/button/Button';
import { Link } from 'react-router-dom';

const BookmarkHeader = () => {
  return (
    <div className="flex flex-row justify-between">
      <h2 className="my-1 text-large font-bold text-black">나의 북마크 목록</h2>
      <Link to="/bookmark/category-add">
        <Button variant="secondary" size="medium">
          카테고리 추가
        </Button>
      </Link>
    </div>
  );
};

export default BookmarkHeader;
