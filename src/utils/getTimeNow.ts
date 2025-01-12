const getKSTDate = () => {
  const now = new Date();
  const offset = 9 * 60;
  return new Date(now.getTime() + offset * 60 * 1000).toISOString();
};

export { getKSTDate };
