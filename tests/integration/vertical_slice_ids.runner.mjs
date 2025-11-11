#!/usr/bin/env node
/**
 * Vertical Slice Phase A - Godot Wiring & ID Contract Validator (ESM/Node)
 *
 * Scope:
 * - Static-only checks (no Godot runtime, no network, no DB, no AI services).
 * - Enforces the authoritative Phase A contract for vertical-slice IDs and wiring.
 * - Reads only explicitly allowed files via fs.
 *
 * Run via (from repo root):
 *   pnpm test:vertical-slice-ids
 *
 * On failure:
 * - Prints [vertical-slice-ids] prefixed errors.
 * - Exits with code 1.
 *
 * On success:
 * - Exits with code 0.
 */

import fs from "fs";
import path from "path";
import url from "url";

// ------------------------------------------------------------------------------------------
// Minimal helpers
// ------------------------------------------------------------------------------------------

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function fail(message) {
  // eslint-disable-next-line no-console
  console.error(`[vertical-slice-ids] ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[vertical-slice-ids] ${message}`);
  }
}

/**
 * Read a UTF-8 text file relative to this runner.
 */
function readText(relativePath) {
  const fullPath = path.resolve(__dirname, relativePath);
  try {
    return fs.readFileSync(fullPath, "utf8");
  } catch (err) {
    throw new Error(
      `[vertical-slice-ids] Failed to read file: ${relativePath} (${err.message})`
    );
  }
}

/**
 * Read and parse JSON file relative to this runner.
 * Only used for "well-formed JSON" and Daimon/Boon scanning.
 */
function readJson(relativePath) {
  const fullPath = path.resolve(__dirname, relativePath);
  try {
    const text = fs.readFileSync(fullPath, "utf8");
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error(
        `[vertical-slice-ids] Invalid JSON in ${relativePath}: ${err.message}`
      );
    }
  } catch (err) {
    throw new Error(
      `[vertical-slice-ids] Failed to read JSON file: ${relativePath} (${err.message})`
    );
  }
}

// ------------------------------------------------------------------------------------------
// Authoritative Phase A contract
// ------------------------------------------------------------------------------------------

const VERTICAL_ROOMS = {
  room_hub_vertical_slice: {
    id: "room_hub_vertical_slice",
    scene_path: "res://godot/scenes/studios/atelier_studio.tscn",
    category: "hub",
  },
  room_art_vertical_slice: {
    id: "room_art_vertical_slice",
    scene_path: "res://godot/scenes/studios/atelier_studio.tscn",
    category: "art",
  },
  room_science_vertical_slice: {
    id: "room_science_vertical_slice",
    scene_path: "res://godot/scenes/studios/geometry_studio.tscn",
    category: "science",
  },
  room_monad_vertical_slice: {
    id: "room_monad_vertical_slice",
    scene_path: "res://godot/scenes/studios/synth_lab.tscn",
    category: "monad",
  },
  room_chaos_vertical_slice: {
    id: "room_chaos_vertical_slice",
    scene_path: "res://godot/scenes/studios/synth_lab.tscn",
    category: "chaos",
  },
};

const CANONICAL_ROOM_IDS = Object.keys(VERTICAL_ROOMS);

const ALLOWED_DAIMON_PREFIXES = [
  "daimon_art_",
  "daimon_science_",
  "daimon_monad_",
  "daimon_chaos_",
  "daimon_hub_",
];

const ALLOWED_BOON_PREFIXES = [
  "boon_art_",
  "boon_science_",
  "boon_monad_",
  "boon_chaos_",
];

// Non-contract legacy IDs which MUST NOT appear as vertical-slice routing targets.
const DISALLOWED_LEGACY_ROOM_IDS = [
  "hub_main",
  "stone_chapel",
  "node_R034",
  "studio_atelier",
  "R001",
  "R002",
  "R003",
  "R004",
  "R010",
  "R099",
];

// ------------------------------------------------------------------------------------------
// 1) Godot RoomCatalog: constants & VERTICAL_SLICE_ROOMS mapping
// ------------------------------------------------------------------------------------------

