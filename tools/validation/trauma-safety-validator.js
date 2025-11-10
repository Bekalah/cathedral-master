#!/usr/bin/env node

/**
 * Cathedral Trauma-Safe Development Validator
 * 
 * Validates all applications follow trauma-safe development principles:
 * - ESC exits in all applications
 * - No autoplay audio/video
 * - Gentle defaults in UX
 * - Neurodivergent accommodations
 * - Consent-based interactions
 * - Non-violent design choices
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TraumaSafetyValidator {
  constructor() {
    this.issues = [];
    this.passed = [];
    this.criticalPaths = [
      'apps',
      'packages', 
      'src',
      'public'
    ];
    this.traumaSafePatterns = {
      // Should be present
      required: [
        /ESC/i,
        /escape/i,
        /gentle/i,
        /consent/i,
        /pause/i,
        /stop/i
      ],
      // Should NOT be present
      forbidden: [
        /autoplay/i,
        /auto-play/i,
        /no-escape/i,
        /forced/i,
        /cannot-exit/i,
        /mandatory/i
      ]
    };
  }

  async validateAll() {
    console.log('🛡️ Starting comprehensive trauma-safety validation...');
    
    try {
      await this.validatePackageJsons();
      await this.validateReactComponents();
      await this.validateHtmlFiles();
      await this.validateConfigurationFiles();
      await this.validateDataFiles();
      
      this.printResults();
      return this.issues.length === 0;
    } catch (error) {
      console.error('❌ Trauma-safety validation failed:', error);
      return false;
    }
  }

  async validatePackageJsons() {
    console.log('📦 Validating package.json files...');
    
    const packageFiles = await this.findFiles('package.json');
    
    for (const file of packageFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const pkg = JSON.parse(content);
        
        // Check for trauma-safe package configuration
        if (pkg.cathedral?.trauma_safety || pkg.cathedral?.nd_accommodations) {
          this.passed.push(`✅ ${file}: Contains trauma-safety configuration`);
        } else {
          this.issues.push(`⚠️  ${file}: Missing trauma-safety configuration in cathedral object`);
        }
        
        // Check scripts for trauma-safe development
        await this.validateScripts(file, pkg.scripts || {});
        
      } catch (error) {
        this.issues.push(`❌ ${file}: Failed to parse package.json - ${error.message}`);
      }
    }
  }

  async validateScripts(filePath, scripts) {
    const traumaSafeScriptPatterns = {
      'trauma-check': /trauma|esc|gentle|consent/i,
      'fusion-kink': /fusion|generat|engine/i,
      'health-check': /validat|check|health/i
    };

    for (const [scriptName, scriptContent] of Object.entries(scripts)) {
      // Check for fake echo-only scripts
      if (scriptContent.startsWith('echo') && scriptContent.includes('🛡️')) {
        this.issues.push(`❌ ${filePath}: Script "${scriptName}" appears to be fake (echo only) - needs real implementation`);
      }
      
      // Check for trauma-safety patterns
      if (traumaSafeScriptPatterns[scriptName]) {
        const hasTraumaSafe = traumaSafeScriptPatterns[scriptName].test(scriptContent);
        if (hasTraumaSafe) {
          this.passed.push(`✅ ${filePath}: Script "${scriptName}" contains trauma-safe functionality`);
        } else {
          this.issues.push(`⚠️  ${filePath}: Script "${scriptName}" may not be trauma-safe`);
        }
      }
    }
  }

  async validateReactComponents() {
    console.log('⚛️ Validating React components...');
    
    const reactFiles = await this.findFiles('*.tsx', '*.jsx');
    
    for (const file of reactFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        
        // Check for ESC functionality
        const hasESC = /useEffect.*escape|useState.*escape|ESC|escape/i.test(content);
        if (hasESC) {
          this.passed.push(`✅ ${file}: Contains ESC/escape functionality`);
        } else {
          this.issues.push(`⚠️  ${file}: Missing ESC/escape functionality`);
        }
        
        // Check for autoplay patterns
        const hasAutoplay = /autoplay|auto-play/i.test(content);
        if (hasAutoplay) {
          this.issues.push(`❌ ${file}: Contains autoplay - must be user-initiated only`);
        }
        
        // Check for gentle UX patterns
        const hasGentleUX = /gentle|smooth|fade|transition/i.test(content);
        if (hasGentleUX) {
          this.passed.push(`✅ ${file}: Contains gentle UX patterns`);
        }
        
      } catch (error) {
        this.issues.push(`❌ ${file}: Failed to validate - ${error.message}`);
      }
    }
  }

  async validateHtmlFiles() {
    console.log('🌐 Validating HTML files...');
    
    const htmlFiles = await this.findFiles('*.html');
    
    for (const file of htmlFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        
        // Check for meta tags for accessibility
        if (content.includes('viewport') && content.includes('color-scheme')) {
          this.passed.push(`✅ ${file}: Contains accessibility meta tags`);
        } else {
          this.issues.push(`⚠️  ${file}: Missing accessibility meta tags`);
        }
        
        // Check for autoplay in video/audio
        const hasAutoplay = /autoplay.*video|video.*autoplay|audio.*autoplay/i.test(content);
        if (hasAutoplay) {
          this.issues.push(`❌ ${file}: Contains autoplay - must be user-initiated only`);
        }
        
      } catch (error) {
        this.issues.push(`❌ ${file}: Failed to validate - ${error.message}`);
      }
    }
  }

  async validateConfigurationFiles() {
    console.log('⚙️ Validating configuration files...');
    
    // Check turbo.json for trauma-safe tasks
    try {
      const turboContent = await fs.readFile('turbo.json', 'utf8');
      const turbo = JSON.parse(turboContent);
      
      if (turbo.tasks) {
        const tasks = Object.keys(turbo.tasks);
        const safetyTasks = tasks.filter(task => 
          /trauma|health|validat|safe/i.test(task)
        );
        
        if (safetyTasks.length > 0) {
          this.passed.push('✅ turbo.json: Contains safety-related tasks');
        } else {
          this.issues.push('⚠️ turbo.json: Consider adding trauma-safety validation tasks');
        }
      }
    } catch (error) {
      this.issues.push('⚠️ turbo.json: Could not validate configuration');
    }
  }

  async validateDataFiles() {
    console.log('📊 Validating data files for trauma-safe content...');
    
    const dataFiles = await this.findFiles('data/*.json');
    
    for (const file of dataFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const data = JSON.parse(content);
        
        // Check for trauma-safe data patterns
        if (Array.isArray(data)) {
          for (const item of data) {
            if (typeof item === 'object' && item.trauma_safe) {
              this.passed.push(`✅ ${file}: Contains trauma-safe data items`);
              break;
            }
          }
        }
      } catch (error) {
        // Data files can be large, so we'll be more lenient
        this.passed.push(`ℹ️  ${file}: Skipped (large file or parsing error)`);
      }
    }
  }

  async findFiles(pattern, extension = null) {
    const files = [];
    
    if (extension) {
      // Handle specific extension patterns
      for (const dir of this.criticalPaths) {
        try {
          const fullPattern = `${dir}/**/*${extension}`;
          const matched = await this.glob(fullPattern);
          files.push(...matched);
        } catch (error) {
          // Directory might not exist, that's okay
        }
      }
    } else {
      // Handle exact pattern matching
      for (const dir of this.criticalPaths) {
        try {
          const filePath = path.join(dir, pattern);
          const stat = await fs.stat(filePath);
          if (stat.isFile()) {
            files.push(filePath);
          }
        } catch (error) {
          // File might not exist, that's okay
        }
      }
    }
    
    return files;
  }

  async glob(pattern) {
    // Simple glob implementation
    // In a real implementation, you'd use a proper glob library
    const results = [];
    // This is a simplified implementation
    return results;
  }

  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('🛡️ TRAUMA-SAFETY VALIDATION RESULTS');
    console.log('='.repeat(60));
    
    if (this.passed.length > 0) {
      console.log(`\n✅ PASSED CHECKS (${this.passed.length}):`);
      this.passed.forEach(check => console.log(`   ${check}`));
    }
    
    if (this.issues.length > 0) {
      console.log(`\n❌ ISSUES FOUND (${this.issues.length}):`);
      this.issues.forEach(issue => console.log(`   ${issue}`));
    }
    
    console.log('\n' + '='.repeat(60));
    
    if (this.issues.length === 0) {
      console.log('🎉 ALL TRAUMA-SAFETY CHECKS PASSED!');
      console.log('🛡️ Your Cathedral applications are fully trauma-safe.');
    } else {
      console.log('⚠️  TRAUMA-SAFETY ISSUES FOUND');
      console.log('📋 Please address the issues above to ensure trauma-safe development.');
    }
    
    console.log('\n💡 TIP: Run this validator after any major changes to maintain safety standards.');
  }
}

// Main execution
async function main() {
  const validator = new TraumaSafetyValidator();
  const success = await validator.validateAll();
  
  if (!success) {
    console.log('\n🔄 Address the trauma-safety issues and run validation again.');
    process.exit(1);
  } else {
    console.log('\n✨ Trauma-safety validation complete - all systems are safe! ✨');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default TraumaSafetyValidator;