/**
 * Cathedral Shared Utilities
 * Core system utilities for the Magnum Opus
 */

export interface CathedralConfig {
  version: string;
  codex_144_99: {
    manifestation_nodes: number;
    dissolution_gates: number;
    ratio: number;
  };
  data_sources: {
    complete_arcana_profiles: string;
    codex_144_expanded: string;
    trinity_architecture: string;
  };
}

export const CATHEDRAL_CONFIG: CathedralConfig = {
  version: "1.0.0",
  codex_144_99: {
    manifestation_nodes: 144,
    dissolution_gates: 99,
    ratio: 1.454545
  },
  data_sources: {
    complete_arcana_profiles: "../data/complete-arcana-profiles.json",
    codex_144_expanded: "../data/codex-144-expanded.json",
    trinity_architecture: "../data/trinity-architecture.json"
  }
};

export class DataLoader {
  async loadData<T>(path: string): Promise<T> {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load data from ${path}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`DataLoader: Could not load ${path}, using fallback`);
      return {} as T;
    }
  }
}

export const dataLoader = new DataLoader();

// Sacred mathematics utilities
export const SACRED_MATH = {
  golden_ratio: 1.618033988749895,
  fibonacci: (n: number): number => {
    if (n <= 1) return n;
    return SACRED_MATH.fibonacci(n - 1) + SACRED_MATH.fibonacci(n - 2);
  },
  ratio_144_99: 144 / 99
};

console.log("🏰 Cathedral Shared Package Loaded - V1.0.0");
