import React from 'react';
import { BRAND, NAV_LINKS, SOCIAL_LINKS, CONTACT } from '../config/siteConfig';
import { ArrowUp, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceLinks = [
    { name: 'Mobile Repair', href: '#services' },
    { name: 'Display Replacement', href: '#services' },
    { name: 'Battery Replacement', href: '#services' },
    { name: 'Software Service', href: '#services' },
    { name: 'Accessories', href: '#accessories' },
  ];

  return (
    <footer className="relative bg-[#700000] border-t border-[#8B0000] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* Col 1 & 2: Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg bg-[#EDE7C7] flex items-center justify-center text-[#8B0000] font-extrabold text-lg shadow-md">
                M
              </span>
              <span className="text-xl font-extrabold tracking-wider text-white">
                {BRAND.name}
              </span>
            </div>

            <p className="text-sm text-[#EDE7C7]/90 max-w-sm leading-relaxed mb-6">
              {BRAND.tagline}
            </p>

            <div className="space-y-2 text-xs text-[#EDE7C7]/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EDE7C7]" />
                <span>{CONTACT.address}, {CONTACT.cityState}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#EDE7C7]" />
                <span>{CONTACT.displayPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#EDE7C7]" />
                <span>{CONTACT.email}</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-[#EDE7C7] font-bold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#EDE7C7] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-[#EDE7C7] font-bold mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="hover:text-[#EDE7C7] transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Social Channels */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-[#EDE7C7] font-bold mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#EDE7C7] transition-colors flex items-center gap-1.5"
                  >
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE7C7]/70">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-[#EDE7C7]/70">
              Certified High-Tech Showroom & Lab
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-8 h-8 rounded-full bg-white/15 border border-white/25 hover:bg-[#EDE7C7] hover:text-[#8B0000] text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