function validateRoomCatalog() {
  const src = readText("../../../godot/scripts/core/room_catalog.gd");

  // 1.1 Constants: ensure each ROOM_*_VERTICAL_SLICE is present with exact value
  for (const [id, cfg] of Object.entries(VERTICAL_ROOMS)) {
    const upperKey = id.toUpperCase();
    const constName = `ROOM_${upperKey}`;
    const constPattern = new RegExp(
      `const\\s+${constName}\\s*:\\s*String\\s*=\\s*"${cfg.id}"`,
      "m"
    );
    assert(
      constPattern.test(src),
      `Missing or incorrect constant ${constName} for id "${cfg.id}" in room_catalog.gd`
    );
  }

  // 1.2 VERTICAL_SLICE_ROOMS structure presence
  const vsStart = src.indexOf("const VERTICAL_SLICE_ROOMS");
  assert(
    vsStart !== -1,
    "room_catalog.gd must declare const VERTICAL_SLICE_ROOMS"
  );

  const vsObjStart = src.indexOf("{", vsStart);
  assert(vsObjStart !== -1, "VERTICAL_SLICE_ROOMS must be an object literal");

  // Extract object literal via naive brace tracking (good enough for this scoped file).
  let depth = 0;
  let endIndex = -1;
  for (let i = vsObjStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  assert(
    endIndex !== -1,
    "Failed to parse VERTICAL_SLICE_ROOMS object literal in room_catalog.gd"
  );
  const vsContent = src.slice(vsObjStart, endIndex);

  // 1.3 Ensure exactly the 5 canonical keys exist (no extras)
  const keyRegex =
    /ROOM_(HUB|ART|SCIENCE|MONAD|CHAOS)_VERTICAL_SLICE\s*:/g;
  const foundKeys = [];
  let match;
  while ((match = keyRegex.exec(vsContent)) !== null) {
    foundKeys.push(match[0].replace(/\s*:/, ""));
  }

  const expectedKeys = [
    "ROOM_HUB_VERTICAL_SLICE",
    "ROOM_ART_VERTICAL_SLICE",
    "ROOM_SCIENCE_VERTICAL_SLICE",
    "ROOM_MONAD_VERTICAL_SLICE",
    "ROOM_CHAOS_VERTICAL_SLICE",
  ];

  assert(
    foundKeys.length === expectedKeys.length,
    `VERTICAL_SLICE_ROOMS must contain exactly ${expectedKeys.length} entries; found ${foundKeys.length}`
  );

  for (const key of expectedKeys) {
    assert(
      foundKeys.includes(key),
      `VERTICAL_SLICE_ROOMS missing entry for ${key}`
    );
  }

  // Ensure no clearly non-canonical keys are present in the mapping
  for (const legacy of DISALLOWED_LEGACY_ROOM_IDS) {
    const legacyPattern = new RegExp(`"${legacy}"\\s*:`);
    assert(
      !legacyPattern.test(vsContent),
      `VERTICAL_SLICE_ROOMS must not contain legacy/non-contract room id: ${legacy}`
    );
  }

  // 1.4 For each canonical ID, enforce required fields and values
  for (const [id, cfg] of Object.entries(VERTICAL_ROOMS)) {
    // Build a regex block that finds the object for this key.
    const keyName = `ROOM_${id.toUpperCase()}`;
    const blockRegex = new RegExp(
      `${keyName}\\s*:\\s*{[\\s\\S]*?}`,
      "m"
    );
    const blockMatch = vsContent.match(blockRegex);
    assert(
      blockMatch,
      `VERTICAL_SLICE_ROOMS must define object for ${keyName}`
    );

    const block = blockMatch[0];

    // Must include keys: scene_path, category, style_pack_id, palette_id
    for (const requiredKey of [
      "scene_path",
      "category",
      "style_pack_id",
      "palette_id",
    ]) {
      const fieldRegex = new RegExp(`"${requiredKey}"\\s*:`, "m");
      assert(
        fieldRegex.test(block),
        `VERTICAL_SLICE_ROOMS[${id}] must include key "${requiredKey}"`
      );
    }

    // scene_path exact match
    const sceneRegex = new RegExp(
      `"scene_path"\\s*:\\s*"${cfg.scene_path.replace(
        /[-/\\.^$*+?()[\]{}|]/g,
        "\\$&"
      )}"`,
      "m"
    );
    assert(
      sceneRegex.test(block),
      `VERTICAL_SLICE_ROOMS[${id}].scene_path must be "${cfg.scene_path}"`
    );

    // category match and within allowed set
    const catMatch = block.match(/"category"\s*:\s*"([^"]+)"/m);
    assert(
      catMatch,
      `VERTICAL_SLICE_ROOMS[${id}] must define "category"`
    );
    const category = catMatch[1];
    assert(
      ["hub", "art", "science", "monad", "chaos"].includes(category),
      `VERTICAL_SLICE_ROOMS[${id}].category must be one of hub|art|science|monad|chaos`
    );
    assert(
      category === cfg.category,
      `VERTICAL_SLICE_ROOMS[${id}].category must be "${cfg.category}" (found "${category}")`
    );
  }
}

