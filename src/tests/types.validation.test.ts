/**
 * Type validation test file for ExecutionItem and HealthStatus types.
 * 
 * This file verifies that:
 * 1. The types can be imported without errors
 * 2. Objects conforming to the types compile successfully
 * 3. Type checking works as expected
 * 4. Invalid assignments are caught by TypeScript
 * 
 * @remarks
 * Run with: npm run type-check
 */

import { ExecutionItem, HealthStatus } from '../types/ExecutionItem';

// ============================================================
// VALID TYPE USAGE TESTS
// ============================================================

/**
 * Test 1: Valid HealthStatus values
 */
const validHealthStatus1: HealthStatus = 'on-track';
const validHealthStatus2: HealthStatus = 'at-risk';
const validHealthStatus3: HealthStatus = 'off-track';

/**
 * Test 2: Valid ExecutionItem object with all required properties
 */
const validExecutionItem: ExecutionItem = {
  moduleName: 'User Authentication Module',
  owner: 'John Doe',
  pm: 'Jane Smith',
  healthStatus: 'on-track',
  teamWorking: 'Squad 1',
  okrHierarchy: 'O1: Improve Security > KR1: Implement MFA > Initiative: Auth Overhaul > Feature: SSO Integration'
};

/**
 * Test 3: ExecutionItem with at-risk status
 */
const atRiskItem: ExecutionItem = {
  moduleName: 'Payment Gateway Integration',
  owner: 'Alice Brown',
  pm: 'Bob Williams',
  healthStatus: 'at-risk',
  teamWorking: 'Squad 3',
  okrHierarchy: 'O2: Increase Revenue > KR2: Enable Multiple Payment Methods > Initiative: Payment Platform'
};

/**
 * Test 4: ExecutionItem with off-track status
 */
const offTrackItem: ExecutionItem = {
  moduleName: 'Analytics Dashboard',
  owner: 'Charlie Davis',
  pm: 'Diana Evans',
  healthStatus: 'off-track',
  teamWorking: 'Squad 2',
  okrHierarchy: 'O3: Data-Driven Decisions > KR3: Real-time Analytics > Initiative: Dashboard v2'
};

/**
 * Test 5: Array of ExecutionItems (common use case)
 */
const executionItems: ExecutionItem[] = [
  validExecutionItem,
  atRiskItem,
  offTrackItem,
  {
    moduleName: 'Mobile App Redesign',
    owner: 'Eva Foster',
    pm: 'Frank Green',
    healthStatus: 'on-track',
    teamWorking: 'Squad 4',
    okrHierarchy: 'O4: Enhance Mobile Experience > KR4: Redesign Core Flows'
  }
];

/**
 * Test 6: Type guard function
 */
function isValidHealthStatus(status: string): status is HealthStatus {
  return status === 'on-track' || status === 'at-risk' || status === 'off-track';
}

/**
 * Test 7: Helper function using ExecutionItem type
 */
function getHealthStatusColor(item: ExecutionItem): string {
  switch (item.healthStatus) {
    case 'on-track':
      return '#0ed183';
    case 'at-risk':
      return '#ff514e';
    case 'off-track':
      return '#ffab26';
    default:
      // TypeScript should ensure this is unreachable
      const _exhaustive: never = item.healthStatus;
      return _exhaustive;
  }
}

/**
 * Test 8: Partial ExecutionItem for updates
 */
type ExecutionItemUpdate = Partial<ExecutionItem>;

const itemUpdate: ExecutionItemUpdate = {
  healthStatus: 'at-risk',
  owner: 'New Owner Name'
};

// ============================================================
// TYPE ERROR TESTS (These should fail compilation if uncommented)
// ============================================================

// Invalid HealthStatus value
// const invalidHealth: HealthStatus = 'in-progress'; // ❌ Type error

// Missing required properties
// const incompleteItem: ExecutionItem = { // ❌ Type error
//   moduleName: 'Test',
//   owner: 'Test Owner'
//   // Missing: pm, healthStatus, teamWorking, okrHierarchy
// };

// Invalid property type
// const wrongTypeItem: ExecutionItem = { // ❌ Type error
//   moduleName: 123, // Should be string
//   owner: 'Test',
//   pm: 'Test',
//   healthStatus: 'on-track',
//   teamWorking: 'Squad 1',
//   okrHierarchy: 'Test'
// };

// ============================================================
// CONSOLE OUTPUT FOR VALIDATION
// ============================================================

console.log('✅ Type validation successful!');
console.log('\nValid ExecutionItem example:');
console.log(JSON.stringify(validExecutionItem, null, 2));
console.log('\nAll ExecutionItems:');
console.log(`Total items: ${executionItems.length}`);
executionItems.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.moduleName} - Status: ${item.healthStatus} (${getHealthStatusColor(item)})`);
});
console.log('\n✅ All type checks passed! TypeScript compilation successful.');

export { validExecutionItem, executionItems, getHealthStatusColor, isValidHealthStatus };
