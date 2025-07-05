import '@testing-library/jest-dom';

jest.mock('posthog-js', () => ({
  init: jest.fn(),
  capture: jest.fn()
}));
