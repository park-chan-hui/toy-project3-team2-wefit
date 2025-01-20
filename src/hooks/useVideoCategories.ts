import { useMemo, useState } from 'react';
import { videoCategories } from '@/mocks/videoCategories';

const useVideoCategories = (videoHashTag: string[] = []) => {
  const initialCategories = useMemo(() => {
    const uniqueTags = new Set([...videoCategories, ...videoHashTag]);
    uniqueTags.delete(''); // 필요 없는 빈 문자열 제거
    const uniqueArray = Array.from(uniqueTags);
    uniqueArray.shift();
    return uniqueArray;
  }, [videoHashTag]);

  const [selectedTags, setSelectedTags] = useState<string[]>(videoHashTag); //선택된 태그
  const [isAddVideoCategory, setIsAddVideoCategory] = useState(false); // 태그 추가 상태
  const [newCategory, setNewCategory] = useState(''); // 추가 입력 값

  // 태그 선택/해제
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  // 새 태그 추가
  const addCategory = () => {
    if (newCategory && !initialCategories.includes(newCategory)) {
      initialCategories.push(newCategory);
      setNewCategory('');
    }
    setIsAddVideoCategory(false); // 추가 모드 종료
  };

  return {
    initialCategories,
    selectedTags,
    isAddVideoCategory,
    newCategory,
    toggleTag,
    setNewCategory,
    setIsAddVideoCategory,
    addCategory,
  };
};

export { useVideoCategories };
