import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
  Sparkles,
  CheckCircle2,
  MapPin,
  FileCheck,
  Wrench,
  Layers,
  Award,
  ChevronDown,
  Camera,
  Play,
  ShoppingBag,
  Utensils,
  HeartPulse,
  Building2,
  GraduationCap,
  Landmark,
  Home as HomeIcon,
  HardHat,
  Zap,
  Eye,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES_DATA,
  MATERIALS_LIST,
  PRODUCTION_METHODS,
  PROCESS_7_STEPS,
  INDUSTRIES_SERVED,
  WHY_CHOOSE_US,
  CUSTOMER_REVIEWS,
  SHOP_VIDEOS,
  HOME_FAQS,
} from '../data/siteData';
import IndustryCardStack from '../components/IndustryCardStack';
import { useOrderModal } from '../context/OrderModalContext';

const INDUSTRY_ICONS = {
  ShoppingBag,
  Utensils,
  HeartPulse,
  Building2,
  GraduationCap,
  Landmark,
  Home: HomeIcon,
  HardHat,
};

const PERMIT_STEPS = [
  {
    num: '01',
    title: 'Site Survey First',
    icon: MapPin,
    desc: 'We inspect your building frontage, electrical access, and the exact zoning ordinance that applies to your address before anything is designed.',
  },
  {
    num: '02',
    title: 'Dallas District Rules',
    icon: ShieldCheck,
    desc: 'Deep Ellum, Bishop Arts, Uptown, and freeway frontage properties all have extra sign code layers on top of base Dallas rules.',
  },
  {
    num: '03',
    title: 'Turnkey Permit Filing',
    icon: FileCheck,
    desc: 'We prepare stamped technical drawings and handle the city submission — so your sign goes up legal and right the first time.',
  },
];

