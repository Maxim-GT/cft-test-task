import type { ILoaderProps } from './Loader.props';
import cn from 'classnames';
import styles from './Loader.module.css';

export function Loader({ className, size = 'lg' }: ILoaderProps) {
    return (
        <div
            className={cn(styles.loader, styles[size], className)}
            role="status"
            aria-live="polite"
            aria-label="Загрузка"
        />
    );
}
