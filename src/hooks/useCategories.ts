import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/api/categories';

const useCategories = (userId: string) => {
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

export { useCategories };
