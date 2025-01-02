import { cn } from '@/utils/cn';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'tertiary'
    | 'outline'
    | 'kakao'
    | 'google';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'secondary',
  size = 'medium',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'rounded-md transition-all duration-300';
  const variantStyles = {
    primary: 'bg-primary text-light hover:bg-hover-primary',
    secondary:
      'bg-secondary text-light hover:bg-hover-secondary hover:text-black',
    danger: 'bg-danger text-light hover:bg-hover-danger',
    success: 'bg-success text-light hover:bg-hover-success',
    tertiary: 'bg-tertiary text-black hover:bg-hover-tertiary',
    outline:
      'border border-primary text-black hover:bg-primary hover:text-light',
    kakao: 'bg-[#FEE500] text-black hover:bg-[#FFEB3B]',
    google:
      'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100',
  };
  const sizeStyles = {
    small: 'px-4 py-1 text-xs',
    medium: 'px-6 py-1.5 text-sm',
    large: 'px-8 py-1.5 text-base',
  };

  const combinedStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        combinedStyles,
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      {children}
    </button>
  );
};

export default Button;
