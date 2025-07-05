import { render, screen } from '@testing-library/react';
import React from 'react';
import { Modal } from '../core/components';

describe('Modal component', () => {
  it('renders children content', () => {
    render(<Modal>hello world</Modal>);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
}); 