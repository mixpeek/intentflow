import classNames from 'classnames';
import { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export function Modal({ children, className }: BaseProps) {
  return (
    <div className={classNames('intentflow-modal', className)}>
      <div className="intentflow-modal__backdrop" />
      <div className="intentflow-modal__content">{children}</div>
    </div>
  );
}

export function Tooltip({ children, className }: BaseProps) {
  return <div className={classNames('intentflow-tooltip', className)}>{children}</div>;
}

export function Banner({ children, className }: BaseProps) {
  return <div className={classNames('intentflow-banner', className)}>{children}</div>;
} 