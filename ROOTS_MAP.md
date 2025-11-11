# Cathedral Roots Map

This map lists canonical app roots, their frameworks, and normalization status.

- apps/web — Next.js 14 (static export enabled)
  - Entry: pages/index.tsx
  - Notes: Legacy Vite artifacts (index.html, src/\*) are ignored via tsconfig; optimizeCss disabled to avoid critters dependency.
  - Status: BUILD OK, EXPORT OK

- apps/circuitum99 — Vite + React
  - Entry: index.html → src/main.tsx → src/App.tsx
  - Notes: Previously missing source files; scaffolded minimal React Vite app.
  - Status: DEV OK (starts), BUILD TBD

- apps/synth-lab — Vite + React
  - Entry: index.html → src/main.tsx (already present)
  - Status: Untested in this pass

- apps/tarot-arena — Vite + React
  - Entry: apps/tarot-arena/index.html (per project.json)
  - Status: Untested in this pass

- Other apps (cosmogenesis-engine, cosmogenesis-visualizer, liber-arcanae, liber-arcanae-tarot, mystical-treasure-hunt, master-catalog-browser, magical-mystery-house, test-ground, worker, rosslyn-explorer)
  - Frameworks: Mixed (likely Vite/React)
  - Status: Untested in this pass

Rust/Bevy and Godot roots:

- rust-engines/, rust-bindings/ — missing Cargo.toml at root; tooling folders present under target/ from previous builds. No canonical crate root detected.
- engine/godot-rust — build script references a Cargo.toml via CRATE_DIR var.
- godot/ — Guide docs present; actual project.godot not found in repo root.

Deploy configs:

- apps/web — next.config.js configured for export; basePath conditional via env; out/ created.
- vercel.json — present at repo root (not validated yet).
- Render — no render.yaml detected; can generate for apps/web static site.

Next steps:

1. Test/build Vite apps (circuitum99, synth-lab, tarot-arena) and fix any missing deps.
2. Add render.yaml for static hosting of apps/web/out if desired.
3. Clean root TypeScript references/turbo targets if dead entries are found.
