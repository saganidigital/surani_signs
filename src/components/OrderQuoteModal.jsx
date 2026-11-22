import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Upload,
  CheckCircle2,
} from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';

export default function OrderQuoteModal() {
  const { isOpen, closeOrderModal, modalData } = useOrderModal();
  const [mode, setMode] = useState('full'); // 'full' | 'quick'
  const [signType, setSignType] = useState('');
  const [signText, setSignText] = useState('');
  const [details, setDetails] = useState('');
  const [fileName, setFileName] = useState('');
  const [submittedDemo, setSubmittedDemo] = useState(false);

  useEffect(() => {
    if (modalData) {
      if (modalData.signType) setSignType(modalData.signType);
      if (modalData.signText) setSignText(modalData.signText);
      if (modalData.details) setDetails(modalData.details);
    } else {
      setSignType('');
      setSignText('');
      setDetails('');
    }
    setSubmittedDemo(false);
  }, [modalData, isOpen]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeOrderModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, closeOrderModal]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedDemo(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeOrderModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl my-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 animate-[heroRevealUp_0.25s_cubic-bezier(0.16,1,0.3,1)_both] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeOrderModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 mb-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order Your Custom Sign
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Specify your dimensions, sign type, or upload artwork. We reply with pricing within 1 business day.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('full');
              setSubmittedDemo(false);
            }}
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'quick'
                ? 'bg-white text-teal-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ 60-Second Fast Quote
          </button>
        </div>

        {modalData && modalData.details && !submittedDemo && (
          <div className="mb-4 p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-2 text-xs text-teal-900 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Loaded your design specs from the Live Sign Visualizer!</span>
          </div>
        )}

        {submittedDemo ? (
          <div className="py-10 px-4 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-900">
              Quote Request Received!
            </h4>
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
              <button
                type="button"
                onClick={closeOrderModal}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white cursor-pointer"
              >
                Done
              </button>
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
                  <label className="flex items-center justify-between px-4 py-2.5 rounded-xl border-2 border-dashed border-teal-500/60 bg-teal-50/50 hover:bg-teal-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-900 truncate">
                      <Upload className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="truncate">
                        {fileName || 'Click to attach PNG, JPG, PDF, AI, or EPS file'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-white px-2.5 py-1 rounded-lg border border-teal-200 shrink-0 ml-2">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
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
  );
}
