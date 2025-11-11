import React, { useState, useEffect } from 'react';
import { CathedralData } from '../cathedral-core';
import { CathedralMode } from '../App';

interface MusicLabProps {
  cathedralData: CathedralData;
  onModeChange: (mode: CathedralMode) => void;
}

export const MusicLab: React.FC<MusicLabProps> = ({ cathedralData, onModeChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(432);
  const [selectedChakra, setSelectedChakra] = useState<string | null>(null);
  const [ambientMode, setAmbientMode] = useState(false);

  const sacredFrequencies = cathedralData.symbols.frequency_systems?.solfege_healing || {};
  const chakraFrequencies = cathedralData.symbols.frequency_systems?.chakra_frequencies || {};

  const playFrequency = async (frequency: number) => {
    if (cathedralData.audio) {
      // Create simple tone using the audio context
      const oscillator = cathedralData.audio.context.createOscillator();
      const gainNode = cathedralData.audio.context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(cathedralData.audio.masterGain);
      
      oscillator.frequency.setValueAtTime(frequency, cathedralData.audio.context.currentTime);
      oscillator.type = 'sine';
      
      const now = cathedralData.audio.context.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gainNode.gain.setValueAtTime(0.3, now + 2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4);
      
      oscillator.start(now);
      oscillator.stop(now + 4);
      
      setCurrentFrequency(frequency);
    }
  };

  const startAmbientMode = async () => {
    if (cathedralData.audio) {
      setAmbientMode(true);
      setIsPlaying(true);
      
      // Create ambient cathedral atmosphere
      await cathedralData.audio.createCathedralAmbient(60);
      
      setTimeout(() => {
        setAmbientMode(false);
        setIsPlaying(false);
      }, 60000);
    }
  };

  const activateChakra = async (chakra: string) => {
    const frequency = chakraFrequencies[chakra as keyof typeof chakraFrequencies];
    if (frequency) {
      setSelectedChakra(chakra);
      await playFrequency(frequency);
    }
  };

  return (
    <div className="cathedral-component">
      <h2 className="component-title">🎵 Sonic Physics Engine</h2>
      <p className="component-subtitle">
        Revolutionary audio-physics binding system that converts conscious intention into real-world manifestations through sacred frequency synthesis.
      </p>

      <div className="audio-controls">
        <div className="control-section">
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Sacred Solfeggio Frequencies</h3>
          <div className="frequency-grid">
            {Object.entries(sacredFrequencies).map(([note, freq]) => (
              <div key={note} className="frequency-card">
                <div className="frequency-header">
                  <span className="note-name">{note}</span>
                  <span className="frequency-value">{freq as number} Hz</span>
                </div>
                <div className="frequency-description">
                  {note === 'UT' && 'Liberation - Releases fear and guilt'}
                  {note === 'RE' && 'Change - Facilitates change and removes blockages'}
                  {note === 'MI' && 'Love - DNA repair and transformation'}
                  {note === 'FA' && 'Connection - Improves communication and relationships'}
                  {note === 'SOL' && 'Expression - Awakening intuition and solutions'}
                  {note === 'LA' && 'Intuition - Returns to spiritual order'}
                  {note === 'TI' && 'Divine - Enlightenment and perfection'}
                </div>
                <button
                  onClick={() => playFrequency(freq as number)}
                  disabled={isPlaying}
                  className="frequency-play-button"
                >
                  {currentFrequency === freq ? '🔊 Playing' : '▶️ Play'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Chakra Activation</h3>
          <div className="chakra-grid">
            {Object.entries(chakraFrequencies).map(([chakra, freq]) => (
              <div
                key={chakra}
                className={`chakra-card ${selectedChakra === chakra ? 'active' : ''}`}
                onClick={() => activateChakra(chakra)}
              >
                <div className="chakra-icon">
                  {chakra === 'root' && '🔴'}
                  {chakra === 'sacral' && '🟠'}
                  {chakra === 'solar_plexus' && '🟡'}
                  {chakra === 'heart' && '🟢'}
                  {chakra === 'throat' && '🔵'}
                  {chakra === 'third_eye' && '🟣'}
                  {chakra === 'crown' && '⚪'}
                </div>
                <div className="chakra-name">
                  {chakra.replace('_', ' ').toUpperCase()}
                </div>
                <div className="chakra-frequency">{freq as number} Hz</div>
              </div>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Archetype Sound Healing</h3>
          <div className="archetype-sounds">
            {cathedralData.tarot.major_arcana?.slice(0, 6).map((archetype: any) => (
              <div key={archetype.number} className="archetype-sound-card">
                <div className="archetype-info">
                  <h4 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>{archetype.name}</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{archetype.faculty_role}</p>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    <strong>Frequency:</strong> {archetype.frequency_hz} Hz
                  </div>
                </div>
                <button
                  onClick={() => cathedralData.audio?.playArchetype(archetype)}
                  className="archetype-play-button"
                >
                  🎵 Activate
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Ambient Modes</h3>
          <div className="ambient-controls">
            <button
              onClick={startAmbientMode}
              disabled={isPlaying}
              className={`ambient-button ${ambientMode ? 'active' : ''}`}
            >
              🏛️ Cathedral Ambient (60s)
            </button>
            <button
              onClick={() => {
                if (cathedralData.audio) {
                  cathedralData.audio.generateSacredFrequency(432, 8).forEach((freq, index) => {
                    setTimeout(() => playFrequency(freq), index * 200);
                  });
                }
              }}
              className="ambient-button"
            >
              🌟 Harmonic Sequence
            </button>
            <button
              onClick={() => {
                // Play all chakras in sequence
                Object.entries(chakraFrequencies).forEach(([chakra, freq], index) => {
                  setTimeout(() => activateChakra(chakra), index * 3000);
                });
              }}
              className="ambient-button"
            >
              🌈 Full Chakra Alignment
            </button>
          </div>
        </div>
      </div>

      {isPlaying && (
        <div className="now-playing">
          <h4 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>Now Playing</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="frequency-visualizer">
              <div className="wave-bar" style={{ animationDelay: '0ms' }}></div>
              <div className="wave-bar" style={{ animationDelay: '100ms' }}></div>
              <div className="wave-bar" style={{ animationDelay: '200ms' }}></div>
              <div className="wave-bar" style={{ animationDelay: '300ms' }}></div>
              <div className="wave-bar" style={{ animationDelay: '400ms' }}></div>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem' }}>Frequency: {currentFrequency} Hz</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                {ambientMode ? 'Cathedral Ambient Mode' : 'Sacred Frequency Healing'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="audio-info">
        <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Sonic Physics Engine Features</h4>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
          <li>🎵 <strong>Sacred Frequency Synthesis:</strong> Solfeggio frequencies for healing and transformation</li>
          <li>🧘 <strong>Chakra Activation:</strong> Specific frequencies for each energy center</li>
          <li>🔮 <strong>Archetype Sound Healing:</strong> Tarot consciousness mapped to healing frequencies</li>
          <li>🏛️ <strong>Consciousness Binding:</strong> Real-world manifestation through audio-physics integration</li>
          <li>🌟 <strong>Ambient Modes:</strong> Therapeutic soundscapes for meditation and healing</li>
        </ul>
      </div>
    </div>
  );
};