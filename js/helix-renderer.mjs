/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

<<<<<<< HEAD
  Layers render back-to-front without motion:
    1) Vesica field - intersecting circle lattice
    2) Tree-of-Life scaffold - ten sephirot nodes with twenty-two paths
    3) Fibonacci curve - static logarithmic spiral polyline
    4) Double-helix lattice - two phase-shifted strands with crossbars

  Numerology constants (3, 7, 9, 11, 22, 33, 99, 144) guide proportions.
  Every routine is pure: all state flows through parameters.
*/

export const DEFAULT_PALETTE = Object.freeze({
  bg:"#0b0b12",
  ink:"#e8e8f0",
  layers:Object.freeze(["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"])
});

/**
 * Render a static, ND-safe layered sacred-geometry composition onto a canvas.
 *
 * Renders four back-to-front layers (vesica field, Tree-of-Life scaffold, Fibonacci spiral,
 * and double-helix lattice) and an optional inline notices panel, filling the background
 * with a normalized, ND-safe palette. The function saves and restores the canvas state.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {Object} options
 * @param {number} options.width - Canvas drawing width in pixels.
 * @param {number} options.height - Canvas drawing height in pixels.
 * @param {Object} [options.palette] - Optional palette; missing or incomplete entries are
 *   normalized to ND-safe defaults before rendering.
 * @param {Object} options.NUM - Numerology constants (e.g., 3, 7, 9, 11, 22, 33, 99, 144)
 *   that control proportions and segment counts used by the layers.
 * @param {string[]} [options.notices=[]] - Optional array of notice strings rendered as
 *   stacked informational panels; empty or non-array values are ignored.
 * @returns {void}
 */
export function renderHelix(ctx, { width, height, palette, NUM, notices = [] }) {
  const safePalette = normalizePalette(palette);
  const layerColors = safePalette.layers;

  ctx.save();
  ctx.fillStyle = safePalette.bg;
  ctx.fillRect(0, 0, width, height);

  // Draw layered geometry back-to-front to preserve depth without animation.
  drawVesica(ctx, width, height, layerColors[0], NUM);
  drawTreeOfLife(ctx, width, height, layerColors[1], layerColors[2], NUM);
  drawFibonacci(ctx, width, height, layerColors[3], NUM);
  drawHelix(ctx, width, height, layerColors[4], layerColors[5], NUM);
  drawNotices(ctx, width, height, safePalette.ink, notices);

  ctx.restore();
}

/**
 * Produce a normalized, ND-friendly palette ensuring a background color, ink color, and six layer colors.
 *
 * @param {Object|null|undefined} palette - Optional palette partial. May contain `bg`, `ink`, and `layers` entries.
 * @return {{bg: string, ink: string, layers: string[]}} Normalized palette.
 */
function normalizePalette(palette) {
  /*
    Ensures every render uses calm, ND-safe colors even when the palette file is missing
    or partially defined. Layers fall back in order without flashing.
  */
  const base = DEFAULT_PALETTE;
  const source = typeof palette === "object" && palette !== null ? palette : {};
  const incomingLayers = Array.isArray(source.layers) ? source.layers : [];
  const layers = base.layers.map((fallback, index) => {
    const candidate = incomingLayers[index];
    return typeof candidate === "string" && candidate.trim().length > 0 ? candidate : fallback;
  });
  return {
    bg: typeof source.bg === "string" ? source.bg : base.bg,
    ink: typeof source.ink === "string" ? source.ink : base.ink,
    layers
  };
}

