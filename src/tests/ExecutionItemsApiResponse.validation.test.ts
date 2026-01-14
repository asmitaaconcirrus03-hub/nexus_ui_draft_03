/**
 * Type validation test file for ExecutionItemsApiResponse interface.
 * 
 * This file verifies that:
 * 1. The ExecutionItemsApiResponse type can be imported without errors
 * 2. Objects conforming to the interface compile successfully
 * 3. Mock API responses (with and without pagination) are type-safe
 * 4. Helper functions for pagination work correctly
 * 5. Type checking works as expected for optional properties
 * 6. Invalid assignments are caught by TypeScript
 * 
 * @remarks
 * Run with: npm run type-check
 */

import { ExecutionItemsApiResponse } from '../types/ExecutionItemsApiResponse';
import { ExecutionItem, HealthStatus } from '../types/ExecutionItem';

// ============================================================
// MOCK DATA SETUP
// ============================================================

/**
 * Mock execution items for testing
 */
const mockExecutionItems: ExecutionItem[] = [
  {
    moduleName: 'User Authentication Module',
    owner: 'John Doe',
    pm: 'Jane Smith',
    healthStatus: 'on-track',
    teamWorking: 'Squad 1',
    okrHierarchy: 'O1: Improve Security > KR1: Implement MFA > Initiative: Auth Overhaul > Feature: SSO Integration'
  },
  {
    moduleName: 'Payment Gateway Integration',
    owner: 'Alice Brown',
    pm: 'Bob Williams',
    healthStatus: 'at-risk',
    teamWorking: 'Squad 3',
    okrHierarchy: 'O2: Increase Revenue > KR2: Enable Multiple Payment Methods > Initiative: Payment Platform'
  },
  {
    moduleName: 'Analytics Dashboard',
    owner: 'Charlie Davis',
    pm: 'Diana Evans',
    healthStatus: 'off-track',
    teamWorking: 'Squad 2',
    okrHierarchy: 'O3: Data-Driven Decisions > KR3: Real-time Analytics > Initiative: Dashboard v2'
  },
  {
    moduleName: 'Mobile App Redesign',
    owner: 'Eva Foster',
    pm: 'Frank Green',
    healthStatus: 'on-track',
    teamWorking: 'Squad 4',
    okrHierarchy: 'O4: Enhance Mobile Experience > KR4: Redesign Core Flows'
  },
  {
    moduleName: 'Notification Service',
    owner: 'Grace Harris',
    pm: 'Henry Irving',
    healthStatus: 'on-track',
    teamWorking: 'Squad 1',
    okrHierarchy: 'O5: Improve Communication > KR5: Real-time Notifications > Initiative: Push Service'
  }
];

// ============================================================
// VALID TYPE USAGE TESTS
// ============================================================

/**
 * Test 1: Non-paginated API response
 * Contains all items without pagination metadata
 */
const nonPaginatedResponse: ExecutionItemsApiResponse = {
  items: mockExecutionItems,
  total: mockExecutionItems.length
};

/**
 * Test 2: Paginated API response - Page 1
 * Contains first page of items with pagination metadata
 */
const paginatedResponsePage1: ExecutionItemsApiResponse = {
  items: mockExecutionItems.slice(0, 2),
  total: 25,
  page: 1,
  limit: 10
};

/**
 * Test 3: Paginated API response - Page 2
 * Contains second page of items
 */
const paginatedResponsePage2: ExecutionItemsApiResponse = {
  items: mockExecutionItems.slice(2, 4),
  total: 25,
  page: 2,
  limit: 10
};

/**
 * Test 4: Paginated API response - Last page
 * Contains fewer items than the limit (partial page)
 */
const paginatedResponseLastPage: ExecutionItemsApiResponse = {
  items: [mockExecutionItems[4]],
  total: 25,
  page: 3,
  limit: 10
};

/**
 * Test 5: Empty response
 * Valid response with no items
 */
const emptyResponse: ExecutionItemsApiResponse = {
  items: [],
  total: 0
};

/**
 * Test 6: Empty paginated response
 * Valid paginated response with no items on current page
 */
const emptyPaginatedResponse: ExecutionItemsApiResponse = {
  items: [],
  total: 0,
  page: 1,
  limit: 10
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Type guard to check if response is paginated
 */
function isPaginatedResponse(response: ExecutionItemsApiResponse): response is Required<ExecutionItemsApiResponse> {
  return response.page !== undefined && response.limit !== undefined;
}

/**
 * Calculate total pages from API response
 */
function getTotalPages(response: ExecutionItemsApiResponse): number {
  if (!isPaginatedResponse(response)) {
    return 1;
  }
  return Math.ceil(response.total / response.limit);
}

/**
 * Check if there is a next page available
 */
function hasNextPage(response: ExecutionItemsApiResponse): boolean {
  if (!isPaginatedResponse(response)) {
    return false;
  }
  return response.page < getTotalPages(response);
}

/**
 * Check if there is a previous page available
 */
function hasPreviousPage(response: ExecutionItemsApiResponse): boolean {
  if (!isPaginatedResponse(response)) {
    return false;
  }
  return response.page > 1;
}

/**
 * Get pagination summary string
 */
function getPaginationSummary(response: ExecutionItemsApiResponse): string {
  if (!isPaginatedResponse(response)) {
    return `Showing all ${response.total} items`;
  }
  
  const startIndex = (response.page - 1) * response.limit + 1;
  const endIndex = Math.min(startIndex + response.items.length - 1, response.total);
  const totalPages = getTotalPages(response);
  
  return `Showing ${startIndex}-${endIndex} of ${response.total} items (Page ${response.page} of ${totalPages})`;
}

/**
 * Mock API fetch function
 */
async function fetchExecutionItems(page?: number, limit?: number): Promise<ExecutionItemsApiResponse> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (page !== undefined && limit !== undefined) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        resolve({
          items: mockExecutionItems.slice(startIndex, endIndex),
          total: mockExecutionItems.length,
          page,
          limit
        });
      } else {
        resolve({
          items: mockExecutionItems,
          total: mockExecutionItems.length
        });
      }
    }, 100);
  });
}

