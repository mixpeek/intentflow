import '@testing-library/jest-dom';

jest.mock('posthog-js', () => ({
  init: jest.fn(),
  capture: jest.fn()
}));

jest.mock('cross-fetch', () => {
  const fetchMock = jest.fn(() => Promise.resolve({ ok: true }));
  return { __esModule: true, default: fetchMock };
});
