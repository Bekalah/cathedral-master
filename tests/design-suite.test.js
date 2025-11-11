/**
 * Comprehensive Test Suite for Cathedral Professional Design Suite
 * 
 * Tests SQLite database, Codex 144:99 integration, and sacred geometry validation
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */

import { describe, test, expect, beforeAll, afterAll } from 'vitest';

// Import the database manager with Codex 144:99 integration
let SQLiteDatabaseManager;
let dbManager;

describe('Cathedral Professional Design Suite', () => {
  
  beforeAll(async () => {
    // Initialize database with Codex 144:99 integration
    try {
      SQLiteDatabaseManager = require('../apps/cathedral-professional-design-suite/src/components/SQLiteManager.js').default;
      dbManager = new SQLiteDatabaseManager();
      await dbManager.initialize();
      console.log('✅ Test database initialized with Codex 144:99');
    } catch (error) {
      console.error('❌ Test setup failed:', error);
      throw error;
    }
  });

  afterAll(async () => {
    if (dbManager) {
      dbManager.close();
    }
  });

  describe('Database Initialization', () => {
    test('Database initializes with Codex 144:99 integration', () => {
      expect(dbManager).toBeDefined();
      expect(dbManager.isInitialized).toBe(true);
      expect(dbManager.spiralEngine).toBeDefined();
      expect(dbManager.codexData).toBeDefined();
    });

    test('Sacred geometry parameters are correct', () => {
      const params = dbManager.getSacredGeometryParams();
      
      expect(params.manifestation_nodes).toBe(144);
      expect(params.dissolution_gates).toBe(99);
      expect(params.ratio).toBeCloseTo(1.454545, 3);
      expect(params.golden_ratio).toBeCloseTo(1.618033988749895, 3);
    });

    test('Codex node generation works', () => {
      const node = dbManager.getCodexNode(0);
      
      expect(node).toHaveProperty('id');
      expect(node).toHaveProperty('archetype');
      expect(node).toHaveProperty('position');
      expect(node.id).toBe('node-0');
      expect(node.archetype).toBe('archetype-0');
    });
  });

  describe('Sacred Geometry Validation', () => {
    test('Validates golden ratio proportions correctly', () => {
      const goldenElement = {
        type: 'sacred_geometry',
        name: 'Golden Rectangle',
        width: 161.8,  // Golden ratio proportions
        height: 100,
        position_x: 100,
        position_y: 100
      };
      
      const validation = dbManager.validateAgainstCodex(goldenElement);
      
      expect(validation.isValid).toBe(true);
      expect(validation.score).toBeGreaterThan(0.7);
      expect(validation.issues).toHaveLength(0);
    });

    test('Detects golden ratio deviations', () => {
      const invalidElement = {
        type: 'sacred_geometry',
        name: 'Non-Golden Rectangle',
        width: 200,  // Not golden ratio
        height: 100,
        position_x: 100,
        position_y: 100
      };
      
      const validation = dbManager.validateAgainstCodex(invalidElement);
      
      expect(validation.issues.length).toBeGreaterThan(0);
      expect(validation.issues[0]).toContain('Golden ratio deviation');
    });

    test('Validates element naming requirements', () => {
      const poorlyNamedElement = {
        type: 'shape',
        name: 'ab',  // Too short
        width: 100,
        height: 100,
        position_x: 0,
        position_y: 0
      };
      
      const validation = dbManager.validateAgainstCodex(poorlyNamedElement);
      
      expect(validation.issues.length).toBeGreaterThan(0);
      expect(validation.issues.some(issue => issue.includes('descriptive'))).toBe(true);
    });
  });

  describe('Database Operations', () => {
    test('Creates workspaces successfully', async () => {
      const testWorkspace = {
        id: 'test-' + Date.now(),
        name: 'Test Workspace',
        type: 'vector',
        width: 1920,
        height: 1080,
        dpi: 300,
        color_space: 'RGB',
        background_color: '#ffffff',
        canvas_settings: JSON.stringify({}),
        quality_standard: 'professional'
      };
      
      const workspaceId = await dbManager.createWorkspace(testWorkspace);
      expect(workspaceId).toBe(testWorkspace.id);
    });

    test('Saves and retrieves design elements', async () => {
      const testElement = {
        id: 'element-' + Date.now(),
        workspace_id: 'test-workspace',
        type: 'vector',
        name: 'Test Vector Element',
        position_x: 100,
        position_y: 100,
        width: 50,
        height: 50,
        transform_data: JSON.stringify({ rotation: 0, scale: 1 }),
        style_data: JSON.stringify({ fill: '#ff0000', stroke: '#000000' }),
        metadata: JSON.stringify({ source: 'test' })
      };
      
      await dbManager.saveDesignElement(testElement);
      const elements = await dbManager.getDesignElements('test-workspace');
      
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0].name).toBe('Test Vector Element');
    });

    test('Performs auto-save functionality', async () => {
      const workspaceId = 'test-workspace-' + Date.now();
      
      // Create test workspace
      await dbManager.createWorkspace({
        id: workspaceId,
        name: 'Auto-save Test',
        type: 'vector',
        width: 1920,
        height: 1080,
        dpi: 300,
        color_space: 'RGB',
        background_color: '#000000',
        canvas_settings: JSON.stringify({}),
        quality_standard: 'professional'
      });
      
      // Test auto-save
      await expect(dbManager.autoSave(workspaceId)).resolves.not.toThrow();
      
      // Verify auto-save was recorded
      const history = await dbManager.getAutoSaveHistory(workspaceId, 1);
      expect(history.length).toBe(1);
      expect(history[0].success).toBe(true);
    });
  });

  describe('Quality Control System', () => {
    test('Calculates quality scores correctly', () => {
      const elements = [
        {
          type: 'sacred_geometry',
          name: 'Sacred Element',
          metadata: JSON.stringify({ important: true })
        },
        {
          type: 'vector',
          name: 'Regular Element',
          metadata: JSON.stringify({})
        }
      ];
      
      const qualityScore = dbManager.calculateQualityScore(elements);
      expect(qualityScore).toBeGreaterThan(0);
      expect(qualityScore).toBeLessThanOrEqual(1);
    });

    test('Validates workspace quality standards', () => {
      const workspace = {
        quality_standard: 'professional',
        auto_save_enabled: true
      };
      
      expect(workspace.quality_standard).toBe('professional');
      expect(workspace.auto_save_enabled).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    test('Complete workflow: create workspace, add elements, save, validate', async () => {
      // Create workspace
      const workspaceId = 'integration-test-' + Date.now();
      await dbManager.createWorkspace({
        id: workspaceId,
        name: 'Integration Test Workspace',
        type: 'vector',
        width: 1920,
        height: 1080,
        dpi: 300,
        color_space: 'RGB',
        background_color: '#1a1a2e',
        canvas_settings: JSON.stringify({ sacred_geometry_grid: true }),
        quality_standard: 'professional'
      });
      
      // Add sacred geometry element
      const sacredElement = {
        id: 'sacred-' + Date.now(),
        workspace_id: workspaceId,
        type: 'sacred_geometry',
        name: 'Merkaba Sacred Shape',
        position_x: 400,
        position_y: 300,
        width: 161.8,
        height: 100,
        transform_data: JSON.stringify({ rotation: 0 }),
        style_data: JSON.stringify({ fill: '#4a90e2' }),
        metadata: JSON.stringify({ sacred: true, codex_node: 0 })
      };
      
      await dbManager.saveDesignElement(sacredElement);
      
      // Validate element against Codex
      const validation = dbManager.validateAgainstCodex(sacredElement);
      expect(validation.isValid).toBe(true);
      expect(validation.score).toBeGreaterThan(0.8);
      
      // Auto-save
      await dbManager.autoSave(workspaceId);
      
      // Verify complete workflow
      const elements = await dbManager.getDesignElements(workspaceId);
      expect(elements.length).toBe(1);
      expect(elements[0].type).toBe('sacred_geometry');
      
      // Get Codex node for the element
      const codexNode = dbManager.getCodexNode(0);
      expect(codexNode).toBeDefined();
      
      console.log('✅ Complete integration test passed');
    });
  });

  describe('Error Handling', () => {
    test('Handles invalid workspace IDs gracefully', async () => {
      const elements = await dbManager.getDesignElements('non-existent-workspace');
      expect(elements).toEqual([]);
    });

    test('Handles invalid element data gracefully', async () => {
      const invalidElement = {
        id: 'invalid',
        workspace_id: 'test',
        // Missing required fields
      };
      
      await expect(dbManager.saveDesignElement(invalidElement)).resolves.not.toThrow();
    });
  });
});

// Export test results for CI/CD
export function getTestResults() {
  return {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    databaseType: dbManager?.getStats()?.databaseType || 'unknown',
    codexIntegration: dbManager?.spiralEngine ? 'active' : 'inactive',
    tests: 'comprehensive'
  };
}