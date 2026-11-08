// Highlight Reels Component rendering Latest, Popular, and Fan Video Reels
// Powered by Secure Daily Video Feed Service with Stale-While-Revalidate

import { videoFeedService } from '../services/videoFeedService.js';
import { createVideoCard } from './VideoCard.js';

export function renderHighlightReels(container) {
  let isUpdating = false;

  function renderLayout(feed) {
    const formattedDate = feed.metadata?.generatedAt 
      ? new Date(feed.metadata.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Today';

    container.innerHTML = `
      <!-- TOP STATUS BAR: DAILY SECURE FEED -->
      <div class="mb-12 p-3 sm:p-4 rounded-2xl bg-[#090e24]/90 border border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div class="flex items-center gap-3">
          <span class="flex h-3 w-3 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Daily Feed Synced: ${formattedDate}
              </span>
              <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                🛡️ SECURE CACHE
              </span>
            </div>
            <p class="text-[11px] text-slate-400">
              Validated daily directly from Divine Information & YouTube. Zero client API exposure.
            </p>
          </div>
        </div>

        <button id="manual-refresh-feed-btn" class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2">
          <svg class="w-3.5 h-3.5 text-amber-400 ${isUpdating ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>${isUpdating ? 'Revalidating...' : 'Check for Fresh Videos'}</span>
        </button>
      </div>

      <!-- SECTION 1: LATEST RELEASES -->
      <div class="mb-20">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-amber-500/20 pb-4">
          <div>
            <div class="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Fresh Torah Discourses & Seminars
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-white font-cinzel">
              The Rabbi's Latest Video Releases
            </h2>
            <p class="text-sm text-slate-400 mt-1 max-w-2xl">
              Recent lectures, live broadcasts, and urgent world event forecasts from Rabbi Yosef Mizrachi. Hover any card to preview the peak moment; click to open full lecture.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-amber-300/80 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
              Peak Hover Auto-Play Active
            </span>
          </div>
        </div>

        <!-- Latest Grid -->
        <div id="latest-reels-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
      </div>

      <!-- SECTION 2: MOST POPULAR RELEASES -->
      <div class="mb-20">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-amber-500/20 pb-4">
          <div>
            <div class="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <svg class="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              Milestone Kiruv Seminars
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-white font-cinzel">
              The Rabbi's Most Popular Video Releases
            </h2>
            <p class="text-sm text-slate-400 mt-1 max-w-2xl">
              Landmark lectures with millions of views that have inspired thousands worldwide to return to Hashem and discover undeniable proofs of Torah.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-amber-400/90 font-mono bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
              ★ Millions of Views Worldwide
            </span>
          </div>
        </div>

        <!-- Popular Grid -->
        <div id="popular-reels-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </div>

      <!-- SECTION 3: FAN PAGE HIGHLIGHTS -->
      <div class="mb-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-cyan-500/20 pb-4">
          <div>
            <div class="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              Curated by Rabbi Yosef Mizrachi Fan Page
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-white font-cinzel">
              Fan Page Highlights & Viral Shorts
            </h2>
            <p class="text-sm text-slate-400 mt-1 max-w-2xl">
              Punchy debate breakdowns, scriptural questions, and core teachings addressing Jew & Gentile alike, curated by the <span class="text-cyan-300 font-semibold">@RabbiYosefMizrachiFanPage</span> community.
            </p>
          </div>
          <div>
            <a href="https://www.youtube.com/@RabbiYosefMizrachiFanPage" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-2">
              Visit Fan Channel
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>

        <!-- Fan Grid -->
        <div id="fan-reels-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </div>
    `;

    // Populate grids
    const latestGrid = container.querySelector('#latest-reels-grid');
    (feed.latest || []).forEach((video, idx) => {
      latestGrid.appendChild(createVideoCard(video, idx));
    });

    const popularGrid = container.querySelector('#popular-reels-grid');
    (feed.popular || []).forEach((video, idx) => {
      popularGrid.appendChild(createVideoCard(video, idx));
    });

    const fanGrid = container.querySelector('#fan-reels-grid');
    (feed.fan || []).forEach((video, idx) => {
      fanGrid.appendChild(createVideoCard(video, idx));
    });

    // Manual refresh event listener
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

  // Subscribe to live background updates
  videoFeedService.subscribe(freshFeed => {
    renderLayout(freshFeed);
  });
}
