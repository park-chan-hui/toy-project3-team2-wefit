import { useState, useEffect } from 'react';

type DebounceProps<T> = {
  value: T;
  delay: number;
};

export function useDebounce<T>({ value, delay }: DebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
