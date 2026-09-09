import React from 'react';
import { SITE_IMAGES, BRAND } from '../config/siteConfig';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Store, Clock } from 'lucide-react';

interface AboutProps {
  onDiscover?: () => void;
}

export const About: React.FC<AboutProps> = ({ onDiscover }) => {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#8B0000] border-t border-[#A30808] text-white overflow-hidden">
      {/* Accent backdrop glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/30 bg-white shadow-2xl group">
              <img
                src={SITE_IMAGES.aboutImage}
                alt="MOBIXA Showroom & Lab"
                className="w-full h-[280px] xs:h-[340px] sm:h-[420px] lg:h-[480px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Floating Showroom Badge */}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-3 sm:p-5 rounded-2xl bg-white/95 border border-[#E5DFD4] backdrop-blur-md flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#8B0000] flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-sm shadow-[#8B0000]/40 shrink-0">
                    M
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#18181B]">Experience The Showroom</h4>
                    <p className="text-[11px] sm:text-xs text-[#52525B]">Walk-in diagnostics & live device hands-on</p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#18181B] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#8B0000]" /> Open 6 Days
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] font-semibold mb-4 w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#EDE7C7]" />
              <span>Showroom Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Built Around Your <span className="text-[#EDE7C7]">Mobile Life.</span>
            </h2>

            <p className="mt-6 text-base text-[#EDE7C7]/90 leading-relaxed font-normal">
              MOBIXA brings smartphones, professional mobile servicing, and everyday technology together under one roof. Whether you're upgrading your phone, fixing a device, or looking for the right accessory, we're here to make the experience simple.
            </p>

            {/* 3 Pillars Row */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/20">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#EDE7C7] block">100%</span>
                <span className="text-[11px] sm:text-xs text-[#EDE7C7]/80 font-medium">Genuine Parts</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#EDE7C7] block">30min</span>
                <span className="text-[11px] sm:text-xs text-[#EDE7C7]/80 font-medium">Express Repairs</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#EDE7C7] block">180d</span>
                <span className="text-[11px] sm:text-xs text-[#EDE7C7]/80 font-medium">Warranty</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#contact"
                id="about-discover-btn"
                onClick={(e) => {
                  if (onDiscover) {
                    e.preventDefault();
                    onDiscover();
                  }
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#EDE7C7] hover:bg-white text-[#8B0000] font-bold text-sm tracking-wide shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Discover MOBIXA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="text-xs font-semibold text-[#EDE7C7] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>View Service Standards</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
