import { describe, it, expect } from 'vitest';
import { useHealthStatus, HEALTH_STATUS_CONFIG } from '../useHealthStatus';
import { ExecutionItem, HealthStatus } from '../../types/ExecutionItem';

describe('useHealthStatus', () => {
  describe('classifyStatus', () => {
    it('should return on-track status for on-track items', () => {
      const { classifyStatus } = useHealthStatus();
      
      const item: ExecutionItem = {
        moduleName: 'Test Module',
        owner: 'John Doe',
        pm: 'Jane Smith',
        healthStatus: 'on-track',
        teamWorking: 'Squad 1',
        okrHierarchy: 'O1 > KR1'
      };

      expect(classifyStatus(item)).toBe('on-track');
    });

    it('should return at-risk status for at-risk items', () => {
      const { classifyStatus } = useHealthStatus();
      
      const item: ExecutionItem = {
        moduleName: 'Test Module',
        owner: 'John Doe',
        pm: 'Jane Smith',
        healthStatus: 'at-risk',
        teamWorking: 'Squad 1',
        okrHierarchy: 'O1 > KR1'
      };

      expect(classifyStatus(item)).toBe('at-risk');
    });

    it('should return off-track status for off-track items', () => {
      const { classifyStatus } = useHealthStatus();
      
      const item: ExecutionItem = {
        moduleName: 'Test Module',
        owner: 'John Doe',
        pm: 'Jane Smith',
        healthStatus: 'off-track',
        teamWorking: 'Squad 1',
        okrHierarchy: 'O1 > KR1'
      };

      expect(classifyStatus(item)).toBe('off-track');
    });

    it('should preserve the original healthStatus from the item', () => {
      const { classifyStatus } = useHealthStatus();
      
      const statuses: HealthStatus[] = ['on-track', 'at-risk', 'off-track'];
      
      statuses.forEach(status => {
        const item: ExecutionItem = {
          moduleName: 'Test Module',
          owner: 'Test Owner',
          pm: 'Test PM',
          healthStatus: status,
          teamWorking: 'Test Team',
          okrHierarchy: 'Test Hierarchy'
        };

        expect(classifyStatus(item)).toBe(status);
      });
    });
  });

  describe('getStatusConfig', () => {
    it('should return correct config for on-track status', () => {
      const { getStatusConfig } = useHealthStatus();
      const config = getStatusConfig('on-track');

      expect(config).toEqual({
        label: 'On Track',
        color: '#0ed183',
        backgroundColor: '#eefbf2',
        severity: 'success'
      });
    });

    it('should return correct config for at-risk status', () => {
      const { getStatusConfig } = useHealthStatus();
      const config = getStatusConfig('at-risk');

      expect(config).toEqual({
        label: 'At Risk',
        color: '#ff514e',
        backgroundColor: '#ffefed',
        severity: 'error'
      });
    });

    it('should return correct config for off-track status', () => {
      const { getStatusConfig } = useHealthStatus();
      const config = getStatusConfig('off-track');

      expect(config).toEqual({
        label: 'Off Track',
        color: '#ffab26',
        backgroundColor: '#fff7ed',
        severity: 'warning'
      });
    });

    it('should return config with all required properties', () => {
      const { getStatusConfig } = useHealthStatus();
      const config = getStatusConfig('on-track');

      expect(config).toHaveProperty('label');
      expect(config).toHaveProperty('color');
      expect(config).toHaveProperty('backgroundColor');
      expect(config).toHaveProperty('severity');
    });
  });

  describe('isValidStatus', () => {
    it('should return true for valid on-track status', () => {
      const { isValidStatus } = useHealthStatus();
      expect(isValidStatus('on-track')).toBe(true);
    });

    it('should return true for valid at-risk status', () => {
      const { isValidStatus } = useHealthStatus();
      expect(isValidStatus('at-risk')).toBe(true);
    });

    it('should return true for valid off-track status', () => {
      const { isValidStatus } = useHealthStatus();
      expect(isValidStatus('off-track')).toBe(true);
    });

    it('should return false for invalid status strings', () => {
      const { isValidStatus } = useHealthStatus();
      
      expect(isValidStatus('invalid')).toBe(false);
      expect(isValidStatus('On Track')).toBe(false);
      expect(isValidStatus('ON-TRACK')).toBe(false);
      expect(isValidStatus('')).toBe(false);
      expect(isValidStatus('at risk')).toBe(false);
    });

    it('should be case-sensitive', () => {
      const { isValidStatus } = useHealthStatus();
      
      expect(isValidStatus('On-Track')).toBe(false);
      expect(isValidStatus('AT-RISK')).toBe(false);
      expect(isValidStatus('Off-Track')).toBe(false);
    });
  });

  describe('getAllStatuses', () => {
    it('should return all valid health status values', () => {
      const { getAllStatuses } = useHealthStatus();
      const statuses = getAllStatuses();

      expect(statuses).toEqual(['on-track', 'at-risk', 'off-track']);
    });

    it('should return an array with exactly 3 elements', () => {
      const { getAllStatuses } = useHealthStatus();
      const statuses = getAllStatuses();

      expect(statuses).toHaveLength(3);
    });

    it('should include all valid HealthStatus values', () => {
      const { getAllStatuses } = useHealthStatus();
      const statuses = getAllStatuses();

      expect(statuses).toContain('on-track');
      expect(statuses).toContain('at-risk');
      expect(statuses).toContain('off-track');
    });
  });

  describe('HEALTH_STATUS_CONFIG', () => {
    it('should be exported and accessible', () => {
      expect(HEALTH_STATUS_CONFIG).toBeDefined();
    });

    it('should contain configurations for all health statuses', () => {
      expect(HEALTH_STATUS_CONFIG).toHaveProperty('on-track');
      expect(HEALTH_STATUS_CONFIG).toHaveProperty('at-risk');
      expect(HEALTH_STATUS_CONFIG).toHaveProperty('off-track');
    });

    it('should have correct color values matching Figma design', () => {
      expect(HEALTH_STATUS_CONFIG['on-track'].color).toBe('#0ed183');
      expect(HEALTH_STATUS_CONFIG['at-risk'].color).toBe('#ff514e');
      expect(HEALTH_STATUS_CONFIG['off-track'].color).toBe('#ffab26');
    });

    it('should have correct background colors', () => {
      expect(HEALTH_STATUS_CONFIG['on-track'].backgroundColor).toBe('#eefbf2');
      expect(HEALTH_STATUS_CONFIG['at-risk'].backgroundColor).toBe('#ffefed');
      expect(HEALTH_STATUS_CONFIG['off-track'].backgroundColor).toBe('#fff7ed');
    });

    it('should have correct severity mappings', () => {
      expect(HEALTH_STATUS_CONFIG['on-track'].severity).toBe('success');
      expect(HEALTH_STATUS_CONFIG['at-risk'].severity).toBe('error');
      expect(HEALTH_STATUS_CONFIG['off-track'].severity).toBe('warning');
    });

    it('should have correct display labels', () => {
      expect(HEALTH_STATUS_CONFIG['on-track'].label).toBe('On Track');
      expect(HEALTH_STATUS_CONFIG['at-risk'].label).toBe('At Risk');
      expect(HEALTH_STATUS_CONFIG['off-track'].label).toBe('Off Track');
    });
  });

  describe('Integration', () => {
    it('should work together for complete health status workflow', () => {
      const { classifyStatus, getStatusConfig, isValidStatus } = useHealthStatus();
      
      const item: ExecutionItem = {
        moduleName: 'Payment Module',
        owner: 'Alice',
        pm: 'Bob',
        healthStatus: 'at-risk',
        teamWorking: 'Squad 2',
        okrHierarchy: 'O2 > KR3'
      };

      // Classify the status
      const status = classifyStatus(item);
      expect(status).toBe('at-risk');

      // Validate the status
      expect(isValidStatus(status)).toBe(true);

      // Get the configuration
      const config = getStatusConfig(status);
      expect(config.severity).toBe('error');
      expect(config.label).toBe('At Risk');
    });
  });
});
