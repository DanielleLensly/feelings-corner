import React from 'react';
import { Award, Sparkles, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

const ALL_BADGES = [
  {
    id: 'I Paused',
    title: 'I Paused',
    icon: '⭐',
    description: 'Took a pause before reacting and gave feelings time to settle.',
    color: '#6AA37E',
    bg: '#EEF7F2',
    border: '#84B896',
  },
  {
    id: 'I Took A Breath',
    title: 'I Took A Breath',
    icon: '☁️',
    description: 'Practiced turtle or bunny breathing to bring air into my heart.',
    color: '#D87C8C',
    bg: '#FDF0F2',
    border: '#E89AA7',
  },
  {
    id: 'I Am Safe',
    title: 'I Am Safe',
    icon: '🛡️',
    description: 'Remembered that all feelings pass and my body is protected and safe.',
    color: '#B38E24',
    bg: '#FEF9E8',
    border: '#EDD287',
  },
  {
    id: 'Brave Heart',
    title: 'Brave Heart',
    icon: '🦁',
    description: 'Faced a big, scary, or stormy feeling with courage and kindness.',
    color: '#CD684D',
    bg: '#FEF0EB',
    border: '#F1A990',
  },
  {
    id: 'Body Is Calm',
    title: 'Body Is Calm',
    icon: '🌙',
    description: 'Relaxed tight shoulders, softened breathing, and found peace.',
    color: '#4A92CC',
    bg: '#EFF7FC',
    border: '#6AAFE6',
  },
  {
    id: 'I Talked About It',
    title: 'I Talked About It',
    icon: '💬',
    description: 'Expressed what I needed or told someone how I felt inside.',
    color: '#7E64A8',
    bg: '#F4F0FA',
    border: '#BCAADB',
  },
];

export default function StickerCollection({ earnedBadges, onToggleBadge }) {
  const handleBadgeClick = (badge) => {
    sound.playChime('bell');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [badge.color, '#f9d859', '#ffffff']
      });
    } catch {}
    if (onToggleBadge) {
      onToggleBadge(badge.id);
    }
  };

  const unlockedCount = earnedBadges.length;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: '28px',
        padding: '28px 24px',
        boxShadow: 'var(--shadow-soft)',
        border: '2px solid #e1ded7',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#fef7e6',
          color: '#9e751d',
          fontSize: '0.85rem',
          fontWeight: 700,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} />
          Badge & Sticker Album
        </div>

        <h2 style={{
          fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#2e4338',
          margin: '0 0 8px 0'
        }}>
          EMOTIONAL REGULATION BADGES
        </h2>
        <p style={{ color: '#627c6f', fontSize: '1.05rem', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>
          Celebrate your calming milestones! Tap any badge to unlock it or celebrate your progress.
        </p>

        <div style={{
          marginTop: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 18px',
          borderRadius: '20px',
          backgroundColor: '#f5f0e8',
          fontWeight: 700,
          fontSize: '0.95rem',
          color: '#385044'
        }}>
          <span>⭐ {unlockedCount} of {ALL_BADGES.length} Badges Celebrated</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {ALL_BADGES.map((badge) => {
          const isUnlocked = earnedBadges.includes(badge.id);

          return (
            <button
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              style={{
                background: isUnlocked ? badge.bg : '#ffffff',
                borderRadius: '26px',
                border: isUnlocked ? `3.5px solid ${badge.border}` : '2.5px dashed #d6cec3',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '14px',
                cursor: 'pointer',
                opacity: isUnlocked ? 1 : 0.75,
                boxShadow: isUnlocked ? '0 10px 24px rgba(0,0,0,0.08)' : 'var(--shadow-card)',
                transform: isUnlocked ? 'scale(1.02)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative'
              }}
            >
              {isUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: badge.color,
                  color: '#ffffff',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 900
                }}>
                  ✓
                </div>
              )}

              {/* Badge Circular Emblem */}
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: `4px solid ${badge.border}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
              }} className={isUnlocked ? 'animate-float' : ''}>
                <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>{badge.icon}</span>
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: isUnlocked ? badge.color : '#56665e',
                  margin: '0 0 6px 0'
                }}>
                  {badge.title}
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: '#5b6e64',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  {badge.description}
                </p>
              </div>

              <div style={{
                marginTop: 'auto',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: isUnlocked ? badge.color : '#83968b'
              }}>
                {isUnlocked ? '★ Achieved & Celebrated' : 'Tap to Award This Badge'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sticker sheet preview banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '20px',
        border: '2px solid #e1ded7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="/assets/emotional-regulation-light.jpg"
            alt="Sticker Sheet Preview"
            style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #d4cdc3' }}
          />
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#2f4338', fontWeight: 700 }}>
              Physical Sticker & Badge Sheets
            </h4>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#687d72' }}>
              These match the printable sticker sheets in the project kit.
            </p>
          </div>
        </div>

        <a
          href="/assets/emotional-regulation-light.jpg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 18px',
            borderRadius: '20px',
            backgroundColor: '#f2eee9',
            color: '#344e41',
            textDecoration: 'none',
            fontSize: '0.88rem',
            fontWeight: 700
          }}
        >
          View Full Sticker Sheet ↗
        </a>
      </div>

    </div>
  );
}

