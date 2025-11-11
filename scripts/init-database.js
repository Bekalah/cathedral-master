/**
 * Database Initialization Script for Cathedral Professional Design Suite
 * 
 * Initializes SQLite database with Node.js v25 and integrates with existing Codex 144:99 system
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */

const path = require('path');
const fs = require('fs');

// Import the SQLite database manager with Codex 144:99 integration
let SQLiteDatabaseManager;
try {
    SQLiteDatabaseManager = require('../apps/cathedral-professional-design-suite/src/components/SQLiteManager.js');
} catch (error) {
    console.error('❌ Failed to load SQLiteDatabaseManager:', error.message);
    process.exit(1);
}

async function initializeDatabase() {
    console.log('🏰 Initializing Cathedral Professional Design Suite Database...');
    console.log('🗄️ Setting up SQLite with Node.js v25...');
    console.log('📚 Connecting to Codex 144:99 system...');
    
    const dbManager = new SQLiteDatabaseManager();
    
    try {
        // Initialize database with Codex 144:99 integration
        await dbManager.initialize();
        
        console.log('\n✅ Database successfully initialized!');
        console.log('🔗 Codex 144:99 integration status: ACTIVE');
        
        // Test Codex connectivity
        console.log('\n🧪 Testing Codex 144:99 connectivity...');
        
        const testNode = dbManager.getCodexNode(0);
        console.log('📊 Test Node 0:', {
            id: testNode.id,
            archetype: testNode.archetype,
            position: testNode.position
        });
        
        const sacredParams = dbManager.getSacredGeometryParams();
        console.log('📐 Sacred Geometry Parameters:', {
            manifestation_nodes: sacredParams.manifestation_nodes,
            dissolution_gates: sacredParams.dissolution_gates,
            ratio: sacredParams.ratio,
            golden_ratio: sacredParams.golden_ratio
        });
        
        // Test database functionality
        console.log('\n🧪 Testing database functionality...');
        
        const stats = dbManager.getStats();
        console.log('📈 Database Statistics:', stats);
        
        // Test sacred geometry validation
        console.log('\n🔍 Testing Sacred Geometry Validation...');
        
        const testElement = {
            type: 'sacred_geometry',
            name: 'Golden Rectangle Test',
            width: 161.8,
            height: 100,
            position_x: 100,
            position_y: 100
        };
        
        const validation = dbManager.validateAgainstCodex(testElement);
        console.log('✅ Validation Result:', {
            isValid: validation.isValid,
            score: validation.score,
            issues: validation.issues
        });
        
        // Create a test workspace
        console.log('\n📁 Creating test workspace...');
        
        const testWorkspace = {
            id: 'test-workspace-' + Date.now(),
            name: 'Cathedral Test Workspace',
            type: 'vector',
            width: 1920,
            height: 1080,
            dpi: 300,
            color_space: 'RGB',
            background_color: '#1a1a2e',
            canvas_settings: JSON.stringify({
                grid_enabled: true,
                grid_size: 20,
                snap_to_grid: true,
                sacred_geometry_grid: true
            }),
            quality_standard: 'professional',
            auto_save_enabled: true
        };
        
        const workspaceId = await dbManager.createWorkspace(testWorkspace);
        console.log('✅ Test workspace created:', workspaceId);
        
        // Test auto-save
        console.log('\n💾 Testing auto-save functionality...');
        await dbManager.autoSave(workspaceId);
        console.log('✅ Auto-save completed successfully');
        
        // Final status report
        console.log('\n🎉 DATABASE INITIALIZATION COMPLETE!');
        console.log('═'.repeat(50));
        console.log('✅ SQLite Database: OPERATIONAL');
        console.log('✅ Codex 144:99 Integration: ACTIVE');
        console.log('✅ Sacred Geometry: ENABLED');
        console.log('✅ Auto-save System: FUNCTIONAL');
        console.log('✅ Quality Validation: WORKING');
        console.log('✅ Test Workspace: CREATED');
        console.log('═'.repeat(50));
        console.log('\n🏰 Cathedral Professional Design Suite is ready!');
        console.log('🎨 You can now start developing professional-grade design tools.');
        console.log('📚 All systems connected to your existing Codex 144:99 framework.');
        
        return {
            success: true,
            dbManager,
            testResults: {
                codexConnectivity: true,
                databaseStats: stats,
                validationScore: validation.score,
                workspaceCreated: workspaceId
            }
        };
        
    } catch (error) {
        console.error('\n❌ Database initialization failed:', error);
        console.error('Stack trace:', error.stack);
        
        return {
            success: false,
            error: error.message,
            suggestions: [
                'Ensure Node.js v25+ is installed',
                'Check that cathedral-data directory exists',
                'Verify Codex 144:99 data file is accessible',
                'Ensure proper file permissions'
            ]
        };
    }
}

// Export for use as module
module.exports = { initializeDatabase };

// Run initialization if called directly
if (require.main === module) {
    initializeDatabase()
        .then((result) => {
            if (result.success) {
                console.log('\n🚀 Ready to start development!');
                process.exit(0);
            } else {
                console.log('\n💥 Initialization failed. Please check errors above.');
                process.exit(1);
            }
        })
        .catch((error) => {
            console.error('\n💥 Unexpected error during initialization:', error);
            process.exit(1);
        });
}