// LinkMe Hero Showcase: Promotes the official LinkMe & Fan Page Community Hub

import { OFFICIAL_LINKME } from '../data/links.js';

export function renderLinkMeHero(container) {
  container.innerHTML = `
    <div class="relative max-w-5xl mx-auto pt-8 pb-16 md:py-24 text-center">
      
      <!-- Luminous Top Halo Pill -->
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-semibold tracking-wider uppercase mb-8 shadow-[0_0_25px_rgba(245,158,11,0.25)] animate-pulse">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        <span>The Official Gateway & Fan Community Hub</span>
      </div>

      <!-- Main Title -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight font-cinzel leading-none mb-6">
        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_4px_30px_rgba(245,158,11,0.4)]">
          rabbiyosefmizrachifanpage
        </span>
        <span class="block text-2xl sm:text-3xl md:text-4xl font-normal text-slate-300 mt-2 font-serif italic">
          Uniting Jew & Gentile in the Eternal Word of Hashem
        </span>
      </h1>

      <!-- Hebrew Blessing Banner -->
      <div class="font-david text-xl md:text-2xl text-amber-300/80 mb-8 tracking-wider">
        ״דע לפני מי אתה עומד — מלך מלכי המלכים הקדוש ברוך הוא״
      </div>

      <p class="max-w-2xl mx-auto text-base md:text-lg text-slate-300/90 leading-relaxed font-light mb-12">
        Welcome to the premier portal consolidating all <strong class="text-cyan-300">@rabbiyosefmizrachifanpage</strong> social channels while directing the global community to the authorized, official digital portals and <strong class="text-amber-300">Official LinkMe</strong> of world-renowned Kiruv speaker Rabbi Yosef Mizrachi.
      </p>

      <!-- 3D HOLOGRAPHIC VIP HERO CARD (PROMOTING OFFICIAL LINKME) -->
      <div class="relative max-w-xl mx-auto p-[2px] rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 shadow-[0_0_60px_rgba(245,158,11,0.35)] transform hover:scale-[1.02] transition-transform duration-500">
        <div class="relative bg-gradient-to-b from-[#0e1635]/95 via-[#090e24]/95 to-[#040714]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 text-left overflow-hidden">
          
          <!-- Background Divine Ray Shimmer -->
          <div class="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Dual Avatar Showcase (Rabbi Yosef Mizrachi Official + Fan Page Bridge) -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
              <!-- Rabbi Official Avatar -->
              <div class="relative">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl shadow-amber-500/30">
                  <img src="/rabbi-profile.webp" alt="Rabbi Yosef Mizrachi" class="w-full h-full object-cover" />
                </div>
                <span class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xs shadow-md" title="Official Verified">
                  ✓
                </span>
              </div>

              <!-- Interconnecting Kiruv Beam -->
              <div class="flex flex-col items-center justify-center px-1">
                <span class="text-[10px] text-amber-400/80 font-mono">BRIDGED BY</span>
                <svg class="w-6 h-4 text-amber-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>

              <!-- Fan Page Avatar -->
              <div class="relative">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/20">
                  <img src="/fanpage-avatar.jpg" alt="Rabbi Yosef Mizrachi Fan Page" class="w-full h-full object-cover" />
                </div>
                <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-[10px] shadow-md" title="Fan Community">
                  👥
                </span>
              </div>
            </div>

            <!-- Follower Count Pill -->
            <div class="hidden sm:block text-right">
              <span class="text-xs font-mono text-amber-400 font-bold block">320K+ Reach</span>
              <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Global Seekers</span>
            </div>
          </div>

          <!-- Card Info -->
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PROMOTED OFFICIAL HUB
              </span>
              <span class="text-xs text-slate-400 font-mono">${OFFICIAL_LINKME.handle}</span>
            </div>
            
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white font-cinzel">
              Rabbi Yosef Mizrachi Official LinkMe
            </h3>
            
            <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Direct access to all authenticated platforms: Divine Information, TorahAnytime, Apple & Android Apps, Spotify podcasts, Rumble archives, and live events.
            </p>
          </div>

          <!-- Primary CTA Button -->
          <div class="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a 
              href="${OFFICIAL_LINKME.url}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>Open Official LinkMe (link.me)</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>

            <a 
              href="#video-reels-section" 
              class="py-3 px-5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Watch Highlight Reels</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
          </div>

        </div>
      </div>

    </div>
  `;
}
