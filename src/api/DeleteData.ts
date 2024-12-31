import supabase from './Supabase';

export async function deleteUser(userId: string) {
  try {
    const response = await supabase.delete(
      `/rest/v1/users?user_id=eq.${userId}`,
    );
    console.log('User deleted:', response.data);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
