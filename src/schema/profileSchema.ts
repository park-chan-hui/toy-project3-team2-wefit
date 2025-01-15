import { z } from 'zod';

const profileSchema = z.object({
  user_image: z
    .string()
    .min(1, { message: '썸네일을 선택해주세요' })
    .refine(
      value => {
        const validPrefixes = [
          'data:image/jpg;base64,',
          'data:image/jpeg;base64,',
          'data:image/png;base64,',
        ];

        const isBase64Image = validPrefixes.some(prefix =>
          value.startsWith(prefix),
        );
        const isGoogleImage = value.startsWith(
          'https://lh3.googleusercontent.com/',
        );
        const isKakaoUrl = /^https?:\/\/.+\.(jpg|jpeg|png)(\?.*)?$/.test(value);
        //URL들은 구글, 카카오 로그인으로 인해 생성된 URL이기 때문
        return isBase64Image || isGoogleImage || isKakaoUrl;
      },
      {
        message:
          '유효하지 않은 이미지 형식입니다. jpg, jpeg, png 파일만 허용합니다.',
      },
    ),
  nickname: z.string().optional(),
  description: z.string().nonempty('소개를 입력해주세요'),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

export { profileSchema };
export type { ProfileFormValues };
