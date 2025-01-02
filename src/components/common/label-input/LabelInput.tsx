import { ChangeEvent, useState } from 'react';
import { useDebounce } from '@/hooks/usedebounce';

type LabelInputProps = {
  title: string;
  placeholder: string;
  description: string;
};

const LabelInput = (props: LabelInputProps) => {
  const { title, placeholder, description } = props;
  const [desc, setDesc] = useState(description);

  const debouncedValue = useDebounce({
    value: desc,
    delay: 1000,
  });

  console.log(debouncedValue); // 삭제 예정

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  return (
    <div className="mb-2 max-w-container">
      <p className="text-large font-bold">{title}</p>
      <input
        className="mt-1 w-full rounded-medium border border-black p-2 pl-4 pr-4 focus:!border-primary focus:outline-none"
        placeholder={placeholder}
        value={desc}
        onChange={handleChange}
      />
    </div>
  );
};

export default LabelInput;
