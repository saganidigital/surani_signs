import React, { useState, useEffect } from 'react';
import {
  Send,
  Upload,
  CheckCircle2,
  Phone,
  Clock,
  ShieldCheck,
  Sparkles,
  FileCheck2,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/siteData';

export default function OrderQuoteForm({ prefilledDesign, defaultService }) {
  const [mode, setMode] = useState('full'); // 'full' | 'quick'
  const [signType, setSignType] = useState(defaultService || '');
  const [signText, setSignText] = useState('');
  const [details, setDetails] = useState('');
  const [fileName, setFileName] = useState('');
  const [submittedDemo, setSubmittedDemo] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setSignType(defaultService);
    }
  }, [defaultService]);

  useEffect(() => {
    if (prefilledDesign) {
      setMode('full');
      if (prefilledDesign.signType) setSignType(prefilledDesign.signType);
      if (prefilledDesign.signText) setSignText(prefilledDesign.signText);
      if (prefilledDesign.details) setDetails(prefilledDesign.details);
    }
  }, [prefilledDesign]);

  const handleSubmit = (e) => {
    // Allow user to preview instant confirmation in demo OR submit to FormSubmit
    e.preventDefault();
    setSubmittedDemo(true);
  };

  return (
    <section
      id="order-sign"
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#18222d] to-[#0c4a47] text-white"
    >
      {/* Wave Background Overlay */}
      <img
        src="/images/teal-wave-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Why Order Direct + Contact Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Direct or Get a 60-Second Quote</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Order Your Custom Sign — Proof &amp; Pricing Within 1 Business Day
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Whether you have print-ready vector artwork or just an idea on a napkin, our Farmers
              Branch design and fabrication team handles everything from city permits to installation.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <FileCheck2 className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    1. Free Building Mockup &amp; Written Quote
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    See exactly how your sign looks on your building before spending a dime.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    2. Turnkey Dallas &amp; DFW City Permitting
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    We check zoning codes for your specific address and submit all city paperwork.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Clock className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    3. In-House Fabrication &amp; Licensed Install
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Built in Farmers Branch, TX and installed by our own crew — zero middlemen.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone Call Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-500/20 to-teal-600/10 border border-teal-400/30 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Prefer to Talk Right Now?
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  Call {BUSINESS_INFO.phone}
                </div>
                <div className="text-xs text-slate-300">Mon–Fri 8am–6pm • Farmers Branch Shop</div>
              </div>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="px-4 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 shrink-0 shadow-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7 bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('full');
                  setSubmittedDemo(false);
                }}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'full'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Direct Sign Order &amp; Artwork Upload
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('quick');
                  setSubmittedDemo(false);
                }}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'quick'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ⚡ 60-Second Fast Quote
              </button>
            </div>

            {prefilledDesign && !submittedDemo && (
              <div className="mb-5 p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between gap-3 text-xs text-teal-900">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Loaded your custom design from the Live Sign Visualizer!</span>
                </div>
              </div>
            )}

            {submittedDemo ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Quote Request Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you! Our Farmers Branch sign specialists will review your specs and respond
                  within 1 business day with pricing and mockup options.
                </p>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmittedDemo(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white"
                  >
                    Call {BUSINESS_INFO.phone} Now
                  </a>
                </div>
              </div>
            ) : (
              <form
                action="https://formsubmit.co/mudassirali0900@gmail.com"
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="order_type"
                  value={mode === 'full' ? 'Direct Sign Order' : '60-Second Quick Quote'}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      What Type of Sign? <span className="text-teal-600">*</span>
                    </label>
                    <select
                      name="sign_type"
                      value={signType}
                      onChange={(e) => setSignType(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select a sign or service...</option>
                      <option value="Channel Letters">Channel Letter Signs</option>
                      <option value="Monument Sign">Monument Sign</option>
                      <option value="Pylon Sign">Pylon Sign</option>
                      <option value="Storefront Sign">Storefront Sign</option>
                      <option value="Vehicle Wrap">Vehicle Wrap / Fleet Decal</option>
                      <option value="Digital Signage">Digital Signage (LED)</option>
                      <option value="Custom Banner">Custom Banner / Backdrop</option>
                      <option value="Window/Wall Vinyl">Window / Wall Vinyl Graphics</option>
                      <option value="ADA Sign">ADA / Office &amp; Lobby Sign</option>
                      <option value="Sign Repair">Sign Repair &amp; Maintenance</option>
                      <option value="Custom Embroidery & Apparel">Custom Embroidery &amp; Apparel</option>
                      <option value="Business Cards & Promo Print">Business Cards &amp; Event Print</option>
                      <option value="Other">Other / Not Sure Yet</option>
                    </select>
                  </div>

                  {mode === 'full' ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        What Should the Sign Say?
                      </label>
                      <input
                        type="text"
                        name="sign_text"
                        value={signText}
                        onChange={(e) => setSignText(e.target.value)}
                        placeholder="e.g. SURANI SIGNS"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Install City in DFW <span className="text-teal-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="Dallas, Plano, Frisco, Irving..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  )}
                </div>

                {mode === 'full' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Special Details, Dimensions or Mounting Notes
                      </label>
                      <textarea
                        name="details"
                        rows={3}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Rough dimensions, illuminated vs non-illuminated, brick/stucco wall, or timeline..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Upload Logo, Artwork or Storefront Photo (Optional)
                      </label>
                      <label className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-dashed border-teal-500/60 bg-teal-50/50 hover:bg-teal-50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2.5 text-xs font-semibold text-teal-900">
                          <Upload className="w-4 h-4 text-teal-600" />
                          <span>
                            {fileName || 'Click to attach PNG, JPG, PDF, AI, or EPS file'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-teal-700 bg-white px-2.5 py-1 rounded-lg border border-teal-200">
                          Browse
                        </span>
                        <input
                          type="file"
                          name="logo_file"
                          accept="image/*,.pdf,.ai,.eps"
                          onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </>
                )}

                <div className="pt-2 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Your Contact Information
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-teal-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Jane Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number <span className="text-teal-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="(214) 555-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {mode === 'full' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="jane@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Install City <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          placeholder="Dallas, Plano, Farmers Branch..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-shine w-full py-3.5 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#00b8a9] to-[#0a7e75] hover:from-[#00a396] hover:to-[#086860] shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {mode === 'full' ? 'Submit Sign Order & Get Mockup' : 'Get My Free 60-Sec Quote'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