// --- Layer 1: Vesica field --------------------------------------------------
function drawVesica(ctx, w, h, color, NUM) {
  /*
    Intersecting circle grid referencing 9 columns and 7 rows.
    Total circles (9 * 7 * 2 = 126) stay below the 144 threshold for sensory ease.
  */
  const cols = NUM.NINE;
  const rows = NUM.SEVEN;
  const stepX = w / cols;
  const stepY = h / (rows + 2); // vertical margin keeps composition breathable
  const radius = Math.min(stepX, stepY) / 2;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx = (col + 0.5) * stepX;
      const cy = (row + 1) * stepY;
      circlePath(ctx, cx - radius * 0.5, cy, radius);
      ctx.stroke();
      circlePath(ctx, cx + radius * 0.5, cy, radius);
=======
  Layers rendered in order:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (paths then nodes)
    3) Fibonacci curve (logarithmic spiral approximation)
    4) Double-helix lattice (two static strands with calm crossbars)

  All functions below are pure and receive their drawing context + parameters explicitly.
  The numerology constants 3, 7, 9, 11, 22, 33, 99, 144 anchor spacing and ratios so the
  geometry stays aligned with the cathedral canon. No animation, no timers, no network.
  Layer order (each a small pure function):
    0) Vesica field (intersecting circles)
    1) Tree-of-Life scaffold (10 sephirot + 22 connective paths)
    2) Fibonacci curve (static logarithmic spiral approximation)
    3) Double-helix lattice (two calm strands with neutral crossbars)

  Trauma-informed choices:
    - No motion or flashing effects.
    - High readability contrast with quiet transparency when blending layers.
    - Layer order mirrors the story: vesica foundation first, helix lattice last.
*/

export function renderHelix(ctx, { width, height, palette, NUM, notice }) {
  const colors = resolveColors(palette);

  drawBackground(ctx, width, height, colors, NUM);
  drawVesica(ctx, width, height, colors.vesica, NUM);
  drawTree(ctx, width, height, colors.treePaths, colors.treeNodes, NUM);
  drawFibonacci(ctx, width, height, colors.fibonacci, NUM);
  drawHelix(ctx, width, height, colors.helixA, colors.helixB, colors.rung, NUM);

  if (!ctx) {
    return;
  }
  const colors = mapLayerColors(palette);
  drawBackground(ctx, width, height, palette, NUM);
  drawVesica(ctx, width, height, colors.vesica, NUM);
  drawTree(ctx, width, height, colors.treePaths, colors.treeNodes, NUM);
  drawFibonacci(ctx, width, height, colors.fibonacci, NUM);
  drawHelix(ctx, width, height, colors.helixA, colors.helixB, palette.ink, NUM);
  if (notice) {
    drawNotice(ctx, width, height, colors, notice, NUM);
  }
}

