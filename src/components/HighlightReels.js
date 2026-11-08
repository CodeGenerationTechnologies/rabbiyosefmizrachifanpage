// Highlight Reels Component: The Kiruv Jukebox & Video Showcase
// Featuring Continuous Floating Vinyl Record Carousel, Honest Metrics, Peak Hover Audio, & Space-Optimized Layout

import { videoFeedService } from '../services/videoFeedService.js';
import { createVideoCard } from './VideoCard.js';

export function renderHighlightReels(container) {
  let isUpdating = false;
  let activeTab = 'all'; // 'all' | 'popular' | 'latest' | 'fan'
  let viewMode = 'jukebox'; // 'jukebox' | 'grid'
  let isPaused = false;
  let marqueeSpeed = 'normal'; // 'slow' | 'normal' | 'fast'
  let currentFeed = null;

  function renderLayout(feed) {
    currentFeed = feed;
    const formattedDate = feed.metadata?.generatedAt 
      ? new Date(feed.metadata.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Today';

    const totalPopular = (feed.popular || []).length;
    const totalLatest = (feed.latest || []).length;
    const totalFan = (feed.fan || []).length;
    const totalCount = totalPopular + totalLatest + totalFan;

    container.innerHTML = `
      <!-- TOP STATUS & HONESTY BAR -->
      <div class="mb-6 p-3 sm:p-4 rounded-2xl bg-[#090e24]/90 border border-slate-800 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div class="flex items-center gap-3">
          <span class="flex h-3 w-3 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Daily Feed Synced: ${formattedDate}
              </span>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                100% HONEST YOUTUBE FIGURES
              </span>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                🔊 PEAK HOVER SOUND ACTIVE
              </span>
            </div>
            <p class="text-[11px] text-slate-400 mt-0.5">
              Verified view counts & likes straight from YouTube. Videos float across screen; hover any record to pause & play sound.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2.5 shrink-0">
          <button id="manual-refresh-feed-btn" class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2">
            <svg class="w-3.5 h-3.5 text-amber-400 ${isUpdating ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>${isUpdating ? 'Refreshing Feed...' : 'Sync Live Videos'}</span>
          </button>
        </div>
      </div>

      <!-- THE KIRUV JUKEBOX BANNER CONSOLE -->
      <div class="relative rounded-3xl p-[1px] bg-gradient-to-r from-amber-500/50 via-yellow-400/80 to-amber-500/50 shadow-2xl mb-8 overflow-hidden">
        <div class="bg-gradient-to-b from-[#0b1028]/98 via-[#060a1d]/98 to-[#030614]/98 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 md:p-8">
          
          <!-- Jukebox Canopy Header -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-amber-500/20">
            <div>
              <div class="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                <span>The Kiruv Turntable • Jukebox Record Player</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ${totalCount} TITLES LOADED
                </span>
              </div>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-white font-cinzel tracking-tight flex items-center gap-3">
                <span>Rabbi Mizrachi Video Jukebox</span>
                <span class="text-2xl sm:text-3xl text-amber-400">📻</span>
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Videos float horizontally across the screen like vinyl records in an illuminated jukebox. <strong class="text-amber-300">Hover over any record</strong> to pause the conveyor, elevate the sleeve, and audition the Rabbi's discourse with authentic sound.
              </p>
            </div>

            <!-- Jukebox Control Cockpit (Pause/Play, Speed, View Mode) -->
            <div class="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
              
              <!-- Floating Marquee Play/Pause Toggle -->
              <button 
                id="jukebox-play-pause-btn" 
                class="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border ${isPaused ? 'border-amber-400 text-amber-400 bg-amber-500/10' : 'border-slate-700 text-slate-200'} text-xs font-bold transition-all flex items-center gap-2 shadow-md"
                title="${isPaused ? 'Resume floating conveyor' : 'Pause floating conveyor'}"
              >
                ${isPaused ? `
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  <span>Conveyor: Paused</span>
                ` : `
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  <span>Conveyor: Floating</span>
                `}
              </button>

              <!-- Speed Selector Button -->
              <button 
                id="jukebox-speed-btn" 
                class="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5"
                title="Adjust carousel glide speed"
              >
                <span>⚡ Speed:</span>
                <span class="font-mono text-amber-300 uppercase text-[11px] font-bold">${marqueeSpeed}</span>
              </button>

              <!-- View Mode Toggle (Jukebox vs Grid) -->
              <div class="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button 
                  id="view-mode-jukebox-btn" 
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === 'jukebox' ? 'bg-amber-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
                  <span>Floating Jukebox</span>
                </button>
                <button 
                  id="view-mode-grid-btn" 
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === 'grid' ? 'bg-amber-500 text-black shadow-md' : 'text-slate-400 hover:text-white'}"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                  <span>Catalog Grid</span>
                </button>
              </div>

            </div>
          </div>

          <!-- Dynamic Category Deck Selector Tabs (Reduces Scrolling) -->
          <div class="mt-4 pt-2 flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <button 
                data-tab="all" 
                class="tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'all' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'}"
              >
                <span>🌟 All Discography</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'all' ? 'bg-black/30 text-black' : 'bg-slate-800 text-slate-300'} font-mono">${totalCount}</span>
              </button>

              <button 
                data-tab="popular" 
                class="tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'popular' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'}"
              >
                <span>🔥 Most Popular Masterpieces</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'popular' ? 'bg-black/30 text-black' : 'bg-slate-800 text-slate-300'} font-mono">${totalPopular}</span>
              </button>

              <button 
                data-tab="latest" 
                class="tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'latest' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'}"
              >
                <span>⚡ Latest 2026 Releases</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'latest' ? 'bg-black/30 text-black' : 'bg-slate-800 text-slate-300'} font-mono">${totalLatest}</span>
              </button>

              <button 
                data-tab="fan" 
                class="tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'fan' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'}"
              >
                <span>👥 Fan Page Viral Shorts</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'fan' ? 'bg-black/30 text-black' : 'bg-slate-800 text-slate-300'} font-mono">${totalFan}</span>
              </button>
            </div>

            <!-- Hover Sound Advice Label -->
            <div class="text-[11px] text-amber-300/80 font-mono hidden sm:flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Hover card = Instant Peak Sound Preview
            </div>
          </div>

        </div>
      </div>

      <!-- JUKEBOX VIEWPORT DISPLAY AREA -->
      <div id="jukebox-viewport-mount" class="relative"></div>
    `;

    mountViewport(feed);
    setupEvents(feed);
  }

  function mountViewport(feed) {
    const mount = container.querySelector('#jukebox-viewport-mount');
    if (!mount) return;
    mount.innerHTML = '';

    const popularVideos = feed.popular || [];
    const latestVideos = feed.latest || [];
    const fanVideos = feed.fan || [];

    // Filter videos based on active tab
    let selectedVideos = [];
    if (activeTab === 'popular') selectedVideos = popularVideos;
    else if (activeTab === 'latest') selectedVideos = latestVideos;
    else if (activeTab === 'fan') selectedVideos = fanVideos;
    else selectedVideos = [...popularVideos, ...latestVideos, ...fanVideos];

    if (viewMode === 'jukebox') {
      // 1. FLOATING JUKEBOX BANNER MODE (Continuous Screen-Space Flow)
      mount.innerHTML = `
        <div class="jukebox-marquee-container relative w-full overflow-hidden rounded-3xl py-6 px-1 ${isPaused ? 'jukebox-paused' : ''}">
          
          <!-- Top Illuminated Jukebox Rail -->
          <div class="jukebox-rail h-1.5 w-full rounded-full mb-6"></div>

          <!-- Counter-Floating Dual Tracks (When 'All' tab is selected) or Single Focused Track -->
          ${activeTab === 'all' ? `
            <!-- TRACK 1: Seminars & Master Lectures (Gliding Left) -->
            <div class="mb-8">
              <div class="flex items-center justify-between px-2 mb-3">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                  DECK A: FOUNDATIONAL MASTER LECTURES & HIGH-VIEW RECORD RELEASES
                </span>
                <span class="text-[10px] text-slate-400 font-mono hidden sm:inline">GLIDING WEST &bull; HOVER TO FREEZE</span>
              </div>
              <div class="overflow-hidden py-4 -my-4 mask-fade-edges">
                <div id="track-deck-a" class="jukebox-track-left"></div>
              </div>
            </div>

            <!-- Mid Rail -->
            <div class="jukebox-rail h-[1px] w-full rounded-full my-6 opacity-40"></div>

            <!-- TRACK 2: Fresh Lectures & Fan Page Debates (Gliding Right) -->
            <div>
              <div class="flex items-center justify-between px-2 mb-3">
                <span class="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                  DECK B: LATEST RELEASES, VIRAL SHORTS & JEW/GENTILE DISCOURSES
                </span>
                <span class="text-[10px] text-slate-400 font-mono hidden sm:inline">GLIDING EAST &bull; HOVER TO FREEZE</span>
              </div>
              <div class="overflow-hidden py-4 -my-4 mask-fade-edges">
                <div id="track-deck-b" class="jukebox-track-right"></div>
              </div>
            </div>
          ` : `
            <!-- SINGLE FOCUSED TRACK -->
            <div class="py-2">
              <div class="overflow-hidden py-4 -my-4 mask-fade-edges">
                <div id="track-deck-focused" class="jukebox-track-left"></div>
              </div>
            </div>
          `}

          <!-- Bottom Illuminated Jukebox Rail -->
          <div class="jukebox-rail h-1.5 w-full rounded-full mt-6"></div>

        </div>
      `;

      // Apply dynamic animation duration based on speed
      const durationLeft = marqueeSpeed === 'slow' ? '90s' : marqueeSpeed === 'fast' ? '40s' : '60s';
      const durationRight = marqueeSpeed === 'slow' ? '105s' : marqueeSpeed === 'fast' ? '48s' : '70s';

      if (activeTab === 'all') {
        const deckA = mount.querySelector('#track-deck-a');
        const deckB = mount.querySelector('#track-deck-b');

        if (deckA) {
          deckA.style.animationDuration = durationLeft;
          // Render duplicated set for seamless loop
          const deckAVideos = [...popularVideos, ...latestVideos.slice(0, 3)];
          const fullDeckA = [...deckAVideos, ...deckAVideos];
          fullDeckA.forEach((vid, i) => {
            const card = createVideoCard(vid, i % deckAVideos.length, { isJukebox: true });
            card.classList.add('jukebox-card');
            deckA.appendChild(card);
          });
        }

        if (deckB) {
          deckB.style.animationDuration = durationRight;
          const deckBVideos = [...latestVideos.slice(3), ...fanVideos, ...popularVideos.slice(0, 2)];
          const fullDeckB = [...deckBVideos, ...deckBVideos];
          fullDeckB.forEach((vid, i) => {
            const card = createVideoCard(vid, i % deckBVideos.length, { isJukebox: true });
            card.classList.add('jukebox-card');
            deckB.appendChild(card);
          });
        }
      } else {
        const focusedDeck = mount.querySelector('#track-deck-focused');
        if (focusedDeck) {
          focusedDeck.style.animationDuration = durationLeft;
          const fullFocused = [...selectedVideos, ...selectedVideos];
          fullFocused.forEach((vid, i) => {
            const card = createVideoCard(vid, i % selectedVideos.length, { isJukebox: true });
            card.classList.add('jukebox-card');
            focusedDeck.appendChild(card);
          });
        }
      }

    } else {
      // 2. COMPACT CATALOG GRID MODE (Space-Optimized Multi-Column View)
      mount.innerHTML = `
        <div class="p-4 sm:p-6 rounded-3xl bg-[#070b20]/90 border border-slate-800 backdrop-blur-xl">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 class="text-xl font-bold text-white font-cinzel">
                ${activeTab === 'all' ? 'Complete Discography Catalog' : activeTab === 'popular' ? 'Most Popular Landmark Seminars' : activeTab === 'latest' ? 'Latest 2026 Lecture Releases' : 'Fan Page Viral Shorts'}
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">Showing ${selectedVideos.length} authenticated records with honest YouTube figures.</p>
            </div>
          </div>
          <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
        </div>
      `;

      const grid = mount.querySelector('#catalog-grid');
      selectedVideos.forEach((video, idx) => {
        grid.appendChild(createVideoCard(video, idx));
      });
    }
  }

  function setupEvents(feed) {
    // 1. Tab buttons
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        renderLayout(feed);
      });
    });

    // 2. View Mode buttons
    const jukBtn = container.querySelector('#view-mode-jukebox-btn');
    const gridBtn = container.querySelector('#view-mode-grid-btn');
    if (jukBtn) {
      jukBtn.addEventListener('click', () => {
        if (viewMode !== 'jukebox') {
          viewMode = 'jukebox';
          renderLayout(feed);
        }
      });
    }
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        if (viewMode !== 'grid') {
          viewMode = 'grid';
          renderLayout(feed);
        }
      });
    }

    // 3. Play / Pause Conveyor Toggle
    const pauseBtn = container.querySelector('#jukebox-play-pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        const containerEl = container.querySelector('.jukebox-marquee-container');
        if (containerEl) {
          if (isPaused) containerEl.classList.add('jukebox-paused');
          else containerEl.classList.remove('jukebox-paused');
        }
        renderLayout(feed);
      });
    }

    // 4. Speed Selector Toggle
    const speedBtn = container.querySelector('#jukebox-speed-btn');
    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        if (marqueeSpeed === 'slow') marqueeSpeed = 'normal';
        else if (marqueeSpeed === 'normal') marqueeSpeed = 'fast';
        else marqueeSpeed = 'slow';
        renderLayout(feed);
      });
    }

    // 5. Manual Refresh
    const refreshBtn = container.querySelector('#manual-refresh-feed-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        isUpdating = true;
        renderLayout(feed);
        await videoFeedService.revalidateFeed();
        isUpdating = false;
      });
    }
  }

  // Load initial feed
  videoFeedService.getFeed().then(feed => {
    renderLayout(feed);
  });

  // Live background update subscription
  videoFeedService.subscribe(freshFeed => {
    renderLayout(freshFeed);
  });
}
