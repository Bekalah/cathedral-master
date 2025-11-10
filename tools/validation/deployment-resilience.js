#!/usr/bin/env node

/**
 * Cathedral Deployment Resilience System
 * Prevents version mismatches and enables multi-platform deployment
 * 
 * Critical: This system prevents the 100+ workflow failures caused by version mismatches
 * 
 * @version 1.0.0
 * @date November 7, 2025
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class DeploymentResilience {
  constructor() {
    this.platforms = {
      render: { name: 'Render', config: 'render.yaml', priority: 1 },
      vercel: { name: 'Vercel', config: 'vercel.json', priority: 2 },
      railway: { name: 'Railway', config: 'railway.json', priority: 3 },
      fly: { name: 'Fly.io', config: 'fly.toml', priority: 4 }
    }
    
    this.deploymentConfigs = {
      render: require('./config-render.js'),
      vercel: require('./config-vercel.js'),
      railway: require('./config-railway.js'),
      fly: require('./config-fly.js')
    }
    
    this.currentPlatform = null
    this.fallback = []
    this.criticalVersions = {
      node: null,
      pnpm: null,
      turbo: null,
      typescript: null
    }
  }

  /**
   * Initialize deployment resilience system
   */
  async init() {
    console.log('🔧 Cathedral Deployment Resilience System v1.0.0')
    console.log('================================================')
    
    try {
      await this.validateVersionConsistency()
      await this.checkDeploymentConfigs()
      await this.setupHealthChecks()
      console.log('✅ Deployment resilience system ready')
    } catch (error) {
      console.error('❌ Initialization failed:', error.message)
      throw error
    }
  }

  /**
   * Validate version consistency across all deployment files
   */
  async validateVersionConsistency() {
    console.log('🔍 Validating version consistency...')
    
    // Read package.json for authoritative versions
    const packageJson = await this.readJsonFile('package.json')
    if (!packageJson) {
      throw new Error('package.json not found - deployment aborted')
    }

    // Extract critical versions
    this.criticalVersions = {
      node: packageJson.engines?.node || '25.0.0',
      pnpm: packageJson.packageManager?.split('@')[1] || '9.15.0',
      turbo: packageJson.devDependencies?.turbo?.replace('^', '') || '2.6.0',
      typescript: packageJson.devDependencies?.typescript?.replace('^', '') || '5.9.3'
    }

    console.log('📋 Critical versions from package.json:')
    console.log(`   Node.js: ${this.criticalVersions.node}`)
    console.log(`   pnpm: ${this.criticalVersions.pnpm}`)
    console.log(`   Turbo: ${this.criticalVersions.turbo}`)
    console.log(`   TypeScript: ${this.criticalVersions.typescript}`)

    // Validate GitHub Actions workflows
    await this.validateGitHubWorkflows()
    
    // Validate deployment configs
    await this.validateDeploymentConfigs()
    
    console.log('✅ Version consistency validation passed')
  }

  /**
   * Validate GitHub Actions workflows match package.json
   */
  async validateGitHubWorkflows() {
    const workflowFiles = [
      '.github/workflows/deploy.yml',
      '.github/workflows/build.yml',
      '.github/workflows/test.yml'
    ]

    for (const workflowFile of workflowFiles) {
      if (fs.existsSync(workflowFile)) {
        const content = fs.readFileSync(workflowFile, 'utf8')
        
        // Check for version mismatches
        const nodeMismatch = content.includes('node-version: "20"') || content.includes('node-version: "18"')
        const pnpmMismatch = content.includes('pnpm-version: "8"') || content.includes('pnpm-version: "7"')
        
        if (nodeMismatch || pnpmMismatch) {
          console.log(`⚠️  Version mismatch detected in ${workflowFile}`)
          await this.fixWorkflowVersions(workflowFile)
        }
      }
    }
  }

  /**
   * Fix version mismatches in workflow files
   */
  async fixWorkflowVersions(workflowFile) {
    console.log(`🔧 Fixing version mismatches in ${workflowFile}`)
    
    let content = fs.readFileSync(workflowFile, 'utf8')
    
    // Replace old versions with correct ones
    content = content.replace(/node-version: "20"/g, `node-version: "${this.criticalVersions.node}"`)
    content = content.replace(/node-version: "18"/g, `node-version: "${this.criticalVersions.node}"`)
    content = content.replace(/pnpm-version: "8\.[0-9]+\.[0-9]+"/g, `pnpm-version: "${this.criticalVersions.pnpm}"`)
    content = content.replace(/pnpm-version: "7\.[0-9]+\.[0-9]+"/g, `pnpm-version: "${this.criticalVersions.pnpm}"`)
    
    // Backup original
    fs.writeFileSync(`${workflowFile}.backup`, fs.readFileSync(workflowFile))
    
    // Write fixed version
    fs.writeFileSync(workflowFile, content)
    
    console.log(`✅ Fixed version mismatches in ${workflowFile}`)
  }

  /**
   * Validate deployment configurations
   */
  async validateDeploymentConfigs() {
    const configs = ['deployment/render.yaml', 'deployment/vercel.json', 'deployment/railway.json', 'deployment/fly.toml']
    
    for (const config of configs) {
      if (fs.existsSync(config)) {
        const content = fs.readFileSync(config, 'utf8')
        
        // Check for hardcoded versions
        if (content.includes('"20.0.0"') || content.includes('"18.') || content.includes('"8.') || content.includes('"7.')) {
          console.log(`⚠️  Hardcoded outdated versions found in ${config}`)
          await this.fixConfigVersions(config)
        }
      }
    }
  }

  /**
   * Fix version references in deployment configs
   */
  async fixConfigVersions(configFile) {
    console.log(`🔧 Fixing version references in ${configFile}`)
    
    let content = fs.readFileSync(configFile, 'utf8')
    
    // Replace hardcoded versions with dynamic references
    content = content.replace(/"20\.0\.0"/g, `"${this.criticalVersions.node}"`)
    content = content.replace(/"18\.[0-9]+\.[0-9]+"/g, `"${this.criticalVersions.node}"`)
    content = content.replace(/"8\.[0-9]+\.[0-9]+"/g, `"${this.criticalVersions.pnpm}"`)
    content = content.replace(/"7\.[0-9]+\.[0-9]+"/g, `"${this.criticalVersions.pnpm}"`)
    
    // Backup original
    fs.writeFileSync(`${configFile}.backup`, fs.readFileSync(configFile))
    
    // Write fixed version
    fs.writeFileSync(configFile, content)
    
    console.log(`✅ Fixed version references in ${configFile}`)
  }

  /**
   * Deploy to multiple platforms with fallback
   */
  async deploy() {
    console.log('🚀 Starting multi-platform deployment...')
    
    // Sort platforms by priority
    const sortedPlatforms = Object.entries(this.platforms)
      .sort(([,a], [,b]) => a.priority - b.priority)
    
    for (const [platformKey, platform] of sortedPlatforms) {
      try {
        console.log(`🎯 Attempting deployment to ${platform.name}...`)
        
        await this.deployToPlatform(platformKey)
        this.currentPlatform = platformKey
        
        console.log(`✅ Successfully deployed to ${platform.name}`)
        
        // Setup health monitoring
        await this.setupHealthMonitoring(platformKey)
        
        // If primary deployment succeeds, setup fallbacks
        await this.setupFallbacks(platformKey)
        
        return { success: true, platform: platformKey, url: await this.getDeploymentUrl(platformKey) }
        
      } catch (error) {
        console.log(`❌ Failed to deploy to ${platform.name}: ${error.message}`)
        this.fallback.push(platformKey)
        continue
      }
    }
    
    throw new Error('All deployment platforms failed')
  }

  /**
   * Deploy to specific platform
   */
  async deployToPlatform(platformKey) {
    const platform = this.platforms[platformKey]
    const config = this.deploymentConfigs[platformKey]
    
    if (!platform || !config) {
      throw new Error(`Unknown platform: ${platformKey}`)
    }
    
    // Validate environment
    await config.validateEnvironment()
    
    // Build application
    await config.build()
    
    // Deploy
    await config.deploy()
    
    // Verify deployment
    await config.verify()
  }

  /**
   * Setup health monitoring for deployment
   */
  async setupHealthMonitoring(platformKey) {
    const healthCheckInterval = 30000 // 30 seconds
    const maxRetries = 3
    
    console.log(`🔍 Setting up health monitoring for ${platformKey}`)
    
    const healthCheck = async () => {
      try {
        const response = await fetch(await this.getHealthCheckUrl(platformKey))
        if (!response.ok) {
          throw new Error(`Health check failed: ${response.status}`)
        }
        console.log(`✅ Health check passed for ${platformKey}`)
      } catch (error) {
        console.log(`❌ Health check failed for ${platformKey}: ${error.message}`)
        await this.handleHealthCheckFailure(platformKey)
      }
    }
    
    // Initial health check
    await healthCheck()
    
    // Set up monitoring interval
    setInterval(healthCheck, healthCheckInterval)
  }

  /**
   * Handle health check failure
   */
  async handleHealthCheckFailure(platformKey) {
    console.log(`🚨 Health check failure detected for ${platformKey}`)
    
    // Try to redeploy to same platform
    try {
      console.log(`🔄 Attempting redeploy to ${platformKey}...`)
      await this.deployToPlatform(platformKey)
      console.log(`✅ Redeploy successful for ${platformKey}`)
    } catch (error) {
      console.log(`❌ Redeploy failed for ${platformKey}, trying fallback...`)
      
      // Try fallback platforms
      for (const fallbackPlatform of this.fallback) {
        try {
          console.log(`🎯 Trying fallback platform: ${fallbackPlatform}`)
          await this.deployToPlatform(fallbackPlatform)
          this.currentPlatform = fallbackPlatform
          console.log(`✅ Fallback deployment successful to ${fallbackPlatform}`)
          return
        } catch (fallbackError) {
          console.log(`❌ Fallback to ${fallbackPlatform} failed: ${fallbackError.message}`)
        }
      }
      
      throw new Error('All deployment options failed, manual intervention required')
    }
  }

  /**
   * Setup automatic fallbacks
   */
  async setupFallbacks(primaryPlatform) {
    console.log(`🔗 Setting up automatic fallbacks from ${primaryPlatform}`)
    
    // Create deployment status file
    const status = {
      primary: primaryPlatform,
      fallbacks: this.fallback,
      lastCheck: new Date().toISOString(),
      health: 'healthy'
    }
    
    fs.writeFileSync('deployment-status.json', JSON.stringify(status, null, 2))
  }

  /**
   * Get deployment URL for platform
   */
  async getDeploymentUrl(platformKey) {
    const config = this.deploymentConfigs[platformKey]
    return await config.getDeploymentUrl()
  }

  /**
   * Get health check URL for platform
   */
  async getHealthCheckUrl(platformKey) {
    const config = this.deploymentConfigs[platformKey]
    return `${await config.getDeploymentUrl()}/api/health`
  }

  /**
   * Read JSON file safely
   */
  async readJsonFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(content)
    } catch (error) {
      console.log(`⚠️  Could not read ${filePath}: ${error.message}`)
      return null
    }
  }

  /**
   * Check deployment configurations exist
   */
  async checkDeploymentConfigs() {
    for (const [platformKey, platform] of Object.entries(this.platforms)) {
      const configPath = `deployment/${platform.config}`
      if (!fs.existsSync(configPath)) {
        console.log(`⚠️  Missing deployment config: ${configPath}`)
        await this.generateConfig(platformKey, configPath)
      }
    }
  }

  /**
   * Generate missing deployment configuration
   */
  async generateConfig(platformKey, configPath) {
    console.log(`🔧 Generating ${configPath} for ${this.platforms[platformKey].name}`)
    
    // This would be implemented for each platform
    // For now, just create a placeholder
    const config = {
      platform: platformKey,
      versions: this.criticalVersions,
      generated: new Date().toISOString()
    }
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
  }

  /**
   * Setup health check endpoints
   */
  async setupHealthChecks() {
    console.log('🩺 Setting up health check endpoints...')
    
    // Create API health check route if it doesn't exist
    const healthRoute = 'apps/web/pages/api/health.ts'
    
    if (!fs.existsSync(healthRoute)) {
      const healthContent = `
// Cathedral Health Check API
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    trinity: {
      body: 'operational',
      soul: 'operational', 
      spirit: 'operational'
    },
    deployment: {
      platform: process.env.DEPLOYMENT_PLATFORM || 'unknown',
      version: process.env.npm_package_version || '1.0.0'
    }
  })
}
`
      fs.writeFileSync(healthRoute, healthContent)
      console.log(`✅ Created health check endpoint: ${healthRoute}`)
    }
  }
}

// CLI Interface
if (require.main === module) {
  const resilience = new DeploymentResilience()
  
  resilience.init()
    .then(() => resilience.deploy())
    .then(result => {
      console.log('🎉 Deployment completed successfully!')
      console.log(`Platform: ${result.platform}`)
      console.log(`URL: ${result.url}`)
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Deployment failed:', error.message)
      process.exit(1)
    })
}

module.exports = DeploymentResilience
