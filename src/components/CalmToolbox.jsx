import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Check, Play, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CalmToolbox({ onAwardBadge }) {
  // Active tool detail modal or state
  const [activeTool, setActiveTool] = useState(null);

  // Tool 1: Smell & Blow state: 'flower' -> 'candle' -> 'blown'
  const [smellState, setSmellState] = useState('flower');

  // Tool 2: Wall push-up count: 0 -> 5
  const [pushSeconds, setPushSeconds] = useState(0);
  const [pushTimerActive, setPushTimerActive] = useState(false);

  // Tool 3: Tight squeeze duration
  const [squeezeLevel, setSqueezeLevel] = useState(0);
  const [isSqueezing, setIsSqueezing] = useState(false);

  // Tool 4: Sip of water count: 0 -> 3
  const [waterSips, setWaterSips] = useState(0);

  // Pushup timer effect
  useEffect(() => {
    let t;
    if (pushTimerActive && pushSeconds < 5) {
      t = setTimeout(() => {
        setPushSeconds((s) => {
          const next = s + 1;
          sound.playChime('pop');
          if (next === 5) {
            setPushTimerActive(false);
            sound.playChime('bell');
            if (onAwardBadge) onAwardBadge('Body Is Calm');
          }
          return next;
        });
      }, 1000);
    }
    return () => clearTimeout(t);
  }, [pushTimerActive, pushSeconds, onAwardBadge]);

  // Squeeze hold effect
  useEffect(() => {
    let interval;
    if (isSqueezing && squeezeLevel < 100) {
      interval = setInterval(() => {
        setSqueezeLevel((lvl) => {
          const next = Math.min(100, lvl + 8);
          if (next >= 100) {
            sound.playChime('bell');
            if (onAwardBadge) onAwardBadge('I Am Safe');
          }
          return next;
        });
      }, 100);
    } else if (!isSqueezing && squeezeLevel > 0 && squeezeLevel < 100) {
      interval = setInterval(() => {
        setSqueezeLevel((lvl) => Math.max(0, lvl - 15));
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isSqueezing, squeezeLevel, onAwardBadge]);

  const handleSip = () => {
    if (waterSips < 3) {
      const next = waterSips + 1;
      setWaterSips(next);
      sound.playChime('soft');
      if (next === 3) {
        sound.playChime('bell');
        if (onAwardBadge) onAwardBadge('I Paused');
      }
    } else {
      setWaterSips(0);
      sound.playChime('pop');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: '28px',
        padding: '28px 24px',
        boxShadow: 'var(--shadow-soft)',
        border: '2px solid #e3dfd7',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#fef0eb',
          color: '#c25838',
          fontSize: '0.85rem',
          fontWeight: 700,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} />
          Somatic Regulation • Try With Your Body
        </div>

        <h2 style={{
          fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#2e4338',
          margin: '0 0 8px 0'
        }}>
          MY CALM DOWN TOOLBOX
        </h2>
        <p style={{ color: '#627c6f', fontSize: '1.05rem', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>
          When emotions feel too big inside, pick one simple thing to try with your body right now.
        </p>
      </div>

      {/* Grid of the 4 Body Tools */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Tool 1: Smell & Blow */}
        <div style={{
          background: '#EFF7FC',
          borderRadius: '26px',
          border: '3px solid #8ab7d8',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#346d96',
            letterSpacing: '0.02em'
          }}>
            SMELL & BLOW
          </div>

          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.6rem',
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease'
          }}>
            {smellState === 'flower' && <span className="animate-pulse-gentle">🌸</span>}
            {smellState === 'candle' && <span className="animate-float">🕯️</span>}
            {smellState === 'blown' && <span>💨</span>}
          </div>

          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#31556e', margin: 0 }}>
            {smellState === 'flower' && '1. Smell the flower (slow deep sniff)'}
            {smellState === 'candle' && '2. Now blow out the candle flame!'}
            {smellState === 'blown' && 'You blew it out gently! Ahhh...'}
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            {smellState === 'flower' && (
              <button
                onClick={() => {
                  sound.playChime('breathIn');
                  setSmellState('candle');
                }}
                className="calm-btn"
                style={{ backgroundColor: '#8ab7d8', color: '#ffffff', fontSize: '0.9rem', padding: '10px 20px' }}
              >
                <span>Sniff Flower 🌸</span>
              </button>
            )}

            {smellState === 'candle' && (
              <button
                onClick={() => {
                  sound.playChime('breathOut');
                  setSmellState('blown');
                  if (onAwardBadge) onAwardBadge('I Took A Breath');
                }}
                className="calm-btn"
                style={{ backgroundColor: '#e07a5f', color: '#ffffff', fontSize: '0.9rem', padding: '10px 20px' }}
              >
                <span>Blow Candle 🕯️</span>
              </button>
            )}

            {smellState === 'blown' && (
              <button
                onClick={() => {
                  sound.playChime('pop');
                  setSmellState('flower');
                }}
                className="calm-btn"
                style={{ backgroundColor: '#84B896', color: '#ffffff', fontSize: '0.9rem', padding: '10px 20px' }}
              >
                <span>Try Again 🌸</span>
              </button>
            )}
          </div>
        </div>

        {/* Tool 2: Wall Push-ups */}
        <div style={{
          background: '#FEF9E8',
          borderRadius: '26px',
          border: '3px solid #edd287',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#8c701f',
            letterSpacing: '0.02em'
          }}>
            WALL PUSH-UPS
          </div>

          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
          }}>
            <span>🧗</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#8c701f' }}>
              {pushSeconds > 0 ? `${pushSeconds} / 5` : '5 sec'}
            </span>
          </div>

          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#685116', margin: 0 }}>
            Put hands flat on a wall, push hard and count to 5!
          </p>

          <button
            onClick={() => {
              setPushSeconds(0);
              setPushTimerActive(true);
              sound.playChime('pop');
            }}
            disabled={pushTimerActive}
            className="calm-btn"
            style={{
              backgroundColor: pushTimerActive ? '#cca747' : '#edd287',
              color: '#49370b',
              fontSize: '0.9rem',
              padding: '10px 24px'
            }}
          >
            {pushTimerActive ? `Pushing... (${pushSeconds}s)` : (pushSeconds === 5 ? 'Done! Push Again' : 'Start 5s Push')}
          </button>
        </div>

        {/* Tool 3: Tight Squeeze */}
        <div style={{
          background: '#FDF0F2',
          borderRadius: '26px',
          border: '3px solid #e6a5af',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#9e4655',
            letterSpacing: '0.02em'
          }}>
            TIGHT SQUEEZE
          </div>

          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.6rem',
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            transform: `scale(${1 + squeezeLevel * 0.002})`
          }}>
            <span>🧸</span>
          </div>

          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#7a313e', margin: 0 }}>
            Give a big, tight hug to yourself, a teddy bear, or a pillow.
          </p>

          <button
            onMouseDown={() => { setIsSqueezing(true); sound.playChime('soft'); }}
            onMouseUp={() => setIsSqueezing(false)}
            onTouchStart={() => { setIsSqueezing(true); sound.playChime('soft'); }}
            onTouchEnd={() => setIsSqueezing(false)}
            className="calm-btn"
            style={{
              backgroundColor: '#e6a5af',
              color: '#ffffff',
              fontSize: '0.9rem',
              padding: '10px 24px',
              userSelect: 'none'
            }}
          >
            <span>{squeezeLevel >= 100 ? 'Big Warm Hug! ❤️' : (isSqueezing ? `Hugging... ${squeezeLevel}%` : 'Press & Hold to Squeeze')}</span>
          </button>
        </div>

        {/* Tool 4: Sip of Water */}
        <div style={{
          background: '#EEF7F2',
          borderRadius: '26px',
          border: '3px solid #84B896',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#346d4a',
            letterSpacing: '0.02em'
          }}>
            SIP OF WATER
          </div>

          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.2rem',
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            position: 'relative'
          }}>
            <span>🥛</span>
            <div style={{
              display: 'flex',
              gap: '6px',
              position: 'absolute',
              bottom: '10px'
            }}>
              {[1, 2, 3].map((sip) => (
                <div
                  key={sip}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: waterSips >= sip ? '#62B6B7' : '#d8e5df',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>

          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#2f5b40', margin: 0 }}>
            Take 3 slow, cool sips. Feel the fresh coolness trickle down.
          </p>

          <button
            onClick={handleSip}
            className="calm-btn"
            style={{
              backgroundColor: '#84B896',
              color: '#ffffff',
              fontSize: '0.9rem',
              padding: '10px 24px'
            }}
          >
            <span>{waterSips === 3 ? 'Refreshed! Reset' : `Take Sip ${waterSips + 1} of 3`}</span>
          </button>
        </div>

      </div>

    </div>
  );
}

