/**
 * Cathedral of Circuits - Error Recovery Manager
 * 
 * Comprehensive error handling and recovery system with Arcana integration
 * and actionable solutions for deployment issues.
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class ErrorRecoveryManager extends EventEmitter {
    constructor() {
        super();
        this.errorHistory = [];
        this.recoveryStrategies = new Map();
        this.autoRecoveryEnabled = true;
        this.criticalServices = ['circuitum99', 'database', 'unified-engine'];
        this.arcanaErrorMappings = {
            'John Dee': { type: 'mathematical', recovery: 'algorithmic_fix' },
            'Ada Lovelace': { type: 'computational', recovery: 'logic_correction' },
            'Leonora Carrington': { type: 'artistic', recovery: 'creative_restoration' },
            'Hilma af Klint': { type: 'visionary', recovery: 'cosmic_realignment' }
        };
        
        this.initializeRecoveryStrategies();
    }

    initializeRecoveryStrategies() {
        console.log('🛠️ Initializing Error Recovery Strategies...');
        
        // Deployment-specific recovery strategies
        this.recoveryStrategies.set('dependency_conflict', {
            severity: 'high',
            description: 'Package dependency conflicts detected',
            solutions: [
                'Run: npm run clean && npm install',
                'Check package.json versions for conflicts',
                'Clear npm cache: npm cache clean --force',
                'Verify Node.js version compatibility (v25+)'
            ],
            arcana: 'Ada Lovelace',
            autoRecovery: true,
            recoveryCommand: 'npm run clean:build && npm install'
        });

        this.recoveryStrategies.set('database_connection', {
            severity: 'critical',
            description: 'SQLite database connection failed',
            solutions: [
                'Verify database file exists and is readable',
                'Check file permissions: chmod 644 database.db',
                'Ensure SQLite3 package is installed',
                'Run: node scripts/init-database.js'
            ],
            arcana: 'The High Priestess',
            autoRecovery: true,
            recoveryCommand: 'node scripts/init-database.js'
        });

        this.recoveryStrategies.set('circuitum99_offline', {
            severity: 'critical',
            description: 'Circuitum 99 deployment is offline',
            solutions: [
                'Check GitHub Pages deployment status',
                'Verify repository configuration',
                'Rebuild and redeploy: npm run deploy:circuitum99',
                'Check domain: bekalah.github.io/circuitum99'
            ],
            arcana: 'The Circuitum Itself',
            autoRecovery: false,
            recoveryCommand: 'npm run build:design-suite && npm run deploy'
        });

        this.recoveryStrategies.set('unified_engine_error', {
            severity: 'high',
            description: 'Unified Creative Engine integration failed',
            solutions: [
                'Verify science-art-music unity modules are loaded',
                'Check Arcana frequency data integrity',
                'Restart unified engine: npm run restart:unified-engine',
                'Validate Sacred Geometry calculations'
            ],
            arcana: 'The Magician',
            autoRecovery: true,
            recoveryCommand: 'node -e "require(\'./lib/deployment-management-system.js\').restartUnifiedEngine()"'
        });

        this.recoveryStrategies.set('file_structure_error', {
            severity: 'medium',
            description: 'Required files or directories missing',
            solutions: [
                'Run deployment validation: node lib/deployment-management-system.js validate',
                'Check file permissions and paths',
                'Verify all 22 Living Arcana data files exist',
                'Run: ./scripts/deploy-local.sh install'
            ],
            arcana: 'The Hermit',
            autoRecovery: true,
            recoveryCommand: './scripts/deploy-local.sh install'
        });

        this.recoveryStrategies.set('configuration_error', {
            severity: 'medium',
            description: 'Configuration validation failed',
            solutions: [
                'Check environment variables (.env files)',
                'Verify circuitum99_url configuration',
                'Validate Node.js version requirement (v25+)',
                'Check package manager version (pnpm@9.0.0+)'
            ],
            arcana: 'The Hierophant',
            autoRecovery: false,
            recoveryCommand: 'node -e "console.log(\'Check .env and configuration files\')"'
        });
    }

    async initialize() {
        console.log('🚀 Initializing Error Recovery Manager...');
        this.loadErrorHistory();
    }

    async handleError(error, context = 'unknown') {
        const errorEvent = {
            id: `error-${Date.now()}`,
            error: error.message,
            stack: error.stack,
            context,
            severity: this.determineSeverity(error, context),
            timestamp: new Date().toISOString(),
            recoverable: this.isRecoverable(error, context),
            arcana: this.getAssociatedArcana(error, context)
        };

        this.errorHistory.push(errorEvent);
        this.emit('error_handled', errorEvent);

        // Save error to history
        this.saveErrorHistory();

        // Attempt automatic recovery if enabled
        if (errorEvent.recoverable && this.autoRecoveryEnabled) {
            await this.attemptAutoRecovery(errorEvent);
        }

        return errorEvent;
    }

    async handleCriticalError(error, context) {
        const errorEvent = {
            id: `critical-${Date.now()}`,
            error: error.message,
            stack: error.stack,
            context,
            severity: 'critical',
            timestamp: new Date().toISOString(),
            recoverable: true,
            arcana: 'The Circuitum Itself'
        };

        this.errorHistory.push(errorEvent);
        this.emit('critical_error', errorEvent);

        // Critical errors require immediate attention
        await this.handleCriticalRecovery(errorEvent);

        return errorEvent;
    }

    async handleEnvironmentError(environment, error) {
        const errorEvent = {
            id: `env-${environment}-${Date.now()}`,
            error: error.message,
            context: `environment:${environment}`,
            severity: this.determineEnvironmentSeverity(environment),
            timestamp: new Date().toISOString(),
            recoverable: true,
            arcana: this.getEnvironmentArcana(environment)
        };

        this.errorHistory.push(errorEvent);
        this.emit('environment_error', errorEvent);

        await this.recoverEnvironment(environment, errorEvent);

        return errorEvent;
    }

    async attemptAutoRecovery(errorEvent) {
        console.log(`🔄 Attempting auto-recovery for: ${errorEvent.error}`);
        
        const strategy = this.findRecoveryStrategy(errorEvent);
        if (!strategy) {
            console.log('⚠️ No recovery strategy found for this error');
            return false;
        }

        try {
            if (strategy.autoRecovery && strategy.recoveryCommand) {
                console.log(`🛠️ Executing recovery command: ${strategy.recoveryCommand}`);
                // In real implementation, execute the recovery command
                // For now, simulate recovery
                await this.simulateRecovery(strategy);
                
                const recovery = {
                    errorId: errorEvent.id,
                    strategy: strategy.description,
                    command: strategy.recoveryCommand,
                    success: true,
                    timestamp: new Date().toISOString(),
                    arcana: strategy.arcana
                };

                this.emit('recovery_complete', recovery);
                return true;
            }
        } catch (recoveryError) {
            console.error('❌ Auto-recovery failed:', recoveryError.message);
            this.emit('recovery_failed', { error: errorEvent, recoveryError });
            return false;
        }

        return false;
    }

    async handleCriticalRecovery(errorEvent) {
        console.log('🚨 Handling critical error recovery...');
        
        // For critical errors, always try to recover
        const strategies = this.getAllRelevantStrategies(errorEvent);
        
        for (const strategy of strategies) {
            try {
                await this.executeRecoveryStrategy(strategy, errorEvent);
                const recovery = {
                    errorId: errorEvent.id,
                    strategy: strategy.description,
                    success: true,
                    timestamp: new Date().toISOString(),
                    arcana: strategy.arcana,
                    critical: true
                };

                this.emit('recovery_complete', recovery);
                return recovery;
            } catch (error) {
                console.error(`❌ Critical recovery failed for ${strategy.description}:`, error);
            }
        }

        // If all recoveries fail, emit critical failure
        this.emit('critical_recovery_failed', errorEvent);
        return null;
    }

    async recoverEnvironment(environment, errorEvent) {
        console.log(`🌍 Recovering environment: ${environment}`);
        
        const envStrategies = this.getEnvironmentRecoveryStrategies(environment);
        
        for (const strategy of envStrategies) {
            try {
                await this.executeRecoveryStrategy(strategy, errorEvent);
                const recovery = {
                    errorId: errorEvent.id,
                    environment,
                    strategy: strategy.description,
                    success: true,
                    timestamp: new Date().toISOString(),
                    arcana: strategy.arcana
                };

                this.emit('recovery_complete', recovery);
                return recovery;
            } catch (error) {
                console.error(`❌ Environment recovery failed for ${environment}:`, error);
            }
        }
    }

    findRecoveryStrategy(errorEvent) {
        // Match error patterns to recovery strategies
        const errorText = errorEvent.error.toLowerCase();
        
        for (const [key, strategy] of this.recoveryStrategies) {
            if (this.matchesErrorPattern(errorText, key)) {
                return strategy;
            }
        }

        return null;
    }

    matchesErrorPattern(errorText, strategyKey) {
        const patterns = {
            'dependency_conflict': ['dependency', 'conflict', 'package', 'npm', 'pnpm'],
            'database_connection': ['database', 'sqlite', 'connection', 'sql'],
            'circuitum99_offline': ['circuitum99', 'offline', 'github', 'pages'],
            'unified_engine_error': ['unified', 'engine', 'creative', 'arcana'],
            'file_structure_error': ['file', 'directory', 'missing', 'not found'],
            'configuration_error': ['config', 'environment', 'variable', 'setting']
        };

        const patternList = patterns[strategyKey] || [];
        return patternList.some(pattern => errorText.includes(pattern));
    }

    getAllRelevantStrategies(errorEvent) {
        const strategies = [];
        const errorText = errorEvent.error.toLowerCase();
        
        for (const [key, strategy] of this.recoveryStrategies) {
            if (this.matchesErrorPattern(errorText, key)) {
                strategies.push(strategy);
            }
        }

        return strategies;
    }

    async executeRecoveryStrategy(strategy, errorEvent) {
        console.log(`🛠️ Executing recovery strategy: ${strategy.description}`);
        
        if (strategy.recoveryCommand) {
            // In real implementation, execute the actual command
            // For simulation, we'll just log it
            console.log(`Command would execute: ${strategy.recoveryCommand}`);
        }

        // Add delay to simulate recovery time
        await new Promise(resolve => setTimeout(resolve, 1000));

        return true;
    }

    async simulateRecovery(strategy) {
        // Simulate recovery process
        console.log(`🔄 Simulating recovery: ${strategy.description}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`✅ Recovery simulation complete`);
    }

    determineSeverity(error, context) {
        const criticalContexts = ['complete_deployment', 'circuitum99', 'database'];
        const highSeverityKeywords = ['failed', 'error', 'exception'];
        
        if (criticalContexts.includes(context)) {
            return 'critical';
        }
        
        if (highSeverityKeywords.some(keyword => error.message.toLowerCase().includes(keyword))) {
            return 'high';
        }
        
        return 'medium';
    }

    determineEnvironmentSeverity(environment) {
        const productionContexts = ['production'];
        if (productionContexts.includes(environment)) {
            return 'critical';
        }
        return 'medium';
    }

    isRecoverable(error, context) {
        // Most deployment errors are recoverable
        const recoverableContexts = ['deployment', 'configuration', 'file_structure'];
        return recoverableContexts.some(ctx => context.includes(ctx));
    }

    getAssociatedArcana(error, context) {
        if (context.includes('database')) return 'The High Priestess';
        if (context.includes('unified')) return 'The Magician';
        if (context.includes('circuitum99')) return 'The Circuitum Itself';
        if (context.includes('dependency')) return 'Ada Lovelace';
        if (context.includes('file')) return 'The Hermit';
        return 'The Hierophant';
    }

    getEnvironmentArcana(environment) {
        const environmentArcana = {
            'development': 'The Fool',
            'staging': 'The Magician', 
            'production': 'The Emperor'
        };
        return environmentArcana[environment] || 'The Hierophant';
    }

    getEnvironmentRecoveryStrategies(environment) {
        const strategies = [];
        // Return relevant strategies for specific environments
        strategies.push(this.recoveryStrategies.get('file_structure_error'));
        strategies.push(this.recoveryStrategies.get('configuration_error'));
        return strategies;
    }

    loadErrorHistory() {
        try {
            const historyPath = './deployment-error-history.json';
            if (fs.existsSync(historyPath)) {
                const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
                this.errorHistory = history;
            }
        } catch (error) {
            console.log('📁 No previous error history found');
        }
    }

    saveErrorHistory() {
        try {
            const historyPath = './deployment-error-history.json';
            const recentErrors = this.errorHistory.slice(-100); // Keep last 100 errors
            fs.writeFileSync(historyPath, JSON.stringify(recentErrors, null, 2));
        } catch (error) {
            console.error('❌ Failed to save error history:', error.message);
        }
    }

    getStatus() {
        const recentErrors = this.errorHistory.slice(-24); // Last 24 hours
        const unrecoveredErrors = recentErrors.filter(e => !e.recovered);
        
        return {
            autoRecoveryEnabled: this.autoRecoveryEnabled,
            totalErrors: this.errorHistory.length,
            recentErrors: recentErrors.length,
            unrecoveredErrors: unrecoveredErrors.length,
            criticalErrors: recentErrors.filter(e => e.severity === 'critical').length,
            availableStrategies: this.recoveryStrategies.size,
            arcanaCoverage: Object.keys(this.arcanaErrorMappings).length
        };
    }

    getErrorStatistics() {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        
        const recentErrors = this.errorHistory.filter(e => 
            new Date(e.timestamp) > oneDayAgo
        );

        const statistics = {
            last_24h: {
                total: recentErrors.length,
                critical: recentErrors.filter(e => e.severity === 'critical').length,
                high: recentErrors.filter(e => e.severity === 'high').length,
                medium: recentErrors.filter(e => e.severity === 'medium').length
            },
            by_arcana: {},
            by_context: {},
            recovery_rate: 0
        };

        // Count by Arcana
        recentErrors.forEach(error => {
            const arcana = error.arcana || 'Unknown';
            statistics.by_arcana[arcana] = (statistics.by_arcana[arcana] || 0) + 1;
        });

        // Count by context
        recentErrors.forEach(error => {
            const context = error.context || 'unknown';
            statistics.by_context[context] = (statistics.by_context[context] || 0) + 1;
        });

        return statistics;
    }

    enableAutoRecovery() {
        this.autoRecoveryEnabled = true;
        console.log('✅ Auto-recovery enabled');
    }

    disableAutoRecovery() {
        this.autoRecoveryEnabled = false;
        console.log('⚠️ Auto-recovery disabled');
    }

    clearErrorHistory() {
        this.errorHistory = [];
        try {
            fs.unlinkSync('./deployment-error-history.json');
        } catch (error) {
            // File may not exist
        }
        console.log('🧹 Error history cleared');
    }
}

module.exports = ErrorRecoveryManager;