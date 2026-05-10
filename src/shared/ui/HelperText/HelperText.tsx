import cn from 'classnames';

import styles from './HelperText.module.css';
import type { HelperTextProps } from './HelperText.props';

export const HelperText = ({ className, size = 'md', children, ...props }: HelperTextProps) => {
    return (
        <span
            className={cn(styles.text, className, {
                [styles.sm]: size === 'sm',
                [styles.md]: size === 'md',
            })}
            {...props}
        >
            {children}
        </span>
    );
};
