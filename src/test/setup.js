import { expect, afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock de localStorage
const storageMock = {};

const localStorageMock = {
  getItem: (key) => {
    return storageMock[key] || null;
  },
  setItem: (key, value) => {
    storageMock[key] = value.toString();
  },
  removeItem: (key) => {
    delete storageMock[key];
  },
  clear: () => {
    Object.keys(storageMock).forEach(key => {
      delete storageMock[key];
    });
  }
};

global.localStorage = localStorageMock;

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

