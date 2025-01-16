import { useComments } from '@/hooks/useComments';
import { useVideos } from '@/hooks/useVideos';
import { Link } from 'react-router-dom';

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
        userCommentsArray?.map(commentData => (
          <div className="my-2" key={commentData.comment_id}>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
              <Link to={`/video/${commentData.video.video_id}`}>
                댓글을 작성한 동영상: {commentData.video.title}
              </Link>
            </p>
            <p className="text-xsmall text-gray">{commentData.comment}</p>
          </div>
        ))
      ) : (
        <p className="font-bold"> 작성한 댓글이 없어요!</p>
      )}
    </section>
  );
};

export default MyPageUserComments;
