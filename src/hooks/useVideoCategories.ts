import { useState } from 'react';

const useVideoCategories = (basicVideoCategories: string[]) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]); //선택된 태그
  const [videoCategoryList, setVideoCategoryList] =
    useState<string[]>(basicVideoCategories); // 태그 리스트
  const [isAddVideoCategory, setIsAddVideoCategory] = useState(false); // 태그 추가 상태
  const [addVideoCategoryValue, setAddVideoCategoryValue] = useState(''); // 태그 추가 input 핸들러

  // 태그 선택
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };
  //태그 추가 input 핸들러
  const handleAddVideoCategoryValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddVideoCategoryValue(e.target.value);
  };
  //태그 추가
  const addVideoCategories = () => {
    if (isAddVideoCategory && addVideoCategoryValue) {
      videoCategoryList.push(addVideoCategoryValue);
      setAddVideoCategoryValue('');
    }
    setIsAddVideoCategory(!isAddVideoCategory);
  };

  return {
    selectedTags,
    isAddVideoCategory,
    addVideoCategoryValue,
    videoCategoryList,
    toggleTag,
    setSelectedTags,
    addVideoCategories,
    handleAddVideoCategoryValue,
    setVideoCategoryList,
    setIsAddVideoCategory,
    setAddVideoCategoryValue,
  };
};

export { useVideoCategories };
