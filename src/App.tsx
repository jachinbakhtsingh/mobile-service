import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhoneTravelingCharacter } from './components/PhoneTravelingCharacter';
import { Products } from './components/Products';
import { Brands } from './components/Brands';
import { Services } from './components/Services';
import { RepairProcess } from './components/RepairProcess';
import { Accessories } from './components/Accessories';
import { WhyChooseUs } from './components/WhyChooseUs';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { ShopDrawer } from './components/ShopDrawer';

import { SmartphoneProduct, RepairServiceItem, AccessoryItem } from './types';
import { REPAIR_SERVICES } from './config/serviceConfig';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [heroScrollProgress, setHeroScrollProgress] = useState<number>(0);
  const [isHeroActive, setIsHeroActive] = useState<boolean>(true);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<SmartphoneProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [productModalMode, setProductModalMode] = useState<'details' | 'buy'>('details');

  const [selectedService, setSelectedService] = useState<RepairServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);

  const [isShopDrawerOpen, setIsShopDrawerOpen] = useState<boolean>(false);

  // Active section observer for the traveling smartphone companion
  useEffect(() => {
    const handleScrollCheck = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // If bottom of hero is still below the top 20% of viewport, hero is active
        if (rect.bottom > window.innerHeight * 0.2) {
          setIsHeroActive(true);
        } else {
          setIsHeroActive(false);
        }
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    handleScrollCheck();

    const sectionIds = [
      'hero',
      'mobiles',
      'brands',
      'services',
      'accessories',
      'why-us',
      'about',
      'testimonials',
      'final-cta',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
            if (entry.target.id === 'hero') {
              setIsHeroActive(true);
            }
          }
        });
      },
      {
        threshold: [0.15, 0.5],
        rootMargin: '-10% 0px -40% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollCheck);
      observer.disconnect();
    };
  }, []);

  // Handlers
  const handleViewProductDetails = (product: SmartphoneProduct) => {
    setSelectedProduct(product);
    setProductModalMode('details');
    setIsProductModalOpen(true);
  };

  const handleBuyProduct = (product: SmartphoneProduct) => {
    setSelectedProduct(product);
    setProductModalMode('buy');
    setIsProductModalOpen(true);
  };

  const handleSelectService = (service: RepairServiceItem) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleOpenGeneralServiceModal = () => {
    setSelectedService(REPAIR_SERVICES[0]);
    setIsServiceModalOpen(true);
  };

  const scrollToMobiles = () => {
    const el = document.getElementById('mobiles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#FFFFFF] text-[#18181B] selection:bg-[#8B0000] selection:text-white">
      {/* Sticky Luxury Header */}
      <Navbar
        onOpenShop={() => setIsShopDrawerOpen(true)}
        onOpenBookService={handleOpenGeneralServiceModal}
      />

      {/* Hero Section: Pinning Canvas with Dismantled-to-Assembled Scroll Animation */}
      <Hero
        onExploreMobiles={scrollToMobiles}
        onBookService={handleOpenGeneralServiceModal}
        onHeroScrollProgressChange={setHeroScrollProgress}
      />

      {/* The Traveling Phone Character (Transitions across sections once assembled) */}
      <PhoneTravelingCharacter
        currentSection={currentSection}
        heroScrollProgress={heroScrollProgress}
        isHeroActive={isHeroActive}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="relative w-full max-w-full overflow-x-hidden">
        {/* Mobile Products */}
        <Products
          onViewDetails={handleViewProductDetails}
          onBuyNow={handleBuyProduct}
        />

        {/* Brands We Handle */}
        <Brands />

        {/* Mobile Repair Services */}
        <Services onSelectService={handleSelectService} />

        {/* 4-Step Repair Process */}
        <RepairProcess />

        {/* Accessories & Gadgets */}
        <Accessories
          onAddToCart={(item) => {
            // When user adds accessory, open shop drawer or quick feedback
            setIsShopDrawerOpen(true);
          }}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* About MOBIXA */}
        <About onDiscover={scrollToContact} />

        {/* Customer Trust / Testimonials */}
        <Testimonials />

        {/* Final CTA Showcase (Burgundy #8B0000 background & Cream #EDE7C7 text) */}
        <FinalCTA
          onShopMobiles={scrollToMobiles}
          onBookService={handleOpenGeneralServiceModal}
        />

        {/* Clean Contact Information (No large form) */}
        <Contact />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        initialMode={productModalMode}
      />

      <ServiceBookingModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        preselectedService={selectedService}
      />

      <ShopDrawer
        isOpen={isShopDrawerOpen}
        onClose={() => setIsShopDrawerOpen(false)}
        onSelectProduct={handleViewProductDetails}
        onSelectAccessory={(item) => {
          // Keep open or trigger express checkout
        }}
      />
    </div>
  );
}
