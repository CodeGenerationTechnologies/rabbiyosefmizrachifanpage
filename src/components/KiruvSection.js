// Kiruv Section: Bringing Jew & Gentile to the Word of Hashem

import { KIRUV_DATA } from '../data/kiruv.js';

export function renderKiruvSection(container) {
  let currentQuoteIndex = 0;

  container.innerHTML = `
    <!-- Top Sacred Heading -->
    <div class="text-center max-w-4xl mx-auto mb-16">
      <div class="inline-block mb-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 font-david text-base md:text-lg tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.2)]">
        ${KIRUV_DATA.hebrewTitle}
      </div>
      <p class="text-xs text-amber-400/80 font-mono italic mb-4">
        "${KIRUV_DATA.hebrewTranslation}"
      </p>

      <h2 class="text-3xl md:text-5xl font-extrabold text-white font-cinzel leading-tight">
        The Kiruv Mission: Awakening Every Soul
      </h2>
      <p class="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-light">
        ${KIRUV_DATA.missionStatement}
      </p>
    </div>

    <!-- The 4 Core Pillars of Divine Outreach Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
      ${KIRUV_DATA.pillars.map((pillar, idx) => `
        <div class="pillar-card relative group rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/20 via-slate-800/40 to-transparent hover:from-amber-400/50 transition-all duration-500">
          <div class="w-full h-full bg-[#0a0f24]/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between group-hover:-translate-y-1 transition-transform">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  Pillar 0${idx + 1}
                </span>
                <span class="font-david text-sm text-amber-400/70">
                  ${pillar.hebrew}
                </span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors font-cinzel">
                ${pillar.title}
              </h3>
              <p class="text-xs font-semibold text-amber-400/90 mt-1 mb-4">
                ${pillar.subtitle}
              </p>
              <p class="text-sm text-slate-300/90 leading-relaxed">
                ${pillar.description}
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span class="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Universal Hashem Outreach
              </span>
              <span class="text-amber-400/60 group-hover:text-amber-300 text-xs font-bold flex items-center gap-1 transition-colors">
                Learn More →
              </span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Special Highlight: The 7 Noahide Laws (God's Universal Covenant for Gentiles) -->
    <div class="relative rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/30 via-amber-500/40 to-purple-500/30 shadow-2xl mb-20 overflow-hidden">
      <div class="relative bg-[#070b1b]/95 backdrop-blur-2xl rounded-3xl p-8 md:p-12">
        
        <div class="max-w-3xl mb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
            Universal Covenant For All Humanity
          </div>
          <h3 class="text-2xl md:text-4xl font-extrabold text-white font-cinzel">
            The 7 Universal Noahide Laws: A Holy Path for All Mankind
          </h3>
          <p class="text-sm md:text-base text-slate-300 mt-3 leading-relaxed">
            Rabbi Mizrachi emphasizes in hundreds of public forums: <strong class="text-cyan-300">Non-Jews do not need to convert to be loved by God or merit eternal life.</strong> Hashem gave humanity the Seven Universal Noahide Laws. A righteous Gentile who observes these seven commandments merits a high portion in the World to Come (Olam HaBa).
          </p>
        </div>

        <!-- 7 Laws Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${KIRUV_DATA.noahideLaws.map(law => `
            <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-400/40 transition-colors">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center border border-cyan-500/40">
                  0${law.number}
                </span>
                <h4 class="text-sm font-bold text-white">${law.name}</h4>
              </div>
              <p class="text-xs text-slate-300/80 leading-relaxed">${law.desc}</p>
            </div>
          `).join('')}
          <div class="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-950/20 border border-amber-500/40 flex flex-col justify-center">
            <span class="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Maimonides (Rambam) Ruling:</span>
            <p class="text-xs text-amber-200/90 italic">
              "Any person from the nations of the world who accepts the seven Noahide commandments and is meticulous in their observance is considered among the pious of the nations of the world, and has a share in the World to Come."
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Interactive Wisdom Quote Carousel -->
    <div class="relative max-w-3xl mx-auto text-center p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-black/90 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
      <svg class="w-10 h-10 mx-auto text-amber-400/40 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
      
      <div id="quote-display-wrap" class="min-h-[110px] flex items-center justify-center transition-opacity duration-300">
        <blockquote id="quote-text" class="text-base md:text-xl font-medium text-white italic leading-relaxed">
          "${KIRUV_DATA.quotes[0].quote}"
        </blockquote>
      </div>

      <div class="mt-4 flex items-center justify-center gap-2">
        <div class="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
        <p id="quote-source" class="text-xs font-bold text-amber-400 uppercase tracking-widest">
          — ${KIRUV_DATA.quotes[0].source}
        </p>
      </div>

      <!-- Navigation Arrows -->
      <div class="mt-6 flex items-center justify-center gap-3">
        <button id="prev-quote-btn" class="w-9 h-9 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-300 transition-colors flex items-center justify-center border border-slate-700" title="Previous Quote">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <span id="quote-counter" class="text-xs text-slate-400 font-mono">1 / ${KIRUV_DATA.quotes.length}</span>
        <button id="next-quote-btn" class="w-9 h-9 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-300 transition-colors flex items-center justify-center border border-slate-700" title="Next Quote">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;

  // Quote carousel logic
  const textEl = container.querySelector('#quote-text');
  const sourceEl = container.querySelector('#quote-source');
  const counterEl = container.querySelector('#quote-counter');
  const wrapEl = container.querySelector('#quote-display-wrap');
  const prevBtn = container.querySelector('#prev-quote-btn');
  const nextBtn = container.querySelector('#next-quote-btn');

  function updateQuote(newIdx) {
    wrapEl.style.opacity = '0';
    setTimeout(() => {
      currentQuoteIndex = (newIdx + KIRUV_DATA.quotes.length) % KIRUV_DATA.quotes.length;
      textEl.textContent = `"${KIRUV_DATA.quotes[currentQuoteIndex].quote}"`;
      sourceEl.textContent = `— ${KIRUV_DATA.quotes[currentQuoteIndex].source}`;
      counterEl.textContent = `${currentQuoteIndex + 1} / ${KIRUV_DATA.quotes.length}`;
      wrapEl.style.opacity = '1';
    }, 200);
  }

  prevBtn.addEventListener('click', () => updateQuote(currentQuoteIndex - 1));
  nextBtn.addEventListener('click', () => updateQuote(currentQuoteIndex + 1));
}
