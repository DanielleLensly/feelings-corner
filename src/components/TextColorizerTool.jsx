import React, { useState, useRef } from 'react';
import { Type, Download, Copy, Check, Sparkles, RefreshCw, Sliders, Palette, Image as ImageIcon } from 'lucide-react';
import { sound } from '../utils/audio';

const PALETTES = [
  {
    id: 'emotions',
    name: '8 Emotion Rainbow (Style Guide)',
    description: 'Happy yellow, sad blue, silly violet, tired teal, worried rose, angry red, calm sage, excited apricot',
    colors: ['#F9D859', '#6AAFE6', '#B68FD0', '#62B6B7', '#E89AA7', '#E86663', '#84B896', '#F49B55']
  },
  {
    id: 'poster-original',
    name: 'Original Poster Palette (Breathe With Me)',
    description: 'Warm coral, sunshine yellow, sage green, sky blue, soft lilac, and tender rose',
    colors: ['#F1A990', '#EDD287', '#9BB7A5', '#8AB7D8', '#BCAADB', '#E6A5AF']
  },
  {
    id: 'duo',
    name: 'Brand Co-Regulation Duo',
    description: 'Alternating Hug Purple and Talk-It-Out Mint Green',
    colors: ['#B8A2D8', '#85CBA8']
  },
  {
    id: 'soft-pastels',
    name: 'Muted Earthy Nursery Pastels',
    description: 'Clay, terracotta, olive sage, wheat, dusty rose, and slate blue',
    colors: ['#E09F8F', '#C48A7A', '#94A89A', '#D8C69E', '#D9A5B3', '#89A4B8']
  }
];

const FONTS = [
  { id: 'Fredoka', name: 'Fredoka (Poster Titles)', family: "'Fredoka', sans-serif" },
  { id: 'Quicksand', name: 'Quicksand (Rounded Clean)', family: "'Quicksand', sans-serif" },
  { id: 'Patrick Hand', name: 'Patrick Hand (Handwritten)', family: "'Patrick Hand', cursive" },
  { id: 'Short Stack', name: 'Short Stack (Casual Print)', family: "'Short Stack', cursive" },
];

const PRESETS = [
  'HAPPY',
  'BREATHE WITH ME',
  'HOW AM I FEELING?',
  'MY CALM DOWN TOOLBOX',
  'FIND YOUR GROUND',
  'WHAT DO I NEED RIGHT NOW?',
  'CALMING CORNER',
  'YOU ARE SAFE AND LOVED'
];

