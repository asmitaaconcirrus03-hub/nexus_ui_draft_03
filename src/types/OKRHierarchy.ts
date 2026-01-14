/**
 * Represents a high-level Objective in the OKR (Objectives and Key Results) framework.
 * Objectives are qualitative, aspirational goals that provide strategic direction.
 * 
 * @remarks
 * Objectives sit at the top of the OKR hierarchy and answer the question "What do we want to achieve?"
 * They should be inspirational, time-bound, and aligned with organizational strategy.
 * 
 * @example
 * ```typescript
 * const objective: Objective = {
 *   id: 'obj-001',
 *   title: 'Increase User Engagement',
 *   description: 'Drive meaningful interactions and improve user retention across all platforms'
 * };
 * ```
 * 
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface Objective {
  /**
   * Unique identifier for the objective.
   * @example "obj-001", "O1", "2024-Q1-OBJ-001"
   */
  id: string;

  /**
   * The title or name of the objective.
   * Should be concise and inspirational.
   * @example "Increase User Engagement", "Enhance Platform Security"
   */
  title: string;

  /**
   * Detailed description of the objective.
   * Explains the strategic intent and context.
   * @example "Drive meaningful interactions and improve user retention across all platforms by enhancing core features and user experience."
   */
  description: string;
}

/**
 * Represents a Key Result that measures the success of an Objective.
 * Key Results are quantitative, measurable outcomes with clear targets.
 * 
 * @remarks
 * Key Results answer the question "How will we know if we've achieved the Objective?"
 * They should be specific, measurable, achievable, relevant, and time-bound (SMART).
 * Each Objective typically has 2-5 Key Results.
 * 
 * @example
 * ```typescript
 * const keyResult: KeyResult = {
 *   id: 'kr-001',
 *   title: 'Improve Onboarding Completion Rate',
 *   description: 'Increase the percentage of new users who complete the onboarding flow',
 *   metric: 'Completion Rate',
 *   targetValue: '85%',
 *   currentValue: '62%'
 * };
 * ```
 * 
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface KeyResult {
  /**
   * Unique identifier for the key result.
   * @example "kr-001", "KR1", "2024-Q1-KR-001"
   */
  id: string;

  /**
   * The title or name of the key result.
   * Should describe the measurable outcome.
   * @example "Improve Onboarding Completion Rate", "Reduce Page Load Time"
   */
  title: string;

  /**
   * Detailed description of the key result.
   * Explains what is being measured and why it matters.
   */
  description: string;

  /**
   * The metric being measured.
   * @example "Completion Rate", "Response Time (ms)", "NPS Score", "Revenue (USD)"
   */
  metric: string;

  /**
   * The target value to be achieved.
   * Should include units where applicable.
   * @example "85%", "< 200ms", "$500K", "8.5/10"
   */
  targetValue: string;

  /**
   * The current value of the metric.
   * Tracks progress toward the target.
   * @example "62%", "350ms", "$320K", "7.2/10"
   */
  currentValue: string;
}

/**
 * Represents an Initiative - a strategic project or effort to achieve Key Results.
 * Initiatives are high-level programs that deliver value toward one or more Key Results.
 * 
 * @remarks
 * Initiatives answer the question "What projects will we undertake to achieve the Key Results?"
 * They typically span multiple sprints or quarters and involve cross-functional collaboration.
 * 
 * @example
 * ```typescript
 * const initiative: Initiative = {
 *   id: 'init-001',
 *   title: 'Onboarding Flow Redesign',
 *   description: 'Comprehensive redesign of the user onboarding experience to improve completion rates'
 * };
 * ```
 * 
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface Initiative {
  /**
   * Unique identifier for the initiative.
   * @example "init-001", "I1", "2024-Q1-INIT-001"
   */
  id: string;

  /**
   * The title or name of the initiative.
   * Should describe the strategic project or program.
   * @example "Onboarding Flow Redesign", "Payment Platform Modernization"
   */
  title: string;

  /**
   * Detailed description of the initiative.
   * Explains the scope, approach, and expected outcomes.
   */
  description: string;
}

/**
 * Represents a Feature - a specific capability or functionality within an Initiative.
 * Features are user-facing capabilities that deliver tangible value.
 * 
 * @remarks
 * Features answer the question "What specific capabilities will we build?"
 * They are deliverable units of work that can be released to users.
 * Each Initiative typically contains multiple Features.
 * 
 * @example
 * ```typescript
 * const feature: Feature = {
 *   id: 'feat-001',
 *   title: 'Interactive Welcome Tutorial',
 *   description: 'Step-by-step guided tour for first-time users with interactive tooltips'
 * };
 * ```
 * 
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface Feature {
  /**
   * Unique identifier for the feature.
   * @example "feat-001", "F1", "US-1234"
   */
  id: string;

  /**
   * The title or name of the feature.
   * Should describe the user-facing capability.
   * @example "Interactive Welcome Tutorial", "Social Login Integration"
   */
  title: string;

  /**
   * Detailed description of the feature.
   * Explains the functionality and user value.
   */
  description: string;
}

