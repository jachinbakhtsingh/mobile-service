import React, { useEffect, useState } from 'react';
import { getFrameUrl, FRAME_CONFIG } from '../config/frameConfig';

// Floating phone image requested by the user:
// Source: https://github.com/jachinbakhtsingh/phone-image/blob/main/ezgif-frame-096-removebg-preview.png
export const FLOATING_PHONE_IMAGE_URL =
  'https://raw.githubusercontent.com/jachinbakhtsingh/phone-image/main/ezgif-frame-096-removebg-preview.png';

interface PhoneTravelingCharacterProps {
  currentSection: string;
  assembledFrameUrl?: string;
  heroScrollProgress: number; // 0 to 1
  isHeroActive: boolean;
}

export const PhoneTravelingCharacter: React.FC<PhoneTravelingCharacterProps> = ({
  currentSection,
  assembledFrameUrl,
  isHeroActive,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [stageOffset, setStageOffset] = useState<{ x: number; y: number } | null>(null);

  // Use the user requested floating image, falling back to assembled frame if needed
  const fallbackFrame = getFrameUrl(FRAME_CONFIG.totalFrames - 1, FRAME_CONFIG);
  const primaryImage = assembledFrameUrl || FLOATING_PHONE_IMAGE_URL;
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(primaryImage);

  useEffect(() => {
    setCurrentImageSrc(assembledFrameUrl || FLOATING_PHONE_IMAGE_URL);
  }, [assembledFrameUrl]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track the landing stage inside "The Definitive Mobile Destination" section (#final-cta)
  useEffect(() => {
    const updatePosition = () => {
      if (currentSection === 'final-cta') {
        const stageEl = document.getElementById('final-cta-settle-stage');
        if (stageEl) {
          const rect = stageEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const screenCenterX = window.innerWidth / 2;
          const screenCenterY = window.innerHeight / 2;
          setStageOffset({
            x: Math.round(centerX - screenCenterX),
            y: Math.round(centerY - screenCenterY),
          });
          return;
        }
      }
      setStageOffset(null);
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    updatePosition();
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [currentSection]);

  // When hero is active, the hero's full-screen background is assembling the phone
  const isHidden = isHeroActive || currentSection === 'hero';

  // Section-based choreography under the overlay
  let transformClasses = 'translate-x-0 scale-80 rotate-0 opacity-50';
  let haloGlow = 'rgba(139, 0, 0, 0.35)';
  let isSettled = false;

  switch (currentSection) {
    case 'mobiles':
      transformClasses = 'translate-x-0 md:translate-x-[24vw] lg:translate-x-[28vw] scale-80 sm:scale-85 md:scale-90 rotate-[-4deg] opacity-60';
      haloGlow = 'rgba(139, 0, 0, 0.4)';
      break;

    case 'brands':
      transformClasses = 'translate-x-0 md:-translate-x-[24vw] lg:-translate-x-[28vw] scale-75 sm:scale-80 md:scale-85 rotate-[5deg] opacity-55';
      haloGlow = 'rgba(237, 231, 199, 0.25)';
      break;

    case 'services':
      transformClasses = 'translate-x-0 md:translate-x-[24vw] lg:translate-x-[28vw] scale-80 sm:scale-85 md:scale-90 rotate-[-3deg] opacity-60';
      haloGlow = 'rgba(139, 0, 0, 0.45)';
      break;

    case 'accessories':
      transformClasses = 'translate-x-0 md:-translate-x-[24vw] lg:-translate-x-[28vw] scale-75 sm:scale-80 md:scale-85 rotate-[4deg] opacity-55';
      haloGlow = 'rgba(237, 231, 199, 0.25)';
      break;

    case 'why-us':
      transformClasses = 'translate-x-0 md:translate-x-[24vw] lg:translate-x-[28vw] scale-80 sm:scale-85 md:scale-90 rotate-[-4deg] opacity-60';
      haloGlow = 'rgba(139, 0, 0, 0.35)';
      break;

    case 'about':
      transformClasses = 'translate-x-0 md:-translate-x-[24vw] lg:-translate-x-[28vw] scale-80 sm:scale-85 md:scale-90 rotate-[4deg] opacity-55';
      haloGlow = 'rgba(237, 231, 199, 0.25)';
      break;

    case 'testimonials':
      transformClasses = 'translate-x-0 md:translate-x-[12vw] lg:translate-x-[16vw] scale-75 sm:scale-80 md:scale-85 rotate-[-2deg] opacity-60';
      haloGlow = 'rgba(139, 0, 0, 0.3)';
      break;

    case 'final-cta':
      isSettled = true;
      transformClasses = 'translate-x-0 translate-y-0 scale-95 sm:scale-100 md:scale-105 rotate-0 opacity-100';
      haloGlow = 'rgba(237, 231, 199, 0.45)';
      break;

    case 'contact':
      transformClasses = 'translate-x-0 scale-75 opacity-0 pointer-events-none';
      break;

    default:
      transformClasses = 'translate-x-0 md:translate-x-[24vw] scale-80 opacity-40';
      break;
  }

  // Render fixed in viewport, layered under overlay cards (z-10) and visible across all sections
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none ${isSettled ? 'z-25' : 'z-10'} flex items-center justify-center transition-opacity duration-500 overflow-hidden select-none ${
        isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${prefersReducedMotion ? '!transition-none !transform-none' : ''}`}
    >
      <div
        className={`relative flex items-center justify-center transition-all duration-700 ease-out ${
          isSettled && stageOffset ? '' : transformClasses
        }`}
        style={{
          transform: isSettled && stageOffset
            ? `translate3d(${stageOffset.x}px, ${stageOffset.y}px, 0px) scale(1) rotate(0deg)`
            : undefined,
          filter: `drop-shadow(0 20px 45px ${haloGlow})`,
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-50 transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${haloGlow} 0%, rgba(11, 11, 12, 0) 70%)`,
            transform: isSettled ? 'scale(1.6)' : 'scale(1.3)',
          }}
        />

        {/* Smartphone Display Sized to 16:9 Aspect Ratio */}
        <div className="relative w-[320px] sm:w-[440px] md:w-[540px] lg:w-[620px] aspect-[16/9] flex items-center justify-center">
          <img
            src={currentImageSrc}
            alt="MOBIXA Floating Smartphone"
            className="w-full h-full object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            loading="eager"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={() => {
              if (currentImageSrc !== fallbackFrame) {
                setCurrentImageSrc(fallbackFrame);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
