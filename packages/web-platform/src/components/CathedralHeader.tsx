import React from 'react';
import { CathedralMode } from '../App';

interface CathedralHeaderProps {
  activeMode: CathedralMode;
  onModeChange: (mode: CathedralMode) => void;
  mobileOptimized: boolean;
}

export const CathedralHeader: React.FC<CathedralHeaderProps> = ({
  activeMode,
  onModeChange,
  mobileOptimized
}) => {
  const modes = [
    { key: 'welcome', label: 'Welcome', icon: '🏛️' },
    { key: 'mobile', label: 'Mobile Studio', icon: '📱' },
    { key: 'scanner', label: 'Book Scanner', icon: '📖' },
    { key: 'design', label: 'Design Suite', icon: '🎨' },
    { key: 'music', label: 'Music Lab', icon: '🎵' }
  ] as const;

  return (
    <header className="cathedral-header">
      <h1 className="header-title">🏛️ Cathedral</h1>
      <nav className="mode-selector">
        {modes.map(mode => (
          <button
            key={mode.key}
            className={`mode-button ${activeMode === mode.key ? 'active' : ''}`}
            onClick={() => onModeChange(mode.key)}
          >
            <span style={{ marginRight: '0.5rem' }}>{mode.icon}</span>
            {mode.label}
          </button>
        ))}
      </nav>
      {mobileOptimized && (
        <div className="mobile-badge">📱 Mobile Ready</div>
      )}
    </header>
  );
};