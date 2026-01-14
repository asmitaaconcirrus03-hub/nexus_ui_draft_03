/**
 * Health status of an execution item in the roadmap.
 * Represents the current state of progress for tasks, features, or initiatives.
 * 
 * @remarks
 * These values correspond to the visual badges displayed in the Execution Roadmap table:
 * - 'on-track': Green badge indicating healthy progress (hex: #0ed183, bg: #eefbf2)
 * - 'at-risk': Red badge indicating potential delays or issues (hex: #ff514e, bg: #ffefed)
 * - 'off-track': Orange badge indicating significant blockers (hex: #ffab26, bg: #fff7ed)
 * 
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export type HealthStatus = 'on-track' | 'at-risk' | 'off-track';

/**
 * Represents an execution item in the product roadmap.
 * Each item tracks a module, feature, or initiative with associated ownership and health metrics.
 * 
 * @remarks
 * This interface maps to the "Execution Items" table in the Figma design, where each row
 * represents a discrete work item with progress tracking, team assignments, and hierarchical context.
 * 
 * @example
 * ```typescript
 * const executionItem: ExecutionItem = {
 *   moduleName: 'User Authentication Module',
 *   owner: 'John Doe',
 *   pm: 'Jane Smith',
 *   healthStatus: 'on-track',
 *   teamWorking: 'Squad 1',
 *   okrHierarchy: 'O1 > KR1 > Initiative A > Feature X'
 * };
 * ```
 * 
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface ExecutionItem {
  /**
   * The name of the module, feature, or sub-feature being tracked.
   * This is the primary identifier displayed in the leftmost column of the Execution Items table.
   * 
   * @example "Module Name 1", "User Dashboard", "Payment Gateway Integration"
   */
  moduleName: string;

  /**
   * The name of the person or team responsible for delivering this execution item.
   * Corresponds to the "Owner" column in the Execution Items table.
   * 
   * @example "Owner Name", "Alice Johnson", "Backend Team Lead"
   */
  owner: string;

  /**
   * The name of the Product Manager overseeing this execution item.
   * Corresponds to the "PM" column in the Execution Items table.
   * 
   * @example "PM Name", "Bob Williams", "Senior PM - Platform"
   */
  pm: string;

  /**
   * Current health status of the execution item.
   * Determines the color-coded badge displayed in the "Healths" column.
   * 
   * @see {@link HealthStatus} for available values and visual representations
   */
  healthStatus: HealthStatus;

  /**
   * The team or squad currently working on this execution item.
   * Corresponds to the "Team Working" column in the Execution Items table.
   * 
   * @example "Squad 1", "Squad 2", "Platform Team", "Mobile Squad"
   */
  teamWorking: string;

  /**
   * The hierarchical path of this item within the OKR (Objectives and Key Results) framework.
   * Represents the full context from Objective → Key Result → Initiative → Feature → Sub-Feature.
   * 
   * @remarks
   * This property maps to the first column label:
   * "Objective, Key results, Initiatives, Features, Sub Feature"
   * 
   * The format can be a simple string path or a structured representation depending on usage:
   * - Simple path: "O1 > KR1 > Initiative A > Feature X"
   * - Structured: Could be expanded to an object if hierarchical navigation is needed
   * 
   * @example 
   * "Increase User Engagement > Improve Onboarding Flow > Redesign Welcome Screens > Mobile UI > Loading Animation"
   */
  okrHierarchy: string;
}
