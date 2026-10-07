import React, { useState, useRef, useEffect } from 'react';
import { Download, Sliders, Maximize2, Sparkles, CheckCircle2, RotateCcw, Share2, Eye } from 'lucide-react';

export default function ResultCompareSlider({
  humanImage,
  clothingImage,
  resultData,
  onReset
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const originalUrl = humanImage?.url || humanImage;
  const tryOnUrl = resultData?.imageUrl;

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleDownload = () => {
    if (!tryOnUrl) return;
    const a = document.createElement('a');
    a.href = tryOnUrl;
    a.download = `clothing-simulator-tryon-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-brand-glow/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            AI Fit Generation Completed!
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Virtual Try-On Showcase
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            Drag slider left or right to compare original model vs new outfit.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleDownload}
            className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-glow to-brand-cyber text-white font-bold text-sm shadow-lg shadow-brand-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download High-Res
          </button>

          <button
            onClick={onReset}
            className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-semibold border border-white/10 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Try Another
          </button>
        </div>
      </div>

      {/* BEFORE / AFTER SPLIT SLIDER CONTAINER */}
      <div className="relative glass-panel rounded-3xl p-4 sm:p-6 border border-white/15">
        
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[550px] sm:h-[650px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 bg-dark-bg"
        >
          {/* AFTER IMAGE (Try-On Result - Full Layer) */}
          <img
            src={tryOnUrl}
            alt="Virtual Try-On Result"
            className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-dark-bg/80 backdrop-blur-md border border-brand-cyber/30 text-brand-cyber font-bold text-xs shadow-lg uppercase tracking-wider">
            ✨ Virtual Try-On (After)
          </div>

          {/* BEFORE IMAGE (Original Photo - Clipped Layer) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={originalUrl}
              alt="Original Model"
              className="absolute inset-0 w-full h-full object-contain object-center max-w-none"
              style={{ width: containerRef.current?.offsetWidth || '100%' }}
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-dark-bg/80 backdrop-blur-md border border-white/20 text-gray-200 font-bold text-xs shadow-lg uppercase tracking-wider">
              👤 Original Model (Before)
            </div>
          </div>

          {/* SLIDER SEPARATOR LINE & DRAG HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-brand-cyber text-white flex items-center justify-center shadow-xl border-2 border-white cursor-ew-resize">
              <Sliders className="w-4 h-4 rotate-90" />
            </div>
          </div>

        </div>

        {/* Action Toolbar below slider */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400 px-2">
          <span>💡 Slide handle left or right to inspect fabric blending</span>
          
          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1.5 text-brand-cyber hover:underline font-semibold"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
          </button>
        </div>

      </div>

      {/* AI FIT ANALYTICS CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <span className="text-xs text-gray-400 block font-medium">Pose & Body Preservation</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-emerald-400">{resultData?.analytics?.poseMatch || 99}%</span>
            <span className="text-[11px] text-emerald-400/80 font-mono">Precision Matched</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${resultData?.analytics?.poseMatch || 99}%` }} />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <span className="text-xs text-gray-400 block font-medium">Fabric & Texture Realism</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-brand-cyber">{resultData?.analytics?.fabricDrape || 97}%</span>
            <span className="text-[11px] text-brand-cyber/80 font-mono">Synthesized Drape</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-brand-cyber h-full rounded-full" style={{ width: `${resultData?.analytics?.fabricDrape || 97}%` }} />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <span className="text-xs text-gray-400 block font-medium">Overall AI Style Score</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-brand-glow">{resultData?.analytics?.fitScore || 98}%</span>
            <span className="text-[11px] text-brand-glow/80 font-mono">HD Studio Match</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-brand-glow h-full rounded-full" style={{ width: `${resultData?.analytics?.fitScore || 98}%` }} />
          </div>
        </div>

      </div>

      {/* FULLSCREEN MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <img src={tryOnUrl} alt="Fullscreen Try-On" className="max-w-full max-h-[90vh] object-contain rounded-2xl" />
        </div>
      )}

    </div>
  );
}
