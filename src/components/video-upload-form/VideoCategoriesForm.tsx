import { Control, Controller } from 'react-hook-form';
import MyPageVideoCategories from '../my-page/MyPageVideoCategories';
import { VideoUploadCategoryProps } from '@/types/video';

const VideoCategoriesForm = ({
  control,
  error,
  selectedTags,
  initialCategories,
  isAddVideoCategory,
  newCategory,
  toggleTag,
  setNewCategory,
  setIsAddVideoCategory,
  addCategory,
}: VideoUploadCategoryProps & {
  control: Control<{
    title: string;
    video_url: string;
    hash_tag: string[];
    thumbnail?: string | undefined;
  }>;
  error?: string;
}) => {
  return (
    <section>
      <Controller
        name="hash_tag"
        control={control}
        render={({ field }) => (
          <MyPageVideoCategories
            initialCategories={initialCategories}
            selectedTags={field.value || selectedTags}
            isAddVideoCategory={isAddVideoCategory}
            newCategory={newCategory}
            toggleTag={tag => {
              toggleTag(tag); // 태그 토글
              if (field.value?.includes(tag)) {
                field.onChange(field.value.filter(t => t !== tag)); // 제거
              } else {
                field.onChange([...(field.value || []), tag]); // 추가
              }
            }}
            setNewCategory={value => setNewCategory(value)}
            setIsAddVideoCategory={state => setIsAddVideoCategory(state)}
            addCategory={addCategory}
          />
        )}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </section>
  );
};

export default VideoCategoriesForm;
