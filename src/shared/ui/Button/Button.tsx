import cn from 'classnames';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.props';

export const Button = ({
  className,
  children,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
