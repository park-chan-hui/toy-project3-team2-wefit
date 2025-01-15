import Button from '../common/button/Button';
import blankProfile from '@/assets/user/blank-user.webp';
import { UserProps } from '@/types/user';
import { VideoProps } from '@/types/video';
import { formatNumber } from '@/utils/formatNumber';
import { useFollow } from '@/hooks/useFollow';
import { useUsers } from '@/hooks/useUsers';

type AuthorProfileProps = {
  author: UserProps;
  authorVideos: VideoProps[];
};

type StatItem = {
  label: string;
  value: number;
};

const AuthorProfile = ({ author, authorVideos }: AuthorProfileProps) => {
  const { currentUserQuery } = useUsers();
  const { isFollowLoading, isFollowing, toggleFollow } = useFollow(
    author.user_id,
  );

  const isSameUser = currentUserQuery.data?.user_id === author.user_id;

  const stats: StatItem[] = [
    { label: '팔로워', value: author.follower },
    { label: '팔로잉', value: author.following },
    { label: '업로드 영상', value: authorVideos.length },
  ];

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center gap-4">
        <h1 className="text-xl font-bold">{author.nickname}</h1>
        {!isSameUser && (
          <Button
            variant={isFollowing ? 'primary' : 'outline'}
            size="small"
            onClick={() => toggleFollow()}
            disabled={isFollowLoading}
          >
            {isFollowing ? '팔로잉' : '팔로우'}
          </Button>
        )}
      </header>

      <article className="flex items-center gap-6 px-2">
        <figure className="h-16 w-16 overflow-hidden rounded-full">
          <img
            src={author.user_image ? author.user_image : blankProfile}
            alt={`${author.nickname}님의 프로필`}
            className="h-full w-full object-cover"
          />
        </figure>

        <dl className="flex items-center gap-8">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <dt className="text-sm">{label}</dt>
              <dd className="text-lg font-bold">{formatNumber(value)}</dd>
            </div>
          ))}
        </dl>
      </article>

      <p className="px-2 text-sm text-gray">{author.description}</p>
    </section>
  );
};

export default AuthorProfile;
