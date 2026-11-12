import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen, Award, Image, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Header({ activeTab, setActiveTab, onOpenGuide, onOpenPosters, badgesCount }) {
  const [ambientActive, setAmbientActive] = useState(false);

  const toggleSound = () => {
    sound.toggleAmbient((isPlaying) => {
      setAmbientActive(isPlaying);
      if (isPlaying) {
        sound.playChime('bell');
      }
    });
  };

  const navItems = [
    { id: 'feelings', label: 'How I Feel', icon: '🌈', color: '#edd287' },
    { id: 'breathe', label: 'Breathe With Me', icon: '🐢', color: '#9bb7a5' },
    { id: 'ground', label: 'Find Your Ground', icon: '🌿', color: '#8ab7d8' },
    { id: 'toolbox', label: 'Calm Toolbox', icon: '🧰', color: '#f1a990' },
    { id: 'needs', label: 'What I Need', icon: '💬', color: '#bcaadb' },
    { id: 'stickers', label: 'My Badges', icon: '⭐', color: '#e6a5af', badge: badgesCount > 0 ? badgesCount : null },
  ];

  return (
    <header style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px 20px 10px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Top utility row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#e8f1eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            border: '2px solid #9bb7a5',
            boxShadow: '0 4px 12px rgba(155, 183, 165, 0.25)'
          }} className="animate-float">
            🌸
          </div>
          <div>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#344e41',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              CALMING CORNER
            </h1>
            <p style={{
              fontSize: '0.9rem',
              color: '#657e72',
              fontWeight: 500,
              margin: 0
            }}>
              Co-regulation, peaceful breathing & gentle sensory grounding
            </p>
          </div>
        </div>

        {/* Right utility buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={toggleSound}
            style={{
              padding: '8px 14px',
              borderRadius: '24px',
              backgroundColor: ambientActive ? '#9bb7a5' : '#ffffff',
              color: ambientActive ? '#ffffff' : '#496356',
              border: '2px solid #b6ccbf',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-card)',
              transition: 'all 0.2s ease'
            }}
            title={ambientActive ? 'Mute soothing background hum' : 'Play soothing calming hum'}
          >
            {ambientActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{ambientActive ? 'Soothing Sound On' : 'Play Sound'}</span>
          </button>

          <button
            onClick={onOpenPosters}
            style={{
              padding: '8px 14px',
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              color: '#496356',
              border: '2px solid #e2ddd5',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-card)',
              transition: 'all 0.2s ease'
            }}
          >
            <Image size={16} color="#8ab7d8" />
            <span>Poster Kit</span>
          </button>

          <button
            onClick={onOpenGuide}
            style={{
              padding: '8px 14px',
              borderRadius: '24px',
              backgroundColor: '#fef7e6',
              color: '#725a25',
              border: '2px solid #eedda9',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-card)',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={16} color="#c09331" />
            <span>Caregiver Guide</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <nav style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '6px',
        paddingTop: '4px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playChime('pop');
                setActiveTab(tab.id);
              }}
              style={{
                flex: '0 0 auto',
                padding: '10px 18px',
                borderRadius: '30px',
                backgroundColor: isActive ? '#344e41' : '#ffffff',
                color: isActive ? '#ffffff' : '#495a52',
                border: isActive ? '2px solid #344e41' : '2px solid #e5dfd5',
                fontSize: '0.98rem',
                fontWeight: isActive ? 700 : 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isActive ? '0 6px 16px rgba(52, 78, 65, 0.2)' : 'var(--shadow-card)',
                transform: isActive ? 'translateY(-1px)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  backgroundColor: '#e6a5af',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  padding: '2px 7px',
                  borderRadius: '12px',
                  fontWeight: 700
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

