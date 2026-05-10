import cn from 'classnames';

import styles from './Title.module.css';
import type { TitleProps } from './Title.props';

export const Title = ({ className, children, ...props }: TitleProps) => {
    return (
        <h1 className={cn(styles.title, className)} {...props}>
            {children}
        </h1>
    );
};