// ------------------------------------------------------------------------------------------
// 2) GameManager alignment
// ------------------------------------------------------------------------------------------

function validateGameManager() {
  const src = readText("../../../godot/scripts/core/game_manager.gd");

  // 2.1 Ensure constants present with exact string values.
  for (const [id] of Object.entries(VERTICAL_ROOMS)) {
    const constName = `ROOM_${id.toUpperCase()}`;
    const pattern = new RegExp(
      `const\\s+${constName}\\s*:\\s*String\\s*=\\s*"${id}"`,
      "m"
    );
    assert(
      pattern.test(src),
      `GameManager must declare ${constName} = "${id}"`
    );
  }

  // 2.2 Ensure get_vertical_slice_room_ids exists and returns exactly the canonical IDs.
  const getFnRegex =
    /func\s+get_vertical_slice_room_ids\(\)\s*->\s*Array\s*:\s*[^]*?return\s*\[([^]*?)\]/m;
  const fnMatch = src.match(getFnRegex);
  assert(
    fnMatch,
    "GameManager must define get_vertical_slice_room_ids() returning canonical IDs"
  );

  const arrayBody = fnMatch[1];
  const idConstRegex =
    /ROOM_(HUB|ART|SCIENCE|MONAD|CHAOS)_VERTICAL_SLICE/g;
  const found = [];
  let m;
  while ((m = idConstRegex.exec(arrayBody)) !== null) {
    found.push(m[0]);
  }

  const expectedConstOrder = [
    "ROOM_HUB_VERTICAL_SLICE",
    "ROOM_ART_VERTICAL_SLICE",
    "ROOM_SCIENCE_VERTICAL_SLICE",
    "ROOM_MONAD_VERTICAL_SLICE",
    "ROOM_CHAOS_VERTICAL_SLICE",
  ];

  assert(
    found.length === expectedConstOrder.length,
    `get_vertical_slice_room_ids() must return exactly ${expectedConstOrder.length} entries; found ${found.length}`
  );

  for (let i = 0; i < expectedConstOrder.length; i++) {
    assert(
      found[i] === expectedConstOrder[i],
      `get_vertical_slice_room_ids()[${i}] must be ${expectedConstOrder[i]}`
    );
  }

  // 2.3 Ensure ROOM_HUB_VERTICAL_SLICE is used as canonical start in _set_initial_vertical_slice_room
  const startFnRegex =
    /func\s+_set_initial_vertical_slice_room\(\)\s*->\s*void\s*:[^]*?ROOM_HUB_VERTICAL_SLICE/m;
  assert(
    startFnRegex.test(src),
    "_set_initial_vertical_slice_room() must use ROOM_HUB_VERTICAL_SLICE as start_room_id"
  );

  // 2.4 Negative: ensure no legacy IDs appear as vertical slice routing targets in this file.
  for (const legacy of DISALLOWED_LEGACY_ROOM_IDS) {
    const pattern = new RegExp(`"${legacy}"`, "m");
    assert(
      !pattern.test(src),
      `GameManager must not reference legacy/non-contract id "${legacy}" for vertical slice routing`
    );
  }
}

