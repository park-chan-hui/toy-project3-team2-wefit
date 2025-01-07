import { useEffect } from 'react';

import CommentList from './CommentList';
import EmptyResult from '../empty/EmptyResult';
import { useCommentStore } from '@/store/useCommentStore';
import { formatNumber } from '@/utils/formatNumber';

type VideoCommentProps = {
  videoId: string;
};

const VideoComment = ({ videoId }: VideoCommentProps) => {
  const { comments, fetchCommentsByVideoId } = useCommentStore();

  useEffect(() => {
    fetchCommentsByVideoId(videoId);
  }, [videoId, fetchCommentsByVideoId]);

  return (
    <main className="mt-6">
      <h3 className="text-base font-bold">
        댓글 {formatNumber(comments.length)}개
      </h3>
      <hr className="my-1" aria-hidden="true" />

      {comments.length > 0 ? (
        <CommentList />
      ) : (
        <EmptyResult message="작성된 댓글이 없습니다." />
      )}
    </main>
  );
};

export default VideoComment;
