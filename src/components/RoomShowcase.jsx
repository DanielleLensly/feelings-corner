import React, { useState } from 'react';
import { Eye, Sparkles, Info, X } from 'lucide-react';

const WALL_SIGNS = [
  {
    id: 'feelings',
    title: 'How Am I Feeling Right Now?',
    role: 'Emotional Awareness & Identification',
    description: 'An interactive check-in station where children identify what is happening in their body and name their emotions without judgment.',
    src: '/assets/posters/how am i feeling full.png',
    frameSize: { width: '170px', height: '235px' },
    position: { top: '10%', left: '40%' },
    step: 'Step 1'
  },
  {
    id: 'breathe',
    title: 'Breathe With Me',
    role: 'Somatic Breath Regulation',
    description: 'Tactile finger-tracing paths for Infinity and Square breathing, calming the central nervous system within minutes.',
    src: '/assets/posters/breathe with me.jpg',
    frameSize: { width: '145px', height: '205px' },
    position: { top: '12%', left: '16%' },
    step: 'Step 2'
  },
  {
    id: 'toolbox',
    title: 'My Calm Down Toolbox',
    role: 'Physical Grounding & Energy Release',
    description: 'Four quick sensory body resets (wall push-ups, smelling flowers, deep hugs, and water) to release pent-up tension safely.',
    src: '/assets/posters/calm down toolbox.jpg',
    frameSize: { width: '145px', height: '205px' },
    position: { top: '12%', left: '68%' },
    step: 'Step 3'
  },
  {
    id: 'ground',
    title: 'Find Your Ground',
    role: '5-4-3-2-1 Sensory Reset',
    description: 'Engages sight, touch, sound, and smell to interrupt fight-or-flight cycles and anchor attention in the present moment.',
    src: '/assets/posters/find your ground.jpg',
    frameSize: { width: '140px', height: '195px' },
    position: { top: '48%', left: '24%' },
    step: 'Step 4'
  },
  {
    id: 'needs',
    title: 'What Do I Need Right Now?',
    role: 'Advocacy & Co-Regulation',
    description: 'Simple visual prompts enabling children to ask for a hug, quiet space, a listener, or movement before meltdowns escalate.',
    src: '/assets/posters/what do i need.jpg',
    frameSize: { width: '140px', height: '195px' },
    position: { top: '48%', left: '56%' },
    step: 'Step 5'
  },
];

