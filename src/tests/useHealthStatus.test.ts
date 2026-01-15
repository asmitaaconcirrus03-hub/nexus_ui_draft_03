import { getStatusLabel, getStatusColor, getStatusClassName } from '../hooks/useHealthStatus';
import { HealthStatus } from '../types/ExecutionItem';

/**
 * Test suite for health status utility functions.
 * 
 * These tests verify that the utility functions correctly map health status values
 * to their corresponding labels, colors, and CSS class names, and properly handle
 * edge cases including null and undefined values.
 * 
 * Test Strategy:
 * 1. Test all valid health status values ('on-track', 'at-risk', 'off-track')
 * 2. Test edge cases (undefined, null)
 * 3. Verify exact color values match Figma design specifications
 * 4. Verify labels match exact text from Figma design
 * 5. Verify CSS class naming conventions
 */

describe('getStatusLabel', () => {
  it('should return "On track" for on-track status', () => {
    const result = getStatusLabel('on-track');
    expect(result).toBe('On track');
  });

  it('should return "At Risks" for at-risk status', () => {
    const result = getStatusLabel('at-risk');
    expect(result).toBe('At Risks');
  });

  it('should return "Off Track" for off-track status', () => {
    const result = getStatusLabel('off-track');
    expect(result).toBe('Off Track');
  });

  it('should return "Unknown" for undefined status', () => {
    const result = getStatusLabel(undefined);
    expect(result).toBe('Unknown');
  });

  it('should return "Unknown" for null status', () => {
    const result = getStatusLabel(null);
    expect(result).toBe('Unknown');
  });
});

describe('getStatusColor', () => {
  it('should return correct colors for on-track status', () => {
    const result = getStatusColor('on-track');
    expect(result).toEqual({
      text: '#0ed183',
      background: '#eefbf2',
    });
  });

  it('should return correct colors for at-risk status', () => {
    const result = getStatusColor('at-risk');
    expect(result).toEqual({
      text: '#ff514e',
      background: '#ffefed',
    });
  });

  it('should return correct colors for off-track status', () => {
    const result = getStatusColor('off-track');
    expect(result).toEqual({
      text: '#ffab26',
      background: '#fff7ed',
    });
  });

  it('should return default gray colors for undefined status', () => {
    const result = getStatusColor(undefined);
    expect(result).toEqual({
      text: '#656b75',
      background: '#f3f3f3',
    });
  });

  it('should return default gray colors for null status', () => {
    const result = getStatusColor(null);
    expect(result).toEqual({
      text: '#656b75',
      background: '#f3f3f3',
    });
  });

  it('should return hex color values in lowercase', () => {
    const statuses: HealthStatus[] = ['on-track', 'at-risk', 'off-track'];
    statuses.forEach((status) => {
      const result = getStatusColor(status);
      expect(result.text).toMatch(/^#[0-9a-f]{6}$/);
      expect(result.background).toMatch(/^#[0-9a-f]{6}$/);
    });
  });
});

describe('getStatusClassName', () => {
  it('should return "health-status-on-track" for on-track status', () => {
    const result = getStatusClassName('on-track');
    expect(result).toBe('health-status-on-track');
  });

  it('should return "health-status-at-risk" for at-risk status', () => {
    const result = getStatusClassName('at-risk');
    expect(result).toBe('health-status-at-risk');
  });

  it('should return "health-status-off-track" for off-track status', () => {
    const result = getStatusClassName('off-track');
    expect(result).toBe('health-status-off-track');
  });

  it('should return "health-status-unknown" for undefined status', () => {
    const result = getStatusClassName(undefined);
    expect(result).toBe('health-status-unknown');
  });

  it('should return "health-status-unknown" for null status', () => {
    const result = getStatusClassName(null);
    expect(result).toBe('health-status-unknown');
  });

  it('should return class names in kebab-case format', () => {
    const statuses: HealthStatus[] = ['on-track', 'at-risk', 'off-track'];
    statuses.forEach((status) => {
      const result = getStatusClassName(status);
      expect(result).toMatch(/^health-status-[a-z-]+$/);
    });
  });
});

/**
 * Integration tests to verify all functions work together consistently.
 */
describe('Integration: All health status utilities', () => {
  it('should provide consistent data for the same status across all functions', () => {
    const status: HealthStatus = 'on-track';
    
    const label = getStatusLabel(status);
    const colors = getStatusColor(status);
    const className = getStatusClassName(status);

    // Verify all functions return expected values for the same status
    expect(label).toBe('On track');
    expect(colors.text).toBe('#0ed183');
    expect(colors.background).toBe('#eefbf2');
    expect(className).toBe('health-status-on-track');
  });

  it('should handle all valid health status values', () => {
    const statuses: HealthStatus[] = ['on-track', 'at-risk', 'off-track'];
    
    statuses.forEach((status) => {
      expect(() => getStatusLabel(status)).not.toThrow();
      expect(() => getStatusColor(status)).not.toThrow();
      expect(() => getStatusClassName(status)).not.toThrow();
    });
  });

  it('should handle edge cases consistently across all functions', () => {
    const edgeCases = [undefined, null];
    
    edgeCases.forEach((edgeCase) => {
      expect(getStatusLabel(edgeCase)).toBe('Unknown');
      expect(getStatusClassName(edgeCase)).toBe('health-status-unknown');
      expect(getStatusColor(edgeCase)).toEqual({
        text: '#656b75',
        background: '#f3f3f3',
      });
    });
  });
});
