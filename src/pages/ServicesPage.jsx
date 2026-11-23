import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sparkles,
  FileCheck,
  Wrench,
  ChevronDown,
  Layers,
  MapPin,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/siteData';
import { useOrderModal } from '../context/OrderModalContext';

const CATEGORIES = [
  'All Services',
  'Exterior & Illuminated',
  'Wraps, Vinyl & Banners',
  'Interior & Compliance',
  'Apparel & Event Print',
  'Repair & Maintenance',
];

export default function ServicesPage() {
  const { openOrderModal } = useOrderModal();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [openFaq, setOpenFaq] = useState(0);
  const [activeBuildSpec, setActiveBuildSpec] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Normalize slug in case user visits with .html suffix
  const cleanSlug = slug ? slug.replace(/\.html$/i, '') : null;
  const activeService = cleanSlug
    ? SERVICES_DATA.find((s) => s.slug === cleanSlug) || SERVICES_DATA[0]
    : null;

  useEffect(() => {
    setOpenFaq(0);
    setActiveBuildSpec(0);
    setActiveProcessStep(0);
  }, [cleanSlug]);

  const filteredServices =
    selectedCategory === 'All Services'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  // ============================================================================
  // VIEW A: ALL 13 SERVICES HUB (/services)
  // ============================================================================
  if (!activeService) {
    return (
      <div className="min-h-screen flex flex-col overflow-x-clip bg-slate-50 dark:bg-[#0f1218] transition-colors duration-300">
        {/* Wave Hero Header */}
        <section className="relative overflow-hidden bg-white dark:bg-[#0f1218] pt-10 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200 dark:border-white/10">
          <img
            src="/images/teal-wave-bg.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-35 dark:opacity-15 animate-wave-float pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/75 dark:from-[#0f1218] dark:via-[#0f1218]/90 dark:to-[#0f1218]/70" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Custom Signs, Vehicle Wraps &amp; Commercial Printing in Dallas
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Select any of our 13 in-house sign, wrap, apparel, and repair services below to
                inspect engineering specs, Dallas permit requirements, turnaround timelines, and
                real project examples.
              </p>
            </div>

            {/* Clean Underline Category Filter Bar */}
            <div className="no-scrollbar mt-7 sm:mt-10 flex items-center gap-x-5 sm:gap-x-7 border-b border-slate-200 dark:border-white/10 overflow-x-auto flex-nowrap sm:flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border-b-2 -mb-px shrink-0 ${
                    selectedCategory === cat
                      ? 'text-teal-700 dark:text-[#00b8a9] border-[#00b8a9]'
                      : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Frameless Editorial Services Grid */}
        <section className="py-14 sm:py-20 bg-white dark:bg-[#0f1218] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-10 sm:gap-y-14">
              {filteredServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 mb-5">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-[#00b8a9] font-bold uppercase tracking-wider">
                        {service.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-400 dark:text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-[#00b8a9]" />
                        {service.turnaround}
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-[#00b8a9] transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-[#00b8a9] transition-colors">
                    <span>View Full Service Page</span>
                    <ArrowRight className="w-4 h-4 text-[#00b8a9] transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Order & Quote CTA */}
        <section className="py-14 sm:py-20 bg-slate-50 dark:bg-[#15181f] border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Get an Itemized Quote &amp; Digital Mockup
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
              Submit your project details or upload artwork. We’ll review your specs and provide a firm written proposal within 1 business day.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openOrderModal()}
                className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] shadow-lg shadow-teal-500/25 cursor-pointer"
              >
                <span>Open Quick Order Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============================================================================
  // VIEW B: DEDICATED SERVICE DETAIL PAGE (/services/:slug)
  // ============================================================================
  const relatedServices = SERVICES_DATA.filter((s) => s.slug !== activeService.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip bg-white dark:bg-[#0f1218] transition-colors duration-300">
      {/* 1. SERVICE HERO WITH TEAL/CHARCOAL WAVE ACCENT */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0f1218] pt-8 pb-12 sm:pt-10 sm:pb-16 lg:py-16 border-b border-slate-200/80 dark:border-white/10">
        <img
          src="/images/teal-wave-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-35 dark:opacity-15 animate-wave-float pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 dark:from-[#0f1218] dark:via-[#0f1218]/92 dark:to-[#0f1218]/70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Service Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#00b8a9]">
                {activeService.category} • {activeService.badge}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                {activeService.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeService.heroSubtext}
              </p>

              {/* Borderless Horizontal Architectural Specs Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10 py-4">
                <div className="py-2 sm:py-0 sm:pr-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Typical Turnaround
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#00b8a9] shrink-0" />
                    <span>{activeService.turnaround}</span>
                  </div>
                </div>

                <div className="py-2 sm:py-0 sm:px-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    City Permit Status
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#00b8a9] shrink-0" />
                    <span>{activeService.permitRequired}</span>
                  </div>
                </div>

                <div className="py-2 sm:py-0 sm:pl-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Build Standard
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00b8a9] shrink-0" />
                    <span>{activeService.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openOrderModal({ signType: activeService.shortName })}
                  className="btn-shine inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] shadow-lg shadow-teal-500/25 cursor-pointer"
                >
                  <span>Get a Free {activeService.shortName} Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border-2 border-slate-200 dark:border-white/15"
                >
                  <Phone className="w-4 h-4 text-teal-600 dark:text-[#00b8a9]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Featured Service Image Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden bg-slate-900 border-4 border-white dark:border-white/10 shadow-2xl relative">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-[240px] sm:h-[320px] lg:h-[360px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY THIS SIGN WORKS + IDEAL INDUSTRIES (BORDERLESS EDITORIAL) */}
      <section className="py-14 sm:py-20 bg-slate-50/70 dark:bg-[#15181f] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00b8a9]">
                Built for Dallas &amp; DFW Visibility
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Why {activeService.title} Work for Dallas Businesses
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeService.whyItWorks}
              </p>
            </div>

            <div className="lg:col-span-5 border-l-2 border-[#00b8a9]/40 pl-6 sm:pl-8 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Who Typically Orders {activeService.shortName}
              </h3>
              <ul className="divide-y divide-slate-200/80 dark:divide-white/10">
                {activeService.idealFor.map((industry) => (
                  <li
                    key={industry}
                    className="py-3 flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-teal-700 dark:hover:text-[#00b8a9] hover:translate-x-1 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00b8a9] shrink-0" />
                    <span>{industry}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00b8a9] shrink-0" />
                <span>
                  Installed across Dallas, Plano, Frisco, Irving, Farmers Branch, Fort Worth &amp;
                  DFW.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE BUILD IT (INTERACTIVE HORIZONTAL ENGINEERING SPEC RAIL) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1218] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              How We Build Your {activeService.shortName}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
              Engineered in our Farmers Branch shop with materials chosen for Texas heat, UV
              exposure, and long-term durability. Select any stage below to inspect the specs.
            </p>
          </div>

          {/* Interactive Spec Rail Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-slate-200 dark:border-white/10 pt-6">
            {activeService.buildSpecs.map((spec, idx) => {
              const isActive = idx === activeBuildSpec;
              return (
                <button
                  key={spec.title}
                  type="button"
                  onMouseEnter={() => setActiveBuildSpec(idx)}
                  onClick={() => setActiveBuildSpec(idx)}
                  className="text-left group relative pt-4 cursor-pointer"
                >
                  <span
                    className={`absolute -top-[25px] left-0 h-[2px] transition-all duration-300 ${
                      isActive ? 'w-full bg-[#00b8a9]' : 'w-0 bg-slate-300 dark:bg-white/25 group-hover:w-1/2'
                    }`}
                  />
                  <div
                    className={`text-xs font-bold tabular-nums mb-1.5 transition-colors ${
                      isActive ? 'text-[#00b8a9]' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-extrabold transition-colors ${
                      isActive
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                    }`}
                  >
                    {spec.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Spec Spotlight Description */}
          {(() => {
            const currentSpec =
              activeService.buildSpecs[activeBuildSpec] || activeService.buildSpecs[0];
            if (!currentSpec) return null;
            return (
              <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                <div className="lg:col-span-4">
                  <span className="text-5xl font-black text-slate-200 dark:text-white/10 tabular-nums">
                    0{activeBuildSpec + 1}
                  </span>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                    {currentSpec.title}
                  </h4>
                </div>
                <p className="lg:col-span-8 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {currentSpec.desc}
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 4. STEP-BY-STEP PROCESS (INTERACTIVE DARK VERTICAL TIMELINE) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#1a1d24] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              From First Call to Final Installation
            </h2>
          </div>

          <div className="relative pl-10 sm:pl-14">
            {/* Vertical Connecting Line */}
            <div className="absolute left-3.5 sm:left-5 top-3 bottom-3 w-px bg-white/15" />

            <div className="divide-y divide-white/10">
              {activeService.processSteps.map((step, index) => {
                const isActive = activeProcessStep === index;
                return (
                  <div
                    key={step.title}
                    onMouseEnter={() => setActiveProcessStep(index)}
                    onClick={() => setActiveProcessStep(index)}
                    className="relative py-7 first:pt-0 last:pb-0 cursor-pointer group"
                  >
                    <span
                      className={`absolute -left-10 sm:-left-14 top-7 w-7 h-7 sm:w-10 sm:h-10 rounded-full font-black text-xs sm:text-sm flex items-center justify-center transition-all duration-300 ${
                        index === 0 ? '!top-0' : ''
                      } ${
                        isActive
                          ? 'bg-[#00b8a9] text-slate-950 scale-110 shadow-lg shadow-teal-500/30'
                          : 'bg-[#1a1d24] border border-white/25 text-slate-400 group-hover:border-teal-400'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <h3
                      className={`text-lg sm:text-xl font-extrabold transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-base mt-2 leading-relaxed max-w-2xl transition-colors ${
                        isActive ? 'text-slate-300' : 'text-slate-500'
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
      </section>

      {/* 5. SERVICE-SPECIFIC FAQ + RELATED SERVICES (BORDERLESS HAIRLINE LISTS) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#15181f] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Borderless Hairline Service FAQs */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00b8a9]">
              Service FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-8">
              {activeService.shortName} — Common Questions
            </h2>

            <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
              {activeService.faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className="group">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span
                        className={`font-extrabold text-base transition-colors ${
                          isOpen
                            ? 'text-teal-700 dark:text-[#00b8a9]'
                            : 'text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-[#00b8a9]'
                        }`}
                      >
                        {f.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#00b8a9]' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Borderless Related Sign Services */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00b8a9]">
              Explore More
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 mb-8">
              Related Sign &amp; Print Services
            </h3>
            <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="group py-5 flex items-center gap-4 transition-all"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-20 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#00b8a9]">{rel.category}</div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-[#00b8a9] truncate transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{rel.summary}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#00b8a9] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0f1218] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ready to Order Your {activeService.shortName}?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Upload your artwork, dimensions, or site photo. We’ll verify your Dallas sign code and deliver a written quote within 1 business day.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openOrderModal({ signType: activeService.shortName })}
              className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] shadow-lg shadow-teal-500/25 cursor-pointer"
            >
              <span>Get Free {activeService.shortName} Mockup &amp; Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15"
            >
              <Phone className="w-4 h-4 text-teal-600 dark:text-[#00b8a9]" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
