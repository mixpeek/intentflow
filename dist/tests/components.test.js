import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { Modal } from '../core/components';
describe('Modal component', () => {
    it('renders children content', () => {
        render(_jsx(Modal, { children: "hello world" }));
        expect(screen.getByText('hello world')).toBeInTheDocument();
    });
});
