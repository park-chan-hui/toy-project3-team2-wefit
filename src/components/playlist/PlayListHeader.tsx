type PlayListHeaderProps = {
  title: string;
};

const PlayListHeader = ({ title }: PlayListHeaderProps) => {
  return <h2 className="my-1 text-large font-bold text-black">{title}</h2>;
};

export default PlayListHeader;
