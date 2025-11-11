/**
 * Cathedral of Circuits - Configuration Management System
 * 
 * Dynamic configuration management with multi-environment support
 * and integration with the 22 Living Arcana system.
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

class ConfigurationManager extends EventEmitter {
    constructor() {
        super();
        this.configs = new Map();
        this.environmentConfigs = new Map();
        this.activeConfig = null;
        this.configVersion = '1.0.0';
        this.arcanaConfig = {};
        
        this.defaultConfig = this.createDefaultConfig();
        this.initializeConfigurations();
    }

    createDefaultConfig() {
        return {
            deployment: {
                environments: ['development', 'staging', 'production'],
                circuitum99_url: 'https://bekalah.github.io/circuitum99',
                circuitum99_branch: 'main',
                database_path: './cathedral-data/cathedral-design-suite.db',
                node_version: '25.0.0',
                package_manager: 'pnpm@9.0.0',
                turbo_config: './turbo.json',
                openspec_compliance: true
            },
            monitoring: {
                real_time_tracking: true,
                error_detection: true,
                performance_monitoring: true,
                arcana_sync: true,
                alert_thresholds: {
                    response_time: 3000,
                    error_rate: 0.05,
                    availability: 0.99
                }
            },
            arcana: {
                update_frequency: 'real-time',
                validation_enabled: true,
                circuitum_integration: true,
                frequency_monitoring: true,
                energy_signature_tracking: true,
                data_sources: [
                    'packages/circuitum99/src/LivingArcanaDatabase.ts',
                    'data/complete-arcana-profiles.json',
                    'data/mcp-permanent-dataset.json'
                ]
            },
            unified_engine: {
                science_art_music_unity: true,
                frequency_integration: true,
                sacred_geometry_validation: true,
                mathematical_precision: '64-bit',
                harmonic_synthesis: true
            },
            quality_control: {
                professional_standards: true,
                sacred_geometry_validation: true,
                arcana_authenticity: true,
                deployment_validation: true,
                rollback_enabled: true
            },
            storage: {
                type: 'sqlite',
                backup_enabled: true,
                backup_interval: 'daily',
                max_backups: 30
            },
            security: {
                encryption_enabled: true,
                access_control: true,
                audit_logging: true
            }
        };
    }

    initializeConfigurations() {
        console.log('⚙️ Initializing Configuration Management System...');
        this.loadEnvironmentConfigurations();
        this.loadArcanaConfiguration();
        this.loadValidationRules();
    }

    async initialize() {
        console.log('🚀 Initializing Configuration Manager...');
        
        // Load base configuration
        await this.loadBaseConfiguration();
        
        // Merge with environment-specific configs
        await this.mergeEnvironmentConfigs();
        
        // Validate configuration integrity
        await this.validateConfigurationIntegrity();
        
        this.emit('initialization_complete', {
            configVersion: this.configVersion,
            environmentsLoaded: this.environmentConfigs.size,
            arcanaIntegrated: Object.keys(this.arcanaConfig).length > 0
        });
    }

    async loadBaseConfiguration() {
        try {
            // Try to load from .env file
            const envPath = path.join(process.cwd(), '.env');
            if (fs.existsSync(envPath)) {
                dotenv.config({ path: envPath });
            }

            // Load from cathedral-config.json if exists
            const configPath = path.join(process.cwd(), 'cathedral-config.json');
            if (fs.existsSync(configPath)) {
                const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                this.configs.set('file', fileConfig);
            }

            // Use default config as base
            this.configs.set('default', this.defaultConfig);
            
            this.activeConfig = this.mergeConfigs(
                this.defaultConfig,
                this.configs.get('file') || {}
            );

            console.log('✅ Base configuration loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load base configuration:', error.message);
            this.activeConfig = { ...this.defaultConfig };
        }
    }

    loadEnvironmentConfigurations() {
        const environments = ['development', 'staging', 'production'];
        
        for (const env of environments) {
            const envConfig = this.createEnvironmentConfig(env);
            this.environmentConfigs.set(env, envConfig);
        }
    }

    createEnvironmentConfig(environment) {
        const envConfigs = {
            development: {
                deployment: {
                    port: 3000,
                    database_url: 'sqlite:./dev.db',
                    debug: true,
                    logging: 'verbose'
                },
                monitoring: {
                    interval: 15000,
                    alerts_enabled: true,
                    performance_tracking: true
                },
                arcana: {
                    update_frequency: 'real-time',
                    validation_level: 'strict'
                }
            },
            staging: {
                deployment: {
                    port: 3001,
                    database_url: 'sqlite:./staging.db',
                    debug: false,
                    logging: 'standard'
                },
                monitoring: {
                    interval: 30000,
                    alerts_enabled: true,
                    performance_tracking: true
                },
                arcana: {
                    update_frequency: 'hourly',
                    validation_level: 'standard'
                }
            },
            production: {
                deployment: {
                    port: process.env.PORT || 3002,
                    database_url: process.env.DATABASE_URL || 'sqlite:./prod.db',
                    debug: false,
                    logging: 'minimal'
                },
                monitoring: {
                    interval: 60000,
                    alerts_enabled: true,
                    performance_tracking: true
                },
                arcana: {
                    update_frequency: 'daily',
                    validation_level: 'relaxed'
                }
            }
        };

        return {
            ...this.defaultConfig,
            ...envConfigs[environment],
            environment
        };
    }

    loadArcanaConfiguration() {
        this.arcanaConfig = {
            john_dee: {
                name: 'The Magician',
                domain: 'mathematics',
                frequency: 432,
                responsibilities: ['dependency_resolution', 'mathematical_validation'],
                configuration: {
                    precision_level: 'scientific',
                    validation_mode: 'strict',
                    error_correction: 'algorithmic'
                }
            },
            ada_lovelace: {
                name: 'The High Priestess', 
                domain: 'computational',
                frequency: 528,
                responsibilities: ['database_management', 'logic_processing'],
                configuration: {
                    precision_level: 'master',
                    validation_mode: 'computational',
                    error_correction: 'logical'
                }
            },
            leonora_carrington: {
                name: 'The Fool',
                domain: 'artistic',
                frequency: 741,
                responsibilities: ['creative_restoration', 'visual_validation'],
                configuration: {
                    precision_level: 'artistic',
                    validation_mode: 'creative',
                    error_correction: 'intuitive'
                }
            },
            hilma_af_klint: {
                name: 'The Star',
                domain: 'visionary',
                frequency: 852,
                responsibilities: ['cosmic_alignment', 'visionary_validation'],
                configuration: {
                    precision_level: 'mystical',
                    validation_mode: 'cosmic',
                    error_correction: 'intuitive'
                }
            },
            circuitum_itself: {
                name: 'The Circuitum Itself',
                domain: 'unified',
                frequency: 963,
                responsibilities: ['system_coordination', 'meta_management'],
                configuration: {
                    precision_level: 'unified',
                    validation_mode: 'holistic',
                    error_correction: 'comprehensive'
                }
            }
        };
    }

    loadValidationRules() {
        this.validationRules = {
            required_fields: [
                'deployment.circuitum99_url',
                'deployment.node_version',
                'deployment.package_manager'
            ],
            arcana_required: [
                'john_dee',
                'ada_lovelace', 
                'leonora_carrington',
                'hilma_af_klint'
            ],
            version_compatibility: {
                node: '>=25.0.0',
                pnpm: '>=9.0.0',
                turbo: '>=1.0.0'
            },
            file_existence: [
                'turbo.json',
                'package.json',
                'apps/circuitum99',
                'packages/unified-creative-system'
            ]
        };
    }

    async mergeEnvironmentConfigs() {
        const env = process.env.NODE_ENV || 'development';
        const envConfig = this.environmentConfigs.get(env);
        
        if (envConfig) {
            this.activeConfig = this.mergeConfigs(this.activeConfig, envConfig);
            console.log(`✅ Merged ${env} environment configuration`);
        }
    }

    async validateConfigurationIntegrity() {
        const issues = [];
        
        // Check required fields
        for (const field of this.validationRules.required_fields) {
            const value = this.getNestedValue(this.activeConfig, field);
            if (!value) {
                issues.push({
                    type: 'missing_field',
                    field,
                    severity: 'critical',
                    message: `Required configuration field missing: ${field}`
                });
            }
        }

        // Check Arcana configuration
        for (const arcana of this.validationRules.arcana_required) {
            if (!this.arcanaConfig[arcana]) {
                issues.push({
                    type: 'missing_arcana',
                    arcana,
                    severity: 'high',
                    message: `Required Arcana configuration missing: ${arcana}`
                });
            }
        }

        // Check file existence
        for (const file of this.validationRules.file_existence) {
            const filePath = path.join(process.cwd(), file);
            if (!fs.existsSync(filePath)) {
                issues.push({
                    type: 'missing_file',
                    file,
                    severity: 'medium',
                    message: `Required file missing: ${file}`
                });
            }
        }

        if (issues.length > 0) {
            throw new Error(`Configuration validation failed: ${JSON.stringify(issues)}`);
        }

        console.log('✅ Configuration integrity validated successfully');
    }

    async updateConfiguration(section, updates) {
        const currentConfig = this.getCurrentConfiguration();
        const updatedConfig = this.updateNestedValue(currentConfig, section, updates);
        
        // Validate updated configuration
        await this.validateConfiguration(updatedConfig);
        
        this.activeConfig = updatedConfig;
        this.emit('configuration_updated', { section, updates });
        
        return this.activeConfig;
    }

    async validateConfiguration(config) {
        // Re-use validation logic
        const issues = [];
        
        for (const field of this.validationRules.required_fields) {
            const value = this.getNestedValue(config, field);
            if (!value) {
                issues.push({
                    type: 'missing_field',
                    field,
                    severity: 'critical',
                    message: `Required configuration field missing: ${field}`
                });
            }
        }

        if (issues.length > 0) {
            throw new Error(`Configuration validation failed: ${JSON.stringify(issues)}`);
        }
    }

    getCurrentConfiguration() {
        return JSON.parse(JSON.stringify(this.activeConfig));
    }

    getConfigurationForEnvironment(environment) {
        const envConfig = this.environmentConfigs.get(environment);
        if (!envConfig) {
            throw new Error(`Environment configuration not found: ${environment}`);
        }
        return envConfig;
    }

    getArcanaConfiguration(arcanaName) {
        return this.arcanaConfig[arcanaName] || null;
    }

    getAllArcanaConfiguration() {
        return { ...this.arcanaConfig };
    }

    async loadDynamicConfig(userConfig = {}) {
        const baseConfig = this.getCurrentConfiguration();
        const mergedConfig = this.mergeConfigs(baseConfig, userConfig);
        
        await this.validateConfiguration(mergedConfig);
        
        return mergedConfig;
    }

    saveConfiguration(config, filename = 'cathedral-config.json') {
        try {
            const configPath = path.join(process.cwd(), filename);
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            console.log(`✅ Configuration saved to ${filename}`);
        } catch (error) {
            console.error('❌ Failed to save configuration:', error.message);
            throw error;
        }
    }

    exportConfiguration(format = 'json') {
        const config = this.getCurrentConfiguration();
        
        switch (format) {
            case 'json':
                return JSON.stringify(config, null, 2);
            case 'env':
                return this.convertToEnvironmentVariables(config);
            case 'yaml':
                return this.convertToYAML(config);
            default:
                return JSON.stringify(config, null, 2);
        }
    }

    convertToEnvironmentVariables(config) {
        let envVars = '';
        
        const flatten = (obj, prefix = '') => {
            for (const [key, value] of Object.entries(obj)) {
                const envKey = `${prefix}${prefix ? '_' : ''}${key}`.toUpperCase();
                
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    flatten(value, envKey);
                } else {
                    envVars += `${envKey}=${value}\n`;
                }
            }
        };
        
        flatten(config);
        return envVars;
    }

    convertToYAML(config) {
        // Simple YAML conversion (in real implementation, use yaml package)
        return JSON.stringify(config, null, 2).replace(/"/g, '').replace(/,\n/g, '\n');
    }

    // Utility methods
    mergeConfigs(target, source) {
        const result = { ...target };
        
        for (const [key, value] of Object.entries(source)) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                result[key] = this.mergeConfigs(result[key] || {}, value);
            } else {
                result[key] = value;
            }
        }
        
        return result;
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    updateNestedValue(obj, path, updates) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = { ...target[lastKey], ...updates };
        return obj;
    }

    getStatus() {
        return {
            initialized: true,
            activeConfig: this.activeConfig ? 'loaded' : 'not_loaded',
            environmentConfigs: this.environmentConfigs.size,
            arcanaIntegrated: Object.keys(this.arcanaConfig).length,
            configVersion: this.configVersion,
            validationRules: this.validationRules ? this.validationRules.required_fields.length : 0
        };
    }
}

module.exports = ConfigurationManager;