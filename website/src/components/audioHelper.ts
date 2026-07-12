"use client";

let audioCtx: AudioContext | null = null;
let ambienceNode: GainNode | null = null;
let ambienceSources: { osc: OscillatorNode; filter: BiquadFilterNode }[] = [];

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Generate White Noise Buffer for pneumatic hisses
function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2; // 2 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function playMetroHorn() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Dual-tone pneumatic train horn (typical Indian Metro tones)
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const osc3 = ctx.createOscillator(); // Harmonic sawtooth wave for buzz

  const gainNode = ctx.createGain();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(370, now); // F#4
  
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(415, now); // G#4

  osc3.type = "sawtooth";
  osc3.frequency.setValueAtTime(740, now); // F#5 harmonic

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Rapid swell
  gainNode.gain.setValueAtTime(0.3, now + 1.0);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.3); // Decay

  // Lowpass filter to make horn sound deeper and less harsh
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);

  osc1.connect(filter);
  osc2.connect(filter);
  
  const osc3Gain = ctx.createGain();
  osc3Gain.gain.setValueAtTime(0.04, now); // Quiet harmonic buzz
  osc3.connect(osc3Gain);
  osc3Gain.connect(filter);

  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc3.start(now);

  osc1.stop(now + 1.3);
  osc2.stop(now + 1.3);
  osc3.stop(now + 1.3);
}

export function playDoorOpen() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Play 3-tone arpeggio chime (B5 -> C6 -> E6)
  const chimeNotes = [987.77, 1046.50, 1318.51];
  chimeNotes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + idx * 0.15);
    
    gain.gain.setValueAtTime(0, now + idx * 0.15);
    gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.15 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now + idx * 0.15);
    osc.stop(now + idx * 0.15 + 0.3);
  });

  // 2. Play Door Pneumatic Hiss (pressure release)
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(2500, now + 0.3);
  filter.frequency.exponentialRampToValueAtTime(400, now + 1.3);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now + 0.3);
  noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.4);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(now + 0.3);
  noise.stop(now + 1.4);
}

export function playDoorClose() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Play 3 warning beeps (880 Hz, 880 Hz, 880 Hz)
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now + i * 0.3); // A5
    
    gain.gain.setValueAtTime(0, now + i * 0.3);
    gain.gain.linearRampToValueAtTime(0.2, now + i * 0.3 + 0.02);
    gain.gain.setValueAtTime(0.2, now + i * 0.3 + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.3 + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now + i * 0.3);
    osc.stop(now + i * 0.3 + 0.2);
  }

  // 2. Play solid door lock thud at 0.9s
  const thudOsc = ctx.createOscillator();
  const thudGain = ctx.createGain();
  
  thudOsc.type = "sine";
  thudOsc.frequency.setValueAtTime(75, now + 0.9); // Low-pitched thud
  thudOsc.frequency.exponentialRampToValueAtTime(20, now + 1.1);

  thudGain.gain.setValueAtTime(0, now + 0.9);
  thudGain.gain.linearRampToValueAtTime(0.4, now + 0.92);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

  const thudFilter = ctx.createBiquadFilter();
  thudFilter.type = "lowpass";
  thudFilter.frequency.setValueAtTime(150, now + 0.9);

  thudOsc.connect(thudFilter);
  thudFilter.connect(thudGain);
  thudGain.connect(ctx.destination);

  thudOsc.start(now + 0.9);
  thudOsc.stop(now + 1.15);
}

export function playStationAmbience() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ambienceNode) return; // Already running

  const now = ctx.currentTime;

  ambienceNode = ctx.createGain();
  ambienceNode.gain.setValueAtTime(0, now);
  ambienceNode.gain.linearRampToValueAtTime(0.05, now + 2.0); // Slow fade-in

  // Low frequency platform hum (100Hz + 150Hz sine waves)
  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(98, now);
  
  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(147, now);

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(200, now);

  osc1.connect(lowpass);
  osc2.connect(lowpass);
  lowpass.connect(ambienceNode);
  ambienceNode.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);

  ambienceSources = [
    { osc: osc1, filter: lowpass },
    { osc: osc2, filter: lowpass }
  ];
}

export function stopStationAmbience() {
  const ctx = getAudioContext();
  if (!ctx || !ambienceNode) return;

  const now = ctx.currentTime;
  ambienceNode.gain.setValueAtTime(ambienceNode.gain.value, now);
  ambienceNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5); // Smooth fade-out

  setTimeout(() => {
    ambienceSources.forEach((src) => {
      try {
        src.osc.stop();
      } catch (e) {}
    });
    ambienceSources = [];
    ambienceNode = null;
  }, 1600);
}
