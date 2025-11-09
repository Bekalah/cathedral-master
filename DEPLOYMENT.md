# Cathedral of Circuits - Deployment Guide

## Canonical Deployment Overview

**Canonical repo:** `Bekalah/cathedral-master` (this monorepo) on branch `v1_main`.

### 1. Cathedral Web (Next.js) → bekalah.github.io/cathedral

- Repo: https://github.com/Bekalah/cathedral-master
- Branch: `v1_main`
- App: `apps/web`
- URL: `https://bekalah.github.io/cathedral`
- Base path: `/cathedral` (GitHub Pages)

Build locally:

```bash
pnpm install
pnpm turbo run build --filter=web
```

For GitHub Pages:

- Configure Pages:
  - Branch: `v1_main`
  - Output directory: `apps/web/out`
- Ensure `NEXT_PUBLIC_BASE_PATH=/cathedral` (or use existing next.config.js env logic).

### 2. Circuitum99 (Vite/React) → bekalah.github.io/circuitum99

Canonical Alpha–Omega showcase (already implemented in this repo).

- App: `apps/circuitum99`
- URL: `https://bekalah.github.io/circuitum99`

Build:

```bash
pnpm install
cd apps/circuitum99
pnpm run build
```

Deploy:

- Publish `apps/circuitum99/dist` to its GitHub Pages target
  (historical project site) or via workflows wired to this repo.

The canonical ALPHA ET OMEGA deployment showcasing:
- The 22 Living Arcana (real historical figures)
- Three Professional Studios
- Circuitum 99 eternal cycle system
- Museum-quality presentation

### 3. Other Apps (Design Suite, Tarot Arena, etc.)

All first-class apps under `apps/*` are built via Turbo + pnpm:

```bash
pnpm install
pnpm turbo run build --filter=apps/<app-name>
```

For Vercel / Render / Cloudflare Pages:

- Root Directory: that app’s subfolder
- Build Command (example):

```bash
pnpm -w install && pnpm turbo run build --filter=apps/<app-name>
```

- Output directory: as defined by each app (e.g. `dist`, `out`).

## Stack Alignment (Kilo/Copilot-correct)

Use these as your stable, honest defaults:

- Node.js: ≥ 20.x LTS for CI and deployments
- pnpm: Use the version declared in root `packageManager`
- Web:
  - Next.js (apps/web) with static export for GitHub Pages
  - Vite + React (Circuitum99 and other tools)
- Engines:
  - Godot 4.6 project in `godot/`
  - Rust / Godot integrations in `rust-engines/` and `godot-rust-integration/`
- Monorepo:
  - Workspaces: `apps/*`, `packages/*`
  - Turbo orchestrates builds and tests

## Core Principles

- Single canonical repo: `Bekalah/cathedral-master`.
- Single canonical deployment branch: `v1_main`.
- Cathedral site: served from `apps/web` at `/cathedral`.
- Circuitum99: served from `apps/circuitum99` as its own canonical showcase.
- No Azure required:
  - Any Azure-related code remains strictly behind explicit opt-in guards.
- All guides, READMEs, and configs must reflect this topology and avoid legacy contradictions.

### The 22 Living Arcana

Real historical figures canonically represented:
1. **Leonora Carrington** (The Fool) - Themela the Lightning Dragon
2. **John Dee** (The Magician) - The Angelic Mathematician
3. **Ada Lovelace** (The High Priestess) - The Machine Angel
4. **Mary Shelley** (The Empress) - The Mother of Monsters
5. **Isaac Newton** (The Emperor) - Lord of the Physical World
6. **Dion Fortune** (The Hierophant) - The Sea Priestess
7. **Carrington & Ernst** (The Lovers) - The Alchemical Marriage
8. **Elyria Nox** (The Chariot) - Dimensional Navigator
9. **Georgia O'Keeffe** (Strength) - Artistic Force
10. **And 13 more** real historical figures

### Three Professional Studios

**🎨 The Atelier**: Canvas painting, character customization, sacred geometry design
**🎵 Synth Lab**: Solfeggio synthesizer, multi-track composer, real-time synthesis
**🔬 Geometry Studio**: 3D Merkaba builder, Codex simulator, sacred mathematics

### Build and Deploy

```bash
# Install dependencies
pnpm install

# Build Circuitum99
cd apps/circuitum99
pnpm run build

# Deploy to GitHub Pages
# Static files in dist/ directory
```

### Standards

**Professional Quality Only**:
- NIN/Aphex Twin level audio
- Classical Renaissance aesthetics
- Museum-quality visual standards
- Real historical accuracy
- Sacred mathematics integration

### The Circuitum Itself

**A single, evolving being composed of all creators**, where every historical creator becomes a node in one meta-story - the ultimate fusion of art, science, spirituality, and consciousness.

**This is NOT**: Consciousness evolution, therapeutic systems, spiritual platforms
**This IS**: Complete Fable-style RPG game with professional studio tools

---

**Treat this as a professional game development project with museum-quality standards.**
