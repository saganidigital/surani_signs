import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Upload,
  ArrowRight,
  Layers,
  Palette,
  Type,
  CheckCircle2,
} from 'lucide-react';

const SIGN_STYLES = [
  {
    id: 'channel',
    name: 'Front-Lit Channel Letters',
    subtitle: '3D Aluminum + Glowing Acrylic Face',
    signTypeOption: 'Channel Letters',
  },
  {
    id: 'halo',
    name: 'Halo-Lit Architectural',
    subtitle: 'Brushed Metal Face + Backlit LED Halo',
    signTypeOption: 'Channel Letters',
  },
  {
    id: 'monument',
    name: 'Brick & Stucco Monument',
    subtitle: 'Ground-Level Architectural Entrance Base',
    signTypeOption: 'Monument Sign',
  },
  {
    id: 'panel',
    name: 'Storefront ACM Panel',
    subtitle: 'Crisp Dimensional Letters on Dibond Backer',
    signTypeOption: 'Storefront Sign',
  },
  {
    id: 'vinyl',
    name: 'Frosted Glass Window Vinyl',
    subtitle: 'Etched Storefront / Conference Glass Graphic',
    signTypeOption: 'Window/Wall Vinyl',
  },
];

const LED_COLORS = [
  {
    id: 'teal',
    name: 'Patch4Ever Signature Teal',
    hex: '#00e5d1',
    face: '#e6fffc',
    dayText: '#008f83',
    glow: '0 0 14px #00e5d1, 0 0 32px rgba(0, 229, 209, 0.85), 0 0 60px rgba(0, 184, 169, 0.55)',
    haloGlow: '0 0 22px #00e5d1, 0 0 45px #00b8a9, 0 0 75px rgba(0, 229, 209, 0.8)',
  },
  {
    id: 'white',
    name: 'Pure 6500K Daylight White',
    hex: '#ffffff',
    face: '#ffffff',
    dayText: '#1e293b',
    glow: '0 0 12px #ffffff, 0 0 28px rgba(255, 255, 255, 0.9), 0 0 55px rgba(226, 232, 240, 0.6)',
    haloGlow: '0 0 22px #ffffff, 0 0 44px rgba(255,255,255,0.95)',
  },
  {
    id: 'gold',
    name: 'Warm Amber Gold LED',
    hex: '#fbbf24',
    face: '#fef3c7',
    dayText: '#b45309',
    glow: '0 0 14px #fbbf24, 0 0 30px rgba(251, 191, 36, 0.85), 0 0 55px rgba(245, 158, 11, 0.5)',
    haloGlow: '0 0 22px #fbbf24, 0 0 45px rgba(251, 191, 36, 0.9)',
  },
  {
    id: 'red',
    name: 'High-Impact Crimson Red',
    hex: '#ef4444',
    face: '#fee2e2',
    dayText: '#b91c1c',
    glow: '0 0 14px #ef4444, 0 0 30px rgba(239, 68, 68, 0.85), 0 0 55px rgba(220, 38, 38, 0.5)',
    haloGlow: '0 0 22px #ef4444, 0 0 45px rgba(239, 68, 68, 0.9)',
  },
  {
    id: 'blue',
    name: 'Electric Cobalt Blue',
    hex: '#38bdf8',
    face: '#e0f2fe',
    dayText: '#0369a1',
    glow: '0 0 14px #38bdf8, 0 0 30px rgba(56, 189, 248, 0.85), 0 0 55px rgba(2, 132, 199, 0.5)',
    haloGlow: '0 0 22px #38bdf8, 0 0 45px rgba(56, 189, 248, 0.9)',
  },
];

