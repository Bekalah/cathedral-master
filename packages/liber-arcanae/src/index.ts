/**
 * Liber Arcanae - Tarot and archetypal system
 * Connected to complete-arcana-profiles.json
 */

import { dataLoader } from '@cathedral/shared';

export interface ArcanaProfile {
  name: string;
  number: number;
  meaning: string;
  influences: string[];
  codex_node: number;
}

export class LiberArcanae {
  private arcanaProfiles: ArcanaProfile[] = [];
  private codexData: any = null;

  async initialize() {
    try {
      const profiles = await dataLoader.loadData<any>('data/complete-arcana-profiles.json');
      const codex = await dataLoader.loadData<any>('data/codex-144-expanded.json');
      
      this.arcanaProfiles = profiles.rebecca_respawns_arcanae_compendium?.major_arcana || [];
      this.codexData = codex;
      
      console.log(`🃏 Loaded ${this.arcanaProfiles.length} Arcana profiles`);
      console.log(`📚 Codex 144:99 loaded with ${this.codexData?.codex_144_99_expanded?.sacred_mathematics?.manifestation_nodes || 144} nodes`);
    } catch (error) {
      console.warn('LiberArcanae: Could not load data files');
    }
  }

  getArcanaByNumber(number: number): ArcanaProfile | null {
    return this.arcanaProfiles.find(a => a.number === number) || null;
  }

  getAllArcana(): ArcanaProfile[] {
    return this.arcanaProfiles;
  }

  getCodexData() {
    return this.codexData;
  }
}

export const liberArcanae = new LiberArcanae();

console.log("🃏 Liber Arcanae package loaded - V1.0.0");
