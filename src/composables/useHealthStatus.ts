import { HealthStatus, ExecutionItem } from '../types/ExecutionItem';

/**
 * Health status configuration for UI rendering.
 * Maps health status values to their visual representation properties.
 * 
 * @remarks
 * These values are derived from the Figma design specification:
 * https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 * 
 * Color values match the design system:
 * - on-track: Green (#0ed183) with light background (#eefbf2)
 * - at-risk: Red (#ff514e) with light background (#ffefed)
 * - off-track: Orange (#ffab26) with light background (#fff7ed)
 */
export interface HealthStatusConfig {
  /** Display label for the status */
  label: string;
  /** Primary color (text/border) */
  color: string;
  /** Background color for badge */
  backgroundColor: string;
  /** Semantic severity level */
  severity: 'success' | 'warning' | 'error';
}

/**
 * Health status configuration map.
 * Provides styling and metadata for each health status value.
 */
export const HEALTH_STATUS_CONFIG: Record<HealthStatus, HealthStatusConfig> = {
  'on-track': {
    label: 'On Track',
    color: '#0ed183',
    backgroundColor: '#eefbf2',
    severity: 'success'
  },
  'at-risk': {
    label: 'At Risk',
    color: '#ff514e',
    backgroundColor: '#ffefed',
    severity: 'error'
  },
  'off-track': {
    label: 'Off Track',
    color: '#ffab26',
    backgroundColor: '#fff7ed',
    severity: 'warning'
  }
};

/**
 * Composable for health status classification and utilities.
 * Provides functions for validating, classifying, and styling health status badges.
 * 
 * @remarks
 * This composable supports the Execution Roadmap feature by providing:
 * - Health status validation
 * - Status classification from execution items
 * - UI configuration for status badges
 * - Type-safe health status operations
 * 
 * @example
 * ```typescript
 * import { useHealthStatus } from './composables/useHealthStatus';
 * 
 * const { classifyStatus, getStatusConfig, isValidStatus } = useHealthStatus();
 * 
 * // Classify an execution item
 * const item: ExecutionItem = { ...data };
 * const status = classifyStatus(item);
 * 
 * // Get styling configuration
 * const config = getStatusConfig(status);
 * console.log(config.color); // '#0ed183'
 * 
 * // Validate status
 * if (isValidStatus('on-track')) {
 *   // Status is valid
 * }
 * ```
 * 
 * @returns Object containing health status utility functions
 */
export function useHealthStatus() {
  /**
   * Classifies the health status of an execution item.
   * 
   * @remarks
   * Currently returns the existing healthStatus from the item.
   * This function exists as an extension point for future business logic
   * that may compute or override health status based on:
   * - Progress metrics
   * - Deadline proximity
   * - Blocker count
   * - Team velocity
   * - Custom business rules
   * 
   * @param item - The execution item to classify
   * @returns The health status of the item
   * 
   * @example
   * ```typescript
   * const item: ExecutionItem = {
   *   moduleName: 'Auth Module',
   *   healthStatus: 'on-track',
   *   // ... other fields
   * };
   * 
   * const status = classifyStatus(item);
   * console.log(status); // 'on-track'
   * ```
   */
  const classifyStatus = (item: ExecutionItem): HealthStatus => {
    // Current implementation: pass through existing status
    // Future: Add business logic for dynamic status computation
    return item.healthStatus;
  };

  /**
   * Retrieves the configuration for a given health status.
   * 
   * @param status - The health status to get configuration for
   * @returns Configuration object with styling and metadata
   * 
   * @example
   * ```typescript
   * const config = getStatusConfig('at-risk');
   * console.log(config);
   * // {
   * //   label: 'At Risk',
   * //   color: '#ff514e',
   * //   backgroundColor: '#ffefed',
   * //   severity: 'error'
   * // }
   * ```
   */
  const getStatusConfig = (status: HealthStatus): HealthStatusConfig => {
    return HEALTH_STATUS_CONFIG[status];
  };

  /**
   * Validates if a string is a valid HealthStatus value.
   * 
   * @param value - The value to validate
   * @returns True if the value is a valid health status
   * 
   * @example
   * ```typescript
   * isValidStatus('on-track');  // true
   * isValidStatus('invalid');   // false
   * isValidStatus('At Risk');   // false (case-sensitive)
   * ```
   */
  const isValidStatus = (value: string): value is HealthStatus => {
    return ['on-track', 'at-risk', 'off-track'].includes(value);
  };

  /**
   * Gets all available health status values.
   * 
   * @returns Array of all valid health status values
   * 
   * @example
   * ```typescript
   * const statuses = getAllStatuses();
   * console.log(statuses); // ['on-track', 'at-risk', 'off-track']
   * ```
   */
  const getAllStatuses = (): HealthStatus[] => {
    return ['on-track', 'at-risk', 'off-track'];
  };

  return {
    classifyStatus,
    getStatusConfig,
    isValidStatus,
    getAllStatuses,
    HEALTH_STATUS_CONFIG
  };
}
