# Cosmic Helix Renderer

Static, offline renderer for layered sacred geometry. Double-click `index.html` in any modern browser to view the 1440x900 canvas. No build step, no network requests.

## Quick start (offline)
1. Ensure this folder contains `index.html`, `js/helix-renderer.mjs`, and `data/palette.json`.
2. Double-click `index.html` (or drag it into an open browser window). No server is required.
3. The header status reports whether the custom palette loaded or if the safe fallback palette is active.

If the browser blocks `file://` fetch calls the renderer stays calm: the fallback palette is used and a notice appears in the lower corner of the canvas.

## Layer stack
1. **Vesica field** – foundational intersecting circles arranged across three calm tiers.
2. **Tree-of-Life scaffold** – ten sephirot nodes connected by twenty two paths.
3. **Fibonacci curve** – a static logarithmic spiral drawn as successive quarter arcs.
4. **Double-helix lattice** – two phase-shifted strands with neutral crossbars.

Each layer is handled by a small pure function inside `js/helix-renderer.mjs`, keeping geometry modular and easy to reason about.

## Palette handling
- `index.html` attempts to load `data/palette.json` with a local `fetch`.
- Missing or partial palette data triggers a safe fallback palette bundled inside the page.
- The renderer updates the document CSS variables so the surrounding shell inherits the chosen palette.
- Layer colors follow the order: `[vesica, tree paths, tree nodes, fibonacci, helix strand A, helix strand B]`. Helix crossbars reuse the ink tone to avoid contrast flicker.

Example palette (`data/palette.json`):
```json
{
  "bg": "#071824",
  "ink": "#e7f5f9",
  "muted": "#97adb8",
  "layers": ["#1b4d5c", "#6cb4b7", "#e2f1d0", "#f2c078", "#8ad7f6", "#c6b1ff"]
}
```
Additional keys such as `inkMuted` are also respected for backward compatibility; undefined values fall back gracefully.

## ND-safe choices
- No animation, motion, or autoplay content.
- High readability contrast with soft gradients for depth, never strobing.
- Layer order is consistent so the vesica field always grounds the scene before the helix lattice is drawn.
- Fallback notices are low-key, rendered with muted ink and semi-opaque boxes.

Comments within `js/helix-renderer.mjs` explain these ND-safe decisions so future updates keep the same accessibility posture.

## Numerology anchors
Geometry ratios are derived from the constants `3, 7, 9, 11, 22, 33, 99, 144`. They control circle radii, spacing, Fibonacci scaling, and helix turns so the canonical 144:99 spine stays intact.

## File map
- `index.html` – minimal shell, palette loader, and invocation of the renderer.
- `js/helix-renderer.mjs` – ES module with pure drawing routines for the four layers plus fallback notice support.
- `data/palette.json` – optional palette override. Remove or edit to explore different tones offline.

All assets remain offline-first. No workflows or cloud dependencies are introduced; the renderer is ready the moment the files land on disk.
Static, offline-first HTML + Canvas renderer for the circuitum99 cosmology. Double-click `index.html` in any modern browser; no server or build step required.

## Layer order
1. **Vesica field** – intersecting circles that lay the vesica foundation.
2. **Tree-of-Life scaffold** – ten sephirot connected by twenty-two calm paths.
3. **Fibonacci curve** – static logarithmic spiral approximation (quarter arcs).
4. **Double-helix lattice** – two strands with neutral crossbars, always still.

Each layer is produced by a small pure function in `js/helix-renderer.mjs`. The renderer never schedules timers, so there is no motion or flicker.

## Palette handling
- `index.html` attempts to load `data/palette.json` using a local `fetch`. Browsers that block `file://` fetch will fall back to the bundled ND-safe palette.
- When the palette file is missing or incomplete the header reports the fallback and the canvas draws a small inline notice in the lower corner (transparent, non-flashing).
- Palette structure:
  - `bg` / `bgSoft` – background and gradient accent.
  - `ink` / `inkMuted` – primary and subtle text/line colors.
  - `layers[0..5]` – Vesica, Tree paths, Tree nodes, Fibonacci, Helix strand A, Helix strand B.

## ND-safety and style
- Calm Japanese minimalism (ma/kansō/shibumi) with a glass + dark aesthetic.
- No animation, autoplay, GIF, or motion triggers.
- High readability contrast, soft gradients, and generous breathing space.
- Inline notice appears only when needed; it reuses muted ink so there is no startling contrast.

## Numerology constants
Geometry ratios rely on `3, 7, 9, 11, 22, 33, 99, 144`. These constants shape radii, spacing, amplitudes, and notice padding so the cosmology stays consistent.

## Offline use
- Files live under the repo root. No dependencies or bundlers.
- Open `index.html` directly (double-click). The module graph stays within the repo.
- Modify `data/palette.json` locally to explore new palettes without touching the code.
