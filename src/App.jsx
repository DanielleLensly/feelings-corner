import React, { useState } from 'react';
import { Heart, Sparkles, Shield, CheckCircle, Package, ArrowRight, MessageSquare, Star, Palette } from 'lucide-react';
import RoomShowcase from './components/RoomShowcase';
import InquiryModal from './components/InquiryModal';
import Logo from './components/Logo';
import TextColorizerTool from './components/TextColorizerTool';

export default function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [showColorizer, setShowColorizer] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF7F2' }}>
      
      {/* Simple, Elegant Header */}
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxSizing: 'border-box'
      }}>
        <Logo size={52} showText={true} allowDownload={true} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowColorizer(!showColorizer)}
            style={{
              padding: '9px 18px',
              borderRadius: '24px',
              backgroundColor: showColorizer ? '#FAF6F0' : '#ffffff',
              border: showColorizer ? '2px solid #344E41' : '1.5px solid #D6CCBE',
              color: '#344E41',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease'
            }}
          >
            <Palette size={16} color="#85CBA8" />
            <span>{showColorizer ? 'Hide Title Colorizer' : '🎨 Title Colorizer Tool'}</span>
          </button>

          <button
            onClick={() => setInquiryOpen(true)}
            className="calm-btn"
            style={{
              backgroundColor: '#344E41',
              color: '#ffffff',
              fontSize: '0.9rem',
              padding: '10px 22px'
            }}
          >
            <span>Inquire / Pre-Order</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '10px 20px 40px 20px',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#E8F1EB',
          color: '#2E6B50',
          padding: '6px 18px',
          borderRadius: '24px',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '16px'
        }}>
          <Sparkles size={14} />
          Transform Any Nook Into A Peaceful Sanctuary
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          color: '#283B31',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          maxWidth: '840px',
          margin: '0 auto 16px auto'
        }}>
          A Gentle, Visual Calming Space For Big Feelings
        </h1>

        <p style={{
          fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
          color: '#556E61',
          maxWidth: '720px',
          margin: '0 auto 36px auto',
          lineHeight: 1.55,
          fontWeight: 500
        }}>
          Help children pause, identify emotions, and find their calm before meltdowns happen. A complete evidence-informed room kit designed for homes, classrooms, and therapy spaces.
        </p>

        {/* The Realistic Room with the Signs on the Wall */}
        <div style={{ marginBottom: '40px' }}>
          <RoomShowcase />
        </div>

        {/* Artwork Title Colorizer Tool */}
        {showColorizer && (
          <div style={{ margin: '30px 0 50px 0', animation: 'fadeIn 0.3s ease' }}>
            <TextColorizerTool onClose={() => setShowColorizer(false)} />
          </div>
        )}
      </section>

      {/* Product Overview: What Is The Calming Corner? */}
      <section style={{
        backgroundColor: '#ffffff',
        borderTop: '2px solid #EBE5DB',
        borderBottom: '2px solid #EBE5DB',
        padding: '60px 20px'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#FEF9E8',
              color: '#8C701F',
              fontSize: '0.82rem',
              fontWeight: 800,
              padding: '4px 14px',
              borderRadius: '16px',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Why It Works
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#2C4035', margin: '0 0 12px 0' }}>
              Designed For Real Connection, Not Timeouts
            </h2>
            <p style={{ color: '#5B7266', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.5 }}>
              When a child is dysregulated, words are hard to process. The Calming Corner replaces shouting and isolation with gentle visual cues and somatic reset exercises.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}>
            <div style={{
              background: '#FAF6F0',
              borderRadius: '24px',
              padding: '30px 24px',
              border: '2px solid #E6DED4',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: '#EFF7F2',
                color: '#346D4A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem'
              }}>
                👁️
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2B3F34', margin: 0 }}>
                Non-Verbal & Tactile
              </h3>
              <p style={{ color: '#52665B', fontSize: '0.96rem', lineHeight: 1.5, margin: 0 }}>
                Children trace finger-paths directly on the posters. Even when non-verbal or overwhelmed, they can point to what they need or how they feel.
              </p>
            </div>

            <div style={{
              background: '#FAF6F0',
              borderRadius: '24px',
              padding: '30px 24px',
              border: '2px solid #E6DED4',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: '#EFF7FC',
                color: '#346D96',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem'
              }}>
                🧠
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2B3F34', margin: 0 }}>
                Nervous System Co-Regulation
              </h3>
              <p style={{ color: '#52665B', fontSize: '0.96rem', lineHeight: 1.5, margin: 0 }}>
                Rooted in polyvagal theory and sensory integration: combines slow breathwork, 5-4-3-2-1 grounding, and somatic body resistance exercises.
              </p>
            </div>

            <div style={{
              background: '#FAF6F0',
              borderRadius: '24px',
              padding: '30px 24px',
              border: '2px solid #E6DED4',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: '#FDF0F2',
                color: '#9E4655',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem'
              }}>
                🌿
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2B3F34', margin: 0 }}>
                Soft, Calming Aesthetics
              </h3>
              <p style={{ color: '#52665B', fontSize: '0.96rem', lineHeight: 1.5, margin: 0 }}>
                Original gentle watercolor illustrations with earthy pastel tones designed to reduce visual overstimulation in nurseries, bedrooms, and modern classrooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's In The Complete Box */}
      <section style={{ padding: '60px 20px', maxWidth: '1080px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#EFF7F2',
            color: '#346D4A',
            fontSize: '0.82rem',
            fontWeight: 800,
            padding: '4px 14px',
            borderRadius: '16px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            <Package size={14} />
            The Physical Kit
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#2C4035', margin: '0 0 10px 0' }}>
            What’s Included in the Kit
          </h2>
          <p style={{ color: '#5B7266', fontSize: '1.02rem', margin: 0 }}>
            Everything you need to set up a turnkey calming space in minutes.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '2px solid #E3DCD1',
            boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>🖼️</div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D4136', margin: '0 0 6px 0' }}>
              5 Core Art Prints
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#5A7063', margin: 0, lineHeight: 1.45 }}>
              Full color, high-durability matte prints designed for wall hanging at children's eye-level.
            </p>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '2px solid #E3DCD1',
            boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>🏷️</div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D4136', margin: '0 0 6px 0' }}>
              Feelings Badges
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#5A7063', margin: 0, lineHeight: 1.45 }}>
              Interchangeable emotional expression badges that children can physically place on the check-in board.
            </p>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '2px solid #E3DCD1',
            boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>📖</div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D4136', margin: '0 0 6px 0' }}>
              Caregiver Manual
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#5A7063', margin: 0, lineHeight: 1.45 }}>
              Adult co-regulation guide with exact verbal scripts, calm down guidance, and space setup tips.
            </p>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '2px solid #E3DCD1',
            boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>⭐</div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2D4136', margin: '0 0 6px 0' }}>
              Milestone Sticker Sheet
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#5A7063', margin: 0, lineHeight: 1.45 }}>
              Collectible regulation stickers to celebrate milestones (*I Paused*, *I Took A Breath*, *Body Is Calm*).
            </p>
          </div>
        </div>
      </section>

      {/* Pre-order / Market CTA */}
      <section style={{
        maxWidth: '920px',
        margin: '0 auto 60px auto',
        width: 'calc(100% - 40px)',
        backgroundColor: '#344E41',
        borderRadius: '32px',
        padding: '48px 32px',
        textAlign: 'center',
        color: '#ffffff',
        boxShadow: '0 16px 40px rgba(52, 78, 65, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#B9DEC9',
          marginBottom: '10px'
        }}>
          Now Accepting Inquiries & Market Orders
        </div>

        <h3 style={{
          fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
          fontWeight: 800,
          margin: '0 0 14px 0',
          lineHeight: 1.2
        }}>
          Bring The Calming Corner to Your Family or Classroom
        </h3>

        <p style={{
          fontSize: '1.05rem',
          color: '#D4E8DC',
          maxWidth: '600px',
          margin: '0 auto 28px auto',
          lineHeight: 1.5
        }}>
          Get in touch for upcoming Christmas market availability, physical kit deliveries, or custom school packages.
        </p>

        <button
          onClick={() => setInquiryOpen(true)}
          className="calm-btn"
          style={{
            backgroundColor: '#EDD287',
            color: '#3E310F',
            padding: '14px 36px',
            fontSize: '1.05rem',
            fontWeight: 800
          }}
        >
          <span>Get Product Details & Pricing</span>
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        backgroundColor: '#FAF5ED',
        borderTop: '1px solid #E5DFD5',
        padding: '24px 20px',
        textAlign: 'center',
        fontSize: '0.88rem',
        color: '#6F8479',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <Logo size={28} showText={false} />
          <span><strong>Calming Corner</strong> • Thoughtfully designed for emotional regulation and gentle co-regulation.</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', fontSize: '0.82rem', marginTop: '4px' }}>
          <a href="/assets/calming-corner-logo.svg" target="_blank" rel="noopener noreferrer" style={{ color: '#593E7C', fontWeight: 700, textDecoration: 'none' }}>
            🖨️ Printable Logo Badge (Vector SVG)
          </a>
          <span style={{ color: '#C0B7A8' }}>•</span>
          <a href="/assets/calming-corner-logo-horizontal.svg" target="_blank" rel="noopener noreferrer" style={{ color: '#235A42', fontWeight: 700, textDecoration: 'none' }}>
            🖨️ Horizontal Print Banner (Vector SVG)
          </a>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#91A59A', marginTop: '2px' }}>
          All rights reserved © 2026.
        </div>
      </footer>

    </div>
  );
}
