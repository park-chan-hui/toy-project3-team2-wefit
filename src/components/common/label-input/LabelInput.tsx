import { ChangeEvent, InputHTMLAttributes, useState, useEffect } from 'react';
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

  const [inputValue, setInputValue] = useState(value || description || '');

  const debouncedValue = useDebounce({
    value: inputValue,
    delay: 300,
  });

  const isControlled = (props.value === '' || props.value) && props.onChange;

  useEffect(() => {
    if (!isControlled) {
      setInputValue(debouncedValue);
    }
  }, [debouncedValue, isControlled]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mb-2 max-w-container">
      <p className="text-base font-bold">{title}</p>
      <input
        {...inputProps}
        className="mt-1 w-full rounded-medium border border-black p-2 px-4 focus:!border-primary focus:outline-none"
        placeholder={placeholder}
        value={isControlled ? value : inputValue}
        onChange={isControlled ? onChange : handleChange}
      />
    </div>
  );
};

export default LabelInput;
