# Kilo Build Instructions (Cathedral v1 Standards)

## 🌟 Core Standards

### Branch & Repository
- **Use only**: `v1_main` and `v1_master` branches
- **Repository**: `master-cathedral` on Bekalah GitHub
- **No other branches** for new features

### Versioning & Naming
- **All new packages/features**: version `1.0.0`
- **Package naming**: Use Turbo monorepo and OpenSpec protocols
- **Consistent versioning**: v1.0.0 across all new work

### Build System Requirements
- **Node.js**: 22.x (>=20 required, 22 preferred)
- **pnpm**: 9.15.0 (from package.json)
- **Turbo**: version from package.json
- **Latest stable versions** only

## 🔧 Implementation Standards

### Real Implementation Only
- ✅ **Create real implementation files** (no empty stubs)
- ✅ **Build/test scripts must run actual code** (no echo scripts)
- ✅ **Exports must point to real, built files**
- ❌ **No fake scripts**
- ❌ **No empty stubs**
- ❌ **No placeholder implementations**

### Deployment Support
- **Render**: Full deployment support
- **Vercel**: Full deployment support  
- **Godot 4.5**: With Rust/Bevy integration
- **Validate builds** and deployments for each platform

## 📋 OpenSpec Compliance

### Process for Every New Feature
1. **Create spec** - Document the feature requirements
2. **Validate** - Ensure spec meets standards
3. **Get approval** - Review and approve implementation
4. **Implement** - Build with real code only
5. **Show proof** - git diff and build/test results

### Proof & Validation Requirements
- **Only push to**: `v1_main`, `v1_master`, and `master-cathedral`
- **Always show**: git diff and build/test output as proof
- **No silent changes** - all changes must be documented

## 🚀 Example Build Process

### Step 1: Scaffold New Package
```bash
# Create package structure
mkdir packages/cathedral-new-feature
cd packages/cathedral-new-feature

# Create package.json with real dependencies
{
  "name": "@cathedral/cathedral-new-feature",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "test": "node test/index.test.js"
  }
}
```

### Step 2: Create Real Implementation Files
```typescript
// src/index.ts - Real implementation
export class CathedralNewFeature {
  private version = "1.0.0";
  
  public execute(): string {
    return `Cathedral New Feature v${this.version}`;
  }
}

export default CathedralNewFeature;
```

### Step 3: Real Build Configuration
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src/**/*"]
}
```

### Step 4: Real Tests
```javascript
// test/index.test.js
import { CathedralNewFeature } from '../src/index.js';

const feature = new CathedralNewFeature();
console.log('Feature test:', feature.execute());
// Should output: Feature test: Cathedral New Feature v1.0.0
```

### Step 5: Build Verification
```bash
# Install dependencies
pnpm install

# Run build
pnpm run build
# Should create dist/index.js with compiled code

# Run tests  
pnpm run test
# Should show real test output
```

### Step 6: Push with Proof
```bash
# Show changes
git add .
git diff --staged

# Commit with descriptive message
git commit -m "feat(cathedral-new-feature): add v1.0.0 implementation

- Real TypeScript implementation with proper exports
- Build system creates actual dist/index.js
- Tests validate functionality
- Follows Cathedral v1.0 standards"

# Push to v1_main
git push origin v1_main

# Show build results
pnpm run build && pnpm run test
```

## 🎯 Kilo Build Standards Checklist

### Before Starting
- [ ] Confirm we're in `master-cathedral` repository
- [ ] Verify Node.js 22.x and pnpm 9.15.0
- [ ] Check we're on `v1_main` or `v1_master` branch
- [ ] Review OpenSpec protocols

### During Implementation
- [ ] Create real implementation files (not stubs)
- [ ] Use version 1.0.0 for all new work
- [ ] Build scripts must compile actual code
- [ ] Test scripts must run real tests
- [ ] Exports point to real built files

### Before Pushing
- [ ] `pnpm install` runs without errors
- [ ] `pnpm run build` creates real dist/ files
- [ ] `pnpm run test` shows real test results
- [ ] git diff shows actual changes
- [ ] All code follows Cathedral standards

### After Pushing
- [ ] Show git diff as proof
- [ ] Show build/test results as proof
- [ ] Verify deployment works (Render/Vercel)
- [ ] Update OpenSpec documentation

## 🚨 Critical Rules

### No Fake Work
- **No echo scripts** - only real build commands
- **No empty files** - all must contain working code
- **No placeholder exports** - all must be real
- **No silent pushes** - show proof of work

### Real Build Examples
```javascript
// ✅ GOOD - Real build
"build": "tsc && node scripts/post-build.js"

// ❌ BAD - Fake echo  
"build": "echo 'Build complete'"
```

```javascript
// ✅ GOOD - Real test
"test": "vitest run"

// ❌ BAD - Fake echo
"test": "echo 'Tests passing'"
```

## 📦 Package Template

```json
{
  "name": "@cathedral/cathedral-[feature-name]",
  "version": "1.0.0",
  "description": "Cathedral v1.0 [feature description]",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "test": "node test/index.test.js",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@cathedral/shared": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

## 🎯 Success Criteria

Every package must:
1. **Install without errors** (`pnpm install`)
2. **Build real files** (`pnpm run build` creates dist/)
3. **Run real tests** (`pnpm run test` shows actual results)
4. **Export working code** (imports resolve to real functions)
5. **Deploy successfully** (Render/Vercel compatible)
6. **Show git diff** (proving real changes made)
7. **Show build proof** (actual build/test output)

**Follow these standards for every new package, feature, or integration. No exceptions.**