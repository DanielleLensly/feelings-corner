import React, { useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Logo({ size = 54, showText = true, allowDownload = false }) {
  const [isHugging, setIsHugging] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

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
    }, 1500);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
      
      {/* Clickable Logo Mark with Print-Accurate Vector Elements */}
      <div
        onClick={handleLogoClick}
        title="Printable CC Logo • Click to hug!"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        {/* The Print-Ready Vector Emblem */}
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
              fontSize: '1.3rem',
              animation: 'float 1s ease-out forwards',
              zIndex: 10,
              pointerEvents: 'none'
            }}>
              💖
            </div>
          )}

          <svg
            viewBox="0 0 500 500"
            width={size * 1.15}
            height={size}
            style={{
              overflow: 'visible',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isHugging ? 'scale(1.12)' : 'scale(1)',
              filter: 'drop-shadow(0 4px 10px rgba(58, 44, 73, 0.12))'
            }}
          >
            {/* Outer Sticker Badge / Print Cut-Line Ring */}
            <circle cx="250" cy="250" r="236" fill="#FAF6F0" stroke="#E3DACF" strokeWidth="8" />
            <circle cx="250" cy="250" r="220" fill="#FFFFFF" stroke="#85CCA8" strokeWidth="4" strokeDasharray="10 8" />

            {/* THE HUGGING CC CHARACTERS */}
            <g transform="translate(0, -10)">
              {/* FIRST 'C' (Purple: Calming / Caregiver) */}
              <g
                style={{
                  transition: 'transform 0.35s ease',
                  transform: isHugging ? 'translateX(14px)' : 'translateX(0)'
                }}
              >
                {/* Purple C Body */}
                <path
                  d="M 230,120 C 145,120 90,165 90,230 C 90,295 145,340 230,340 C 248,340 264,336 276,328 C 284,320 280,304 268,300 C 256,296 244,300 228,300 C 165,300 130,268 130,230 C 130,192 165,160 228,160 C 244,160 256,164 268,160 C 280,156 284,140 276,132 C 264,124 248,120 230,120 Z"
                  fill="#B8A2D8"
                  stroke="#593E7C"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Eyes */}
                <path d="M 120,210 Q 134,196 148,210" fill="none" stroke="#452D64" strokeWidth="7" strokeLinecap="round" />
                <path d="M 170,210 Q 184,196 198,210" fill="none" stroke="#452D64" strokeWidth="7" strokeLinecap="round" />
                {/* Smile */}
                <path d="M 152,238 Q 164,250 176,238" fill="none" stroke="#452D64" strokeWidth="6" strokeLinecap="round" />
                {/* Cheeks */}
                <circle cx="122" cy="226" r="11" fill="#F4AEC0" opacity="0.85" />
                <circle cx="196" cy="226" r="11" fill="#F4AEC0" opacity="0.85" />

                {/* Hugging Arm */}
                <path
                  d="M 200,162 C 235,152 278,168 294,204 C 302,222 298,242 278,246 C 262,250 250,234 246,218 C 242,202 220,188 200,188 Z"
                  fill="#C9B6E4"
                  stroke="#593E7C"
                  strokeWidth="7"
                  strokeLinejoin="round"
                />
                <circle cx="288" cy="225" r="15" fill="#C9B6E4" stroke="#593E7C" strokeWidth="6" />
              </g>

              {/* SECOND 'C' (Green: Corner / Child) */}
              <g
                style={{
                  transition: 'transform 0.35s ease',
                  transform: isHugging ? 'translateX(-14px)' : 'translateX(0)'
                }}
              >
                {/* Green C Body */}
                <path
                  d="M 390,145 C 320,145 275,182 275,238 C 275,294 320,332 390,332 C 405,332 418,328 428,320 C 435,312 431,298 420,294 C 408,290 398,294 386,294 C 335,294 310,268 310,238 C 310,208 335,183 386,183 C 398,183 408,187 420,183 C 431,179 435,165 428,157 C 418,149 405,145 390,145 Z"
                  fill="#85CBA8"
                  stroke="#235A42"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Eyes */}
                <path d="M 306,224 Q 318,212 330,224" fill="none" stroke="#163F2E" strokeWidth="7" strokeLinecap="round" />
                <path d="M 350,224 Q 362,212 374,224" fill="none" stroke="#163F2E" strokeWidth="7" strokeLinecap="round" />
                {/* Smile */}
                <path d="M 334,248 Q 344,258 354,248" fill="none" stroke="#163F2E" strokeWidth="6" strokeLinecap="round" />
                {/* Cheeks */}
                <circle cx="308" cy="238" r="10" fill="#F7BAA6" opacity="0.9" />
                <circle cx="372" cy="238" r="10" fill="#F7BAA6" opacity="0.9" />
                {/* Little resting hand */}
                <circle cx="340" cy="272" r="12" fill="#A2DCBF" stroke="#235A42" strokeWidth="6" />
              </g>

              {/* Little Floating Heart */}
              <path
                d="M 250,88 C 242,70 216,75 216,96 C 216,120 250,140 250,140 C 250,140 284,120 284,96 C 284,75 258,70 250,88 Z"
                fill="#E68278"
                stroke="#593E7C"
                strokeWidth="5"
              />
            </g>
          </svg>
        </div>

        {/* Brand Text */}
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
              <span style={{ color: '#593E7C' }}>CALMING</span>
              <span style={{ color: '#235A42' }}>CORNER</span>
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
              <span>The Co-Regulation Room Kit</span>
            </div>
          </div>
        )}
      </div>

      {/* Optional Direct Vector Print / Download link */}
      {allowDownload && (
        <a
          href="/assets/calming-corner-logo.svg"
          download="calming-corner-printable-logo.svg"
          target="_blank"
          rel="noopener noreferrer"
          title="Download 100% Vector SVG for Print & Cricut"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ffffff',
            border: '1.5px solid #D6CCBE',
            borderRadius: '16px',
            padding: '6px 12px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#496053',
            textDecoration: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease'
          }}
        >
          <Download size={13} />
          <span>Print-Ready Vector SVG</span>
        </a>
      )}

    </div>
  );
}
