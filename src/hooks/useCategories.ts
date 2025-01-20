import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCategories,
  deleteCategories,
  fetchAllCategories,
  fetchIdCategories,
} from '@/api/categories';
import { toastError, toastSuccess } from '@/utils/toast';

const useCategories = (userId: string) => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ['categories', userId],
    queryFn: () => fetchCategories(userId),
    select: data =>
      data.map(category => ({
        ...category,
        updated_at: new Date(category.updated_at),
      })),
    enabled: !!userId,
  });

  const categoriesIdQuery = useQuery({
    queryKey: ['categoriesId', userId],
    queryFn: () => fetchIdCategories(userId as string),
    select: data =>
      data.map(category => ({
        ...category,
        updated_at: new Date(category.updated_at),
      })),
    enabled: !!userId,
  });

  const allCategoriesQuery = useQuery({
    queryKey: ['allCategories'],
    queryFn: () => fetchAllCategories(),
    select: data =>
      data.map(category => ({
        ...category,
        updated_at: new Date(category.updated_at),
      })),
    enabled: !!userId,
  });

  const deleteCategoriesQuery = useMutation({
    mutationFn: (categoryId: string) => deleteCategories(categoryId),
    onSuccess: () => {
      toastSuccess('해당 카테고리가 삭제되었어요!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: Error) => {
      console.error('업로드 실패:', error);
      toastError('오류가 발생헜어요 ! 다시 시도해주세요');
    },
  });

  return {
    allCategoriesQuery,
    categoriesIdQuery,
    categoriesQuery,
    deleteCategoriesQuery,
  };
};

export { useCategories };
