import MyPageEditForm from '@/components/my-page/MyPageEditForm';

import { useUserStore } from '@/store/useUserStore';

const MyPageEdit = () => {
  const userData = useUserStore(state => state.user);

  return <MyPageEditForm userData={userData} />;
};

export default MyPageEdit;
