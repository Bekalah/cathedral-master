import React, { useState, useRef } from 'react';
import { CathedralData } from '../cathedral-core';
import { CathedralMode } from '../App';

interface ScannerInterfaceProps {
  cathedralData: CathedralData | null;
  onModeChange: (mode: CathedralMode) => void;
}

export const ScannerInterface: React.FC<ScannerInterfaceProps> = ({ cathedralData, onModeChange }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanResults(null);

    try {
      // Simulate scanning process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results
      const mockResults = {
        status: 'Scan Complete',
        archetype_matches: [
          {
            archetype_name: 'The Magician',
            confidence_score: 0.85,
            matching_text: ['The will to create reality through focused intention...'],
            frequency_hz: 288,
            element: 'Mercury',
            planetary_ruler: 'Mercury'
          },
          {
            archetype_name: 'The Star',
            confidence_score: 0.72,
            matching_text: ['Hope and divine guidance illuminate the path...'],
            frequency_hz: 720,
            element: 'Aquarius',
            planetary_ruler: 'Uranus'
          }
        ],
        frequency_analysis: {
          dominant_frequencies: [
            [288, { frequency: 288, solfege: 'RE', score: 2 }],
            [720, { frequency: 720, solfege: 'LA', score: 1 }]
          ]
        },
        metadata: {
          title: 'Mock Sacred Text',
          page_count: 156,
          scan_timestamp: new Date().toISOString()
        }
      };
      
      setScanResults(mockResults);
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="cathedral-component">
      <h2 className="component-title">📖 Book-to-Archetype Scanner</h2>
      <p className="component-subtitle">
        Upload books, manuscripts, or images to extract archetypal content and map it to tarot consciousness and sacred frequencies.
      </p>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.jpg,.jpeg,.png,.tiff"
          style={{ display: 'none' }}
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isScanning}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            background: isScanning ? '#666' : 'linear-gradient(45deg, #ffd700, #ff6b6b)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: isScanning ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {isScanning ? '🔄 Scanning...' : '📁 Select Book/Image to Scan'}
        </button>
      </div>

      {isScanning && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
          <p>Processing with Cathedral OCR Engine...</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Analyzing archetypal content and frequency correlations</p>
        </div>
      )}

      {scanResults && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Scan Results</h3>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <strong>Status:</strong> {scanResults.status}<br />
            <strong>Pages Processed:</strong> {scanResults.metadata.page_count}<br />
            <strong>Scan Time:</strong> {new Date(scanResults.metadata.scan_timestamp).toLocaleString()}
          </div>

          <h4 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>Archetype Matches</h4>
          {scanResults.archetype_matches.map((match: any, index: number) => (
            <div key={index} style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '1rem', 
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#ffd700' }}>{match.archetype_name}</strong>
                <span style={{ 
                  background: '#4ecdc4', 
                  color: '#000', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {(match.confidence_score * 100).toFixed(0)}% Match
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                <strong>Frequency:</strong> {match.frequency_hz} Hz • 
                <strong> Element:</strong> {match.element} • 
                <strong> Ruler:</strong> {match.planetary_ruler}
              </div>
              {match.matching_text.map((text: string, i: number) => (
                <p key={i} style={{ 
                  fontStyle: 'italic', 
                  marginTop: '0.5rem',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid #4ecdc4'
                }}>
                  "{text}"
                </p>
              ))}
            </div>
          ))}

          <h4 style={{ color: '#4ecdc4', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Dominant Frequencies</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {scanResults.frequency_analysis.dominant_frequencies.map(([freq, data]: [number, any]) => (
              <div key={freq} style={{
                background: 'rgba(78, 205, 196, 0.2)',
                color: '#4ecdc4',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                {freq} Hz ({data.solfege}) - Score: {data.score}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
        <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Scanner Capabilities</h4>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>📸 <strong>OCR Processing:</strong> Advanced text extraction from images and PDFs</li>
          <li>🔮 <strong>Archetype Analysis:</strong> AI-powered pattern recognition for tarot consciousness</li>
          <li>🎵 <strong>Frequency Mapping:</strong> Correlation with sacred healing frequencies</li>
          <li>📊 <strong>Sacred Text Mining:</strong> Extract hidden meanings and symbolic content</li>
          <li>🌟 <strong>Consciousness Mapping:</strong> Connect text to faculty roles and magical traditions</li>
        </ul>
      </div>
    </div>
  );
};