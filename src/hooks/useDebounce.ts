import { useState, useEffect } from 'react';

type debounceProps<T> = {
  value: T;
  delay: number;
};

export function useDebounce<T>({ value, delay }: debounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // warning 때문에 delay 추가

  return debouncedValue;
}
