import { useUsers } from '@/hooks/useUsers';
import { ProfileFormValues, profileSchema } from '@/schema/profileSchema';
import { UserProps } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import MyPageEditProfileImage from './MyPageEditProfileImage';
import LabelInput from '../common/label-input/LabelInput';
import Button from '../common/button/Button';
import EmptyResult from '../empty/EmptyResult';

const MyPageEditForm = ({ userData }: { userData: UserProps | null }) => {
  const { updateUserMutation, checkUserNicknameMutation } = useUsers();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    setError,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      user_image: userData?.user_image,
      nickname: userData?.nickname,
      description: userData?.description,
    },
  });

  const handleImageChange = (imageFile: string) => {
    setValue('user_image', imageFile, { shouldValidate: true });
  };

  const handleReset = () => {
    reset();
  };

  const onSubmit = async (data: ProfileFormValues) => {
    const nickname = watch('nickname');
    try {
      const isAvailable = await checkUserNicknameMutation.mutateAsync({
        userId: userData!.user_id,
        nickname: nickname!,
      });
      if (!isAvailable) {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        return;
      }
      updateUserMutation.mutate({
        userId: userData!.user_id,
        updateData: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center [&>main]:my-2 [&_p]:text-lg">
        <EmptyResult message={`유저 정보가 없습니다.`} />
        <p>로그인 상태를 확인해 주세요.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MyPageEditProfileImage
        userImage={userData?.user_image as string}
        onImageChange={handleImageChange}
        imgFile={control._formValues.user_image}
      />
      {errors.user_image && (
        <p className="text-sm text-red-500">{errors.user_image.message}</p>
      )}

      <Controller
        name="nickname"
        control={control}
        render={({ field }) => (
          <LabelInput
            title="닉네임"
            placeholder="수정할 닉네임을 작성해 주세요"
            description={control._formValues.nickname}
            onChange={e => {
              field.onChange(e);
              if (e.target.value) {
                clearErrors('nickname');
              }
            }}
            value={field.value}
          />
        )}
      />
      {errors.nickname && (
        <p className="text-sm text-red-500">{errors.nickname.message}</p>
      )}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <LabelInput
            title="소개"
            placeholder="한 줄 평을 작성해 주세요"
            description={control._formValues.description}
            onChange={e => {
              field.onChange(e);
              if (e.target.value) {
                clearErrors('description');
              }
            }}
            value={field.value}
          />
        )}
      />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}

      <div className="my-3 flex w-full gap-small">
        <Button type="submit" className="w-1/2">
          수정하기
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="w-1/2"
          onClick={handleReset}
        >
          초기화
        </Button>
      </div>
    </form>
  );
};

export default MyPageEditForm;
