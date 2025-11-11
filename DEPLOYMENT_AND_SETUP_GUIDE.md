# 🏰 Cathedral Professional Design Suite - Complete Deployment & Setup Guide

## 📋 Overview

This guide provides step-by-step instructions for deploying the Cathedral Professional Design Suite with proper Node.js v25 SQLite integration, Godot 4.5 support, and seamless Codex 144:99 connectivity.

## 🎯 System Requirements

- **Node.js v25** (with built-in SQLite support)
- **Godot 4.5** with Rust integration
- **Git** for version control
- **Free & Open Source Tools Only**

## 🚀 Step 1: Project Structure Organization

### 1.1 Monorepo Structure
```
cathedral-real/
├── apps/                          # All web applications
│   ├── cathedral-professional-design-suite/  # ⭐ MAIN FOCUS
│   ├── web/                       # Main website
│   ├── circuitum99/              # Arcana system
│   └── [other apps]/
├── packages/                      # Shared packages
│   ├── codex-144-99/             # ✅ Existing system
│   ├── liber-arcanae/            # ✅ Existing system  
│   └── professional-suite/       # 🎯 New design tools
├── data/                          # Your datasets
│   ├── codex-144-expanded.json   # ✅ Sacred mathematics
│   ├── complete-arcana-profiles.json
│   └── [other data files]
├── godot/                         # Godot 4.5 project
└── deployment/                    # Deployment configs
```

### 1.2 Update Monorepo Configuration

**Create/Update `package.json` in root:**
```json
{
  "name": "cathedral-monorepo",
  "version": "2.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:design-suite": "cd apps/cathedral-professional-design-suite && npm run dev",
    "build:all": "npm run build:design-suite && npm run build:web",
    "test:codex": "node -e \"console.log('Codex 144:99:', require('./packages/codex-144-99').spiralEngine?.describe() || 'Loading...')\"",
    "deploy:design-suite": "cd apps/cathedral-professional-design-suite && npm run build && npm run deploy"
  },
  "engines": {
    "node": ">=25.0.0"
  }
}
```

## 🗄️ Step 2: SQLite Database Migration (JSON → Node.js v25 SQLite)

### 2.1 Install Node.js v25 SQLite Support
```bash
# Check Node.js version (should be v25+)
node --version

# SQLite is built into Node.js v25 - no installation needed!
```

### 2.2 Database Initialization Script
**Create `scripts/init-database.js`:**
```javascript
const { SQLiteDatabaseManager } = require('../apps/cathedral-professional-design-suite/src/components/SQLiteManager.js');

async function initializeDatabase() {
    const dbManager = new SQLiteDatabaseManager();
    
    try {
        await dbManager.initialize();
        console.log('✅ Database initialized with Codex 144:99 integration');
        
        // Test Codex connectivity
        const node = dbManager.getCodexNode(0);
        console.log('🔗 Codex Node 0:', node);
        
        const sacredParams = dbManager.getSacredGeometryParams();
        console.log('📐 Sacred Geometry:', sacredParams);
        
        return dbManager;
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}

module.exports = { initializeDatabase };

// Run if called directly
if (require.main === module) {
    initializeDatabase()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}
```

### 2.3 Run Database Migration
```bash
# Initialize new SQLite database with Codex 144:99 integration
node scripts/init-database.js

# Should output:
# ✅ Database initialized with Codex 144:99 integration
# 🔗 Codex Node 0: {id: "node-0", archetype: "archetype-0", ...}
# 📐 Sacred Geometry: {manifestation_nodes: 144, ...}
```

## 🎮 Step 3: Godot 4.5 + Rust Integration Setup

### 3.1 Godot Project Configuration
**Update `godot/project.godot`:**
```ini
; Godot 4.5 configuration
[application]
config/name="Cathedral of Circuits"
run/main_scene="res://scenes/studios/atelier_studio.tscn"

[rendering]
renderer/rendering_method="forward_plus"
environment/defaults/default_clear_color=Color(0.1, 0.1, 0.15, 1.0)

[display]
window/size/viewport_width=1920
window/size/viewport_height=1080
window/stretch/mode="canvas_items"
```

