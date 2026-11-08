// LinkMe Hero Showcase: Promotes the official LinkMe & Rabbi Yosef Mizrachi Fan Page
// Dynamic screen-space optimized side-by-side layout

import { OFFICIAL_LINKME } from '../data/links.js';
import { createAnimatedLogo } from './AnimatedLogo.js';

export function renderLinkMeHero(container) {
  container.innerHTML = `
    <div class="relative max-w-7xl mx-auto pt-4 pb-8 md:py-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- LEFT COLUMN: BRANDING, TITLE & SACRED MOTTO -->
        <div class="lg:col-span-7 text-center lg:text-left">
          
          <div class="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <!-- Animated Sacred Menorah Emblem -->
            <div id="hero-animated-logo-container" class="shrink-0"></div>
            
            <!-- Luminous Top Halo Pill -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Official Gateway & Community Hub</span>
            </div>
          </div>

          <!-- Main Title with proper spaces: Rabbi Yosef Mizrachi Fan Page -->
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-cinzel leading-tight mb-3">
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 drop-shadow-[0_4px_25px_rgba(245,158,11,0.35)]">
              Rabbi Yosef Mizrachi Fan Page
            </span>
            <span class="block text-lg sm:text-xl lg:text-2xl font-normal text-slate-200 mt-2 font-serif italic">
              Uniting Jew & Gentile in the Eternal Word of Hashem
            </span>
          </h1>

          <!-- Hebrew Blessing Banner -->
          <div class="font-david text-lg sm:text-xl text-amber-300/90 mb-4 tracking-wider font-semibold">
            ״דע לפני מי אתה עומד — מלך מלכי המלכים הקדוש ברוך הוא״
          </div>

          <p class="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal mb-6 max-w-2xl mx-auto lg:mx-0">
            Welcome to the central portal consolidating all <strong class="text-cyan-300 font-semibold">@RabbiYosefMizrachiFanPage</strong> social channels while directing the global community to the authorized, official digital portals and <strong class="text-amber-300 font-semibold">Official LinkMe</strong> of world-renowned Kiruv speaker Rabbi Yosef Mizrachi.
          </p>

          <!-- Screen-Space Fast Nav Pills -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
            <a 
              href="#video-reels-section" 
              class="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <span>📻 Open Video Jukebox</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </a>

            <a 
              href="#kiruv-mission-section" 
              class="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>🕎 Kiruv Mission</span>
            </a>

            <a 
              href="#links-directory-section" 
              class="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>🌐 All 26 Links</span>
            </a>
          </div>

        </div>

        <!-- RIGHT COLUMN: 3D HOLOGRAPHIC VIP HERO CARD (PROMOTING OFFICIAL LINKME) -->
        <div class="lg:col-span-5 w-full max-w-lg mx-auto">
          <div class="relative p-[2px] rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 shadow-[0_0_50px_rgba(245,158,11,0.3)] transform hover:scale-[1.01] transition-transform duration-300">
            <div class="relative bg-gradient-to-b from-[#0e1635]/95 via-[#090e24]/95 to-[#040714]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-7 text-left overflow-hidden">
              
              <!-- Background Divine Ray Shimmer -->
              <div class="absolute -top-24 -right-24 w-52 h-52 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-24 -left-24 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Dual Avatar Showcase (Rabbi Yosef Mizrachi Official + Fan Page Bridge) -->
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-3">
                  <!-- Rabbi Official Avatar -->
                  <div class="relative">
                    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg shadow-amber-500/30">
                      <img src="/rabbi-profile.webp" alt="Rabbi Yosef Mizrachi" class="w-full h-full object-cover" />
                    </div>
                    <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-[10px] shadow-md" title="Official Verified">
                      ✓
                    </span>
                  </div>

                  <!-- Interconnecting Kiruv Beam -->
                  <div class="flex flex-col items-center justify-center px-1">
                    <span class="text-[9px] text-amber-400 font-mono font-bold">BRIDGED BY</span>
                    <svg class="w-5 h-3 text-amber-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>

                  <!-- Fan Page Avatar -->
                  <div class="relative">
                    <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-md shadow-cyan-500/20">
                      <img src="/fanpage-avatar.jpg" alt="Rabbi Yosef Mizrachi Fan Page" class="w-full h-full object-cover" />
                    </div>
                    <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-[9px] shadow-md" title="Fan Community">
                      👥
                    </span>
                  </div>
                </div>

                <!-- Follower Count Pill -->
                <div class="text-right">
                  <span class="text-xs font-mono text-amber-400 font-bold block">320K+ Reach</span>
                  <span class="text-[9px] text-slate-300 uppercase tracking-wider block font-semibold">Global Seekers</span>
                </div>
              </div>

              <!-- Card Info -->
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    PROMOTED OFFICIAL HUB
                  </span>
                  <span class="text-[11px] text-slate-300 font-mono font-medium">${OFFICIAL_LINKME.handle}</span>
                </div>
                
                <h3 class="text-xl sm:text-2xl font-extrabold text-white font-cinzel">
                  Rabbi Yosef Mizrachi Official LinkMe
                </h3>
                
                <p class="text-xs text-slate-200 mt-1.5 leading-relaxed">
                  Direct access to all authenticated platforms: Divine Information, TorahAnytime, Apple & Android Apps, Spotify podcasts, Rumble archives, and live events.
                </p>
              </div>

              <!-- Primary CTA Button -->
              <div class="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a 
                  href="${OFFICIAL_LINKME.url}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-amber-500/30 flex items-center justify-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span>Open Official LinkMe (link.me)</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>

                <button 
                  id="hero-copy-linkme-btn" 
                  class="py-3 px-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  title="Copy link.me URL"
                >
                  <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                  <span>Copy</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  // Mount animated logo in hero
  const logoContainer = container.querySelector('#hero-animated-logo-container');
  if (logoContainer) {
    logoContainer.appendChild(createAnimatedLogo({ size: 'md' }));
  }

  // Copy LinkMe CTA in Hero
  const heroCopyBtn = container.querySelector('#hero-copy-linkme-btn');
  if (heroCopyBtn) {
    heroCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('https://link.me/rabbiyosefmizrachi').then(() => {
        const orig = heroCopyBtn.innerHTML;
        heroCopyBtn.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span class="text-emerald-300">Copied!</span>
        `;
        setTimeout(() => {
          heroCopyBtn.innerHTML = orig;
        }, 2000);
      });
    });
  }
}
