#!/bin/bash
set -e

echo "🚀 Cathedral Free Deployment Script"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
DEPLOY_DIR="docs"
CIRCUITUM99_DIR="$DEPLOY_DIR/circuitum99"
DESIGN_SUITE_DIR="$DEPLOY_DIR/design-suite"
MAIN_SITE_DIR="$DEPLOY_DIR"

echo -e "${BLUE}📦 Building all applications...${NC}"

# Build Circuitum99
echo -e "${BLUE}  Building Circuitum99...${NC}"
cd apps/circuitum99
pnpm install || npm install
pnpm build || npm run build
cd ../..
echo -e "${GREEN}  ✅ Circuitum99 built${NC}"

# Build Cathedral Professional Design Suite
echo -e "${BLUE}  Building Cathedral Professional Design Suite...${NC}"
cd apps/cathedral-professional-design-suite
pnpm install || npm install
pnpm build || npm run build
cd ../..
echo -e "${GREEN}  ✅ Design Suite built${NC}"

# Build main web app
echo -e "${BLUE}  Building main website...${NC}"
cd apps/web
pnpm install || npm install
pnpm build || npm run build
cd ../..
echo -e "${GREEN}  ✅ Main website built${NC}"

# Create deployment directories
echo -e "${BLUE}📁 Creating deployment directories...${NC}"
mkdir -p "$CIRCUITUM99_DIR"
mkdir -p "$DESIGN_SUITE_DIR"

# Copy built files
echo -e "${BLUE}📋 Copying built files to deployment directory...${NC}"

# Copy Circuitum99
if [ -d "apps/circuitum99/dist" ]; then
    cp -r apps/circuitum99/dist/* "$CIRCUITUM99_DIR/"
    echo -e "${GREEN}  ✅ Circuitum99 copied${NC}"
else
    echo -e "${YELLOW}  ⚠️  Circuitum99 dist not found${NC}"
fi

# Copy Design Suite
if [ -d "apps/cathedral-professional-design-suite/dist" ]; then
    cp -r apps/cathedral-professional-design-suite/dist/* "$DESIGN_SUITE_DIR/"
    echo -e "${GREEN}  ✅ Design Suite copied${NC}"
else
    echo -e "${YELLOW}  ⚠️  Design Suite dist not found${NC}"
fi

# Copy main website
if [ -d "apps/web/dist" ]; then
    cp -r apps/web/dist/* "$MAIN_SITE_DIR/"
    echo -e "${GREEN}  ✅ Main website copied${NC}"
else
    echo -e "${YELLOW}  ⚠️  Main website dist not found${NC}"
fi

# Create index.html if it doesn't exist
if [ ! -f "$MAIN_SITE_DIR/index.html" ]; then
    echo -e "${BLUE}📄 Creating main index.html...${NC}"
    cat > "$MAIN_SITE_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cathedral of Circuits - Living Arcana</title>
    <meta name="description" content="Cathedral of Circuits - A complete Fable-style RPG with 22 Living Arcana, professional studios, and sacred geometry">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Cinzel', serif;
            background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%);
            color: #e0e0ff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .container {
            max-width: 1200px;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }
        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            color: #b0b0d0;
        }
        .links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .link-card {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 15px;
            padding: 2rem;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
        }
        .link-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 215, 0, 0.8);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }
        .link-card h2 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #ffd700;
        }
        .link-card p {
            color: #b0b0d0;
            line-height: 1.6;
        }
        .footer {
            margin-top: 4rem;
            color: #808090;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏰 Cathedral of Circuits</h1>
        <p class="subtitle">Living Arcana • Alpha et Omega • Magnum Opus v1.0</p>
        
        <div class="links">
            <a href="./circuitum99/" class="link-card">
                <h2>⚡ Circuitum 99</h2>
                <p>The eternal cycle of Alpha et Omega. Experience the 22 Living Arcana in their canonical deployment.</p>
            </a>
            
            <a href="./design-suite/" class="link-card">
                <h2>🎨 Professional Design Suite</h2>
                <p>Cathedral's professional-grade design tools with sacred geometry integration. Adobe/Figma replacement.</p>
            </a>
            
            <a href="https://github.com/Bekalah/cathedral-master" class="link-card">
                <h2>📚 Source Code</h2>
                <p>Explore the complete monorepo with 90+ packages, Godot 4.6 integration, and Turbo build system.</p>
            </a>
        </div>
        
        <div class="footer">
            <p>🔮 Unified Wisdom • Science • Art • Design</p>
            <p>Codex 144:99 • Liber Arcanae • Complete Asset Library</p>
        </div>
    </div>
</body>
</html>
EOF
    echo -e "${GREEN}  ✅ Main index.html created${NC}"
fi

# Create .nojekyll file for GitHub Pages
touch "$MAIN_SITE_DIR/.nojekyll"
echo -e "${GREEN}✅ .nojekyll created${NC}"

# Create CNAME file if needed (optional - uncomment and set your domain)
# echo "your-domain.com" > "$MAIN_SITE_DIR/CNAME"

echo ""
echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
echo ""
echo -e "${BLUE}Deployment locations:${NC}"
echo "  • Main site: $MAIN_SITE_DIR/"
echo "  • Circuitum99: $CIRCUITUM99_DIR/"
echo "  • Design Suite: $DESIGN_SUITE_DIR/"
echo ""
echo -e "${BLUE}Next steps for GitHub Pages:${NC}"
echo "  1. Commit changes: ${YELLOW}git add docs && git commit -m 'Deploy Cathedral applications'${NC}"
echo "  2. Push to GitHub: ${YELLOW}git push origin main${NC}"
echo "  3. Enable GitHub Pages in repository settings (use /docs folder)"
echo ""
echo -e "${BLUE}Your site will be available at:${NC}"
echo "  ${GREEN}https://bekalah.github.io/cathedral-master/${NC}"
echo ""
echo -e "${GREEN}🏰⚡ Cathedral of Circuits - Ready for the World${NC}"