import { Link } from 'react-router-dom';

import EmptyResult from '../empty/EmptyResult';

import { useComments } from '@/hooks/useComments';
import { useVideos } from '@/hooks/useVideos';
import { getTimeAgo } from '@/utils/getTimeAgo';

const MyPageUserComments = ({ userId }: { userId: string }) => {
  const { userCommentsQuery } = useComments({
    userId: userId,
  });
  const { data: userCommentsData } = userCommentsQuery;
  const commentVideoId = userCommentsData?.map(item => item.video_id);
  const { selectVideosQuery } = useVideos({ videosId: commentVideoId });
  const { data: videoData } = selectVideosQuery;
  const userCommentsArray = userCommentsData?.map(data => {
    const videoId = videoData?.find(video => video.video_id === data.video_id);
    return { ...data, video: videoId ? videoId : 'N/A' };
  });

  return (
    <section>
      <p className="text-lg font-bold">내 댓글</p>
      <hr className="my-2" aria-hidden="true" />
      {userCommentsData?.length !== 0 ? (
        <div className="space-y-2.5">
          {userCommentsArray?.map(commentData => (
            <article
              key={commentData.comment_id}
              className="group relative rounded-md border border-l-4 border-gray-100 border-l-secondary p-2 transition-all duration-300 hover:border-l-primary hover:bg-gray-50"
            >
              <Link to={`/video/${commentData.video.video_id}`}>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                      {commentData.video.title}
                    </h3>
                    <time className="ml-2 shrink-0 text-xs text-gray">
                      {getTimeAgo(commentData.created_at)}
                    </time>
                  </div>

                  <p className="line-clamp-2 flex-1 overflow-hidden text-ellipsis text-sm text-gray">
                    {commentData.comment}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <EmptyResult message="작성한 댓글이 없어요!" />
      )}
    </section>
  );
};

export default MyPageUserComments;
