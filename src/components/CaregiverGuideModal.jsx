import React from 'react';
import { X, Heart, Shield, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CaregiverGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(30, 45, 38, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '32px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        border: '3px solid #d5ded8',
        padding: '32px 28px',
        position: 'relative',
        animation: 'fadeIn 0.25s ease'
      }}>
        {/* Close button */}
        <button
          onClick={() => {
            sound.playChime('pop');
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#f2eee9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#496054',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#e8f3ed',
            color: '#2e6b50',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}>
            <Heart size={14} fill="#2e6b50" />
            Adult & Caregiver Guide
          </div>

          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#2f4338',
            margin: '0 0 6px 0'
          }}>
            THE CALM CORNER
          </h2>
          <p style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#557467',
            margin: 0
          }}>
            "Co-regulation begins with your calm."
          </p>
        </div>

        {/* 3 Core Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Principle 1 */}
          <div style={{
            background: '#EFF7F2',
            border: '2.5px solid #84B896',
            borderRadius: '22px',
            padding: '20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#346d4a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2d6342', margin: '0 0 4px 0' }}>
                REGULATE YOURSELF FIRST
              </h3>
              <p style={{ fontSize: '0.98rem', color: '#405e4e', margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
                <strong>Your calm is contagious.</strong> Children mirror our nervous systems. When their dysregulation triggers you, take a slow, deep breath and drop your shoulders before responding.
              </p>
            </div>
          </div>

          {/* Principle 2 */}
          <div style={{
            background: '#EFF7FC',
            border: '2.5px solid #8ab7d8',
            borderRadius: '22px',
            padding: '20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#346d96',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              flexShrink: 0
            }}>
              2
            </div>
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2a5b7d', margin: '0 0 8px 0' }}>
                WHAT TO SAY
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#3d5c70', marginBottom: '10px', fontWeight: 500 }}>
                Keep your voice soft, low, and quiet. Three comforting phrases that heal:
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '8px 14px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #8ab7d8',
                  color: '#2a5b7d',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}>
                  💬 "I am here with you."
                </span>
                <span style={{
                  padding: '8px 14px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #f1a990',
                  color: '#9e462d',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}>
                  🧡 "It is okay to feel upset."
                </span>
                <span style={{
                  padding: '8px 14px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e6a5af',
                  color: '#8b3846',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}>
                  🛡️ "You are safe."
                </span>
              </div>
            </div>
          </div>

          {/* Principle 3 */}
          <div style={{
            background: '#F4F0FA',
            border: '2.5px solid #bcaadb',
            borderRadius: '22px',
            padding: '20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#654f8b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#564077', margin: '0 0 4px 0' }}>
                GUIDE, NEVER FORCE
              </h3>
              <p style={{ fontSize: '0.98rem', color: '#55426f', margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
                Use this calming space to <strong>connect</strong>, never as a timeout, isolation, or punishment. Invite the child: <em>"Would you like to sit together in our calm corner?"</em>
              </p>
            </div>
          </div>

        </div>

        {/* Quick Tips List */}
        <div style={{
          marginTop: '22px',
          background: '#faf8f5',
          borderRadius: '20px',
          padding: '18px 20px',
          border: '1px solid #e5ded5'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#32473c', fontWeight: 700 }}>
            🌿 Tips for setting up your physical Calm Corner:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.92rem', color: '#52685c', lineHeight: 1.6 }}>
            <li>Place a cozy floor mat, floor cushions, or a small pop-up tent in a quiet nook.</li>
            <li>Display the 5 calming posters at the child’s eye level.</li>
            <li>Include sensory items: plush teddy bear, glitter jar, stress ball, and noise-muffling headphones.</li>
            <li>Practice these breathing exercises together when everyone is calm, not just during meltdowns!</li>
          </ul>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={() => {
              sound.playChime('pop');
              onClose();
            }}
            className="calm-btn"
            style={{
              backgroundColor: '#344e41',
              color: '#ffffff',
              padding: '12px 36px'
            }}
          >
            I Understand & Love This
          </button>
        </div>

      </div>
    </div>
  );
}

