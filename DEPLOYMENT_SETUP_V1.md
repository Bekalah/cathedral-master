# 🚀 V1 Cathedral Deployment Setup

## Repository Configuration
- **Primary Repository**: https://github.com/Bekalah/cathedral-master
- **Primary Branch**: v1_main
- **Remote Aliases**: v1_main, v1_master, cathedral-master

## Free Deployment Resources Configured

### 1. Vercel Deployment
- **Config**: `.github/workflows/vercel-deploy.yml`
- **Branch**: v1_main
- **Service**: Vercel (Free tier)
- **Apps**: web, synth-lab, tarot-arena, test-ground

### 2. Azure Static Web Apps
- **Config**: `apps/web/azure-static-web-apps.yml`
- **Branch**: v1_main
- **Service**: Azure Static Web Apps (Free)
- **Features**: Global CDN, HTTPS, Custom domains

### 3. Cloudflare Workers
- **Config**: `apps/web/wrangler.toml`
- **Service**: Cloudflare Workers (Free)
- **Limits**: 100,000 requests/day

### 4. GitHub Pages
- **Config**: `.github/workflows/pages.yml`
- **Branch**: v1_main
- **Service**: GitHub Pages (Free)
- **Features**: Static site hosting

### 5. Turbo Monorepo
- **Config**: `turbo.json`
- **Features**: Multi-app builds, dependency optimization
- **Apps**: 19+ applications ready for deployment

## Godot 4.5 Integration
- **Location**: `godot/` directory
- **Version**: Godot 4.5
- **Build System**: Integrated with Turbo
- **Export**: Multiple platforms (Web, Desktop, Mobile)

## V1 Main Branch Setup
```bash
# Primary remote configuration
git remote add v1_main https://github.com/Bekalah/cathedral-master.git
git remote add v1_master https://github.com/Bekalah/cathedral-master.git

# Push to v1_main for deployments
git push v1_main v1_main:v1_main
```

## Apps Ready for Deployment
1. **apps/web/** - Next.js Web Application
2. **apps/circuitum99/** - Circuitum Studio
3. **apps/synth-lab/** - Audio Synthesis Lab
4. **apps/tarot-arena/** - Tarot Gaming Platform
5. **apps/test-ground/** - Testing Environment
6. **apps/liber-arcanae/** - Mystical Applications
7. **apps/learning-device/** - Educational Tools
8. **apps/cathedral-of-circuits/** - Cathedral Circuits
9. **apps/frontend/** - Frontend Components

## Deployment Commands
```bash
# Deploy all apps via Turbo
turbo run build

# Deploy to Vercel
vercel --prod

# Deploy to Cloudflare
wrangler publish

# Deploy to GitHub Pages
npm run deploy:pages
```

## Environment Variables
- Set in deployment platform dashboards
- Link to cathedral-master repository
- Configure for v1_main branch
- Enable auto-deployment on push

---
**Status**: ✅ Configured and Ready
**Repository**: https://github.com/Bekalah/cathedral-master
**Branch**: v1_main
**Updated**: 2025-11-06