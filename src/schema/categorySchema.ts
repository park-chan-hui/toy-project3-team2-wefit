import { z } from 'zod';

const categorySchema = z.object({
  categoryName: z.string().min(1, { message: '카테고리 명을 입력해주세요' }),
  imgFile: z
    .string()
    .min(1, { message: '썸네일을 선택해주세요' })
    .refine(
      value => {
        const validPrefixes = [
          'data:image/jpg;base64,',
          'data:image/jpeg;base64,',
          'data:image/png;base64,',
        ];

        return validPrefixes.some(prefix => value.startsWith(prefix));
      },
      {
        message: 'jpg, jpeg, png 파일만 허용됩니다.',
      },
    ),
  videos: z.string().min(1, { message: '최소 하나의 동영상을 선택해주세요' }),
});

export { categorySchema };
