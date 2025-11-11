/**
 * Cathedral Core Engine
 * Unified system for art, music, and game creation
 */

import * as Tone from "tone";

export interface CathedralData {
  tarot: any;
  symbols: any;
  moonchild: any;
  audio: CathedralSynth;
  mobileOptimized: boolean;
}

export interface Archetype {
  number: number;
  name: string;
  frequency_hz: number;
  symbol: string;
  angel: string;
  demon: string;
  faculty_role: string;
  archetype: string;
  element: string;
  hebrew_letter: string;
  planetary_ruler: string;
  keywords: string[];
  meanings: {
    upright: string;
    reversed: string;
  };
  reverse_meaning: string;
  star_sign: string;
  astrology: string;
}

export interface SymbolData {
  name: string;
  meanings: string[];
  frequency: number;
  category: string;
  description: string;
  mathematical_ratio: number;
  visual_elements: string[];
  applications: string[];
}

class CathedralSynth {
  public context: AudioContext;
  public masterGain: GainNode;
  private initialized: boolean = false;
  private frequencies: { [key: number]: number } = {};

  constructor() {
    this.context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    this.masterGain = this.context.createGain();
    this.masterGain.connect(this.context.destination);
    this.initializeFrequencies();
  }

  private initializeFrequencies() {
    // Sacred frequency presets
    this.frequencies = {
      256: 256, // Fool frequency
      288: 288, // Magician frequency
      320: 320, // High Priestess frequency
      341: 341, // Empress frequency
      384: 384, // Emperor frequency
      426: 426, // Hierophant frequency
      432: 432, // Base/ground frequency
      528: 528, // Love/Healing frequency
      639: 639, // Tower/Liberation frequency
      720: 720, // Star/Inspiration frequency
      741: 741, // Expression frequency
      852: 852, // Intuition frequency
      963: 963, // Divine frequency
    };
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Initialize Tone.js
      await Tone.start();
      this.initialized = true;
      console.log("🔊 Cathedral Audio Engine Initialized");
    } catch (error) {
      console.warn("Audio initialization warning:", error);
    }
  }

  async ensureAudioContext() {
    if (this.context.state === "suspended") {
      await this.context.resume();
    }
  }

  async playArchetype(archetype: Archetype) {
    await this.ensureAudioContext();
    const frequency = this.frequencies[archetype.frequency_hz] || 432;

    try {
      // Create oscillator for archetype frequency
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
      oscillator.type = "sine";

      // Sacred envelope for archetype activation
      const now = this.context.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.1, now + 3.0);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 6.0);

      oscillator.start(now);
      oscillator.stop(now + 6.0);

      // Add harmonic overtones for richness
      this.playHarmonic(frequency * 2, 0.5, 3.0);
      this.playHarmonic(frequency * 3, 0.3, 2.0);

      console.log(`🎵 Playing ${archetype.name} at ${frequency}Hz`);
    } catch (error) {
      console.warn("Audio play error:", error);
    }
  }

  private playHarmonic(frequency: number, volume: number, duration: number) {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume,
      this.context.currentTime + 0.05
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.context.currentTime + duration
    );

    oscillator.start();
    oscillator.stop(this.context.currentTime + duration);
  }

  async playSymbol(symbol: SymbolData) {
    await this.ensureAudioContext();
    const frequency = symbol.frequency || 432;

    try {
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
      oscillator.type = "triangle";

      // Shorter envelope for symbol activation
      const now = this.context.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      oscillator.start(now);
      oscillator.stop(now + 1.5);

      console.log(`🔮 Activating ${symbol.name} at ${frequency}Hz`);
    } catch (error) {
      console.warn("Symbol audio error:", error);
    }
  }

  // Sacred frequency generator for meditation/healing
  generateSacredFrequency(baseFreq: number, harmonics: number = 5) {
    const frequencies = [];
    for (let i = 1; i <= harmonics; i++) {
      frequencies.push(baseFreq * i);
    }
    return frequencies;
  }

  // Chakra activation sequence
  async activateChakra(chakra: string, duration: number = 30) {
    const chakraFrequencies = {
      root: 194.18,
      sacral: 210.42,
      solar_plexus: 126.22,
      heart: 341.3,
      throat: 141.27,
      third_eye: 221.23,
      crown: 172.06,
    };

    const frequency =
      chakraFrequencies[chakra as keyof typeof chakraFrequencies];
    if (frequency) {
      await this.playChakraTone(frequency, duration);
    }
  }

  private async playChakraTone(frequency: number, duration: number) {
    await this.ensureAudioContext();

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
    oscillator.type = "sine";
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, this.context.currentTime);

    const now = this.context.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 1);
    gainNode.gain.setValueAtTime(0.25, now + duration - 1);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  setMasterVolume(volume: number) {
    this.masterGain.gain.setValueAtTime(
      Math.max(0, Math.min(1, volume)),
      this.context.currentTime
    );
  }

  async createCathedralAmbient(duration: number = 60) {
    await this.ensureAudioContext();

    // Create ambient cathedral atmosphere
    const oscillators = [];
    const gainNodes = [];

    // Base drone frequencies
    const droneFreqs = [64, 128, 256];

    for (let i = 0; i < droneFreqs.length; i++) {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      const filter = this.context.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.frequency.setValueAtTime(droneFreqs[i], this.context.currentTime);
      osc.type = "sine";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, this.context.currentTime);

      const now = this.context.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1 / (i + 1), now + 2);
      gain.gain.setValueAtTime(0.1 / (i + 1), now + duration - 2);
      gain.gain.linearRampToValueAtTime(0, now + duration);

      osc.start(now);
      osc.stop(now + duration);

      oscillators.push(osc);
      gainNodes.push(gain);
    }

    console.log(`🏛️ Creating ${duration}s cathedral ambient atmosphere`);
  }

  dispose() {
    if (this.context && this.context.state !== "closed") {
      this.context.close();
    }
  }
}

export async function initializeCathedral(): Promise<CathedralData> {
  // Load datasets
  const [tarotData, symbolData, moonchildData] = await Promise.all([
    fetch("/datasets/tarot_master_dataset.json").then((r) => r.json()),
    fetch("/datasets/symbol_library.json").then((r) => r.json()),
    fetch("/datasets/moonchild_manifest.json").then((r) => r.json()),
  ]);

  // Initialize audio engine
  const synthEngine = new CathedralSynth();
  await synthEngine.initialize();

  return {
    tarot: tarotData,
    symbols: symbolData,
    moonchild: moonchildData,
    audio: synthEngine,
    mobileOptimized: detectMobileDevice(),
  };
}

function detectMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Utility functions for Cathedral operations
export const CathedralUtils = {
  // Calculate golden ratio relationships
  goldenRatio: 1.618033988749895,

  // Generate sacred geometry points
  generateFibonacciSequence: (length: number): number[] => {
    const sequence = [0, 1];
    for (let i = 2; i < length; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
  },

  // Convert frequency to note name
  frequencyToNote: (frequency: number): string => {
    const A4 = 440;
    const noteNames = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const semitoneFromA4 = 12 * Math.log2(frequency / A4);
    const noteIndex = Math.round(semitoneFromA4) % 12;
    return noteNames[noteIndex];
  },

  // Check if device supports Web Audio API
  isWebAudioSupported: (): boolean => {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  },
};