function resolveColors(palette) {
  const fallbackInk = typeof palette.ink === "string" ? palette.ink : "#e8e8f0";
  const fallbackMuted = typeof palette.muted === "string" ? palette.muted : fallbackInk;
  const layerSource = Array.isArray(palette.layers) ? palette.layers : [];
function mapLayerColors(palette) {
  const fallback = typeof palette.ink === "string" ? palette.ink : "#e8e8f0";
  const layers = Array.isArray(palette.layers) ? palette.layers : [];
  return {
    background: typeof palette.bg === "string" ? palette.bg : "#0b0b12",
    ink: fallbackInk,
    muted: fallbackMuted,
    vesica: layerSource[0] ?? fallbackInk,
    treePaths: layerSource[1] ?? fallbackInk,
    treeNodes: layerSource[2] ?? fallbackInk,
    fibonacci: layerSource[3] ?? fallbackInk,
    helixA: layerSource[4] ?? fallbackInk,
    helixB: layerSource[5] ?? fallbackInk,
    rung: fallbackInk
  };
}

// Static background gradient keeps depth without motion (ND-safe rationale).
function drawBackground(ctx, width, height, colors, NUM) {
  const base = colors.background;
  const halo = tintColor(base, 1.12);
// Calm gradient background keeps the glass + dark atmosphere without motion.
function drawBackground(ctx, w, h, palette, NUM) {
  const base = typeof palette.bg === "string" ? palette.bg : "#0b0b12";
  const soft = typeof palette.bgSoft === "string" ? palette.bgSoft : tintColor(base, 1.1);
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / NUM.SEVEN,
    Math.min(width, height) / NUM.THIRTYTHREE,
    width / 2,
    height / 2,
    Math.max(width, height) / NUM.THREE
  );
  gradient.addColorStop(0, halo);
  gradient.addColorStop(0, soft);
  gradient.addColorStop(1, base);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

// L1: Vesica field - overlapping circles arranged by sacred ratios.
function drawVesica(ctx, width, height, color, NUM) {
  const radius = Math.min(width, height) / (NUM.SEVEN + NUM.THREE / NUM.ELEVEN);
  const ringRadius = radius * (NUM.NINE / NUM.TWENTYTWO);
  const verticalStep = radius * (NUM.THREE / NUM.NINETYNINE * NUM.THIRTYTHREE);
  const cx = width / 2;
  const cy = height / 2;
  const baseCenters = [[cx, cy]];
  const outerCount = NUM.SEVEN - 1; // six points around the spine
  const angleStep = (Math.PI * 2) / outerCount;
  for (let index = 0; index < outerCount; index += 1) {
    const angle = index * angleStep;
    baseCenters.push([
      cx + Math.cos(angle) * ringRadius,
      cy + Math.sin(angle) * ringRadius
    ]);
// Layer 1: Vesica field with soft alpha so intersections stay gentle.
function drawVesica(ctx, w, h, color, NUM) {
  const radius = Math.min(w, h) / (NUM.SEVEN + NUM.NINE / NUM.TWENTYTWO);
  const ringRadius = radius * (NUM.ELEVEN / NUM.TWENTYTWO);
  const verticalStep = radius * (NUM.THIRTYTHREE / NUM.NINETYNINE);
  const cx = w / 2;
  const cy = h / 2;
  const radialStep = Math.PI / NUM.THREE;
  const baseCenters = [[cx, cy]];
  for (let index = 0; index < 6; index += 1) {
    const angle = index * radialStep;
    baseCenters.push([cx + Math.cos(angle) * ringRadius, cy + Math.sin(angle) * ringRadius]);
  }
  const rowOffsets = [-verticalStep, 0, verticalStep];
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, radius / NUM.THIRTYTHREE);
  ctx.globalAlpha = NUM.ELEVEN / NUM.TWENTYTWO; // 0.5 transparency keeps the vesica gentle
  for (const offset of rowOffsets) {
    for (const [x, y] of baseCenters) {
      ctx.beginPath();
      ctx.arc(x, y + offset, radius, 0, Math.PI * 2);
>>>>>>> circuitum99/main
      ctx.stroke();
    }
  }
  ctx.restore();
}

<<<<<<< HEAD
// --- Layer 2: Tree-of-Life scaffold ----------------------------------------
function drawTreeOfLife(ctx, w, h, pathColor, nodeColor, NUM) {
  /*
    Ten sephirot nodes (Tree of Life) and twenty-two connecting paths.
    Positions are normalized to keep structure centered and balanced.
  */
  const nodesNorm = [
    [0.50, 0.08], // Keter
    [0.32, 0.20], // Chokhmah
    [0.68, 0.20], // Binah
    [0.32, 0.38], // Chesed
    [0.68, 0.38], // Gevurah
    [0.50, 0.48], // Tipheret
    [0.32, 0.64], // Netzach
    [0.68, 0.64], // Hod
    [0.50, 0.78], // Yesod
    [0.50, 0.92]  // Malkuth
  ];
  const nodes = nodesNorm.map(([nx, ny]) => [nx * w, ny * h]);

  const paths = [
    [0, 1], [0, 2], [1, 2], [1, 3], [1, 5], [2, 4], [2, 5],
    [3, 4], [3, 5], [4, 5], [3, 6], [4, 7], [5, 6], [5, 7],
    [6, 7], [6, 8], [7, 8], [5, 8], [6, 9], [7, 9], [8, 9], [5, 9]
  ]; // 22 paths

  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 2;
  paths.forEach(([a, b]) => {
    const [ax, ay] = nodes[a];
    const [bx, by] = nodes[b];
    strokeLine(ctx, ax, ay, bx, by);
  });

  // Sephirot rendered as filled circles; radius uses numerology constant 33 for calm scale.
  ctx.fillStyle = nodeColor;
  const radius = Math.min(w, h) / NUM.THIRTYTHREE;
  nodes.forEach(([x, y]) => {
    circlePath(ctx, x, y, radius);
    ctx.fill();
  });
  ctx.restore();
}

// --- Layer 3: Fibonacci curve ----------------------------------------------
function drawFibonacci(ctx, w, h, color, NUM) {
  /*
    Static logarithmic spiral approximated with NUM.NINETYNINE segments.
    Center offset toward the lower left to weave between Vesica and Helix layers.
  */
  const phi = (1 + Math.sqrt(5)) / 2;
  const quarterTurns = NUM.THREE; // three quarter-turns for gentle sweep
  const steps = NUM.NINETYNINE;
  const scale = Math.min(w, h) / NUM.ELEVEN;
  const cx = w * 0.18;
  const cy = h * 0.82;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= steps * quarterTurns; i += 1) {
    const theta = (i / steps) * quarterTurns * (Math.PI / 2);
    const radius = scale * Math.pow(phi, theta / (Math.PI / 2));
    const x = cx + radius * Math.cos(theta);
    const y = cy - radius * Math.sin(theta);
    if (i === 0) {
=======
// L2: Tree-of-Life scaffold - 10 sephirot with 22 calm paths.
function drawTree(ctx, width, height, colorPaths, colorNodes, NUM) {
  const columnOffset = width / NUM.THREE;
  const columns = [columnOffset, width / 2, width - columnOffset];
  const rowStep = height / (NUM.NINE + NUM.THREE / NUM.ELEVEN);
// Layer 2: Tree-of-Life scaffold, drawn paths first then nodes for readability.
function drawTree(ctx, w, h, colorPaths, colorNodes, NUM) {
  const columns = [w / NUM.THREE, w / 2, w - w / NUM.THREE];
  const rowStep = h / NUM.NINE;
  const rows = Array.from({ length: 5 }, (_, index) => rowStep * (index + 1));
  const nodes = [
    [1, 0],
    [0, 1], [2, 1],
    [0, 2], [1, 2], [2, 2],
    [0, 3], [2, 3],
    [1, 3],
    [1, 4]
  ].map(([c, r]) => [columns[c], rows[r]]);
  const paths = [
    [0, 1], [0, 2], [0, 4],
    [1, 2], [1, 3], [1, 4], [1, 6],
    [2, 5], [2, 4], [2, 7],
    [3, 5], [3, 4], [3, 6],
    [5, 4], [5, 7],
    [4, 6], [4, 7], [4, 8],
    [6, 7], [6, 8],
    [7, 8],
    [8, 9]
  ];
  ctx.save();
  ctx.strokeStyle = colorPaths;
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR);
  ctx.lineCap = "round";
  for (const [startIndex, endIndex] of paths) {
    ctx.beginPath();
    ctx.moveTo(...nodes[startIndex]);
    ctx.lineTo(...nodes[endIndex]);
    ctx.stroke();
  }
  ctx.fillStyle = colorNodes;
  const nodeRadius = Math.max(2, width / NUM.NINETYNINE);
  const nodeRadius = NUM.THREE;
  for (const [x, y] of nodes) {
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// L3: Fibonacci curve - static spiral polyline (no motion).
function drawFibonacci(ctx, width, height, color, NUM) {
  const fibSequence = [1, 1, 2, 3, 5, 8, 13];
  const scale = Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THIRTYTHREE / NUM.ELEVEN;
  const baseX = width / NUM.NINETYNINE * NUM.THIRTYTHREE;
  const baseY = height - height / NUM.SEVEN;
// Layer 3: Fibonacci spiral approximated by quarter arcs; static for ND-safety.
function drawFibonacci(ctx, w, h, color, NUM) {
  const sequence = [1, 1, 2, 3, 5, 8, 13];
  const scale = Math.min(w, h) / NUM.ONEFORTYFOUR * NUM.THIRTYTHREE * (NUM.ELEVEN / NUM.NINETYNINE);
  let x = (w / NUM.NINETYNINE) * NUM.THIRTYTHREE;
  let y = h - h / NUM.SEVEN;
  let angle = 0;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR);
  ctx.beginPath();
  let x = baseX;
  let y = baseY;
  let angle = 0;
  ctx.moveTo(x, y);
  for (const value of fibSequence) {
  ctx.moveTo(x, y);
  for (const value of sequence) {
    const radius = value * scale;
    ctx.arc(x, y, radius, angle, angle + Math.PI / 2, false);
    x += radius * Math.cos(angle + Math.PI / 2);
    y += radius * Math.sin(angle + Math.PI / 2);
    angle += Math.PI / 2;
  }
  ctx.stroke();
  ctx.restore();
}

// L4: Double helix - two strands offset by 90°, static crossbars maintain calm rhythm.
function drawHelix(ctx, width, height, colorA, colorB, rungColor, NUM) {
  const turns = NUM.NINE; // nine half-turns = 4.5 visible twists
  const amplitude = height / NUM.ELEVEN;
  const step = Math.max(1, width / (NUM.ONEFORTYFOUR));
  const rungStep = width / NUM.TWENTYTWO;
  const centerY = height / 2;
  ctx.save();
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR);
// Layer 4: Static double-helix lattice with neutral crossbars tying the strands together.
function drawHelix(ctx, w, h, colorA, colorB, rungColor, NUM) {
  const turns = NUM.NINE; // 9 half-turns for quiet rhythm.
  const amplitude = h / NUM.ELEVEN;
  const step = w / (NUM.TWENTYTWO * 4); // dense sampling for smoothness.
  const baseY = h / 2;
  ctx.save();
  ctx.lineCap = "round";

  ctx.strokeStyle = colorA;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let x = 0; x <= width; x += step) {
    const angle = (x / width) * Math.PI * turns;
    const y = centerY + Math.sin(angle) * amplitude;
  for (let x = 0; x <= w; x += step) {
    const y = baseY + Math.sin((x / w) * Math.PI * turns) * amplitude;
    if (x === 0) {
>>>>>>> circuitum99/main
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
<<<<<<< HEAD
  ctx.restore();
}

// --- Layer 4: Double-helix lattice -----------------------------------------
function drawHelix(ctx, w, h, colorA, colorB, NUM) {
  /*
    Two static sine-based strands with TWENTYTWO crossbars to echo the paths.
    Amplitude kept small for visual calm while preserving layered depth.
  */
  const segments = NUM.ONEFORTYFOUR;
  const amplitude = h / NUM.NINE;
  const midY = h / 2;
  const stepX = w / segments;

  ctx.save();
  const drawStrand = (phase, strokeColor) => {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= segments; i += 1) {
      const t = (i / segments) * Math.PI * NUM.THREE + phase;
      const x = i * stepX;
      const y = midY + Math.sin(t) * amplitude;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  };

  drawStrand(0, colorA);
  drawStrand(Math.PI, colorB);

  ctx.strokeStyle = colorB;
  ctx.lineWidth = 1.5;
  const rungCount = NUM.TWENTYTWO;
  for (let i = 0; i <= rungCount; i += 1) {
    const ratio = i / rungCount;
    const t = ratio * Math.PI * NUM.THREE;
    const x = ratio * w;
    const y1 = midY + Math.sin(t) * amplitude;
    const y2 = midY - Math.sin(t) * amplitude;
    strokeLine(ctx, x, y1, x, y2);
  }
  ctx.restore();
}

// --- Helper routines -------------------------------------------------------
function circlePath(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
}

function strokeLine(ctx, ax, ay, bx, by) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}

// --- Notices layer ---------------------------------------------------------
function drawNotices(ctx, w, h, textColor, notices) {
  /*
    Inline fallback notice panel keeps the user informed when data files are missing.
    Panel stays static and muted to honor the ND-safe brief.
  */
  if (!Array.isArray(notices) || notices.length === 0) {
    return;
  }

  const padding = 12;
  const maxWidth = w / 3;
  const lineHeight = 18;

  ctx.save();
  ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.textBaseline = "top";

  let blockTop = padding;
  notices.forEach((notice) => {
    const lines = wrapNoticeLines(notice, maxWidth - padding * 2, ctx);
    const boxHeight = lines.length * lineHeight + padding;

    // ND-safe: muted panel reinforces calm fallback messaging without flashing.
    ctx.fillStyle = "rgba(17, 17, 26, 0.78)";
    ctx.fillRect(padding, blockTop, maxWidth, boxHeight);

    ctx.strokeStyle = "rgba(232, 232, 240, 0.35)";
    ctx.strokeRect(padding, blockTop, maxWidth, boxHeight);

    ctx.fillStyle = textColor;
    lines.forEach((line, index) => {
      ctx.fillText(line, padding * 1.5, blockTop + padding / 2 + index * lineHeight);
    });

    blockTop += boxHeight + padding;
  });

  ctx.restore();
}

function wrapNoticeLines(text, maxLineWidth, ctx) {
  const safeText = String(text);
  const words = safeText.split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const tentative = current ? current + " " + word : word;
    if (ctx.measureText(tentative).width > maxLineWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = tentative;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
=======

  ctx.strokeStyle = colorB;
  ctx.beginPath();
  for (let x = 0; x <= width; x += step) {
    const angle = (x / width) * Math.PI * turns;
    const y = centerY + Math.cos(angle) * amplitude;
  for (let x = 0; x <= w; x += step) {
    const y = baseY + Math.cos((x / w) * Math.PI * turns) * amplitude;
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  ctx.strokeStyle = rungColor; // ND-safe: neutral bridges keep the lattice readable without contrast shocks.
  for (let x = 0; x <= width; x += rungStep) {
    const angle = (x / width) * Math.PI * turns;
    const yA = centerY + Math.sin(angle) * amplitude;
    const yB = centerY + Math.cos(angle) * amplitude;
  const rungStep = w / NUM.TWENTYTWO;
  const bridgeColor = typeof rungColor === "string" ? rungColor : "#e8e8f0";
  ctx.strokeStyle = bridgeColor;
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += rungStep) {
    const y1 = baseY + Math.sin((x / w) * Math.PI * turns) * amplitude;
    const y2 = baseY + Math.cos((x / w) * Math.PI * turns) * amplitude;
    ctx.beginPath();
    ctx.moveTo(x, yA);
    ctx.lineTo(x, yB);
    ctx.stroke();
  }
  ctx.restore();
}

// Inline notice reinforces transparency when fallbacks trigger.
function drawNotice(ctx, width, height, colors, text, NUM) {
  ctx.save();
  const padding = NUM.THREE * (NUM.NINE / NUM.NINETYNINE);
// Inline notice keeps transparency when palette data is missing, without flashing overlays.
function drawNotice(ctx, w, h, palette, text, NUM) {
  const padding = NUM.NINE / NUM.THREE;
  const boxX = padding * NUM.THREE;
  const boxY = h - (NUM.THIRTYTHREE + padding * NUM.THREE);
  const fontSize = 12;
  const inkMuted = typeof palette.inkMuted === "string" ? palette.inkMuted : (palette.ink ?? "#e8e8f0");
  const backdrop = typeof palette.bgSoft === "string" ? palette.bgSoft : (palette.bg ?? "#0b0b12");
  ctx.save();
  ctx.font = `${fontSize}px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
  ctx.textBaseline = "middle";
  const textWidth = ctx.measureText(text).width;
  const boxWidth = textWidth + padding * NUM.SEVEN;
  const boxHeight = fontSize + padding * NUM.THREE;
  const boxX = padding * NUM.THREE;
  const boxY = height - boxHeight - padding * NUM.THREE;
  ctx.globalAlpha = NUM.ELEVEN / NUM.TWENTYTWO;
  ctx.fillStyle = tintColor(colors.background, 0.85);
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
  ctx.globalAlpha = 1;
  ctx.fillStyle = colors.muted;
  ctx.fillStyle = backdrop;
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
  ctx.globalAlpha = 1;
  ctx.fillStyle = inkMuted;
  ctx.fillText(text, boxX + padding * 2, boxY + boxHeight / 2);
  ctx.restore();
}

// Helper: tint hex colors gently. factor > 1 brightens, < 1 darkens.
// Soft tint helper brightens or darkens hex colors while keeping them calm.
function tintColor(hex, factor) {
  if (typeof hex !== "string") {
    return hex;
  }
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return hex;
  }
  const toChannel = (index) => parseInt(clean.slice(index, index + 2), 16);
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const channels = [0, 2, 4].map((offset) => clamp(toChannel(offset) * factor));
  const toHex = (value) => value.toString(16).padStart(2, "0");
  return `#${channels.map(toHex).join("")}`;
>>>>>>> circuitum99/main
}
