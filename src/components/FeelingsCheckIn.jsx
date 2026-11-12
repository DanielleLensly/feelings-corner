import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

const EMOTIONS = [
  {
    id: 'happy',
    name: 'HAPPY',
    color: '#F9D859',
    bgColor: '#FFFBEA',
    borderColor: '#E8C53C',
    image: '/assets/faces/happy.png',
    faceOnly: '/assets/faces/2happy.png',
    phrase: 'I feel sunny, joyful, and glad.',
    coping: 'Celebrate your good feeling! Share a smile or draw something you love.',
    actionTab: 'stickers',
    actionText: 'Collect a Calm Badge'
  },
  {
    id: 'sad',
    name: 'SAD',
    color: '#6AAFE6',
    bgColor: '#EFF7FC',
    borderColor: '#549ED9',
    image: '/assets/faces/sad.png',
    faceOnly: '/assets/faces/2sad.png',
    phrase: 'I have big, heavy tears or a quiet heart.',
    coping: 'It is okay to feel sad. You do not have to smile right now. Would a soft hug or cozy blanket feel good?',
    actionTab: 'needs',
    actionText: 'Ask for What You Need'
  },
  {
    id: 'silly',
    name: 'SILLY',
    color: '#B68FD0',
    bgColor: '#F7F2FA',
    borderColor: '#9E72BE',
    image: '/assets/faces/silly.png',
    faceOnly: '/assets/faces/2silly.png',
    phrase: 'I feel goofy, giggly, and full of wiggles.',
    coping: 'Enjoy the laughs! Try making a funny face in the mirror or doing a gentle wiggle dance.',
    actionTab: 'toolbox',
    actionText: 'Try Body Movement'
  },
  {
    id: 'tired',
    name: 'TIRED',
    color: '#62B6B7',
    bgColor: '#EFF9F9',
    borderColor: '#4A9E9F',
    image: '/assets/faces/tired.png',
    faceOnly: '/assets/faces/2tired.png',
    phrase: 'My eyes feel heavy and my energy is low.',
    coping: 'Your body is asking for rest. Take a slow sip of water or rest your head on a soft cushion.',
    actionTab: 'breathe',
    actionText: 'Do Slow Turtle Breathing'
  },
  {
    id: 'worried',
    name: 'WORRIED',
    color: '#E89AA7',
    bgColor: '#FDF2F4',
    borderColor: '#D87C8C',
    image: '/assets/faces/worried.png',
    faceOnly: '/assets/faces/2worried.png',
    phrase: 'Butterflies in my tummy, or wondering what will happen.',
    coping: 'Place your hand softly on your chest. Repeat quietly: "I am safe. I am loved. Right here, right now."',
    actionTab: 'ground',
    actionText: 'Find Your Ground (5-4-3-2-1)'
  },
  {
    id: 'angry',
    name: 'ANGRY',
    color: '#E86663',
    bgColor: '#FDF0F0',
    borderColor: '#D64E4B',
    image: '/assets/faces/angry.png',
    faceOnly: '/assets/faces/2angry.png',
    phrase: 'My muscles feel tight, hot, or stormy inside.',
    coping: 'Anger is a normal feeling. Let out that fiery energy safely: do 5 wall push-ups or squeeze a pillow tight.',
    actionTab: 'toolbox',
    actionText: 'Calm Down Toolbox'
  },
  {
    id: 'calm',
    name: 'CALM',
    color: '#84B896',
    bgColor: '#EEF7F2',
    borderColor: '#6AA37E',
    image: '/assets/faces/calm.png',
    faceOnly: '/assets/faces/2calm.png',
    phrase: 'My body feels soft, quiet, and peaceful.',
    coping: 'Wonderful! Notice how your breath is gentle. You did great checking in with your feelings.',
    actionTab: 'stickers',
    actionText: 'Claim "Body is Calm" Badge'
  },
  {
    id: 'excited',
    name: 'EXCITED',
    color: '#F49B55',
    bgColor: '#FEF5EE',
    borderColor: '#DD7F33',
    image: '/assets/faces/excited.png',
    faceOnly: '/assets/faces/2excited.png',
    phrase: 'Bouncy energy, sparkly eyes, and ready to go!',
    coping: 'Excitement is wonderful! Take one deep breath so your body stays in charge of all that sparkle.',
    actionTab: 'breathe',
    actionText: 'Square Breathing with Bunny'
  },
];

