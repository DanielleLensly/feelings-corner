import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', interest: 'home', notes: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
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
        borderRadius: '30px',
        maxWidth: '520px',
        width: '100%',
        padding: '32px 28px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        border: '3px solid #D9E4DD',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
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

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#EFF7F2',
              color: '#346D4A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 16px auto',
              border: '3px solid #84B896'
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2C4035', margin: '0 0 8px 0' }}>
              Thank You!
            </h3>
            <p style={{ color: '#566E61', fontSize: '0.98rem', lineHeight: 1.5, margin: '0 0 24px 0' }}>
              We’ve received your inquiry for the <strong>Calming Corner Kit</strong>. We will be in touch with pricing, market dates, and ordering details.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="calm-btn"
              style={{ backgroundColor: '#344E41', color: '#ffffff', padding: '10px 28px' }}
            >
              Back to Preview
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#EFF7F2',
              color: '#346D4A',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              <Sparkles size={13} />
              Kit Pre-Orders & Inquiries
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2C4035', margin: '0 0 6px 0' }}>
              Bring Calm to Your Space
            </h3>
            <p style={{ color: '#5A7063', fontSize: '0.92rem', margin: '0 0 20px 0', lineHeight: 1.45 }}>
              Available for direct orders, local markets, and classroom bulk packs. Leave your details below and we will contact you.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475C51', marginBottom: '4px' }}>
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid #D5CEC2',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475C51', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid #D5CEC2',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475C51', marginBottom: '4px' }}>
                  Where will you use the Calming Corner?
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid #D5CEC2',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="home">At Home (Parents & Caregivers)</option>
                  <option value="classroom">Classroom / School Nook</option>
                  <option value="clinic">Therapy Clinic / Counseling Office</option>
                  <option value="market">Market Pick-Up / Christmas Market</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475C51', marginBottom: '4px' }}>
                  Notes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any questions or specific set sizes?"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid #D5CEC2',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                className="calm-btn"
                style={{
                  backgroundColor: '#344E41',
                  color: '#ffffff',
                  padding: '12px',
                  fontSize: '1rem',
                  marginTop: '6px'
                }}
              >
                <Send size={16} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