export default function RoomShowcase() {
  const [activeSign, setActiveSign] = useState(null);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Room Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '620px',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(50, 70, 60, 0.15)',
        border: '4px solid #ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#FAF6F0'
      }}>
        
        {/* Wall Background & Subtle Lighting */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '120px',
          background: 'linear-gradient(180deg, #EBE3D7 0%, #EDE6DB 75%, #E3D9CC 100%)',
          zIndex: 1
        }}>
          {/* Subtle Wall Texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(0,0,0,0.03) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Warm Ambient Lamp Glow in Top Left Corner */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '5%',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 238, 195, 0.55) 0%, rgba(255, 238, 195, 0) 70%)',
            pointerEvents: 'none',
            filter: 'blur(20px)'
          }} />

          {/* Boho Felt Ball Garland across the top wall */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40px', zIndex: 3, pointerEvents: 'none' }}>
            <path d="M 0,10 Q 250,30 550,15 T 1100,10" fill="none" stroke="#D3C7B6" strokeWidth="1.5" strokeDasharray="4 4" />
            {[40, 110, 180, 260, 340, 420, 500, 580, 660, 740, 820, 900, 980, 1050].map((cx, i) => {
              const colors = ['#9bb7a5', '#edd287', '#f1a990', '#bcaadb', '#e6a5af'];
              const cy = 10 + Math.sin(i * 0.5) * 8;
              return <circle key={i} cx={cx} cy={cy} r="6.5" fill={colors[i % colors.length]} opacity="0.9" />;
            })}
          </svg>
        </div>

        {/* The 5 Framed Signs on the Wall */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          minHeight: '500px',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '40px 20px 20px 20px',
          boxSizing: 'border-box'
        }}>
          {WALL_SIGNS.map((sign) => {
            const isSelected = activeSign && activeSign.id === sign.id;

            return (
              <div
                key={sign.id}
                onClick={() => setActiveSign(sign)}
                style={{
                  width: 'clamp(140px, 17vw, 175px)',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isSelected ? 'scale(1.08) translateY(-6px)' : 'scale(1)',
                  zIndex: isSelected ? 10 : 5,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {/* Hanging Nail & Cord */}
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#8C7765',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  marginBottom: '4px'
                }} />

                {/* Natural Wood Picture Frame */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1 / 1.42',
                  backgroundColor: '#D7BC9F',
                  backgroundImage: 'linear-gradient(135deg, #DECCA6 0%, #CDB18B 50%, #BFA17A 100%)',
                  borderRadius: '6px',
                  padding: '7px',
                  boxShadow: isSelected
                    ? '0 16px 36px rgba(45, 60, 50, 0.35), 0 0 0 3px #84B896'
                    : '0 10px 24px rgba(70, 60, 45, 0.22), 0 2px 6px rgba(0,0,0,0.1)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box'
                }}>
                  {/* Inner White Mat Board */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FDFCFA',
                    padding: '6px',
                    borderRadius: '3px',
                    boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {/* The Poster Artwork (Slightly protected with protective overlay so it doesn't give raw file away) */}
                    <img
                      src={sign.src}
                      alt={sign.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        pointerEvents: 'none',
                        userSelect: 'none'
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                    />

                    {/* Subtle Glass Reflection Glare */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Watermark/Shield to preserve IP */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none'
                    }} />
                  </div>
                </div>

                {/* Little Wall Caption Plaque */}
                <div style={{
                  marginTop: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid #D6CCBD',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  width: '90%'
                }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#84B896', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {sign.step}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3A4D42', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {sign.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floor Section: Skirting Board & Natural Wooden Floor */}
        <div style={{
          position: 'relative',
          height: '140px',
          width: '100%',
          zIndex: 6,
          background: 'linear-gradient(180deg, #D4B995 0%, #C4A782 50%, #B89973 100%)',
          boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }}>
          {/* Baseboard Skirting */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '16px',
            backgroundColor: '#FAF5ED',
            borderBottom: '2px solid #C5B8A8',
            boxShadow: '0 4px 6px rgba(0,0,0,0.08)'
          }} />

          {/* Wooden Floor Planks */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(0,0,0,0.04) 120px, rgba(0,0,0,0.04) 122px)',
            opacity: 0.7
          }} />

          {/* Cozy Round Woven Rug */}
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(90%, 540px)',
            height: '115px',
            borderRadius: '50%',
            backgroundColor: '#F5EFE6',
            border: '4px dashed #D6C8B5',
            boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Inner Rug Ring */}
            <div style={{
              width: '75%',
              height: '75%',
              borderRadius: '50%',
              border: '2px dotted #C7B8A2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8C7E6C',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Cozy Calming Mat
            </div>
          </div>

          {/* Floor Items: Plant on left */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.15))'
          }}>
            <span style={{ fontSize: '3.2rem', lineHeight: 0.9 }}>🪴</span>
          </div>

          {/* Floor Items: Cozy Floor Cushions & Teddy Bear on Right */}
          <div style={{
            position: 'absolute',
            bottom: '14px',
            right: '40px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '6px',
            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.15))'
          }}>
            {/* Cushion stack */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '42px', height: '14px', backgroundColor: '#e6a5af', borderRadius: '12px', marginBottom: '-4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
              <div style={{ width: '54px', height: '16px', backgroundColor: '#9bb7a5', borderRadius: '12px', marginBottom: '-4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
              <div style={{ width: '66px', height: '18px', backgroundColor: '#edd287', borderRadius: '14px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
            </div>
            {/* Teddy bear */}
            <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>🧸</span>
          </div>

        </div>

      </div>

      {/* Floating Info Banner Prompt */}
      <div style={{
        marginTop: '16px',
        textAlign: 'center',
        color: '#657E72',
        fontSize: '0.92rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}>
        <Sparkles size={16} color="#84B896" />
        <span>Click on any sign on the wall to learn what purpose it serves in the calming corner</span>
      </div>

      {/* Sign Purpose Drawer/Modal (Explains the role without giving away raw printable files) */}
      {activeSign && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(25, 38, 30, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            maxWidth: '520px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
            border: '3px solid #D9E4DD',
            position: 'relative',
            animation: 'fadeIn 0.25s ease'
          }}>
            <button
              onClick={() => setActiveSign(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#F3EFE9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4B6255',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{
              display: 'inline-block',
              backgroundColor: '#EFF7F2',
              color: '#346D4A',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              {activeSign.step} of 5
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2C4035', margin: '0 0 6px 0' }}>
              {activeSign.title}
            </h3>

            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#84B896', marginBottom: '14px' }}>
              🎯 Purpose: {activeSign.role}
            </div>

            <p style={{ fontSize: '0.98rem', color: '#4D6156', lineHeight: 1.55, margin: '0 0 20px 0' }}>
              {activeSign.description}
            </p>

            <div style={{
              background: '#FAF6F0',
              padding: '14px 16px',
              borderRadius: '16px',
              border: '1px solid #E6DED4',
              fontSize: '0.85rem',
              color: '#63756C'
            }}>
              ✨ <em>Printed on heavy premium cardstock with protective matte finish — designed for real hands to trace, touch, and reference during moments of emotional dysregulation.</em>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setActiveSign(null)}
                className="calm-btn"
                style={{
                  backgroundColor: '#344E41',
                  color: '#ffffff',
                  padding: '10px 24px',
                  fontSize: '0.9rem'
                }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
