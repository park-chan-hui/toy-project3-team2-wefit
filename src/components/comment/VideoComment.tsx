import { useEffect } from 'react';

import CommentList from './CommentList';
import CommentInput from './CommentInput';
import EmptyResult from '../empty/EmptyResult';

import { useCommentStore } from '@/store/useCommentStore';
import { formatNumber } from '@/utils/formatNumber';
import { useComments } from '@/hooks/useComments';

type VideoCommentProps = {
  videoId: string;
};

const VideoComment = ({ videoId }: VideoCommentProps) => {
  const { comments, totalCount, isLoading } = useComments({ videoId: videoId });
  const resetExpandedComments = useCommentStore(
    state => state.resetExapandedComments,
  );

  // 펼쳐진 댓글 초기화를 위함
  useEffect(() => {
    resetExpandedComments();
  }, [videoId, resetExpandedComments]);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <main className="mt-6">
      <h3 className="text-base font-bold">댓글 {formatNumber(totalCount)}개</h3>
      <hr className="my-1" aria-hidden="true" />

      {totalCount > 0 ? (
        <CommentList comments={comments} videoId={videoId} />
      ) : (
        <EmptyResult message="작성된 댓글이 없습니다." />
      )}
      <CommentInput videoId={videoId} />
    </main>
  );
};

export default VideoComment;
