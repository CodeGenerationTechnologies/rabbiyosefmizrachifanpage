// Atmospheric, Inspiring & Uplifting Sacred Sanctuary Music Generator
// Procedurally synthesized via Web Audio API (100% Copyright, Royalty & Attribution Free)
// Tuning: Sacred 432Hz Harmonic Frequency for spiritual elevation & closeness to Hashem

export class AudioExperience {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isDucked = false;
    this.nodes = [];
    this.masterGain = null;
    this.padGain = null;
    this.harpGain = null;
    this.intervalId = null;
    this.step = 0;
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Master Volume Control
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    // Warm sanctuary acoustic low-pass filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(950, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // Stereo Convolution / Reverb Simulator (Multi-tap delay network)
    this.reverbSend = this.ctx.createGain();
    this.reverbSend.gain.setValueAtTime(0.4, this.ctx.currentTime);

    const delayL = this.ctx.createDelay();
    delayL.delayTime.setValueAtTime(0.24, this.ctx.currentTime);

    const delayR = this.ctx.createDelay();
    delayR.delayTime.setValueAtTime(0.38, this.ctx.currentTime);

    const feedbackL = this.ctx.createGain();
    feedbackL.gain.setValueAtTime(0.35, this.ctx.currentTime);

    const feedbackR = this.ctx.createGain();
    feedbackR.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Connect delay network
    this.reverbSend.connect(delayL);
    this.reverbSend.connect(delayR);
    delayL.connect(feedbackL);
    feedbackL.connect(delayL);
    delayR.connect(feedbackR);
    feedbackR.connect(delayR);

    // Connect to Master and Filter
    this.masterGain.connect(this.filter);
    this.filter.connect(this.ctx.destination);
    delayL.connect(this.ctx.destination);
    delayR.connect(this.ctx.destination);
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

  // Audio Ducking: Soften sanctuary music when a video preview plays sound
  duck() {
    if (!this.isPlaying || !this.masterGain || !this.ctx) return;
    this.isDucked = true;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.3);
  }

  // Restore sanctuary music volume when video preview ends
  unduck() {
    if (!this.isPlaying || !this.masterGain || !this.ctx) return;
    this.isDucked = false;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.32, this.ctx.currentTime + 0.6);
  }

  play() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.isDucked = false;

    // Fade Master In
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.32, this.ctx.currentTime + 2.5);

    // 1. Holy Sanctuary Pad Chords (Warm, sacred, uplifting strings)
    // 432Hz Scale Frequencies: D=144, 288 | F#=181, 362 | A=216, 432 | C#=271.5, 543 | E=162, 324
    const chords = [
      // Chord 1: D Major (Radiant Divine Light & Joy)
      [72, 144, 216, 288, 362.04, 432],
      // Chord 2: G Major / E minor 7 (Yearning Elevation)
      [96, 192, 288, 384, 432, 576],
      // Chord 3: A Major (Spiritual Majesty)
      [108, 216, 324, 432, 543.06, 648],
      // Chord 4: B Minor 9 / D Major 7 (Deep Soul-Connection to Hashem)
      [81, 162, 288, 362.04, 432, 543.06]
    ];

    let currentChordIdx = 0;
    this.padOscillators = [];

    const startPadVoice = (freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle LFO for breathing warmth
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + Math.random() * 0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(freq * 0.012, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain);
      gain.connect(this.reverbSend);
      osc.start();

      return { osc, gain, lfo };
    };

    chords[0].forEach(f => {
      this.padOscillators.push(startPadVoice(f));
    });

    // 2. Kinnor David (David's Harp) Arpeggiator: Uplifting heavenly melody
    // Melodic notes in 432Hz D Major: D4, F#4, A4, B4, C#5, D5, E5, F#5
    const harpNotes = [288, 362.04, 432, 485.4, 543.06, 576, 648, 724.08];
    const harpMelody = [
      [288, 432, 576],
      [362.04, 485.4, 648],
      [432, 543.06, 724.08],
      [362.04, 432, 576]
    ];

    let noteIdx = 0;

    const pluckHarp = (freq) => {
      if (!this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine + soft triangle blend for pure acoustic harp string bell
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03); // Fast harp pluck attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2); // Resonant natural decay

      osc.connect(gain);
      gain.connect(this.masterGain);
      gain.connect(this.reverbSend);

      osc.start(now);
      osc.stop(now + 2.3);
    };

    // Uplifting arpeggio sequence timer
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;

      const currentMelodyStep = harpMelody[currentChordIdx];
      const noteFreq = currentMelodyStep[noteIdx % currentMelodyStep.length];
      pluckHarp(noteFreq);
      noteIdx++;

      // Shift chord every 12 notes (approx 4.8 seconds)
      if (noteIdx % 12 === 0) {
        currentChordIdx = (currentChordIdx + 1) % chords.length;
        const newChord = chords[currentChordIdx];
        
        // Smoothly glide pad frequencies to new chord
        this.padOscillators.forEach((voice, i) => {
          if (newChord[i]) {
            voice.osc.frequency.setTargetAtTime(newChord[i], this.ctx.currentTime, 1.2);
          }
        });
      }
    }, 420); // 420ms tempo creates a serene, gentle spiritual pace
  }

  stop() {
    if (!this.ctx) return;
    this.isPlaying = false;
    clearInterval(this.intervalId);

    // Smooth sanctuary fade out
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

    setTimeout(() => {
      if (this.padOscillators) {
        this.padOscillators.forEach(p => {
          try {
            p.osc.stop();
            p.lfo.stop();
          } catch (e) {}
        });
        this.padOscillators = [];
      }
    }, 1800);
  }
}

// Global singleton for video hover audio ducking
window.audioExperience = new AudioExperience();
