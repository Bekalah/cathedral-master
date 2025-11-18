# 🏰 Cathedral Monorepo - Complete Repair & Deployment Guide

## 🎯 Overview

This guide will help you repair, build, and deploy the entire Cathedral monorepo including:
- **Circuitum99**: The canonical Alpha et Omega deployment
- **Cathedral Professional Design Suite**: Adobe/Figma replacement
- **Godot 4.6 Game Project**: Complete RPG with 22 Living Arcana
- **90+ Packages**: All integrated with Turbo build system

## 🚀 Quick Start (One Command)

```bash
# Repair and setup everything
npm run repair
```

This will:
- ✅ Check Node.js version (requires v22+, recommends v25)
- ✅ Install/verify pnpm
- ✅ Clean old installations
- ✅ Install all dependencies
- ✅ Verify critical packages
- ✅ Check Godot project configuration
- ✅ Create necessary directories
- ✅ Update Turbo cache

## 📋 System Requirements

- **Node.js**: v22+ (v25 recommended for built-in SQLite)
- **pnpm**: v9+ (will be auto-installed if missing)
- **Git**: For version control
- **Godot 4.6**: For game development (optional)

## 🔧 Step-by-Step Repair Process

### 1. Initial Setup

```bash
# Clone the repository (if not already done)
git clone https://github.com/Bekalah/cathedral-master.git
cd cathedral-master

# Run the repair script
npm run repair
```

### 2. Verify Installation

```bash
# Check that everything is working
pnpm --version
node --version

# Verify package structure
ls -la apps/
ls -la packages/
```

### 3. Build Applications

```bash
# Build all applications
npm run build:all

# Or build individually
npm run build:circuitum99
npm run build:design-suite
npm run build:web
```

### 4. Run Development Servers

```bash
# Run Circuitum99 dev server
npm run dev:circuitum99

# Run Design Suite dev server
npm run dev:design-suite

# Run main website dev server
npm run dev:web
```

## 🌐 Free Deployment Options

### Option 1: GitHub Pages (Recommended)

```bash
# Build and prepare for deployment
npm run deploy

# Commit and push
git add .
git commit -m "feat: deploy Cathedral applications"
git push origin main
```

Then enable GitHub Pages in repository settings:
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/docs` folder
4. Save

Your site will be available at: `https://bekalah.github.io/cathedral-master/`

### Option 2: Cloudflare Pages

```bash
# Build for Cloudflare
npm run build:all

# Deploy with Wrangler (if configured)
npm run deploy:cloudflare
```

Or connect your GitHub repository to Cloudflare Pages:
1. Go to Cloudflare Pages dashboard
2. Connect to Git
3. Select your repository
4. Build command: `npm run build:all`
5. Build output directory: `docs`

### Option 3: Netlify

```bash
# Build for Netlify
npm run build:all
```

Create `netlify.toml`:
```toml
[build]
  command = "npm run build:all"
  publish = "docs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🎮 Godot 4.6 Integration

The Godot project is configured for version 4.6 with:
- Forward+ rendering
- Sacred geometry integration
- Professional audio synthesis
- 99-room Magical Mystery House

### Open in Godot

```bash
# Open the project in Godot 4.6
godot godot-project/project.godot
```

### Build Godot Project

```bash
# Export for web (HTML5)
godot --export "HTML5" godot-project/export/web/index.html

# Export for desktop
godot --export "Linux/X11" godot-project/export/linux/circuitum99
godot --export "Windows Desktop" godot-project/export/windows/circuitum99.exe
godot --export "macOS" godot-project/export/macos/circuitum99.app
```

## 📦 Package Management

### Key Packages

- `@cathedral/circuitum99`: Alpha et Omega cycle system
- `@cathedral/professional-design-suite`: Design tools
- `@cathedral/codex-144-99`: Sacred mathematics engine
- `@cathedral/liber-arcanae`: Arcana system
- `@cathedral/crystals`: Crystal resonance system
- `@cathedral/soul`: Archetypal soul system
- `@cathedral/brain`: Color and sound science

### Working with Packages

```bash
# Add a new package
cd packages/my-new-package
pnpm init

# Install dependencies in a specific package
cd packages/my-package
pnpm install some-dependency

