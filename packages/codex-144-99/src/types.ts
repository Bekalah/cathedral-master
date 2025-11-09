// @cathedral/codex-144-99/types.ts
// Structural types for the 144 + 99 node lattice.
// Deterministic, provenance-aware, integration-first.

export type CodexNodeKind = 'primary' | 'gateway';

export interface CodexNodeId {
  /** e.g. "N001".."N144" for primary, "G001".."G099" for gateway */
  id: string;
}

/**
 * Lattice node in the Codex 144:99 system.
 * This is structural metadata only: no vibes, no implied metaphysics.
 */
export interface CodexNode extends CodexNodeId {
  kind: CodexNodeKind;
  /** Human-readable label for UI and logs */
  label: string;

  /** Numeric / structural coordinates (for layouts and queries) */
  coordinates: {
    /** optional band/layer index (e.g. 1..12) */
    layer?: number;
    /** optional ring index for radial layouts */
    ring?: number;
    /** triad coordinates or other project-canon numeric triple */
    triad?: [number, number, number];
    /** prime-factor or factorization hints, if used */
    factors?: number[];
  };

  /** Vector profile slots link into shared design/profile catalogs */
  vector_profile_ids: {
    geometry_profile_id?: string | null;
    color_profile_id?: string | null;
    sound_profile_id?: string | null;
    crystal_profile_id?: string | null;
    archetype_profile_id?: string | null;
  };

  /** Cross-links into other core engines (all optional, explicit) */
  references: {
    liber_arcanae_ids?: string[];
    monas_ids?: string[];
    double_tree_ids?: string[];
    circuitum99_ids?: string[];
    stone_library_ids?: string[];
  };

  /** Provenance and tagging for this node's definition */
  provenance: {
    /** human-readable sources or doc slugs, e.g. "codex-144-99-v1", "project-spec:§3.2" */
    sources: string[];
    /** explicit tags for project canon, style systems, etc. */
    project_canon_tags?: string[];
    /** free-form notes for maintainers; never parsed as doctrine */
    notes?: string;
  };
}

/** Geometry profile for downstream engines (Godot, shaders, diagrams) */
export interface GeometryProfile {
  id: string;
  type: 'solid' | 'tiling' | 'graph' | 'glyph';
  spec: Record<string, unknown>;
  provenance?: string[];
}

/** Color profile with explicit palettes and models */
export interface ColorProfile {
  id: string;
  colors: string[]; // hex codes
  model?: 'sRGB' | 'DisplayP3';
  method?: string; // e.g. "Itten", "Munsell", "project-canon"
  provenance?: string[];
}

/** Sound/tuning profile for real audio engines */
export interface SoundProfile {
  id: string;
  base_frequency_hz: number;
  ratios: number[]; // multiplicative ratios from base
  system: string; // e.g. "12TET", "JI", "microtonal"
  use?: 'scale' | 'cluster' | 'drone' | 'fx';
  provenance?: string[];
}

/** Crystal/material profile for shaders and materials (no healing claims) */
export interface CrystalProfile {
  id: string;
  mineral: string;
  lattice_system?: string; // e.g. "cubic", "hexagonal"
  color_hint?: string;
  index_of_refraction?: number;
  shader_hint?: {
    roughness?: number;
    metallic?: number;
    dispersion?: number;
  };
  provenance?: string[];
}

/** Archetype/profile for narrative and design roles */
export interface ArchetypeProfile {
  id: string;
  label: string;
  tarot_links?: string[]; // e.g. ["major:0", "major:2"]
  narrative_roles?: string[];
  style_tags?: string[];
  provenance?: string[];
}

/** Full lattice container exported by this package */
export interface CodexLattice {
  version: string;
  primary_nodes: CodexNode[];
  gateway_nodes: CodexNode[];
  geometry_profiles?: GeometryProfile[];
  color_profiles?: ColorProfile[];
  sound_profiles?: SoundProfile[];
  crystal_profiles?: CrystalProfile[];
  archetype_profiles?: ArchetypeProfile[];
}