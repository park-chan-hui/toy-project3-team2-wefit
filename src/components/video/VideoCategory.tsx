import Button from '../common/button/Button';

import { videoCategories } from '@/mocks/videoCategories';
import { VideoCategoryProps } from '@/types/video';

const VideoCategory = ({
  selectedCategory,
  onCategoryChange,
}: VideoCategoryProps) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {videoCategories.map((category, index) => (
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

export default VideoCategory;
