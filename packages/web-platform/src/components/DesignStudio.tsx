import React, { useState } from 'react';
import { CathedralData } from '../cathedral-core';
import { CathedralMode } from '../App';

interface DesignStudioProps {
  cathedralData: CathedralData;
  onModeChange: (mode: CathedralMode) => void;
}

export const DesignStudio: React.FC<DesignStudioProps> = ({ cathedralData, onModeChange }) => {
  const [selectedTool, setSelectedTool] = useState('sacred-geometry');
  const [canvasContent, setCanvasContent] = useState('');

  const tools = [
    { id: 'sacred-geometry', name: 'Sacred Geometry', icon: '🔷' },
    { id: 'symbol-editor', name: 'Symbol Editor', icon: '⭐' },
    { id: 'typography', name: 'Sacred Typography', icon: '📝' },
    { id: 'color-theory', name: 'Color Harmony', icon: '🎨' }
  ];

  const renderSacredGeometryTool = () => {
    const symbols = cathedralData.symbols.symbols || [];
    
    return (
      <div>
        <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Sacred Geometry Generator</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {symbols.map((symbol: any, index: number) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              cathedralData.audio?.playSymbol(symbol);
              setCanvasContent(prev => prev + `\n${symbol.name}: ${symbol.description}`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔷</div>
              <h5 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                {symbol.name.replace('_', ' ').toUpperCase()}
              </h5>
              <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{symbol.frequency} Hz</p>
              <p style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>
                {symbol.meanings.slice(0, 2).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSymbolEditor = () => {
    const archetypes = cathedralData.tarot.major_arcana || [];
    
    return (
      <div>
        <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Archetype Symbol Editor</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {archetypes.slice(0, 6).map((archetype: any) => (
            <div key={archetype.number} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h5 style={{ color: '#ffd700' }}>{archetype.name}</h5>
                <span style={{ fontSize: '0.8rem', color: '#4ecdc4' }}>{archetype.frequency_hz} Hz</span>
              </div>
              <div style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                <strong>Element:</strong> {archetype.element} • <strong>Ruler:</strong> {archetype.planetary_ruler}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={() => {
                    cathedralData.audio?.playArchetype(archetype);
                    setCanvasContent(prev => prev + `\n${archetype.name}: ${archetype.keywords.join(', ')}`);
                  }}
                  style={{
                    padding: '0.5rem',
                    background: 'rgba(78, 205, 196, 0.2)',
                    border: '1px solid #4ecdc4',
                    borderRadius: '4px',
                    color: '#4ecdc4',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  🎵 Play
                </button>
                <button
                  onClick={() => setCanvasContent(prev => prev + `\n[${archetype.symbol}]`)}
                  style={{
                    padding: '0.5rem',
                    background: 'rgba(255, 215, 0, 0.2)',
                    border: '1px solid #ffd700',
                    borderRadius: '4px',
                    color: '#ffd700',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  ⭐ Add Symbol
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="cathedral-component">
      <h2 className="component-title">🎨 Professional Design Suite</h2>
      <p className="component-subtitle">
        Complete replacement for Adobe Creative Suite with AI-enhanced design tools, sacred geometry generators, and professional-grade capabilities.
      </p>

      <div className="design-toolbar">
        {tools.map(tool => (
          <button
            key={tool.id}
            className={`tool-button ${selectedTool === tool.id ? 'active' : ''}`}
            onClick={() => setSelectedTool(tool.id)}
          >
            <span style={{ marginRight: '0.5rem' }}>{tool.icon}</span>
            {tool.name}
          </button>
        ))}
      </div>

      <div className="design-workspace">
        <div className="design-canvas">
          {selectedTool === 'sacred-geometry' && renderSacredGeometryTool()}
          {selectedTool === 'symbol-editor' && renderSymbolEditor()}
          {selectedTool === 'typography' && (
            <div>
              <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Sacred Typography</h4>
              <p>Professional typography tools with sacred fonts and mystical lettering systems.</p>
            </div>
          )}
          {selectedTool === 'color-theory' && (
            <div>
              <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Color Harmony</h4>
              <p>Advanced color theory tools based on chakra frequencies and sacred color correspondences.</p>
            </div>
          )}
        </div>

        <div className="design-properties">
          <h4 style={{ color: '#ffd700', marginBottom: '1rem' }}>Properties Panel</h4>
          <div className="property-group">
            <label>Canvas Size</label>
            <select style={{ width: '100%', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '4px', color: '#fff' }}>
              <option>1920x1080 (HD)</option>
              <option>3840x2160 (4K)</option>
              <option>1024x768 (Square)</option>
            </select>
          </div>
          <div className="property-group">
            <label>Color Profile</label>
            <select style={{ width: '100%', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '4px', color: '#fff' }}>
              <option>RGB (Digital)</option>
              <option>CMYK (Print)</option>
              <option>HSV (Sacred)</option>
            </select>
          </div>
          <div className="property-group">
            <label>Resolution</label>
            <select style={{ width: '100%', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '4px', color: '#fff' }}>
              <option>72 DPI (Web)</option>
              <option>300 DPI (Print)</option>
              <option>600 DPI (High-Res)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="design-canvas-content">
        <h4 style={{ color: '#ffd700', marginBottom: '1rem' }}>Canvas</h4>
        <div className="canvas-area">
          {canvasContent ? (
            <pre style={{ color: '#4ecdc4', fontSize: '0.8rem', lineHeight: '1.4' }}>{canvasContent}</pre>
          ) : (
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}>
              Select tools and symbols to begin creating your sacred design...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};