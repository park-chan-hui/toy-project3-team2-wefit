import supabase from './Supabase';

// 데이터 업데이트
type updateData = {
  imageURL?: string;
  nickname?: string;
  description?: string;
};
// const updatedData = {
//   nickname: 'updatedUser',
//   description: 'Updated description.',
// }; 예시
export async function updateUser(userId: string, updateData: updateData) {
  try {
    const response = await supabase.patch(
      `/rest/v1/users?user_id=eq.${userId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('User updated:', response.data);
  } catch (error) {
    console.error('Error updating user:', error);
  }
}