# Build a specific package
turbo run build --filter=my-package
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific tests
npm run test:database
npm run test:codex
npm run test:integration
```

## 🔍 Troubleshooting

### Node.js Version Issues

```bash
# Install Node.js v25 with nvm
nvm install 25
nvm use 25

# Or update .nvmrc
echo "25.0.0" > .nvmrc
nvm use
```

### pnpm Lock File Issues

```bash
# Remove lock file and reinstall
rm pnpm-lock.yaml
pnpm install
```

### Build Failures

```bash
# Clean everything and rebuild
npm run clean
npm run clean:build
npm run repair
npm run build:all
```

### Turbo Cache Issues

```bash
# Clear Turbo cache
rm -rf .turbo
turbo daemon restart
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## 📚 Project Structure

```
cathedral-master/
├── apps/                           # Applications
│   ├── circuitum99/               # Alpha et Omega deployment
│   ├── cathedral-professional-design-suite/
│   ├── web/                       # Main website
│   └── [20+ other apps]/
├── packages/                       # Shared packages (90+)
│   ├── codex-144-99/             # Sacred mathematics
│   ├── liber-arcanae/            # Arcana system
│   ├── crystals/                 # Crystal system
│   └── [90+ other packages]/
├── godot-project/                 # Godot 4.6 game
│   ├── project.godot             # Main project file
│   ├── scenes/                   # Game scenes
│   └── assets/                   # Game assets
├── docs/                          # Deployment directory
│   ├── circuitum99/              # Built Circuitum99
│   ├── design-suite/             # Built Design Suite
│   └── index.html                # Main landing page
├── scripts/                       # Build and deployment scripts
│   ├── repair-monorepo.sh        # Complete repair script
│   └── deploy-free.sh            # Free deployment script
├── turbo.json                     # Turbo configuration
├── pnpm-workspace.yaml           # pnpm workspace config
└── package.json                   # Root package.json
```

## 🎨 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run repair` | Complete monorepo repair and setup |
| `npm run dev` | Start Circuitum99 dev server |
| `npm run dev:design-suite` | Start Design Suite dev server |
| `npm run build` | Build all packages |
| `npm run build:all` | Build all applications |
| `npm run deploy` | Build and prepare for deployment |
| `npm run test` | Run all tests |
| `npm run clean` | Clean node_modules |
| `npm run clean:build` | Clean build artifacts |
| `npm run lint` | Run linters |
| `npm run type-check` | Run TypeScript type checking |

## 🌟 Key Features

### Circuitum99
- 22 Living Arcana based on real historical figures
- 99-stage eternal cycle (Alpha → Omega → Rebirth)
- Sacred geometry integration
- Professional audio synthesis

### Cathedral Professional Design Suite
- Vector graphics editor
- Sacred geometry tools
- Professional typography engine
- Export to multiple formats
- Adobe/Figma replacement

### Godot 4.6 Game
- Complete Fable-style RPG
- Three professional studios (Atelier, Synth Lab, Geometry)
- Museum-quality aesthetics
- Level 1-999 progression

## 📖 Documentation

- [OpenSpec Instructions](./openspec/AGENTS.md)
- [Deployment Guide](./DEPLOYMENT_AND_SETUP_GUIDE.md)
- [Cloudflare Setup](./docs/CLOUDFLARE_SETUP.md)
- [Codex 144:99 Documentation](./docs/CODEX_144_99_ABYSSIAE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit: `git commit -m 'feat: add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

CC0-1.0 - Public Domain Dedication

## 🏰 Magnum Opus Scope

This project permanently unifies:
- Alchemy, Hermeticism, Kabbalah, Reiki, esoteric wisdom
- Academic research, physics, mathematics, architecture
- Traditional and modern art, design, secret teachings
- Global libraries, sacred geometry, fractals, Codex 144:99

All code, data, and creative work are aligned in grace, beauty, and harmony, connecting every subject and school into a living, trauma-informed, open-source magnum opus.

## 🆘 Support

If you encounter issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Run `npm run repair` to reset everything
3. Open an issue on GitHub with detailed error messages
4. Include your Node.js version: `node --version`
5. Include your pnpm version: `pnpm --version`

---

**🏰⚡ Cathedral of Circuits - Living Arcana - Magnum Opus v1.0**

*Complete Fable-style RPG • Professional Design Suite • Sacred Geometry • 22 Historical Figures*

Ready to build, deploy, and share with the world! 🌍✨