export default function Home({ preloaderDone = true }) {
  const { openOrderModal } = useOrderModal();
  const [openFaq, setOpenFaq] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activePermitStep, setActivePermitStep] = useState(0);
  const [activeMaterialTab, setActiveMaterialTab] = useState('materials');
  const [hoveredSpecItem, setHoveredSpecItem] = useState(null);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({ signs: 0, cities: 0, rating: 0 });
  const statsRef = useRef(null);

  // Subtle auto-rotation for editorial testimonial spotlight
  useEffect(() => {
    if (reviewsPaused || CUSTOMER_REVIEWS.length <= 1) return;
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviewsPaused]);

  // Count-up animation when stats strip enters viewport (waits for preloader)
  useEffect(() => {
    if (!preloaderDone) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [preloaderDone]);

  useEffect(() => {
    if (!statsVisible) return;
    let frame = 0;
    const totalFrames = 45;
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts({
        signs: Math.round(500 * eased),
        cities: Math.round(11 * eased),
        rating: Number((5.0 * eased).toFixed(1)),
      });
      if (frame >= totalFrames) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [statsVisible]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      {/* =====================================================================
          1. ANIMATED WAVE HERO SECTION
         ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white/95 to-slate-50 dark:from-[#0f1218] dark:via-[#12161e] dark:to-[#15181f] pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-32 border-b border-slate-200/60 dark:border-white/10 transition-colors duration-300">
        {/* Layer 1: Animated Breathing Teal & Charcoal Wave Artwork with Smooth Feathering */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/teal-wave-bg.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 dark:opacity-20 animate-wave-float select-none transition-opacity duration-1000"
          />
          {/* Multi-Stop Soft Gradient Veil */}
          <div className="absolute inset-0 bg-radial-[at_50%_35%] from-white/95 via-white/85 to-white/60 dark:from-[#0f1218]/90 dark:via-[#0f1218]/80 dark:to-[#0f1218]/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-slate-50 dark:from-[#0f1218]/60 dark:via-transparent dark:to-[#15181f]" />
        </div>

        {/* Layer 2: Animated Subtle SVG Light-Sweep Ribbon Along Wave Curve */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-44 sm:h-64 pointer-events-none opacity-60"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroWaveSweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a1d24" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#00e5d1" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#00b8a9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,224 C320,300 520,60 880,140 C1160,200 1320,100 1440,128"
            stroke="url(#heroWaveSweep)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="animate-light-sweep"
          />
        </svg>

        {/* Layer 3: Soft Ambient Backlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[520px] h-[240px] sm:h-[340px] rounded-full bg-teal-300/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-7 flex flex-col items-center">
            {/* Main Headline Animated Smoothly From the Top */}
            <h1 className="text-[1.95rem] min-[390px]:text-[2.25rem] sm:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight text-balance">
              <span className="block hero-drop-top-1 text-slate-900 dark:text-white drop-shadow-xs">Custom Signs in Dallas</span>
              <span className="block mt-1.5 sm:mt-2 bg-gradient-to-r from-[#0d7a77] via-[#00b8a9] to-[#0a6663] dark:from-[#2dd4bf] dark:via-[#00e5d1] dark:to-[#00b8a9] bg-clip-text text-transparent hero-drop-top-2">
                Built by a Sign Company That Knows DFW
              </span>
            </h1>

            {/* Subtext Animated Smoothly From the Right */}
            <p className="hero-slide-right text-[15px] sm:text-lg text-slate-600 dark:text-slate-300 max-w-[36ch] sm:max-w-2xl mx-auto leading-relaxed font-medium">
              Patch4Ever designs, permits, fabricates, installs, and repairs commercial signage
              for businesses across Dallas and the DFW Metroplex.{' '}
              <strong className="text-slate-800 dark:text-white font-semibold">
                One team. One call. Full job done under one roof.
              </strong>
            </p>

            {/* Action CTAs */}
            <div className="w-full sm:w-auto flex items-center justify-center pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => openOrderModal()}
                className="btn-shine group w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] hover:from-[#00a698] hover:to-[#086b63] transition-all duration-300 cursor-pointer shadow-[0_12px_32px_-6px_rgba(0,184,169,0.38)] hover:shadow-[0_16px_38px_-4px_rgba(0,184,169,0.52)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Custom Sign</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. INFINITE DFW CITIES & CAPABILITIES MARQUEE TICKER
         ===================================================================== */}
      <div className="bg-[#1a1d24] text-white py-3 sm:py-3.5 border-b border-slate-800 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-bold tracking-wide">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-6 sm:gap-8 shrink-0 whitespace-nowrap">
              {BUSINESS_INFO.citiesServed.map((city) => (
                <span key={`${loopIdx}-${city}`} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-200">{city}, TX</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-teal-400 whitespace-nowrap">
                ★ Channel Letters • Monument Signs • Vehicle Wraps • Digital LED • Custom Embroidery
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          3. OPEN ARCHITECTURAL COUNT-UP STATS BAND
         ===================================================================== */}
      <section ref={statsRef} className="py-7 sm:py-16 bg-white dark:bg-[#0f1218] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-white/10 text-center">
            <div className="py-1 px-2 sm:py-2 sm:px-8">
              <div className="text-2xl min-[390px]:text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
                {counts.signs}
                <span className="text-[#00b8a9]">+</span>
              </div>
              <div className="mt-1.5 sm:mt-2 text-[10px] min-[390px]:text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.18em] leading-snug text-slate-500 dark:text-slate-400">
                Custom Signs Installed Across DFW
              </div>
            </div>
            <div className="py-1 px-2 sm:py-2 sm:px-8">
              <div className="text-2xl min-[390px]:text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
                {counts.cities}
                <span className="text-[#00b8a9]">+</span>
              </div>
              <div className="mt-1.5 sm:mt-2 text-[10px] min-[390px]:text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.18em] leading-snug text-slate-500 dark:text-slate-400">
                DFW Metroplex Cities Served
              </div>
            </div>
            <div className="py-1 px-2 sm:py-2 sm:px-8">
              <div className="text-2xl min-[390px]:text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums flex items-center justify-center gap-1 sm:gap-2">
                <span>{counts.rating.toFixed(1)}</span>
                <Star className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 sm:w-8 sm:h-8 fill-amber-400 text-amber-400 shrink-0" />
              </div>
              <div className="mt-1.5 sm:mt-2 text-[10px] min-[390px]:text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.18em] leading-snug text-slate-500 dark:text-slate-400">
                Verified Google Customer Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. INTERACTIVE EDITORIAL SERVICES INDEX + LIVE PHOTO SPOTLIGHT
         ===================================================================== */}
      <section id="services" className="py-14 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#15181f] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-14">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Custom Signs &amp; Visual Branding We Build in Dallas
              </h2>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                Hover or select any capability below to preview our work — designed, permitted,
                built, and installed by one local Farmers Branch team.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-[#00b8a9] transition-colors shrink-0 self-start md:self-auto group pb-1 border-b-2 border-slate-900 dark:border-white hover:border-teal-600 dark:hover:border-[#00b8a9]"
            >
              <span>Compare All 13 Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Borderless Hairline Editorial List */}
            <div className="lg:col-span-7 divide-y divide-slate-200/90 dark:divide-white/10 border-y border-slate-200/90 dark:border-white/10">
              {SERVICES_DATA.map((service, idx) => {
                const isActive = idx === activeServiceIdx;
                return (
                  <div
                    key={service.slug}
                    onMouseEnter={() => setActiveServiceIdx(idx)}
                    onFocus={() => setActiveServiceIdx(idx)}
                    className="group relative"
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      onClick={(e) => {
                        if (window.innerWidth < 1024 && !isActive) {
                          e.preventDefault();
                          setActiveServiceIdx(idx);
                        }
                      }}
                      className="py-4 sm:py-5 flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-baseline gap-3.5 sm:gap-4 min-w-0">
                        <span
                          className={`text-xs font-bold tabular-nums transition-colors shrink-0 ${
                            isActive ? 'text-[#00b8a9]' : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={`text-base sm:text-xl font-extrabold tracking-tight transition-all duration-300 ${
                              isActive
                                ? 'text-teal-700 dark:text-[#00b8a9] sm:translate-x-1.5'
                                : 'text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-[#00b8a9]'
                            }`}
                          >
                            {service.title}
                          </h3>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:hidden">
                            {service.category} • {service.turnaround}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-5 shrink-0">
                        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {service.category}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 transition-all duration-300 ${
                            isActive
                              ? 'text-[#00b8a9] translate-x-1 opacity-100'
                              : 'text-slate-400 dark:text-slate-500 opacity-50 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </Link>

                    {/* Mobile Inline Expandable Spotlight */}
                    {isActive && (
                      <div className="lg:hidden pb-6 space-y-4">
                        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-900">
                          <img
                            src={service.image}
                            alt={service.title}
                            loading="eager"
                            decoding="sync"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{service.summary}</p>
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 dark:text-[#00b8a9]"
                        >
                          <span>Explore Specs &amp; Process</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Sticky Frameless Live Photo Spotlight (Desktop) */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              {(() => {
                const active = SERVICES_DATA[activeServiceIdx] || SERVICES_DATA[0];
                return (
                  <div className="space-y-6">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900">
                      {SERVICES_DATA.map((service, i) => (
                        <img
                          key={service.slug}
                          src={service.image}
                          alt={service.title}
                          loading="eager"
                          decoding="sync"
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            i === activeServiceIdx
                              ? 'opacity-100 z-10'
                              : 'opacity-0 z-0 pointer-events-none'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                        <span className="text-[#00b8a9]">{active.category}</span>
                        <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-[#00b8a9]" />
                          {active.turnaround}
                        </span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {active.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{active.summary}</p>
                      <div className="pt-2">
                        <Link
                          to={`/services/${active.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-extrabold text-teal-700 dark:text-[#00b8a9] hover:text-teal-600 dark:hover:text-teal-300 group"
                        >
                          <span>Explore Specs &amp; Process</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. DALLAS SIGN CODE & PERMIT TRUST SECTION (INTERACTIVE TIMELINE)
         ===================================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1218] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4 sm:space-y-5 lg:sticky lg:top-28">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Getting a Sign Approved in Dallas Isn’t Simple — We Handle It
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Dallas and surrounding DFW suburbs have some of the strictest commercial sign codes
                in Texas. Getting this wrong after a sign is already fabricated costs you weeks and
                thousands of dollars. We verify the city ordinance before we ever start designing.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openOrderModal()}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-teal-700 dark:text-[#00b8a9] hover:text-teal-600 dark:hover:text-teal-300 cursor-pointer group pb-1 border-b-2 border-teal-600 dark:border-[#00b8a9]"
                >
                  <span>Schedule a Free Site Survey &amp; Code Check</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Interactive 3-Stage Vertical Approval Timeline */}
            <div className="lg:col-span-7 relative pl-8 sm:pl-10">
              {/* Vertical Connecting Rail */}
              <div className="absolute left-3 sm:left-4 top-3 bottom-3 w-px bg-slate-200 dark:bg-white/15" />

              <div className="divide-y divide-slate-200/80 dark:divide-white/10">
                {PERMIT_STEPS.map((step, idx) => {
                  const isActive = activePermitStep === idx;
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.title}
                      onMouseEnter={() => setActivePermitStep(idx)}
                      onClick={() => setActivePermitStep(idx)}
                      className="relative py-5 sm:py-7 first:pt-0 last:pb-0 cursor-pointer group"
                    >
                      {/* Timeline Node */}
                      <span
                        className={`absolute -left-8 sm:-left-10 top-5 sm:top-7 first:top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          idx === 0 ? '!top-0' : ''
                        } ${
                          isActive
                            ? 'bg-[#00b8a9] text-white dark:text-slate-950 scale-110 shadow-md shadow-teal-500/30'
                            : 'bg-white dark:bg-[#0f1218] border-2 border-slate-300 dark:border-white/25 text-slate-400 group-hover:border-teal-400'
                        }`}
                      >
                        <StepIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>

                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`text-xs font-bold tabular-nums transition-colors ${
                              isActive ? 'text-[#00b8a9]' : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {step.num}
                          </span>
                          <h3
                            className={`text-lg sm:text-xl font-extrabold transition-colors ${
                              isActive
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p
                        className={`mt-2 sm:mt-2.5 text-sm sm:text-base leading-relaxed transition-colors duration-300 max-w-xl ${
                          isActive ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. MATERIALS & PRODUCTION TECHNOLOGY (INTERACTIVE TYPOGRAPHIC STREAM)
         ===================================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#1a1d24] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-14 pb-6 sm:pb-8 border-b border-white/10">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                What We Build Your Sign With
              </h2>
              <p className="mt-2.5 sm:mt-3 text-slate-300 text-sm sm:text-base">
                We select commercial-grade substrates and precision fabrication processes based on
                where your sign installs and how long it needs to endure the Texas climate.
              </p>
            </div>

            {/* Interactive Underline Tab Switcher */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-8 shrink-0">
              <button
                type="button"
                onClick={() => setActiveMaterialTab('materials')}
                className={`pb-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeMaterialTab === 'materials'
                    ? 'text-[#00b8a9] border-[#00b8a9]'
                    : 'text-slate-400 border-transparent hover:text-white'
                }`}
              >
                Commercial Materials
              </button>
              <button
                type="button"
                onClick={() => setActiveMaterialTab('methods')}
                className={`pb-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeMaterialTab === 'methods'
                    ? 'text-[#00b8a9] border-[#00b8a9]'
                    : 'text-slate-400 border-transparent hover:text-white'
                }`}
              >
                Production Methods
              </button>
            </div>
          </div>

          {/* Interactive Borderless Typographic Spec Stream */}
          <div
            className="flex flex-wrap items-baseline gap-x-3 gap-y-2.5 sm:gap-x-6 sm:gap-y-5"
            onMouseLeave={() => setHoveredSpecItem(null)}
          >
            {(activeMaterialTab === 'materials' ? MATERIALS_LIST : PRODUCTION_METHODS).map(
              (item, idx, arr) => {
                const isHovered = hoveredSpecItem === item;
                const isDimmed = hoveredSpecItem !== null && !isHovered;
                return (
                  <React.Fragment key={item}>
                    <span
                      onMouseEnter={() => setHoveredSpecItem(item)}
                      onClick={() => setHoveredSpecItem(isHovered ? null : item)}
                      className={`text-lg sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-300 cursor-pointer sm:cursor-default ${
                        isHovered
                          ? 'text-[#00b8a9] sm:translate-x-1'
                          : isDimmed
                          ? 'text-white/25'
                          : 'text-white/90'
                      }`}
                    >
                      {item}
                    </span>
                    {idx < arr.length - 1 && (
                      <span className="text-teal-500/40 text-lg sm:text-xl font-light select-none">/</span>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. OUR 7-STEP PROCESS (SMOOTH CONTINUOUS SCROLL)
         ===================================================================== */}
      <section id="process" className="py-14 sm:py-20 bg-slate-50 dark:bg-[#15181f] border-b border-slate-200/80 dark:border-white/10 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Our 7-Step Turnkey Process
            </h2>
            <p className="mt-2.5 sm:mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-lg">
              One call starts everything. Here is exactly what happens from initial consultation to
              installation day.
            </p>
          </div>
        </div>

        {/* Smooth Infinite Horizontal Scroll Track */}
        <div className="relative w-full overflow-hidden py-3 sm:py-4">
          {/* Soft Edge Fade Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-[#15181f] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-[#15181f] to-transparent z-10" />

          <div className="process-marquee-track">
            {[0, 1].map((dupIdx) => (
              <div key={dupIdx} className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
                {PROCESS_7_STEPS.map((item, idx) => (
                  <div
                    key={`${dupIdx}-${item.step}`}
                    className="w-[270px] sm:w-[340px] lg:w-[360px] shrink-0 p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#1a1d24] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00b8a9] to-[#0d7a77] text-white font-black text-base flex items-center justify-center shadow-md shadow-teal-500/20">
                          {item.step}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Step {idx + 1} of 7
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. INDUSTRIES WE SERVE + WHY CHOOSE SURANI SIGNS
         ===================================================================== */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0f1218] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
          {/* Industries */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Industries We Build Signs For
              </h2>
              <p className="mt-2.5 sm:mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                A hospital needs ADA and wayfinding signs. A restaurant needs an illuminated
                storefront sign and digital menu boards. We build for your industry, not a template.
              </p>
            </div>

            <IndustryCardStack industries={INDUSTRIES_SERVED} iconMap={INDUSTRY_ICONS} />
          </div>

          {/* Why Choose Us — 2-Column Hairline Editorial Index */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Why Dallas Businesses Choose Patch4Ever
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
              {WHY_CHOOSE_US.map((item, idx) => (
                <div
                  key={item.title}
                  className="group relative py-5 sm:py-6 border-t border-slate-200 dark:border-white/10 flex items-start gap-4 sm:gap-5 transition-colors"
                >
                  {/* Animated Top Teal Accent Line on Hover */}
                  <span className="absolute top-0 left-0 h-[2px] w-0 bg-[#00b8a9] group-hover:w-full transition-all duration-500" />
                  <span className="text-xs font-bold tabular-nums text-slate-400 dark:text-slate-500 group-hover:text-[#00b8a9] pt-1 transition-colors shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="transition-transform duration-300 sm:group-hover:translate-x-1">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5">{item.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. OUR SHOP IN ACTION (VIDEO SHOWCASE) + INSTAGRAM BANNER
         ===================================================================== */}
      <section id="shop-videos" className="py-14 sm:py-20 bg-[#15181f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Real Work. Real Results. Right Here in Dallas.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-slate-300 text-sm sm:text-base">
              Take a look behind the scenes inside our Farmers Branch facility at how we fabricate
              custom signs, print apparel, and produce commercial marketing materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
            {SHOP_VIDEOS.map((vid) => (
              <div
                key={vid.title}
                className="rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl flex flex-col justify-between"
              >
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <video
                    src={vid.videoUrl}
                    poster={vid.poster}
                    controls
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white text-base">{vid.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{vid.subtitle}</p>
                  </div>
                  <Link
                    to={`/services/${vid.linkSlug}`}
                    className="w-9 h-9 rounded-full bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-slate-950 flex items-center justify-center shrink-0 transition-colors"
                    title={`View ${vid.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. CUSTOMER REVIEWS SECTION (INTERACTIVE EDITORIAL SPOTLIGHT)
         ===================================================================== */}
      <section
        id="reviews"
        className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1218] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
        onMouseEnter={() => setReviewsPaused(true)}
        onMouseLeave={() => setReviewsPaused(false)}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              What Dallas Business Owners Say About Us
            </h2>
            <p className="mt-2.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Real 5-star reviews from DFW retail stores, medical clinics, churches, and fleet
              operators.
            </p>
          </div>

          {(() => {
            const activeRev = CUSTOMER_REVIEWS[activeReviewIdx] || CUSTOMER_REVIEWS[0];
            return (
              <div className="space-y-8 sm:space-y-12">
                {/* Open Pull-Quote Stage */}
                <div className="text-center max-w-3xl mx-auto min-h-[170px] sm:min-h-[210px] flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-4 sm:mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote
                    key={activeRev.name}
                    className="text-lg sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight"
                  >
                    “{activeRev.text}”
                  </blockquote>
                  <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                    <span className="font-extrabold text-slate-900 dark:text-white">{activeRev.name}</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-slate-500 dark:text-slate-400">{activeRev.location}</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="font-semibold text-[#00b8a9]">{activeRev.service}</span>
                  </div>
                </div>

                {/* Reviewer Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 border-t border-slate-200 dark:border-white/10 pt-5 sm:pt-6">
                  {CUSTOMER_REVIEWS.map((rev, idx) => {
                    const isActive = idx === activeReviewIdx;
                    return (
                      <button
                        key={rev.name}
                        type="button"
                        onClick={() => setActiveReviewIdx(idx)}
                        className="text-left group relative pt-3 cursor-pointer"
                      >
                        <span
                          className={`absolute top-0 left-0 h-[2px] transition-all duration-300 ${
                            isActive
                              ? 'w-full bg-[#00b8a9]'
                              : 'w-0 bg-slate-300 dark:bg-white/25 group-hover:w-1/2'
                          }`}
                        />
                        <div
                          className={`text-sm font-extrabold transition-colors ${
                            isActive
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }`}
                        >
                          {rev.name}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">{rev.location}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =====================================================================
          13. FREQUENTLY ASKED QUESTIONS (BORDERLESS HAIRLINE ACCORDION)
         ===================================================================== */}
      <section id="faq" className="py-14 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#15181f] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
            {HOME_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="group">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full py-4 sm:py-6 text-left flex items-center justify-between gap-4 sm:gap-6 cursor-pointer"
                  >
                    <span
                      className={`font-extrabold text-base sm:text-lg transition-colors ${
                        isOpen
                          ? 'text-teal-700 dark:text-[#00b8a9]'
                          : 'text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-[#00b8a9]'
                      }`}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#00b8a9]' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-5 pr-4 sm:pr-8 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
