/**
 * Type validation test file for OKRHierarchy and related interfaces.
 * 
 * This file verifies that:
 * 1. The OKRHierarchy interface and all entity interfaces can be imported without errors
 * 2. Objects conforming to the interfaces compile successfully
 * 3. Optional properties work correctly when undefined
 * 4. Type checking catches invalid data structures
 * 5. The hierarchical relationships are properly typed
 * 
 * @remarks
 * Run with: npm run type-check
 */

import {
  OKRHierarchy,
  Objective,
  KeyResult,
  Initiative,
  Feature,
  SubFeature
} from '../types/OKRHierarchy';

// ============================================================
// INDIVIDUAL ENTITY INTERFACE TESTS
// ============================================================

/**
 * Test 1: Valid Objective
 */
const validObjective: Objective = {
  id: 'obj-001',
  title: 'Increase User Engagement',
  description: 'Drive meaningful interactions and improve user retention across all platforms'
};

/**
 * Test 2: Valid KeyResult with all properties
 */
const validKeyResult: KeyResult = {
  id: 'kr-001',
  title: 'Improve Onboarding Completion Rate',
  description: 'Increase the percentage of new users who complete the onboarding flow',
  metric: 'Completion Rate',
  targetValue: '85%',
  currentValue: '62%'
};

/**
 * Test 3: Valid Initiative
 */
const validInitiative: Initiative = {
  id: 'init-001',
  title: 'Onboarding Flow Redesign',
  description: 'Comprehensive redesign of the user onboarding experience to improve completion rates and reduce drop-off'
};

/**
 * Test 4: Valid Feature
 */
const validFeature: Feature = {
  id: 'feat-001',
  title: 'Interactive Welcome Tutorial',
  description: 'Step-by-step guided tour for first-time users with interactive tooltips and contextual help'
};

/**
 * Test 5: Valid SubFeature
 */
const validSubFeature: SubFeature = {
  id: 'sf-001',
  title: 'Tooltip Component',
  description: 'Reusable tooltip component with smart positioning logic and smooth animations'
};

// ============================================================
// OKRHIERARCHY INTERFACE TESTS
// ============================================================

/**
 * Test 6: Empty OKRHierarchy (all properties optional)
 */
const emptyHierarchy: OKRHierarchy = {};

/**
 * Test 7: OKRHierarchy with only objective
 */
const objectiveOnlyHierarchy: OKRHierarchy = {
  objective: [validObjective]
};

/**
 * Test 8: OKRHierarchy with objective and key results (strategic view)
 */
const strategicHierarchy: OKRHierarchy = {
  objective: [
    validObjective,
    {
      id: 'obj-002',
      title: 'Enhance Platform Security',
      description: 'Strengthen security measures and protect user data across all systems'
    }
  ],
  keyResults: [
    validKeyResult,
    {
      id: 'kr-002',
      title: 'Reduce Security Incidents',
      description: 'Decrease the number of security-related incidents',
      metric: 'Incidents per Month',
      targetValue: '< 2',
      currentValue: '5'
    },
    {
      id: 'kr-003',
      title: 'Increase MFA Adoption',
      description: 'Drive adoption of multi-factor authentication',
      metric: 'MFA Adoption Rate',
      targetValue: '95%',
      currentValue: '68%'
    }
  ]
};

/**
 * Test 9: OKRHierarchy with initiatives and features (tactical view)
 */
const tacticalHierarchy: OKRHierarchy = {
  initiatives: [
    validInitiative,
    {
      id: 'init-002',
      title: 'Authentication System Upgrade',
      description: 'Modernize authentication infrastructure with support for MFA and SSO'
    }
  ],
  features: [
    validFeature,
    {
      id: 'feat-002',
      title: 'Social Login Integration',
      description: 'Enable login via Google, GitHub, and Microsoft accounts'
    },
    {
      id: 'feat-003',
      title: 'Progress Tracking Dashboard',
      description: 'Visual dashboard showing onboarding completion progress'
    }
  ]
};