export default function FeelingsCheckIn({ onNavigateTab, onSelectEmotion, currentEmotion }) {
  const [selected, setSelected] = useState(currentEmotion || null);

  const handlePick = (emotion) => {
    setSelected(emotion);
    if (onSelectEmotion) {
      onSelectEmotion(emotion);
    }
    sound.playChime('bell');
  };

  const clearSelection = () => {
    setSelected(null);
    sound.playChime('pop');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Upper Check-in Box modeled after 'how am i feeling full.png' */}
      <div style={{
        background: '#ffffff',
        borderRadius: '28px',
        padding: '32px 24px',
        border: '3px dashed #d5ded8',
        boxShadow: '0 8px 30px rgba(50, 70, 60, 0.05)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#52796f',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          backgroundColor: '#e8f1eb',
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '10px'
        }}>
          Emotional Check-In
        </div>

        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
          fontWeight: 700,
          color: '#2f3e46',
          marginBottom: '8px'
        }}>
          HOW AM I FEELING RIGHT NOW?
        </h2>
        <p style={{ color: '#687e74', fontSize: '1.05rem', fontWeight: 500, marginBottom: '24px' }}>
          Tap the face below that matches what is happening inside your heart or body.
        </p>

        {/* Selected target frame */}
        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          background: selected ? selected.bgColor : '#faf8f5',
          borderRadius: '24px',
          border: selected ? `3px solid ${selected.borderColor}` : '2px dashed #b5c7bd',
          padding: '24px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          minHeight: '190px',
          justifyContent: 'center'
        }}>
          {selected ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <img
                  src={selected.faceOnly}
                  alt={selected.name}
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.1))',
                    animation: 'float 3s ease-in-out infinite'
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: selected.borderColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    Today I feel {selected.name}!
                  </div>
                  <p style={{ color: '#455a4f', fontSize: '0.98rem', fontWeight: 600, marginTop: '2px', maxWidth: '300px' }}>
                    {selected.phrase}
                  </p>
                </div>
              </div>

              {/* Coping suggestion box */}
              <div style={{
                background: '#ffffff',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
                width: '100%',
                textAlign: 'left'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#657e72',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  <Heart size={14} color={selected.borderColor} fill={selected.borderColor} />
                  Gentle Tip for Right Now:
                </div>
                <p style={{ fontSize: '0.95rem', color: '#33483f', lineHeight: 1.45, fontWeight: 500 }}>
                  {selected.coping}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onNavigateTab(selected.actionTab)}
                  className="calm-btn"
                  style={{
                    backgroundColor: selected.borderColor,
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    padding: '10px 20px',
                    flex: '1 1 auto',
                    maxWidth: '260px'
                  }}
                >
                  <span>{selected.actionText}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={clearSelection}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '24px',
                    border: '1px solid #d4cdc3',
                    background: '#ffffff',
                    color: '#66776f',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={13} />
                  <span>Choose Another</span>
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: '16px', color: '#7a8d83' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                border: '2px dashed #b5c7bd',
                margin: '0 auto 12px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.7rem'
              }}>
                ?
              </div>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#445b50', marginBottom: '4px' }}>
                Today I feel...
              </p>
              <p style={{ fontSize: '0.9rem', color: '#7e9389' }}>
                Click any feelings card below to place it here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grid of 8 Emotion Cards */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '0 4px'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#35483f' }}>
            Choose Your Feeling:
          </h3>
          <span style={{ fontSize: '0.9rem', color: '#6d8377', fontWeight: 500 }}>
            All feelings are welcome here
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '16px'
        }}>
          {EMOTIONS.map((emotion) => {
            const isChosen = selected && selected.id === emotion.id;
            return (
              <button
                key={emotion.id}
                onClick={() => handlePick(emotion)}
                style={{
                  background: isChosen ? emotion.bgColor : '#ffffff',
                  borderRadius: '24px',
                  border: isChosen ? `3px solid ${emotion.borderColor}` : '2px solid #e7dfd4',
                  boxShadow: isChosen
                    ? `0 10px 24px rgba(0,0,0,0.08), 0 0 0 4px ${emotion.bgColor}`
                    : '0 4px 14px rgba(0,0,0,0.03)',
                  padding: '18px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transform: isChosen ? 'scale(1.03) translateY(-3px)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isChosen) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = emotion.borderColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isChosen) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = '#e7dfd4';
                  }
                }}
              >
                <div style={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '20px',
                  backgroundColor: emotion.bgColor,
                  padding: '8px'
                }}>
                  <img
                    src={emotion.image}
                    alt={emotion.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                <div>
                  <span style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: emotion.borderColor,
                    display: 'block'
                  }}>
                    {emotion.name}
                  </span>
                  <span style={{
                    fontSize: '0.78rem',
                    color: '#657e72',
                    fontWeight: 600,
                    lineHeight: 1.2
                  }}>
                    {emotion.id === 'angry' ? 'Fiery energy' :
                     emotion.id === 'sad' ? 'Gentle tears' :
                     emotion.id === 'happy' ? 'Sunny smiles' :
                     emotion.id === 'worried' ? 'Fluttery heart' :
                     emotion.id === 'calm' ? 'Peaceful & still' :
                     emotion.id === 'silly' ? 'Wiggles & laughs' :
                     emotion.id === 'tired' ? 'Needs rest' : 'Bright & bouncy'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

