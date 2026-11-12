import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export default function BreathingExercise({ onCompleteCycle }) {
  const [mode, setMode] = useState('infinity'); // 'infinity' or 'square'
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  // Square breathing state: phase 0 (Inhale), 1 (Hold), 2 (Exhale), 3 (Pause)
  const [squarePhase, setSquarePhase] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);

  // Infinity breathing state: 'in' or 'out'
  const [infinityPhase, setInfinityPhase] = useState('in');
  const [infinityProgress, setInfinityProgress] = useState(0); // 0 to 1

  const intervalRef = useRef(null);
  const infinityAnimRef = useRef(null);

  // Square Breathing Timer Logic
  useEffect(() => {
    if (!isActive || mode !== 'square') {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prevSec) => {
        if (prevSec <= 1) {
          setSquarePhase((prevPhase) => {
            const nextPhase = (prevPhase + 1) % 4;
            if (nextPhase === 0) {
              setCycleCount((c) => {
                const updated = c + 1;
                sound.playChime('bell');
                if (onCompleteCycle) onCompleteCycle(updated);
                return updated;
              });
              sound.playChime('breathIn');
            } else if (nextPhase === 2) {
              sound.playChime('breathOut');
            } else {
              sound.playChime('pop');
            }
            return nextPhase;
          });
          return 4;
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, mode, onCompleteCycle]);

  // Infinity Breathing Animation Loop (8 seconds total cycle: 4s in, 4s out)
  useEffect(() => {
    if (!isActive || mode !== 'infinity') {
      cancelAnimationFrame(infinityAnimRef.current);
      return;
    }

    let start = performance.now();
    const DURATION = 8000; // 8 seconds per loop

    const step = (now) => {
      const elapsed = (now - start) % DURATION;
      const progress = elapsed / DURATION;
      setInfinityProgress(progress);

      const isFirstHalf = progress < 0.5;
      const currentPhase = isFirstHalf ? 'in' : 'out';
      setInfinityPhase(currentPhase);

      infinityAnimRef.current = requestAnimationFrame(step);
    };

    infinityAnimRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(infinityAnimRef.current);
  }, [isActive, mode]);

  const togglePlay = () => {
    const nextState = !isActive;
    setIsActive(nextState);
    if (nextState) {
      sound.playChime('pop');
      if (mode === 'infinity') {
        sound.playChime('breathIn');
      } else {
        if (squarePhase === 0) sound.playChime('breathIn');
        else if (squarePhase === 2) sound.playChime('breathOut');
      }
    }
  };

  const resetBreathing = () => {
    setIsActive(false);
    setSquarePhase(0);
    setSecondsLeft(4);
    setInfinityProgress(0);
    setInfinityPhase('in');
  };

  // Phases description for square breathing
  const squarePhases = [
    { title: 'BREATHE IN', label: 'Breathe in slowly through your nose...', color: '#62B6B7', bg: '#EFF9F9' },
    { title: 'HOLD', label: 'Hold softly and gently like a balloon...', color: '#EDD287', bg: '#FEF9E8' },
    { title: 'BREATHE OUT', label: 'Blow out gently through your mouth...', color: '#F1A990', bg: '#FEF0EB' },
    { title: 'PAUSE', label: 'Wait peacefully and let your body settle...', color: '#BCAADB', bg: '#F4F0FA' },
  ];

  // Calculate coordinates along Figure-8 Infinity loop
  // Parametric equations for lemniscate of Bernoulli
  const getInfinityPos = (t) => {
    // t goes from 0 to 1
    const angle = t * Math.PI * 2;
    // Scale and translate into 400x200 canvas space
    // x = a * cos(t) / (1 + sin^2(t))
    // y = a * sin(t) * cos(t) / (1 + sin^2(t))
    const scale = 140;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const denom = 1 + sin * sin;
    const x = 200 + (scale * cos) / denom;
    const y = 110 + (scale * sin * cos * 1.5) / denom;
    return { x, y };
  };

  const currentPos = getInfinityPos(infinityProgress);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title & Mode Switcher */}
      <div style={{
        background: '#ffffff',
        borderRadius: '28px',
        padding: '24px 20px',
        boxShadow: 'var(--shadow-soft)',
        border: '2px solid #e2ded7',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#557467',
          backgroundColor: '#e9f2ed',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} />
          Breathe With Me • Trace Along The Path
        </div>

        <h2 style={{
          fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#2e4338',
          letterSpacing: '-0.01em',
          margin: 0
        }}>
          GENTLE BREATHING GUIDES
        </h2>

        {/* Tab switch between Infinity and Square */}
        <div style={{
          display: 'flex',
          background: '#f2eee9',
          padding: '4px',
          borderRadius: '30px',
          gap: '4px'
        }}>
          <button
            onClick={() => {
              setMode('infinity');
              resetBreathing();
              sound.playChime('pop');
            }}
            style={{
              padding: '10px 22px',
              borderRadius: '24px',
              backgroundColor: mode === 'infinity' ? '#9bb7a5' : 'transparent',
              color: mode === 'infinity' ? '#ffffff' : '#576c61',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: mode === 'infinity' ? '0 4px 10px rgba(155, 183, 165, 0.4)' : 'none'
            }}
          >
            <span>🐢</span>
            <span>Infinity Breathing</span>
          </button>

          <button
            onClick={() => {
              setMode('square');
              resetBreathing();
              sound.playChime('pop');
            }}
            style={{
              padding: '10px 22px',
              borderRadius: '24px',
              backgroundColor: mode === 'square' ? '#f1a990' : 'transparent',
              color: mode === 'square' ? '#ffffff' : '#576c61',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: mode === 'square' ? '0 4px 10px rgba(241, 169, 144, 0.4)' : 'none'
            }}
          >
            <span>🐇</span>
            <span>Square Breathing</span>
          </button>
        </div>

        {/* Play/Pause controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
          <button
            onClick={togglePlay}
            className="calm-btn"
            style={{
              backgroundColor: isActive ? '#5b7065' : (mode === 'infinity' ? '#9bb7a5' : '#f1a990'),
              color: '#ffffff',
              padding: '12px 32px',
              fontSize: '1.1rem',
              gap: '10px'
            }}
          >
            {isActive ? <Pause size={20} fill="#ffffff" /> : <Play size={20} fill="#ffffff" />}
            <span>{isActive ? 'Pause Guide' : 'Start Breathing'}</span>
          </button>

          <button
            onClick={resetBreathing}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#f3efe9',
              border: '1px solid #d9d2c7',
              color: '#5b7065',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {cycleCount > 0 && (
          <div style={{
            fontSize: '0.9rem',
            color: '#496659',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Heart size={15} color="#e6a5af" fill="#e6a5af" />
            <span>You have completed <strong>{cycleCount}</strong> calming breath cycle{cycleCount > 1 ? 's' : ''}!</span>
          </div>
        )}
      </div>

      {/* Mode 1: INFINITY BREATHING (TURTLE) */}
      {mode === 'infinity' && (
        <div style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '30px 20px',
          border: '2px solid #dae7e0',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Phase Banner */}
          <div style={{
            backgroundColor: infinityPhase === 'in' ? '#e8f5f0' : '#fef2ed',
            color: infinityPhase === 'in' ? '#2e6b52' : '#a84c31',
            border: `2px solid ${infinityPhase === 'in' ? '#a5dac3' : '#f7c2b0'}`,
            padding: '10px 28px',
            borderRadius: '30px',
            fontSize: '1.35rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>{infinityPhase === 'in' ? '🌿 BREATHE IN (Fill your lungs)' : '💨 BREATHE OUT (Release softly)'}</span>
          </div>

          <p style={{ color: '#5f756b', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
            Trace along the path with your finger or follow the little turtle
          </p>

          {/* SVG Lemniscate Path with Interactive Turtle */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            aspectRatio: '2 / 1',
            margin: '0 auto',
            touchAction: 'none'
          }}>
            <svg
              viewBox="0 0 400 220"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9bb7a5" />
                  <stop offset="50%" stopColor="#78bebf" />
                  <stop offset="100%" stopColor="#f1a990" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#82b39f" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Background Path Track */}
              <path
                d="M 200,110 C 130,20 30,20 30,110 C 30,200 130,200 200,110 C 270,20 370,20 370,110 C 370,200 270,200 200,110 Z"
                fill="none"
                stroke="#d3e5dc"
                strokeWidth="38"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing active path line */}
              <path
                d="M 200,110 C 130,20 30,20 30,110 C 30,200 130,200 200,110 C 270,20 370,20 370,110 C 370,200 270,200 200,110 Z"
                fill="none"
                stroke="url(#infinityGrad)"
                strokeWidth="10"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />

              {/* Left loop text: Breathe In */}
              <text x="115" y="116" textAnchor="middle" fill="#365e4e" fontSize="16" fontWeight="800" fontFamily="var(--font-heading)">
                Breathe In
              </text>
              {/* Right loop text: Breathe Out */}
              <text x="285" y="116" textAnchor="middle" fill="#8c4732" fontSize="16" fontWeight="800" fontFamily="var(--font-heading)">
                Breathe Out
              </text>

              {/* Directions arrows */}
              <path d="M 125,50 L 105,50 M 115,44 L 105,50 L 115,56" stroke="#5d8b76" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 275,50 L 295,50 M 285,44 L 295,50 L 285,56" stroke="#b2634e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 105,170 L 125,170 M 115,164 L 125,170 L 115,176" stroke="#5d8b76" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 295,170 L 275,170 M 285,164 L 275,170 L 285,176" stroke="#b2634e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Center Rest Marker */}
              <circle cx="200" cy="110" r="16" fill="#e8f3ed" stroke="#9bb7a5" strokeWidth="3" />
              <text x="200" y="114" textAnchor="middle" fontSize="13" fill="#3a5a4a">🐢</text>

              {/* Moving Turtle / Guiding Orb */}
              <g transform={`translate(${currentPos.x}, ${currentPos.y})`} filter="url(#glow)">
                <circle cx="0" cy="0" r="22" fill="#ffffff" stroke={infinityPhase === 'in' ? '#5a9b7e' : '#e07a5f'} strokeWidth="3.5" />
                <text x="0" y="7" textAnchor="middle" fontSize="22">🐢</text>
              </g>
            </svg>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#f9f6f0',
            padding: '12px 20px',
            borderRadius: '16px',
            fontSize: '0.9rem',
            color: '#556b60'
          }}>
            <span>💡 <strong>Tip for Caregivers:</strong> Encourage the child to place their pointer finger directly onto the screen (or paper poster) and glide along with the turtle.</span>
          </div>
        </div>
      )}

      {/* Mode 2: SQUARE BREATHING (BUNNY) */}
      {mode === 'square' && (
        <div style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '30px 20px',
          border: '2px solid #f6ded5',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          {/* Phase Banner */}
          <div style={{
            backgroundColor: squarePhases[squarePhase].bg,
            border: `3px solid ${squarePhases[squarePhase].color}`,
            borderRadius: '30px',
            padding: '12px 32px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: squarePhases[squarePhase].color,
              letterSpacing: '0.04em'
            }}>
              {squarePhases[squarePhase].title} • {secondsLeft}s
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#56665e' }}>
              {squarePhases[squarePhase].label}
            </div>
          </div>

          {/* Interactive Square with Bunny */}
          <div style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px 0'
          }}>
            {/* The 4 outer edges */}
            {/* Left Edge: Breathe In */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '16px',
              borderRadius: '8px',
              backgroundColor: squarePhase === 0 ? '#62B6B7' : '#e6edea',
              boxShadow: squarePhase === 0 ? '0 0 16px rgba(98, 182, 183, 0.6)' : 'none',
              transition: 'all 0.3s ease'
            }} />
            <div style={{
              position: 'absolute',
              left: '-85px',
              top: '50%',
              transform: 'translateY(-50%) rotate(-90deg)',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: squarePhase === 0 ? '#388b8c' : '#889e93'
            }}>
              Breathe In ↑
            </div>

            {/* Top Edge: Hold */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '16px',
              borderRadius: '8px',
              backgroundColor: squarePhase === 1 ? '#EDD287' : '#e6edea',
              boxShadow: squarePhase === 1 ? '0 0 16px rgba(237, 210, 135, 0.6)' : 'none',
              transition: 'all 0.3s ease'
            }} />
            <div style={{
              position: 'absolute',
              top: '-30px',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: squarePhase === 1 ? '#b38e24' : '#889e93'
            }}>
              Hold →
            </div>

            {/* Right Edge: Breathe Out */}
            <div style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '16px',
              borderRadius: '8px',
              backgroundColor: squarePhase === 2 ? '#F1A990' : '#e6edea',
              boxShadow: squarePhase === 2 ? '0 0 16px rgba(241, 169, 144, 0.6)' : 'none',
              transition: 'all 0.3s ease'
            }} />
            <div style={{
              position: 'absolute',
              right: '-95px',
              top: '50%',
              transform: 'translateY(-50%) rotate(90deg)',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: squarePhase === 2 ? '#c75f3e' : '#889e93'
            }}>
              Breathe Out ↓
            </div>

            {/* Bottom Edge: Pause */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '16px',
              borderRadius: '8px',
              backgroundColor: squarePhase === 3 ? '#BCAADB' : '#e6edea',
              boxShadow: squarePhase === 3 ? '0 0 16px rgba(188, 170, 219, 0.6)' : 'none',
              transition: 'all 0.3s ease'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: squarePhase === 3 ? '#7a5fa8' : '#889e93'
            }}>
              ← Pause
            </div>

            {/* Center expanding circle with the Little Bunny */}
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: squarePhases[squarePhase].bg,
              border: `3px solid ${squarePhases[squarePhase].color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: squarePhase === 0
                ? `scale(${1 + (4 - secondsLeft) * 0.08})`
                : squarePhase === 2
                ? `scale(${1.32 - (4 - secondsLeft) * 0.08})`
                : squarePhase === 1
                ? 'scale(1.32)'
                : 'scale(1)',
              transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
            }}>
              <div style={{ fontSize: '3.5rem', lineHeight: 1 }} className="animate-float">
                🐇
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: squarePhases[squarePhase].color,
                marginTop: '4px'
              }}>
                {secondsLeft}s
              </span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#fef7f2',
            padding: '12px 20px',
            borderRadius: '16px',
            fontSize: '0.9rem',
            color: '#704f42'
          }}>
            <span>🐇 <strong>Bunny Breath:</strong> Inhale gently for 4, hold softly for 4, release slow like warm honey for 4, and rest for 4.</span>
          </div>
        </div>
      )}

    </div>
  );
}

