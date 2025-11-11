#!/usr/bin/env node

/**
 * Cathedral Build System Validation Script
 * 
 * Tests the enhanced build system with fixes for:
 * - packages/luxcrux TypeScript source resolution
 * - mystical-sound-engine integration
 * - Turbo configuration optimization
 * - TypeScript project references
 * 
 * @author Build System Optimizer
 * @version 1.0.0
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class BuildSystemValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.successes = [];
  }

  log(type, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${type}: ${message}`;
    
    console.log(logEntry);
    
    switch (type) {
      case 'ERROR':
        this.errors.push(message);
        break;
      case 'WARNING':
        this.warnings.push(message);
        break;
      case 'SUCCESS':
        this.successes.push(message);
        break;
    }
  }

  async validateFileStructure() {
    this.log('INFO', 'Validating file structure...');

    const requiredFiles = [
      'tsconfig.json',
      'turbo.json',
      'package.json',
      'packages/luxcrux/package.json',
      'packages/luxcrux/src/index.ts',
      'packages/mystical-sound-engine/package.json',
      'packages/mystical-sound-engine/src/index.ts'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        this.log('SUCCESS', `Found: ${file}`);
      } else {
        this.log('ERROR', `Missing: ${file}`);
      }
    }
  }

  async validateTypeScriptConfig() {
    this.log('INFO', 'Validating TypeScript configuration...');

    try {
      const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      
      // Check for project references
      if (tsconfig.references) {
        const hasLuxcrux = tsconfig.references.some(ref => ref.path === 'packages/luxcrux');
        const hasMysticalSound = tsconfig.references.some(ref => ref.path === 'packages/mystical-sound-engine');
        
        if (hasLuxcrux) {
          this.log('SUCCESS', 'luxcrux package included in TypeScript references');
        } else {
          this.log('ERROR', 'luxcrux package missing from TypeScript references');
        }

        if (hasMysticalSound) {
          this.log('SUCCESS', 'mystical-sound-engine package included in TypeScript references');
        } else {
          this.log('ERROR', 'mystical-sound-engine package missing from TypeScript references');
        }
      }

      // Check for ignoreDeprecations configuration
      if (tsconfig.compilerOptions && tsconfig.compilerOptions.ignoreDeprecations) {
        this.log('SUCCESS', 'ignoreDeprecations configuration found');
      } else {
        this.log('WARNING', 'ignoreDeprecations configuration not found');
      }

    } catch (error) {
      this.log('ERROR', `Failed to parse tsconfig.json: ${error.message}`);
    }
  }

  async validateTurboConfig() {
    this.log('INFO', 'Validating Turbo configuration...');

    try {
      const turboConfig = JSON.parse(fs.readFileSync('turbo.json', 'utf8'));
      
      if (turboConfig.tasks && turboConfig.tasks.build) {
        this.log('SUCCESS', 'Turbo build task configured');
      } else {
        this.log('WARNING', 'Turbo build task not configured');
      }

      if (turboConfig.globalPassThroughEnv) {
        this.log('SUCCESS', 'Turbo environment variables configured');
      } else {
        this.log('WARNING', 'Turbo environment variables not configured');
      }

    } catch (error) {
      this.log('ERROR', `Failed to parse turbo.json: ${error.message}`);
    }
  }

  async validatePackageStructure() {
    this.log('INFO', 'Validating package structure...');

    // Check luxcrux package
    try {
      const luxcruxPackage = JSON.parse(fs.readFileSync('packages/luxcrux/package.json', 'utf8'));
      
      if (luxcruxPackage.name === '@cathedral/luxcrux') {
        this.log('SUCCESS', 'luxcrux package name correct');
      } else {
        this.log('ERROR', 'luxcrux package name incorrect');
      }

    } catch (error) {
      this.log('ERROR', `Failed to read luxcrux package.json: ${error.message}`);
    }

    // Check mystical-sound-engine package
    try {
      const mysticalPackage = JSON.parse(fs.readFileSync('packages/mystical-sound-engine/package.json', 'utf8'));
      
      if (mysticalPackage.name === '@cathedral/mystical-sound-engine') {
        this.log('SUCCESS', 'mystical-sound-engine package name correct');
      } else {
        this.log('ERROR', 'mystical-sound-engine package name incorrect');
      }

    } catch (error) {
      this.log('ERROR', `Failed to read mystical-sound-engine package.json: ${error.message}`);
    }
  }

  async testTypeScriptCompilation() {
    this.log('INFO', 'Testing TypeScript compilation...');

    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      this.log('SUCCESS', 'TypeScript compilation successful');
    } catch (error) {
      this.log('ERROR', `TypeScript compilation failed: ${error.message}`);
    }
  }

  async testTurboBuild() {
    this.log('INFO', 'Testing Turbo build...');

    try {
      execSync('npx turbo run build --dry-run', { stdio: 'pipe' });
      this.log('SUCCESS', 'Turbo build configuration valid');
    } catch (error) {
      this.log('ERROR', `Turbo build failed: ${error.message}`);
    }
  }

  async run() {
    console.log('🔍 Cathedral Build System Validation\n');
    
    await this.validateFileStructure();
    console.log('');
    
    await this.validateTypeScriptConfig();
    console.log('');
    
    await this.validateTurboConfig();
    console.log('');
    
    await this.validatePackageStructure();
    console.log('');
    
    await this.testTypeScriptCompilation();
    console.log('');
    
    await this.testTurboBuild();
    console.log('');

    // Final report
    console.log('📊 Build System Validation Report\n');
    console.log(`✅ Successes: ${this.successes.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log('');

    if (this.errors.length > 0) {
      console.log('🚨 Critical Issues Found:');
      this.errors.forEach(error => console.log(`  • ${error}`));
      process.exit(1);
    } else {
      console.log('🎉 Build system validation passed!');
    }
  }
}

// Run validation
if (require.main === module) {
  const validator = new BuildSystemValidator();
  validator.run().catch(error => {
    console.error('💥 Validation script failed:', error);
    process.exit(1);
  });
}

module.exports = BuildSystemValidator;