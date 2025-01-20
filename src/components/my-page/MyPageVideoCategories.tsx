import { VideoUploadCategoryProps } from '@/types/video';
import Button from '../common/button/Button';

const MyPageVideoCategories = ({
  initialCategories,
  selectedTags,
  isAddVideoCategory,
  newCategory,
  toggleTag,
  setNewCategory,
  setIsAddVideoCategory,
  addCategory,
}: VideoUploadCategoryProps) => {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-base font-bold">해시 태그</p>
      <nav className="flex flex-wrap gap-small">
        {initialCategories.map((tag, index) => (
          <Button
            size="small"
            variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
            key={index}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Button>
        ))}
        <div className="flex items-center gap-2">
          {isAddVideoCategory && (
            <input
              type="text"
              className="mr-4 rounded-md border border-primary py-1 text-xs text-black"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="새 카테고리 입력"
            />
          )}
          <Button
            size="small"
            variant="outline"
            onClick={
              isAddVideoCategory
                ? addCategory
                : () => setIsAddVideoCategory(true)
            }
          >
            {isAddVideoCategory ? '카테고리 추가' : '추가 입력'}
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default MyPageVideoCategories;
