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
            ? 'py-3.5 bg-white/95 backdrop-blur-md border-b border-[#E5DFD4] shadow-md shadow-black/5'
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
                <span className="w-8 h-8 rounded-lg bg-[#8B0000] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#8B0000]/30 group-hover:scale-105 transition-transform">
                  M
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-wider text-[#18181B] group-hover:text-[#8B0000] transition-colors">
                    {BRAND.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#71717A] -mt-1 font-semibold">
                    Showroom
                  </span>
                </div>
              </div>
            )}
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#E5DFD4] shadow-sm backdrop-blur-md">
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#8B0000] text-white shadow-sm shadow-[#8B0000]/30'
                      : 'text-[#52525B] hover:text-[#18181B] hover:bg-[#F6F3ED]'
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#18181B] hover:text-[#8B0000] bg-[#F6F3ED] hover:bg-[#EDE8DE] border border-[#E5DFD4] transition-colors shadow-2xs"
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
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-[#8B0000] hover:bg-[#A30808] text-white shadow-md shadow-[#8B0000]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white border border-[#E5DFD4] text-[#18181B] hover:text-[#8B0000] focus:outline-none shadow-xs active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden overflow-y-auto pt-20 pb-10 px-4 sm:px-6 transition-all flex flex-col justify-start gap-4"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-2 bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-2xl shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs uppercase tracking-widest text-[#71717A] font-mono px-2 mb-1 font-semibold">
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
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#F6F3ED] border border-[#E5DFD4] text-sm font-semibold text-[#18181B] hover:bg-[#EDE8DE] active:scale-[0.99] transition-all min-h-[44px]"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#8B0000]" />
              </a>
            ))}
          </div>

          {/* Bottom Actions for Mobile */}
          <div className="flex flex-col gap-3 bg-white/95 p-5 rounded-2xl border border-[#E5DFD4] shadow-xl shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenShop) onOpenShop();
                else scrollToSection('#mobiles');
              }}
              className="w-full py-3.5 rounded-xl bg-[#8B0000] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-md shadow-[#8B0000]/30 text-sm min-h-[44px] active:scale-[0.98] transition-all"
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
                className="w-full py-3 rounded-xl bg-[#F6F3ED] border border-[#E5DFD4] text-[#18181B] text-sm font-medium flex items-center justify-center gap-2 min-h-[44px] active:scale-[0.98] transition-all"
              >
                <Wrench className="w-4 h-4 text-[#8B0000]" />
                <span>Book Mobile Repair</span>
              </button>
            )}

            <a
              href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full py-2.5 rounded-xl bg-[#EDE8DE] text-center text-xs text-[#52525B] font-medium flex items-center justify-center gap-1.5 min-h-[40px]"
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
