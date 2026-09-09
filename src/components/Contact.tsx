import React from 'react';
import { CONTACT, BRAND } from '../config/siteConfig';
import { PhoneCall, MapPin, Mail, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 bg-[#0B0B0C] border-t border-[#1C1417]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-[#141315] border border-[#29181B] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Red Flare */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B0000]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1A1F] border border-[#2B1519] text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
                <span>Showroom & Service Desk</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#EDE7C7] tracking-tight">
                {BRAND.name}
              </h2>
              <p className="text-sm text-[#8B0000] font-medium tracking-wide mt-1">
                {CONTACT.category}
              </p>

              {/* Details List */}
              <div className="mt-8 space-y-4 text-sm text-[#8E8770]">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1D1B20] border border-[#29181B] flex items-center justify-center text-[#EDE7C7] shrink-0 mt-0.5">
                    <PhoneCall className="w-4 h-4 text-[#8B0000]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8770] block">Direct Phone</span>
                    <a
                      href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-base font-bold text-[#EDE7C7] hover:text-white transition-colors"
                    >
                      {CONTACT.displayPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1D1B20] border border-[#29181B] flex items-center justify-center text-[#EDE7C7] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#8B0000]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8770] block">Customer Support</span>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-sm font-semibold text-[#EDE7C7] hover:text-white transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1D1B20] border border-[#29181B] flex items-center justify-center text-[#EDE7C7] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#8B0000]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8770] block">Showroom Location</span>
                    <p className="text-sm font-medium text-[#EDE7C7]">
                      {CONTACT.address}, {CONTACT.cityState}
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1D1B20] border border-[#29181B] flex items-center justify-center text-[#EDE7C7] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#8B0000]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8770] block">Opening Hours</span>
                    <p className="text-sm font-medium text-[#EDE7C7]">
                      {CONTACT.hoursWeekday} &bull; <span className="text-[#EDE7C7] font-semibold">{CONTACT.hoursTime}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-center bg-[#0F0E11] p-6 sm:p-8 rounded-2xl border border-[#24171A]">
              <h3 className="text-base font-bold text-[#EDE7C7] mb-1">
                Visit Us or Connect Instantly
              </h3>
              <p className="text-xs text-[#8E8770] leading-relaxed mb-3">
                Drop by for immediate device evaluations, genuine accessories, and hands-on demonstrations of the newest flagships.
              </p>

              {/* Call Now Button */}
              <a
                id="contact-call-now-btn"
                href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full py-3.5 px-6 rounded-xl bg-[#8B0000] hover:bg-[#A30808] text-[#EDE7C7] font-semibold text-sm tracking-wide shadow-lg shadow-[#8B0000]/30 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now: {CONTACT.displayPhone}</span>
              </a>

              {/* Get Directions Button */}
              <a
                id="contact-get-directions-btn"
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1D1B20] hover:bg-[#252229] border border-[#29181B] text-[#EDE7C7] font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-[#8B0000]" />
                <span>Get Directions (Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E8770]" />
              </a>

              <div className="mt-2 text-center text-[10px] font-mono text-[#8E8770] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#8B0000]" />
                <span>Free On-Site Diagnostic & Parking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
