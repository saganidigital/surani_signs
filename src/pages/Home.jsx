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

export default function Home() {
  const { openOrderModal } = useOrderModal();
  const [openFaq, setOpenFaq] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({ signs: 0, cities: 0, rating: 0 });
  const statsRef = useRef(null);

  // Count-up animation when stats strip enters viewport
  useEffect(() => {
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
  }, []);

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
    <div className="min-h-screen flex flex-col">
      {/* =====================================================================
          1. ANIMATED WAVE HERO SECTION
         ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white/95 to-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-200/60">
        {/* Layer 1: Animated Breathing Teal & Charcoal Wave Artwork with Smooth Feathering */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/teal-wave-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 animate-wave-float select-none transition-opacity duration-1000"
          />
          {/* Multi-Stop Soft Gradient Veil */}
          <div className="absolute inset-0 bg-radial-[at_50%_35%] from-white/95 via-white/85 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-slate-50" />
        </div>

        {/* Layer 2: Animated Subtle SVG Light-Sweep Ribbon Along Wave Curve */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-64 pointer-events-none opacity-60"
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] rounded-full bg-teal-300/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-7 flex flex-col items-center">
            {/* Main Headline Animated Smoothly From the Top */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
              <span className="block hero-drop-top-1 text-slate-900 drop-shadow-xs">Custom Signs in Dallas</span>
              <span className="block mt-2 bg-gradient-to-r from-[#0d7a77] via-[#00b8a9] to-[#0a6663] bg-clip-text text-transparent hero-drop-top-2">
                Built by a Sign Company That Knows DFW
              </span>
            </h1>

            {/* Subtext Animated Smoothly From the Right */}
            <p className="hero-slide-right text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Surani Signs designs, permits, fabricates, installs, and repairs commercial signage
              for businesses across Dallas and the DFW Metroplex.{' '}
              <strong className="text-slate-800 font-semibold">
                One team. One call. Full job done under one roof.
              </strong>
            </p>

            {/* Action CTAs */}
            <div className="flex items-center justify-center pt-2">
              <button
                type="button"
                onClick={() => openOrderModal()}
                className="btn-shine group inline-flex items-center gap-3 px-8 sm:px-9 py-4 rounded-full font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] hover:from-[#00a698] hover:to-[#086b63] transition-all duration-300 cursor-pointer shadow-[0_12px_32px_-6px_rgba(0,184,169,0.38)] hover:shadow-[0_16px_38px_-4px_rgba(0,184,169,0.52)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Custom Sign</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust Pill Badge */}
            <div className="pt-2 flex items-center justify-center">
              <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700 hover:border-teal-300/80 transition-colors">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Licensed &amp; Insured in Texas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. INFINITE DFW CITIES & CAPABILITIES MARQUEE TICKER
         ===================================================================== */}
      <div className="bg-[#1a1d24] text-white py-3.5 border-b border-slate-800 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-bold tracking-wide">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 shrink-0">
              {BUSINESS_INFO.citiesServed.map((city) => (
                <span key={`${loopIdx}-${city}`} className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-200">{city}, TX</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-teal-400">
                ★ Channel Letters • Monument Signs • Vehicle Wraps • Digital LED • Custom Embroidery
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          3. QUICK ANSWER + ANIMATED COUNT-UP STATS STRIP
         ===================================================================== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Count-Up Stats Strip */}
          <div
            ref={statsRef}
            className="rounded-3xl bg-gradient-to-r from-[#1a1d24] via-[#134e4a] to-[#00b8a9] p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {counts.signs}+
              </div>
              <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-200">
                Custom Signs Installed Across DFW
              </div>
            </div>
            <div className="relative z-10 sm:border-x border-white/15">
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {counts.cities}+
              </div>
              <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-200">
                DFW Metroplex Cities Served
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight flex items-center justify-center gap-2">
                <span>{counts.rating.toFixed(1)}</span>
                <Star className="w-8 h-8 fill-amber-300 text-amber-300" />
              </div>
              <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-200">
                Verified Google Customer Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SERVICES GRID (ALL 13 SIGN & PRINT SERVICES -> LINKS TO PAGE 2)
         ===================================================================== */}
      <section id="services" className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100/80 text-teal-800 mb-3">
                What We Build In-House
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Custom Signs &amp; Visual Branding We Build in Dallas
              </h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl">
                Every sign type, every material, every industry — designed, permitted, built, and
                installed by one local Farmers Branch team.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white bg-[#1a1d24] hover:bg-teal-600 transition-colors shrink-0 self-start md:self-auto"
            >
              <span>Compare All 13 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES_DATA.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-teal-500 shadow-xs hover:shadow-md transition-colors duration-200 flex flex-col justify-between relative"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                      <span className="text-teal-600 font-bold uppercase tracking-wider">{service.category}</span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-teal-500" />
                        {service.turnaround}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-teal-700 group-hover:text-teal-600">
                  <span>Explore Specs &amp; Process</span>
                  <span className="w-8 h-8 rounded-full bg-teal-50 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. DALLAS SIGN CODE & PERMIT TRUST SECTION
         ===================================================================== */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Dallas Sign Code Experts</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Getting a Sign Approved in Dallas Isn’t Simple — We Handle It
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Dallas and surrounding DFW suburbs have some of the strictest commercial sign codes
                in Texas. Getting this wrong after a sign is already fabricated costs you weeks and
                thousands of dollars. We verify the city ordinance before we ever start designing.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openOrderModal()}
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-600 cursor-pointer"
                >
                  <span>Schedule a Free Site Survey &amp; Code Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-teal-500/15 text-teal-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">Site Survey First</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We inspect your building frontage, electrical access, and the exact zoning
                  ordinance that applies to your address before anything is designed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-teal-500/15 text-teal-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">Dallas District Rules</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deep Ellum, Bishop Arts, Uptown, and freeway frontage properties all have extra
                  sign code layers on top of base Dallas rules.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-teal-500/15 text-teal-600 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">Turnkey Permit Filing</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We prepare stamped technical drawings and handle the city submission — so your
                  sign goes up legal and right the first time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. MATERIALS & PRODUCTION TECHNOLOGY
         ===================================================================== */}
      <section className="py-20 bg-[#1a1d24] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              What We Build Your Sign With
            </h2>
            <p className="mt-3 text-slate-300 text-base">
              We select commercial-grade substrates and precision fabrication processes based on
              where your sign installs and how long it needs to endure the Texas climate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">
                Commercial Sign Materials
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {MATERIALS_LIST.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-teal-500/20 border border-white/10 hover:border-teal-400/40 text-sm font-semibold text-white transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">
                In-House Production Methods
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {PRODUCTION_METHODS.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 text-sm font-semibold text-teal-200 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. OUR 7-STEP PROCESS (SMOOTH CONTINUOUS SCROLL)
         ===================================================================== */}
      <section id="process" className="py-20 bg-slate-50 border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our 7-Step Turnkey Process
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              One call starts everything. Here is exactly what happens from initial consultation to
              installation day.
            </p>
          </div>
        </div>

        {/* Smooth Infinite Horizontal Scroll Track */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Soft Edge Fade Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          <div className="process-marquee-track">
            {[0, 1].map((dupIdx) => (
              <div key={dupIdx} className="flex gap-6 pr-6 shrink-0">
                {PROCESS_7_STEPS.map((item, idx) => (
                  <div
                    key={`${dupIdx}-${item.step}`}
                    className="w-[310px] sm:w-[360px] shrink-0 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00b8a9] to-[#0d7a77] text-white font-black text-base flex items-center justify-center shadow-md shadow-teal-500/20">
                          {item.step}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step {idx + 1} of 7
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
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
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Industries */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Industries We Build Signs For
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                A hospital needs ADA and wayfinding signs. A restaurant needs an illuminated
                storefront sign and digital menu boards. We build for your industry, not a template.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INDUSTRIES_SERVED.map((ind) => {
                const IconComp = INDUSTRY_ICONS[ind.icon] || Building2;
                return (
                  <div
                    key={ind.name}
                    className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-lg transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-teal-500/15 text-teal-600 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-colors mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base mb-1.5">{ind.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Why Dallas Businesses Choose Surani Signs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY_CHOOSE_US.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-500 transition-all"
                >
                  <CheckCircle2 className="w-6 h-6 text-teal-600 mb-3" />
                  <h4 className="font-extrabold text-slate-900 text-base mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. OUR SHOP IN ACTION (VIDEO SHOWCASE) + INSTAGRAM BANNER
         ===================================================================== */}
      <section id="shop-videos" className="py-20 bg-[#15181f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Real Work. Real Results. Right Here in Dallas.
            </h2>
            <p className="mt-3 text-slate-300 text-base">
              Take a look behind the scenes inside our Farmers Branch facility at how we fabricate
              custom signs, print apparel, and produce commercial marketing materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {SHOP_VIDEOS.map((vid) => (
              <div
                key={vid.title}
                className="rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-black">
                  <video
                    src={vid.videoUrl}
                    poster={vid.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
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
          12. CUSTOMER REVIEWS SECTION
         ===================================================================== */}
      <section id="reviews" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 mb-3">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>5.0 ★ Verified Google Reviews</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                What Dallas Business Owners Say About Us
              </h2>
              <p className="mt-2 text-slate-600 text-base">
                Real 5-star reviews from DFW retail stores, medical clinics, churches, and fleet
                operators.
              </p>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-slate-800 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 transition-colors shrink-0 self-start md:self-auto"
            >
              <span>View on Google Maps</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.name}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-5 hover:shadow-lg hover:bg-white transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                      {rev.service}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">“{rev.text}”</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00b8a9] to-[#1a1d24] text-white font-extrabold text-xs flex items-center justify-center">
                      {rev.initials}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{rev.name}</div>
                      <div className="text-xs text-slate-500">{rev.location}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">Google Review</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          13. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ===================================================================== */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 mb-3">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {HOME_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-white border-teal-500 shadow-md'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-extrabold text-slate-900 text-base">{item.q}</span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
