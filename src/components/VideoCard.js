// Video Card with Jukebox Vinyl Record Styling, Exact Honest Metrics & Hover Audio Playback

export function createVideoCard(video, index, { isJukebox = false } = {}) {
  const card = document.createElement('div');
  card.className = `video-card relative group rounded-2xl cursor-pointer select-none transition-all duration-300 ${
    isJukebox ? 'w-[300px] sm:w-[340px] shrink-0' : 'w-full'
  }`;
  card.setAttribute('data-video-id', video.id);
  card.setAttribute('data-url', video.url);

  // Format peak timestamp for user display
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const peakStartDisplay = formatTime(video.peakStart);
  const peakEndDisplay = formatTime(video.peakEnd);

  // Honest, exact verified metrics
  const metricsDisplay = video.exactMetrics || (video.viewsCount ? `${video.viewsCount.toLocaleString()} views` : 'Verified Lecture');

  card.innerHTML = `
    <!-- Jukebox Vinyl Record Sleeve Tab (Pops up on hover like selecting a vinyl record) -->
    <div class="vinyl-record-disc absolute -top-4 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-t-full border border-amber-500/40 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all duration-300 pointer-events-none flex items-center justify-center shadow-lg shadow-black">
      <div class="w-8 h-8 rounded-full border border-amber-400/50 bg-[#090e24] flex items-center justify-center text-[9px] text-amber-300 font-bold font-mono">
        TRACK #${(index + 1) < 10 ? '0' : ''}${index + 1}
      </div>
    </div>

    <!-- Main Card Body -->
    <div class="card-inner relative w-full h-full rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/35 via-slate-800/50 to-slate-950/90 shadow-2xl transition-all duration-300 group-hover:shadow-[0_15px_35px_-5px_rgba(245,158,11,0.35)]">
      <div class="card-content relative w-full h-full bg-[#0a0f24]/95 backdrop-blur-2xl rounded-2xl overflow-hidden flex flex-col">
        
        <!-- Media Container (Thumbnail + Video Preview with Audio) -->
        <div class="video-media-wrap relative w-full aspect-video overflow-hidden bg-slate-950">
          
          <!-- Static High-Res Thumbnail Image -->
          <img 
            src="${video.thumbnail}" 
            alt="${video.title}" 
            loading="lazy" 
            class="video-thumb w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <!-- Radial Vignette Overlay -->
          <div class="thumb-overlay absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-transparent to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-30"></div>

          <!-- Video Preview Container (Injected on Hover with Audio) -->
          <div class="video-preview-target absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"></div>

          <!-- Top Badges -->
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-black/80 backdrop-blur-md border ${
              video.isOfficial 
                ? 'border-amber-500/50 text-amber-300' 
                : 'border-cyan-500/50 text-cyan-300'
            } flex items-center gap-1 shadow-md">
              ${video.isOfficial ? '👑 OFFICIAL' : '👥 FAN PAGE'}
            </span>
            <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-900/90 backdrop-blur-md text-slate-200 border border-slate-700/70 font-mono">
              ${video.duration || 'Full Lecture'}
            </span>
          </div>

          <!-- Live Audio Indicator Pill (Active when sound plays on hover) -->
          <div class="live-status-pill absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between px-2.5 py-1 rounded-full bg-black/90 backdrop-blur-md border border-amber-400/60 text-amber-300 text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg">
            <span class="flex items-center gap-1.5 text-emerald-400">
              <svg class="w-3.5 h-3.5 fill-current animate-pulse shrink-0" viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 9h-3.5v-4.5h3.5l4.5-4.5v13.5l-4.5-4.5z"/></svg>
              <span class="sound-label-text truncate">Sound Playing (${peakStartDisplay})</span>
            </span>
            <span class="equalizer-bars flex items-end gap-[2px] h-3 shrink-0">
              <span class="bar w-[2px] h-full bg-amber-400 animate-bar-1"></span>
              <span class="bar w-[2px] h-2 bg-amber-400 animate-bar-2"></span>
              <span class="bar w-[2px] h-3 bg-amber-400 animate-bar-3"></span>
            </span>
          </div>

          <!-- Center Play Button Icon (Fades out when preview plays) -->
          <div class="center-play-badge absolute inset-0 m-auto w-11 h-11 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/70 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 pointer-events-none shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>

          <!-- Dynamic Sheen Overlay -->
          <div class="card-sheen absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
        </div>

        <!-- Details / Content Body -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <!-- Category & 100% Honest YouTube Metrics -->
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-[11px] font-bold text-amber-400 tracking-wide uppercase truncate">
                ${video.category}
              </span>
              <span class="text-[10px] text-slate-300 font-mono font-medium shrink-0 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800 flex items-center gap-1" title="Honest YouTube Figures">
                <svg class="w-2.5 h-2.5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                ${metricsDisplay}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug">
              ${video.title}
            </h3>

            <!-- Description -->
            <p class="mt-1.5 text-xs text-slate-300 leading-relaxed line-clamp-2">
              ${video.description}
            </p>
          </div>

          <!-- Action Footer -->
          <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium truncate max-w-[170px]">
              <span class="w-1.5 h-1.5 rounded-full ${video.isOfficial ? 'bg-amber-400' : 'bg-cyan-400'} shrink-0"></span>
              <span class="truncate">${video.author}</span>
            </span>
            <span class="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
              Watch Source
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </span>
          </div>

        </div>
      </div>
    </div>
  `;

  setupCardInteractions(card, video);
  return card;
}

