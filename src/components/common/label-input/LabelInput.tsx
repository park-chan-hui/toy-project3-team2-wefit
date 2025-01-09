import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

type LabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  placeholder: string;
  description?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LabelInput = (props: LabelInputProps) => {
  const { title, placeholder, description, value, onChange, ...inputProps } =
    props;
  const [desc, setDesc] = useState(description);

  const debouncedValue = useDebounce({
    value: desc,
    delay: 1000,
  });

  console.log(debouncedValue); //삭제 예정

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  return (
    <div className="mb-2 max-w-container">
      <p className="text-base font-bold">{title}</p>
      {props.value === '' && props.onChange ? (
        <input
          {...inputProps}
          className="mt-1 w-full rounded-medium border border-black p-2 px-4 focus:!border-primary focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          {...inputProps}
          className="mt-1 w-full rounded-medium border border-black p-2 px-4 focus:!border-primary focus:outline-none"
          placeholder={placeholder}
          value={desc}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default LabelInput;
