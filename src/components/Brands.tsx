import React from 'react';
import { BRANDS } from '../config/brandConfig';
import { ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';

export const Brands: React.FC = () => {
  return (
    <section id="brands" className="relative py-24 md:py-32 bg-transparent border-t border-[#1C1417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141315] border border-[#29181B] text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Authorized Retail & Service Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#EDE7C7]">
            Trusted Brands. <span className="text-gradient-cream">Genuine Choices.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#8E8770] leading-relaxed">
            We partner with and service world-leading mobile technology manufacturers with 100% genuine warranty coverage.
          </p>
        </div>

        {/* Brands Responsive Grid: 4-6 logos per row on desktop, 2-3 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              id={`brand-card-${brand.id}`}
              className="group relative rounded-2xl bg-[#141315]/80 border border-[#29181B] hover:border-[#8B0000]/70 p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-[#1A171B] hover:shadow-xl hover:shadow-[#8B0000]/10 hover:scale-[1.03]"
            >
              {/* Brand Logo / Monogram Insignia */}
              <div className="w-14 h-14 rounded-xl bg-[#1D1B20] border border-[#26171A] group-hover:border-[#8B0000] flex items-center justify-center mb-3 transition-colors">
                {brand.logoUrl ? (
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} Logo`}
                    className="w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="font-extrabold text-base tracking-wider text-[#EDE7C7] group-hover:text-white font-mono">
                    {brand.monogram}
                  </span>
                )}
              </div>

              {/* Brand Name */}
              <h3 className="text-sm font-bold text-[#EDE7C7] group-hover:text-white transition-colors">
                {brand.name}
              </h3>

              {/* Tagline snippet */}
              <p className="mt-1 text-[11px] text-[#8E8770] line-clamp-1 leading-snug">
                {brand.tagline}
              </p>

              {/* Subtle hover accent arrow */}
              <div className="mt-2 text-[10px] uppercase font-mono text-[#8B0000] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                <span>Genuine</span>
                <ArrowUpRight className="w-2.5 h-2.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Assurance Bar below brands */}
        <div className="mt-12 p-6 rounded-2xl bg-[#141315] border border-[#29181B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-10 h-10 rounded-xl bg-[#8B0000]/20 border border-[#8B0000]/40 flex items-center justify-center text-[#EDE7C7]">
              <Sparkles className="w-5 h-5 text-[#8B0000]" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-[#EDE7C7]">
                Official Brand Parts & Factory Seal Diagnostics
              </h4>
              <p className="text-xs text-[#8E8770]">
                Every replacement component maintains IP water resistance and manufacturer warranty ratings.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-[#1D1B20] hover:bg-[#252229] border border-[#29181B] text-xs font-semibold text-[#EDE7C7] whitespace-nowrap transition-colors"
          >
            Check Part Availability
          </a>
        </div>
      </div>
    </section>
  );
};
