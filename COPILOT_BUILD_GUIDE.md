# 🤖 Co-pilot Build Guide for Cathedral v1.0 - Turbo OpenSpec

## 📋 Project Overview
- **Project Name**: Cathedral v1.0 Master - Turbo OpenSpec
- **Naming System**: v1_main, v1_master, master-cathedral
- **Tech Stack**: Godot 4.5 + Rust + Bevy + React + Turbo + pnpm
- **Deployment**: Render + Vercel + GitHub Actions

## 🔧 The Core Problem
**"Packages never got built"** - This is the main issue Co-pilot needs to fix.

## 🛠️ Missing Pieces Created

### 1. Real Package Builder System
- `build-system/package-builder-v1.0.json` - Real build system
- Fixes the "packages never got built" problem
- Uses pnpm@9.15.0, Node 20, Turbo 2.6.0

### 2. Godot 4.5 + Rust + Bevy Integration
- `godot-rust-integration/Cargo.toml` - Rust crate configuration
- `godot-rust-integration/project.godot` - Godot 4.5 project file
- Proper GDNative + Bevy integration pattern

### 3. Deployment Configuration
- `deployment-configs/render.yaml` - Render deployment
- `deployment-configs/vercel.json` - Vercel deployment
- GitHub Actions workflows for CI/CD

### 4. Co-pilot Guidance
- `copilot-guidance/copilot-help.json` - Complete guidance
- `COPILOT_BUILD_GUIDE.md` - This file

## 🎯 What Co-pilot Should Build

### Package Building System
```bash
# Use these commands
pnpm run build:all     # Build everything
pnpm run build:packages # Build packages only
pnpm run build:engines # Build game engines
pnpm run build:apps    # Build web apps
pnpm run verify:builds # Verify all builds work
```

### Godot + Rust + Bevy Integration
1. **Rust GDNative Bindings**: Proper Rust code for Godot integration
2. **Bevy Game Systems**: Bevy plugin for Cathedral mechanics
3. **Build System**: Godot export with Rust libraries

### Deployment Scripts
1. **Render Deploy**: `deploy:render` script
2. **Vercel Deploy**: `deploy:vercel` script
3. **GitHub Actions**: Build and deploy workflows

## 📁 Directory Structure
```
cathedral-real/
├── build-system/           # Package builder configs
├── godot-rust-integration/ # Godot 4.5 + Rust + Bevy
├── deployment-configs/     # Render + Vercel configs
├── copilot-guidance/       # Co-pilot help files
└── tools/                  # Real engines created
    ├── trauma-safety-validator.js
    ├── fusion-kink-generator.js
    ├── sacred-geometry-engine.js
    ├── gem-tower-engine.js
    └── copilot-build-system.js
```

## 🔗 Naming Convention (IMPORTANT)
- **Branch names**: `v1_main`, `v1_master`, `master-cathedral`
- **Package names**: `@cathedral/core-v1.0`, `@cathedral/engines-v1.0`
- **Version**: Always v1.0
- **Reference**: "turbo openspec v1.0"

## 🚀 Quick Start for Co-pilot

1. **Read the guidance**: Start with `copilot-guidance/copilot-help.json`
2. **Fix the build system**: Implement real package building
3. **Create Godot bindings**: Rust code for Godot 4.5 integration
4. **Build Bevy plugin**: Game systems for Cathedral mechanics
5. **Setup deployment**: Render + Vercel deployment scripts
6. **Test everything**: Use the verification scripts

## 🎮 Godot + Rust + Bevy Integration Pattern
```rust
// lib.rs - Cathedral Game Engine
use godot::prelude::*;
use bevy::prelude::*;

#[godot_class]
struct CathedralPlayer {
    consciousness_level: i32,
    fusion_active: bool,
    geometry_engaged: bool
}

#[godot_class]
impl CathedralPlayer {
    #[func]
    pub fn activate_fusion_kink(&mut self) {
        // Fusion-kink mechanics
    }
    
    #[func]  
    pub fn engage_sacred_geometry(&mut self) {
        // Sacred geometry engine
    }
}
```

## 🏗️ Build Commands
```bash
# Install dependencies
pnpm install

# Build everything
pnpm run build:all

# Build specific parts
pnpm run build:packages
pnpm run build:engines  
pnpm run build:apps
pnpm run build:godot

# Verify builds
pnpm run verify:builds

# Deploy
pnpm run deploy:render
pnpm run deploy:vercel
```

## ✅ Success Criteria
- [ ] All packages actually build and create dist files
- [ ] Godot 4.5 project runs with Rust integration
- [ ] Bevy game systems integrate properly
- [ ] Render deployment works
- [ ] Vercel deployment works
- [ ] GitHub Actions CI/CD pipeline works

## 🆘 If Co-pilot Gets Stuck
1. **Check pnpm version**: Should be 9.15.0
2. **Check Node version**: Should be 20
3. **Check Turbo version**: Should be 2.6.0
4. **Verify directory structure**: Use the created directories
5. **Run package builder**: Use `node build-system/package-builder-v1.0.json`

## 🎯 The Goal
Transform Cathedral from **fake echo scripts** to **real working packages** that:
- Actually build and create artifacts
- Integrate Godot 4.5 + Rust + Bevy properly
- Deploy successfully to Render and Vercel
- Use the v1_main/v1_master/master-cathedral naming system

**Remember**: This is "turbo openspec v1.0" and uses the naming system v1_main, v1_master, master-cathedral.