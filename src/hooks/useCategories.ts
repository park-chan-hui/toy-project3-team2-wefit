import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, deleteCategories } from '@/api/categories';
import { toastError, toastSuccess } from '@/utils/toast';

export const useCategories = (userId: string) => {
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

  return categoriesQuery;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoried_id: string) => deleteCategories(categoried_id),
    onSuccess: () => {
      toastSuccess('해당 카테고리가 삭제되었어요!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: Error) => {
      console.error('업로드 실패:', error);
      toastError('오류가 발생헜어요 ! 다시 시도해주세요');
    },
  });
};
