const getTimeAgo = (date: Date | string) => {
  const dateObject = date instanceof Date ? date : new Date(date);
  const now = new Date();

  const diffInHours = Math.floor(
    (now.getTime() - dateObject.getTime()) / (1000 * 60 * 60),
  );
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}개월 전`;
};

export { getTimeAgo };
