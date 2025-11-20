#!/bin/bash
set -euo pipefail

# Cathedral Deployment Readiness Validator
# Ensures all configurations meet quality standards before deployment

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ERRORS=0
WARNINGS=0
PASSED=0

log_check() {
    echo -e "${BLUE}⧗${NC} Checking: $1"
}

log_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

log_fail() {
    echo -e "${RED}✗${NC} $1"
    ((ERRORS++))
}

echo "================================================"
echo "  Cathedral Deployment Readiness Validation"
echo "================================================"
echo ""

# Check 1: Node.js version
log_check "Node.js version consistency"
if [ -f "$REPO_ROOT/.nvmrc" ]; then
    NVMRC_VERSION=$(cat "$REPO_ROOT/.nvmrc")
    if [ "$NVMRC_VERSION" = "25.0.0" ]; then
        log_pass ".nvmrc specifies Node.js 25.0.0"
    else
        log_fail ".nvmrc has wrong version: $NVMRC_VERSION (expected 25.0.0)"
    fi
else
    log_fail ".nvmrc file not found"
fi

# Check 2: Package.json engines
log_check "Root package.json engines"
if [ -f "$REPO_ROOT/package.json" ]; then
    NODE_ENGINE=$(jq -r '.engines.node // "not set"' "$REPO_ROOT/package.json")
    if [[ "$NODE_ENGINE" == *"25"* ]]; then
        log_pass "package.json specifies Node.js 25+"
    else
        log_warn "package.json node engine: $NODE_ENGINE (should be >=25.0.0)"
    fi
else
    log_fail "Root package.json not found"
fi

# Check 3: Godot version
log_check "Godot project version"
if [ -f "$REPO_ROOT/godot-project/project.godot" ]; then
    if grep -q '4.6' "$REPO_ROOT/godot-project/project.godot"; then
        log_pass "Godot project configured for 4.6"
    else
        log_warn "Godot project may not be configured for 4.6"
    fi
else
    log_warn "Godot project file not found (optional)"
fi

# Check 4: Turbo configuration
log_check "Turbo monorepo configuration"
if [ -f "$REPO_ROOT/turbo.json" ]; then
    log_pass "turbo.json found"
    
    # Check for proper task configuration
    if jq -e '.tasks.build' "$REPO_ROOT/turbo.json" > /dev/null 2>&1; then
        log_pass "Build task configured in turbo.json"
    else
        log_warn "Build task not found in turbo.json"
    fi
else
    log_fail "turbo.json not found"
fi

# Check 5: Workspace configuration
log_check "pnpm workspace configuration"
if [ -f "$REPO_ROOT/pnpm-workspace.yaml" ]; then
    log_pass "pnpm-workspace.yaml found"
else
    log_fail "pnpm-workspace.yaml not found"
fi

# Check 6: GitHub Actions workflows
log_check "GitHub Actions workflows"
WORKFLOW_COUNT=$(find "$REPO_ROOT/.github/workflows" -name "*.yml" -o -name "*.yaml" 2>/dev/null | wc -l)
if [ "$WORKFLOW_COUNT" -gt 0 ]; then
    log_pass "Found $WORKFLOW_COUNT workflow file(s)"
    
    # Check for Node.js 25 in workflows
    if grep -r "node-version.*25" "$REPO_ROOT/.github/workflows" > /dev/null 2>&1; then
        log_pass "Workflows use Node.js 25"
    else
        log_warn "Some workflows may not use Node.js 25"
    fi
else
    log_warn "No GitHub Actions workflows found"
fi

# Check 7: Deployment configurations
log_check "Deployment configurations"
if [ -f "$REPO_ROOT/deployment-configs/vercel.json" ]; then
    log_pass "Vercel configuration found"
else
    log_warn "Vercel configuration not found"
fi

if [ -f "$REPO_ROOT/deployment-configs/render.yaml" ]; then
    log_pass "Render configuration found"
else
    log_warn "Render configuration not found"
fi

# Check 8: Critical apps
log_check "Critical applications"
CRITICAL_APPS=("web" "circuitum99" "cathedral-professional-design-suite")
for app in "${CRITICAL_APPS[@]}"; do
    if [ -d "$REPO_ROOT/apps/$app" ]; then
        if [ -f "$REPO_ROOT/apps/$app/package.json" ]; then
            log_pass "App '$app' configured"
        else
            log_warn "App '$app' missing package.json"
        fi
    else
        log_warn "App '$app' not found"
    fi
done

# Check 9: Critical packages
log_check "Critical packages"
CRITICAL_PACKAGES=("codex-144-99" "liber-arcanae" "sacred-geometry-core")
for pkg in "${CRITICAL_PACKAGES[@]}"; do
    if [ -d "$REPO_ROOT/packages/$pkg" ]; then
        if [ -f "$REPO_ROOT/packages/$pkg/package.json" ]; then
            log_pass "Package '$pkg' configured"
        else
            log_warn "Package '$pkg' missing package.json"
        fi
    else
        log_warn "Package '$pkg' not found"
    fi
done

# Check 10: Documentation
log_check "Documentation files"
DOC_FILES=("README.md" "DEPLOYMENT_GUIDE.md")
for doc in "${DOC_FILES[@]}"; do
    if [ -f "$REPO_ROOT/$doc" ]; then
        log_pass "$doc found"
    else
        log_warn "$doc not found"
    fi
done

# Check 11: Version manifests
log_check "Version manifest files"
if [ -f "$REPO_ROOT/versions/MASTER_CATHEDRAL_VERSIONS.json" ]; then
    GODOT_VERSION=$(jq -r '.game_engines.godot' "$REPO_ROOT/versions/MASTER_CATHEDRAL_VERSIONS.json")
    if [ "$GODOT_VERSION" = "4.6.0" ]; then
        log_pass "Version manifest shows Godot 4.6.0"
    else
        log_warn "Version manifest shows Godot $GODOT_VERSION (expected 4.6.0)"
    fi
else
    log_warn "Master version manifest not found"
fi

# Check 12: Build scripts
log_check "Build and deployment scripts"
if [ -f "$REPO_ROOT/scripts/integrate-external-repos.sh" ]; then
    if [ -x "$REPO_ROOT/scripts/integrate-external-repos.sh" ]; then
        log_pass "Repository integration script is executable"
    else
        log_warn "Repository integration script is not executable"
    fi
else
    log_warn "Repository integration script not found"
fi

# Summary
echo ""
echo "================================================"
echo "  Validation Summary"
echo "================================================"
echo -e "${GREEN}✓ Passed:${NC}   $PASSED"
echo -e "${YELLOW}⚠ Warnings:${NC} $WARNINGS"
echo -e "${RED}✗ Errors:${NC}   $ERRORS"
echo ""

if [ $ERRORS -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}🎉 All checks passed! Ready for deployment.${NC}"
        exit 0
    else
        echo -e "${YELLOW}⚠ Deployment possible but with warnings. Review recommended.${NC}"
        exit 0
    fi
else
    echo -e "${RED}✗ Critical errors found. Fix before deployment.${NC}"
    exit 1
fi