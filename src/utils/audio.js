// Gentle audio synthesis using Web Audio API (no external mp3 files needed)
class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientPlaying = false;
    this.ambientNodes = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(type = 'soft') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';

      if (type === 'pop') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'breathIn') {
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(392, now + 3.8);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 4.1);
      } else if (type === 'breathOut') {
        osc.frequency.setValueAtTime(392, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 3.8);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 4.1);
      } else if (type === 'bell') {
        // Multi-frequency soothing bell
        const freqs = [528, 660, 792];
        freqs.forEach((f, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, now);
          g.gain.setValueAtTime(0.08 / (idx + 1), now);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
          o.connect(g);
          g.connect(this.ctx.destination);
          o.start(now);
          o.stop(now + 2.0);
        });
      } else {
        // default soft chime
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.25); // E5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.85);
      }
    } catch {
      // Audio playback fails silently if browser blocks autoplay
    }
  }

  toggleAmbient(onCallback) {
    if (this.ambientPlaying) {
      this.stopAmbient();
      if (onCallback) onCallback(false);
      return false;
    } else {
      this.startAmbient();
      if (onCallback) onCallback(true);
      return true;
    }
  }

  startAmbient() {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopAmbient();

      // Create soothing pink noise / soft ocean hum
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.06;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      // Lowpass filter for warm, cozy sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseNode.start();
      this.ambientNodes = { noiseNode, gain };
      this.ambientPlaying = true;
    } catch {
      this.ambientPlaying = false;
    }
  }

  stopAmbient() {
    if (this.ambientNodes) {
      try {
        this.ambientNodes.noiseNode.stop();
        this.ambientNodes.noiseNode.disconnect();
      } catch {}
      this.ambientNodes = null;
    }
    this.ambientPlaying = false;
  }
}

export const sound = new SoundManager();

