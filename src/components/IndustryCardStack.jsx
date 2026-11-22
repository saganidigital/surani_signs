import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

export default function IndustryCardStack({ industries = [], iconMap = {} }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = industries.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  if (!total) return null;

  const handleAdvance = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="flex flex-col items-center">
      {/* 3D Layered Vertical Shuffle Deck */}
      <div
        className="relative w-full max-w-xl h-[250px] sm:h-[240px] select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {industries.map((ind, index) => {
          const IconComp = iconMap[ind.icon] || Building2;
          const offset = (index - activeIndex + total) % total;

          let cardStyle = {
            transform: 'translate3d(0, 40px, 0) scale(0.86)',
            opacity: 0,
            zIndex: 0,
            pointerEvents: 'none',
          };

          if (offset === 0) {
            cardStyle = {
              transform: 'translate3d(0, 0, 0) scale(1)',
              opacity: 1,
              zIndex: 30,
              pointerEvents: 'auto',
            };
          } else if (offset === 1) {
            cardStyle = {
              transform: 'translate3d(0, 16px, 0) scale(0.95)',
              opacity: 0.9,
              zIndex: 20,
              pointerEvents: 'none',
            };
          } else if (offset === 2) {
            cardStyle = {
              transform: 'translate3d(0, 32px, 0) scale(0.90)',
              opacity: 0.65,
              zIndex: 10,
              pointerEvents: 'none',
            };
          } else if (offset === total - 1) {
            cardStyle = {
              transform: 'translate3d(0, -28px, 0) scale(1.02)',
              opacity: 0,
              zIndex: 35,
              pointerEvents: 'none',
            };
          }

          return (
            <div
              key={ind.name}
              role="button"
              tabIndex={offset === 0 ? 0 : -1}
              aria-hidden={offset !== 0}
              onClick={offset === 0 ? handleAdvance : undefined}
              onKeyDown={
                offset === 0
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleAdvance();
                      }
                    }
                  : undefined
              }
              style={{
                ...cardStyle,
                transition:
                  'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease',
                willChange: 'transform, opacity',
              }}
              className={`absolute inset-x-0 top-0 rounded-3xl bg-white p-7 sm:p-8 border ${
                offset === 0
                  ? 'border-teal-500/35 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] cursor-pointer'
                  : 'border-slate-200/90 shadow-md'
              }`}
            >
              {/* Top Row: Icon + Index Counter */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/12 text-teal-600 flex items-center justify-center">
                  <IconComp className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold tracking-widest text-slate-400 tabular-nums">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>

              {/* Industry Title & Recommended Signage Breakdown */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2.5">
                {ind.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {ind.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Minimal Interactive Dot Indicators */}
      <div
        className="mt-12 flex items-center justify-center gap-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {industries.map((ind, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={ind.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${ind.name}`}
              title={ind.name}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-7 bg-[#00b8a9]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
