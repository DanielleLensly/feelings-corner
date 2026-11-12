import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Moon, Activity, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

const NEEDS = [
  {
    id: 'hug',
    title: 'A BIG HUG',
    subtitle: 'Hold me please',
    icon: '🤗',
    color: '#D87C8C',
    bg: '#FDF0F2',
    border: '#E89AA7',
    description: 'I need safe touch, a tight squeeze, or someone to sit close to me without words.',
    actionAdvice: 'Find your caregiver, a loving friend, or wrap yourself tightly in a cozy blanket like a warm burrito.'
  },
  {
    id: 'quiet',
    title: 'QUIET TIME',
    subtitle: 'Give me some space',
    icon: '⛺',
    color: '#B38E24',
    bg: '#FEF9E8',
    border: '#EDD287',
    description: 'Too much noise or too many things are happening. I need low lights, soft cushions, and silence.',
    actionAdvice: 'Step into your cozy corner tent, put on soft headphones, or close your eyes for 2 peaceful minutes.'
  },
  {
    id: 'talk',
    title: 'TALK IT OUT',
    subtitle: 'Listen to my story',
    icon: '💬',
    color: '#4B8877',
    bg: '#EEF7F2',
    border: '#84B896',
    description: 'I have big thoughts trapped inside my head and I want someone kind to hear me.',
    actionAdvice: 'Tell your adult: "Can you just listen while I tell you how I feel?" Or whisper your story to a stuffed animal.'
  },
  {
    id: 'move',
    title: 'MOVE MY BODY',
    subtitle: 'Dance, run, or stretch',
    icon: '👟',
    color: '#CD684D',
    bg: '#FEF0EB',
    border: '#F1A990',
    description: 'I have bouncy, jittery energy trapped in my arms and legs that needs to get out safely.',
    actionAdvice: 'Do 5 big frog jumps, stretch tall like a giraffe, shake your hands out, or dance to one silly song.'
  }
];

export default function WhatDoINeed({ onAwardBadge }) {
  const [selectedNeed, setSelectedNeed] = useState(null);

  const handleSelect = (need) => {
    setSelectedNeed(need);
    sound.playChime('bell');
    if (onAwardBadge) {
      onAwardBadge('I Talked About It');
    }
  };

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
          backgroundColor: '#f4f0fa',
          color: '#7e64a8',
          fontSize: '0.85rem',
          fontWeight: 700,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} />
          Needs & Communication
        </div>

        <h2 style={{
          fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#2e4338',
          margin: '0 0 8px 0'
        }}>
          WHAT DO I NEED RIGHT NOW?
        </h2>
        <p style={{ color: '#627c6f', fontSize: '1.05rem', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>
          Point to what will help your heart feel better. It is always safe and okay to ask for what you need.
        </p>

        {selectedNeed && (
          <div style={{
            marginTop: '20px',
            backgroundColor: selectedNeed.bg,
            border: `3px solid ${selectedNeed.border}`,
            borderRadius: '22px',
            padding: '20px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{selectedNeed.icon}</div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: selectedNeed.color }}>
                You chose: {selectedNeed.title} ("{selectedNeed.subtitle}")
              </div>
              <p style={{ color: '#384d43', fontSize: '0.96rem', fontWeight: 500, margin: '6px 0 10px 0' }}>
                {selectedNeed.description}
              </p>
              <div style={{
                background: '#ffffff',
                padding: '10px 14px',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#344e41',
                fontSize: '0.88rem',
                fontWeight: 600
              }}>
                <Heart size={14} color={selectedNeed.color} fill={selectedNeed.color} />
                <span><strong>Try this:</strong> {selectedNeed.actionAdvice}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4 Need Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {NEEDS.map((need) => {
          const isChosen = selectedNeed && selectedNeed.id === need.id;
          return (
            <button
              key={need.id}
              onClick={() => handleSelect(need)}
              style={{
                background: isChosen ? need.bg : '#ffffff',
                borderRadius: '26px',
                border: isChosen ? `3.5px solid ${need.border}` : '2.5px solid #e5ded4',
                padding: '28px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '14px',
                cursor: 'pointer',
                boxShadow: isChosen ? '0 10px 24px rgba(0,0,0,0.08)' : 'var(--shadow-card)',
                transform: isChosen ? 'scale(1.02)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: need.bg,
                border: `2px solid ${need.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }} className={isChosen ? 'animate-float' : ''}>
                {need.icon}
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: need.color,
                  margin: '0 0 4px 0'
                }}>
                  {need.title}
                </h3>
                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#496054',
                  display: 'block'
                }}>
                  "{need.subtitle}"
                </span>
              </div>

              <div style={{
                fontSize: '0.86rem',
                color: '#657e72',
                fontWeight: 500,
                lineHeight: 1.35
              }}>
                {need.description}
              </div>

              <span style={{
                marginTop: 'auto',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: need.color,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {isChosen ? '✓ Selected' : 'Point to this →'}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}

