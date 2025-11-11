/**
 * Cathedral of Circuits - Real-Time Deployment Monitor
 * 
 * Comprehensive monitoring system with online/offline status tracking,
 * performance monitoring, and integration with the 22 Living Arcana system.
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */

const EventEmitter = require('events');
const http = require('http');
const https = require('https');
const { URL } = require('url');

class RealTimeMonitor extends EventEmitter {
    constructor() {
        super();
        this.services = new Map();
        this.monitoringIntervals = new Map();
        this.metrics = new Map();
        this.alerts = [];
        this.arcanaServices = [];
        
        this.initializeMonitoring();
    }

    initializeMonitoring() {
        console.log('👁️ Initializing Real-Time Deployment Monitor...');
        
        // Define Cathedral services to monitor
        this.services.set('circuitum99', {
            url: 'https://bekalah.github.io/circuitum99',
            name: 'Circuitum 99 - Canonical Deployment',
            type: 'primary',
            checkInterval: 30000, // 30 seconds
            expectedResponseTime: 2000, // 2 seconds
            arcana: 'The Circuitum Itself'
        });

        this.services.set('cathedral-web', {
            url: 'https://bekalah.github.io/cathedral',
            name: 'Cathedral Web Platform',
            type: 'primary',
            checkInterval: 45000,
            expectedResponseTime: 3000,
            arcana: 'The World'
        });

        this.services.set('database', {
            url: 'sqlite://./cathedral-data/cathedral-design-suite.db',
            name: 'Cathedral SQLite Database',
            type: 'infrastructure',
            checkInterval: 60000,
            expectedResponseTime: 500,
            arcana: 'The High Priestess'
        });

        this.services.set('unified-engine', {
            url: 'internal://unified-creative-system',
            name: 'Unified Creative Engine',
            type: 'application',
            checkInterval: 15000,
            expectedResponseTime: 1000,
            arcana: 'The Magician'
        });
    }

    async start() {
        console.log('🚀 Starting comprehensive monitoring...');
        
        for (const [serviceId, config] of this.services) {
            await this.startServiceMonitoring(serviceId, config);
        }

        this.startMetricsCollection();
        this.startAlertSystem();
    }

    async startServiceMonitoring(serviceId, config) {
        console.log(`🔍 Starting monitoring for ${config.name}...`);
        
        const intervalId = setInterval(async () => {
            try {
                const result = await this.checkService(serviceId, config);
                this.updateServiceStatus(serviceId, result);
                
                if (result.status === 'offline' || result.responseTime > config.expectedResponseTime) {
                    this.emitAlert(serviceId, result);
                }
            } catch (error) {
                this.handleServiceError(serviceId, error);
            }
        }, config.checkInterval);

        this.monitoringIntervals.set(serviceId, intervalId);
    }

    async checkService(serviceId, config) {
        const startTime = Date.now();
        
        try {
            if (config.url.startsWith('http')) {
                return await this.checkHttpService(config.url, config);
            } else if (config.url.startsWith('sqlite')) {
                return await this.checkDatabaseService(config);
            } else if (config.url.startsWith('internal')) {
                return await this.checkInternalService(serviceId, config);
            }
        } catch (error) {
            return {
                status: 'error',
                error: error.message,
                responseTime: Date.now() - startTime,
                timestamp: new Date().toISOString()
            };
        }

        return {
            status: 'unknown',
            responseTime: Date.now() - startTime,
            timestamp: new Date().toISOString()
        };
    }

    async checkHttpService(url, config) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const urlObj = new URL(url);
            const options = {
                hostname: urlObj.hostname,
                port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
                path: urlObj.pathname,
                method: 'GET',
                timeout: 10000
            };

