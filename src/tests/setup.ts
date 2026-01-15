/**
 * Vitest global test setup
 * Configures test environment for Vue 3 composable testing
 */

import { config } from '@vue/test-utils';

// Configure Vue Test Utils globally
config.global.mocks = {
  // Add global mocks if needed
};

// Mock environment variables for tests
if (!import.meta.env.VITE_API_BASE_URL) {
  import.meta.env.VITE_API_BASE_URL = 'http://localhost:3000';
}

if (!import.meta.env.VITE_API_EXECUTION_ITEMS_ENDPOINT) {
  import.meta.env.VITE_API_EXECUTION_ITEMS_ENDPOINT = '/api/execution-items';
}
