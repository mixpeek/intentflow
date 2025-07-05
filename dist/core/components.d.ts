import { ReactNode } from 'react';
interface BaseProps {
    children: ReactNode;
    className?: string;
}
export declare function Modal({ children, className }: BaseProps): import("react/jsx-runtime").JSX.Element;
export declare function Tooltip({ children, className }: BaseProps): import("react/jsx-runtime").JSX.Element;
export declare function Banner({ children, className }: BaseProps): import("react/jsx-runtime").JSX.Element;
export {};
