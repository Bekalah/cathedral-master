#!/usr/bin/env node
/**
 * Cathedral Online/Offline Version Tracking System
 * Tracks versions across all platforms: Render, Vercel, Cloudflare, Godot 4.5, Rust, Bevy
 * Ensures consistency between local and online deployments
 */

import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';

class CathedralVersionTracker {
    constructor() {
        this.versionFile = './versions/VERSION_MANIFEST.json';
        this.platforms = {
            render: './deployment-configs/render.yaml',
            vercel: './deployment-configs/vercel.json',
            cloudflare: './apps/web/wrangler.toml',
            godot: './godot/project.godot',
            rust: './rust-engines/Cargo.toml',
            node: './package.json',
            turbo: './turbo.json'
        };
    }

    async initialize() {
        // Create versions directory
        await fs.mkdir('./versions', { recursive: true });
        console.log('🔄 Cathedral Version Tracker initialized');
    }

    async getCurrentVersions() {
        const versions = {
            timestamp: new Date().toISOString(),
            node: await this.getNodeVersion(),
            npm: await this.getNpmVersion(),
            pnpm: await this.getPnpmVersion(),
            turbo: await this.getTurboVersion(),
            godot: await this.getGodotVersion(),
            rust: await this.getRustVersion(),
            bevy: await this.getBevyVersion(),
            platforms: {
                render: await this.getRenderConfig(),
                vercel: await this.getVercelConfig(),
                cloudflare: await this.getCloudflareConfig()
            }
        };

        return versions;
    }

