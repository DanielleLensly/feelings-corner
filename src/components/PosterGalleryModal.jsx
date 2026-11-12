import React, { useState } from 'react';
import { X, ExternalLink, Printer, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

const POSTERS = [
  {
    title: 'Breathe With Me',
    subtitle: 'Infinity & Square Breathing Paths',
    src: '/assets/posters/breathe with me.jpg',
    color: '#84B896'
  },
  {
    title: 'My Calm Down Toolbox',
    subtitle: 'Sensory and Somatic Body Exercises',
    src: '/assets/posters/calm down toolbox.jpg',
    color: '#EDD287'
  },
  {
    title: 'Find Your Ground',
    subtitle: '5-4-3-2-1 Senses Grounding',
    src: '/assets/posters/find your ground.jpg',
    color: '#8ab7d8'
  },
  {
    title: 'What Do I Need Right Now?',
    subtitle: 'Expressive Heart Needs Chart',
    src: '/assets/posters/what do i need.jpg',
    color: '#f1a990'
  },
  {
    title: 'Caregiver Guide: The Calm Corner',
    subtitle: 'Co-regulation & Adult Connection Guide',
    src: '/assets/posters/caregiver guide.jpg',
    color: '#bcaadb'
  },
];

export default function PosterGalleryModal({ isOpen, onClose }) {
  const [selectedPoster, setSelectedPoster] = useState(POSTERS[0]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(28, 42, 35, 0.7)',
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
        maxWidth: '1000px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        border: '3px solid #d5ded8',
        padding: '28px',
        position: 'relative',
        animation: 'fadeIn 0.25s ease'
      }}>
        {/* Close Button */}
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
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#eaf3fb',
            color: '#346d96',
            fontSize: '0.82rem',
            fontWeight: 700,
            padding: '5px 14px',
            borderRadius: '20px',
            marginBottom: '6px',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={13} />
            Original Watercolor Printables
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2b3f34', margin: 0 }}>
            Calm Corner Poster Collection
          </h2>
          <p style={{ color: '#687e73', fontSize: '0.95rem', margin: '4px 0 0 0' }}>
            High resolution posters ready to display in your home, classroom, or therapy room.
          </p>
        </div>

        {/* Thumbnail Selector */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '20px',
          justifyContent: 'flex-start'
        }}>
          {POSTERS.map((poster) => {
            const isSelected = selectedPoster.title === poster.title;
            return (
              <button
                key={poster.title}
                onClick={() => {
                  setSelectedPoster(poster);
                  sound.playChime('pop');
                }}
                style={{
                  flex: '0 0 auto',
                  padding: '8px 14px',
                  borderRadius: '16px',
                  backgroundColor: isSelected ? '#344e41' : '#f4f0ea',
                  color: isSelected ? '#ffffff' : '#495a51',
                  border: isSelected ? '2px solid #344e41' : '1.5px solid #ded6ca',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {poster.title}
              </button>
            );
          })}
        </div>

        {/* Main Preview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div style={{
            background: '#faf8f5',
            borderRadius: '24px',
            padding: '16px',
            border: '2px solid #e5dfd6',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img
              src={selectedPoster.src}
              alt={selectedPoster.title}
              style={{
                maxWidth: '100%',
                maxHeight: '520px',
                objectFit: 'contain',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2f4338', margin: '0 0 6px 0' }}>
                {selectedPoster.title}
              </h3>
              <p style={{ fontSize: '1rem', color: '#576c60', fontWeight: 600, margin: 0 }}>
                {selectedPoster.subtitle}
              </p>
            </div>

            <div style={{
              background: '#f4f8f5',
              padding: '16px',
              borderRadius: '18px',
              border: '1.5px solid #dae7e0',
              fontSize: '0.92rem',
              color: '#415a4c',
              lineHeight: 1.5
            }}>
              💡 <strong>Display Tip:</strong> Print on heavy matte cardstock or laminate for long-lasting durability. Hang at a child's seated eye level so they can trace the diagrams with their fingers anytime.
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={selectedPoster.src}
                target="_blank"
                rel="noopener noreferrer"
                className="calm-btn"
                style={{
                  backgroundColor: '#344e41',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  padding: '10px 20px',
                  textDecoration: 'none'
                }}
              >
                <ExternalLink size={16} />
                <span>Open Full Size</span>
              </a>

              <button
                onClick={() => {
                  const printWin = window.open(selectedPoster.src);
                  if (printWin) {
                    printWin.focus();
                    printWin.print();
                  }
                }}
                className="calm-btn"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#344e41',
                  border: '2px solid #344e41',
                  fontSize: '0.92rem',
                  padding: '10px 20px'
                }}
              >
                <Printer size={16} />
                <span>Print Poster</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

