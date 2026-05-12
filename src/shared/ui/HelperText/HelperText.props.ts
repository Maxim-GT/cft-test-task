import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HelperTextProps extends DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
> {
    size?: 'sm' | 'md';
}