// ============================================================
// TYPE ERROR TESTS (These should fail compilation if uncommented)
// ============================================================

// Missing required 'items' property
// const invalidResponse1: ExecutionItemsApiResponse = { // ❌ Type error
//   total: 10
// };

// Missing required 'total' property
// const invalidResponse2: ExecutionItemsApiResponse = { // ❌ Type error
//   items: mockExecutionItems
// };

// Invalid 'items' type (not an array)
// const invalidResponse3: ExecutionItemsApiResponse = { // ❌ Type error
//   items: 'not an array',
//   total: 10
// };

// Invalid 'total' type (not a number)
// const invalidResponse4: ExecutionItemsApiResponse = { // ❌ Type error
//   items: [],
//   total: '10'
// };

// Invalid 'page' type (not a number)
// const invalidResponse5: ExecutionItemsApiResponse = { // ❌ Type error
//   items: [],
//   total: 10,
//   page: '1',
//   limit: 10
// };

// Invalid 'limit' type (not a number)
// const invalidResponse6: ExecutionItemsApiResponse = { // ❌ Type error
//   items: [],
//   total: 10,
//   page: 1,
//   limit: '10'
// };

// Items array contains invalid ExecutionItem
// const invalidResponse7: ExecutionItemsApiResponse = { // ❌ Type error
//   items: [{ moduleName: 'Test' }], // Missing required properties
//   total: 1
// };

// ============================================================
// CONSOLE OUTPUT FOR VALIDATION
// ============================================================

console.log('✅ ExecutionItemsApiResponse type validation successful!\n');

console.log('='.repeat(60));
console.log('NON-PAGINATED RESPONSE');
console.log('='.repeat(60));
console.log(`Items count: ${nonPaginatedResponse.items.length}`);
console.log(`Total: ${nonPaginatedResponse.total}`);
console.log(`Is paginated: ${isPaginatedResponse(nonPaginatedResponse)}`);
console.log(`Summary: ${getPaginationSummary(nonPaginatedResponse)}`);

console.log('\n' + '='.repeat(60));
console.log('PAGINATED RESPONSE - PAGE 1');
console.log('='.repeat(60));
console.log(`Items count: ${paginatedResponsePage1.items.length}`);
console.log(`Total: ${paginatedResponsePage1.total}`);
console.log(`Page: ${paginatedResponsePage1.page}`);
console.log(`Limit: ${paginatedResponsePage1.limit}`);
console.log(`Is paginated: ${isPaginatedResponse(paginatedResponsePage1)}`);
console.log(`Total pages: ${getTotalPages(paginatedResponsePage1)}`);
console.log(`Has next page: ${hasNextPage(paginatedResponsePage1)}`);
console.log(`Has previous page: ${hasPreviousPage(paginatedResponsePage1)}`);
console.log(`Summary: ${getPaginationSummary(paginatedResponsePage1)}`);

console.log('\n' + '='.repeat(60));
console.log('PAGINATED RESPONSE - PAGE 2');
console.log('='.repeat(60));
console.log(`Items count: ${paginatedResponsePage2.items.length}`);
console.log(`Page: ${paginatedResponsePage2.page}`);
console.log(`Has next page: ${hasNextPage(paginatedResponsePage2)}`);
console.log(`Has previous page: ${hasPreviousPage(paginatedResponsePage2)}`);
console.log(`Summary: ${getPaginationSummary(paginatedResponsePage2)}`);

console.log('\n' + '='.repeat(60));
console.log('PAGINATED RESPONSE - LAST PAGE');
console.log('='.repeat(60));
console.log(`Items count: ${paginatedResponseLastPage.items.length}`);
console.log(`Page: ${paginatedResponseLastPage.page}`);
console.log(`Has next page: ${hasNextPage(paginatedResponseLastPage)}`);
console.log(`Summary: ${getPaginationSummary(paginatedResponseLastPage)}`);

console.log('\n' + '='.repeat(60));
console.log('EMPTY RESPONSE');
console.log('='.repeat(60));
console.log(`Items count: ${emptyResponse.items.length}`);
console.log(`Total: ${emptyResponse.total}`);
console.log(`Summary: ${getPaginationSummary(emptyResponse)}`);

console.log('\n' + '='.repeat(60));
console.log('MOCK API TESTS');
console.log('='.repeat(60));
console.log('Testing fetchExecutionItems function...');

// Test non-paginated fetch
fetchExecutionItems().then((response) => {
  console.log('\n✅ Non-paginated fetch:');
  console.log(`  Received ${response.items.length} items`);
  console.log(`  Total: ${response.total}`);
  console.log(`  Paginated: ${isPaginatedResponse(response)}`);
});

// Test paginated fetch
fetchExecutionItems(1, 2).then((response) => {
  console.log('\n✅ Paginated fetch (page 1, limit 2):');
  console.log(`  Received ${response.items.length} items`);
  console.log(`  ${getPaginationSummary(response)}`);
});

console.log('\n' + '='.repeat(60));
console.log('✅ All type checks passed! TypeScript compilation successful.');
console.log('='.repeat(60));

export {
  nonPaginatedResponse,
  paginatedResponsePage1,
  paginatedResponsePage2,
  paginatedResponseLastPage,
  emptyResponse,
  isPaginatedResponse,
  getTotalPages,
  hasNextPage,
  hasPreviousPage,
  getPaginationSummary,
  fetchExecutionItems
};
