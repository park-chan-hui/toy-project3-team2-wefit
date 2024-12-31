import supabase from './Supabase';

export async function fetchUsers() {
  try {
    const response = await supabase.get('/rest/v1/users', {
      params: {
        select: '*', // 가져올 컬럼 지정
      },
    });
    console.log('Users:', response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
