import supabase from './Supabase';

// addUser는 예시입니다. addVedio가 적용될 것으로 예상됩니다.
export async function addUser() {
  try {
    const newUser = {
      user_id: '12345',
      user_image: 'https://example.com/image.png',
      nickname: 'newUser',
      description: 'This is a new user.',
      follower: 0,
      following: 0,
      comments: [],
      my_upload_video: [],
      my_watched_video: [],
    };

    const response = await supabase.post('/rest/v1/users', newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('User added:', response.data);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}