/**
 * Represents a Sub-Feature - a granular component or implementation detail of a Feature.
 * Sub-Features are the smallest units of deliverable work in the OKR hierarchy.
 * 
 * @remarks
 * Sub-Features answer the question "What specific components or tasks comprise this Feature?"
 * They are often aligned with individual user stories, tasks, or technical components.
 * 
 * @example
 * ```typescript
 * const subFeature: SubFeature = {
 *   id: 'sf-001',
 *   title: 'Tooltip Component',
 *   description: 'Reusable tooltip component with positioning logic and animations'
 * };
 * ```
 * 
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface SubFeature {
  /**
   * Unique identifier for the sub-feature.
   * @example "sf-001", "SF1", "TASK-5678"
   */
  id: string;

  /**
   * The title or name of the sub-feature.
   * Should describe the specific component or task.
   * @example "Tooltip Component", "Loading Animation", "Validation Logic"
   */
  title: string;

  /**
   * Detailed description of the sub-feature.
   * Explains the implementation details or acceptance criteria.
   */
  description: string;
}

/**
 * Represents the complete OKR hierarchy from strategic objectives down to implementation details.
 * Provides a structured alternative to the string-based okrHierarchy in ExecutionItem.
 * 
 * @remarks
 * This interface models the full OKR decomposition:
 * 
 * **Hierarchy Flow:**
 * 1. **Objective** (Top Level) - Strategic goal
 * 2. **Key Results** - Measurable outcomes for the objective
 * 3. **Initiatives** - Strategic projects to achieve key results
 * 4. **Features** - Specific capabilities within initiatives
 * 5. **Sub-Features** (Lowest Level) - Granular components or tasks
 * 
 * **Relationships:**
 * - An Objective has multiple Key Results
 * - A Key Result is supported by multiple Initiatives
 * - An Initiative contains multiple Features
 * - A Feature is composed of multiple Sub-Features
 * 
 * All properties are optional to allow partial hierarchy representation.
 * For example, you might represent only Objective → Key Results for high-level planning,
 * or Initiative → Features → Sub-Features for implementation tracking.
 * 
 * @example
 * ```typescript
 * // Full hierarchy example
 * const fullHierarchy: OKRHierarchy = {
 *   objective: [{
 *     id: 'obj-001',
 *     title: 'Increase User Engagement',
 *     description: 'Drive meaningful interactions across all platforms'
 *   }],
 *   keyResults: [{
 *     id: 'kr-001',
 *     title: 'Improve Onboarding Completion',
 *     description: 'Increase onboarding completion rate',
 *     metric: 'Completion Rate',
 *     targetValue: '85%',
 *     currentValue: '62%'
 *   }],
 *   initiatives: [{
 *     id: 'init-001',
 *     title: 'Onboarding Redesign',
 *     description: 'Redesign the onboarding experience'
 *   }],
 *   features: [{
 *     id: 'feat-001',
 *     title: 'Interactive Tutorial',
 *     description: 'Step-by-step guided tour'
 *   }],
 *   subFeatures: [{
 *     id: 'sf-001',
 *     title: 'Tooltip Component',
 *     description: 'Reusable tooltip with animations'
 *   }]
 * };
 * 
 * // Partial hierarchy example (strategic level only)
 * const strategicView: OKRHierarchy = {
 *   objective: [{
 *     id: 'obj-001',
 *     title: 'Increase User Engagement',
 *     description: 'Drive meaningful interactions'
 *   }],
 *   keyResults: [{
 *     id: 'kr-001',
 *     title: 'Improve Onboarding Completion',
 *     description: 'Increase onboarding completion rate',
 *     metric: 'Completion Rate',
 *     targetValue: '85%',
 *     currentValue: '62%'
 *   }]
 * };
 * 
 * // Empty hierarchy (valid - all properties optional)
 * const emptyHierarchy: OKRHierarchy = {};
 * ```
 * 
 * @see {@link ExecutionItem} - Uses string-based okrHierarchy property that can be replaced with this structured interface
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface OKRHierarchy {
  /**
   * Array of objectives at the strategic level.
   * Typically contains one objective, but can include multiple for cross-cutting concerns.
   * 
   * @remarks
   * Optional to allow hierarchy representations that start at lower levels
   * (e.g., when working within a known objective context).
   */
  objective?: Objective[];

  /**
   * Array of key results that measure objective success.
   * An objective typically has 2-5 key results.
   * 
   * @remarks
   * Optional to allow partial hierarchy views that exclude measurement details.
   */
  keyResults?: KeyResult[];

  /**
   * Array of initiatives - strategic projects to achieve key results.
   * Multiple initiatives can contribute to a single key result.
   * 
   * @remarks
   * Optional to allow hierarchy views focused on strategic or tactical levels only.
   */
  initiatives?: Initiative[];

  /**
   * Array of features - specific capabilities within initiatives.
   * Each initiative typically contains multiple features.
   * 
   * @remarks
   * Optional to allow high-level views without implementation details.
   */
  features?: Feature[];

  /**
   * Array of sub-features - granular components or tasks.
   * Represents the lowest level of the hierarchy.
   * 
   * @remarks
   * Optional to allow feature-level views without technical decomposition details.
   */
  subFeatures?: SubFeature[];
}
