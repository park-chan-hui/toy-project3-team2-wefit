import Button from '../common/button/Button';
import { VideoUploadCategoryProps } from '@/types/video';

const MyPageVideoCategories = (videoCategoryProp: VideoUploadCategoryProps) => {
  const {
    videoCategories,
    selectedTags,
    isAddVideoCategory,
    addVideoCategoryValue,
    handleAddVideoCategoryValue,
    toggleTag,
    addVideoCategories,
  } = videoCategoryProp;
  return (
    <section className="flex flex-col gap-2">
      <p className="text-base font-bold">해시 태그</p>
      <nav className="flex flex-wrap gap-small">
        {videoCategories.map((tag, index) => (
          <Button
            size="small"
            variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
            key={index}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Button>
        ))}
        <div>
          {isAddVideoCategory && (
            <input
              type="text"
              className="mr-4 rounded-md border border-primary py-1 text-xs text-black"
              value={addVideoCategoryValue}
              onChange={handleAddVideoCategoryValue}
            />
          )}
          <Button
            key="addHashTag"
            size="small"
            variant="outline"
            onClick={addVideoCategories}
          >
            {!isAddVideoCategory ? '추가 입력' : '카테고리 추가'}
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default MyPageVideoCategories;
