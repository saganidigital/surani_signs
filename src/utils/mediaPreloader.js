import { SERVICES_DATA, SHOP_VIDEOS } from '../data/siteData';

const IMAGE_WEIGHT = 1.0;
const VIDEO_WEIGHT = 4.0;
const FONT_WEIGHT = 0.5;
const IMAGE_TIMEOUT_MS = 12000;
const VIDEO_TIMEOUT_MS = 15000;
const OVERALL_TIMEOUT_MS = 18000;
const MOBILE_SUSPEND_GRACE_MS = 1800;

// Persistent caches retained across component lifecycles & StrictMode remounts
const retainedImages = new Map();
const retainedVideos = new Map();

let started = false;
let preloadBinEl = null;
const listeners = new Set();

const imageUrls = Array.from(
  new Set([
    '/images/teal-wave-bg.jpg',
    '/images/community-mending-apparel.jpg',
    '/images/surani-marketing-solutions.jpg',
    ...SERVICES_DATA.map((s) => s.image).filter(Boolean),
    ...SHOP_VIDEOS.map((v) => v.poster).filter(Boolean),
  ])
);

const videoUrls = Array.from(new Set(SHOP_VIDEOS.map((v) => v.videoUrl).filter(Boolean)));

const imageFractions = new Array(imageUrls.length).fill(0);
const videoFractions = new Array(videoUrls.length).fill(0);
let fontFraction = 0;

const state = {
  progress: 0,
  loadedImages: 0,
  totalImages: imageUrls.length,
  loadedVideos: 0,
  totalVideos: videoUrls.length,
  fontsReady: false,
  done: false,
};

function getPreloadBin() {
  if (typeof document === 'undefined') return null;
  if (preloadBinEl && document.body?.contains(preloadBinEl)) return preloadBinEl;

  const existing = document.getElementById('patch4less-media-preload-bin');
  if (existing) {
    preloadBinEl = existing;
    return preloadBinEl;
  }

  const bin = document.createElement('div');
  bin.id = 'patch4less-media-preload-bin';
  bin.setAttribute('aria-hidden', 'true');
  // Offscreen rendered container (NOT display:none) so the browser actively buffers <video preload="auto">
  Object.assign(bin.style, {
    position: 'fixed',
    left: '-9999px',
    top: '0',
    width: '1px',
    height: '1px',
    opacity: '0.001',
    pointerEvents: 'none',
    overflow: 'hidden',
  });
  document.body?.appendChild(bin);
  preloadBinEl = bin;
  return preloadBinEl;
}

function recomputeAndNotify(forceDone = false) {
  const totalWeight =
    imageUrls.length * IMAGE_WEIGHT + videoUrls.length * VIDEO_WEIGHT + FONT_WEIGHT;

  let weightedSum = fontFraction * FONT_WEIGHT;
  let imgDoneCount = 0;
  let vidDoneCount = 0;

  for (let i = 0; i < imageFractions.length; i++) {
    weightedSum += imageFractions[i] * IMAGE_WEIGHT;
    if (imageFractions[i] >= 1) imgDoneCount += 1;
  }
  for (let i = 0; i < videoFractions.length; i++) {
    weightedSum += videoFractions[i] * VIDEO_WEIGHT;
    if (videoFractions[i] >= 1) vidDoneCount += 1;
  }

  const allComplete =
    forceDone ||
    (imgDoneCount === imageUrls.length &&
      vidDoneCount === videoUrls.length &&
      fontFraction >= 1);

  state.loadedImages = imgDoneCount;
  state.loadedVideos = vidDoneCount;
  state.fontsReady = fontFraction >= 1;
  state.done = state.done || allComplete;

  if (state.done) {
    state.progress = 100;
  } else {
    const rawPct = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 100;
    state.progress = Math.max(state.progress, Math.min(98, rawPct));
  }

  const snapshot = { ...state };
  listeners.forEach((fn) => fn(snapshot));
}

function loadAndDecodeImage(url, index) {
  if (!url || typeof Image === 'undefined') {
    imageFractions[index] = 1;
    recomputeAndNotify();
    return;
  }

  const img = new Image();
  img.decoding = 'async';
  retainedImages.set(url, img);

  let settled = false;
  const timeoutId = window.setTimeout(() => {
    if (settled) return;
    settled = true;
    imageFractions[index] = 1;
    recomputeAndNotify();
  }, IMAGE_TIMEOUT_MS);

  const finalize = () => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timeoutId);
    imageFractions[index] = 1;
    recomputeAndNotify();
  };

  img.onload = () => {
    if (settled) return;
    imageFractions[index] = Math.max(imageFractions[index], 0.7);
    recomputeAndNotify();

    if (typeof img.decode === 'function') {
      img.decode().catch(() => {}).finally(finalize);
    } else {
      finalize();
    }
  };

  img.onerror = finalize;
  img.src = url;

  // Handle immediately cached images
  if (img.complete && img.naturalWidth > 0) {
    img.onload();
  }
}

