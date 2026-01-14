import { ExecutionItem } from './ExecutionItem';

/**
 * API response interface for fetching execution items from the backend.
 * Wraps an array of ExecutionItem objects with metadata for pagination and total count tracking.
 * 
 * @remarks
 * This interface is designed for API integration with backend endpoints that return execution roadmap data.
 * It supports both paginated and non-paginated responses:
 * 
 * **Non-paginated response:**
 * - Contains all execution items in a single response
 * - Only `items` and `total` properties are populated
 * - `page` and `limit` are undefined
 * 
 * **Paginated response:**
 * - Contains a subset of execution items based on pagination parameters
 * - `items` contains the current page of results
 * - `total` represents the total number of items across all pages
 * - `page` indicates the current page number (1-indexed)
 * - `limit` indicates the number of items per page
 * 
 * **Pagination logic:**
 * ```
 * totalPages = Math.ceil(total / limit)
 * hasNextPage = page < totalPages
 * hasPreviousPage = page > 1
 * startIndex = (page - 1) * limit
 * endIndex = Math.min(startIndex + limit, total)
 * ```
 * 
 * @example
 * ```typescript
 * // Non-paginated response
 * const response: ExecutionItemsApiResponse = {
 *   items: [
 *     { moduleName: 'Auth Module', owner: 'John', pm: 'Jane', healthStatus: 'on-track', teamWorking: 'Squad 1', okrHierarchy: 'O1 > KR1' },
 *     { moduleName: 'Payment Module', owner: 'Alice', pm: 'Bob', healthStatus: 'at-risk', teamWorking: 'Squad 2', okrHierarchy: 'O2 > KR2' }
 *   ],
 *   total: 2
 * };
 * 
 * // Paginated response (page 1 of 3)
 * const paginatedResponse: ExecutionItemsApiResponse = {
 *   items: [
 *     { moduleName: 'Auth Module', owner: 'John', pm: 'Jane', healthStatus: 'on-track', teamWorking: 'Squad 1', okrHierarchy: 'O1 > KR1' },
 *     { moduleName: 'Payment Module', owner: 'Alice', pm: 'Bob', healthStatus: 'at-risk', teamWorking: 'Squad 2', okrHierarchy: 'O2 > KR2' }
 *   ],
 *   total: 25,
 *   page: 1,
 *   limit: 10
 * };
 * 
 * // Usage in API client
 * async function fetchExecutionItems(page?: number, limit?: number): Promise<ExecutionItemsApiResponse> {
 *   const url = page && limit 
 *     ? `/api/execution-items?page=${page}&limit=${limit}`
 *     : '/api/execution-items';
 *   const response = await fetch(url);
 *   return response.json();
 * }
 * ```
 * 
 * @see {@link ExecutionItem} for the structure of individual execution items
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface ExecutionItemsApiResponse {
  /**
   * Array of execution items in the response.
   * 
   * - For non-paginated responses: contains all available execution items
   * - For paginated responses: contains only the items for the current page
   * 
   * @example
   * ```typescript
   * const items: ExecutionItem[] = response.items;
   * console.log(`Received ${items.length} items`);
   * ```
   */
  items: ExecutionItem[];

  /**
   * Total number of execution items available across all pages.
   * 
   * @remarks
   * This value represents the complete count of execution items in the dataset,
   * regardless of pagination. Use this to calculate total pages and display
   * pagination controls in the UI.
   * 
   * For non-paginated responses: `total` equals `items.length`
   * For paginated responses: `total` may be greater than `items.length`
   * 
   * @example
   * ```typescript
   * const totalPages = Math.ceil(response.total / response.limit!);
   * console.log(`Showing ${response.items.length} of ${response.total} items`);
   * ```
   */
  total: number;

  /**
   * Current page number (1-indexed).
   * 
   * @remarks
   * - Only present in paginated responses
   * - First page is numbered 1 (not 0)
   * - Undefined for non-paginated responses
   * 
   * @example
   * ```typescript
   * if (response.page !== undefined) {
   *   console.log(`Currently viewing page ${response.page}`);
   * }
   * ```
   */
  page?: number;

  /**
   * Number of items per page.
   * 
   * @remarks
   * - Only present in paginated responses
   * - Determines the maximum number of items returned in `items` array
   * - Undefined for non-paginated responses
   * - Common values: 10, 25, 50, 100
   * 
   * @example
   * ```typescript
   * if (response.limit !== undefined) {
   *   const totalPages = Math.ceil(response.total / response.limit);
   *   console.log(`Total pages: ${totalPages}`);
   * }
   * ```
   */
  limit?: number;
}
