import React, { useState, useEffect } from 'react';
import { initializeCathedral, CathedralData } from './cathedral-core';
import { MobileInterface } from './components/MobileInterface';
import { ScannerInterface } from './components/ScannerInterface';
import { DesignStudio } from './components/DesignStudio';
import { MusicLab } from './components/MusicLab';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CathedralHeader } from './components/CathedralHeader';
import { LoadingScreen } from './components/LoadingScreen';
import './cathedral-app.css';

export type CathedralMode = 'welcome' | 'mobile' | 'scanner' | 'design' | 'music' | 'labs';

function App() {
  const [activeMode, setActiveMode] = useState<CathedralMode>('welcome');
  const [isInitialized, setIsInitialized] = useState(false);
  const [cathedralData, setCathedralData] = useState<CathedralData | null>(null);
  const [initProgress, setInitProgress] = useState(0);
  const [initStatus, setInitStatus] = useState('Initializing Cathedral...');

  useEffect(() => {
    const init = async () => {
      try {
        setInitStatus('Loading Sacred Datasets...');
        setInitProgress(25);
        
        const data = await initializeCathedral();
        
        setInitStatus('Initializing Audio Engine...');
        setInitProgress(50);
        
        // Simulate initialization steps for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        setInitProgress(75);
        
        setInitStatus('Activating Consciousness Matrix...');
        await new Promise(resolve => setTimeout(resolve, 500));
        setInitProgress(100);
        
        setCathedralData(data);
        setIsInitialized(true);
        setInitStatus('Cathedral Online - Ready for Creation');
        
        console.log('🏛️ Cathedral Creative Ecosystem Initialized');
        console.log('📱 Mobile Optimized:', data.mobileOptimized);
        console.log('🎵 Audio Engine:', data.audio ? 'Active' : 'Inactive');
        console.log('📊 Dataset Status:', {
          tarot: data.tarot.major_arcana?.length || 0,
          symbols: data.symbols.symbols?.length || 0,
          moonchild: data.moonchild.archetypes?.length || 0
        });
        
      } catch (error) {
        console.error('Failed to initialize Cathedral:', error);
        setInitStatus('Initialization Error - Please refresh');
        setInitProgress(0);
      }
    };
    
    init();
  }, []);

  const handleModeChange = (mode: CathedralMode) => {
    setActiveMode(mode);
    
    // Log mode changes for analytics
    console.log(`🔄 Mode switched to: ${mode}`);
    
    // Initialize mode-specific features
    if (mode === 'music' && cathedralData) {
      cathedralData.audio.createCathedralAmbient(5);
    }
  };

  // Show loading screen during initialization
  if (!isInitialized) {
    return (
      <LoadingScreen 
        progress={initProgress} 
        status={initStatus}
      />
    );
  }

  return (
    <div className="cathedral-app">
      <CathedralHeader 
        activeMode={activeMode}
        onModeChange={handleModeChange}
        mobileOptimized={cathedralData?.mobileOptimized || false}
      />

      <main className="cathedral-main">
        {activeMode === 'welcome' && (
          <WelcomeScreen 
            onModeChange={handleModeChange}
            cathedralData={cathedralData}
          />
        )}
        
        {activeMode === 'mobile' && cathedralData && (
          <MobileInterface 
            cathedralData={cathedralData}
            onModeChange={handleModeChange}
          />
        )}
        
        {activeMode === 'scanner' && (
          <ScannerInterface 
            cathedralData={cathedralData}
            onModeChange={handleModeChange}
          />
        )}
        
        {activeMode === 'design' && cathedralData && (
          <DesignStudio 
            cathedralData={cathedralData}
            onModeChange={handleModeChange}
          />
        )}
        
        {activeMode === 'music' && cathedralData && (
          <MusicLab 
            cathedralData={cathedralData}
            onModeChange={handleModeChange}
          />
        )}
      </main>

      <footer className="cathedral-footer">
        <div className="cathedral-status">
          <span className="status-indicator online"></span>
          <span>Cathedral Creative Ecosystem v1.0.0</span>
          {cathedralData?.mobileOptimized && (
            <span className="mobile-badge">📱 Mobile Ready</span>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;