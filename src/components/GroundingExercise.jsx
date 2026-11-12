import React, { useState } from 'react';
import { Eye, Hand, Volume2, Sparkles, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

const GROUNDING_STEPS = [
  {
    step: 5,
    title: '5 THINGS I SEE',
    subtitle: 'Look around the room slowly. What catches your eyes?',
    icon: '👀',
    color: '#6AAFE6',
    bgColor: '#EFF7FC',
    borderColor: '#4A92CC',
    items: ['A color I like', 'Something round', 'A soft cushion', 'Light from window', 'A tiny detail on the wall']
  },
  {
    step: 4,
    title: '4 THINGS I TOUCH',
    subtitle: 'Feel the floor, your shirt, hair, or a favorite toy.',
    icon: '🖐️',
    color: '#84B896',
    bgColor: '#EFF7F2',
    borderColor: '#609B74',
    items: ['The cozy floor beneath me', 'The fabric of my clothes', 'My smooth fingernails', 'A soft or fuzzy toy']
  },
  {
    step: 3,
    title: '3 THINGS I HEAR',
    subtitle: 'Close your eyes. Listen for quiet sounds nearby or far away.',
    icon: '👂',
    color: '#EDD287',
    bgColor: '#FEF9E8',
    borderColor: '#CBB058',
    items: ['My own gentle breathing', 'A hum of the house or room', 'A sound from outside']
  },
  {
    step: 2,
    title: '2 THINGS I SMELL',
    subtitle: 'Sniff your sleeve, a flower, a book, or fresh air.',
    icon: '👃',
    color: '#F1A990',
    bgColor: '#FEF0EB',
    borderColor: '#D88467',
    items: ['Fresh clean air', 'The scent on my cozy sleeve']
  },
  {
    step: 1,
    title: '1 THING I LOVE',
    subtitle: 'Think of someone, a pet, or something that makes your heart warm.',
    icon: '❤️',
    color: '#E6A5AF',
    bgColor: '#FDF0F2',
    borderColor: '#C77583',
    items: ['Someone who loves me or a happy memory']
  }
];

export default function GroundingExercise({ onAwardBadge }) {
  // Track checked items: key `${stepIndex}-${itemIndex}`
  const [checkedItems, setCheckedItems] = useState({});
  const [completed, setCompleted] = useState(false);

  const totalItems = GROUNDING_STEPS.reduce((acc, s) => acc + s.items.length, 0); // 15
  const checkedCount = Object.keys(checkedItems).length;
  const progressPercent = Math.round((checkedCount / totalItems) * 100);

  const toggleCheck = (stepIdx, itemIdx) => {
    const key = `${stepIdx}-${itemIdx}`;
    const next = { ...checkedItems };
    if (next[key]) {
      delete next[key];
      sound.playChime('pop');
    } else {
      next[key] = true;
      sound.playChime('soft');
    }
    setCheckedItems(next);

    const newCount = Object.keys(next).length;
    if (newCount === totalItems && !completed) {
      setCompleted(true);
      sound.playChime('bell');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9bb7a5', '#edd287', '#f1a990', '#bcaadb', '#e6a5af']
        });
      } catch {}
      if (onAwardBadge) {
        onAwardBadge('I Took A Breath');
      }
    }
  };

  const handleReset = () => {
    setCheckedItems({});
    setCompleted(false);
    sound.playChime('pop');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
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
          backgroundColor: '#eaf3fb',
          color: '#3f78a8',
          fontSize: '0.85rem',
          fontWeight: 700,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} />
          5-4-3-2-1 Sensory Grounding
        </div>

        <h2 style={{
          fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#2e4338',
          margin: '0 0 8px 0'
        }}>
          FIND YOUR GROUND
        </h2>
        <p style={{ color: '#60796d', fontSize: '1.05rem', fontWeight: 600, maxWidth: '600px', margin: '0 auto 20px auto' }}>
          When your brain feels stormy, use your senses to bring your body gently back to the here and now.
        </p>

        {/* Progress bar */}
        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          background: '#f2eee9',
          borderRadius: '20px',
          padding: '4px',
          position: 'relative'
        }}>
          <div style={{
            height: '16px',
            borderRadius: '16px',
            backgroundColor: '#84B896',
            width: `${progressPercent}%`,
            transition: 'width 0.4s ease'
          }} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '10px',
          fontSize: '0.9rem',
          color: '#556c60',
          fontWeight: 600
        }}>
          <span>{checkedCount} of {totalItems} senses explored ({progressPercent}%)</span>
          {checkedCount > 0 && (
            <button
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#8b5a51',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '12px',
                background: '#fdf1ec'
              }}
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>

        {completed && (
          <div style={{
            marginTop: '16px',
            backgroundColor: '#eef8f2',
            border: '2px solid #84B896',
            borderRadius: '20px',
            padding: '14px 20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: '#2d6341',
            fontWeight: 700
          }}>
            <span style={{ fontSize: '1.5rem' }}>🌟</span>
            <span>You grounded your whole body! Your senses helped calm your stormy feelings.</span>
          </div>
        )}
      </div>

      {/* 5-4-3-2-1 Sensory Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {GROUNDING_STEPS.map((stepData, stepIdx) => {
          const stepDone = stepData.items.every((_, i) => checkedItems[`${stepIdx}-${i}`]);

          return (
            <div
              key={stepData.step}
              style={{
                background: stepData.bgColor,
                borderRadius: '24px',
                border: `2.5px solid ${stepDone ? stepData.borderColor : '#d8d4cb'}`,
                padding: '20px 22px',
                boxShadow: stepDone ? '0 8px 24px rgba(0,0,0,0.06)' : 'var(--shadow-card)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: `3px solid ${stepData.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: stepData.borderColor
                  }}>
                    {stepData.step}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: stepData.borderColor,
                      margin: 0,
                      letterSpacing: '0.02em'
                    }}>
                      {stepData.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#52665b', fontWeight: 600, margin: 0 }}>
                      {stepData.subtitle}
                    </p>
                  </div>
                </div>

                <div style={{
                  fontSize: '1.8rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}>
                  {stepData.icon}
                </div>
              </div>

              {/* Items checklist */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '10px'
              }}>
                {stepData.items.map((item, itemIdx) => {
                  const isChecked = !!checkedItems[`${stepIdx}-${itemIdx}`];
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => toggleCheck(stepIdx, itemIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '16px',
                        backgroundColor: isChecked ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                        border: isChecked ? `2px solid ${stepData.borderColor}` : '1.5px solid rgba(0,0,0,0.06)',
                        color: isChecked ? stepData.borderColor : '#43584d',
                        fontWeight: isChecked ? 700 : 600,
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transform: isChecked ? 'scale(1.01)' : 'none',
                        transition: 'all 0.2s ease',
                        boxShadow: isChecked ? '0 4px 10px rgba(0,0,0,0.04)' : 'none'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: `2px solid ${isChecked ? stepData.borderColor : '#9eaba2'}`,
                        backgroundColor: isChecked ? stepData.borderColor : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 900,
                        flexShrink: 0
                      }}>
                        {isChecked && '✓'}
                      </div>
                      <span style={{ textDecoration: isChecked ? 'line-through' : 'none', opacity: isChecked ? 0.9 : 1 }}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

