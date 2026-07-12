// ═══════════════════════════════════════════════════
//  JAIPUR RIDE — Anime Metro Hero Engine v2
//  Full 14-frame cinematic sequence + anime FX
//  Audio: assets/arrive file.mp3
//  Spec: www/home design/antigravity_prompt_anime_style.md
// ═══════════════════════════════════════════════════

export class MetroHeroAnime {
  constructor() {
    // Full 14-frame sequence matching the anime spec
    this.frames = [
      // Scene 1: Platform Stillness
      { id: 1,  src: 'assets/images/metro-frames/frame_01.png', duration: 1000,  scene: 'stillness',       fx: [] },
      { id: 2,  src: 'assets/images/metro-frames/frame_02.png', duration: 900,   scene: 'platform',        fx: [] },
      { id: 3,  src: 'assets/images/metro-frames/frame_03.png', duration: 800,   scene: 'rumble',          fx: ['subtle-speed'] },

      // Scene 2: Train Approach from Right
      { id: 4,  src: 'assets/images/metro-frames/frame_04.png', duration: 900,   scene: 'train-enters',    fx: ['speed-lines', 'shake'] },
      { id: 5,  src: 'assets/images/metro-frames/frame_05.png', duration: 800,   scene: 'train-braking',   fx: ['speed-lines', 'shake-heavy'] },
      { id: 6,  src: 'assets/images/metro-frames/frame_06.png', duration: 700,   scene: 'train-approach',  fx: ['speed-lines'] },
      { id: 7,  src: 'assets/images/metro-frames/frame_07.png', duration: 700,   scene: 'train-massive',   fx: ['speed-fade'] },

      // Scene 3: Gate Appears
      { id: 8,  src: 'assets/images/metro-frames/frame_08.png', duration: 800,   scene: 'gate-appears',    fx: ['glow-gate', 'vibrate'] },
      { id: 9,  src: 'assets/images/metro-frames/frame_09.png', duration: 700,   scene: 'gate-opens',      fx: ['glow-gate', 'speed-radial'] },

      // Scene 4: Doors Open + Camera Zoom
      { id: 10, src: 'assets/images/metro-frames/frame_10.png', duration: 800,   scene: 'doors-crack',     fx: ['zoom-lines', 'glow-interior'] },
      { id: 11, src: 'assets/images/metro-frames/frame_11.png', duration: 900,   scene: 'doors-full',      fx: ['zoom-lines-max', 'glow-interior-max'] },
      { id: 12, src: 'assets/images/metro-frames/frame_12.png', duration: 700,   scene: 'zoom-stop',       fx: ['glow-interior'] },

      // Scene 5: UI Emergence
      { id: 13, src: 'assets/images/metro-frames/frame_13.png', duration: 800,   scene: 'interior-light',  fx: ['particles', 'glow-interior'] },
      { id: 14, src: 'assets/images/metro-frames/frame_14.png', duration: 1800,  scene: 'arrival',         fx: ['particles'] },
    ];

    this.currentFrameIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.audio = null;
    this.heroEl = null;
    this.progressFill = null;
    this.animationTimer = null;
    this.totalDuration = this.frames.reduce((sum, f) => sum + f.duration, 0);
    this.hasPlayed = localStorage.getItem('jaipur_ride_hero_played') === '1';
  }

  // ═══════════════════════════════════════
  //  INITIALIZATION
  // ═══════════════════════════════════════
  init() {
    if (this.hasPlayed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }

    this.buildDOM();
    this.preloadFrames();
    this.setupAudio();
    this.bindEvents();
    return true;
  }

