# Cathedral Real - Modern Deployment Strategy

This document describes how to deploy the Cathedral Real creative cosmos builder and fable-style RPG slice using platforms and configurations that are either present in this repository or explicitly supported by real, verifiable setups.

All statements below are intended to be:

- Concrete and testable.
- Grounded in existing files and configs.
- Aligned with Cathedral Mode V1.0 and the REGISTRY-driven vertical slice.
- Non-medical, non-therapeutic, and free of cultic or overblown guarantees.

## 🎯 PLATFORM MAPPING

### Vercel (Primary app hosting)

Vercel is the primary recommended target for web-facing applications defined in this monorepo.

Representative mapping (must be kept aligned with real package.json/vercel configs):

- apps/web — Main Cathedral Real web interface (when present and configured).
- apps/circuitum99 — Circuitum99 experience.
- apps/cathedral-professional-design-suite — Professional design and studio tools.
- packages/palette-studio — Color and palette utilities exposed via web UIs where applicable.
- packages/geometry-studio — Geometry tools and visualizations where wired into web apps.

Vercel routing and builds should follow concrete configuration files such as:

- main/vercel.json

Any additional apps must only be documented here once their deployment configs exist in-repo.

### Static hosting and CDN (including Cloudflare, if configured)

Static and CDN-style hosting may be used for:

- Generated documentation and specs.
- REGISTRY exports and other JSON data snapshots.
- Landing/overview content that does not require dynamic backends.

Cloudflare or other static providers MUST only be referenced as active deployment targets when:

- A corresponding wrangler/config file or documented pipeline exists in this repo.
- Scope is limited to static or cacheable content (docs, REGISTRY views, assets).

If no such configs are present, treat Cloudflare/static as an implementation option, not an active promise.

### Backend and services

Backend services (Node/Python/Rust) MUST NOT be marketed as production-ready in this document unless:

- There is a real service definition (e.g. render.yaml, Dockerfile, infra config) in this repo.
- The build and runtime commands are testable from a fresh clone.

Example patterns (to be used only when backed by real configs):

- Node/TypeScript API surfaces for REGISTRY-backed reads.
- Minimal services for catalog, IDs, or content export.

Remove or update any references that suggest fully managed backends where no such infra is defined.

### Godot 4.x (Canonical game/vertical slice engine)

Godot 4.x is the canonical engine for the Cathedral game/vertical slice.

Deployment and packaging should be grounded in:

- godot/project.godot
- Existing Godot scenes, scripts, and integrations present in this repository.

Supported patterns (when validated in this repo):

- Desktop exports built from the Godot project.
- Web exports (HTML5/WebAssembly) when configured in the Godot project settings.
- Use of rust-engines or bindings only where concrete code and build instructions exist.

No VR/AR, console, or generic “3D everywhere” promises are made here unless explicitly implemented and documented.

### Future platforms (only when backed by real code)

The following are considered possible future extensions and MUST NOT be described as active or guaranteed:

- Additional Rust engines (e.g. Bevy) for simulations.
- Browser-based 3D/WebGL engines (e.g. Babylon.js/Three.js) beyond what is wired into current tools.
- Console or native builds without verified toolchains and config in this repo.
- Any other platform not anchored to concrete, versioned configs and repeatable builds.

These belong to a long-term creative roadmap, not current deployment obligations.

## 🚀 DEPLOYMENT CONFIGURATIONS (PATTERNS ONLY)

This section outlines patterns that MUST be aligned with actual configuration files. Do not treat these as authoritative if they diverge from real configs.

### Vercel

- Use the root-level vercel.json (for example: main/vercel.json) or per-app configuration to:
  - Map apps/web and other apps to their build commands.
  - Define routes that match existing app directories.
- Validate with:
  - pnpm install
  - pnpm build (or app-specific build commands)
  - Vercel preview deployments using the same config.

### Static hosting / CDN

When wrangler.toml or equivalent static hosting configs exist:

- Limit scope to:
  - Built static sites
  - Documentation
  - REGISTRY exports
  - Non-sensitive assets

Ensure commands referenced in those configs are real and pass locally.

### Backend services

Only document backend deployment steps when:

- A concrete configuration file (e.g., render.yaml, Dockerfile, infra manifests) exists.
- The referenced build/start commands succeed in CI or local runs.

If such files are removed or out of date, this document should be updated to match.

## 💡 GUIDING PRINCIPLES

- Prefer platforms and flows that:
  - Can be run locally from a fresh clone.
  - Use pnpm and workspace tooling defined in this repo.
  - Align with REGISTRY-first design and vertical slice IDs.
- Avoid:
  - Overstated claims (“complete universe”, “ready everywhere”, “support for all consoles/VR/AR”) unless backed by real tests.
  - Medical, therapeutic, or spiritual guarantees.
  - Cultic or guru-style language.

## 🎮 CATHEDRAL REAL SCOPE (VERTICAL SLICE)

This deployment strategy is intended to reliably support the Cathedral Real vertical slice, including:

- Godot-based playable slice grounded in existing project.godot and scenes.
- Circuitum99 and related experiences where wired into apps/.
- Professional and studio tools (palette, geometry, design suites) where present and buildable.
- Codex and REGISTRY views consistent with main/openspec specifications and vertical_slice_ids tests.

All of the above must be:

- Backed by real source in this repository.
- Buildable with documented commands.
- Deployable via configurations that exist in-version.

No blanket “READY FOR MODERN DEPLOYMENT!” guarantee is made; readiness is established by passing builds, tests, and verified deployments from this repo.
