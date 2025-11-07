# 🤖 CO-PILOT INSTRUCTIONS: Cathedral v1.0 Build System

## 🎯 PRIMARY MISSION
**Fix the "packages never got built" problem** and create the missing Godot 4.5 + Rust + Bevy integration for the Cathedral v1.0 system.

## 📋 CONTEXT
- **Project**: Cathedral v1.0 Master - Turbo OpenSpec
- **Naming**: Use `v1_main`, `v1_master`, `master-cathedral` branches
- **Problem**: Packages never built, Godot + Rust + Bevy integration missing
- **Tech Stack**: Godot 4.5, Rust, Bevy 0.14, React, Turbo, pnpm

## 🔧 STEP 1: FIX PACKAGE BUILDING SYSTEM

### Current Problem
All packages have fake "echo" scripts that don't actually build anything.

### What to Build
Create a real package builder that:
1. **Actually compiles TypeScript/JavaScript packages**
2. **Creates real dist/ directories with built files**
3. **Works with the existing pnpm@9.15.0 + Node 20 setup**

### Implementation Steps
1. **Read existing package.json files** in `packages/` directory
2. **Create real TypeScript compilation** using `tsc` or `esbuild`
3. **Generate actual dist/ directories** with compiled outputs
4. **Update package.json scripts** to use real build commands
5. **Test builds** to ensure they actually create files

### Example Fix
```javascript
// Change FROM fake echo script:
"build": "echo 'Package build complete'"

// Change TO real build:
"build": "tsc && node scripts/post-build.js"
```

## 🎮 STEP 2: CREATE GODOT 4.5 + RUST + BEVY INTEGRATION

### What to Build
Create proper GDNative + Bevy integration:

#### A. Rust Library (godot-rust-integration/src/lib.rs)
```rust
use godot::prelude::*;
use bevy::prelude::*;

// Cathedral Player Component
#[derive(Component)]
struct CathedralPlayer {
    consciousness_level: i32,
    fusion_active: bool,
    geometry_engaged: bool,
}

// Fusion-Kink System Component  
#[derive(Component)]
struct FusionKinkSystem;

// Sacred Geometry Engine Component
#[derive(Component)]
struct SacredGeometryEngine;

// Godot Class for Cathedral Player
#[godot_class]
impl CathedralPlayer {
    #[func]
    pub fn set_consciousness_level(&mut self, level: i32) {
        self.consciousness_level = level;
        godot::engine::print!("Consciousness level set to {}", level);
    }
    
    #[func]
    pub fn activate_fusion_kink(&mut self) {
        self.fusion_active = true;
        godot::engine::print!("Fusion-kink system activated!");
    }
    
    #[func]
    pub fn engage_sacred_geometry(&mut self) {
        self.geometry_engaged = true;
        godot::engine::print!("Sacred geometry engine engaged!");
    }
}

// Bevy Main App Setup
fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, cathedral_systems)
        .run();
}

fn setup(mut commands: Commands) {
    commands.spawn(CathedralPlayer {
        consciousness_level: 1,
        fusion_active: false,
        geometry_engaged: false,
    });
}

fn cathedral_systems(
    mut player_query: Query<&mut CathedralPlayer>,
    keyboard: Res<ButtonInput<KeyCode>>,
) {
    for mut player in player_query.iter_mut() {
        if keyboard.pressed(KeyCode::Space) {
            player.activate_fusion_kink();
        }
        if keyboard.pressed(KeyCode::KeyG) {
            player.engage_sacred_geometry();
        }
    }
}
```

#### B. Godot Scene Integration
Update the `godot-rust-integration/project.godot`:
- Create main scene with Cathedral player
- Wire input events to Rust functions
- Add UI for consciousness level display

#### C. Cargo.toml Configuration
Use the existing `godot-rust-integration/Cargo.toml`:
- Godot 4.5 bindings
- Bevy 0.14 integration
- Proper GDNative setup

## 🚀 STEP 3: SETUP DEPLOYMENT CONFIGURATIONS

### Render Deployment
Create working `deployment-configs/render.yaml`:
```yaml
services:
  - type: web
    name: cathedral-v1-master
    env: node
    buildCommand: pnpm run build:all
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: "20"
      - key: PNPM_VERSION
        value: "9.15.0"
```

