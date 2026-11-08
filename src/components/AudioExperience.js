// Ambient Celestial Sound Experience using Web Audio API (Zero external assets required)

export class AudioExperience {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    // Convolver or lowpass filter for deep holy resonance
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    this.gainNode.connect(this.filter);
    this.filter.connect(this.ctx.destination);
  }

  toggle() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    if (!this.ctx) return;
    this.isPlaying = true;

    // Harmonic chords (432Hz Pythagorean Sacred Tuning: A=432, D=288, F#=362.04, C#=543.06)
    const baseFreqs = [108, 216, 288, 362.04, 432, 543.06];

    this.oscillators = baseFreqs.map(freq => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle LFO for sacred breathing pulse
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + Math.random() * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(freq * 0.015, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.06 / baseFreqs.length, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();

      return { osc, lfo };
    });

    // Smooth fade in
    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 3);
  }

  stop() {
    if (!this.ctx) return;
    this.isPlaying = false;

    // Smooth fade out
    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

    setTimeout(() => {
      this.oscillators.forEach(o => {
        try {
          o.osc.stop();
          o.lfo.stop();
        } catch (e) {}
      });
      this.oscillators = [];
    }, 1500);
  }
}
