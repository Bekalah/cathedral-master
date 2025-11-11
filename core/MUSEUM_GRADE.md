# Museum-Grade Policy (ND-safe • Responsive • Provenance)

- **Images:** originals in `assets/originals/`; outputs in `assets/img/`
  - Formats: AVIF/WEBP + JPEG fallback, sizes 1280, 1920.
  - Use `<picture>` with `type="image/avif|webp"` + width `w` descriptors and **sizes**. (MDN)
- **Accessibility:** no flashing > 3/sec; honor `prefers-reduced-motion`. (WCAG 2.3.1)
- **CSP:** static meta policy now; upgrade to header later when you add a server. (MDN)
- **Provenance:** each asset tracked by ID in `assets/ASSET_CATALOG.json`; source, license kept in your research scrolls.
- **Performance:** track budgets with Lighthouse locally; avoid regressions.
- **Links:** run link checks with Lychee when needed.
