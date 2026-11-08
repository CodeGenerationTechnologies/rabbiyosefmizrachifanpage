// Video Card with 3D Tilt and Peak Segment Auto-Play on Hover

export function createVideoCard(video, index) {
  const card = document.createElement('div');
  card.className = 'video-card relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-500';
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

  card.innerHTML = `
    <div class="card-inner relative w-full h-full rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/30 via-slate-800/40 to-slate-950/80 shadow-2xl transition-transform duration-300">
      <div class="card-content relative w-full h-full bg-[#0a0f24]/90 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col">
        
        <!-- Media Container (Thumbnail + Video Preview) -->
        <div class="video-media-wrap relative w-full aspect-video overflow-hidden bg-slate-950">
          
          <!-- Static High-Res Thumbnail Image -->
          <img 
            src="${video.thumbnail}" 
            alt="${video.title}" 
            loading="lazy" 
            class="video-thumb w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <!-- Radial Vignette Overlay -->
          <div class="thumb-overlay absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-transparent to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"></div>

          <!-- Video Preview Container (Injected on Hover) -->
          <div class="video-preview-target absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"></div>

          <!-- Top Badges -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md border ${
              video.isOfficial 
                ? 'border-amber-500/40 text-amber-300' 
                : 'border-cyan-500/40 text-cyan-300'
            } flex items-center gap-1.5 shadow-lg">
              ${video.isOfficial ? '👑 OFFICIAL' : '👥 FAN PAGE'}
            </span>
            <span class="px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700/50">
              ${video.duration || 'Full Lecture'}
            </span>
          </div>

          <!-- Live Hover Equalizer Bar (Hidden by default, shown during hover preview) -->
          <div class="live-status-pill absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <span class="equalizer-bars flex items-end gap-[2px] h-3">
              <span class="bar w-[2px] h-full bg-amber-400 animate-pulse"></span>
              <span class="bar w-[2px] h-2 bg-amber-400 animate-bounce"></span>
              <span class="bar w-[2px] h-3 bg-amber-400 animate-pulse"></span>
            </span>
            <span>Peak Moment (${peakStartDisplay} - ${peakEndDisplay})</span>
          </div>

          <!-- Center Play Button Icon (Fades out when preview plays) -->
          <div class="center-play-badge absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/60 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 pointer-events-none shadow-[0_0_25px_rgba(245,158,11,0.4)]">
            <svg class="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>

          <!-- Dynamic Sheen Overlay -->
          <div class="card-sheen absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
        </div>

        <!-- Details / Content Body -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-semibold text-amber-400/90 tracking-wide uppercase">
                ${video.category}
              </span>
              ${video.views ? `
                <span class="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <svg class="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  ${video.views}
                </span>
              ` : ''}
            </div>

            <h3 class="text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug">
              ${video.title}
            </h3>

            <p class="mt-2 text-xs text-slate-300/80 line-clamp-2 leading-relaxed">
              ${video.description}
            </p>
          </div>

          <!-- Action Footer -->
          <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full ${video.isOfficial ? 'bg-amber-400' : 'bg-cyan-400'}"></span>
              ${video.author}
            </span>
            <span class="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Watch Source
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </span>
          </div>

        </div>
      </div>
    </div>
  `;

  // --- Attach 3D Tilt Physics and Hover Video Preview Controller ---
  setupCardInteractions(card, video);

  return card;
}

function setupCardInteractions(card, video) {
  const cardInner = card.querySelector('.card-inner');
  const target = card.querySelector('.video-preview-target');
  const playBadge = card.querySelector('.center-play-badge');
  const sheen = card.querySelector('.card-sheen');
  let hoverTimeout = null;
  let activeElement = null;

  // 1. 3D Tilt on Mouse Move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    cardInner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    
    // Sheen reflection following cursor
    sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.18), transparent 60%)`;
  });

  card.addEventListener('mouseleave', () => {
    cardInner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    sheen.style.background = 'none';

    // Cancel pending preview start
    clearTimeout(hoverTimeout);

    // Stop and teardown video preview cleanly
    stopPreview();
  });

  // 2. Click to open source in a new tab
  card.addEventListener('click', () => {
    window.open(video.url, '_blank', 'noopener,noreferrer');
  });

  // 3. Hover Video Preview Mechanics (Peak Section)
  card.addEventListener('mouseenter', () => {
    // Delay 250ms to prevent accidental triggers on rapid mouse sweeping
    hoverTimeout = setTimeout(() => {
      startPreview();
    }, 200);
  });

  function startPreview() {
    target.innerHTML = '';
    target.style.opacity = '1';
    playBadge.style.opacity = '0';

    if (video.mp4Preview) {
      // Use direct CDN MP4 video element for instant silky playback
      const videoEl = document.createElement('video');
      videoEl.className = 'w-full h-full object-cover';
      videoEl.src = video.mp4Preview;
      videoEl.muted = true;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.currentTime = video.peakStart || 60;

      // Loop only the peak section
      videoEl.addEventListener('timeupdate', () => {
        if (video.peakEnd && videoEl.currentTime >= video.peakEnd) {
          videoEl.currentTime = video.peakStart || 60;
        }
      });

      target.appendChild(videoEl);
      activeElement = videoEl;
      videoEl.play().catch(() => {});
    } else {
      // Use YouTube iframe embedded player starting at peak moment
      const iframe = document.createElement('iframe');
      iframe.className = 'w-full h-full object-cover pointer-events-none scale-105';
      const peakS = video.peakStart || 60;
      const peakE = video.peakEnd || (peakS + 35);
      iframe.src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&start=${peakS}&end=${peakE}&loop=1&playlist=${video.youtubeId}&modestbranding=1&rel=0&showinfo=0&disablekb=1`;
      iframe.title = video.title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      target.appendChild(iframe);
      activeElement = iframe;
    }
  }

  function stopPreview() {
    target.style.opacity = '0';
    playBadge.style.opacity = '1';
    setTimeout(() => {
      if (activeElement) {
        if (activeElement.tagName === 'VIDEO') {
          activeElement.pause();
          activeElement.src = '';
        }
        target.innerHTML = '';
        activeElement = null;
      }
    }, 300);
  }
}
