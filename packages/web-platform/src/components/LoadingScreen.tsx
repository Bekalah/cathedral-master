import React from 'react';
import './cathedral-app.css';

interface LoadingScreenProps {
  progress: number;
  status: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, status }) => {
  return (
    <div className="loading-screen">
      <h1 className="loading-title">🏛️ Cathedral Loading...</h1>
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="loading-status">{status}</p>
      <div style={{ 
        fontSize: '3rem', 
        marginTop: '2rem',
        animation: 'pulse 2s infinite'
      }}>
        ✨
      </div>
    </div>
  );
};