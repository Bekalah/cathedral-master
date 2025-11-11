import React from 'react';
import { CathedralMode } from '../App';
import { CathedralData } from '../cathedral-core';

interface WelcomeScreenProps {
  onModeChange: (mode: CathedralMode) => void;
  cathedralData: CathedralData | null;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onModeChange, cathedralData }) => {
  const features = [
    {
      mode: 'mobile' as CathedralMode,
      icon: '📱',
      title: 'Mobile Studio',
      description: 'Touch-optimized creative workspace with 3D visualization, sacred geometry tools, and consciousness-expanding interfaces designed for mobile devices.',
      capabilities: ['3D Navigation', 'Touch Gestures', 'Sacred Geometry', 'Consciousness Maps']
    },
    {
      mode: 'scanner' as CathedralMode,
      icon: '📖',
      title: 'Book-to-Archetype Scanner',
      description: 'Advanced OCR-powered scanner that extracts archetypal content from books and maps it to tarot consciousness and sacred frequencies.',
      capabilities: ['OCR Processing', 'Archetype Analysis', 'Frequency Correlation', 'Sacred Text Mining']
    },
    {
      mode: 'design' as CathedralMode,
      icon: '🎨',
      title: 'Professional Design Suite',
      description: 'Complete replacement for Adobe Creative Suite with AI-enhanced design tools, sacred geometry generators, and professional-grade capabilities.',
      capabilities: ['Vector Graphics', 'Sacred Geometry', 'AI Enhancement', 'Professional Tools']
    },
    {
      mode: 'music' as CathedralMode,
      icon: '🎵',
      title: 'Sonic Physics Engine',
      description: 'Revolutionary audio-physics binding system that converts conscious intention into real-world manifestations through sacred frequency synthesis.',
      capabilities: ['Sacred Frequencies', 'Consciousness Binding', 'Physics Integration', 'Real-time Synthesis']
    }
  ];

  return (
    <div className="welcome-screen">
      <h1 className="welcome-title">
        Cathedral Creative Ecosystem
      </h1>
      <p className="welcome-subtitle">
        The complete master artist system unifying all traditions, wisdom schools, sciences, and arts. 
        Experience the future of creative consciousness technology.
      </p>
      
      {cathedralData && (
        <div style={{ 
          margin: '2rem 0', 
          padding: '1rem', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          <strong>System Status:</strong> {cathedralData.tarot.major_arcana?.length || 0} Archetypes Loaded • {' '}
          {cathedralData.symbols.symbols?.length || 0} Sacred Symbols • {' '}
          {cathedralData.moonchild.archetypes?.length || 0} Moonchild Chapters
        </div>
      )}

      <div className="welcome-grid">
        {features.map(feature => (
          <div
            key={feature.mode}
            className="welcome-card"
            onClick={() => onModeChange(feature.mode)}
          >
            <div className="card-icon">{feature.icon}</div>
            <h3 className="card-title">{feature.title}</h3>
            <p className="card-description">{feature.description}</p>
            <div style={{ marginTop: '1rem' }}>
              {feature.capabilities.map(cap => (
                <span
                  key={cap}
                  style={{
                    display: 'inline-block',
                    background: 'rgba(255, 215, 0, 0.2)',
                    color: '#ffd700',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    margin: '0.25rem',
                    marginRight: '0.5rem'
                  }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};