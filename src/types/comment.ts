/* eslint-disable */
type CommonProps = {
  user_id: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
  thumb_up: number;
  thumb_down: number;
};

// 댓글
type Comment = CommonProps & {
  comment_id: string;
  video_id: string;
  comment: string;
  replies: Reply[];
  reply_id?: never;
  reply_comment?: never;
};

// 대댓글
type Reply = CommonProps & {
  comment_id: string;
  reply_id: string;
  reply_comment: string;
  video_id?: string;
  comment?: never;
  replies?: never;
};

type CombinedCommentProps = Comment | Reply;

type CommentActionsProps = {
  thumb_up: number;
  thumb_down: number;
  hasReplies?: boolean;
  comment_id: string;
  isExpanded: boolean;
  isReply?: boolean;
};

type CommentItemProps = {
  comment: CombinedCommentProps;
  isReply?: boolean;
};

interface CommentStore {
  expandedComments: string[];
  isInputFocused: boolean;
  activeCommentId: string | null;
  toggleReplies: (comment_id: string) => void;
  setInputFocus: (isFocused: boolean) => void;
  resetExapandedComments: () => void;
  setActiveCommentId: (comment_id: string | null) => void;
}

export type {
  Comment,
  Reply,
  CombinedCommentProps,
  CommentActionsProps,
  CommentItemProps,
  CommentStore,
};