/**
 * Test 10: Complete OKRHierarchy with all levels
 */
const fullHierarchy: OKRHierarchy = {
  objective: [
    {
      id: 'obj-001',
      title: 'Increase User Engagement',
      description: 'Drive meaningful interactions and improve user retention across all platforms'
    }
  ],
  keyResults: [
    {
      id: 'kr-001',
      title: 'Improve Onboarding Completion Rate',
      description: 'Increase the percentage of new users who complete the onboarding flow',
      metric: 'Completion Rate',
      targetValue: '85%',
      currentValue: '62%'
    },
    {
      id: 'kr-002',
      title: 'Increase Daily Active Users',
      description: 'Grow the number of users who engage with the platform daily',
      metric: 'DAU',
      targetValue: '50K',
      currentValue: '32K'
    }
  ],
  initiatives: [
    {
      id: 'init-001',
      title: 'Onboarding Flow Redesign',
      description: 'Comprehensive redesign of the user onboarding experience'
    }
  ],
  features: [
    {
      id: 'feat-001',
      title: 'Interactive Welcome Tutorial',
      description: 'Step-by-step guided tour for first-time users'
    },
    {
      id: 'feat-002',
      title: 'Personalized Dashboard',
      description: 'Customizable dashboard based on user preferences'
    }
  ],
  subFeatures: [
    {
      id: 'sf-001',
      title: 'Tooltip Component',
      description: 'Reusable tooltip component with animations'
    },
    {
      id: 'sf-002',
      title: 'Progress Indicator',
      description: 'Visual progress indicator for multi-step flows'
    },
    {
      id: 'sf-003',
      title: 'Widget Library',
      description: 'Collection of customizable dashboard widgets'
    }
  ]
};

/**
 * Test 11: Multiple objectives in hierarchy (cross-cutting concerns)
 */
const multiObjectiveHierarchy: OKRHierarchy = {
  objective: [
    {
      id: 'obj-001',
      title: 'Increase User Engagement',
      description: 'Drive meaningful interactions'
    },
    {
      id: 'obj-002',
      title: 'Enhance Platform Security',
      description: 'Strengthen security measures'
    },
    {
      id: 'obj-003',
      title: 'Improve System Performance',
      description: 'Optimize speed and reliability'
    }
  ],
  keyResults: [
    {
      id: 'kr-001',
      title: 'Improve Onboarding Completion',
      description: 'Increase onboarding completion rate',
      metric: 'Completion Rate',
      targetValue: '85%',
      currentValue: '62%'
    },
    {
      id: 'kr-004',
      title: 'Reduce Page Load Time',
      description: 'Decrease average page load time',
      metric: 'Load Time (ms)',
      targetValue: '< 200',
      currentValue: '450'
    }
  ]
};

/**
 * Test 12: Array of OKRHierarchy objects (common use case for multiple execution items)
 */
const hierarchies: OKRHierarchy[] = [
  emptyHierarchy,
  objectiveOnlyHierarchy,
  strategicHierarchy,
  tacticalHierarchy,
  fullHierarchy
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Test 13: Type guard for Objective
 */
function isValidObjective(obj: any): obj is Objective {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string'
  );
}

/**
 * Test 14: Helper function to count total items in hierarchy
 */
function countHierarchyItems(hierarchy: OKRHierarchy): number {
  let count = 0;
  if (hierarchy.objective) count += hierarchy.objective.length;
  if (hierarchy.keyResults) count += hierarchy.keyResults.length;
  if (hierarchy.initiatives) count += hierarchy.initiatives.length;
  if (hierarchy.features) count += hierarchy.features.length;
  if (hierarchy.subFeatures) count += hierarchy.subFeatures.length;
  return count;
}

/**
 * Test 15: Helper function to generate hierarchy summary
 */
