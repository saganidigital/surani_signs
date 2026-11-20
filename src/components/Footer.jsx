import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Camera,
  Star,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/siteData';
import { useOrderModal } from '../context/OrderModalContext';

export default function Footer() {
  const { openOrderModal } = useOrderModal();

  return (
    <>
      <footer className="bg-[#15181f] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-white/10 relative overflow-hidden">
        {/* Top Teal/Slate Gradient Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1a1d24] via-[#00b8a9] to-[#1a1d24]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Trust */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-block bg-white px-4 py-2.5 rounded-xl shadow-sm">
                <img
                  src={BUSINESS_INFO.logoUrl}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = BUSINESS_INFO.remoteLogoFallback;
                  }}
                  alt="Surani Signs Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                Custom sign company in Dallas, TX. We design, permit, fabricate, install, and repair
                commercial signage, vehicle wraps, custom embroidery, and promotional printing across
                the entire DFW Metroplex.
              </p>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">5.0 • Google Verified Reviews</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> Licensed &amp; Insured in TX
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> In-House Farmers Branch Shop
                </span>
              </div>
            </div>

            {/* Col 2: Exterior & Commercial Signs */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-bold text-base mb-4 tracking-tight">
                Sign &amp; Print Services
              </h4>
              <ul className="space-y-2 text-sm">
                {SERVICES_DATA.slice(0, 8).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                      <span>{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: More Services & DFW Areas */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold text-base mb-4 tracking-tight">
                Specialty &amp; Areas
              </h4>
              <ul className="space-y-2 text-sm mb-6">
                {SERVICES_DATA.slice(8).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                      <span>{s.shortName}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
                DFW Cities Served
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                {BUSINESS_INFO.citiesServed.join(' • ')}
              </p>
            </div>

            {/* Col 4: Contact & Social Icons */}
            <div className="lg:col-span-3 space-y-5">
              <h4 className="text-white font-bold text-base tracking-tight">Connect With Us</h4>

              {/* Horizontal Icon Action Bar */}
              <div className="flex items-center gap-3">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  title={`Call ${BUSINESS_INFO.phone}`}
                  aria-label={`Call ${BUSINESS_INFO.phone}`}
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-teal-500/20 text-teal-400 border border-white/10 hover:border-teal-400/50 flex items-center justify-center transition-all hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  title={`Email ${BUSINESS_INFO.email}`}
                  aria-label={`Email ${BUSINESS_INFO.email}`}
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-teal-500/20 text-teal-400 border border-white/10 hover:border-teal-400/50 flex items-center justify-center transition-all hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                </a>

                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`Map: ${BUSINESS_INFO.address}`}
                  aria-label="Google Maps Location"
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-teal-500/20 text-teal-400 border border-white/10 hover:border-teal-400/50 flex items-center justify-center transition-all hover:scale-105"
                >
                  <MapPin className="w-5 h-5" />
                </a>

                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`Instagram: ${BUSINESS_INFO.instagramHandle}`}
                  aria-label={`Follow ${BUSINESS_INFO.instagramHandle} on Instagram`}
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-pink-500/20 text-pink-400 border border-white/10 hover:border-pink-400/50 flex items-center justify-center transition-all hover:scale-105"
                >
                  <Camera className="w-5 h-5" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => openOrderModal()}
                className="btn-shine w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#00b8a9] to-[#0d8a80] hover:from-[#00a396] hover:to-[#0a756c] shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} Surani Signs. All rights reserved. Custom sign company
              serving Dallas and the DFW Metroplex.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/" className="hover:text-teal-400 transition-colors">
                Home
              </Link>
              <Link to="/services" className="hover:text-teal-400 transition-colors">
                All Services
              </Link>
              <Link to="/visualizer" className="hover:text-teal-400 transition-colors">
                Interactive Studio
              </Link>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-400 transition-colors"
              >
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Call & Quote Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 grid grid-cols-2 gap-2.5 shadow-[0_-8px_25px_rgba(15,23,42,0.1)]">
        <a
          href={BUSINESS_INFO.phoneHref}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-sm text-slate-900 bg-slate-100 border border-slate-300"
        >
          <Phone className="w-4 h-4 text-teal-600" />
          <span>Call Now</span>
        </a>
        <button
          type="button"
          onClick={() => openOrderModal()}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-sm text-white bg-teal-600 shadow-sm cursor-pointer"
        >
          <span>Get Free Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
