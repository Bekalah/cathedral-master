# Cathedral Master Repository Setup

**OpenSpec Magnum Opus v1.0 - Canonical Documentation**

---

## Repository Information

### Primary Repository

- **Name**: `cathedral-master`
- **Owner**: `bekalah`
- **GitHub URL**: https://github.com/bekalah/cathedral-master
- **Local Path**: `/Users/rebeccalemke/cathedral-real`
- **Branch**: `main`

### Git Remotes

```bash
cathedral-master  https://github.com/bekalah/cathedral-master.git (fetch/push)
```

---

## Monorepo Structure

### Package Manager

- **Tool**: pnpm 9.15.0
- **Workspace Strategy**: pnpm workspaces with TurboRepo 2.0

### Root Package

```json
{
  "name": "@openspec/magnum-opus",
  "version": "1.0.0",
  "description": "OpenSpec Magnum Opus v1.0 - Cathedral Master Monorepo | Hermetic RPG + Creative Workstation | Godot 4.4 + Rust + React + Three.js"
}
```

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
```

---

## Installed Workspace Packages (64 total)

### Apps (19 packages in `apps/`)

1. `@cathedral/circuitum99` - Mystical circuit visualization with gem tower integration
2. `@cathedral/cosmogenesis-learning-engine` - AI-powered mystical education with sacred geometry
3. `@cathedral/liber-arcanae-app` - 22 Living Tarot - Hermetic RPG Interface
4. `@cathedral/magical-mystery-house` - Mystical adventure game with sacred geometry
5. `@cathedral/mystical-treasure-hunt` - Treasure hunt experience
6. `@cathedral/synth-lab` - Synthesis laboratory
7. `@cathedral/tarot-arena` - Tarot arena application
8. `@cathedral/test-ground` - Testing environment
9. `@bekalah/cathedral-data` - Data management
10. `@bekalah/cathedral-web` - Web platform (Next.js)
11. `@bekalah/creative-engine` - Creative engine
12. `@bekalah/gentle-fusion-lab` - Fusion laboratory
13. `@bekalah/liber-arcanae-tarot` - Tarot system

### Packages (45 packages in `packages/`)

#### Core Cathedral Packages

1. `@cathedral/brain` - Core processing intelligence
2. `@cathedral/config` - Shared configuration
3. `@cathedral/core` - Core utilities
4. `@cathedral/shared` - Shared utilities and types
5. `@cathedral/soul` - Soul/spirit system
6. `@cathedral/types` - TypeScript type definitions
7. `@cathedral/ui` - UI component library

#### Codex & Data Systems

8. `@cathedral/codex-144-99` - Codex 144:99 core system
9. `@cathedral/codex-engine` - Codex processing engine
10. `@cathedral/codex-musical-system` - Sacred tones and harmonic structures
11. `@cathedral/mystical-data-unified` - Unified mystical data (tarot, astrology)
12. `codex-14499` - Codex utilities

#### Sacred Geometry & Fractals

13. `@cathedral/sacred-geometry-core` - Fractal settings and geometry nodes
14. `@cathedral/fractal-flames-daemon-deity` - Fractal visualization system

#### Engines & Systems

15. `@cathedral/synthesis-engine` - Core synthesis and fusion system (a + b = d)
16. `@cathedral/three-engine` - Three.js wrapper for 3D visualizations
17. `@cathedral/fusion-kink-engine` - Fusion mechanics engine
18. `@cathedral/fusion-kink-generator` - Alchemical Fusion Generator (quality-focused)
19. `@cathedral/game-engine` - Game engine core
20. `@cathedral/mystical-sound-engine` - Sound and audio system
21. `@cathedral/node-tree-engine` - Node tree processing

#### Cathedral Features

22. `@cathedral/cathedral-architect` - Transforms Codex nodes into explorable chambers
23. `@cathedral/cathedral-game-engine` - CYOA book game engine
24. `@cathedral/gem-tower-engine` - Crystal and gem visualization system
25. `@cathedral/portal-system` - Navigation and transition system
26. `@cathedral/smooth-movement-system` - Fluid animation and motion controls

#### Godot Integration

27. `@cathedral/godot-codex-14499` - Godot Codex 144:99 integration
28. `@cathedral/godot-design-studio` - Godot design tools
29. `@cathedral/godot-liber-arcanae` - Godot Liber Arcanae integration
30. `@cathedral/godot-vfx-library` - Godot VFX library

#### Liber Arcanae

31. `@cathedral/liber-arcanae` - Sacred mystical library with Codex integration
32. `@cathedral/stone-grimoire` - Stone grimoire system
33. `liber-arcanae-app` - Liber Arcanae application package

#### Creative Systems

34. `@cathedral/art-generation-node` - Art generation system
35. `@cathedral/avatar-experience-system` - Avatar and experience system
36. `@cathedral/circuit-craft-creative-game` - Circuit crafting game
37. `@cathedral/circuitum99-arcanae-cyoa` - Circuitum99 CYOA integration
38. `@cathedral/design-library` - Design system library
39. `@cathedral/logo-system` - Logo and branding system

#### Synthesis & Sound

40. `@cathedral/synth` - Synthesis system
41. `@cathedral/cosmogenesis` - Cosmogenesis system
42. `@cathedral/crystals` - Crystal system
43. `@cathedral/labs` - Laboratory environment
44. `@cathedral/luxcrux` - Luxcrux system

#### Utilities & Infrastructure

45. `@cathedral/inter-app-communicator` - Inter-app communication
46. `@cathedral/lightweight-library` - Lightweight utility library
47. `@cathedral/plugin-system` - Plugin architecture
48. `@cathedral/tesseract-bridge` - Tesseract bridge system
49. `@bekalah/cathedral-engines` - Engine collection
50. `@bekalah/cathedral-worker` - Web worker utilities

---

## Technology Stack

### Frontend

- **React** 18.3.1
- **Next.js** (static export)
- **Vite** 6.0.1
- **Three.js** 0.169.0
- **@react-three/fiber** 8.17.10
- **@react-three/drei** 9.114.3

### Build & Tooling

- **TurboRepo** 2.0.0
- **TypeScript** 5.x
- **esbuild** 0.25.0 (enforced via pnpm overrides)
- **@vitejs/plugin-react** 5.1.0

### Backend & Runtime

- **Node.js** >=20.0.0
- **Godot** 4.4 (HTML5 export slot in `apps/web/public/godot`)
- **Rust** (workspace in `rust-engines/`, GDExtension for Godot)

### State & Animation

- **Zustand** 5.0.1
- **Framer Motion** 11.11.11

### Audio

- **Tone.js** 14.7.77

---

## Key Scripts

```bash
# Development
pnpm dev              # Run all dev servers via Turbo
pnpm build            # Build all packages and apps
pnpm test             # Run all tests
pnpm lint             # Lint all code
pnpm clean            # Clean build artifacts