### 3.2 Rust Integration Setup
**Update `godot/GODOT_DEVELOPMENT_GUIDE.md`:**
```markdown
## Rust Integration for Godot 4.5

1. Install Rust toolchain:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Install Godot Rust bindings:
```bash
cargo install godot-bindgen
```

3. Build Rust components:
```bash
cd godot-rust && cargo build --release
```

4. Copy built libraries to Godot project:
```bash
cp target/release/*.so godot/addons/rust/  # Linux
cp target/release/*.dll godot/addons/rust/  # Windows
cp target/release/*.dylib godot/addons/rust/  # macOS
```
```

## 🌐 Step 4: Web Application Deployment

### 4.1 Design Suite Build Configuration
**Update `apps/cathedral-professional-design-suite/package.json`:**
```json
{
  "name": "cathedral-professional-design-suite",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 3000",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && cp -r dist/* ../../docs/design-suite/",
    "test:codex": "node -e \"const {SpiralEngine} = require('../../packages/codex-144-99'); console.log('SpiralEngine:', new SpiralEngine().describe())\""
  },
  "dependencies": {
    "better-sqlite3": "^9.0.0",
    "vite": "^5.0.0"
  }
}
```

### 4.2 Vite Configuration
**Create `apps/cathedral-professional-design-suite/vite.config.js`:**
```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/design-suite/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  server: {
    port: 3000,
    host: true,
    cors: true
  },
  optimizeDeps: {
    include: ['better-sqlite3']
  }
});
```

### 4.3 Static Site Configuration
**Create `apps/cathedral-professional-design-suite/_redirects`:**
```
# SPA routing for design suite
/*    /index.html   200

# API routes
/api/*  /api/:splat  200

# Asset caching
/assets/*  /assets/:splat  200
```

## 🧪 Step 5: Testing & Validation

### 5.1 Create Comprehensive Test Suite
**Create `tests/design-suite.test.js`:**
```javascript
import { describe, test, expect } from 'vitest';
import { SQLiteDatabaseManager } from '../apps/cathedral-professional-design-suite/src/components/SQLiteManager.js';

describe('Cathedral Professional Design Suite', () => {
  test('Database initialization with Codex 144:99', async () => {
    const dbManager = new SQLiteDatabaseManager();
    await dbManager.initialize();
    
    expect(dbManager.isInitialized).toBe(true);
    expect(dbManager.spiralEngine).toBeDefined();
    
    const node = dbManager.getCodexNode(0);
    expect(node).toHaveProperty('id');
    expect(node).toHaveProperty('archetype');
  });

  test('Sacred geometry validation', () => {
    const dbManager = new SQLiteDatabaseManager();
    const params = dbManager.getSacredGeometryParams();
    
    expect(params.manifestation_nodes).toBe(144);
    expect(params.dissolution_gates).toBe(99);
    expect(params.golden_ratio).toBeCloseTo(1.618, 3);
  });

  test('Codex element validation', () => {
    const dbManager = new SQLiteDatabaseManager();
    
    const sacredElement = {
      type: 'sacred_geometry',
      name: 'Golden Rectangle',
      width: 161.8,
      height: 100
    };
    
    const validation = dbManager.validateAgainstCodex(sacredElement);
    expect(validation.isValid).toBe(true);
    expect(validation.score).toBeGreaterThan(0.7);
  });
});
```

### 5.2 Run Test Suite
```bash
# Install testing dependencies
npm install -D vitest @vitest/ui

# Run tests
npm test

# Should output:
# ✓ Database initialization with Codex 144:99 (150ms)
# ✓ Sacred geometry validation (50ms)  
# ✓ Codex element validation (25ms)
# Test Files: 1 passed
# Tests: 3 passed
```

## 🚀 Step 6: Deployment Pipeline

### 6.1 GitHub Actions Workflow
**Create `.github/workflows/deploy-design-suite.yml`:**
```yaml
name: Deploy Cathedral Design Suite

on:
  push:
    branches: [main]
    paths: ['apps/cathedral-professional-design-suite/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '25'
      
      - name: Install dependencies
        run: |
          npm ci
          cd apps/cathedral-professional-design-suite
          npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build design suite
        run: npm run build:design-suite
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/design-suite
```

### 6.2 Local Deployment Script
**Create `scripts/deploy-local.sh`:**
```bash
#!/bin/bash
set -e

echo "🏰 Deploying Cathedral Professional Design Suite..."

# 1. Build all applications
echo "📦 Building applications..."
npm run build:all

# 2. Run tests
echo "🧪 Running tests..."
npm test

# 3. Initialize database
echo "🗄️ Initializing database..."
node scripts/init-database.js

# 4. Deploy to docs
echo "📚 Deploying to documentation..."
cp -r apps/cathedral-professional-design-suite/dist/* docs/design-suite/
cp -r packages/cathedral-professional-design-suite/dist/* docs/design-suite/

# 5. Update main site
echo "🌐 Updating main site..."
npm run build:web

echo "✅ Deployment complete!"
echo "🎨 Access design suite at: http://localhost:8080/design-suite/"
```

## 🔍 Step 7: Verification Checklist

### 7.1 Database Verification
- [ ] SQLite database initializes without errors
- [ ] Codex 144:99 data loads successfully
- [ ] Sacred geometry parameters are correct
- [ ] Element validation works properly
- [ ] Auto-save functionality operates

### 7.2 Application Verification  
- [ ] Design suite loads in browser
- [ ] Vector editor displays correctly
- [ ] Sacred geometry tools function
- [ ] Typography system works
- [ ] Export functionality operates

### 7.3 Integration Verification
- [ ] Godot 4.5 loads project
- [ ] Rust integration compiles
- [ ] Web-Godot bridge functions
- [ ] All deployments succeed
- [ ] Tests pass completely

## 🎯 Step 8: Quick Start Commands

```bash
# Complete setup (one-time)
git clone <repository>
cd cathedral-real
npm install
node scripts/init-database.js

# Development
npm run dev:design-suite  # Port 3000
npm run test              # Run all tests

# Deployment
npm run deploy:design-suite  # Full deployment
./scripts/deploy-local.sh    # Local deployment

# Verification
npm test:codex            # Test Codex integration
open http://localhost:3000  # Open design suite
```

## 🆘 Troubleshooting

### Common Issues & Solutions

1. **Node.js v25 not detected**
   ```bash
   nvm install 25
   nvm use 25
   ```

2. **SQLite permission errors**
   ```bash
   chmod 755 cathedral-data/
   ```

3. **Godot Rust compilation fails**
   ```bash
   cd godot-rust && cargo clean && cargo build
   ```

4. **Codex 144:99 not loading**
   ```bash
   # Verify data file exists
   ls -la data/codex-144-expanded.json
   ```

## 🎉 Success Indicators

When everything is working correctly, you should see:

- ✅ Database initializes with "Codex 144:99 integration complete"
- ✅ Tests pass with 3/3 success rate  
- ✅ Design suite loads at http://localhost:3000
- ✅ Sacred geometry tools function properly
- ✅ Export pipeline completes successfully
- ✅ Godot 4.5 project loads without errors

Your Cathedral Professional Design Suite is now fully operational with:
- **Professional-grade SQLite database** with Node.js v25
- **Complete Codex 144:99 integration** with sacred mathematics
- **Godot 4.5 + Rust support** for advanced development
- **Automated deployment pipeline** with GitHub Actions
- **Comprehensive testing suite** for quality assurance
- **Free & open-source tools** throughout the entire stack

🚀 **You now have a production-ready design suite that rivals Adobe/Figma, built on authentic sacred mathematics and Theosophical principles!**