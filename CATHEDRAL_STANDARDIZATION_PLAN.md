# Cathedral Monorepo Standardization & Integration Plan

## Executive Summary

This document outlines the comprehensive standardization plan for the Cathedral Master monorepo, ensuring all packages, applications, and deployment configurations meet the highest quality standards demonstrated in the top-tier packages.

**Date**: 2024-11-19
**Status**: Implementation Phase
**Target Completion**: Full standardization and deployment readiness

## Current State Analysis

### Quality Standards Identified (Top-Tier Examples)

#### 1. **apps/web** - Next.js Application (Highest Quality)
- Node.js: 25.0.0
- React: 18.3.1
- Next.js: 16.0.1
- TypeScript: 5.6.3
- Complete workspace dependencies
- Comprehensive build configuration
- Multi-engine support (Three.js, Babylon.js, p5.js, Tone.js)
- Azure AI integration
- Professional metadata and documentation

#### 2. **packages/codex-144-99** - Sacred Library Package
- Node.js: 22.0.0
- TypeScript: 5.6.3
- Complete exports configuration
- Comprehensive scripts (build, test, lint, format)
- Professional documentation
- Azure AI integration
- Proper dependency management

#### 3. **apps/circuitum99** - Vite Application
- Latest Vite configuration
- React 18.3.1
- Three.js 0.181.0
- Optimized build settings
- Clean, minimal structure

### Version Inconsistencies Found

#### Node.js Versions
- **.nvmrc**: 25.0.0 ✅ (Correct - Latest Stable)
- **package.json engines**: 25.0.0 ✅
- **apps/web**: 25.0.0 ✅
- **packages/codex-144-99**: 22.0.0 ⚠️ (Needs update)
- **Workflows**: 20.0.0 ⚠️ (Needs update to 25.0.0)
- **deployment-configs/render.yaml**: "latest" and "25.x" ✅
- **deployment-configs/vercel.json**: "lts" and "nodejs25.x" ✅

**Decision**: Standardize on **Node.js 25.0.0** everywhere

#### pnpm Versions
- **turbo.json**: Not specified
- **Workflows**: 8.15.0 ⚠️ (Old)
- **versions/MASTER_CATHEDRAL_VERSIONS.json**: 9.15.0 ✅
- **package.json engines**: >=10.0.0 ✅

**Decision**: Standardize on **pnpm 9.15.0** everywhere

#### Godot Versions
- **godot-project/project.godot**: config_version=5, features=4.3 ⚠️
- **Documentation references**: 4.5.0
- **versions/MASTER_CATHEDRAL_VERSIONS.json**: 4.5.0
- **User Request**: Upgrade to 4.6 ✅

**Decision**: Upgrade to **Godot 4.6.0** (latest stable)

## Standardization Strategy

### Phase 1: Core Version Alignment (Priority 1)

#### 1.1 Update Godot to 4.6.0
- [ ] Update `godot-project/project.godot` to Godot 4.6
- [ ] Update all documentation references
- [ ] Update version manifests
- [ ] Test compatibility with existing scenes

#### 1.2 Standardize Node.js to 25.0.0
- [ ] Update all workflow files
- [ ] Update all package.json engines
- [ ] Update deployment configurations
- [ ] Update documentation

#### 1.3 Standardize pnpm to 9.15.0
- [ ] Update all workflows
- [ ] Update package.json engines
- [ ] Update deployment configurations

### Phase 2: Package Standardization (Priority 1)

#### 2.1 Create Package Template
Based on `@cathedral/codex-144-99` quality standards:

```json
{
  "name": "@cathedral/package-name",
  "version": "2.0.0",
  "description": "Clear, professional description",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "engines": {
    "node": ">=25.0.0",
    "pnpm": ">=9.15.0"
  },
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "build:clean": "rm -rf dist && tsc",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext ts --max-warnings 0",
    "lint:fix": "eslint src --ext ts --fix",
    "format": "prettier --write src/**/*.{ts,js}",
    "format:check": "prettier --check src/**/*.{ts,js}",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "@types/node": "^20.17.0",
    "typescript": "^5.6.3",
    "vitest": "^1.6.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.3"
  },
  "author": "Rebecca Respawn <bekalah@users.noreply.github.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Bekalah/cathedral-master.git",
    "directory": "packages/package-name"
  }
}
```

#### 2.2 Audit All Packages
- [ ] Scan all 90+ packages for quality issues
- [ ] Identify packages missing critical fields
- [ ] Update packages to match template

### Phase 3: Deployment Configuration (Priority 1)

#### 3.1 Unified Deployment Standards