### Vercel Deployment
Create working `deployment-configs/vercel.json`:
```json
{
  "version": 2,
  "builds": [{
    "src": "apps/web/package.json",
    "use": "@vercel/static-build",
    "config": {
      "buildCommand": "pnpm run build:web"
    }
  }],
  "routes": [{
    "src": "/(.*)",
    "dest": "/apps/web/$1"
  }]
}
```

## 🏗️ STEP 4: BUILD SYSTEM INTEGRATION

### Update Root package.json
Add real build scripts:
```json
{
  "scripts": {
    "build:all": "pnpm run build:packages && pnpm run build:engines && pnpm run build:apps",
    "build:packages": "turbo run build --filter=packages/*",
    "build:engines": "turbo run build --filter=engines/*", 
    "build:apps": "turbo run build --filter=apps/*",
    "build:godot": "cd godot-rust-integration && cargo build",
    "verify:builds": "node tools/verify-builds.js"
  }
}
```

### Create Turbo Pipeline
Update `turbo.json` to include v1.0 build tasks:
```json
{
  "tasks": {
    "build:all": {
      "dependsOn": ["build:packages", "build:engines", "build:apps"]
    },
    "build:godot": {
      "cache": false
    }
  }
}
```

## 🧪 STEP 5: VERIFICATION SYSTEM

### Build Verification Script
Create `tools/verify-builds.js`:
```javascript
import { execSync } from 'child_process';
import { existsSync } from 'fs';

function verifyPackageBuilds() {
  const packages = ['core', 'engines', 'shared', 'types'];
  
  for (const pkg of packages) {
    const distPath = `packages/${pkg}/dist`;
    if (existsSync(distPath)) {
      console.log(`✅ ${pkg} build verified`);
    } else {
      console.log(`❌ ${pkg} build failed - no dist directory`);
    }
  }
}

// Run verification
verifyPackageBuilds();
```

## 📁 DIRECTORY STRUCTURE TO CREATE

```
cathedral-real/
├── packages/
│   ├── core/dist/          # Should exist after real build
│   ├── engines/dist/       # Should exist after real build
│   └── shared/dist/        # Should exist after real build
├── godot-rust-integration/
│   ├── src/lib.rs          # Rust + Godot + Bevy code
│   ├── Cargo.toml          # Rust configuration
│   └── project.godot       # Godot 4.5 project
├── deployment-configs/
│   ├── render.yaml         # Render deployment
│   └── vercel.json         # Vercel deployment
└── tools/
    └── verify-builds.js    # Build verification
```

## ⚡ QUICK COMMANDS FOR CO-PILOT

### Test Package Building
```bash
cd packages/core
npm run build  # Should create dist/ directory with real files
```

### Test Godot Integration
```bash
cd godot-rust-integration
cargo build    # Should compile Rust library
godot project.godot  # Should open Godot project
```

### Test Deployment
```bash
pnpm run build:all  # Should build everything
pnpm run verify:builds  # Should verify all builds
```

## ✅ SUCCESS CRITERIA

1. **Package Building**: All packages create real dist/ directories with compiled files
2. **Godot Integration**: Godot 4.5 runs with Rust + Bevy integration
3. **Build System**: `pnpm run build:all` works without errors
4. **Deployment**: Render and Vercel deployments configured
5. **Naming**: Uses v1_main/v1_master/master-cathedral conventions

## 🚨 CRITICAL REMINDERS

- **Use naming system**: Always refer to "v1_main", "v1_master", "master-cathedral"
- **Turbo OpenSpec**: This is "turbo openspec v1.0"
- **Real builds only**: No more "echo" scripts - only real functionality
- **Test everything**: Verify each step works before moving to next
- **Latest versions**: Use pnpm@9.15.0, Node 20, Godot 4.5, Bevy 0.14

## 🎯 END GOAL

Transform Cathedral from fake "echo" scripts to a real, working v1.0 system that:
- Actually builds and creates packages
- Integrates Godot 4.5 + Rust + Bevy properly  
- Deploys to Render and Vercel successfully
- Follows the v1_main/v1_master/master-cathedral naming system