import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ILoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}