**Target Platforms**:
1. **GitHub Pages** (Free) - Static sites
2. **Vercel** (Free) - Next.js apps, serverless functions
3. **Render** (Free) - Web services, cron jobs
4. **Cloudflare Pages** (Free) - Static sites, edge functions

#### 3.2 Update Deployment Configs

**render.yaml** improvements:
- [ ] Update Node.js to 25.0.0
- [ ] Update pnpm to 9.15.0
- [ ] Add health checks
- [ ] Optimize build commands

**vercel.json** improvements:
- [ ] Ensure Node.js 25.x
- [ ] Optimize function configuration
- [ ] Add proper headers and caching

**GitHub Actions** improvements:
- [ ] Update to Node.js 25.0.0
- [ ] Update to pnpm 9.15.0
- [ ] Optimize caching strategies
- [ ] Add proper artifact handling

### Phase 4: Repository Integration (Priority 2)

#### 4.1 External Repository Connections

From `repos-to-import.json`:
1. circuitum99
2. stone-grimoire
3. liber-arcanae
4. tesseract-bridge
5. cosmogenesis-learning-engine
6. magical-mystery-house
7. luxcrux

**Strategy**:
- [ ] Create git subtree integration script
- [ ] Maintain separate git histories
- [ ] Enable bidirectional sync
- [ ] Document integration process

#### 4.2 Create Integration Scripts

```bash
#!/bin/bash
# scripts/integrate-external-repos.sh
# Safely integrate external repositories as subtrees
```

### Phase 5: Build System Optimization (Priority 2)

#### 5.1 Turbo Configuration
- [ ] Optimize cache strategies
- [ ] Configure proper task dependencies
- [ ] Add remote caching (if available)

#### 5.2 Vite Configuration
- [ ] Standardize all Vite configs
- [ ] Optimize chunk splitting
- [ ] Configure proper asset handling

#### 5.3 Next.js Configuration
- [ ] Optimize for static export
- [ ] Configure proper base paths
- [ ] Optimize bundle sizes

### Phase 6: Quality Assurance (Priority 2)

#### 6.1 Automated Checks
- [ ] Create package.json validator
- [ ] Create version consistency checker
- [ ] Create deployment readiness checker

#### 6.2 Documentation
- [ ] Update all README files
- [ ] Create deployment guides
- [ ] Document integration patterns

## Implementation Priority

### Immediate (Today)
1. ✅ Create this standardization plan
2. Update Godot to 4.6.0
3. Update all Node.js references to 25.0.0
4. Update all pnpm references to 9.15.0
5. Update version manifest files

### Short-term (This Week)
6. Standardize top 20 most-used packages
7. Update all deployment configurations
8. Create repository integration scripts
9. Test all deployment targets

### Medium-term (Next Week)
10. Complete package standardization
11. Implement automated quality checks
12. Full documentation update
13. Integration testing

## Success Criteria

### Technical Metrics
- [ ] All packages have consistent Node.js 25.0.0 requirement
- [ ] All packages have consistent pnpm 9.15.0 requirement
- [ ] Godot project updated to 4.6.0
- [ ] All deployment configs tested and working
- [ ] External repos integrated and syncing
- [ ] Build success rate > 95%
- [ ] All apps deployable to free tier platforms

### Quality Metrics
- [ ] All packages have proper TypeScript configuration
- [ ] All packages have test scripts
- [ ] All packages have lint/format scripts
- [ ] All packages have proper exports
- [ ] All packages have complete metadata

### Deployment Metrics
- [ ] GitHub Pages deployment working
- [ ] Vercel deployment working
- [ ] Render deployment working
- [ ] Cloudflare Pages deployment working
- [ ] All URLs accessible and functional

## Risk Mitigation

### Version Conflicts
**Risk**: Different packages requiring different Node versions
**Mitigation**: Use engines field strictly, test thoroughly

### Breaking Changes
**Risk**: Godot 4.6 incompatible with 4.3 projects
**Mitigation**: Test in isolated branch, maintain backups

### Deployment Failures
**Risk**: Platform-specific issues
**Mitigation**: Test each platform separately, have fallbacks

## Next Steps

1. Get approval for this plan
2. Begin Phase 1 implementation
3. Create PR with initial changes
4. Iterate based on test results

## Notes

- This plan respects the Cathedral Magnum Opus scope
- All changes maintain trauma-safe design principles
- Integration preserves all existing work
- Quality improvements are incremental and testable
- Free tier constraints are respected throughout

---

**Prepared by**: Roo Code Assistant
**For**: Rebecca Respawn / Cathedral Master Project
**Version**: 1.0.0