export default function SignVisualizer({ onSelectDesign }) {
  const [text, setText] = useState('PATCH4EVER');
  const [tagline, setTagline] = useState('DALLAS • CUSTOM SIGNAGE');
  const [styleId, setStyleId] = useState('channel');
  const [colorId, setColorId] = useState('teal');
  const [isNight, setIsNight] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const activeStyle = SIGN_STYLES.find((s) => s.id === styleId) || SIGN_STYLES[0];
  const activeColor = LED_COLORS.find((c) => c.id === colorId) || LED_COLORS[0];

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleApplyToOrder = () => {
    if (onSelectDesign) {
      onSelectDesign({
        signType: activeStyle.signTypeOption,
        signText: text,
        details: `Visualizer Spec: ${activeStyle.name} | Tagline: "${tagline}" | LED/Color: ${activeColor.name} | Viewed in ${isNight ? 'Night LED Mode' : 'Daylight Mode'}`,
      });
    }
  };

  return (
    <section
      id="sign-visualizer"
      className="py-12 sm:py-20 bg-white dark:bg-[#0f1218] relative overflow-hidden border-y border-slate-200/80 dark:border-white/10 transition-colors duration-300"
    >
      {/* Subtle Background Wave Watermark */}
      <img
        src="/images/teal-wave-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-[650px] opacity-15 dark:opacity-10 pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Test Your Business Sign Live Before We Build It
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-300">
            Type your business name, upload your logo, compare sign styles in Day or Night LED mode,
            and send your concept directly to our Farmers Branch design team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Controls Panel */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#15181f] rounded-3xl p-4 sm:p-7 border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-5">
              {/* 1. Business Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    <Type className="w-3.5 h-3.5 text-teal-600 dark:text-[#00b8a9]" />
                    <span>Primary Sign Text</span>
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={26}
                    placeholder="YOUR BUSINESS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a1d24] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Sub-Line / Suite (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    maxLength={36}
                    placeholder="EST. DALLAS TX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a1d24] border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* 2. Sign Construction Style */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-[#00b8a9]" />
                  <span>Select Sign Style</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {SIGN_STYLES.map((style) => {
                    const selected = style.id === styleId;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setStyleId(style.id)}
                        className={`text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          selected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                            : 'bg-white dark:bg-[#1a1d24] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-teal-400'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold">{style.name}</div>
                          <div
                            className={`text-xs ${
                              selected ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {style.subtitle}
                          </div>
                        </div>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selected ? 'border-white bg-white text-teal-600' : 'border-slate-300 dark:border-white/25'
                          }`}
                        >
                          {selected && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. LED Illumination Color & Logo Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    <Palette className="w-3.5 h-3.5 text-teal-600 dark:text-[#00b8a9]" />
                    <span>LED / Face Color</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {LED_COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setColorId(c.id)}
                        title={c.name}
                        className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                          colorId === c.id
                            ? 'scale-110 ring-2 ring-offset-2 dark:ring-offset-[#15181f] ring-teal-600 border-slate-900 dark:border-white'
                            : 'border-slate-300 dark:border-white/25 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {activeColor.name}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    <Upload className="w-3.5 h-3.5 text-teal-600 dark:text-[#00b8a9]" />
                    <span>Test Your Logo</span>
                  </label>
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-teal-500 bg-teal-50/60 dark:bg-teal-500/10 hover:bg-teal-50 dark:hover:bg-teal-500/20 text-teal-800 dark:text-teal-200 text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{logoPreview ? 'Change Logo' : 'Upload PNG/JPG'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={() => setLogoPreview(null)}
                      className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 hover:underline font-medium"
                    >
                      Remove uploaded logo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={handleApplyToOrder}
              className="btn-shine w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1a1d24] via-[#0d7a77] to-[#00b8a9] hover:opacity-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Free Mockup &amp; Quote for This Design</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Live Preview Stage */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className={`relative flex-1 min-h-[300px] sm:min-h-[420px] rounded-3xl overflow-hidden border-2 transition-all duration-500 flex flex-col justify-between p-4 sm:p-8 shadow-2xl ${
                styleId === 'vinyl'
                  ? isNight
                    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 border-slate-700'
                    : 'bg-gradient-to-br from-sky-100 via-slate-100 to-teal-50 border-slate-300'
                  : isNight
                  ? 'texture-brick-dark border-slate-800'
                  : 'texture-brick-day border-amber-900/30'
              }`}
            >
              {/* Top Stage Bar: Day/Night Switch */}
              <div className="relative z-20 flex flex-wrap items-center justify-end gap-3">
                {/* Day / Night Lighting Toggle */}
                <div className="inline-flex items-center bg-black/55 backdrop-blur-md p-1 rounded-full border border-white/15">
                  <button
                    type="button"
                    onClick={() => setIsNight(false)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      !isNight ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Daylight</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNight(true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isNight ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Night LED Glow</span>
                  </button>
                </div>
              </div>

              {/* Ambient Night LED Bloom */}
              {isNight && (styleId === 'channel' || styleId === 'halo' || styleId === 'monument') && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${activeColor.hex}28 0%, transparent 65%)`,
                  }}
                />
              )}

              {/* Center Sign Render Stage */}
              <div className="relative z-10 my-auto py-10 flex flex-col items-center justify-center text-center">
                {/* STYLE 1: FRONT-LIT CHANNEL LETTERS */}
                {styleId === 'channel' && (
                  <div className="flex flex-col items-center">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {logoPreview && (
                        <img
                          src={logoPreview}
                          alt="Uploaded Logo"
                          className="h-16 sm:h-20 w-auto object-contain rounded-lg"
                          style={{
                            filter: isNight
                              ? `drop-shadow(0 0 14px ${activeColor.hex})`
                              : 'drop-shadow(0 6px 10px rgba(0,0,0,0.45))',
                          }}
                        />
                      )}
                      <div
                        className="font-black uppercase tracking-wider text-2xl sm:text-5xl md:text-6xl break-words max-w-full transition-all duration-300 select-none"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          color: isNight ? activeColor.face : activeColor.hex,
                          textShadow: isNight
                            ? `${activeColor.glow}, 0 6px 0 #111827`
                            : '0 4px 0 #1e293b, 0 10px 20px rgba(0,0,0,0.45)',
                          WebkitTextStroke: isNight ? '1.5px rgba(255,255,255,0.4)' : '1.5px #0f172a',
                        }}
                      >
                        {text || 'YOUR SIGN'}
                      </div>
                    </div>
                    {/* Raceway Bar */}
                    <div className="w-full max-w-md h-2.5 bg-slate-800/90 border-t border-white/10 rounded-full -mt-1 shadow-lg" />
                    {tagline && (
                      <div className="mt-4 px-4 py-1 rounded-md bg-slate-900/90 border border-white/15 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-white shadow-lg">
                        {tagline}
                      </div>
                    )}
                  </div>
                )}

                {/* STYLE 2: HALO-LIT ARCHITECTURAL */}
                {styleId === 'halo' && (
                  <div className="flex flex-col items-center">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {logoPreview && (
                        <img
                          src={logoPreview}
                          alt="Uploaded Logo"
                          className="h-16 sm:h-20 w-auto object-contain"
                          style={{
                            filter: isNight
                              ? `drop-shadow(0 0 18px ${activeColor.hex})`
                              : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                          }}
                        />
                      )}
                      <div
                        className="font-black uppercase tracking-widest text-2xl sm:text-5xl md:text-6xl break-words max-w-full transition-all duration-300 select-none"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          color: isNight ? '#1e242d' : '#cbd5e1',
                          textShadow: isNight
                            ? activeColor.haloGlow
                            : '0 3px 0 #334155, 0 8px 18px rgba(0,0,0,0.5)',
                          WebkitTextStroke: isNight
                            ? `1.5px ${activeColor.hex}`
                            : '1px #475569',
                        }}
                      >
                        {text || 'YOUR SIGN'}
                      </div>
                    </div>
                    {tagline && (
                      <div
                        className="mt-3 text-xs sm:text-sm font-bold tracking-[0.28em] uppercase transition-all"
                        style={{
                          color: isNight ? activeColor.face : '#f8fafc',
                          textShadow: isNight ? activeColor.glow : '0 2px 4px rgba(0,0,0,0.5)',
                        }}
                      >
                        {tagline}
                      </div>
                    )}
                  </div>
                )}

                {/* STYLE 3: MONUMENT SIGN */}
                {styleId === 'monument' && (
                  <div className="w-full max-w-lg mx-auto flex flex-col items-center">
                    {/* Top Architectural Cap */}
                    <div className="w-[92%] h-4 bg-stone-300 rounded-t-lg border-b-2 border-stone-400 shadow" />
                    {/* Main Illuminated Sign Cabinet inside Stucco Pillars */}
                    <div className="w-[88%] bg-stone-700 p-3 sm:p-4 border-x-8 border-stone-500 shadow-2xl">
                      <div
                        className="rounded-xl px-5 py-6 border-2 transition-all"
                        style={{
                          backgroundColor: '#161920',
                          borderColor: isNight ? activeColor.hex : '#475569',
                          boxShadow: isNight
                            ? `inset 0 0 25px ${activeColor.hex}33, 0 0 25px ${activeColor.hex}44`
                            : '0 10px 25px rgba(0,0,0,0.35)',
                        }}
                      >
                        <div className="flex items-center justify-center gap-3">
                          {logoPreview && (
                            <img
                              src={logoPreview}
                              alt="Logo"
                              className="h-12 w-auto object-contain"
                            />
                          )}
                          <div
                            className="font-black uppercase tracking-wider text-xl sm:text-4xl break-words max-w-full"
                            style={{
                              color: isNight ? activeColor.face : activeColor.hex,
                              textShadow: isNight ? activeColor.glow : 'none',
                            }}
                          >
                            {text || 'YOUR SIGN'}
                          </div>
                        </div>
                        {tagline && (
                          <div className="mt-2 pt-2 border-t border-white/15 text-[11px] sm:text-xs font-bold tracking-[0.22em] text-teal-300 uppercase">
                            {tagline}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Masonry Brick Base */}
                    <div className="w-[96%] h-9 bg-amber-950/90 border-t-4 border-stone-300 rounded-b-md shadow-xl flex items-center justify-center text-[10px] font-bold tracking-widest text-stone-300 uppercase">
                      2099 VALLEY VIEW LN • MASONRY MONUMENT BASE
                    </div>
                  </div>
                )}

                {/* STYLE 4: STOREFRONT ACM PANEL */}
                {styleId === 'panel' && (
                  <div className="w-full max-w-lg bg-white rounded-2xl px-7 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-slate-200 relative">
                    {/* Corner Architectural Standoffs */}
                    <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-500 absolute top-3 left-3" />
                    <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-500 absolute top-3 right-3" />
                    <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-500 absolute bottom-3 left-3" />
                    <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-500 absolute bottom-3 right-3" />

                    <div className="flex items-center justify-center gap-3.5">
                      {logoPreview && (
                        <img
                          src={logoPreview}
                          alt="Logo"
                          className="h-14 w-auto object-contain"
                        />
                      )}
                      <div
                        className="font-black uppercase tracking-tight text-xl sm:text-4xl break-words max-w-full"
                        style={{
                          color: activeColor.dayText,
                          textShadow: '1px 2px 0 rgba(15,23,42,0.15)',
                        }}
                      >
                        {text || 'YOUR SIGN'}
                      </div>
                    </div>
                    {tagline && (
                      <div className="mt-2 text-xs font-bold tracking-[0.24em] text-slate-600 uppercase">
                        {tagline}
                      </div>
                    )}
                  </div>
                )}

                {/* STYLE 5: FROSTED GLASS WINDOW VINYL */}
                {styleId === 'vinyl' && (
                  <div className="w-full max-w-lg rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 px-7 py-9 shadow-2xl relative overflow-hidden">
                    <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/15 to-transparent rotate-12 pointer-events-none" />
                    <div className="flex items-center justify-center gap-3.5 relative z-10">
                      {logoPreview && (
                        <img
                          src={logoPreview}
                          alt="Logo"
                          className="h-14 w-auto object-contain drop-shadow"
                        />
                      )}
                      <div
                        className="font-extrabold uppercase tracking-wider text-xl sm:text-4xl break-words max-w-full"
                        style={{
                          color: isNight ? activeColor.hex : '#0f172a',
                          textShadow: isNight
                            ? '0 2px 10px rgba(0,0,0,0.45)'
                            : '0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        {text || 'YOUR SIGN'}
                      </div>
                    </div>
                    {tagline && (
                      <div
                        className={`mt-2 text-xs font-bold tracking-[0.24em] uppercase ${
                          isNight ? 'text-white/90' : 'text-slate-700'
                        }`}
                      >
                        {tagline}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
