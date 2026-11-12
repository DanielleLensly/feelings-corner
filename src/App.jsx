import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FeelingsCheckIn from './components/FeelingsCheckIn';
import BreathingExercise from './components/BreathingExercise';
import GroundingExercise from './components/GroundingExercise';
import CalmToolbox from './components/CalmToolbox';
import WhatDoINeed from './components/WhatDoINeed';
import StickerCollection from './components/StickerCollection';
import CaregiverGuideModal from './components/CaregiverGuideModal';
import PosterGalleryModal from './components/PosterGalleryModal';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('feelings');
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showPosters, setShowPosters] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Persist earned badges in localStorage
  const [earnedBadges, setEarnedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('calm_corner_badges');
      return saved ? JSON.parse(saved) : ['I Paused'];
    } catch {
      return ['I Paused'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('calm_corner_badges', JSON.stringify(earnedBadges));
    } catch {}
  }, [earnedBadges]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAwardBadge = (badgeId) => {
    if (!earnedBadges.includes(badgeId)) {
      setEarnedBadges((prev) => [...prev, badgeId]);
      showToast(`⭐ New Badge Earned: "${badgeId}"!`);
    }
  };

  const handleToggleBadge = (badgeId) => {
    setEarnedBadges((prev) => {
      if (prev.includes(badgeId)) {
        return prev.filter((id) => id !== badgeId);
      } else {
        return [...prev, badgeId];
      }
    });
  };

  const handleBreathingCycleComplete = (count) => {
    if (count >= 1) {
      handleAwardBadge('I Took A Breath');
    }
    if (count >= 3) {
      handleAwardBadge('Body Is Calm');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGuide={() => setShowGuide(true)}
        onOpenPosters={() => setShowPosters(true)}
        badgesCount={earnedBadges.length}
      />

      {/* Main Tab Content */}
      <main style={{
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '16px 20px 48px 20px',
        boxSizing: 'border-box'
      }}>
        {activeTab === 'feelings' && (
          <FeelingsCheckIn
            onNavigateTab={(tab) => setActiveTab(tab)}
            onSelectEmotion={(emotion) => {
              setCurrentEmotion(emotion);
              handleAwardBadge('I Paused');
            }}
            currentEmotion={currentEmotion}
          />
        )}

        {activeTab === 'breathe' && (
          <BreathingExercise
            onCompleteCycle={handleBreathingCycleComplete}
          />
        )}

        {activeTab === 'ground' && (
          <GroundingExercise
            onAwardBadge={handleAwardBadge}
          />
        )}

        {activeTab === 'toolbox' && (
          <CalmToolbox
            onAwardBadge={handleAwardBadge}
          />
        )}

        {activeTab === 'needs' && (
          <WhatDoINeed
            onAwardBadge={handleAwardBadge}
          />
        )}

        {activeTab === 'stickers' && (
          <StickerCollection
            earnedBadges={earnedBadges}
            onToggleBadge={handleToggleBadge}
          />
        )}
      </main>

      {/* Notification Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#344e41',
          color: '#ffffff',
          padding: '12px 22px',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          fontWeight: 700,
          fontSize: '0.95rem',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideUp 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Caregiver Guide Modal */}
      <CaregiverGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {/* Printable Posters Gallery Modal */}
      <PosterGalleryModal
        isOpen={showPosters}
        onClose={() => setShowPosters(false)}
      />

      {/* Gentle Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 20px',
        color: '#6e8478',
        fontSize: '0.88rem',
        borderTop: '1px solid #e7e1d8',
        backgroundColor: 'rgba(255,255,255,0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px'
      }}>
        <div>
          🌸 <strong>Calming Corner</strong> • A trauma-informed, peaceful co-regulation space for every child and caregiver.
        </div>
        <div style={{ fontSize: '0.8rem', color: '#889e92' }}>
          Inspired by gentle sensory regulation, somatic calming tools, and mindful breathing.
        </div>
      </footer>
    </div>
  );
}