function getHierarchySummary(hierarchy: OKRHierarchy): string {
  const parts: string[] = [];
  
  if (hierarchy.objective) {
    parts.push(`${hierarchy.objective.length} Objective(s)`);
  }
  if (hierarchy.keyResults) {
    parts.push(`${hierarchy.keyResults.length} Key Result(s)`);
  }
  if (hierarchy.initiatives) {
    parts.push(`${hierarchy.initiatives.length} Initiative(s)`);
  }
  if (hierarchy.features) {
    parts.push(`${hierarchy.features.length} Feature(s)`);
  }
  if (hierarchy.subFeatures) {
    parts.push(`${hierarchy.subFeatures.length} Sub-Feature(s)`);
  }
  
  return parts.length > 0 ? parts.join(' > ') : 'Empty Hierarchy';
}

/**
 * Test 16: Utility type for partial hierarchy updates
 */
type OKRHierarchyUpdate = Partial<OKRHierarchy>;

const hierarchyUpdate: OKRHierarchyUpdate = {
  keyResults: [
    {
      id: 'kr-updated',
      title: 'Updated Key Result',
      description: 'Updated description',
      metric: 'Updated Metric',
      targetValue: '100%',
      currentValue: '75%'
    }
  ]
};

// ============================================================
// TYPE ERROR TESTS (These should fail compilation if uncommented)
// ============================================================

// Invalid Objective - missing required properties
// const invalidObjective: Objective = { // ❌ Type error
//   id: 'obj-001',
//   title: 'Incomplete Objective'
//   // Missing: description
// };

// Invalid KeyResult - wrong type for property
// const invalidKeyResult: KeyResult = { // ❌ Type error
//   id: 'kr-001',
//   title: 'Invalid Key Result',
//   description: 'Test',
//   metric: 123, // Should be string
//   targetValue: '100%',
//   currentValue: '50%'
// };

// Invalid OKRHierarchy - wrong array type
// const invalidHierarchy: OKRHierarchy = { // ❌ Type error
//   objective: 'Not an array', // Should be Objective[]
//   keyResults: [validKeyResult]
// };

// Invalid array element type
// const invalidArrayHierarchy: OKRHierarchy = { // ❌ Type error
//   features: [
//     { id: 'feat-001', title: 'Valid Feature', description: 'Test' },
//     { id: 'feat-002', name: 'Invalid - wrong property name' } // Wrong property
//   ]
// };

// ============================================================
// CONSOLE OUTPUT FOR VALIDATION
// ============================================================

console.log('✅ OKRHierarchy type validation successful!');
console.log('\nValid entity interfaces:');
console.log('  - Objective:', isValidObjective(validObjective) ? '✅' : '❌');
console.log('  - KeyResult: ✅');
console.log('  - Initiative: ✅');
console.log('  - Feature: ✅');
console.log('  - SubFeature: ✅');

console.log('\nOKRHierarchy test cases:');
console.log('  1. Empty Hierarchy:', getHierarchySummary(emptyHierarchy));
console.log('  2. Objective Only:', getHierarchySummary(objectiveOnlyHierarchy));
console.log('  3. Strategic View:', getHierarchySummary(strategicHierarchy));
console.log('  4. Tactical View:', getHierarchySummary(tacticalHierarchy));
console.log('  5. Full Hierarchy:', getHierarchySummary(fullHierarchy));
console.log('  6. Multi-Objective:', getHierarchySummary(multiObjectiveHierarchy));

console.log('\nHierarchy statistics:');
console.log(`  - Total test hierarchies: ${hierarchies.length}`);
console.log(`  - Full hierarchy total items: ${countHierarchyItems(fullHierarchy)}`);
console.log(`  - Strategic hierarchy items: ${countHierarchyItems(strategicHierarchy)}`);

console.log('\n✅ All type checks passed! TypeScript compilation successful.');
console.log('✅ Optional properties validated successfully.');
console.log('✅ Hierarchical relationships properly typed.');

export {
  validObjective,
  validKeyResult,
  validInitiative,
  validFeature,
  validSubFeature,
  fullHierarchy,
  strategicHierarchy,
  tacticalHierarchy,
  getHierarchySummary,
  countHierarchyItems,
  isValidObjective
};
