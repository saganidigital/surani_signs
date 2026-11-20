import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Layers,
  ShieldCheck,
  Shirt,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/siteData';
import { useOrderModal } from '../context/OrderModalContext';

export default function Navbar() {
  const { openOrderModal } = useOrderModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.hash]);

  const scrollToHomeSection = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exteriorServices = SERVICES_DATA.filter((s) => s.category === 'Exterior & Illuminated');
  const wrapsAndInterior = SERVICES_DATA.filter(
    (s) => s.category === 'Wraps, Vinyl & Banners' || s.category === 'Interior & Compliance'
  );
  const apparelAndRepair = SERVICES_DATA.filter(
    (s) => s.category === 'Apparel & Event Print' || s.category === 'Repair & Maintenance'
  );

  return (
    <>
      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(15,23,42,0.08)] border-b border-slate-200/80 py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={BUSINESS_INFO.logoUrl}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = BUSINESS_INFO.remoteLogoFallback;
              }}
              alt="Surani Signs Logo"
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'text-teal-700 bg-teal-50/90'
                  : 'text-slate-700 hover:text-teal-600 hover:bg-slate-100/70'
              }`}
            >
              Home
            </Link>

            {/* Mega Dropdown: Our Services */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/services"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'text-teal-700 bg-teal-50/90'
                    : 'text-slate-700 hover:text-teal-600 hover:bg-slate-100/70'
                }`}
              >
                <span>Our Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-teal-600' : ''
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel */}
              {dropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[780px] z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-6 grid grid-cols-3 gap-6 relative overflow-hidden">
                    {/* Decorative Top Wave Accent Line */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1a1d24] via-[#00b8a9] to-[#1a1d24]" />

                    {/* Column 1: Exterior & Illuminated */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 pb-2 border-b border-slate-100">
                        <Layers className="w-4 h-4 text-teal-600" />
                        <span>Exterior &amp; Illuminated</span>
                      </div>
                      <ul className="space-y-1.5">
                        {exteriorServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="group flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-teal-50/70 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                            >
                              <span>{s.shortName}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Wraps, Vinyl, Banners & Interior */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 pb-2 border-b border-slate-100">
                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                        <span>Wraps, Banners &amp; Interior</span>
                      </div>
                      <ul className="space-y-1.5">
                        {wrapsAndInterior.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="group flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-teal-50/70 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                            >
                              <span>{s.shortName}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Apparel, Print & Repair */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-3 pb-2 border-b border-slate-100">
                          <Shirt className="w-4 h-4 text-teal-600" />
                          <span>Apparel, Print &amp; Repair</span>
                        </div>
                        <ul className="space-y-1.5">
                          {apparelAndRepair.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="group flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-teal-50/70 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                              >
                                <span>{s.shortName}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                        <div className="text-xs font-semibold text-teal-400 mb-1">
                          Explore All 13 Services
                        </div>
                        <p className="text-xs text-slate-300 mb-2.5">
                          Compare specs, permits, and turnaround times across DFW.
                        </p>
                        <Link
                          to="/services"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <span>View Services Hub</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/visualizer"
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                location.pathname === '/visualizer'
                  ? 'text-teal-700 bg-teal-50/90'
                  : 'text-slate-700 hover:text-teal-600 hover:bg-slate-100/70'
              }`}
            >
              Interactive Studio
            </Link>

            <button
              type="button"
              onClick={() => scrollToHomeSection('process')}
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-teal-600 hover:bg-slate-100/70 transition-colors cursor-pointer"
            >
              7-Step Process
            </button>

            <button
              type="button"
              onClick={() => scrollToHomeSection('shop-videos')}
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-teal-600 hover:bg-slate-100/70 transition-colors cursor-pointer"
            >
              Shop in Action
            </button>

            <button
              type="button"
              onClick={() => scrollToHomeSection('reviews')}
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-teal-600 hover:bg-slate-100/70 transition-colors cursor-pointer"
            >
              Reviews
            </button>
          </nav>

          {/* Right Call & Quote CTAs */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.phoneHref}
              aria-label={`Call ${BUSINESS_INFO.phone}`}
              title={`Call ${BUSINESS_INFO.phone}`}
              className="w-10 h-10 rounded-full flex items-center justify-center text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 hover:border-teal-400 shadow-xs transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => openOrderModal()}
              className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#00b8a9] to-[#0d8a80] hover:from-[#00a396] hover:to-[#0a756c] shadow-md shadow-teal-500/20 transition-all cursor-pointer"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="px-4 py-2.5 rounded-xl font-semibold text-teal-700 bg-teal-50/70 flex items-center justify-between"
              >
                <span>All 13 Sign &amp; Print Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pl-3 pr-1 py-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 border-l-2 border-teal-500/40 ml-4">
                {SERVICES_DATA.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                  >
                    • {service.shortName}
                  </Link>
                ))}
              </div>

              <Link
                to="/visualizer"
                className={`px-4 py-2.5 rounded-xl font-semibold flex items-center justify-between ${
                  location.pathname === '/visualizer'
                    ? 'text-teal-700 bg-teal-50'
                    : 'text-slate-800 hover:bg-teal-50'
                }`}
              >
                <span>Interactive Sign Studio</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <button
                type="button"
                onClick={() => scrollToHomeSection('process')}
                className="text-left px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-teal-50"
              >
                Our 7-Step Process
              </button>
              <button
                type="button"
                onClick={() => scrollToHomeSection('shop-videos')}
                className="text-left px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-teal-50"
              >
                Shop In Action Videos
              </button>
              <button
                type="button"
                onClick={() => scrollToHomeSection('reviews')}
                className="text-left px-4 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-teal-50"
              >
                Customer Reviews
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openOrderModal();
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-teal-600 text-center shadow-md cursor-pointer"
              >
                Get Free Quote
              </button>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="w-full py-3 px-4 rounded-xl font-bold text-slate-800 bg-slate-100 border border-slate-300 text-center"
              >
                Call {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