function loadAndBufferVideo(url, index) {
  if (!url || typeof document === 'undefined') {
    videoFractions[index] = 1;
    recomputeAndNotify();
    return;
  }

  const bin = getPreloadBin();
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  retainedVideos.set(url, video);

  let settled = false;
  let hasLoadedData = false;
  let suspendTimer = 0;

  const cleanupListeners = () => {
    window.clearTimeout(timeoutId);
    window.clearTimeout(suspendTimer);
    video.removeEventListener('progress', onProgress);
    video.removeEventListener('loadeddata', onLoadedData);
    video.removeEventListener('canplaythrough', onCanPlayThrough);
    video.removeEventListener('suspend', onSuspend);
    video.removeEventListener('error', finalize);
  };

  const finalize = () => {
    if (settled) return;
    settled = true;
    cleanupListeners();
    videoFractions[index] = 1;
    recomputeAndNotify();
  };

  const timeoutId = window.setTimeout(finalize, VIDEO_TIMEOUT_MS);

  const getBufferedRatio = () => {
    const dur = video.duration;
    if (!dur || !Number.isFinite(dur) || dur <= 0 || video.buffered.length === 0) {
      return 0;
    }
    let maxEnd = 0;
    for (let i = 0; i < video.buffered.length; i++) {
      maxEnd = Math.max(maxEnd, video.buffered.end(i));
    }
    return Math.min(1, maxEnd / dur);
  };

  const onProgress = () => {
    if (settled) return;
    window.clearTimeout(suspendTimer);
    const ratio = getBufferedRatio();
    if (ratio >= 0.95) {
      finalize();
      return;
    }
    videoFractions[index] = Math.max(videoFractions[index], Math.min(0.95, ratio));
    recomputeAndNotify();
  };

  const onLoadedData = () => {
    if (settled) return;
    hasLoadedData = true;
    videoFractions[index] = Math.max(videoFractions[index], 0.25);
    recomputeAndNotify();
    if (video.readyState >= 4) {
      finalize();
    }
  };

  const onCanPlayThrough = () => {
    finalize();
  };

  const onSuspend = () => {
    if (settled) return;
    if (video.readyState >= 4 || getBufferedRatio() >= 0.95) {
      finalize();
      return;
    }
    // iOS/mobile browsers may pause preloading after loadeddata — avoid stalling
    if (hasLoadedData) {
      window.clearTimeout(suspendTimer);
      suspendTimer = window.setTimeout(finalize, MOBILE_SUSPEND_GRACE_MS);
    }
  };

  video.addEventListener('progress', onProgress);
  video.addEventListener('loadeddata', onLoadedData);
  video.addEventListener('canplaythrough', onCanPlayThrough);
  video.addEventListener('suspend', onSuspend);
  video.addEventListener('error', finalize);

  video.src = url;
  if (bin) {
    bin.appendChild(video);
  }
  video.load();
}

function runPreloadOnce() {
  if (started) return;
  started = true;

  // Immediate visual feedback above initial splash bar
  state.progress = 4;

  // Overall safety timeout so an unreachable origin can never stall the site
  window.setTimeout(() => {
    if (!state.done) {
      recomputeAndNotify(true);
    }
  }, OVERALL_TIMEOUT_MS);

  // Fonts readiness
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready
      .catch(() => {})
      .finally(() => {
        fontFraction = 1;
        recomputeAndNotify();
      });
  } else {
    fontFraction = 1;
  }

  // Start loading & decoding all images
  imageUrls.forEach((url, index) => loadAndDecodeImage(url, index));

  // Start loading & buffering all shop videos (never clearing video.src)
  videoUrls.forEach((url, index) => loadAndBufferVideo(url, index));

  recomputeAndNotify();
}

export function startMediaPreload(listener) {
  if (typeof listener === 'function') {
    listeners.add(listener);
  }

  runPreloadOnce();

  if (typeof listener === 'function') {
    listener({ ...state });
  }

  return () => {
    if (typeof listener === 'function') {
      listeners.delete(listener);
    }
  };
}
