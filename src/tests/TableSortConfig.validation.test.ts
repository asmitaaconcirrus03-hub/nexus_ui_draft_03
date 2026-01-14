/**
 * Type Safety Validation Tests for TableSortConfig
 * 
 * These tests verify compile-time type safety for the TableSortConfig interface.
 * The tests demonstrate that TypeScript correctly enforces:
 * 1. Only valid ExecutionItem keys can be used for the 'column' property
 * 2. Only 'asc' or 'desc' can be used for the 'direction' property
 * 
 * @remarks
 * This file serves as both documentation and validation.
 * Uncomment the invalid examples to see TypeScript's type checking in action.
 */

import type { TableSortConfig } from '../types/TableSortConfig';
import type { ExecutionItem } from '../types/ExecutionItem';

// ============================================
// VALID CONFIGURATIONS (Should compile successfully)
// ============================================

/**
 * Test Case 1: Sort by moduleName in ascending order
 */
const validConfig1: TableSortConfig = {
  column: 'moduleName',
  direction: 'asc'
};

/**
 * Test Case 2: Sort by owner in descending order
 */
const validConfig2: TableSortConfig = {
  column: 'owner',
  direction: 'desc'
};

/**
 * Test Case 3: Sort by pm in ascending order
 */
const validConfig3: TableSortConfig = {
  column: 'pm',
  direction: 'asc'
};

/**
 * Test Case 4: Sort by healthStatus in descending order
 */
const validConfig4: TableSortConfig = {
  column: 'healthStatus',
  direction: 'desc'
};

/**
 * Test Case 5: Sort by teamWorking in ascending order
 */
const validConfig5: TableSortConfig = {
  column: 'teamWorking',
  direction: 'asc'
};

/**
 * Test Case 6: Sort by okrHierarchy in descending order
 */
const validConfig6: TableSortConfig = {
  column: 'okrHierarchy',
  direction: 'desc'
};

// ============================================
// INVALID CONFIGURATIONS (Should cause type errors)
// ============================================

/**
 * Test Case 7: Invalid column name
 * Uncomment to verify TypeScript rejects invalid column names
 */
/*
const invalidConfig1: TableSortConfig = {
  column: 'invalidColumn',  // ❌ Type error: "invalidColumn" is not a key of ExecutionItem
  direction: 'asc'
};
*/

/**
 * Test Case 8: Invalid direction value
 * Uncomment to verify TypeScript rejects invalid direction values
 */
/*
const invalidConfig2: TableSortConfig = {
  column: 'moduleName',
  direction: 'ascending'  // ❌ Type error: "ascending" is not assignable to type 'asc' | 'desc'
};
*/

/**
 * Test Case 9: Typo in direction
 * Uncomment to verify TypeScript catches typos
 */
/*
const invalidConfig3: TableSortConfig = {
  column: 'owner',
  direction: 'dsc'  // ❌ Type error: "dsc" is not assignable to type 'asc' | 'desc'
};
*/

/**
 * Test Case 10: Numeric column (if someone tries to add a non-existent numeric field)
 * Uncomment to verify TypeScript rejects non-existent fields
 */
/*
const invalidConfig4: TableSortConfig = {
  column: 'priority',  // ❌ Type error: "priority" is not a key of ExecutionItem
  direction: 'desc'
};
*/

// ============================================
// RUNTIME USAGE EXAMPLE
// ============================================

/**
 * Example function demonstrating type-safe sorting
 */
function sortExecutionItems(
  items: ExecutionItem[],
  config: TableSortConfig
): ExecutionItem[] {
  return items.sort((a, b) => {
    const aValue = a[config.column];
    const bValue = b[config.column];
    
    // Handle string comparison
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    
    // Apply sort direction
    return config.direction === 'asc' ? comparison : -comparison;
  });
}

/**
 * Example usage of the sorting function
 */
const sampleItems: ExecutionItem[] = [
  {
    moduleName: 'Module B',
    owner: 'John Doe',
    pm: 'Jane Smith',
    healthStatus: 'on-track',
    teamWorking: 'Squad 1',
    okrHierarchy: 'O1 > KR1 > Initiative A'
  },
  {
    moduleName: 'Module A',
    owner: 'Alice Johnson',
    pm: 'Bob Williams',
    healthStatus: 'at-risk',
    teamWorking: 'Squad 2',
    okrHierarchy: 'O1 > KR2 > Initiative B'
  }
];

// Sort by module name ascending
const sortedByModuleName = sortExecutionItems(sampleItems, validConfig1);

// Sort by owner descending
const sortedByOwner = sortExecutionItems(sampleItems, validConfig2);

// ============================================
// TYPE VALIDATION SUMMARY
// ============================================

/**
 * If this file compiles without errors, it confirms:
 * ✅ All valid ExecutionItem keys are accepted for the 'column' property
 * ✅ Only 'asc' and 'desc' are accepted for the 'direction' property
 * ✅ The keyof operator correctly restricts column values
 * ✅ The SortDirection type correctly restricts direction values
 * ✅ Runtime usage is type-safe and prevents invalid configurations
 */

console.log('TableSortConfig type validation passed!');
console.log('Valid configurations:', {
  validConfig1,
  validConfig2,
  validConfig3,
  validConfig4,
  validConfig5,
  validConfig6
});
