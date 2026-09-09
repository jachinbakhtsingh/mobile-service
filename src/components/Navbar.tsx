import React, { useState, useEffect } from 'react';
import { BRAND, NAV_LINKS, CONTACT } from '../config/siteConfig';
import { Menu, X, Smartphone, ShoppingBag, PhoneCall, ArrowRight, Wrench } from 'lucide-react';

interface NavbarProps {
  onOpenShop?: () => void;
  onOpenBookService?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShop, onOpenBookService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section
      const sections = ['hero', 'mobiles', 'brands', 'services', 'accessories', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#29181B] shadow-2xl shadow-black/40'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#8B0000] rounded-lg p-1"
          >
            {BRAND.logoUrl ? (
              <img src={BRAND.logoUrl} alt={BRAND.name} className="h-8 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#8B0000] flex items-center justify-center text-[#EDE7C7] font-bold text-lg shadow-lg shadow-[#8B0000]/40 group-hover:scale-105 transition-transform">
                  M
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-wider text-[#EDE7C7] group-hover:text-white transition-colors">
                    {BRAND.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#8E8770] -mt-1 font-medium">
                    Showroom
                  </span>
                </div>
              </div>
            )}
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#141315]/70 border border-[#29181B] backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#8B0000] text-[#EDE7C7] shadow-md shadow-[#8B0000]/30'
                      : 'text-[#C9C3A9] hover:text-[#EDE7C7] hover:bg-[#1E1D21]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenBookService && (
              <button
                id="nav-book-service-btn"
                type="button"
                onClick={onOpenBookService}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-[#EDE7C7] hover:text-white bg-[#1A181C] hover:bg-[#232026] border border-[#29181B] transition-colors"
              >
                <Wrench className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>Book Service</span>
              </button>
            )}

            <button
              id="nav-shop-now-btn"
              type="button"
              onClick={() => {
                if (onOpenShop) onOpenShop();
                else scrollToSection('#mobiles');
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-[#8B0000] hover:bg-[#A30808] text-[#EDE7C7] shadow-lg shadow-[#8B0000]/30 hover:shadow-[#8B0000]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shop Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="lg:hidden p-2 rounded-lg bg-[#141315] border border-[#29181B] text-[#EDE7C7] hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 transition-all"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs uppercase tracking-widest text-[#8E8770] font-mono px-3 mb-1">
              Menu Navigation
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#141315]/90 border border-[#29181B] text-base font-medium text-[#EDE7C7] active:bg-[#8B0000]"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#8B0000]" />
              </a>
            ))}
          </div>

          {/* Bottom Actions for Mobile */}
          <div className="flex flex-col gap-3 pt-6 border-t border-[#29181B]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenShop) onOpenShop();
                else scrollToSection('#mobiles');
              }}
              className="w-full py-3.5 rounded-xl bg-[#8B0000] text-[#EDE7C7] font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-[#8B0000]/40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Mobiles & Accessories</span>
            </button>

            {onOpenBookService && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookService();
                }}
                className="w-full py-3 rounded-xl bg-[#141315] border border-[#29181B] text-[#EDE7C7] text-sm font-medium flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4 text-[#8B0000]" />
                <span>Book Mobile Repair</span>
              </button>
            )}

            <a
              href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full py-2.5 rounded-xl bg-[#1A181C] text-center text-xs text-[#8E8770] flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>Call Us: {CONTACT.displayPhone}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