export default function TextColorizerTool({ onClose }) {
  const [text, setText] = useState('HAPPY');
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [fontSize, setFontSize] = useState(64);
  const [letterSpacing, setLetterSpacing] = useState(4);
  const [textTransform, setTextTransform] = useState('uppercase'); // 'uppercase', 'none', 'lowercase'
  const [fontWeight, setFontWeight] = useState(700);
  const [bgMode, setBgMode] = useState('cream'); // 'cream', 'white', 'dark', 'transparent'
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedColors, setCopiedColors] = useState(false);
  const previewRef = useRef(null);

  // Transform the display text
  const getProcessedText = () => {
    if (textTransform === 'uppercase') return text.toUpperCase();
    if (textTransform === 'lowercase') return text.toLowerCase();
    return text;
  };

  const processedText = getProcessedText();

  // Color each character in sequence (spaces preserve layout without consuming colors)
  let colorIndex = 0;
  const coloredCharacters = Array.from(processedText).map((char, index) => {
    if (char === ' ') {
      return { char: ' ', color: 'transparent', isSpace: true };
    }
    if (char === '\n') {
      return { char: '\n', color: 'transparent', isNewline: true };
    }
    const color = selectedPalette.colors[colorIndex % selectedPalette.colors.length];
    colorIndex++;
    return { char, color, isSpace: false };
  });

  // Generate clean HTML snippet
  const generateHtmlCode = () => {
    return coloredCharacters.map((c) => {
      if (c.isSpace) return ' ';
      if (c.isNewline) return '<br/>';
      return `<span style="color: ${c.color}; font-family: ${selectedFont.family}; font-weight: ${fontWeight};">${c.char}</span>`;
    }).join('');
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(generateHtmlCode());
    setCopiedHtml(true);
    sound.playChime('pop');
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const copyColorsList = () => {
    navigator.clipboard.writeText(selectedPalette.colors.join(' '));
    setCopiedColors(true);
    sound.playChime('pop');
    setTimeout(() => setCopiedColors(false), 2000);
  };

  // Download scalable vector SVG
  const downloadSvg = () => {
    sound.playChime('bell');
    // Calculate estimated dimensions
    const width = Math.max(600, processedText.length * (fontSize * 0.7 + letterSpacing) + 100);
    const height = fontSize * 2.2 + 80;

    let currentX = 50;
    const y = height / 2 + fontSize * 0.35;

    const svgSpans = coloredCharacters.map((item) => {
      if (item.isSpace) {
        currentX += fontSize * 0.45;
        return '';
      }
      const charXml = `<text x="${currentX}" y="${y}" fill="${item.color}" font-family="${selectedFont.id}, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}">${item.char}</text>`;
      currentX += fontSize * 0.65 + letterSpacing;
      return charXml;
    }).join('\n  ');

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${currentX + 50} ${height}" width="${currentX + 50}" height="${height}">
  ${bgMode === 'cream' ? `<rect width="100%" height="100%" fill="#FAF6F0"/>` : bgMode === 'dark' ? `<rect width="100%" height="100%" fill="#2F3E46"/>` : bgMode === 'white' ? `<rect width="100%" height="100%" fill="#FFFFFF"/>` : ''}
  ${svgSpans}
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${processedText.slice(0, 15).replace(/[^a-z0-9]/gi, '_').toLowerCase()}_colored.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download high-resolution PNG using HTML5 Canvas
  const downloadPng = () => {
    sound.playChime('bell');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 2; // 2x Retina resolution

    // Measure total width
    ctx.font = `${fontWeight} ${fontSize}px ${selectedFont.id}, sans-serif`;
    let totalWidth = 0;
    coloredCharacters.forEach((item) => {
      if (item.isSpace) {
        totalWidth += fontSize * 0.4;
      } else {
        totalWidth += ctx.measureText(item.char).width + letterSpacing;
      }
    });

    const padX = 60;
    const padY = 50;
    canvas.width = (totalWidth + padX * 2) * scale;
    canvas.height = (fontSize * 1.8 + padY * 2) * scale;
    ctx.scale(scale, scale);

    // Background
    if (bgMode === 'cream') {
      ctx.fillStyle = '#FAF6F0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (bgMode === 'white') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (bgMode === 'dark') {
      ctx.fillStyle = '#2F3E46';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.font = `${fontWeight} ${fontSize}px ${selectedFont.id}, sans-serif`;
    ctx.textBaseline = 'middle';

    let curX = padX;
    const curY = padY + (fontSize * 0.9);

    coloredCharacters.forEach((item) => {
      if (item.isSpace) {
        curX += fontSize * 0.4;
      } else {
        ctx.fillStyle = item.color;
        ctx.fillText(item.char, curX, curY);
        curX += ctx.measureText(item.char).width + letterSpacing;
      }
    });

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${processedText.slice(0, 15).replace(/[^a-z0-9]/gi, '_').toLowerCase()}_colored.png`;
    link.click();
  };

  const bgStyles = {
    cream: { background: '#FAF6F0', color: '#2F3E46' },
    white: { background: '#FFFFFF', color: '#2F3E46' },
    dark: { background: '#2F3E46', color: '#FAF6F0' },
    transparent: {
      backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)',
      backgroundSize: '16px 16px',
      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
      color: '#2F3E46'
    }
  };

  return (
    <div style={{
      maxWidth: '1080px',
      margin: '0 auto',
      background: '#ffffff',
      borderRadius: '28px',
      padding: '32px 28px',
      border: '2px solid #E3DCD1',
      boxShadow: '0 16px 40px rgba(50,70,60,0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#EFF7FC',
          color: '#346D96',
          fontSize: '0.82rem',
          fontWeight: 800,
          padding: '4px 14px',
          borderRadius: '16px',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          <Palette size={14} />
          Artwork & Poster Title Generator
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#2F4338', margin: '0 0 6px 0' }}>
          Letter-by-Letter Colorizer
        </h2>
        <p style={{ color: '#687E73', fontSize: '0.96rem', margin: 0 }}>
          Type any word or title — it automatically colors each letter in order using the official style guide palette.
        </p>
      </div>

      {/* Live Visual Canvas Preview */}
      <div style={{
        borderRadius: '24px',
        padding: '40px 24px',
        minHeight: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #E5DFD5',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.03)',
        overflowX: 'auto',
        textAlign: 'center',
        transition: 'all 0.25s ease',
        ...bgStyles[bgMode]
      }}>
        <div
          ref={previewRef}
          style={{
            fontFamily: selectedFont.family,
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            letterSpacing: `${letterSpacing}px`,
            lineHeight: 1.25,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            userSelect: 'all'
          }}
        >
          {coloredCharacters.map((item, idx) => (
            <span
              key={idx}
              style={{
                color: item.color,
                display: 'inline-block',
                transition: 'color 0.2s ease, transform 0.15s ease'
              }}
            >
              {item.char}
            </span>
          ))}
        </div>
      </div>

      {/* Input Field & Preset Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#35483F' }}>
            Your Text / Title:
          </label>
          <span style={{ fontSize: '0.8rem', color: '#788C81' }}>
            {processedText.length} character{processedText.length !== 1 ? 's' : ''}
          </span>
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type any word or phrase..."
          style={{
            width: '100%',
            padding: '14px 18px',
            borderRadius: '16px',
            border: '2px solid #D5CEC2',
            fontSize: '1.2rem',
            fontFamily: selectedFont.family,
            fontWeight: 700,
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#FAF8F5'
          }}
        />

        {/* Quick Presets */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setText(p);
                sound.playChime('pop');
              }}
              style={{
                flex: '0 0 auto',
                padding: '6px 12px',
                borderRadius: '12px',
                backgroundColor: text.toUpperCase() === p ? '#344E41' : '#F2EEE9',
                color: text.toUpperCase() === p ? '#ffffff' : '#495A51',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Palette Selector */}
      <div>
        <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#35483F', marginBottom: '10px' }}>
          Color Sequence Palette:
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '12px'
        }}>
          {PALETTES.map((pal) => {
            const isSelected = selectedPalette.id === pal.id;
            return (
              <button
                key={pal.id}
                onClick={() => {
                  setSelectedPalette(pal);
                  sound.playChime('pop');
                }}
                style={{
                  background: isSelected ? '#FAF6F0' : '#ffffff',
                  border: isSelected ? '2.5px solid #344E41' : '1.5px solid #E2DCD2',
                  borderRadius: '16px',
                  padding: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: isSelected ? '0 4px 12px rgba(52,78,65,0.1)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: isSelected ? '#344E41' : '#455A4F' }}>
                  {pal.name}
                </div>

                {/* Color swatches in order */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {pal.colors.map((c, i) => (
                    <div
                      key={i}
                      title={`${c}`}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: c,
                        border: '1px solid rgba(0,0,0,0.12)'
                      }}
                    />
                  ))}
                </div>

                <div style={{ fontSize: '0.75rem', color: '#6F8479', lineHeight: 1.3 }}>
                  {pal.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Typography & Layout Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        background: '#FAF8F5',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid #E7E0D6'
      }}>
        {/* Font Family */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#3D5247', marginBottom: '6px' }}>
            Font Family
          </label>
          <select
            value={selectedFont.id}
            onChange={(e) => {
              const f = FONTS.find((x) => x.id === e.target.value);
              if (f) setSelectedFont(f);
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '12px',
              border: '1.5px solid #D5CEC2',
              fontSize: '0.9rem',
              fontWeight: 600,
              backgroundColor: '#ffffff'
            }}
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        {/* Text Case */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#3D5247', marginBottom: '6px' }}>
            Letter Case
          </label>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['uppercase', 'none', 'lowercase'].map((mode) => (
              <button
                key={mode}
                onClick={() => setTextTransform(mode)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: textTransform === mode ? '#344E41' : '#ffffff',
                  color: textTransform === mode ? '#ffffff' : '#495A51',
                  border: '1px solid #D5CEC2',
                  cursor: 'pointer'
                }}
              >
                {mode === 'uppercase' ? 'CAPS' : mode === 'none' ? 'As Typed' : 'lower'}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#3D5247' }}>
              Size: {fontSize}px
            </label>
          </div>
          <input
            type="range"
            min="28"
            max="110"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#344E41' }}
          />
        </div>

        {/* Letter Spacing Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#3D5247' }}>
              Spacing: {letterSpacing}px
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#344E41' }}
          />
        </div>

        {/* Canvas Background Color */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#3D5247', marginBottom: '6px' }}>
            Preview Canvas
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'cream', label: 'Paper' },
              { id: 'white', label: 'White' },
              { id: 'dark', label: 'Dark' },
              { id: 'transparent', label: 'Grid' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setBgMode(b.id)}
                style={{
                  flex: 1,
                  padding: '7px 4px',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor: bgMode === b.id ? '#344E41' : '#ffffff',
                  color: bgMode === b.id ? '#ffffff' : '#495A51',
                  border: '1px solid #D5CEC2',
                  cursor: 'pointer'
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Export & Copy Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderTop: '2px solid #F0EAE1',
        paddingTop: '20px'
      }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={downloadSvg}
            className="calm-btn"
            style={{
              backgroundColor: '#344E41',
              color: '#ffffff',
              fontSize: '0.92rem',
              padding: '10px 20px',
              gap: '6px'
            }}
          >
            <Download size={16} />
            <span>Download Vector SVG</span>
          </button>

          <button
            onClick={downloadPng}
            className="calm-btn"
            style={{
              backgroundColor: '#85CBA8',
              color: '#1A4D35',
              fontSize: '0.92rem',
              padding: '10px 20px',
              gap: '6px'
            }}
          >
            <ImageIcon size={16} />
            <span>Download 300 DPI PNG</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={copyHtml}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #D5CEC2',
              color: '#344E41',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {copiedHtml ? <Check size={14} color="#2A6148" /> : <Copy size={14} />}
            <span>{copiedHtml ? 'Copied HTML!' : 'Copy HTML'}</span>
          </button>

          <button
            onClick={copyColorsList}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #D5CEC2',
              color: '#593E7C',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {copiedColors ? <Check size={14} color="#593E7C" /> : <Copy size={14} />}
            <span>{copiedColors ? 'Copied HEX Codes!' : 'Copy Hex Codes'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
