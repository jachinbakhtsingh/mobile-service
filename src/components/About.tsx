import React from 'react';
import { SITE_IMAGES, BRAND } from '../config/siteConfig';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Store, Clock } from 'lucide-react';

interface AboutProps {
  onDiscover?: () => void;
}

export const About: React.FC<AboutProps> = ({ onDiscover }) => {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-transparent border-t border-[#1C1417] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#29181B] bg-[#141315] shadow-2xl shadow-black/60 group">
              <img
                src={SITE_IMAGES.aboutImage}
                alt="MOBIXA Showroom & Lab"
                className="w-full h-[420px] sm:h-[480px] object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent" />

              {/* Floating Showroom Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#141315]/90 border border-[#29181B] backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B0000] flex items-center justify-center text-[#EDE7C7] font-bold text-base shadow-lg shadow-[#8B0000]/40">
                    M
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#EDE7C7]">Experience The Showroom</h4>
                    <p className="text-xs text-[#8E8770]">Walk-in diagnostics & live device hands-on</p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#EDE7C7]">
                  <Clock className="w-3.5 h-3.5 text-[#8B0000]" /> Open 6 Days
                </span>
              </div>
            </div>

            {/* Accent backdrop glow */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#8B0000]/20 rounded-full blur-[100px] pointer-events-none" />
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141315] border border-[#29181B] text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>Showroom Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#EDE7C7] leading-tight">
              Built Around Your <span className="text-gradient-burgundy">Mobile Life.</span>
            </h2>

            <p className="mt-6 text-base text-[#C2BCA8] leading-relaxed">
              MOBIXA brings smartphones, professional mobile servicing, and everyday technology together under one roof. Whether you're upgrading your phone, fixing a device, or looking for the right accessory, we're here to make the experience simple.
            </p>

            {/* 3 Pillars Row */}
            <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-[#221316]">
              <div>
                <span className="text-2xl font-black text-[#EDE7C7] block">100%</span>
                <span className="text-xs text-[#8E8770]">Genuine OEM Parts</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#EDE7C7] block">30min</span>
                <span className="text-xs text-[#8E8770]">Express Repairs</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#EDE7C7] block">180d</span>
                <span className="text-xs text-[#8E8770]">Service Warranty</span>
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
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#8B0000] hover:bg-[#A30808] text-[#EDE7C7] font-semibold text-sm tracking-wide shadow-xl shadow-[#8B0000]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Discover MOBIXA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="text-xs font-semibold text-[#8E8770] hover:text-[#EDE7C7] transition-colors flex items-center gap-1"
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