function setupCardInteractions(card, video) {
  const cardInner = card.querySelector('.card-inner');
  const target = card.querySelector('.video-preview-target');
  const playBadge = card.querySelector('.center-play-badge');
  const sheen = card.querySelector('.card-sheen');
  const soundLabel = card.querySelector('.sound-label-text');
  let hoverTimeout = null;
  let activeElement = null;

  // 1. Subtle 3D Tilt on Mouse Move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    cardInner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.03)`;
    sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.16), transparent 60%)`;
  });

  card.addEventListener('mouseleave', () => {
    cardInner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
    sheen.style.background = 'none';

    clearTimeout(hoverTimeout);
    stopPreview();
  });

  // 2. Click to open source in a new tab
  card.addEventListener('click', () => {
    window.open(video.url, '_blank', 'noopener,noreferrer');
  });

  // 3. Hover Video Preview Mechanics with SOUND
  card.addEventListener('mouseenter', () => {
    hoverTimeout = setTimeout(() => {
      startPreview();
    }, 180);
  });

  function startPreview() {
    target.innerHTML = '';
    target.style.opacity = '1';
    playBadge.style.opacity = '0';

    // Duck ambient background music so the video audio is clear
    if (window.audioExperience && typeof window.audioExperience.duck === 'function') {
      window.audioExperience.duck();
    }

    if (video.mp4Preview) {
      // Direct CDN MP4 with Unmuted Audio
      const videoEl = document.createElement('video');
      videoEl.className = 'w-full h-full object-cover';
      videoEl.src = video.mp4Preview;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.currentTime = video.peakStart || 60;

      // UNMUTED: Sound plays on hover
      videoEl.muted = false;
      videoEl.volume = 0.85;

      videoEl.addEventListener('timeupdate', () => {
        if (video.peakEnd && videoEl.currentTime >= video.peakEnd) {
          videoEl.currentTime = video.peakStart || 60;
        }
      });

      target.appendChild(videoEl);
      activeElement = videoEl;

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoEl.muted = true;
          videoEl.play().catch(() => {});
          if (soundLabel) soundLabel.textContent = 'Audio muted by browser (tap to unmute)';
        });
      }
    } else {
      // YouTube embed with SOUND (mute=0) starting at peak moment
      const iframe = document.createElement('iframe');
      iframe.className = 'w-full h-full object-cover pointer-events-none scale-105';
      const peakS = video.peakStart || 60;
      const peakE = video.peakEnd || (peakS + 35);
      iframe.src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=0&controls=0&start=${peakS}&end=${peakE}&loop=1&playlist=${video.youtubeId}&modestbranding=1&rel=0&showinfo=0&disablekb=1&enablejsapi=1`;
      iframe.title = video.title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      target.appendChild(iframe);
      activeElement = iframe;
    }
  }

  function stopPreview() {
    target.style.opacity = '0';
    playBadge.style.opacity = '1';

    // Restore background sanctuary music volume
    if (window.audioExperience && typeof window.audioExperience.unduck === 'function') {
      window.audioExperience.unduck();
    }

    setTimeout(() => {
      if (activeElement) {
        if (activeElement.tagName === 'VIDEO') {
          activeElement.pause();
          activeElement.muted = true;
          activeElement.src = '';
        }
        target.innerHTML = '';
        activeElement = null;
      }
    }, 250);
  }
}
