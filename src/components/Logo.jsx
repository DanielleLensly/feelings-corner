import React from 'react';

export default function Logo({ size = 48, showText = false, animated = true }) {
  // Exact pastel tones from "A BIG HUG" (purple) and "TALK IT OUT" (green)
  const purpleBg = '#E0D6EE';
  const purpleBorder = '#B6A1D4';
  const purpleDeep = '#6E558F';
  
  const greenBg = '#C4E6D7';
  const greenBorder = '#85C3A7';
  const greenDeep = '#2E5B45';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      {/* Dual-Color Purple & Green Emblem */}
      <div
        className={animated ? 'animate-float' : ''}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{ overflow: 'visible', filter: 'drop-shadow(0 4px 10px rgba(80, 100, 90, 0.15))' }}
        >
          <defs>
            {/* Soft gradient blending from hug purple to talk-it-out green */}
            <linearGradient id="purpleGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFD4ED" />
              <stop offset="50%" stopColor="#D5DFE3" />
              <stop offset="100%" stopColor="#C4E7D8" />
            </linearGradient>

            <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B39DD2" />
              <stop offset="100%" stopColor="#7FBFA2" />
            </linearGradient>

            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#443355" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Outer Rounded Pebble Badge */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="28"
            fill="url(#purpleGreenGrad)"
            stroke="url(#borderGrad)"
            strokeWidth="3.5"
          />

          {/* Left Wing / Hug Leaf in Purple */}
          <path
            d="M 50,22 C 34,22 22,34 22,50 C 22,64 34,74 48,78 C 45,66 43,54 50,42 C 53,37 54,28 50,22 Z"
            fill={purpleBorder}
            opacity="0.55"
          />

          {/* Right Wing / Sprout Leaf in Green */}
          <path
            d="M 50,22 C 66,22 78,34 78,50 C 78,64 66,74 52,78 C 55,66 57,54 50,42 C 47,37 46,28 50,22 Z"
            fill={greenBorder}
            opacity="0.65"
          />

          {/* Overlapping Harmonious Heart / Co-regulation Connection */}
          {/* Left Purple Heart Half */}
          <path
            d="M 50,34 C 42,24 28,27 28,40 C 28,54 50,68 50,68 Z"
            fill="#B69FD6"
            filter="url(#softShadow)"
          />

          {/* Right Green Heart Half */}
          <path
            d="M 50,34 C 58,24 72,27 72,40 C 72,54 50,68 50,68 Z"
            fill="#7FBFA2"
            filter="url(#softShadow)"
          />

          {/* Center Gentle Peaceful Blossom / Sprout */}
          <circle cx="50" cy="46" r="6" fill="#FFFFFF" />
          <circle cx="50" cy="46" r="3.5" fill="#edd287" />

          {/* Soft little smile curve representing calm */}
          <path
            d="M 43,56 Q 50,62 57,56"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Optional integrated typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ color: greenDeep }}>CALMING</span>
            <span style={{ color: purpleDeep }}>CORNER</span>
          </div>
          <div style={{
            fontSize: '0.82rem',
            color: '#657B6F',
            fontWeight: 600,
            letterSpacing: '0.01em',
            marginTop: '2px'
          }}>
            The Emotional Regulation & Co-Regulation Room Kit
          </div>
        </div>
      )}
    </div>
  );
}
