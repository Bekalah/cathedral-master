# 🏛️ V1 BRANCH NAMING STANDARDS

## Overview
The Cathedral project uses a v1-based master naming branch system to provide clear version control and development workflow standards.

## Primary Branch Structure

### Master Branches
- **`v1_main`** - Primary production branch (replaces traditional `main`)
- **`v1_develop`** - Development integration branch
- **`v1_feature/[feature-name]`** - Feature development branches
- **`v1_release/[version]`** - Release preparation branches
- **`v1_hotfix/[issue]`** - Critical bug fix branches

## Branch Naming Conventions

### Feature Branches
```
v1_feature/add-cathedral-engine
v1_feature/improve-ui-components
v1_feature/integrate-new-api
```

### Bug Fix Branches
```
v1_fix/workflow-deployment-error
v1_fix/package-dependency-issue
v1_fix/build-compilation-error
```

### Hotfix Branches (Critical Issues)
```
v1_hotfix/security-vulnerability
v1_hotfix/production-data-loss
v1_hotfix/critical-system-failure
```

### Release Branches
```
v1_release/v1.2.0
v1_release/v1.3.0-alpha
v1_release/v1.3.0-rc
```

### Development Branches
```
v1_develop/integration-testing
v1_develop/codex-system-refactor
v1_develop/performance-optimization
```

## Workflow Standards

### 1. Branch Creation
```bash
# Create feature branch
git checkout -b v1_feature/new-cathedral-functionality

# Create bug fix branch
git checkout -v1_fix/urgent-issue-description

# Create hotfix branch
git checkout -b v1_hotfix/critical-security-patch
```

### 2. Branch Tracking
```bash
# Set upstream to track remote
git push -u origin v1_feature/your-feature-name

# Fetch all branches
git fetch --all
```

### 3. Branch Lifecycle
1. **Creation** → Branch from `v1_main`
2. **Development** → Regular commits with clear messages
3. **Testing** → Verify functionality and integration
4. **Review** → Submit pull request to `v1_main`
5. **Merge** → Squash and merge to `v1_main`
6. **Cleanup** → Delete feature branch after merge

## Commit Message Standards

### Format
```
[branch-type] Brief description

- Detailed explanation of changes
- Context and reasoning
- Breaking changes if applicable
```

### Examples
```
[feat] Add v1 cathedral engine integration
- Implemented core cathedral processing
- Added TypeScript interfaces
- Updated build system configuration

[fix] Resolve v1 workflow deployment issue
- Fixed GitHub Actions permissions
- Updated node version requirements
- Verified deployment pipeline

[refactor] Optimize v1 package dependencies
- Consolidated redundant packages
- Updated semantic versioning
- Improved build performance
```

## Integration Rules

### Merge Strategy
- **Feature branches** → Squash and merge to `v1_main`
- **Hotfix branches** → Fast-forward or merge to `v1_main`
- **Release branches** → Merge to both `v1_main` and tag

### Protection Rules
- `v1_main` - Protected, requires PR review
- `v1_develop` - Protected, requires PR review
- Feature branches - Direct push allowed for contributors

### Version Control
- All branches use `v1_` prefix for consistency
- Version tags follow semantic versioning
- Release branches align with release numbers

## Benefits

1. **Clear Hierarchy** - Easy to understand branch structure
2. **Version Alignment** - All branches reflect v1 system
3. **Workflow Clarity** - Standardized development process
4. **Repository Health** - Clean, organized branch management
5. **Team Coordination** - Consistent naming across contributors

## Migration from Legacy System

### Old → New Branch Mapping
- `main` → `v1_main`
- `develop` → `v1_develop`
- `feature/*` → `v1_feature/*`
- `hotfix/*` → `v1_hotfix/*`
- `release/*` → `v1_release/*`

## Quality Gates

### Before Merge to v1_main
- [ ] Code review completed
- [ ] Tests passing
- [ ] Build successful
- [ ] Documentation updated
- [ ] No breaking changes without migration plan

### Automated Checks
- Linting and formatting
- Unit test execution
- Integration testing
- Security vulnerability scanning
- Performance benchmarks

## Emergency Procedures

### Critical Issue Response
1. Create `v1_hotfix/` branch from `v1_main`
2. Implement minimal fix
3. Test in isolation
4. Fast-track merge to `v1_main`
5. Deploy immediately
6. Document incident and resolution

### Rollback Process
1. Identify problematic commit
2. Create rollback commit
3. Fast-forward to clean state
4. Communicate to team
5. Plan permanent fix

## Summary
The v1 branch naming system provides a clear, scalable framework for Cathedral project development while maintaining compatibility with modern Git workflows and CI/CD systems.

---
**Status**: Active - v1_main established as primary branch  
**Last Updated**: 2025-11-06  
**Repository**: https://github.com/Bekalah/cathedral-master