# Specialized
pnpm cathedral        # Launch Godot Cathedral project
pnpm rust:build       # Build Rust engines (workspace)
pnpm rust:test        # Test Rust engines
pnpm fusion           # 🜏 A × B = D - Fusion Kink alive
```

---

## Python Design Suite

### Location

- `design-suite/` - Modular Python design suite
- `hall-of-mysteries/` - Frater Achad system integration

### Validation

```bash
# VS Code task: "validate: design suite"
# Runs: design_suite_smoketest.py + achad_integration_smoketest.py
```

### Features

- Headless geometry/fractal rendering
- JSON export for Godot/JS integration
- Frater Achad pathways mapped to palettes/geometry/fractals

---

## Deployment Targets

### GitHub Pages

- **Workflow**: `.github/workflows/pages.yml`
- **Branch**: `gh-pages`
- **URL**: https://bekalah.github.io/cathedral-master

### Vercel

- **Config**: `vercel.json`
- **Build Command**: `pnpm turbo run build --filter=./apps/web`
- **Output Directory**: `apps/web/out`
- **Project**: cathedral-master

### Cloudflare Pages

- **Config**: `wrangler.toml`
- **Build Command**: `pnpm turbo run build`
- **Publish Directory**: `apps/web/out`

---

## OpenSpec Integration

### OpenSpec Files

- `openspec/` - OpenSpec proposal and change tracking
- `AGENTS.md` - AI assistant instructions and OpenSpec workflow
- `turbo.json` - TurboRepo configuration with OpenSpec tasks

### OpenSpec Tasks (Turbo)

- `openspec-validate` - Validate OpenSpec JSON/MD files
- `openspec-sync` - Sync OpenSpec changes
- `pr-validate` - Validate PRs against OpenSpec rules

---

## Integration Map

### Core Document

- `CATHEDRAL_INTEGRATION_MAP.json` - Master integration mapping
- Maps Codex 144:99 nodes → palettes → geometry → fractals → audio

### Bridge Files

- `bridge-connector.mjs` - JavaScript bridge connector
- `packages/web-platform/src/shared/cymatics-bridge.js` - Cymatics bridge
- `packages/tesseract-bridge/` - Tesseract bridge package

---

## Consolidation & Sync Tools

### Repo Consolidation

```bash
tools/sync/consolidate_repos.sh           # Dry-run by default
tools/sync/consolidate_repos.sh --apply   # Apply missing-only sync
```

### Godot Export Import

```bash
tools/sync/import_godot_export.sh              # Dry-run
tools/sync/import_godot_export.sh --apply      # Copy Godot HTML5 export
```

### Cathedral Master Sync

```bash
tools/sync/cathedral_master_sync.sh       # Subtree fetch/pull
```

---

## External Imports

### Vendored Content

- `external/cathedral-master/` - Imported Rust/Godot workspace
- `external/imports/CathedralMonorepo-20251101/` - Imported monorepo content
  - Provenance: `external/imports/CathedralMonorepo-20251101/PROVENANCE.md`

---

## Magnum Opus Scope

**Permanent Unified Vision:**
This project unifies all traditions, wisdom schools, sciences, arts, and design disciplines:

- Alchemy, Hermeticism, Kabbalah, Reiki, and esoteric wisdom
- Academic research, anthropology, physics, mathematics, and architecture
- Traditional and modern art, design, and the secret teachings of all ages
- Integration of global libraries, sacred geometry, fractals, and Codex 144:99

All code, data, and creative work are aligned in grace, beauty, and harmony, connecting every subject and school into a living, trauma-informed, open-source magnum opus.

**See**: `AGENTS.md` for full scope declaration.

---

## Recent Major Updates (Nov 2025)

### ✅ Completed

1. **Vite 6 + esbuild 0.25 Upgrade** - All workspace packages upgraded
2. **Created Missing Packages** - 10 new @cathedral/\* packages:
   - synthesis-engine, three-engine, codex-musical-system
   - mystical-data-unified, gem-tower-engine, fusion-kink-generator
   - smooth-movement-system, portal-system, codex-engine
   - sacred-geometry-core (updated to ES modules)
3. **Fixed TypeScript Configs** - Updated tsconfig.json project references
4. **Resolved Duplicate Names** - Fixed @cathedral/liber-arcanae conflict
5. **Turbo Build** - 43/44 tasks passing (node-tree-engine has minor warnings)
6. **Dependencies Installed** - 2000+ packages across 64 workspaces
7. **Merged Integration Branch** - merge/cathedral-master-20251101 → main
8. **Consolidation Scripts** - Dry-run tools for safe repo merging

---

## Repository Reduction Plan

### Goal

Consolidate multiple scattered repos into single `cathedral-master` monorepo.

### Sources to Merge

- ❌ Eliminate duplicate repos
- ✅ Merge unique content from:
  - Replit `master-cathedral` (already imported to `external/cathedral-master`)
  - GitHub `bekalah/cathedral` (if exists)
  - Offline folders: `cathedral-fixed-clean`, `cathedral-real-backup`
  - iCloud: `CATHEDRAL-SORT THROUGH`

### Strategy

1. Use `tools/sync/consolidate_repos.sh` to generate reports
2. Review unique content before applying
3. Archive old repos after successful merge
4. Keep only `cathedral-master` as canonical source

---

## Contact & Ownership

- **Author**: Rebecca Respawn (bekalah)
- **License**: MIT (with Copyright Rebecca Lemke for proprietary packages)
- **Repository**: https://github.com/bekalah/cathedral-master
- **Documentation**: This file is the canonical reference for OpenSpec v1.0

---

_Last Updated: November 5, 2025_
_OpenSpec Magnum Opus v1.0 - Cathedral Master Monorepo_
