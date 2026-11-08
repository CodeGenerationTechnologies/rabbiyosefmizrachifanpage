// Animated Sacred Menorah & Holy Flame Logo Component
// Inspired by the sacred Kiruv flame of Torah and outreach

export function createAnimatedLogo({ size = 'md', className = '' } = {}) {
  const sizeMap = {
    sm: { width: 40, height: 40, flameSize: 22 },
    md: { width: 52, height: 52, flameSize: 28 },
    lg: { width: 84, height: 84, flameSize: 46 },
    xl: { width: 110, height: 110, flameSize: 60 }
  };

  const s = sizeMap[size] || sizeMap.md;

  const wrap = document.createElement('div');
  wrap.className = `animated-logo-wrap relative flex items-center justify-center shrink-0 cursor-pointer select-none group ${className}`;
  wrap.style.width = `${s.width}px`;
  wrap.style.height = `${s.height}px`;

  wrap.innerHTML = `
    <!-- Ambient Holy Light Aura (Pulsing Glow behind Menorah) -->
    <div class="absolute inset-0 m-auto w-[120%] h-[120%] rounded-full bg-gradient-to-t from-orange-600/30 via-amber-500/25 to-yellow-400/20 blur-md animate-sacred-aura pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>

    <!-- Sacred Menorah Structure & Living Flame SVG -->
    <svg 
      class="relative w-full h-full drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)] transition-transform duration-500 group-hover:scale-105" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Outer Flame Gradient -->
        <linearGradient id="flameGradOuter" x1="100" y1="30" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffedd5" />
          <stop offset="25%" stop-color="#fbbf24" />
          <stop offset="65%" stop-color="#f97316" />
          <stop offset="100%" stop-color="#ea580c" />
        </linearGradient>

        <!-- Inner Holy Spark Gradient -->
        <linearGradient id="flameGradInner" x1="100" y1="45" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="40%" stop-color="#fef08a" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>

        <!-- Royal Indigo / Sapphire Menorah Base Gradient -->
        <linearGradient id="menorahBranchGrad" x1="30" y1="130" x2="170" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#3b3780" />
          <stop offset="25%" stop-color="#4e489c" />
          <stop offset="50%" stop-color="#635cb5" />
          <stop offset="75%" stop-color="#4e489c" />
          <stop offset="100%" stop-color="#3b3780" />
        </linearGradient>

        <!-- Flame Glow Filter -->
        <filter id="flameGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- 1. The Holy Central Flame (Living, breathing flame of Hashem) -->
      <g class="animate-sacred-flame origin-bottom">
        <!-- Outer Dancing Flame Silhouette -->
        <path 
          d="M100 32C96 48 83 70 83 91C83 110 93 122 100 124C107 122 117 110 117 91C117 70 104 48 100 32Z" 
          fill="url(#flameGradOuter)"
          filter="url(#flameGlow)"
        />

        <!-- Inner Luminous Flame Teardrop -->
        <path 
          class="animate-inner-flame origin-bottom"
          d="M100 52C98 62 90 77 90 92C90 106 96 114 100 116C104 114 110 106 110 92C110 77 102 62 100 52Z" 
          fill="url(#flameGradInner)" 
        />

        <!-- Ascending Holy Light Tongue -->
        <path 
          d="M99 44C98.5 50 96 60 97.5 68C99 76 102.5 73 103 68C103.5 63 101.5 50 99 44Z" 
          fill="#ffffff"
          opacity="0.9"
        />
      </g>

      <!-- 2. Sacred Menorah Outstretched Arms & Stem (Royal Indigo/Violet) -->
      <g class="menorah-branches">
        <!-- Left Wing Outer Branch -->
        <path 
          d="M20 74H32C32 98 44 118 64 126L58 135C34 125 20 101 20 74Z" 
          fill="url(#menorahBranchGrad)" 
        />

        <!-- Left Wing Middle Branch -->
        <path 
          d="M40 74H52C52 92 60 108 76 116L70 125C50 115 40 96 40 74Z" 
          fill="url(#menorahBranchGrad)" 
        />

        <!-- Left Wing Inner Branch -->
        <path 
          d="M60 74H72C72 86 78 97 88 104L83 113C70 104 60 90 60 74Z" 
          fill="url(#menorahBranchGrad)" 
        />

        <!-- Right Wing Inner Branch -->
        <path 
          d="M128 74H140C140 90 130 104 117 113L112 104C122 97 128 86 128 74Z" 
          fill="url(#menorahBranchGrad)" 
        />

        <!-- Right Wing Middle Branch -->
        <path 
          d="M148 74H160C160 96 150 115 130 125L124 116C140 108 148 92 148 74Z" 
          fill="url(#menorahBranchGrad)" 
        />

        <!-- Right Wing Outer Branch -->
        <path 
          d="M168 74H180C180 101 166 125 142 135L136 126C156 118 168 98 168 74Z" 
          fill="url(#menorahBranchGrad)" 
        />

        <!-- Central Supporting Basin & Wings Connector -->
        <path 
          d="M58 135C70 141 85 144 100 144C115 144 130 141 142 135L144 144C131 151 116 154 100 154C84 154 69 151 56 144L58 135Z" 
          fill="url(#menorahBranchGrad)" 
        />

        <!-- Central Vertical Stem & Base Foot -->
        <path 
          d="M95 146H105V174H124V182H76V174H95V146Z" 
          fill="url(#menorahBranchGrad)" 
        />
      </g>
    </svg>
  `;

  return wrap;
}
