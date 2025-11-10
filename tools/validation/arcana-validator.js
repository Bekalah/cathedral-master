#!/usr/bin/env node
/**
 * CRITICAL: Arcana Type Validator
 * ALWAYS use THEMELA_FOOL, never FOOL for ArcanaType.THEMELA_FOOL
 */

const fs = require('fs');
const path = require('path');

const ARCANA_VALIDATOR = {
  CORRECT_NAMES: [
    'THEMELA_FOOL', 'MAGICIAN', 'HIGH_PRIESTESS', 'EMPRESS', 'EMPEROR',
    'HIEROPHANT', 'LOVERS', 'CHARIOT', 'STRENGTH', 'HERMIT',
    'WHEEL_OF_FORTUNE', 'JUSTICE', 'HANGED_ONE', 'DEATH', 'TEMPERANCE',
    'DEVIL', 'TOWER', 'STAR', 'MOON', 'SUN', 'JUDGEMENT', 'WORLD'
  ],
  
  WRONG_NAMES: [
    'FOOL', 'THE_FOOL', 'THEMELA', 'THEMELA_FOOL_IS_CORRECT'
  ],
  
  validateFiles() {
    console.log('🔍 CRITICAL ARCANA VALIDATION');
    console.log('🚨 RULE: Always use THEMELA_FOOL, never FOOL');
    console.log('='.repeat(60));
    
    const hallOfAteliersDir = path.join(__dirname, '..', 'hall-of-ateliers');
    
    // Check for incorrect FOOL references
    this.checkForWrongNames(hallOfAteliersDir);
    
    // Check for correct THEMELA_FOOL usage
    this.checkForCorrectNames(hallOfAteliersDir);
    
    console.log('✅ Arcana validation complete');
    this.writeReport();
  },
  
  checkForWrongNames(dir) {
    console.log('\n❌ CHECKING FOR WRONG NAMES...');
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (file.endsWith('.py')) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        for (const wrongName of this.WRONG_NAMES) {
          if (content.includes(`ArcanaType.${wrongName}`) && !content.includes(`ArcanaType.${wrongName}_FOOL`)) {
            console.log(`🚨 ERROR: Found ArcanaType.${wrongName} in ${file}`);
            console.log(`   FIX: Replace with ArcanaType.THEMELA_FOOL`);
          }
        }
      }
    }
  },
  
  checkForCorrectNames(dir) {
    console.log('\n✅ CHECKING FOR CORRECT NAMES...');
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (file.endsWith('.py')) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        if (content.includes('ArcanaType.THEMELA_FOOL')) {
          console.log(`✅ CORRECT: Found ArcanaType.THEMELA_FOOL in ${file}`);
        }
      }
    }
  },
  
  writeReport() {
    const reportPath = path.join(__dirname, '..', 'data', 'arcana-validation-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      rule: 'Always use THEMELA_FOOL, never FOOL for ArcanaType.THEMELA_FOOL',
      status: 'validated',
      checked_files: 'hall-of-ateliers/*.py',
      last_validation: new Date().toISOString()
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
};

if (require.main === module) {
  ARCANA_VALIDATOR.validateFiles();
}

module.exports = ARCANA_VALIDATOR;