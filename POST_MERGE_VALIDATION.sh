#!/bin/bash
# Post-Merge Validation Script
# Run this after merging Replit + Azure desktop work

set -e  # Exit on any error

echo "🔍 OpenSpec Magnum Opus v1.0 - Post-Merge Validation"
echo "======================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
PASS=0
FAIL=0

# Function to test
test_step() {
    echo -n "Testing: $1... "
}

pass() {
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASS++))
}

fail() {
    echo -e "${RED}✗ FAIL${NC}"
    echo "  Error: $1"
    ((FAIL++))
}

warn() {
    echo -e "${YELLOW}⚠ WARN${NC}"
    echo "  Warning: $1"
}

# 1. Check Node.js dependencies
test_step "Node.js dependencies"
if npm install &> /dev/null; then
    pass
else
    fail "npm install failed"
fi

# 2. Check package.json name
test_step "Package name is @openspec/magnum-opus"
if grep -q '"name": "@openspec/magnum-opus"' package.json; then
    pass
else
    fail "Package name not updated to @openspec/magnum-opus"
fi

# 3. Check turbo.json syntax
test_step "Turbo.json uses 'tasks' (Turbo 2.x)"
if grep -q '"tasks"' turbo.json; then
    pass
else
    warn "turbo.json still uses 'pipeline' (should be 'tasks' for Turbo 2.x)"
fi

# 4. Check GitHub Actions workflow
test_step "GitHub Actions deployment workflow exists"
if [ -f .github/workflows/deploy.yml ]; then
    pass
else
    fail ".github/workflows/deploy.yml not found"
fi

# 5. Check cymatics-bridge.js
test_step "cymatics-bridge.js exists"
if [ -f packages/web-platform/src/shared/cymatics-bridge.js ]; then
    pass
else
    fail "cymatics-bridge.js missing"
fi

# 6. Build web platform
test_step "Web platform builds successfully"
if npm run build --workspace=packages/web-platform &> /tmp/web-build.log; then
    pass
else
    fail "Web platform build failed (see /tmp/web-build.log)"
fi

# 7. Check Rust workspace (if exists)
if [ -f rust-engines/Cargo.toml ]; then
    test_step "Rust workspace compiles"
    if cd rust-engines && cargo check --workspace &> /tmp/rust-check.log; then
        pass
        cd ..
    else
        fail "Rust workspace check failed (see /tmp/rust-check.log)"
        cd ..
    fi
else
    echo "Skipping: Rust workspace not found"
fi

# 8. Check Godot project (if exists)
if [ -f godot-cathedral/project.godot ]; then
    test_step "Godot project.godot has config_version=5"
    if grep -q "config_version=5" godot-cathedral/project.godot; then
        pass
    else
        fail "Godot project is not version 5 (should be Godot 4.x)"
    fi
else
    echo "Skipping: Godot project not found"
fi

# 9. Check Python scripts (if they exist)
if [ -f design_suite_smoketest.py ]; then
    test_step "Python smoketest runs"
    if python design_suite_smoketest.py &> /tmp/python-test.log; then
        pass
    else
        warn "Python smoketest failed (see /tmp/python-test.log)"
    fi
else
    echo "Skipping: Python scripts not found"
fi

# 10. Check for .gitignore
test_step ".gitignore exists and excludes build artifacts"
if [ -f .gitignore ] && grep -q "node_modules" .gitignore && grep -q "dist" .gitignore; then
    pass
else
    fail ".gitignore missing or incomplete"
fi

echo ""
echo "======================================================"
echo "Validation Results:"
echo -e "  ${GREEN}PASSED: $PASS${NC}"
echo -e "  ${RED}FAILED: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ All critical validations passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Push to GitHub: git push origin main"
    echo "  2. Check deployment: https://github.com/Bekalah/cathedral-master/actions"
    echo "  3. Visit your site: https://bekalah.github.io/cathedral-master"
    exit 0
else
    echo -e "${RED}❌ Some validations failed. Please review errors above.${NC}"
    exit 1
fi
