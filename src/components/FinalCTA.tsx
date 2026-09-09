import React from 'react';
import { ShoppingBag, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { getFrameUrl, FRAME_CONFIG } from '../config/frameConfig';

interface FinalCTAProps {
  onShopMobiles: () => void;
  onBookService: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onShopMobiles, onBookService }) => {
  const finalFrameUrl = getFrameUrl(FRAME_CONFIG.totalFrames - 1, FRAME_CONFIG);

  return (
    <section
      id="final-cta"
      className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-[#0B0B0C] via-[#5A0207] to-[#8B0000] text-[#EDE7C7]"
    >
      {/* Radiant Luxury Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8B0000] blur-[160px] opacity-70" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#EDE7C7] blur-[180px] opacity-15" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0306]/80 border border-[#EDE7C7]/25 text-xs uppercase tracking-[0.25em] text-[#EDE7C7] mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#EDE7C7]" />
          <span>The Definitive Mobile Destination</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Your Mobile. <span className="text-[#EDE7C7]">Our Expertise.</span>
        </h2>

        {/* Description */}
        <p className="mt-4 text-base sm:text-xl text-[#EDE7C7]/90 max-w-xl font-normal leading-relaxed">
          Buy smarter. Repair better. Stay connected.
        </p>

        {/* The Definitive Mobile Destination Landing Stage: Where the scroll image settles */}
        <div
          id="final-cta-settle-stage"
          className="relative my-8 sm:my-10 w-full max-w-[320px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px] aspect-[16/9] flex items-center justify-center pointer-events-none select-none"
        >
          {/* Radiant Pedestal Ring Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EDE7C7]/20 via-[#8B0000]/30 to-[#EDE7C7]/20 blur-3xl transform scale-110 pointer-events-none" />
          <div className="absolute w-44 sm:w-60 md:w-72 h-44 sm:h-60 md:h-72 rounded-full border border-[#EDE7C7]/20 animate-pulse pointer-events-none" />

          {/* Hidden noscript fallback */}
          <noscript>
            <img
              src={finalFrameUrl}
              alt="MOBIXA Fully Assembled Flagship"
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] select-none"
            />
          </noscript>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            id="final-cta-shop-btn"
            type="button"
            onClick={onShopMobiles}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#EDE7C7] hover:bg-white text-[#8B0000] font-bold text-sm tracking-wide shadow-2xl shadow-black/40 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Mobiles</span>
          </button>

          <button
            id="final-cta-book-btn"
            type="button"
            onClick={onBookService}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3D0306]/90 hover:bg-[#520509] text-[#EDE7C7] border border-[#EDE7C7]/30 font-semibold text-sm tracking-wide hover:border-[#EDE7C7] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Wrench className="w-4 h-4" />
            <span>Book a Service</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-[#EDE7C7]/20 flex flex-wrap items-center justify-center gap-6 text-xs text-[#EDE7C7]/80 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EDE7C7]" /> Genuine Brand Stock
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EDE7C7]/40" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EDE7C7]" /> Certified Level-4 Lab
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EDE7C7]/40" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EDE7C7]" /> 180-Day Guarantee
          </span>
        </div>
      </div>
    </section>
  );
};
