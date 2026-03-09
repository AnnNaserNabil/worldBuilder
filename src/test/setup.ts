import '@testing-library/jest-dom';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

// Mock matchMedia for components that use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id: number) => clearTimeout(id);

// Mock localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  clear() {
    this.store = {};
  },
  getItem(key: string) {
    return this.store[key] || null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value;
  },
  removeItem(key: string) {
    delete this.store[key];
  },
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
