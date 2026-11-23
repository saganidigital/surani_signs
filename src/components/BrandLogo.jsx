import React, { useId } from 'react';

const SIZE_CLASSES = {
  nav: {
    emblem: 'w-7 h-7 min-[390px]:w-8 min-[390px]:h-8 sm:w-10 sm:h-10',
    wordmark: 'text-[17px] min-[390px]:text-[19px] sm:text-2xl',
    gap: 'gap-2 sm:gap-2.5',
  },
  drawer: {
    emblem: 'w-7 h-7',
    wordmark: 'text-lg',
    gap: 'gap-2',
  },
  md: {
    emblem: 'w-9 h-9',
    wordmark: 'text-2xl',
    gap: 'gap-2.5',
  },
  lg: {
    emblem: 'w-11 h-11 sm:w-13 sm:h-13',
    wordmark: 'text-3xl sm:text-4xl',
    gap: 'gap-3',
  },
};

export default function BrandLogo({ size = 'nav', variant = 'auto', className = '' }) {
  const uid = useId().replace(/:/g, '');
  const ringGradId = `p4lRing-${uid}`;
  const tealGradId = `p4lTeal-${uid}`;
  const preset = SIZE_CLASSES[size] || SIZE_CLASSES.nav;
  const isDarkBg = variant === 'dark';

  return (
    <span
      className={`inline-flex items-center select-none whitespace-nowrap ${preset.gap} ${className}`}
    >
      {/* Circular Geometric Patch4Less Emblem */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${preset.emblem} shrink-0 transition-transform duration-300 group-hover:scale-[1.03]`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={tealGradId} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5d1" />
            <stop offset="55%" stopColor="#00b8a9" />
            <stop offset="100%" stopColor="#0d8a80" />
          </linearGradient>
          <linearGradient id={ringGradId} x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDarkBg ? '#cbd5e1' : '#1a1d24'} />
            <stop offset="100%" stopColor={isDarkBg ? '#ffffff' : '#334155'} />
          </linearGradient>
        </defs>

        {/* Outer Architectural Ring */}
        <circle
          cx="32"
          cy="32"
          r="28.5"
          stroke={isDarkBg ? '#e2e8f0' : 'currentColor'}
          strokeWidth="3"
          className={isDarkBg ? '' : 'text-[#1a1d24] dark:text-slate-200'}
        />

        {/* Subtle Inner Stitch Accent */}
        <circle
          cx="32"
          cy="32"
          r="23.5"
          stroke={`url(#${tealGradId})`}
          strokeWidth="1.25"
          strokeDasharray="3.5 3"
          opacity="0.7"
        />

        {/* Dynamic Stylized "P" Ribbon */}
        <path
          d="M23 47V18.5C23 17.12 24.12 16 25.5 16H35.5C41.85 16 46.5 20.1 46.5 25.75C46.5 31.4 41.85 35.5 35.5 35.5H28.5"
          stroke={`url(#${tealGradId})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 35.5H28.5"
          stroke={isDarkBg ? '#ffffff' : 'currentColor'}
          strokeWidth="5.5"
          strokeLinecap="round"
          className={isDarkBg ? '' : 'text-[#1a1d24] dark:text-white'}
        />
      </svg>

      {/* Geometric Wordmark */}
      <span
        style={{ fontFamily: 'var(--font-heading)' }}
        className={`font-black uppercase tracking-[0.06em] leading-none ${preset.wordmark}`}
      >
        <span className="bg-gradient-to-r from-[#00a89a] via-[#00b8a9] to-[#00d4c3] bg-clip-text text-transparent">
          PATCH
        </span>
        <span className={isDarkBg ? 'text-white' : 'text-slate-900 dark:text-white'}>
          4
        </span>
        <span className="bg-gradient-to-r from-[#00b8a9] to-[#00d4c3] bg-clip-text text-transparent">
          LESS
        </span>
      </span>
    </span>
  );
}
