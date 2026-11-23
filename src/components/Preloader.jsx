import React, { useEffect, useRef, useState } from 'react';
import { BUSINESS_INFO } from '../data/siteData';
import { startMediaPreload } from '../utils/mediaPreloader';

const MIN_DISPLAY_MS = 900;
const EXIT_DURATION_MS = 700;

export default function Preloader({ onComplete }) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [displayProgress, setDisplayProgress] = useState(0);
  const [mediaState, setMediaState] = useState({
    progress: 4,
    loadedImages: 0,
    totalImages: 0,
    loadedVideos: 0,
    totalVideos: 0,
    fontsReady: false,
    done: false,
  });
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let cancelled = false;
    let rafId = 0;
    let exitTimer = 0;
    let unmountTimer = 0;

    const startTime = performance.now();
    let latestState = {
      progress: 4,
      loadedImages: 0,
      totalImages: 0,
      loadedVideos: 0,
      totalVideos: 0,
      fontsReady: false,
      done: false,
    };
    let currentProgress = 0;
    let completed = false;

    const unsubscribe = startMediaPreload((nextState) => {
      if (cancelled) return;
      latestState = nextState;
      setMediaState(nextState);
    });

    const tick = (now) => {
      if (cancelled) return;

      const elapsed = now - startTime;
      const minTimelineCap = Math.min(100, Math.round((elapsed / MIN_DISPLAY_MS) * 100));
      const effectiveTarget = latestState.done
        ? Math.min(100, minTimelineCap)
        : Math.min(latestState.progress, 98);

      // Smoothly ease currentProgress toward effectiveTarget
      const delta = effectiveTarget - currentProgress;
      if (delta > 0) {
        currentProgress += Math.max(delta * 0.14, 0.5);
      }
      if (currentProgress > effectiveTarget) {
        currentProgress = effectiveTarget;
      }

      const rounded = Math.min(100, Math.round(currentProgress));
      setDisplayProgress(rounded);

      if (rounded >= 100 && latestState.done && elapsed >= MIN_DISPLAY_MS) {
        if (!completed) {
          completed = true;
          exitTimer = window.setTimeout(() => {
            if (cancelled) return;
            setIsExiting(true);
            document.body.style.overflow = prevOverflow;
            unmountTimer = window.setTimeout(() => {
              if (!cancelled) {
                setIsDone(true);
                onCompleteRef.current?.();
              }
            }, EXIT_DURATION_MS);
          }, 200);
        }
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      unsubscribe();
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
      window.cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, [isDone]);

  if (isDone) return null;

  let statusLabel = 'Preparing Studio...';
  if (displayProgress >= 100 && mediaState.done) {
    statusLabel = 'Ready';
  } else if (mediaState.totalImages > 0 && mediaState.loadedImages < mediaState.totalImages) {
    statusLabel = `Loading Photos (${mediaState.loadedImages}/${mediaState.totalImages})`;
  } else if (mediaState.totalVideos > 0 && mediaState.loadedVideos < mediaState.totalVideos) {
    statusLabel = `Buffering Videos (${mediaState.loadedVideos}/${mediaState.totalVideos})`;
  }

  return (
    <div
      aria-busy={displayProgress < 100}
      aria-label="Loading Surani Signs"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6 bg-white dark:bg-[#0f1218] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
        isExiting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      {/* Subtle Ambient Teal Glow */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#00b8a9]/10 dark:bg-[#00b8a9]/15 blur-3xl pointer-events-none"
      />

      <div
        className={`relative w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-8 transition-opacity duration-300 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Brand Logo */}
        <div className="dark:bg-white/95 dark:px-4 dark:py-2.5 dark:rounded-2xl transition-all duration-300">
          <img
            src={BUSINESS_INFO.logoUrl}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = BUSINESS_INFO.remoteLogoFallback;
            }}
            alt="Surani Signs"
            className="h-12 sm:h-14 w-auto object-contain select-none"
          />
        </div>

        {/* Minimalist Progress Bar + Numeric Counter */}
        <div className="w-full space-y-3">
          <div className="w-full h-[3px] rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#008f83] via-[#00b8a9] to-[#00e5d1] shadow-[0_0_12px_rgba(0,184,169,0.65)] transition-[width] duration-150 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold tracking-wide">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[11px]">
              {statusLabel}
            </span>
            <span className="text-slate-900 dark:text-white font-bold tabular-nums text-sm">
              {displayProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
