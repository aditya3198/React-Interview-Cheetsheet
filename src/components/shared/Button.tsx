import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  label,
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  fullWidth,
  type = 'button',
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
    >
      {children ?? label}
    </button>
  );
}
