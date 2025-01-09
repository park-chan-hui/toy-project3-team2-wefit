import { VideoCategoryProps } from '@/types/video';
import { playListCategories } from '@/mocks/playListCategories';
import Button from '@/components/common/button/Button';
const PlayListCategory = ({
  selectedCategory,
  onCategoryChange,
}: VideoCategoryProps) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {playListCategories.map((category, index) => (
        <li key={index}>
          <Button
            variant={selectedCategory === category ? 'primary' : 'outline'}
            size="small"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default PlayListCategory;
