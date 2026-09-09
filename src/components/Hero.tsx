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
      className="relative w-full bg-[#0B0B0C]"
      style={{ height: '260vh' }} // 2.6x viewport creates a luxurious cinematic scroll track
    >
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Full-Screen WebP Image Sequence Background: fills the screen */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center pointer-events-none select-none">
          <PhoneCanvas
            scrollProgress={activeProgress}
            className="w-full h-full"
            fillMode="cover"
            showTelemetry={false}
          />
          {/* Subtle vignette gradient overlays so the overlaid text and buttons pop with crisp contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/85 via-[#0B0B0C]/20 to-[#0B0B0C]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0C]/15 to-[#0B0B0C]/70 pointer-events-none" />
        </div>

        {/* Overlaid UI Content: Positioned cleanly on top of the full-screen canvas */}
        <div className="relative z-10 h-full w-full flex flex-col justify-between pointer-events-none">
          {/* Top: Header Eyebrow & Headline (Overlay) */}
          <div className="pt-20 sm:pt-24 md:pt-28 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141315]/90 border border-[#29181B] text-[11px] uppercase tracking-[0.25em] text-[#EDE7C7] mb-3 backdrop-blur-md shadow-lg shadow-black/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] animate-ping" />
              <span>Interactive Assembled Showcase</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#EDE7C7] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Your Next Phone <span className="text-gradient-burgundy">Starts Here.</span>
            </h1>

            <p className="mt-3 max-w-xl text-xs sm:text-sm md:text-base text-[#EDE7C7]/85 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium">
              Discover premium smartphones, expert repairs, and the latest mobile accessories — all in one place.
            </p>
          </div>

          {/* Center: Open negative space allowing the full-screen assembling phone to be observed */}
          <div className="flex-1 w-full pointer-events-none" />

          {/* Bottom Bar: Action Buttons & Scroll Indicator (Overlay) */}
          <div className="pb-7 sm:pb-9 md:pb-11 px-4 max-w-xl mx-auto w-full flex flex-col items-center gap-3.5 pointer-events-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                id="hero-explore-mobiles-btn"
                type="button"
                onClick={onExploreMobiles}
                className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-[#8B0000] hover:bg-[#A30808] text-[#EDE7C7] font-semibold text-sm tracking-wide shadow-xl shadow-[#8B0000]/50 hover:shadow-[#8B0000]/70 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Mobiles</span>
              </button>

              <button
                id="hero-book-service-btn"
                type="button"
                onClick={onBookService}
                className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-[#141315]/90 hover:bg-[#1E1C20] text-[#EDE7C7] border border-[#29181B] font-semibold text-sm tracking-wide hover:border-[#8B0000] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-lg shadow-black/40"
              >
                <Wrench className="w-4 h-4 text-[#8B0000]" />
                <span>Book a Service</span>
              </button>
            </div>

            {/* Interactive Scroll Assembly Indicator */}
            <div className="flex items-center gap-3 text-xs text-[#EDE7C7]/80 bg-[#141315]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#29181B]/80 shadow-md">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#EDE7C7]">
                <ArrowDown className="w-3.5 h-3.5 text-[#8B0000] animate-bounce" />
                <span>SCROLL DOWN TO ASSEMBLE</span>
              </span>

              <span className="w-1 h-1 rounded-full bg-[#29181B]" />

              {/* Quick interactive scrub toggle for direct preview */}
              <button
                type="button"
                onClick={() => setIsManualOverride(!isManualOverride)}
                className="text-[10px] tracking-wider uppercase text-[#8E8770] hover:text-[#EDE7C7] flex items-center gap-1 transition-colors"
              >
                <Sliders className="w-2.5 h-2.5" />
                <span>{isManualOverride ? 'Switch to Scroll' : 'Manual Scrubber'}</span>
              </button>
            </div>

            {/* Manual Range Slider (Only when toggled) */}
            {isManualOverride && (
              <div className="w-full max-w-xs flex items-center gap-2 p-2 rounded-lg bg-[#141315] border border-[#29181B] animate-fadeIn backdrop-blur-md">
                <span className="text-[10px] text-[#8E8770] font-mono">00</span>
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
                  className="w-full accent-[#8B0000] cursor-pointer"
                />
                <span className="text-[10px] text-[#8E8770] font-mono">79</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
