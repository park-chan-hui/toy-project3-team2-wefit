import emptySvg from '@/assets/empty-box.svg';

type EmptyResultProps = {
  message: string;
};

const EmptyResult = ({ message }: EmptyResultProps) => {
  return (
    <main className="my-10 flex flex-col items-center justify-center">
      <img src={emptySvg} alt="검색 결과가 없습니다." className="w-24" />
      <p className="text-center text-sm">{message}</p>
    </main>
  );
};

export default EmptyResult;
