import { useState } from 'react';

import CommentList from './CommentList';
import EmptyResult from '../empty/EmptyResult';
import { formatNumber } from '@/utils/formatNumber';
import { mockComments } from '@/mocks/mockComment';
import { Comment } from '@/types/comment';

type VideoCommentProps = {
  videoId: string;
};

const VideoComment = ({ videoId }: VideoCommentProps) => {
  const comments = mockComments.filter(
    comment => comment.video_id === videoId,
  ) as Comment[];
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const toggleReplies = (commentId: string) => {
    setExpandedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId],
    );
  };

  return (
    <main className="mt-6">
      <h3 className="text-base font-bold">
        댓글 {formatNumber(comments.length)}개
      </h3>
      <hr className="my-1" aria-hidden="true" />

      {comments.length > 0 ? (
        <CommentList
          comments={comments}
          expandedComments={expandedComments}
          onToggle={toggleReplies}
        />
      ) : (
        <EmptyResult message="작성된 댓글이 없습니다." />
      )}
    </main>
  );
};

export default VideoComment;
