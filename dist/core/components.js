import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
export function Modal({ children, className }) {
    return (_jsxs("div", { className: classNames('intentflow-modal', className), children: [_jsx("div", { className: "intentflow-modal__backdrop" }), _jsx("div", { className: "intentflow-modal__content", children: children })] }));
}
export function Tooltip({ children, className }) {
    return _jsx("div", { className: classNames('intentflow-tooltip', className), children: children });
}
export function Banner({ children, className }) {
    return _jsx("div", { className: classNames('intentflow-banner', className), children: children });
}
