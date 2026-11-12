import React, { useState } from 'react';
import { sound } from '../utils/audio';

export default function Logo({ size = 52, showText = true, animated = true }) {
  const [isHugging, setIsHugging] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  // Exact purple & green watercolor palette from user's "A BIG HUG" and "TALK IT OUT" cards
  const purpleMain = '#B39BD6';    // Soft Lavender / Hug Purple
  const purpleLight = '#E4DCF2';   // Light Lilac tint
  const purpleDark = '#5C447B';    // Deep Plum text
  const purpleBlush = '#F5A9B8';   // Cheeks

  const greenMain = '#7CC4A5';     // Soft Mint / Talk-it-out Green
  const greenLight = '#CEEFE2';    // Pale Sage tint
  const greenDark = '#255841';     // Deep Forest text
  const greenBlush = '#F7B7A3';    // Peach cheeks

  const handleLogoClick = () => {
    setIsHugging(true);
    setShowHeart(true);
    try {
      sound.playChime('pop');
    } catch {}

    setTimeout(() => {
      setIsHugging(false);
    }, 700);

    setTimeout(() => {
      setShowHeart(false);
    }, 1400);
  };

  return (
    <div
      onClick={handleLogoClick}
      title="Click the CC to see them hug!"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Animated CC Hugging Icon */}
      <div style={{
        position: 'relative',
        width: `${size * 1.15}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Popping Heart on click */}
        {showHeart && (
          <div style={{
            position: 'absolute',
            top: '-18px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.25rem',
            animation: 'float 1s ease-out forwards',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            💖
          </div>
        )}

        <svg
          viewBox="0 0 120 100"
          width={size * 1.25}
          height={size}
          style={{
            overflow: 'visible',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHugging ? 'scale(1.12)' : 'scale(1)'
          }}
        >
          <defs>
            <filter id="softGlow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#4b3b55" floodOpacity="0.12" />
            </filter>
            
            {/* Soft watercolor gradients */}
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8B4E8" />
              <stop offset="100%" stopColor="#9C80C8" />
            </linearGradient>

            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9DE0C3" />
              <stop offset="100%" stopColor="#67B994" />
            </linearGradient>
          </defs>

          {/* Background Ambient Aura Pill */}
          <rect
            x="4"
            y="6"
            width="112"
            height="88"
            rx="30"
            fill="#FAF6F0"
            stroke="#E7DFD4"
            strokeWidth="2.5"
          />

          {/* GENTLE BREATHING GROUP */}
          <g
            style={{
              transformOrigin: '60px 50px',
              animation: animated && !isHugging ? 'breathingCC 4.5s ease-in-out infinite' : 'none'
            }}
          >
            {/* ============================================================== */}
            {/* FIRST 'C' (Purple: "Calming" / The Loving Hugger)              */}
            {/* ============================================================== */}
            <g
              style={{
                transition: 'transform 0.35s ease',
                transform: isHugging ? 'translateX(5px)' : 'translateX(0)'
              }}
            >
              {/* Main Body of Purple C */}
              <path
                d="M 52,24 C 30,24 16,35 16,52 C 16,69 30,80 52,80 C 56,80 60,79 63,77 C 65,75 64,71 61,70 C 58,69 55,70 51,70 C 35,70 26,62 26,52 C 26,42 35,34 51,34 C 55,34 58,35 61,34 C 64,33 65,29 63,27 C 60,25 56,24 52,24 Z"
                fill="url(#purpleGrad)"
                stroke="#694F8A"
                strokeWidth="2.5"
                strokeLinejoin="round"
                filter="url(#softGlow)"
              />

              {/* Purple C's Cute Closed Sleeping/Smiling Eyes (˘ ˘) */}
              <path
                d="M 23,47 Q 27,43 31,47"
                fill="none"
                stroke="#432F5C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 36,47 Q 40,43 44,47"
                fill="none"
                stroke="#432F5C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Gentle Purple Smile */}
              <path
                d="M 32,54 Q 35,58 38,54"
                fill="none"
                stroke="#432F5C"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Rosy Pink Blush on Purple C */}
              <circle cx="24" cy="52" r="3.5" fill={purpleBlush} opacity="0.8" />
              <circle cx="43" cy="52" r="3.5" fill={purpleBlush} opacity="0.8" />

              {/* Purple C's Arm reaching over to hug the Green C */}
              <path
                d="M 44,35 C 52,33 62,37 66,45 C 68,49 67,54 62,55 C 58,56 55,52 54,48 C 53,44 48,41 44,41 Z"
                fill="#C4B0E3"
                stroke="#694F8A"
                strokeWidth="2"
              />
              {/* Little hug hand paw */}
              <circle cx="64" cy="50" r="4.5" fill="#C4B0E3" stroke="#694F8A" strokeWidth="1.5" />
            </g>

            {/* ============================================================== */}
            {/* SECOND 'C' (Green: "Corner" / The Cozy Child Nestled Inside)   */}
            {/* ============================================================== */}
            <g
              style={{
                transition: 'transform 0.35s ease',
                transform: isHugging ? 'translateX(-5px)' : 'translateX(0)'
              }}
            >
              {/* Main Body of Green C */}
              <path
                d="M 94,30 C 76,30 64,39 64,54 C 64,69 76,78 94,78 C 98,78 101,77 104,75 C 106,73 105,69 102,68 C 99,67 97,68 93,68 C 80,68 73,61 73,54 C 73,47 80,40 93,40 C 97,40 99,41 102,40 C 105,39 106,35 104,33 C 101,31 98,30 94,30 Z"
                fill="url(#greenGrad)"
                stroke="#2A6148"
                strokeWidth="2.5"
                strokeLinejoin="round"
                filter="url(#softGlow)"
              />

              {/* Green C's Cute Happy Closed Eyes (◠ ◠) */}
              <path
                d="M 72,50 Q 75,46 78,50"
                fill="none"
                stroke="#1B4432"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 83,50 Q 86,46 89,50"
                fill="none"
                stroke="#1B4432"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Sweet Green Smile */}
              <path
                d="M 79,56 Q 82,60 85,56"
                fill="none"
                stroke="#1B4432"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Peach Blush on Green C */}
              <circle cx="72" cy="55" r="3" fill={greenBlush} opacity="0.85" />
              <circle cx="89" cy="55" r="3" fill={greenBlush} opacity="0.85" />

              {/* Green C's little hand resting peacefully */}
              <circle cx="80" cy="62" r="3.5" fill="#96D4B9" stroke="#2A6148" strokeWidth="1.5" />
            </g>

            {/* Little floating connection sparkle between their heads */}
            <path
              d="M 58,21 L 59,25 L 63,26 L 59,27 L 58,31 L 57,27 L 53,26 L 57,25 Z"
              fill="#F4D368"
            />
          </g>
        </svg>
      </div>

      {/* Styled Typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ color: purpleDark }}>CALMING</span>
            <span style={{ color: greenDark }}>CORNER</span>
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: '#657B6F',
            fontWeight: 600,
            letterSpacing: '0.01em',
            marginTop: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>A gentle space for big feelings</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>• Tap CC to hug!</span>
          </div>
        </div>
      )}

      {/* CSS Animation Keyframes for Breathing CC */}
      <style>{`
        @keyframes breathingCC {
          0%, 100% {
            transform: scale(1) translateY(0px);
          }
          45% {
            transform: scale(1.05) translateY(-2px);
          }
          55% {
            transform: scale(1.05) translateY(-2px);
          }
          85% {
            transform: scale(0.98) translateY(1px);
          }
        }
      `}</style>
    </div>
  );
}