  // ═══════════════════════════════════════
  //  DOM CONSTRUCTION
  // ═══════════════════════════════════════
  buildDOM() {
    const hero = document.createElement('div');
    hero.className = 'metro-hero';
    hero.id = 'metro-hero';

    hero.innerHTML = `
      <!-- Sound Toggle -->
      <button class="hero-sound-btn" id="hero-sound-btn" aria-label="Toggle sound">
        ${this._soundOnSVG()}
      </button>

      <!-- Skip Button -->
      <button class="hero-skip-btn" id="hero-skip-btn">SKIP ›</button>

      <!-- Frame Canvas (holds all frame backgrounds) -->
      <div class="hero-frame-canvas" id="hero-frame-canvas">
        ${this.frames.map((f, i) =>
          `<div class="hero-frame ${i === 0 ? 'active' : ''}"
                id="hero-frame-${f.id}"
                style="background-image:url('${f.src}')"
                data-scene="${f.scene}"></div>`
        ).join('')}
      </div>

      <!-- ANIME EFFECTS LAYER -->

      <!-- Speed Lines (horizontal, right-to-left) -->
      <svg class="speed-lines-overlay" id="speed-lines" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        ${this._genSpeedLines(18)}
      </svg>

      <!-- Zoom Lines (radial convergence to center) -->
      <svg class="zoom-lines-overlay" id="zoom-lines" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        ${this._genZoomLines(28)}
      </svg>

      <!-- Glow Aura (gate + interior) -->
      <div class="glow-aura-overlay" id="glow-aura">
        <div class="glow-aura-gate" id="glow-gate"></div>
        <div class="glow-aura-interior" id="glow-interior" style="opacity:0"></div>
      </div>

      <!-- Floating Particles -->
      <div class="particles-overlay" id="particles-overlay">
        ${this._genParticles(24)}
      </div>

      <!-- Cinematic Vignette -->
      <div class="hero-vignette"></div>

      <!-- Logo overlay (Frame 1 only) -->
      <div class="hero-text-overlay">
        <div class="hero-logo-container" id="hero-logo">
          <img src="assets/images/logo1.png" alt="JaipurRide" class="hero-logo-img">
          <div class="hero-logo-text">Jaipur<span>Ride</span></div>
        </div>
      </div>

      <!-- Arrival text (final frames) -->
      <div class="hero-arrival-text" id="hero-arrival-text">
        <div class="arrival-welcome">Welcome Aboard</div>
        <div class="arrival-title">Your City.<br><span>Your Metro.</span></div>
        <div class="arrival-subtitle">Navigate Jaipur Metro like never before</div>
      </div>

      <!-- Animated Stats -->
      <div class="hero-stats" id="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-value" id="stat-stations">0</div>
          <div class="hero-stat-label">Stations</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-value" id="stat-km">0</div>
          <div class="hero-stat-label">Km Line</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-value" id="stat-daily">0</div>
          <div class="hero-stat-label">K Daily Riders</div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="hero-progress">
        <div class="hero-progress-fill" id="hero-progress-fill"></div>
      </div>
    `;

    document.body.prepend(hero);
    this.heroEl = hero;
    this.progressFill = document.getElementById('hero-progress-fill');
  }

  // ═══════════════════════════════════════
  //  SVG GENERATORS
  // ═══════════════════════════════════════
  _genSpeedLines(count) {
    let svg = '';
    for (let i = 0; i < count; i++) {
      const y = 60 + Math.random() * 960;
      const x1 = 1920;
      const x2 = 600 + Math.random() * 800;
      const yOff = (Math.random() - 0.5) * 60;
      const sw = 0.6 + Math.random() * 2.2;
      const op = 0.12 + Math.random() * 0.45;
      const dash = 40 + Math.random() * 180;
      const delay = Math.random() * 0.6;
      svg += `<line class="speed-line" x1="${x1}" y1="${y}" x2="${x2}" y2="${y + yOff}"
                stroke-width="${sw}" opacity="${op}"
                stroke-dasharray="${dash} ${dash * 2}"
                style="animation-delay:${delay}s"/>`;
    }
    return svg;
  }

