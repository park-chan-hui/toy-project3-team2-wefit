import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(...inputs));
};

export { cn };
