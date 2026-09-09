import React, { useRef } from 'react';
import { BRANDS } from '../config/brandConfig';
import { ShieldCheck, ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { BrandLogo } from './BrandLogos';

export const Brands: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Duplicate brands array for seamless continuous marquee loop
  const marqueeBrands = [...BRANDS, ...BRANDS];

  return (
    <section id="brands" className="relative py-20 md:py-28 bg-[#EDE7C7] border-t border-[#DDD6B5] overflow-hidden">
      {/* Content Overlay at z-20 so the traveling phone moves cleanly underneath */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#D8D1C4] text-[11px] uppercase tracking-[0.2em] text-[#18181B] font-semibold mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Authorized Retail & Service Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
            Trusted Brands. <span className="text-gradient-burgundy">Genuine Choices.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#52525B] leading-relaxed font-normal">
            We partner with and service world-leading mobile technology manufacturers with 100% genuine parts and factory warranty coverage.
          </p>
        </div>

        {/* Brand Slider Box - strictly contained inside max-w-7xl container */}
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm border border-[#D8D1C4] p-4 sm:p-6 shadow-sm">
          {/* Header Bar inside Slider with Slide Arrows */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#EFEBE3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-[#18181B]">
                Official Partner Showcase
              </span>
            </div>

            {/* Slider Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Scroll brands left"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#F6F3ED] border border-[#D8D1C4] hover:border-[#8B0000] text-[#18181B] transition-all shadow-xs active:scale-95 flex items-center justify-center min-w-[36px] min-h-[36px]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Scroll brands right"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#F6F3ED] border border-[#D8D1C4] hover:border-[#8B0000] text-[#18181B] transition-all shadow-xs active:scale-95 flex items-center justify-center min-w-[36px] min-h-[36px]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Touch Scrollable & Slide Track */}
          <div className="relative w-full overflow-hidden">
            {/* Edge Fade Gradients inside the framed box */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollContainerRef}
              className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 touch-pan-x cursor-grab active:cursor-grabbing select-none w-full max-w-full"
            >
              {marqueeBrands.map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  id={`brand-slide-card-${brand.id}-${idx}`}
                  className="group relative w-[230px] xs:w-[260px] sm:w-[280px] shrink-0 rounded-2xl bg-white border border-[#E5DFD4] hover:border-[#8B0000] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#8B0000]/10 hover:-translate-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    {/* Brand Logo Image */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4] group-hover:border-[#8B0000]/40 flex items-center justify-center p-2.5 transition-colors shadow-2xs">
                      <BrandLogo brandId={brand.id} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/20">
                      OEM Certified
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#18181B] group-hover:text-[#8B0000] transition-colors flex items-center gap-1">
                      <span>{brand.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8B0000] transition-opacity" />
                    </h3>
                    <p className="text-xs text-[#52525B] mt-1 line-clamp-2 leading-relaxed">
                      {brand.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] text-[#71717A] font-mono">
                    <span className="truncate mr-2">{brand.popularModels[0]}</span>
                    <span className="text-[#8B0000] font-semibold shrink-0">100% Genuine</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assurance Bar below brands */}
        <div className="mt-8 sm:mt-12">
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-[#D8D1C4] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="w-10 h-10 rounded-xl bg-[#8B0000]/10 border border-[#8B0000]/20 flex items-center justify-center text-[#8B0000] shrink-0">
                <Sparkles className="w-5 h-5 text-[#8B0000]" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#18181B]">
                  Official Brand Parts & Factory Seal Diagnostics
                </h4>
                <p className="text-xs text-[#52525B] mt-0.5">
                  Every smartphone and replacement component maintains original IP water resistance and manufacturer warranty ratings.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-white hover:bg-[#EDE8DE] border border-[#E5DFD4] text-xs font-semibold text-[#18181B] whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              Check Part Availability
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