    async getNodeVersion() {
        try {
            const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf8'));
            return {
                required: packageJson.engines?.node || '25.0.0+',
                current: process.version,
                isUpToDate: this.isVersionUpToDate(process.version, '25.0.0')
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getNpmVersion() {
        try {
            const { execSync } = await import('child_process');
            const version = execSync('npm --version', { encoding: 'utf8' }).trim();
            return {
                current: version,
                isUpToDate: this.isVersionUpToDate(version, '10.0.0')
            };
        } catch (error) {
            return { error: 'npm not found' };
        }
    }

    async getPnpmVersion() {
        try {
            const { execSync } = await import('child_process');
            const version = execSync('pnpm --version', { encoding: 'utf8' }).trim();
            const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf8'));
            const required = packageJson.packageManager?.split('@')[1] || '9.15.0';
            
            return {
                current: version,
                required: required,
                isUpToDate: this.isVersionUpToDate(version, required)
            };
        } catch (error) {
            return { error: 'pnpm not found' };
        }
    }

    async getTurboVersion() {
        try {
            const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf8'));
            return {
                required: packageJson.devDependencies?.turbo || '2.0.0+',
                current: packageJson.devDependencies?.turbo || 'not installed'
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getGodotVersion() {
        try {
            const projectGodot = await fs.readFile('./godot/project.godot', 'utf8');
            const versionMatch = projectGodot.match(/config\/version="([^"]+)"/);
            const featuresMatch = projectGodot.match(/config\/features=PackedStringArray\("([^"]+)"/);
            
            return {
                project: versionMatch ? versionMatch[1] : 'unknown',
                features: featuresMatch ? featuresMatch[1] : 'unknown',
                target: '4.5.0',
                isCorrect: this.isGodotCorrect(projectGodot)
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getRustVersion() {
        try {
            const { execSync } = await import('child_process');
            const version = execSync('rustc --version', { encoding: 'utf8' }).trim();
            return {
                current: version,
                target: '1.70.0+',
                isUpToDate: this.isVersionUpToDate(version, '1.70.0')
            };
        } catch (error) {
            return { error: 'rust not found' };
        }
    }

    async getBevyVersion() {
        try {
            const cargoToml = await fs.readFile('./rust-engines/Cargo.toml', 'utf8');
            const bevyMatch = cargoToml.match(/bevy\s*=\s*"([^"]+)"/);
            return {
                current: bevyMatch ? bevyMatch[1] : 'not found',
                target: '0.14.0',
                isUpToDate: bevyMatch ? this.isVersionUpToDate(bevyMatch[1], '0.14.0') : false
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getRenderConfig() {
        try {
            const config = await fs.readFile('./deployment-configs/render.yaml', 'utf8');
            return {
                exists: true,
                content: config,
                isEmpty: config.trim().length === 0
            };
        } catch (error) {
            return { exists: false, error: error.message };
        }
    }

    async getVercelConfig() {
        try {
            const config = await fs.readFile('./deployment-configs/vercel.json', 'utf8');
            return {
                exists: true,
                content: config,
                isEmpty: config.trim().length === 0
            };
        } catch (error) {
            return { exists: false, error: error.message };
        }
    }

    async getCloudflareConfig() {
        try {
            const config = await fs.readFile('./apps/web/wrangler.toml', 'utf8');
            const nodeVersionMatch = config.match(/NODE_VERSION\s*=\s*"([^"]+)"/);
            return {
                exists: true,
                content: config,
                nodeVersion: nodeVersionMatch ? nodeVersionMatch[1] : 'unknown',
                needsUpdate: nodeVersionMatch ? !this.isVersionUpToDate(nodeVersionMatch[1], '25') : true
            };
        } catch (error) {
            return { exists: false, error: error.message };
        }
    }

    isVersionUpToDate(current, required) {
        if (!current || !required) return false;
        
        // Simple version comparison for major.minor.patch
        const currentParts = current.replace(/[^\d.]/g, '').split('.').map(Number);
        const requiredParts = required.replace(/[^\d.]/g, '').split('.').map(Number);
        
        for (let i = 0; i < Math.max(currentParts.length, requiredParts.length); i++) {
            const currentPart = currentParts[i] || 0;
            const requiredPart = requiredParts[i] || 0;
            
            if (currentPart > requiredPart) return true;
            if (currentPart < requiredPart) return false;
        }
        return true;
    }

    isGodotCorrect(config) {
        return config.includes('config/features=PackedStringArray("4.5"') || 
               config.includes('config/features=PackedStringArray("4.4"') ||
               config.includes('config/features=PackedStringArray("4.2"');
    }

    async saveVersionManifest(versions) {
        const manifest = {
            ...versions,
            manifestVersion: '1.0.0',
            lastUpdated: new Date().toISOString()
        };

        await fs.writeFile(this.versionFile, JSON.stringify(manifest, null, 2));
        console.log('💾 Version manifest saved to', this.versionFile);
        return manifest;
    }

    async checkForUpdates() {
        const versions = await this.getCurrentVersions();
        const issues = [];
        const recommendations = [];

        // Check Node.js
        if (!versions.node.isUpToDate) {
            issues.push('Node.js version is outdated');
            recommendations.push('Update to Node.js 25+ for best performance');
        }

        // Check pnpm
        if (versions.pnpm.error || !versions.pnpm.isUpToDate) {
            issues.push('pnpm version mismatch');
            recommendations.push('Ensure pnpm matches package.json requirements');
        }

        // Check Godot
        if (versions.godot.error || !versions.godot.isCorrect) {
            issues.push('Godot version may be incorrect');
            recommendations.push('Update to Godot 4.5 for latest features');
        }

        // Check Rust/Bevy
        if (versions.bevy.error || !versions.bevy.isUpToDate) {
            issues.push('Bevy version may be outdated');
            recommendations.push('Update to Bevy 0.14.0 for latest features');
        }

        // Check deployment configs
        if (!versions.platforms.render.exists || versions.platforms.render.isEmpty) {
            issues.push('Render configuration is missing or empty');
            recommendations.push('Configure Render deployment settings');
        }

        if (!versions.platforms.vercel.exists || versions.platforms.vercel.isEmpty) {
            issues.push('Vercel configuration is missing or empty');
            recommendations.push('Configure Vercel deployment settings');
        }

        if (versions.platforms.cloudflare.needsUpdate) {
            issues.push('Cloudflare Node.js version needs update');
            recommendations.push('Update Cloudflare to use Node.js 25+');
        }

        return { issues, recommendations, versions };
    }

    async generateDeploymentReport() {
        const { issues, recommendations, versions } = await this.checkForUpdates();
        
        const report = {
            timestamp: new Date().toISOString(),
            status: issues.length === 0 ? 'HEALTHY' : 'ISSUES_FOUND',
            issues,
            recommendations,
            versions,
            nextSteps: this.generateNextSteps(issues)
        };

        await fs.writeFile('./versions/DEPLOYMENT_REPORT.json', JSON.stringify(report, null, 2));
        return report;
    }

    generateNextSteps(issues) {
        if (issues.length === 0) {
            return [
                'All versions are up to date',
                'Ready for deployment to all platforms',
                'Run: npm run cathedral-full-stack to generate content',
                'Deploy using platform-specific commands'
            ];
        }

        const steps = [];
        
        if (issues.some(i => i.includes('Node.js'))) {
            steps.push('Update Node.js to v25 or later');
        }
        
        if (issues.some(i => i.includes('Godot'))) {
            steps.push('Update Godot to v4.5.0');
        }
        
        if (issues.some(i => i.includes('Render') || i.includes('Vercel'))) {
            steps.push('Configure deployment platforms using templates');
        }
        
        steps.push('Run version check again after updates');
        steps.push('Execute cathedral-full-stack to generate content');
        steps.push('Deploy to all platforms');

        return steps;
    }

    async exportForPlatform(platform) {
        const versions = await this.getCurrentVersions();
        
        switch (platform) {
            case 'render':
                return this.generateRenderConfig(versions);
            case 'vercel':
                return this.generateVercelConfig(versions);
            case 'cloudflare':
                return this.generateCloudflareConfig(versions);
            default:
                throw new Error(`Unknown platform: ${platform}`);
        }
    }

    generateRenderConfig(versions) {
        return {
            services: [
                {
                    name: "cathedral-web",
                    env: "node",
                    plan: "free",
                    buildCommand: "npm run build",
                    startCommand: "npm run start",
                    envVars: [
                        {
                            key: "NODE_VERSION",
                            value: "25"
                        },
                        {
                            key: "NPM_VERSION",
                            value: "10"
                        }
                    ]
                }
            ]
        };
    }

    generateVercelConfig(versions) {
        return {
            framework: "nextjs",
            version: 2,
            buildCommand: "npm run build",
            outputDirectory: "apps/web/out",
            installCommand: "npm install",
            env: {
                NODE_VERSION: "25",
                NEXT_PUBLIC_VERSION: versions.node.current
            },
            functions: {
                "app/api/**/*.js": {
                    runtime: "nodejs25.x"
                }
            }
        };
    }

    generateCloudflareConfig(versions) {
        return {
            name: "avalon-labs",
            compatibility_date: "2024-01-01",
            build: {
                command: "npm run build",
                cwd: "."
            },
            vars: {
                NODE_VERSION: "25",
                PLATFORM: "cloudflare"
            },
            env: {
                production: {
                    vars: {
                        NODE_ENV: "production",
                        PLATFORM: "cloudflare"
                    }
                }
            }
        };
    }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const tracker = new CathedralVersionTracker();
    
    async function main() {
        const command = process.argv[2];
        
        try {
            await tracker.initialize();
            
            switch (command) {
                case 'check':
                    const report = await tracker.generateDeploymentReport();
                    console.log('📊 Cathedral Version Report:');
                    console.log(`Status: ${report.status}`);
                    console.log(`Issues: ${report.issues.length}`);
                    console.log(`Recommendations: ${report.recommendations.length}`);
                    if (report.issues.length > 0) {
                        console.log('\n🔴 Issues Found:');
                        report.issues.forEach(issue => console.log(`  - ${issue}`));
                    }
                    break;
                    
                case 'export':
                    const platform = process.argv[3];
                    if (!platform) {
                        console.log('Usage: node tracker.js export <render|vercel|cloudflare>');
                        process.exit(1);
                    }
                    const config = await tracker.exportForPlatform(platform);
                    console.log(`📤 ${platform} configuration:`, JSON.stringify(config, null, 2));
                    break;
                    
                case 'versions':
                    const versions = await tracker.getCurrentVersions();
                    console.log('📋 Current Versions:');
                    console.log(JSON.stringify(versions, null, 2));
                    break;
                    
                default:
                    const defaultReport = await tracker.generateDeploymentReport();
                    console.log('🏛️ Cathedral Version Tracker');
                    console.log(`Status: ${defaultReport.status}`);
                    console.log(`Last Updated: ${defaultReport.timestamp}`);
            }
            
        } catch (error) {
            console.error('❌ Version tracking failed:', error);
            process.exit(1);
        }
    }
    
    main();
}

export default CathedralVersionTracker;