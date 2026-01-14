import type { ExecutionItem } from './ExecutionItem';

/**
 * Direction for sorting table columns.
 * Controls the order in which table rows are arranged.
 * 
 * @remarks
 * This type is used in conjunction with {@link TableSortConfig} to specify
 * whether data should be sorted in ascending or descending order.
 * 
 * - 'asc': Sort from lowest to highest (A→Z, 0→9, oldest→newest)
 * - 'desc': Sort from highest to lowest (Z→A, 9→0, newest→oldest)
 * 
 * @see {@link TableSortConfig} for usage in sort configuration
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Configuration for sorting execution items in the roadmap table.
 * Provides type-safe column selection and sort direction control.
 * 
 * @remarks
 * This interface ensures type safety by restricting the `column` property to valid
 * {@link ExecutionItem} keys only. This prevents runtime errors from attempting to
 * sort by non-existent columns.
 * 
 * The `keyof ExecutionItem` type provides compile-time validation, ensuring that
 * only the following column values are accepted:
 * - 'moduleName'
 * - 'owner'
 * - 'pm'
 * - 'healthStatus'
 * - 'teamWorking'
 * - 'okrHierarchy'
 * 
 * @example
 * ```typescript
 * // Valid sort configurations
 * const sortByModuleName: TableSortConfig = {
 *   column: 'moduleName',
 *   direction: 'asc'
 * };
 * 
 * const sortByOwnerDesc: TableSortConfig = {
 *   column: 'owner',
 *   direction: 'desc'
 * };
 * 
 * const sortByHealth: TableSortConfig = {
 *   column: 'healthStatus',
 *   direction: 'asc'
 * };
 * 
 * // TypeScript will prevent invalid configurations:
 * // const invalid: TableSortConfig = {
 * //   column: 'invalidColumn',  // ❌ Type error: not a valid ExecutionItem key
 * //   direction: 'ascending'     // ❌ Type error: must be 'asc' or 'desc'
 * // };
 * ```
 * 
 * @example
 * ```typescript
 * // Usage in a sorting function
 * function sortExecutionItems(
 *   items: ExecutionItem[],
 *   config: TableSortConfig
 * ): ExecutionItem[] {
 *   return items.sort((a, b) => {
 *     const aValue = a[config.column];
 *     const bValue = b[config.column];
 *     
 *     const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
 *     return config.direction === 'asc' ? comparison : -comparison;
 *   });
 * }
 * ```
 * 
 * @see {@link ExecutionItem} for the interface defining sortable columns
 * @see {@link SortDirection} for available sort direction values
 * @see Figma Design: https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155
 */
export interface TableSortConfig {
  /**
   * The column to sort by.
   * Must be a valid property name from the {@link ExecutionItem} interface.
   * 
   * @remarks
   * TypeScript's `keyof` operator provides compile-time type checking,
   * ensuring only valid ExecutionItem properties can be used for sorting.
   * This prevents runtime errors from attempting to access non-existent properties.
   * 
   * Valid values: 'moduleName' | 'owner' | 'pm' | 'healthStatus' | 'teamWorking' | 'okrHierarchy'
   */
  column: keyof ExecutionItem;

  /**
   * The direction to sort the column.
   * 
   * @remarks
   * - 'asc': Ascending order (A→Z, 0→9, oldest→newest)
   * - 'desc': Descending order (Z→A, 9→0, newest→oldest)
   * 
   * @see {@link SortDirection} for type definition
   */
  direction: SortDirection;
}
