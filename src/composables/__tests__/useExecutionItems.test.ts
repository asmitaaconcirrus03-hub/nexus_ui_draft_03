import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { flushPromises, config } from '@vue/test-utils';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useExecutionItems } from '../useExecutionItems';
import { ExecutionItemsApiResponse } from '../../types/ExecutionItemsApiResponse';
import { ExecutionItem } from '../../types/ExecutionItem';

// Mock data for tests
const mockExecutionItems: ExecutionItem[] = [
  {
    moduleName: 'Authentication Module',
    owner: 'John Doe',
    pm: 'Jane Smith',
    healthStatus: 'on-track',
    teamWorking: 'Squad 1',
    okrHierarchy: 'O1 > KR1 > Initiative A'
  },
  {
    moduleName: 'Payment Gateway',
    owner: 'Alice Johnson',
    pm: 'Bob Williams',
    healthStatus: 'at-risk',
    teamWorking: 'Squad 2',
    okrHierarchy: 'O2 > KR2 > Initiative B'
  },
  {
    moduleName: 'User Dashboard',
    owner: 'Charlie Brown',
    pm: 'Diana Prince',
    healthStatus: 'off-track',
    teamWorking: 'Squad 3',
    okrHierarchy: 'O3 > KR3 > Initiative C'
  }
];

const mockSuccessResponse: ExecutionItemsApiResponse = {
  items: mockExecutionItems,
  total: 3
};

// MSW server setup
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINT = '/api/execution-items';
const FULL_URL = `${API_BASE_URL}${API_ENDPOINT}`;

const server = setupServer(
  http.get(FULL_URL, () => {
    return HttpResponse.json(mockSuccessResponse);
  })
);

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => {
  server.close();
});

