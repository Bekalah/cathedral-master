#!/bin/bash
set -e

echo "🏰 Cathedral Monorepo Repair & Setup Script"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js version
echo -e "${BLUE}📋 Checking Node.js version...${NC}"
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo -e "${RED}❌ Node.js version 22+ required. Current: $(node --version)${NC}"
    echo -e "${YELLOW}💡 Install Node.js 25 with: nvm install 25 && nvm use 25${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"

# Check pnpm
echo -e "${BLUE}📋 Checking pnpm...${NC}"
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm not found. Installing...${NC}"
    npm install -g pnpm@latest
fi
echo -e "${GREEN}✅ pnpm version: $(pnpm --version)${NC}"

# Clean old installations
echo -e "${BLUE}🧹 Cleaning old installations...${NC}"
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
rm -rf apps/*/dist
rm -rf packages/*/dist
rm -rf .turbo
echo -e "${GREEN}✅ Cleaned old installations${NC}"

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies with pnpm...${NC}"
pnpm install --frozen-lockfile || pnpm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Verify critical packages
echo -e "${BLUE}🔍 Verifying critical packages...${NC}"
CRITICAL_APPS=(
    "apps/circuitum99"
    "apps/cathedral-professional-design-suite"
    "apps/web"
)

for app in "${CRITICAL_APPS[@]}"; do
    if [ -f "$app/package.json" ]; then
        echo -e "${GREEN}  ✓ $app${NC}"
    else
        echo -e "${YELLOW}  ⚠ $app missing package.json${NC}"
    fi
done

# Check Godot project
echo -e "${BLUE}🎮 Checking Godot project...${NC}"
if [ -f "godot-project/project.godot" ]; then
    GODOT_VERSION=$(grep "config/features" godot-project/project.godot | grep -o '"[0-9.]*"' | tr -d '"')
    echo -e "${GREEN}✅ Godot project found (version: $GODOT_VERSION)${NC}"
else
    echo -e "${RED}❌ Godot project not found${NC}"
fi

# Create necessary directories
echo -e "${BLUE}📁 Creating necessary directories...${NC}"
mkdir -p docs/design-suite
mkdir -p docs/circuitum99
mkdir -p cathedral-data
echo -e "${GREEN}✅ Directories created${NC}"

# Update turbo cache
echo -e "${BLUE}🔄 Updating turbo cache...${NC}"
npx turbo daemon restart 2>/dev/null || true
echo -e "${GREEN}✅ Turbo cache updated${NC}"

echo ""
echo -e "${GREEN}🎉 Monorepo repair complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Build all packages: ${YELLOW}pnpm run build:all${NC}"
echo "  2. Run tests: ${YELLOW}pnpm test${NC}"
echo "  3. Start dev server: ${YELLOW}pnpm run dev:design-suite${NC}"
echo ""
echo -e "${GREEN}🏰 Cathedral of Circuits - Ready for Development${NC}"