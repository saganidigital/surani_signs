import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sparkles,
  FileCheck,
  Wrench,
  ChevronDown,
  Layers,
  MapPin,
  Star,
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

  // Normalize slug in case user visits with .html suffix
  const cleanSlug = slug ? slug.replace(/\.html$/i, '') : null;
  const activeService = cleanSlug
    ? SERVICES_DATA.find((s) => s.slug === cleanSlug) || SERVICES_DATA[0]
    : null;

  useEffect(() => {
    setOpenFaq(0);
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
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Wave Hero Header */}
        <section className="relative overflow-hidden bg-white pt-12 pb-16 border-b border-slate-200">
          <img
            src="/images/teal-wave-bg.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-35 animate-wave-float pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/75" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-teal-300 text-xs font-bold mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>Surani Signs • Complete DFW Service Directory</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Custom Signs, Vehicle Wraps &amp; Commercial Printing in Dallas
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Select any of our 13 in-house sign, wrap, apparel, and repair services below to
                inspect engineering specs, Dallas permit requirements, turnaround timelines, and
                real project examples.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                      : 'bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-700 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All Services Cards Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-teal-500 shadow-xs hover:shadow-md transition-colors duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-slate-900">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                        <span className="text-teal-600 font-bold uppercase tracking-wider">{service.category}</span>
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-teal-500" />
                          {service.turnaround}
                        </span>
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                        {service.title}
                      </h2>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                        {service.summary}
                      </p>

                      {/* Mini Spec Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {service.idealFor.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-teal-700 group-hover:text-teal-600">
                    <span>View Full Service Page</span>
                    <span className="w-8 h-8 rounded-full bg-teal-50 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Order & Quote CTA */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Ready to Build Your Sign?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Get an Itemized Quote &amp; Digital Mockup
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Interactive Demo Service Switcher Bar */}
      <div className="bg-slate-100 border-b border-slate-200/90 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white shrink-0 hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 13 Services</span>
          </Link>
          <span className="text-slate-300">|</span>
          {SERVICES_DATA.map((s) => {
            const isCurrent = s.slug === activeService.slug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => navigate(`/services/${s.slug}`)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-700 border border-slate-200'
                }`}
              >
                {s.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. SERVICE HERO WITH TEAL/CHARCOAL WAVE ACCENT */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:py-16 border-b border-slate-200/80">
        <img
          src="/images/teal-wave-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-35 animate-wave-float pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Service Copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                  {activeService.category}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-900 text-white">
                  {activeService.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                {activeService.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {activeService.heroSubtext}
              </p>

              {/* 3 Key Engineering Specs Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Typical Turnaround
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{activeService.turnaround}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    City Permit Status
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{activeService.permitRequired}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Build Standard
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{activeService.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => openOrderModal({ signType: activeService.shortName })}
                  className="btn-shine inline-flex items-center gap-2 px-7 py-4 rounded-full font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] shadow-lg shadow-teal-500/25 cursor-pointer"
                >
                  <span>Get a Free {activeService.shortName} Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Featured Service Image Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden bg-slate-900 border-4 border-white shadow-2xl relative group">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center justify-between text-xs text-teal-300 font-bold mb-1">
                    <span>In-House Farmers Branch Fabrication</span>
                    <span className="inline-flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0 DFW Rated
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Includes free site survey, photorealistic building mockup, and turnkey DFW
                    installation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY THIS SIGN WORKS + IDEAL INDUSTRIES */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Built for Dallas &amp; DFW Visibility
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Why {activeService.title} Work for Dallas Businesses
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {activeService.whyItWorks}
              </p>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Who Typically Orders {activeService.shortName}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeService.idealFor.map((industry) => (
                  <span
                    key={industry}
                    className="px-3.5 py-2 rounded-xl bg-teal-50/80 border border-teal-200 text-xs font-bold text-teal-900"
                  >
                    ✓ {industry}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  Installed across Dallas, Plano, Frisco, Irving, Farmers Branch, Fort Worth &amp;
                  DFW.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE BUILD IT (4-CARD ENGINEERING BREAKDOWN) */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 mb-3">
              Commercial-Grade Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How We Build Your {activeService.shortName}
            </h2>
            <p className="mt-2 text-slate-600 text-base">
              Engineered in our Farmers Branch shop with materials chosen for Texas heat, UV
              exposure, and long-term durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeService.buildSpecs.map((spec, idx) => (
              <div
                key={spec.title}
                className="p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-teal-500 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1a1d24] text-teal-400 font-black text-sm flex items-center justify-center mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{spec.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STEP-BY-STEP PROCESS FOR THIS SERVICE */}
      <section className="py-20 bg-[#1a1d24] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-3">
              Turnkey Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              From First Call to Final Installation
            </h2>
          </div>

          <div className="space-y-4">
            {activeService.processSteps.map((step, index) => (
              <div
                key={step.title}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00b8a9] to-[#0d7a77] text-white font-black text-lg flex items-center justify-center shrink-0 shadow-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{step.title}</h3>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE-SPECIFIC FAQ + RELATED SERVICES */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Service FAQs */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Service FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-6">
              {activeService.shortName} — Common Questions
            </h2>

            <div className="space-y-3.5">
              {activeService.faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={f.q}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-bold text-slate-900 text-base">{f.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-teal-600 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Related Sign Services */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Explore More
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-6">
              Related Sign &amp; Print Services
            </h3>
            <div className="space-y-4">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-xs flex items-center gap-4 transition-all"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-teal-700">{rel.category}</div>
                    <h4 className="font-extrabold text-slate-900 group-hover:text-teal-600 truncate">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{rel.summary}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Fast Turnaround
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Ready to Order Your {activeService.shortName}?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Upload your artwork, dimensions, or site photo. We’ll verify your Dallas sign code and deliver a written quote within 1 business day.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openOrderModal({ signType: activeService.shortName })}
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] shadow-lg shadow-teal-500/25 cursor-pointer"
            >
              <span>Get Free {activeService.shortName} Mockup &amp; Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
