import { HealthStatus } from '../types/ExecutionItem';

/**
 * Color configuration for health status badges.
 * These values are derived from the Figma design specification.
 * 
 * @see {@link https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155}
 */
interface StatusColors {
  /** Text color in hex format */
  text: string;
  /** Background color in hex format */
  background: string;
}

/**
 * Maps a health status value to its human-readable label.
 * 
 * This function converts the internal health status identifiers to
 * user-facing labels that match the Figma design specifications.
 * 
 * @param status - The health status to convert. Can be undefined or null for edge cases.
 * @returns The human-readable label for the status.
 * 
 * @example
 * ```typescript
 * getStatusLabel('on-track');  // Returns: "On track"
 * getStatusLabel('at-risk');   // Returns: "At Risks"
 * getStatusLabel('off-track'); // Returns: "Off Track"
 * getStatusLabel(undefined);   // Returns: "Unknown"
 * ```
 * 
 * @remarks
 * The labels returned by this function match the exact text displayed
 * in the Figma design for health status badges:
 * - 'on-track' → "On track"
 * - 'at-risk' → "At Risks"
 * - 'off-track' → "Off Track"
 * - undefined/null → "Unknown"
 */
export function getStatusLabel(status: HealthStatus | undefined | null): string {
  if (!status) {
    return 'Unknown';
  }

  switch (status) {
    case 'on-track':
      return 'On track';
    case 'at-risk':
      return 'At Risks';
    case 'off-track':
      return 'Off Track';
    default:
      return 'Unknown';
  }
}

/**
 * Returns the color scheme for a given health status.
 * 
 * This function provides the exact hex color values as specified in the
 * Figma design for health status badges, including both text and background colors.
 * 
 * @param status - The health status to get colors for. Can be undefined or null.
 * @returns An object containing text and background color hex values.
 * 
 * @example
 * ```typescript
 * getStatusColor('on-track');
 * // Returns: { text: '#0ed183', background: '#eefbf2' }
 * 
 * getStatusColor('at-risk');
 * // Returns: { text: '#ff514e', background: '#ffefed' }
 * 
 * getStatusColor(null);
 * // Returns: { text: '#656b75', background: '#f3f3f3' }
 * ```
 * 
 * @remarks
 * Color values are taken directly from the Figma design specification:
 * - **On track**: Green badge (text: #0ed183, bg: #eefbf2)
 * - **At risk**: Red badge (text: #ff514e, bg: #ffefed)
 * - **Off track**: Orange badge (text: #ffab26, bg: #fff7ed)
 * - **Unknown**: Gray badge (text: #656b75, bg: #f3f3f3)
 * 
 * These colors ensure visual consistency with the design system and
 * provide appropriate semantic meaning for each status level.
 * 
 * @see {@link https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155}
 */
export function getStatusColor(status: HealthStatus | undefined | null): StatusColors {
  if (!status) {
    return {
      text: '#656b75',
      background: '#f3f3f3',
    };
  }

  switch (status) {
    case 'on-track':
      return {
        text: '#0ed183',
        background: '#eefbf2',
      };
    case 'at-risk':
      return {
        text: '#ff514e',
        background: '#ffefed',
      };
    case 'off-track':
      return {
        text: '#ffab26',
        background: '#fff7ed',
      };
    default:
      return {
        text: '#656b75',
        background: '#f3f3f3',
      };
  }
}

/**
 * Generates a CSS class name for a health status.
 * 
 * This function returns a standardized CSS class name that can be used
 * to style health status elements consistently across the application.
 * 
 * @param status - The health status to generate a class name for. Can be undefined or null.
 * @returns A CSS class name string in kebab-case format.
 * 
 * @example
 * ```typescript
 * getStatusClassName('on-track');  // Returns: "health-status-on-track"
 * getStatusClassName('at-risk');   // Returns: "health-status-at-risk"
 * getStatusClassName('off-track'); // Returns: "health-status-off-track"
 * getStatusClassName(undefined);   // Returns: "health-status-unknown"
 * ```
 * 
 * @remarks
 * The class names follow a consistent naming pattern:
 * - 'on-track' → "health-status-on-track"
 * - 'at-risk' → "health-status-at-risk"
 * - 'off-track' → "health-status-off-track"
 * - undefined/null → "health-status-unknown"
 * 
 * These class names can be used in conjunction with the colors returned
 * by {@link getStatusColor} to create styled health status badges.
 * The naming convention uses BEM-style naming for clarity and consistency.
 */
export function getStatusClassName(status: HealthStatus | undefined | null): string {
  if (!status) {
    return 'health-status-unknown';
  }

  return `health-status-${status}`;
}