  _genZoomLines(count) {
    let svg = '';
    const cx = 960, cy = 540;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const innerR = 180 + Math.random() * 120;
      const outerR = 850 + Math.random() * 250;
      const x1 = cx + Math.cos(angle) * innerR;
      const y1 = cy + Math.sin(angle) * innerR;
      const x2 = cx + Math.cos(angle) * outerR;
      const y2 = cy + Math.sin(angle) * outerR;
      const sw = 0.6 + Math.random() * 1.8;
      const op = 0.08 + Math.random() * 0.35;
      svg += `<line class="zoom-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                stroke-width="${sw}" opacity="${op}"/>`;
    }
    return svg;
  }

  _genParticles(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
      const x = 15 + Math.random() * 70;
      const y = 15 + Math.random() * 70;
      const s = 2 + Math.random() * 3.5;
      const d = Math.random() * 4;
      const dur = 2.5 + Math.random() * 2;
      html += `<div class="particle" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;animation-delay:${d}s;animation-duration:${dur}s"></div>`;
    }
    return html;
  }

  _soundOnSVG() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>`;
  }

  _soundOffSVG() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>`;
  }

  // ═══════════════════════════════════════
  //  PRELOAD & AUDIO
  // ═══════════════════════════════════════
  preloadFrames() {
    const promises = this.frames.map(f => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continue even if frame fails
        img.src = f.src;
      });
    });
    // Also preload fallback
    const fb = new Image();
    fb.src = 'assets/images/metro-frames/frame_18.png';
    return Promise.all(promises);
  }

  setupAudio() {
    try {
      this.audio = new Audio('assets/arrive file.mp3');
      this.audio.volume = 0.65;
      this.audio.preload = 'auto';
      this.audio.load();
    } catch (e) {
      console.warn('[MetroHero] Audio setup failed:', e);
      this.audio = null;
    }
  }

  // ═══════════════════════════════════════
  //  EVENT BINDING
  // ═══════════════════════════════════════
  bindEvents() {
    document.getElementById('hero-skip-btn')?.addEventListener('click', () => this.endHero());
    document.getElementById('hero-sound-btn')?.addEventListener('click', () => this.toggleSound());

    // Tap-to-skip after 3s (don't skip on buttons)
    setTimeout(() => {
      this.heroEl?.addEventListener('click', (e) => {
        if (e.target.closest('.hero-skip-btn, .hero-sound-btn')) return;
        if (this.currentFrameIndex >= 4) this.endHero();
      });
    }, 3000);
  }

  // ═══════════════════════════════════════
  //  PLAYBACK ENGINE
  // ═══════════════════════════════════════
  async play() {
    if (this.isPlaying || this.hasPlayed) return;
    this.isPlaying = true;

    // Try audio
    this._tryAudio();

    let elapsed = 0;

    for (let i = 0; i < this.frames.length; i++) {
      if (!this.isPlaying) break;

      this.currentFrameIndex = i;
      const frame = this.frames[i];

      // Activate frame image
      this._activateFrame(frame.id);

      // Update progress
      this._updateProgress(elapsed);

      // Apply anime effects for this scene
      this._applyFX(frame);

      // Wait for frame duration
      await this._wait(frame.duration);
      elapsed += frame.duration;
    }

    if (this.isPlaying) {
      this._updateProgress(this.totalDuration);
      // Hold final frame briefly, then exit
      await this._wait(1200);
      this.endHero();
    }
  }

  _activateFrame(frameId) {
    document.querySelectorAll('.hero-frame').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`hero-frame-${frameId}`);
    if (el) el.classList.add('active');
  }

  // ═══════════════════════════════════════
  //  ANIME EFFECTS ENGINE
  // ═══════════════════════════════════════
  _applyFX(frame) {
    const $ = id => document.getElementById(id);

    const speedLines   = $('speed-lines');
    const zoomLines    = $('zoom-lines');
    const glowAura     = $('glow-aura');
    const glowGate     = $('glow-gate');
    const glowInterior = $('glow-interior');
    const particles    = $('particles-overlay');
    const logo         = $('hero-logo');
    const canvas       = $('hero-frame-canvas');
    const arrivalText  = $('hero-arrival-text');
    const heroStats    = $('hero-stats');

    // Reset all overlays
    speedLines?.classList.remove('active');
    zoomLines?.classList.remove('active');
    glowAura?.classList.remove('active');
    particles?.classList.remove('active');
    logo?.classList.remove('visible');
    arrivalText?.classList.remove('visible');
    heroStats?.classList.remove('visible');
    canvas?.classList.remove('impact-shake');

    // Set zoom lines density via CSS custom property
    if (zoomLines) zoomLines.style.opacity = '';

    const fx = frame.fx;
    const scene = frame.scene;

    // ── Scene-specific effects ──

    // Logo (Frame 1 only)
    if (scene === 'stillness') {
      logo?.classList.add('visible');
    }

    // Speed lines (frames 3–9)
    if (fx.includes('subtle-speed') || fx.includes('speed-lines') || fx.includes('speed-fade') || fx.includes('speed-radial')) {
      speedLines?.classList.add('active');
      // Vary opacity based on intensity
      if (fx.includes('subtle-speed')) {
        speedLines.style.opacity = '0.3';
      } else if (fx.includes('speed-fade')) {
        speedLines.style.opacity = '0.4';
      } else {
        speedLines.style.opacity = '0.7';
      }
    }

    // Impact shake (frames 4–5)
    if (fx.includes('shake') || fx.includes('shake-heavy')) {
      void canvas?.offsetWidth; // Trigger reflow for re-animation
      canvas?.classList.add('impact-shake');
    }

    // Frame vibrate (gate appearance)
    if (fx.includes('vibrate')) {
      void canvas?.offsetWidth;
      canvas?.classList.add('impact-shake');
    }

    // Gate glow (frames 8–9)
    if (fx.includes('glow-gate')) {
      glowAura?.classList.add('active');
      if (glowGate) glowGate.style.opacity = '1';
      if (glowInterior) glowInterior.style.opacity = '0';
    }

    // Zoom lines (frames 10–11)
    if (fx.includes('zoom-lines') || fx.includes('zoom-lines-max')) {
      zoomLines?.classList.add('active');
      if (fx.includes('zoom-lines-max')) {
        zoomLines.style.opacity = '1';
      } else {
        zoomLines.style.opacity = '0.6';
      }
    }

    // Interior glow (frames 10–14)
    if (fx.includes('glow-interior') || fx.includes('glow-interior-max')) {
      glowAura?.classList.add('active');
      if (glowGate) glowGate.style.opacity = '0';
      if (glowInterior) {
        glowInterior.style.opacity = fx.includes('glow-interior-max') ? '1' : '0.7';
      }
    }

    // Particles (frames 13–14)
    if (fx.includes('particles')) {
      particles?.classList.add('active');
    }

    // Arrival UI (frame 14)
    if (scene === 'arrival') {
      arrivalText?.classList.add('visible');
      heroStats?.classList.add('visible');
      this._animateCounters();
    }
  }

  // ═══════════════════════════════════════
  //  COUNTER ANIMATIONS
  // ═══════════════════════════════════════
  _animateCounters() {
    this._countUp('stat-stations', 0, 11, 1400);
    this._countUp('stat-km', 0, 12, 1400);
    this._countUp('stat-daily', 0, 150, 1400);
  }

  _countUp(id, from, to, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ═══════════════════════════════════════
  //  AUDIO CONTROL
  // ═══════════════════════════════════════
  _tryAudio() {
    if (!this.audio || this.isMuted) return;
    const p = this.audio.play();
    if (p) p.catch(() => {
      this.isMuted = true;
      this._updateSoundIcon();
    });
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
      if (!this.isMuted && this.audio.paused) {
        this.audio.play().catch(() => {});
      }
    }
    this._updateSoundIcon();
  }

  _updateSoundIcon() {
    const btn = document.getElementById('hero-sound-btn');
    if (!btn) return;
    btn.innerHTML = this.isMuted ? this._soundOffSVG() : this._soundOnSVG();
  }

  // ═══════════════════════════════════════
  //  PROGRESS & UTILITIES
  // ═══════════════════════════════════════
  _updateProgress(elapsed) {
    if (this.progressFill) {
      const pct = Math.min((elapsed / this.totalDuration) * 100, 100);
      this.progressFill.style.width = `${pct}%`;
    }
  }

  _wait(ms) {
    return new Promise(resolve => {
      this.animationTimer = setTimeout(resolve, ms);
    });
  }

  // ═══════════════════════════════════════
  //  END / CLEANUP
  // ═══════════════════════════════════════
  endHero() {
    this.isPlaying = false;
    if (this.animationTimer) clearTimeout(this.animationTimer);

    // Stop audio
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    // Progress to 100%
    if (this.progressFill) this.progressFill.style.width = '100%';

    // Transition out
    if (this.heroEl) {
      this.heroEl.classList.add('hero-exit');
      setTimeout(() => {
        this.heroEl.classList.add('hero-hidden');
        localStorage.setItem('jaipur_ride_hero_played', '1');
      }, 900);
    }
  }
}

// ═══════════════════════════════════════
//  AUTO-INIT EXPORT
// ═══════════════════════════════════════
export function initMetroHero() {
  const hero = new MetroHeroAnime();
  const ok = hero.init();
  if (ok) {
    // Wait for frames to preload, then play
    hero.preloadFrames().then(() => {
      requestAnimationFrame(() => {
        setTimeout(() => hero.play(), 200);
      });
    });
  }
  return hero;
}
