import React from 'react';
import { ShoppingBag, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { getFrameUrl, FRAME_CONFIG } from '../config/frameConfig';
import { FLOATING_PHONE_IMAGE_URL } from './PhoneTravelingCharacter';

interface FinalCTAProps {
  onShopMobiles: () => void;
  onBookService: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onShopMobiles, onBookService }) => {
  const finalFrameUrl = getFrameUrl(FRAME_CONFIG.totalFrames - 1, FRAME_CONFIG);
  const displayImage = FLOATING_PHONE_IMAGE_URL || finalFrameUrl;

  return (
    <section
      id="final-cta"
      className="relative py-28 md:py-36 overflow-hidden bg-[#8B0000] border-t border-[#A30808] text-white"
    >
      {/* Radiant Luxury Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white blur-[160px] opacity-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-black blur-[180px] opacity-25" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center flex flex-col items-center">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs uppercase tracking-[0.25em] text-[#EDE7C7] font-semibold mb-6 shadow-sm backdrop-blur-md">
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
          className="relative my-8 sm:my-10 w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px] max-w-[88vw] aspect-[16/9] flex items-center justify-center select-none"
        >
          {/* Radiant Pedestal Ring Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EDE7C7]/15 via-[#EDE7C7]/25 to-[#EDE7C7]/15 blur-3xl transform scale-115 pointer-events-none" />
          <div className="absolute w-44 sm:w-60 md:w-72 h-44 sm:h-60 md:h-72 rounded-full border-2 border-[#EDE7C7]/40 animate-pulse pointer-events-none shadow-[0_0_35px_rgba(237,231,199,0.3)]" />

          {/* Pedestal Base Disc */}
          <div className="absolute bottom-2 w-3/4 h-8 bg-gradient-to-r from-transparent via-[#EDE7C7]/20 to-transparent rounded-[100%] blur-md pointer-events-none" />

          {/* Settle Anchor Image on the Pedestal */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img
              src={displayImage}
              alt="MOBIXA Fully Assembled Flagship"
              className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(237,231,199,0.25)] select-none transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                if (displayImage !== finalFrameUrl) {
                  (e.target as HTMLImageElement).src = finalFrameUrl;
                }
              }}
            />
          </div>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            id="final-cta-shop-btn"
            type="button"
            onClick={onShopMobiles}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#EDE7C7] hover:bg-white text-[#8B0000] font-extrabold text-sm tracking-wide shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Mobiles</span>
          </button>

          <button
            id="final-cta-book-btn"
            type="button"
            onClick={onBookService}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold text-sm tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Wrench className="w-4 h-4 text-[#EDE7C7]" />
            <span>Book a Service</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-[#EDE7C7]/80 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EDE7C7]" /> Genuine Brand Stock
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EDE7C7]" /> Certified Level-4 Lab
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EDE7C7]" /> 180-Day Guarantee
          </span>
        </div>
      </div>
    </section>
  );
};
