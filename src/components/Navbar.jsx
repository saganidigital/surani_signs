import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Layers,
  ShieldCheck,
  Shirt,
  Sun,
  Moon,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/siteData';
import { useOrderModal } from '../context/OrderModalContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { openOrderModal } = useOrderModal();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll & close on Escape when mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

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
            ? 'bg-white/95 dark:bg-[#0f1218]/95 backdrop-blur-md shadow-[0_8px_30px_rgb(15,23,42,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.45)] border-b border-slate-200/80 dark:border-white/10 py-2 sm:py-2.5'
            : 'bg-white/90 dark:bg-[#0f1218]/90 backdrop-blur-sm border-b border-slate-200/60 dark:border-white/10 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Far-Left Mobile Hamburger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-white/10 hover:bg-slate-200/80 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 cursor-pointer transition-colors active:scale-95"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link
              to="/"
              className="flex items-center group min-w-0 shrink dark:bg-white/95 dark:px-2 dark:py-1 dark:rounded-lg dark:sm:px-2.5 dark:sm:py-1 dark:sm:rounded-xl transition-colors"
            >
              <img
                src={BUSINESS_INFO.logoUrl}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = BUSINESS_INFO.remoteLogoFallback;
                }}
                alt="Surani Signs Logo"
                className="h-7 min-[390px]:h-8 sm:h-11 lg:h-12 dark:h-6 dark:min-[390px]:h-7 dark:sm:h-9 dark:lg:h-10 w-auto max-w-[165px] min-[390px]:max-w-[195px] sm:max-w-none object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'text-teal-700 dark:text-[#00b8a9] bg-teal-50/90 dark:bg-teal-500/15'
                  : 'text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-[#00b8a9] hover:bg-slate-100/70 dark:hover:bg-white/5'
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
                    ? 'text-teal-700 dark:text-[#00b8a9] bg-teal-50/90 dark:bg-teal-500/15'
                    : 'text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-[#00b8a9] hover:bg-slate-100/70 dark:hover:bg-white/5'
                }`}
              >
                <span>Our Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-teal-600 dark:text-[#00b8a9]' : ''
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel */}
              {dropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[780px] z-50">
                  <div className="bg-white dark:bg-[#15181f] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-white/10 p-6 grid grid-cols-3 gap-6 relative overflow-hidden">
                    {/* Decorative Top Wave Accent Line */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1a1d24] via-[#00b8a9] to-[#1a1d24]" />

                    {/* Column 1: Exterior & Illuminated */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-[#00b8a9] mb-3 pb-2 border-b border-slate-100 dark:border-white/10">
                        <Layers className="w-4 h-4 text-teal-600 dark:text-[#00b8a9]" />
                        <span>Exterior &amp; Illuminated</span>
                      </div>
                      <ul className="space-y-1.5">
                        {exteriorServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="group flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-teal-50/70 dark:hover:bg-white/5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-[#00b8a9] transition-colors"
                            >
                              <span>{s.shortName}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600 dark:text-[#00b8a9]" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Wraps, Vinyl, Banners & Interior */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-[#00b8a9] mb-3 pb-2 border-b border-slate-100 dark:border-white/10">
                        <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-[#00b8a9]" />
                        <span>Wraps, Banners &amp; Interior</span>
                      </div>
                      <ul className="space-y-1.5">
                        {wrapsAndInterior.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="group flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-teal-50/70 dark:hover:bg-white/5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-[#00b8a9] transition-colors"
                            >
                              <span>{s.shortName}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600 dark:text-[#00b8a9]" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Apparel, Print & Repair */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-[#00b8a9] mb-3 pb-2 border-b border-slate-100 dark:border-white/10">
                          <Shirt className="w-4 h-4 text-teal-600 dark:text-[#00b8a9]" />
                          <span>Apparel, Print &amp; Repair</span>
                        </div>
                        <ul className="space-y-1.5">
                          {apparelAndRepair.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="group flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-teal-50/70 dark:hover:bg-white/5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-[#00b8a9] transition-colors"
                              >
                                <span>{s.shortName}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600 dark:text-[#00b8a9]" />
                              </Link>
                            </li>
                          ))}
                        </ul>
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
                  ? 'text-teal-700 dark:text-[#00b8a9] bg-teal-50/90 dark:bg-teal-500/15'
                  : 'text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-[#00b8a9] hover:bg-slate-100/70 dark:hover:bg-white/5'
              }`}
            >
              Interactive Studio
            </Link>
          </nav>

          {/* Desktop Right Theme Toggle, Call & Quote CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-10 h-10 rounded-full flex items-center justify-center text-amber-500 dark:text-[#00b8a9] bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 shadow-xs transition-all cursor-pointer"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <a
              href={BUSINESS_INFO.phoneHref}
              aria-label={`Call ${BUSINESS_INFO.phone}`}
              title={`Call ${BUSINESS_INFO.phone}`}
              className="w-10 h-10 rounded-full flex items-center justify-center text-teal-700 dark:text-[#00b8a9] bg-teal-50 dark:bg-teal-500/15 hover:bg-teal-100 dark:hover:bg-teal-500/25 border border-teal-200 dark:border-teal-500/30 hover:border-teal-400 shadow-xs transition-all"
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

          {/* Mobile & Tablet Right Controls: Theme Toggle + Call */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-amber-500 dark:text-[#00b8a9] bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 cursor-pointer"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              aria-label={`Call ${BUSINESS_INFO.phone}`}
              title={`Call ${BUSINESS_INFO.phone}`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-teal-700 dark:text-[#00b8a9] bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Left Slide-Out Drawer (outside <header> so backdrop-blur never traps fixed positioning) */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[60] lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            aria-label="Mobile Navigation"
            className="fixed inset-y-0 left-0 z-[70] w-[85vw] max-w-[340px] h-dvh bg-white dark:bg-[#15181f] border-r border-slate-200 dark:border-white/10 shadow-2xl flex flex-col lg:hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200/80 dark:border-white/10">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center dark:bg-white/95 dark:px-2 dark:py-1 dark:rounded-lg"
              >
                <img
                  src={BUSINESS_INFO.logoUrl}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = BUSINESS_INFO.remoteLogoFallback;
                  }}
                  alt="Surani Signs Logo"
                  className="h-7 dark:h-6 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close Menu"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col divide-y divide-slate-200/80 dark:divide-white/10">
                <Link
                  to="/"
                  className={`py-3.5 text-base font-bold flex items-center justify-between ${
                    location.pathname === '/'
                      ? 'text-teal-700 dark:text-[#00b8a9]'
                      : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                {/* Collapsible Services Accordion inside Hamburger Menu */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`w-full py-3 text-base font-bold flex items-center justify-between cursor-pointer ${
                      location.pathname.startsWith('/services')
                        ? 'text-teal-700 dark:text-[#00b8a9]'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    <span>Our Services (13)</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#00b8a9] transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="pb-3 pl-3 border-l-2 border-[#00b8a9]/40 ml-1 space-y-1">
                      <Link
                        to="/services"
                        className="flex items-center justify-between py-2 px-2.5 rounded-lg text-sm font-bold text-teal-700 dark:text-[#00b8a9] bg-teal-50/70 dark:bg-teal-500/10"
                      >
                        <span>View All 13 Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <div className="grid grid-cols-1 gap-1 pt-1">
                        {SERVICES_DATA.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            className="py-2 px-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-[#00b8a9] hover:bg-slate-50 dark:hover:bg-white/5"
                          >
                            {service.shortName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/visualizer"
                  className={`py-3.5 text-base font-bold flex items-center justify-between ${
                    location.pathname === '/visualizer'
                      ? 'text-teal-700 dark:text-[#00b8a9]'
                      : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  <span>Interactive Sign Studio</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Pinned Bottom Action Bar */}
            <div className="p-5 border-t border-slate-200 dark:border-white/10 space-y-2.5 bg-slate-50/80 dark:bg-[#0f1218]/60">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openOrderModal();
                }}
                className="w-full py-3.5 px-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] text-center shadow-md cursor-pointer"
              >
                Get Free Quote
              </button>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="block w-full py-3.5 px-4 rounded-full font-bold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/15 text-center"
              >
                Call {BUSINESS_INFO.phone}
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