// ------------------------------------------------------------------------------------------
// 3) REGISTRY / JSON sanity (non-blocking; must be well-formed JSON)
// ------------------------------------------------------------------------------------------

function validateJsonWellFormed() {
  const jsonPaths = [
    "../../../REGISTRY/rooms/room_catalog.vertical_slice.json",
    "../../../REGISTRY/styles/style_packs.vertical_slice.json",
    "../../../REGISTRY/palettes/palette_catalog.vertical_slice.json",
    "../../../main/REGISTRY/rooms/room_catalog.vertical_slice.json",
    "../../../main/REGISTRY/styles/style_packs.vertical_slice.json",
    "../../../main/REGISTRY/palettes/palette_catalog.vertical_slice.json",
  ];

  for (const p of jsonPaths) {
    // readJson already asserts well-formedness
    readJson(p);
  }

  // Known divergence between REGISTRY and main/REGISTRY is allowed.
  // We do NOT fail on mismatches; a future Phase B/C task will reconcile.
}

// ------------------------------------------------------------------------------------------
// 4) Daimon/Boon ID prefix safety
// ------------------------------------------------------------------------------------------

function validateDaimonAndBoonPrefixes() {
  const textPaths = [
    "../../../godot/scripts/core/room_catalog.gd",
    "../../../godot/scripts/core/game_manager.gd",
    "../../../godot/scripts/core/arcana_registry.gd",
    "../../../godot/scripts/core/codex_system.gd",
  ];

  const jsonPaths = [
    "../../../REGISTRY/rooms/room_catalog.vertical_slice.json",
    "../../../REGISTRY/styles/style_packs.vertical_slice.json",
    "../../../REGISTRY/palettes/palette_catalog.vertical_slice.json",
    "../../../main/REGISTRY/rooms/room_catalog.vertical_slice.json",
    "../../../main/REGISTRY/styles/style_packs.vertical_slice.json",
    "../../../main/REGISTRY/palettes/palette_catalog.vertical_slice.json",
  ];

  /** @type {string[]} */
  const sources = [];

  for (const p of textPaths) {
    sources.push(readText(p));
  }

  for (const p of jsonPaths) {
    const fullPath = path.resolve(__dirname, p);
    const raw = fs.readFileSync(fullPath, "utf8");
    sources.push(raw);
  }

  const daimonRegex = /daimon_[A-Za-z0-9_]+/g;
  const boonRegex = /boon_[A-Za-z0-9_]+/g;

  const violations = [];

  for (const src of sources) {
    let m;

    while ((m = daimonRegex.exec(src)) !== null) {
      const id = m[0];
      if (!ALLOWED_DAIMON_PREFIXES.some((prefix) => id.startsWith(prefix))) {
        violations.push(`Daimon ID "${id}" does not use an allowed prefix`);
      }
    }

    while ((m = boonRegex.exec(src)) !== null) {
      const id = m[0];
      if (!ALLOWED_BOON_PREFIXES.some((prefix) => id.startsWith(prefix))) {
        violations.push(`Boon ID "${id}" does not use an allowed prefix`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `[vertical-slice-ids] Invalid Daimon/Boon prefixes detected:\n- ${violations.join(
        "\n- "
      )}`
    );
  }
}

// ------------------------------------------------------------------------------------------
// Runner
// ------------------------------------------------------------------------------------------

(function run() {
  try {
    validateRoomCatalog();
    validateGameManager();
    validateJsonWellFormed();
    validateDaimonAndBoonPrefixes();
    // Success: no output required; process will exit with code 0.
  } catch (err) {
    fail(err.message || String(err));
  }
})();