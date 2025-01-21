import { useUserStore } from '@/store/useUserStore';
import MyPageEditForm from '@/components/my-page/MyPageEditForm';

const MyPageEdit = () => {
  const userData = useUserStore(state => state.user);

  return <MyPageEditForm userData={userData} />;
};

export default MyPageEdit;
