import { ref, onMounted, readonly, Ref } from 'vue';
import { ExecutionItem } from '../types/ExecutionItem';
import { ExecutionItemsApiResponse } from '../types/ExecutionItemsApiResponse';
import { useHealthStatus } from './useHealthStatus';

/**
 * API configuration for execution items endpoint.
 * Uses environment variables with fallback defaults.
 */
const getApiConfig = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const endpoint = import.meta.env.VITE_API_EXECUTION_ITEMS_ENDPOINT || '/api/execution-items';
  
  return {
    baseUrl,
    endpoint,
    fullUrl: `${baseUrl}${endpoint}`
  };
};

/**
 * Composable return type for useExecutionItems.
 * Provides typed access to execution items data and operations.
 */
export interface UseExecutionItemsReturn {
  /** Readonly array of execution items */
  items: Readonly<Ref<ExecutionItem[]>>;
  /** Loading state indicator */
  loading: Readonly<Ref<boolean>>;
  /** Error message if fetch failed */
  error: Readonly<Ref<string | null>>;
  /** Function to manually refetch data */
  refetch: () => Promise<void>;
}

/**
 * Vue 3 composable for fetching and managing execution items data.
 * 
 * @remarks
 * This composable provides:
 * - Automatic data fetching on component mount
 * - Reactive state management (loading, error, data)
 * - Health status classification integration
 * - Manual refetch capability
 * - Type-safe API response handling
 * - Environment-based endpoint configuration
 * 
 * **API Integration:**
 * The composable fetches data from a configurable backend endpoint.
 * Configure the endpoint using environment variables:
 * - `VITE_API_BASE_URL`: Base URL of the API (e.g., 'https://api.example.com')
 * - `VITE_API_EXECUTION_ITEMS_ENDPOINT`: Endpoint path (default: '/api/execution-items')
 * 
 * **Response Format:**
 * The API must return data matching the `ExecutionItemsApiResponse` interface:
 * ```typescript
 * {
 *   items: ExecutionItem[],
 *   total: number,
 *   page?: number,
 *   limit?: number
 * }
 * ```
 * 
 * **Health Status Classification:**
 * Each item's health status is processed through `classifyStatus` from
 * `useHealthStatus`, allowing for custom business logic in status determination.
 * 
 * @example
 * ```typescript
 * // In a Vue component
 * import { useExecutionItems } from '@/composables/useExecutionItems';
 * 
 * export default {
 *   setup() {
 *     const { items, loading, error, refetch } = useExecutionItems();
 * 
 *     // Data automatically fetched on mount
 *     // Access reactive data in template
 *     return { items, loading, error, refetch };
 *   }
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // Manual refetch after user action
 * const { items, refetch } = useExecutionItems();
 * 
 * const handleRefresh = async () => {
 *   await refetch();
 *   console.log('Data refreshed');
 * };
 * ```
 * 
 * @example
 * ```typescript
 * // Error handling
 * const { error, loading } = useExecutionItems();
 * 
 * watchEffect(() => {
 *   if (error.value) {
 *     console.error('Failed to load execution items:', error.value);
 *     // Show error notification to user
 *   }
 * });
 * ```
 * 
 * @returns Object containing reactive state and refetch function
 */
export function useExecutionItems(): UseExecutionItemsReturn {
  // Reactive state
  const items = ref<ExecutionItem[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Health status utilities
  const { classifyStatus } = useHealthStatus();

  /**
   * Fetches execution items from the API.
   * 
   * @remarks
   * This function:
   * 1. Sets loading state to true
   * 2. Clears any previous errors
   * 3. Fetches data from the configured endpoint
   * 4. Validates the response structure
   * 5. Normalizes items with health status classification
   * 6. Updates reactive state with results or errors
   * 7. Sets loading state to false
   * 
   * **Error Handling:**
   * - Network errors: Captured and stored in `error` ref
   * - HTTP errors: Non-2xx responses throw and are captured
   * - Parse errors: JSON parsing failures are captured
   * - All errors are logged to console for debugging
   * 
   * @throws Does not throw - all errors are captured in `error` ref
   */
  const fetchItems = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const config = getApiConfig();
      
      // Validate configuration
      if (!config.fullUrl) {
        throw new Error(
          'API endpoint not configured. Please set VITE_API_BASE_URL and VITE_API_EXECUTION_ITEMS_ENDPOINT environment variables.'
        );
      }

      // Fetch data from API
      const response = await fetch(config.fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers here if needed
          // 'Authorization': `Bearer ${token}`
        },
        // Add credentials if needed for CORS
        // credentials: 'include'
      });

      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(
          `Failed to fetch execution items: ${response.status} ${response.statusText}`
        );
      }

      // Parse response
      const data: ExecutionItemsApiResponse = await response.json();

      // Validate response structure
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error(
          'Invalid API response: missing or invalid "items" array'
        );
      }

      // Normalize and classify data
      // Note: classifyStatus currently passes through existing healthStatus
      // but provides extension point for future business logic
      items.value = data.items.map(item => ({
        ...item,
        healthStatus: classifyStatus(item)
      }));

      console.log(`Successfully loaded ${items.value.length} execution items`);
    } catch (err) {
      // Capture and format error
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Unknown error occurred while fetching execution items';
      
      error.value = errorMessage;
      
      console.error('Error fetching execution items:', err);
      
      // Reset items on error
      items.value = [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Manually refetch execution items.
   * Useful for refresh buttons, polling, or retry after error.
   * 
   * @returns Promise that resolves when fetch is complete
   * 
   * @example
   * ```typescript
   * const { refetch } = useExecutionItems();
   * 
   * // Trigger manual refresh
   * await refetch();
   * ```
   */
  const refetch = async (): Promise<void> => {
    await fetchItems();
  };

  // Automatically fetch data when component is mounted
  onMounted(() => {
    fetchItems();
  });

  // Return readonly refs to prevent external mutation
  return {
    items: readonly(items),
    loading: readonly(loading),
    error: readonly(error),
    refetch
  };
}
