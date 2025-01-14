import { z } from 'zod';
import { getYoutubeVideoId } from '@/utils/getYoutubeVideoId';

const videoSchema = z.object({
  video_url: z
    .string()
    .nonempty('유튜브 URL을 입력해주세요.')
    .refine(
      url => !!getYoutubeVideoId(url),
      '유효한 유튜브 URL을 입력해주세요.',
    ),
  title: z.string().nonempty('영상 제목을 입력해주세요.'),
  hash_tag: z.array(z.string()).min(1, '최소 하나의 카테고리를 선택해주세요.'),
  thumbnail: z.string().optional(),
});
type VideoFormValues = z.infer<typeof videoSchema>;

export { videoSchema };
export type { VideoFormValues };
