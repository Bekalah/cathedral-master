import React, { useState } from 'react';
import { CathedralData } from '../cathedral-core';
import { CathedralMode } from '../App';

interface MobileInterfaceProps {
  cathedralData: CathedralData;
  onModeChange: (mode: CathedralMode) => void;
}

export const MobileInterface: React.FC<MobileInterfaceProps> = ({ cathedralData, onModeChange }) => {
  const [activeTab, setActiveTab] = useState('archetypes');

  const archetypes = cathedralData.tarot.major_arcana || [];
  const symbols = cathedralData.symbols.symbols || [];

  return (
    <div className="cathedral-component">
      <h2 className="component-title">📱 Mobile Studio</h2>
      <p className="component-subtitle">
        Touch-optimized creative workspace with 3D visualization and sacred geometry tools.
      </p>

      <div className="mobile-tabs">
        <button 
          className={`tab-button ${activeTab === 'archetypes' ? 'active' : ''}`}
          onClick={() => setActiveTab('archetypes')}
        >
          🔮 Archetypes
        </button>
        <button 
          className={`tab-button ${activeTab === 'symbols' ? 'active' : ''}`}
          onClick={() => setActiveTab('symbols')}
        >
          ⭐ Sacred Symbols
        </button>
        <button 
          className={`tab-button ${activeTab === 'frequencies' ? 'active' : ''}`}
          onClick={() => setActiveTab('frequencies')}
        >
          🎵 Frequencies
        </button>
      </div>

      <div className="mobile-content">
        {activeTab === 'archetypes' && (
          <div>
            <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Tarot Archetypes</h3>
            <div className="archetype-grid">
              {archetypes.slice(0, 6).map((archetype: any) => (
                <div key={archetype.number} className="archetype-card" 
                     onClick={() => cathedralData.audio?.playArchetype(archetype)}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{archetype.number === 0 ? '🃏' : '🔮'}</div>
                  <h4>{archetype.name}</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{archetype.faculty_role}</p>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.7rem' }}>
                    {archetype.frequency_hz} Hz
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'symbols' && (
          <div>
            <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Sacred Symbols</h3>
            <div className="symbol-grid">
              {symbols.slice(0, 6).map((symbol: any, index: number) => (
                <div key={index} className="symbol-card"
                     onClick={() => cathedralData.audio?.playSymbol(symbol)}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                  <h4>{symbol.name.replace('_', ' ').toUpperCase()}</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{symbol.frequency} Hz</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'frequencies' && (
          <div>
            <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Sacred Frequencies</h3>
            <div className="frequency-list">
              {cathedralData.symbols.frequency_systems?.solfege_healing && 
                Object.entries(cathedralData.symbols.frequency_systems.solfege_healing).map(([note, freq]: [string, any]) => (
                <div key={note} className="frequency-item">
                  <span style={{ fontWeight: '600', minWidth: '3rem' }}>{note}</span>
                  <span style={{ color: '#4ecdc4' }}>{freq} Hz</span>
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('playFrequency', { detail: { frequency: freq } });
                      window.dispatchEvent(event);
                    }}
                    style={{
                      marginLeft: 'auto',
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(255, 215, 0, 0.2)',
                      border: '1px solid #ffd700',
                      borderRadius: '4px',
                      color: '#ffd700',
                      fontSize: '0.7rem',
                      cursor: 'pointer'
                    }}
                  >
                    ▶️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};