            const request = (urlObj.protocol === 'https:' ? https : http).request(options, (res) => {
                const responseTime = Date.now() - startTime;
                
                resolve({
                    status: res.statusCode === 200 ? 'online' : 'degraded',
                    statusCode: res.statusCode,
                    responseTime,
                    headers: res.headers,
                    timestamp: new Date().toISOString()
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.on('timeout', () => {
                request.destroy();
                reject(new Error('Request timeout'));
            });

            request.end();
        });
    }

    async checkDatabaseService(config) {
        const startTime = Date.now();
        
        try {
            // In real implementation, this would check actual database connectivity
            // For now, simulate database check
            const dbPath = config.url.replace('sqlite://', '');
            const fs = require('fs');
            
            if (fs.existsSync(dbPath)) {
                const stats = fs.statSync(dbPath);
                return {
                    status: 'online',
                    responseTime: Date.now() - startTime,
                    database: 'SQLite',
                    size: stats.size,
                    modified: stats.mtime,
                    timestamp: new Date().toISOString()
                };
            } else {
                throw new Error('Database file not found');
            }
        } catch (error) {
            return {
                status: 'offline',
                responseTime: Date.now() - startTime,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    async checkInternalService(serviceId, config) {
        const startTime = Date.now();
        
        try {
            // Check internal services like Unified Creative Engine
            if (serviceId === 'unified-engine') {
                // Simulate checking if Unified Creative Engine is running
                return {
                    status: 'online',
                    responseTime: Date.now() - startTime,
                    service: 'Unified Creative Engine',
                    unified: true,
                    science_art_music_unity: true,
                    timestamp: new Date().toISOString()
                };
            }
        } catch (error) {
            return {
                status: 'error',
                responseTime: Date.now() - startTime,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }

        return {
            status: 'unknown',
            responseTime: Date.now() - startTime,
            timestamp: new Date().toISOString()
        };
    }

    updateServiceStatus(serviceId, result) {
        const existing = this.services.get(serviceId);
        if (existing) {
            existing.lastCheck = result;
            existing.lastUpdated = new Date().toISOString();
            
            this.emit('status_change', {
                service: serviceId,
                status: result.status,
                result,
                arcana: existing.arcana
            });
        }
    }

    handleServiceError(serviceId, error) {
        const errorEvent = {
            service: serviceId,
            error: error.message,
            timestamp: new Date().toISOString()
        };

        this.emit('error_detected', errorEvent);
        this.updateServiceStatus(serviceId, {
            status: 'error',
            error: error.message,
            timestamp: errorEvent.timestamp
        });
    }

    emitAlert(serviceId, result) {
        const service = this.services.get(serviceId);
        const alert = {
            id: `alert-${Date.now()}`,
            service: serviceId,
            serviceName: service.name,
            type: this.determineAlertType(result),
            message: this.generateAlertMessage(serviceId, result),
            severity: this.determineSeverity(result),
            arcana: service.arcana,
            timestamp: new Date().toISOString(),
            acknowledged: false
        };

        this.alerts.push(alert);
        this.emit('alert_generated', alert);
    }

    determineAlertType(result) {
        if (result.status === 'offline') return 'service_down';
        if (result.status === 'error') return 'service_error';
        if (result.responseTime > 5000) return 'performance_degraded';
        return 'service_warning';
    }

    generateAlertMessage(serviceId, result) {
        const service = this.services.get(serviceId);
        
        switch (result.status) {
            case 'offline':
                return `${service.name} is currently offline. The ${service.arcana} Arcana influence may be disrupted.`;
            case 'error':
                return `${service.name} is experiencing errors: ${result.error}`;
            case 'degraded':
                return `${service.name} performance is degraded (${result.statusCode} status code).`;
            default:
                return `${service.name} monitoring alert triggered.`;
        }
    }

    determineSeverity(result) {
        if (result.status === 'offline') return 'critical';
        if (result.status === 'error') return 'high';
        if (result.responseTime > 10000) return 'high';
        if (result.status === 'degraded') return 'medium';
        return 'low';
    }

    startMetricsCollection() {
        setInterval(() => {
            this.collectSystemMetrics();
        }, 60000); // Every minute
    }

    collectSystemMetrics() {
        const metrics = {
            timestamp: new Date().toISOString(),
            services_online: 0,
            services_offline: 0,
            average_response_time: 0,
            total_alerts: this.alerts.length,
            unacknowledged_alerts: this.alerts.filter(a => !a.acknowledged).length
        };

        let totalResponseTime = 0;
        let responseTimeCount = 0;

        for (const [serviceId, service] of this.services) {
            if (service.lastCheck) {
                if (service.lastCheck.status === 'online') {
                    metrics.services_online++;
                } else {
                    metrics.services_offline++;
                }

                if (service.lastCheck.responseTime) {
                    totalResponseTime += service.lastCheck.responseTime;
                    responseTimeCount++;
                }
            }
        }

        metrics.average_response_time = responseTimeCount > 0 
            ? Math.round(totalResponseTime / responseTimeCount) 
            : 0;

        this.metrics.set('system', metrics);
        this.emit('metrics_updated', metrics);
    }

    startAlertSystem() {
        // Monitor for critical alerts and take action
        setInterval(() => {
            this.processAlerts();
        }, 30000); // Every 30 seconds
    }

    processAlerts() {
        const criticalAlerts = this.alerts.filter(a => 
            a.severity === 'critical' && !a.acknowledged
        );

        for (const alert of criticalAlerts) {
            this.handleCriticalAlert(alert);
        }
    }

    handleCriticalAlert(alert) {
        console.error(`🚨 CRITICAL ALERT: ${alert.serviceName} - ${alert.message}`);
        
        // In a real implementation, this could:
        // - Send notifications
        // - Trigger auto-recovery
        // - Update status pages
        // - Page on-call team
        
        this.emit('critical_alert', alert);
    }

    getStatus() {
        const services = {};
        for (const [serviceId, service] of this.services) {
            services[serviceId] = {
                ...service,
                status: service.lastCheck?.status || 'unknown',
                responseTime: service.lastCheck?.responseTime || 0
            };
        }

        return {
            monitoring_active: this.monitoringIntervals.size > 0,
            services_tracked: this.services.size,
            services,
            metrics: this.metrics.get('system'),
            recent_alerts: this.alerts.slice(-10)
        };
    }

    acknowledgeAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.acknowledged = true;
            alert.acknowledgedAt = new Date().toISOString();
            this.emit('alert_acknowledged', alert);
        }
    }

    getArcanaStatus() {
        // Return status for each Arcana-related service
        return {
            john_dee: this.getServiceStatus('unified-engine'), // The Magician
            ada_lovelace: this.getServiceStatus('database'), // The High Priestess  
            leonora_carrington: this.getServiceStatus('circuitum99'), // The Fool
            hilma_af_klint: this.getServiceStatus('cathedral-web') // The Star
        };
    }

    getServiceStatus(serviceId) {
        const service = this.services.get(serviceId);
        if (!service) return { status: 'unknown' };

        return {
            status: service.lastCheck?.status || 'unknown',
            arcana: service.arcana,
            responseTime: service.lastCheck?.responseTime || 0,
            lastUpdated: service.lastUpdated
        };
    }

    stop() {
        for (const intervalId of this.monitoringIntervals.values()) {
            clearInterval(intervalId);
        }
        this.monitoringIntervals.clear();
        console.log('🛑 Monitoring stopped');
    }
}

module.exports = RealTimeMonitor;