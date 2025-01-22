import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';

const BackHeader = () => {
  const navigation = useNavigate();

  return (
    <header className="flex h-16 items-center px-3">
      <button onClick={() => navigation(-1)}>
        <IoArrowBackSharp size={24} />
      </button>
    </header>
  );
};

export default BackHeader;
