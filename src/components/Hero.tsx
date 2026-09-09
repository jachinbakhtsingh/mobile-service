import React, { useRef, useState, useEffect } from 'react';
import { PhoneCanvas } from './PhoneCanvas';
import { ArrowDown, Sparkles, Wrench, ShoppingBag, Sliders } from 'lucide-react';
import { FRAME_CONFIG } from '../config/frameConfig';

interface HeroProps {
  onExploreMobiles: () => void;
  onBookService: () => void;
  onHeroScrollProgressChange?: (progress: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMobiles,
  onBookService,
  onHeroScrollProgressChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isManualOverride, setIsManualOverride] = useState<boolean>(false);
  const [manualProgress, setManualProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      // When rect.top is 0, progress is 0. When rect.bottom is window.innerHeight, progress is 1.
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableHeight;
      const clamped = Math.min(1, Math.max(0, rawProgress));

      if (!isManualOverride) {
        setScrollProgress(clamped);
        if (onHeroScrollProgressChange) {
          onHeroScrollProgressChange(clamped);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualOverride, onHeroScrollProgressChange]);

  const activeProgress = isManualOverride ? manualProgress : scrollProgress;
  const currentFrameNumber = Math.min(
    FRAME_CONFIG.totalFrames - 1,
    Math.max(0, Math.floor(activeProgress * (FRAME_CONFIG.totalFrames - 1)))
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF]"
      style={{ height: '240vh' }} // Cinematic scroll assembly track
    >
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0A0A0C]">
        {/* Full-Screen WebP Image Sequence Canvas Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none">
          <PhoneCanvas
            scrollProgress={activeProgress}
            className="w-full h-full"
            fillMode="cover"
            showTelemetry={false}
          />
          {/* Subtle cinematic gradient scrim so overlaid typography and controls stay crisp and legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-[#8B0000]/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Overlaid UI Content: Positioned over the full-screen canvas */}
        <div className="relative z-10 h-full w-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
          {/* Top: Header Eyebrow & Headline */}
          <div className="pt-20 sm:pt-22 md:pt-24 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-[0.25em] text-white font-semibold mb-2.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D] animate-ping" />
              <span>Interactive Assembled Showcase</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Your Next Phone <span className="text-[#FF4D4D] drop-shadow-[0_2px_16px_rgba(255,77,77,0.5)]">Starts Here.</span>
            </h1>

            <p className="mt-2.5 max-w-xl text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Discover premium smartphones, certified repairs, and curated accessories — crafted for discerning users.
            </p>
          </div>

          {/* Center: Open Screen Viewport letting the full-screen 3D sequence shine */}
          <div className="flex-1 w-full flex items-center justify-center pointer-events-none">
            {/* The phone assembles in full-screen glory directly behind this open area */}
          </div>

          {/* Bottom Bar: Action Buttons & Scroll Indicator Overlaid */}
          <div className="pb-5 sm:pb-7 md:pb-8 px-2 sm:px-4 max-w-xl mx-auto w-full flex flex-col items-center gap-3 pointer-events-auto">
            <div className="flex flex-col xs:flex-row items-center justify-center gap-3 w-full">
              <button
                id="hero-explore-mobiles-btn"
                type="button"
                onClick={onExploreMobiles}
                className="w-full xs:w-auto px-7 py-3 rounded-full bg-[#8B0000] hover:bg-[#A30808] text-white font-semibold text-sm tracking-wide shadow-xl shadow-[#8B0000]/40 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Mobiles</span>
              </button>

              <button
                id="hero-book-service-btn"
                type="button"
                onClick={onBookService}
                className="w-full xs:w-auto px-7 py-3 rounded-full bg-white/95 hover:bg-white text-[#18181B] border border-white/30 font-semibold text-sm tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-xl backdrop-blur-md min-h-[44px]"
              >
                <Wrench className="w-4 h-4 text-[#8B0000]" />
                <span>Book a Service</span>
              </button>
            </div>

            {/* Interactive Scroll Assembly Indicator */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/20 shadow-lg max-w-full">
              <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-white font-semibold whitespace-nowrap">
                <ArrowDown className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FF4D4D] animate-bounce" />
                <span>SCROLL DOWN TO ASSEMBLE</span>
              </span>

              <span className="hidden xs:inline-block w-1 h-1 rounded-full bg-white/40" />

              <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap">
                FRAME {String(currentFrameNumber).padStart(2, '0')}/79
              </span>

              <span className="w-1 h-1 rounded-full bg-white/40" />

              {/* Quick interactive scrub toggle for direct preview */}
              <button
                type="button"
                onClick={() => setIsManualOverride(!isManualOverride)}
                className="text-[10px] tracking-wider uppercase text-zinc-300 hover:text-white flex items-center gap-1 transition-colors font-medium whitespace-nowrap"
              >
                <Sliders className="w-2.5 h-2.5 text-[#FF4D4D]" />
                <span>{isManualOverride ? 'Scroll Mode' : 'Scrubber'}</span>
              </button>
            </div>

            {/* Manual Range Slider (Only when toggled) */}
            {isManualOverride && (
              <div className="w-full max-w-xs flex items-center gap-2 p-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 animate-fadeIn shadow-2xl">
                <span className="text-[10px] text-zinc-300 font-mono">00</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={manualProgress}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setManualProgress(val);
                    if (onHeroScrollProgressChange) onHeroScrollProgressChange(val);
                  }}
                  className="w-full accent-[#FF4D4D] cursor-pointer"
                />
                <span className="text-[10px] text-zinc-300 font-mono">79</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
