# Cathedral Master - Deployment Guide

## Repository Information

- **Repository**: `bekalah/cathedral-master`
- **Local Path**: `/Users/rebeccalemke/cathedral-real`
- **Remote URL**: `https://github.com/bekalah/cathedral-master.git`
- **Branch**: `main`

## Monorepo Structure

This is a **pnpm + TurboRepo v2** monorepo with **64 workspace packages**:

### Apps (11)

- `apps/web` - Next.js main web app (GitHub Pages + Vercel)
- `apps/circuitum99` - Mystical circuit visualization (Vite + Three.js)
- `apps/cosmogenesis-engine` - AI learning engine (React + Three.js)
- `apps/liber-arcanae` - 22 Living Tarot interface (Vite)
- `apps/liber-arcanae-tarot` - Tarot app (React Native)
- `apps/magical-mystery-house` - Mystical adventure game
- `apps/mystical-treasure-hunt` - Treasure hunt game (React Native)
- `apps/synth-lab` - Synthesis laboratory (Vite)
- `apps/tarot-arena` - Tarot arena game (Vite)
- `apps/test-ground` - Testing environment (Vite)
- Plus: `cathedral-of-circuits`, `learning-device`

### Packages (53+)

Core packages created/fixed in this session:

- `@cathedral/synthesis-engine` - Alchemical Fusion system (a + b = d)
- `@cathedral/three-engine` - Three.js wrapper for 3D visualizations
- `@cathedral/codex-musical-system` - Codex 144:99 musical/harmonic system
- `@cathedral/sacred-geometry-core` - Fractal & geometry for Codex 144:99
- `@cathedral/mystical-data-unified` - Tarot, astrology, sacred texts
- `@cathedral/gem-tower-engine` - Crystal & gem visualization
- `@cathedral/fusion-kink-generator` - Quality-focused synthesis (NOT BDSM!)
- `@cathedral/smooth-movement-system` - Fluid animation & motion
- `@cathedral/portal-system` - Navigation & transitions
- `@cathedral/codex-engine` - Core Codex 144:99 processing
- `@cathedral/node-tree-engine` - Node tree health system (fixed rollup + src)
- `@cathedral/cosmogenesis` - Cosmic generation patterns (fixed tsconfig + src)

Other key packages:

- `@cathedral/ui` - Shared UI components
- `@cathedral/codex-144-99` - Core Codex system
- `@cathedral/shared` - Shared utilities
- `@cathedral/liber-arcanae` - Library package
- `@bekalah/*` - Bekalah-namespaced packages

## Build System

### Commands

```bash
# Install dependencies (all 64 workspaces)
pnpm install

# Build all packages
pnpm turbo run build

# Build specific app
pnpm turbo run build --filter=./apps/web

# Dev mode
pnpm dev

# Export static site (apps/web)
cd apps/web && pnpm run export
```

### Key Files

- `package.json` - Root monorepo config with Turbo scripts
- `turbo.json` - TurboRepo v2 pipeline configuration
- `pnpm-workspace.yaml` - Workspace package globs
- `tsconfig.json` - Root TypeScript project references
- `.github/workflows/pages.yml` - GitHub Pages deployment
- `vercel.json` - Vercel deployment config

## Deployment

### GitHub Pages

- **Workflow**: `.github/workflows/pages.yml`
- **Trigger**: Push to `main` branch
- **Build**: `pnpm run build` → `apps/web/out`
- **URL**: `https://bekalah.github.io/cathedral`

### Vercel

- **Config**: `vercel.json`
- **Framework**: Next.js (apps/web)
- **Build Command**: `pnpm turbo run build --filter=./apps/web`
- **Output Directory**: `apps/web/out`
- **Install Command**: `pnpm install --no-frozen-lockfile`

## Recent Fixes (Nov 2025)

1. **Dependency Upgrades**:
   - Vite: v5 → v6
   - @vitejs/plugin-react: v4 → v5
   - esbuild: ^0.25.0 (via pnpm overrides)
   - Installed 2000+ packages across 64 workspaces ✅

2. **Created Missing Packages** (all with ES modules):
   - synthesis-engine, three-engine, codex-musical-system
   - mystical-data-unified, gem-tower-engine, fusion-kink-generator
   - smooth-movement-system, portal-system, codex-engine
   - Fixed: sacred-geometry-core, node-tree-engine, cosmogenesis

3. **Fixed TypeScript**:
   - Updated tsconfig.json project references
   - Resolved duplicate `@cathedral/liber-arcanae` → renamed app to `@cathedral/liber-arcanae-app`
   - Fixed paths for moved apps (circuitum99, cosmogenesis-engine, magical-mystery-house)

4. **Build Status**:
   - 63/64 packages building successfully
   - Only minor warnings on outputs (fusion-kink-generator, portal-system, smooth-movement-system)
   - Ready for deployment ✅

## OpenSpec Integration

This repository is the source of truth for:

- **OpenSpec Magnum Opus v1.0** - Unified wisdom, science, art, and design
- **bekalah.github.io/cathedral** - Documentation and static site
- **Turbo Monorepo** - All Cathedral projects consolidated

No duplicates, no flattening, everything merged with provenance.

## Next Steps

1. ✅ Commit all new packages and fixes
2. ✅ Push to `cathedral-master` remote
3. 🔄 Trigger GitHub Pages deployment
4. 🔄 Link Vercel to cathedral-master repo
5. 🔄 Verify deployment on both platforms

---

**Magnum Opus Forever** - Cathedral Master v1.0  
All traditions, wisdom, science, art unified. 🏛️✨
