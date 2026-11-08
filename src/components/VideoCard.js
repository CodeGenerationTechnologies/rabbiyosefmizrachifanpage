// Video Card with 3D Tilt and Peak Segment Auto-Play with SOUND on Hover

export function createVideoCard(video, index) {
  const card = document.createElement('div');
  card.className = 'video-card relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300';
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
      <div class="card-content relative w-full h-full bg-[#0a0f24]/95 backdrop-blur-2xl rounded-2xl overflow-hidden flex flex-col">
        
        <!-- Media Container (Thumbnail + Video Preview with Audio) -->
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
          <div class="video-preview-target absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"></div>

          <!-- Top Badges -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/70 backdrop-blur-md border ${
              video.isOfficial 
                ? 'border-amber-500/40 text-amber-300' 
                : 'border-cyan-500/40 text-cyan-300'
            } flex items-center gap-1.5 shadow-lg">
              ${video.isOfficial ? '👑 OFFICIAL' : '👥 FAN PAGE'}
            </span>
            <span class="px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-900/90 backdrop-blur-md text-slate-300 border border-slate-700/60 font-mono">
              ${video.duration || 'Full Lecture'}
            </span>
          </div>

          <!-- Live Audio Indicator Pill (Active when sound plays on hover) -->
          <div class="live-status-pill absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg shadow-black/80">
            <span class="flex items-center gap-1 text-emerald-400">
              <svg class="w-3.5 h-3.5 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 9h-3.5v-4.5h3.5l4.5-4.5v13.5l-4.5-4.5z"/></svg>
            </span>
            <span class="sound-label-text">Peak Audio Playing (${peakStartDisplay} - ${peakEndDisplay})</span>
            <span class="equalizer-bars flex items-end gap-[2px] h-3">
              <span class="bar w-[2px] h-full bg-amber-400 animate-bar-1"></span>
              <span class="bar w-[2px] h-2 bg-amber-400 animate-bar-2"></span>
              <span class="bar w-[2px] h-3 bg-amber-400 animate-bar-3"></span>
            </span>
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
              <span class="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                ${video.category}
              </span>
              ${video.views ? `
                <span class="text-[11px] text-slate-300 flex items-center gap-1 font-mono font-medium">
                  <svg class="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  ${video.views}
                </span>
              ` : ''}
            </div>

            <h3 class="text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug">
              ${video.title}
            </h3>

            <p class="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-2">
              ${video.description}
            </p>
          </div>

          <!-- Action Footer -->
          <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
              <span class="w-1.5 h-1.5 rounded-full ${video.isOfficial ? 'bg-amber-400' : 'bg-cyan-400'}"></span>
              ${video.author}
            </span>
            <span class="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Watch Source
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </span>
          </div>

        </div>
      </div>
    </div>
  `;

  // Attach 3D Tilt Physics and Hover Video Preview Controller with AUDIO
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

  // 1. 3D Tilt on Mouse Move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    cardInner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
    sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.16), transparent 60%)`;
  });

  card.addEventListener('mouseleave', () => {
    cardInner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
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

      // Loop only peak section
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
          // If browser autoplay restriction blocks unmuted audio on first hover,
          // play muted and allow user interaction to unmute
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
      // mute=0 ensures sound is played
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
