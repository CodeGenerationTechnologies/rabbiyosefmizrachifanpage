// Links Directory Component: Full Listing of Official vs Fan-Based Channels

import { LINKS_DATA, OFFICIAL_LINKME } from '../data/links.js';
import { ICONS } from './Icons.js';

export function renderLinksDirectory(container) {
  let activeFilter = 'all';
  let searchQuery = '';

  container.innerHTML = `
    <!-- SECTION HEADER -->
    <div class="mb-12 text-center max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        Official vs. Fan Community Channels
      </div>
      <h2 class="text-3xl md:text-5xl font-extrabold text-white font-cinzel">
        Complete Digital Presence & Resource Directory
      </h2>
      <p class="text-sm md:text-base text-slate-300 mt-3 leading-relaxed">
        To maintain clarity and authenticity, all channels are categorized between 
        <span class="text-amber-400 font-bold">Sanctioned Official Portals</span> run by Rabbi Yosef Mizrachi & Divine Information, and 
        <span class="text-cyan-400 font-bold">Fan-Curated Pages</span> operated by the global student community.
      </p>
    </div>

    <!-- CONTROLS BAR: SEARCH & FILTER TABS -->
    <div class="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 bg-[#0c1228]/80 backdrop-blur-xl p-3 md:p-4 rounded-2xl border border-slate-800 shadow-xl">
      
      <!-- Filter Tabs -->
      <div class="filter-tabs flex flex-wrap items-center gap-2 w-full lg:w-auto">
        <button data-filter="all" class="filter-btn active px-4 py-2 rounded-xl text-xs font-bold transition-all bg-amber-500 text-black shadow-lg shadow-amber-500/20">
          All Channels (${LINKS_DATA.length})
        </button>
        <button data-filter="official" class="filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900/80 text-slate-300 hover:text-amber-300 hover:bg-slate-800 border border-slate-800">
          👑 Official Verified (${LINKS_DATA.filter(l => l.isOfficial).length})
        </button>
        <button data-filter="fan" class="filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900/80 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800">
          👥 Fan Page Network (${LINKS_DATA.filter(l => !l.isOfficial).length})
        </button>
        <button data-filter="podcast" class="filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800">
          🎙️ Audio & Podcasts
        </button>
        <button data-filter="app" class="filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800">
          📱 Mobile Apps
        </button>
      </div>

      <!-- Realtime Search Input -->
      <div class="relative w-full lg:w-72">
        <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input 
          id="links-search-input"
          type="text" 
          placeholder="Search platforms, handles..."
          class="w-full pl-10 pr-4 py-2 text-xs bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 transition-all"
        />
      </div>

    </div>

    <!-- LINKS DIRECTORY GRID -->
    <div id="links-cards-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

    <!-- Toast Notification for Copy -->
    <div id="copy-toast" class="fixed bottom-6 right-6 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-amber-400/50 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-2xl transition-all duration-300 opacity-0 pointer-events-none translate-y-4 z-50 flex items-center gap-2">
      <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      Link copied to clipboard!
    </div>
  `;

  const grid = container.querySelector('#links-cards-grid');
  const searchInput = container.querySelector('#links-search-input');
  const filterBtns = container.querySelectorAll('.filter-btn');
  const toast = container.querySelector('#copy-toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2400);
  }

  function renderCards() {
    grid.innerHTML = '';

    const filtered = LINKS_DATA.filter(item => {
      // 1. Filter Tab
      let tabMatch = true;
      if (activeFilter === 'official') tabMatch = item.isOfficial;
      else if (activeFilter === 'fan') tabMatch = !item.isOfficial;
      else if (activeFilter === 'podcast') tabMatch = item.type === 'podcast' || item.type === 'audio';
      else if (activeFilter === 'app') tabMatch = item.type === 'app';

      // 2. Search Query
      let queryMatch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        queryMatch = (
          item.name.toLowerCase().includes(q) ||
          item.handle.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }

      return tabMatch && queryMatch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <svg class="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p class="text-base font-semibold">No channels found matching "${searchQuery}"</p>
          <p class="text-xs text-slate-500 mt-1">Try searching for YouTube, TikTok, Podcast, or Divine Information</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `link-item-card relative group rounded-2xl p-[1px] transition-all duration-300 ${
        item.isOfficial 
          ? 'bg-gradient-to-b from-amber-500/25 hover:from-amber-400/50 to-transparent shadow-lg shadow-amber-950/20' 
          : 'bg-gradient-to-b from-cyan-500/25 hover:from-cyan-400/50 to-transparent shadow-lg shadow-cyan-950/20'
      }`;

      const iconSvg = ICONS[item.icon] || ICONS.globe;

      card.innerHTML = `
        <div class="card-inner relative w-full h-full bg-[#0a0e21]/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1">
          <div>
            <!-- Top Row: Icon + Badge -->
            <div class="flex items-center justify-between mb-4">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                item.isOfficial 
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
              }">
                ${iconSvg}
              </div>

              <!-- Official vs Fan Badge -->
              <span class="px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                item.isOfficial 
                  ? 'bg-amber-950/40 text-amber-300 border-amber-500/40 shadow-sm' 
                  : 'bg-cyan-950/40 text-cyan-300 border-cyan-500/40 shadow-sm'
              } flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full ${item.isOfficial ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400'}"></span>
                ${item.badge}
              </span>
            </div>

            <!-- Title & Handle -->
            <h3 class="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
              ${item.name}
            </h3>
            <p class="text-xs font-mono text-slate-400 mt-0.5 truncate">
              ${item.handle}
            </p>

            <!-- Description -->
            <p class="text-xs text-slate-300/80 mt-3 leading-relaxed">
              ${item.description}
            </p>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <button class="copy-btn px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-800" title="Copy URL">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              <span>Copy</span>
            </button>

            <a 
              href="${item.url}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                item.isOfficial 
                  ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/20' 
                  : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
              }"
            >
              <span>Open Source</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>

        </div>
      `;

      // Copy link listener
      const copyBtn = card.querySelector('.copy-btn');
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.url).then(() => {
          showToast(`Copied ${item.name} link!`);
        });
      });

      grid.appendChild(card);
    });
  }

  // Bind filter events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = 'filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800';
      });
      btn.className = 'filter-btn active px-4 py-2 rounded-xl text-xs font-bold transition-all bg-amber-500 text-black shadow-lg shadow-amber-500/20';
      activeFilter = btn.getAttribute('data-filter');
      renderCards();
    });
  });

  // Bind search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCards();
  });

  // Initial render
  renderCards();
}