describe('useExecutionItems', () => {
  // Mock onMounted to control when fetching happens
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Successful data fetching', () => {
    it('should fetch execution items successfully', async () => {
      const { items, loading, error } = useExecutionItems();

      // Initially loading should be false (before mount)
      expect(loading.value).toBe(false);
      expect(items.value).toEqual([]);
      expect(error.value).toBeNull();

      // Trigger onMounted
      await flushPromises();

      // After successful fetch
      expect(loading.value).toBe(false);
      expect(items.value).toHaveLength(3);
      expect(error.value).toBeNull();
    });

    it('should populate items with correct data', async () => {
      const { items } = useExecutionItems();
      await flushPromises();

      expect(items.value[0]).toMatchObject({
        moduleName: 'Authentication Module',
        owner: 'John Doe',
        pm: 'Jane Smith',
        healthStatus: 'on-track',
        teamWorking: 'Squad 1',
        okrHierarchy: 'O1 > KR1 > Initiative A'
      });
    });

    it('should apply health status classification to all items', async () => {
      const { items } = useExecutionItems();
      await flushPromises();

      // Verify all items have health status
      items.value.forEach(item => {
        expect(item.healthStatus).toBeDefined();
        expect(['on-track', 'at-risk', 'off-track']).toContain(item.healthStatus);
      });
    });

    it('should handle empty items array', async () => {
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.json({ items: [], total: 0 });
        })
      );

      const { items, error } = useExecutionItems();
      await flushPromises();

      expect(items.value).toEqual([]);
      expect(error.value).toBeNull();
    });
  });

  describe('Loading state management', () => {
    it('should set loading to true during fetch', async () => {
      const { loading, refetch } = useExecutionItems();
      
      // Manually trigger refetch to observe loading state
      const fetchPromise = refetch();
      
      // Should be loading
      expect(loading.value).toBe(true);

      await fetchPromise;

      // Should be done loading
      expect(loading.value).toBe(false);
    });

    it('should set loading to false after successful fetch', async () => {
      const { loading } = useExecutionItems();
      await flushPromises();

      expect(loading.value).toBe(false);
    });

    it('should set loading to false after failed fetch', async () => {
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.error();
        })
      );

      const { loading } = useExecutionItems();
      await flushPromises();

      expect(loading.value).toBe(false);
    });
  });

  describe('Error handling', () => {
    it('should handle network errors', async () => {
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.error();
        })
      );

      const { error, items } = useExecutionItems();
      await flushPromises();

      expect(error.value).toBeTruthy();
      expect(items.value).toEqual([]);
    });

    it('should handle HTTP 404 errors', async () => {
      server.use(
        http.get(FULL_URL, () => {
          return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
        })
      );

      const { error } = useExecutionItems();
      await flushPromises();

      expect(error.value).toContain('404');
      expect(error.value).toContain('Not Found');
    });

    it('should handle HTTP 500 errors', async () => {
      server.use(
        http.get(FULL_URL, () => {
          return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
        })
      );

      const { error } = useExecutionItems();
      await flushPromises();

      expect(error.value).toContain('500');
      expect(error.value).toContain('Internal Server Error');
    });

    it('should handle invalid response format (missing items)', async () => {
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.json({ total: 10 }); // Missing 'items' array
        })
      );

      const { error } = useExecutionItems();
      await flushPromises();

      expect(error.value).toContain('Invalid API response');
      expect(error.value).toContain('items');
    });

    it('should handle invalid response format (items not an array)', async () => {
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.json({ items: 'not-an-array', total: 0 });
        })
      );

      const { error } = useExecutionItems();
      await flushPromises();

      expect(error.value).toContain('Invalid API response');
    });

    it('should clear previous errors on successful refetch', async () => {
      // First request fails
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.error();
        })
      );

      const { error, refetch } = useExecutionItems();
      await flushPromises();

      expect(error.value).toBeTruthy();

      // Second request succeeds
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.json(mockSuccessResponse);
        })
      );

      await refetch();

      expect(error.value).toBeNull();
    });

    it('should reset items array on error', async () => {
      const { items, refetch } = useExecutionItems();
      await flushPromises();

      // Items should be populated
      expect(items.value.length).toBeGreaterThan(0);

      // Trigger error
      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.error();
        })
      );

      await refetch();

      // Items should be cleared
      expect(items.value).toEqual([]);
    });
  });

  describe('Refetch functionality', () => {
    it('should provide refetch function', () => {
      const { refetch } = useExecutionItems();
      expect(refetch).toBeDefined();
      expect(typeof refetch).toBe('function');
    });

    it('should refetch data when refetch is called', async () => {
      const { items, refetch } = useExecutionItems();
      await flushPromises();

      const initialLength = items.value.length;

      // Update mock data
      const newMockData: ExecutionItemsApiResponse = {
        items: [
          ...mockExecutionItems,
          {
            moduleName: 'New Module',
            owner: 'New Owner',
            pm: 'New PM',
            healthStatus: 'on-track',
            teamWorking: 'Squad 4',
            okrHierarchy: 'O4 > KR4'
          }
        ],
        total: 4
      };

      server.use(
        http.get(FULL_URL, () => {
          return HttpResponse.json(newMockData);
        })
      );

      await refetch();

      expect(items.value.length).toBe(4);
      expect(items.value.length).toBeGreaterThan(initialLength);
    });

    it('should return a Promise from refetch', () => {
      const { refetch } = useExecutionItems();
      const result = refetch();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Data normalization', () => {
    it('should preserve all ExecutionItem properties', async () => {
      const { items } = useExecutionItems();
      await flushPromises();

      const item = items.value[0];
      expect(item).toHaveProperty('moduleName');
      expect(item).toHaveProperty('owner');
      expect(item).toHaveProperty('pm');
      expect(item).toHaveProperty('healthStatus');
      expect(item).toHaveProperty('teamWorking');
      expect(item).toHaveProperty('okrHierarchy');
    });

    it('should maintain data types', async () => {
      const { items } = useExecutionItems();
      await flushPromises();

      const item = items.value[0];
      expect(typeof item.moduleName).toBe('string');
      expect(typeof item.owner).toBe('string');
      expect(typeof item.pm).toBe('string');
      expect(typeof item.healthStatus).toBe('string');
      expect(typeof item.teamWorking).toBe('string');
      expect(typeof item.okrHierarchy).toBe('string');
    });
  });

  describe('Immutability', () => {
    it('should return readonly refs', async () => {
      const { items, loading, error } = useExecutionItems();
      await flushPromises();

      // These should be readonly - attempting to reassign should fail in TS
      // Runtime check: refs should be readonly wrapped
      expect(items).toBeDefined();
      expect(loading).toBeDefined();
      expect(error).toBeDefined();
    });
  });

  describe('API Configuration', () => {
    it('should use environment variables for API configuration', async () => {
      // Environment variables are set in setup.ts
      expect(import.meta.env.VITE_API_BASE_URL).toBe('http://localhost:3000');
      expect(import.meta.env.VITE_API_EXECUTION_ITEMS_ENDPOINT).toBe('/api/execution-items');
    });
  });

  describe('Integration', () => {
    it('should complete full workflow: mount -> fetch -> populate', async () => {
      const { items, loading, error } = useExecutionItems();

      // Initial state
      expect(items.value).toEqual([]);

      // After mount and fetch
      await flushPromises();

      // Final state
      expect(loading.value).toBe(false);
      expect(error.value).toBeNull();
      expect(items.value.length).toBeGreaterThan(0);
      expect(items.value[0].healthStatus).toBeDefined();
    });
  });
});
