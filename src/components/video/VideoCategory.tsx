import Button from '../common/button/Button';
import { videoCategories } from '@/mocks/videoCategories';

const VideoCategory = () => {
  return (
    <ul className="flex flex-wrap gap-2">
      {videoCategories.map((category, index) => (
        <li key={index}>
          <Button variant="outline" size="small">
            {category}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default VideoCategory;
