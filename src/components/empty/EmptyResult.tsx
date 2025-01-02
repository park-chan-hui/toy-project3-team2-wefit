import emptySvg from '@/assets/empty-box.svg';

type EmptyResultProps = {
  message: string;
};

const EmptyResult = ({ message }: EmptyResultProps) => {
  return (
    <main className="mt-10 flex flex-col items-center justify-center">
      <img src={emptySvg} alt="검색 결과가 없습니다." className="w-32" />
      <p className="text-center">{message}</p>
    </main>
  );
};

export default EmptyResult;
