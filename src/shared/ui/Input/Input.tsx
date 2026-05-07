import type { JSX } from 'react';
import cn from 'classnames';

import styles from './Input.module.css';
import type { InputProps } from './Input.props';

export const Input = ({ error, className, ...props }: InputProps): JSX.Element => {
  return (
    <div className={cn(className, styles.inputWrapper)}>
      <input
        className={cn(styles.input, {
          [styles.error]: error,
        })}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
