// Main Application Entry Point

import { ThreeCanvas } from './components/ThreeCanvas.js';
import { AudioExperience } from './components/AudioExperience.js';
import { renderLinkMeHero } from './components/LinkMeHero.js';
import { renderHighlightReels } from './components/HighlightReels.js';
import { renderKiruvSection } from './components/KiruvSection.js';
import { renderLinksDirectory } from './components/LinksDirectory.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Cosmic Background Canvas
  try {
    new ThreeCanvas('three-bg-canvas');
  } catch (err) {
    console.warn('WebGL initialization fallback:', err);
  }

  // 2. Render Hero & LinkMe Showcase
  const heroContainer = document.getElementById('hero-section');
  if (heroContainer) renderLinkMeHero(heroContainer);

  // 3. Render Highlight Reels (Latest, Popular, Fan Highlights with Hover Preview)
  const reelsContainer = document.getElementById('video-reels-section');
  if (reelsContainer) renderHighlightReels(reelsContainer);

  // 4. Render Kiruv: Jew & Gentile Section
  const kiruvContainer = document.getElementById('kiruv-mission-section');
  if (kiruvContainer) renderKiruvSection(kiruvContainer);

  // 5. Render Full Official vs Fan Links Directory
  const linksContainer = document.getElementById('links-directory-section');
  if (linksContainer) renderLinksDirectory(linksContainer);

  // 6. Audio Experience Setup (Web Audio API 432Hz Sacred Resonance)
  const audioExp = new AudioExperience();
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundLabel = document.getElementById('sound-label');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isPlaying = audioExp.toggle();
      if (isPlaying) {
        soundBtn.classList.add('bg-amber-500/20', 'border-amber-400', 'text-amber-400');
        soundLabel.textContent = 'Audio: 432Hz Playing';
      } else {
        soundBtn.classList.remove('bg-amber-500/20', 'border-amber-400', 'text-amber-400');
        soundLabel.textContent = 'Audio: Off';
      }
    });
  }

  // 7. Copy Official LinkMe CTA
  const copyLinkMeBtn = document.getElementById('copy-linkme-btn');
  if (copyLinkMeBtn) {
    copyLinkMeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('https://link.me/rabbiyosefmizrachi').then(() => {
        const originalText = copyLinkMeBtn.innerHTML;
        copyLinkMeBtn.innerHTML = `
          <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          Copied!
        `;
        setTimeout(() => {
          copyLinkMeBtn.innerHTML = originalText;
        }, 2000);
      });
    });
  }

  // 8. Share & QR Modal Handlers
  const shareBtn = document.getElementById('share-modal-btn');
  const modalOverlay = document.getElementById('share-modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalCopyLinkme = document.getElementById('modal-copy-linkme-btn');
  const modalCopySite = document.getElementById('modal-copy-site-btn');

  function openModal() {
    modalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    modalOverlay.classList.add('opacity-100');
    modalOverlay.querySelector('div').classList.remove('scale-95');
    modalOverlay.querySelector('div').classList.add('scale-100');
  }

  function closeModal() {
    modalOverlay.classList.add('opacity-0', 'pointer-events-none');
    modalOverlay.classList.remove('opacity-100');
    modalOverlay.querySelector('div').classList.add('scale-95');
    modalOverlay.querySelector('div').classList.remove('scale-100');
  }

  if (shareBtn) shareBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  if (modalCopyLinkme) {
    modalCopyLinkme.addEventListener('click', () => {
      navigator.clipboard.writeText('https://link.me/rabbiyosefmizrachi').then(() => {
        modalCopyLinkme.textContent = '✓ Copied Official LinkMe URL!';
        setTimeout(() => {
          modalCopyLinkme.textContent = 'Copy Official LinkMe: link.me/rabbiyosefmizrachi';
        }, 2200);
      });
    });
  }

  if (modalCopySite) {
    modalCopySite.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        modalCopySite.textContent = '✓ Copied Website URL!';
        setTimeout(() => {
          modalCopySite.textContent = 'Copy Website URL';
        }, 2200);
      });
    });
  }
});
