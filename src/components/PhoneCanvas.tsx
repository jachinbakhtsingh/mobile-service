import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FRAME_CONFIG, convertToRawUrl, getFrameUrl } from '../config/frameConfig';
import { Smartphone, Sparkles, RefreshCw } from 'lucide-react';

interface PhoneCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  className?: string;
  onLoaded?: () => void;
  showTelemetry?: boolean;
  fillMode?: 'cover' | 'contain';
}

export const PhoneCanvas: React.FC<PhoneCanvasProps> = ({
  scrollProgress,
  className = '',
  onLoaded,
  showTelemetry = true,
  fillMode = 'cover',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const isLoadedRef = useRef<boolean[]>([]);
  const currentDrawnFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isCriticalReady, setIsCriticalReady] = useState<boolean>(false);
  const [hasNetworkError, setHasNetworkError] = useState<boolean>(false);

  const totalFrames = FRAME_CONFIG.totalFrames;

  // Draw a frame onto the high-DPI canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width === 0 || height === 0) return;

    // Adjust canvas buffer size if size changed
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Find the best available frame (exact or nearest loaded)
    let targetImg = imagesRef.current[frameIndex];
    let loaded = isLoadedRef.current[frameIndex];

    if (!loaded || !targetImg) {
      // Look for nearest preloaded frame
      let minDiff = Infinity;
      let bestIndex = -1;
      for (let i = 0; i < totalFrames; i++) {
        if (isLoadedRef.current[i] && imagesRef.current[i]) {
          const diff = Math.abs(i - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            bestIndex = i;
          }
        }
      }
      if (bestIndex !== -1) {
        targetImg = imagesRef.current[bestIndex];
        loaded = true;
      }
    }

    if (loaded && targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
      // Calculate aspect ratio
      const imgWidth = targetImg.naturalWidth;
      const imgHeight = targetImg.naturalHeight;
      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = width / height;

      let drawWidth: number;
      let drawHeight: number;

      const isMobile = width < 768;

      if (fillMode === 'cover') {
        // Full-bleed cover filling 100% of the canvas width and height on all devices
        const scale = Math.max(width / imgWidth, height / imgHeight);
        drawWidth = imgWidth * scale;
        drawHeight = imgHeight * scale;
      } else {
        if (imgAspect > canvasAspect) {
          drawWidth = width;
          drawHeight = width / imgAspect;
        } else {
          drawHeight = height;
          drawWidth = height * imgAspect;
        }
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      // Draw subtle ambient glow behind the smartphone
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        drawWidth * 0.1,
        width / 2,
        height / 2,
        drawWidth * 0.6
      );
      glow.addColorStop(0, 'rgba(139, 0, 0, 0.2)');
      glow.addColorStop(0.5, 'rgba(237, 231, 199, 0.04)');
      glow.addColorStop(1, 'rgba(11, 11, 12, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Render the smartphone frame
      ctx.drawImage(targetImg, x, y, drawWidth, drawHeight);
      currentDrawnFrameRef.current = frameIndex;
    } else {
      // Fallback procedural rendered assembly if images are buffering or offline
      drawProceduralFallback(ctx, width, height, frameIndex, totalFrames);
    }

    ctx.restore();
  }, [totalFrames, fillMode]);

  // Procedural fallback renders a sleek dismantled-to-assembled high-tech chassis
  const drawProceduralFallback = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    frameIndex: number,
    total: number
  ) => {
    const progress = Math.min(1, Math.max(0, frameIndex / (total - 1)));
    const centerX = w / 2;
    const centerY = h / 2;
    const phoneWidth = Math.min(w * 0.72, 340);
    const phoneHeight = phoneWidth * 2.05;
    const radius = 38;

    // Disassembly offsets calculate distance when dismantled (progress 0) to 0 (progress 1)
    const explodeFactor = 1 - progress;

    // Ambient studio glow
    const radial = ctx.createRadialGradient(
      centerX,
      centerY,
      phoneWidth * 0.15,
      centerX,
      centerY,
      phoneWidth * 0.9
    );
    radial.addColorStop(0, 'rgba(139, 0, 0, 0.28)');
    radial.addColorStop(0.6, 'rgba(237, 231, 199, 0.05)');
    radial.addColorStop(1, 'rgba(11, 11, 12, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);

    // Layer 1: Back Chassis (Moves backwards & tilts when dismantled)
    ctx.save();
    ctx.translate(centerX, centerY + explodeFactor * 45);
    ctx.scale(1 - explodeFactor * 0.08, 1 - explodeFactor * 0.08);

    // Back Plate (Titanium Brushed Finish)
    ctx.beginPath();
    ctx.roundRect(-phoneWidth / 2, -phoneHeight / 2, phoneWidth, phoneHeight, radius);
    const backGrad = ctx.createLinearGradient(-phoneWidth / 2, -phoneHeight / 2, phoneWidth / 2, phoneHeight / 2);
    backGrad.addColorStop(0, '#1F1E20');
    backGrad.addColorStop(0.4, '#151416');
    backGrad.addColorStop(0.7, '#241215'); // Subtle burgundy reflection
    backGrad.addColorStop(1, '#0F0F10');
    ctx.fillStyle = backGrad;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#4A1218';
    ctx.stroke();

    // Camera Island (Elevates in Z space when dismantled)
    const camX = -phoneWidth / 2 + 55;
    const camY = -phoneHeight / 2 + 55;
    const camSize = 85;
    ctx.save();
    ctx.translate(0, -explodeFactor * 25);
    ctx.beginPath();
    ctx.roundRect(camX - 25, camY - 25, camSize, camSize, 22);
    ctx.fillStyle = '#161517';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(237, 231, 199, 0.2)';
    ctx.stroke();

    // Camera lenses
    const lenses = [
      { x: camX, y: camY, r: 18 },
      { x: camX + 35, y: camY + 8, r: 18 },
      { x: camX + 15, y: camY + 36, r: 18 },
    ];
    lenses.forEach((lens) => {
      ctx.beginPath();
      ctx.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2);
      ctx.fillStyle = '#0B0B0D';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#8B0000';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(lens.x, lens.y, lens.r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = '#181E2E';
      ctx.fill();
    });
    ctx.restore();

    // Layer 2: Motherboard, Logic Board & Battery (Floats out when dismantled)
    if (explodeFactor > 0.05) {
      ctx.save();
      ctx.translate(0, -explodeFactor * 50);
      ctx.globalAlpha = Math.min(1, explodeFactor * 1.5);

      // Logic board
      ctx.fillStyle = '#1A2E22';
      ctx.fillRect(-phoneWidth / 2 + 30, -phoneHeight / 2 + 150, phoneWidth - 60, 110);
      ctx.strokeStyle = '#356345';
      ctx.lineWidth = 1;
      ctx.strokeRect(-phoneWidth / 2 + 30, -phoneHeight / 2 + 150, phoneWidth - 60, 110);

      // Silicon Processor Chip (Bionic / Snapdragon Core with gold contacts)
      ctx.fillStyle = '#121214';
      ctx.fillRect(-35, -phoneHeight / 2 + 175, 70, 60);
      ctx.strokeStyle = '#EDE7C7';
      ctx.strokeRect(-35, -phoneHeight / 2 + 175, 70, 60);

      ctx.fillStyle = '#EDE7C7';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('MOBIXA A1', 0, -phoneHeight / 2 + 210);

      // Battery Cell
      ctx.fillStyle = '#19191C';
      ctx.fillRect(-phoneWidth / 2 + 30, -phoneHeight / 2 + 270, phoneWidth - 60, phoneHeight * 0.38);
      ctx.strokeStyle = 'rgba(237, 231, 199, 0.3)';
      ctx.strokeRect(-phoneWidth / 2 + 30, -phoneHeight / 2 + 270, phoneWidth - 60, phoneHeight * 0.38);

      ctx.fillStyle = '#B8B298';
      ctx.font = '10px monospace';
      ctx.fillText('5400 mAh • HIGH CYCLE COBALT', 0, -phoneHeight / 2 + 330);

      ctx.restore();
    }

    // Layer 3: OLED Display Assembly (Floats upward towards user when dismantled)
    ctx.save();
    ctx.translate(0, -explodeFactor * 85);
    ctx.scale(1 + explodeFactor * 0.06, 1 + explodeFactor * 0.06);

    // Screen bezel & glass
    ctx.beginPath();
    ctx.roundRect(-phoneWidth / 2 + 8, -phoneHeight / 2 + 8, phoneWidth - 16, phoneHeight - 16, radius - 6);
    ctx.fillStyle = progress > 0.75 ? '#0B0B0E' : 'rgba(15, 14, 18, 0.92)';
    ctx.fill();

    // Dynamic AMOLED Wallpaper / MOBIXA Studio Interface
    if (progress > 0.4) {
      const displayGrad = ctx.createLinearGradient(0, -phoneHeight / 2, 0, phoneHeight / 2);
      displayGrad.addColorStop(0, '#260408');
      displayGrad.addColorStop(0.5, '#0B0B0C');
      displayGrad.addColorStop(1, '#1A0407');
      ctx.fillStyle = displayGrad;
      ctx.fill();

      // Dynamic Island / Punch Hole
      ctx.beginPath();
      ctx.roundRect(-42, -phoneHeight / 2 + 24, 84, 22, 11);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // MOBIXA Logo on Screen
      ctx.fillStyle = '#EDE7C7';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MOBIXA', 0, -20);

      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#B8B298';
      ctx.fillText('Everything Mobile.', 0, 5);

      // Glowing burgundy arc on screen
      ctx.beginPath();
      ctx.arc(0, 70, 60, 0, Math.PI);
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Outer Glass Reflection Stroke
    ctx.beginPath();
    ctx.roundRect(-phoneWidth / 2 + 8, -phoneHeight / 2 + 8, phoneWidth - 16, phoneHeight - 16, radius - 6);
    ctx.lineWidth = 2;
    ctx.strokeStyle = progress > 0.9 ? 'rgba(237, 231, 199, 0.55)' : 'rgba(237, 231, 199, 0.2)';
    ctx.stroke();

    ctx.restore();
    ctx.restore();
  };

  // Progressive Preloader
  useEffect(() => {
    let isCancelled = false;
    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    const loadedStatus: boolean[] = new Array(totalFrames).fill(false);

    imagesRef.current = images;
    isLoadedRef.current = loadedStatus;

    let loadedCount = 0;

    // Helper to load a single frame
    const loadSingleFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (isCancelled || loadedStatus[index]) {
          resolve();
          return;
        }

        const url = getFrameUrl(index, FRAME_CONFIG);
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          if (isCancelled) return;
          images[index] = img;
          loadedStatus[index] = true;
          loadedCount++;
          const pct = Math.round((loadedCount / totalFrames) * 100);
          setLoadingProgress(pct);

          if (index === 0 || index === totalFrames - 1) {
            setIsCriticalReady(true);
            if (onLoaded) onLoaded();
          }

          // Redraw if this is the currently needed frame
          const targetIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(scrollProgress * (totalFrames - 1)))
          );
          if (index === targetIndex || currentDrawnFrameRef.current === -1) {
            drawFrame(targetIndex);
          }
          resolve();
        };

        img.onerror = () => {
          // Graceful handling of network/CORS issues
          if (isCancelled) return;
          loadedCount++;
          if (loadedCount >= totalFrames) {
            setHasNetworkError(true);
          }
          resolve();
        };

        img.src = url;
      });
    };

    // Priority 1: Load critical boundary frames first (0, totalFrames-1, middle)
    const criticalIndices = [0, totalFrames - 1, Math.floor(totalFrames / 2)];
    const keyIndices: number[] = [];
    for (let i = 0; i < totalFrames; i += 5) {
      if (!criticalIndices.includes(i)) keyIndices.push(i);
    }
    const remainingIndices: number[] = [];
    for (let i = 0; i < totalFrames; i++) {
      if (!criticalIndices.includes(i) && !keyIndices.includes(i)) {
        remainingIndices.push(i);
      }
    }

    // Sequence load batches to avoid browser connection pool lockup
    async function startLoadingSequence() {
      // Step 1: Critical frames
      await Promise.all(criticalIndices.map(loadSingleFrame));
      if (isCancelled) return;

      // Step 2: Key step frames (every 5th)
      const keyChunkSize = 4;
      for (let i = 0; i < keyIndices.length; i += keyChunkSize) {
        if (isCancelled) return;
        const chunk = keyIndices.slice(i, i + keyChunkSize);
        await Promise.all(chunk.map(loadSingleFrame));
      }

      // Step 3: Progressive remaining frames
      const remainingChunkSize = 6;
      for (let i = 0; i < remainingIndices.length; i += remainingChunkSize) {
        if (isCancelled) return;
        const chunk = remainingIndices.slice(i, i + remainingChunkSize);
        await Promise.all(chunk.map(loadSingleFrame));
      }
    }

    startLoadingSequence();

    return () => {
      isCancelled = true;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames, onLoaded]);

  // Redraw when scrollProgress changes via requestAnimationFrame
  useEffect(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    animationFrameIdRef.current = requestAnimationFrame(() => {
      const targetFrame = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(scrollProgress * (totalFrames - 1)))
      );
      drawFrame(targetFrame);
    });

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [scrollProgress, totalFrames, drawFrame]);

  // Window resize observer to update canvas
  useEffect(() => {
    const handleResize = () => {
      const targetFrame = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(scrollProgress * (totalFrames - 1)))
      );
      drawFrame(targetFrame);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollProgress, totalFrames, drawFrame]);

  const currentCalculatedFrame = Math.min(
    totalFrames - 1,
    Math.max(0, Math.floor(scrollProgress * (totalFrames - 1)))
  );

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-75"
        style={{ willChange: 'transform' }}
      />

      {/* Assembly Status & Telemetry HUD Overlay (Subtle & Elegant) */}
      {showTelemetry && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-[#121113]/85 border border-[#29181B] backdrop-blur-md text-[11px] font-mono tracking-wider text-[#EDE7C7] shadow-xl pointer-events-none transition-opacity duration-300">
          <span className="flex items-center gap-1.5 text-[#8B0000]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000] animate-pulse" />
            <span className="font-semibold text-[#EDE7C7]">FRAME {String(currentCalculatedFrame).padStart(2, '0')}</span>
            <span className="text-[#8E8770]">/ {String(totalFrames - 1).padStart(2, '0')}</span>
          </span>

          <span className="w-px h-3 bg-[#29181B]" />

          <span className="text-[#EDE7C7]">
            {currentCalculatedFrame === 0 && 'DISMANTLED STATE'}
            {currentCalculatedFrame > 0 && currentCalculatedFrame < totalFrames - 1 && 'ASSEMBLING PRECISION PARTS...'}
            {currentCalculatedFrame >= totalFrames - 1 && '100% FULLY ASSEMBLED'}
          </span>

          {loadingProgress < 100 && (
            <>
              <span className="w-px h-3 bg-[#29181B]" />
              <span className="text-[#8E8770] flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin text-[#8B0000]" />
                {loadingProgress}%
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
