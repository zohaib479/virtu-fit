import React, { useRef } from 'react';
import { Upload, User, Shirt, Sparkles, Check, RefreshCw, Layers, Camera } from 'lucide-react';
import { SAMPLE_HUMANS, SAMPLE_CLOTHES } from '../utils/constants';

export default function ImageUploader({
  humanImage,
  setHumanImage,
  clothingImage,
  setClothingImage,
  category,
  setCategory,
  onGenerate,
  isGenerating
}) {
  const humanInputRef = useRef(null);
  const clothInputRef = useRef(null);

  // File Upload Handlers
  const handleHumanFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setHumanImage({
          id: 'custom-human-' + Date.now(),
          name: file.name,
          url: reader.result,
          base64: reader.result,
          isCustom: true
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClothFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setClothingImage({
          id: 'custom-cloth-' + Date.now(),
          name: file.name,
          url: reader.result,
          base64: reader.result,
          isCustom: true
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full space-y-8">

      {/* Main Dual Uploader Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ---------------- CARD 1: HUMAN MODEL UPLOADER ---------------- */}
        <div className="relative glass-panel rounded-3xl p-6 transition-all duration-300 border border-white/10 hover:border-brand-500/40 group">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-cyber border border-brand-500/30">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Step 1: Human Photo</h3>
                <p className="text-xs text-gray-400">Upload portrait or full-body picture</p>
              </div>
            </div>

            {humanImage && (
              <button
                onClick={() => setHumanImage(null)}
                className="text-xs text-gray-400 hover:text-rose-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 transition-all"
              >
                <RefreshCw className="w-3 h-3" /> Change
              </button>
            )}
          </div>

          {humanImage ? (
            /* Loaded Human Image Preview with Scanner line */
            <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-brand-glow/40 bg-dark-bg group/img">
              <img
                src={humanImage.url}
                alt="Human Model"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
              />
              
              {/* Sci-Fi Scanning Animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-cyber/10 via-transparent to-brand-glow/10 pointer-events-none" />
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-cyber to-transparent shadow-[0_0_15px_#06b6d4] animate-scan pointer-events-none" />
              
              {/* Status Badge Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-dark-bg/80 backdrop-blur-md border border-white/10 text-xs">
                <span className="truncate font-semibold text-white flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {humanImage.name || 'Model Loaded'}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono text-brand-cyber px-2 py-0.5 rounded bg-brand-cyber/10 border border-brand-cyber/20">
                  Pose Scanned
                </span>
              </div>
            </div>
          ) : (
            /* Upload Dropzone */
            <div
              onClick={() => humanInputRef.current?.click()}
              className="w-full h-80 rounded-2xl border-2 border-dashed border-white/15 hover:border-brand-glow/60 bg-dark-bg/40 hover:bg-brand-500/5 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer group/drop"
            >
              <input
                ref={humanInputRef}
                type="file"
                accept="image/*"
                onChange={handleHumanFileUpload}
                className="hidden"
              />
              
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 group-hover/drop:bg-brand-500/20 text-brand-glow flex items-center justify-center mb-4 transition-all duration-300 group-hover/drop:scale-110 border border-brand-500/20">
                <Upload className="w-7 h-7" />
              </div>
              
              <h4 className="font-bold text-white text-sm mb-1">
                Drop person photo here or <span className="text-brand-cyber underline">browse</span>
              </h4>
              <p className="text-xs text-gray-400 max-w-xs mb-4">
                Supports PNG, JPG, WEBP. Front-facing studio or indoor lighting works best.
              </p>

              <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Camera className="w-3.5 h-3.5 text-brand-cyber" /> High Resolution recommended
              </div>
            </div>
          )}

          {/* Sample Human Presets */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Or Choose Preset Model:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_HUMANS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => setHumanImage(sample)}
                  className={`relative h-16 rounded-xl overflow-hidden border transition-all ${
                    humanImage?.id === sample.id
                      ? 'border-brand-cyber ring-2 ring-brand-cyber/50 scale-95'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                    <span className="text-[9px] font-medium text-white truncate">{sample.name.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ---------------- CARD 2: CLOTHING OUTFIT UPLOADER ---------------- */}
        <div className="relative glass-panel rounded-3xl p-6 transition-all duration-300 border border-white/10 hover:border-brand-500/40 group">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-cyber/20 text-brand-cyber border border-brand-cyber/30">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Step 2: Outfit / Clothes</h3>
                <p className="text-xs text-gray-400">Upload garment or outfit picture</p>
              </div>
            </div>

            {clothingImage && (
              <button
                onClick={() => setClothingImage(null)}
                className="text-xs text-gray-400 hover:text-rose-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 transition-all"
              >
                <RefreshCw className="w-3 h-3" /> Change
              </button>
            )}
          </div>

          {clothingImage ? (
            /* Loaded Outfit Image Preview */
            <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-brand-cyber/40 bg-dark-bg group/img">
              <img
                src={clothingImage.url}
                alt="Clothing Garment"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-brand-cyber/10 via-transparent to-brand-glow/10 pointer-events-none" />

              {/* Status & Category Tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-dark-bg/80 backdrop-blur-md border border-white/10 text-xs">
                <span className="truncate font-semibold text-white flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {clothingImage.name || 'Outfit Loaded'}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono text-brand-glow px-2 py-0.5 rounded bg-brand-glow/10 border border-brand-glow/20">
                  {category}
                </span>
              </div>
            </div>
          ) : (
            /* Dropzone */
            <div
              onClick={() => clothInputRef.current?.click()}
              className="w-full h-80 rounded-2xl border-2 border-dashed border-white/15 hover:border-brand-cyber/60 bg-dark-bg/40 hover:bg-brand-cyber/5 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer group/drop"
            >
              <input
                ref={clothInputRef}
                type="file"
                accept="image/*"
                onChange={handleClothFileUpload}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-brand-cyber/10 group-hover/drop:bg-brand-cyber/20 text-brand-cyber flex items-center justify-center mb-4 transition-all duration-300 group-hover/drop:scale-110 border border-brand-cyber/20">
                <Upload className="w-7 h-7" />
              </div>

              <h4 className="font-bold text-white text-sm mb-1">
                Drop clothes photo here or <span className="text-brand-glow underline">browse</span>
              </h4>
              <p className="text-xs text-gray-400 max-w-xs mb-4">
                Upload T-shirts, suits, dresses, jackets, or ethnic wear on flat lay or hanger.
              </p>

              <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Layers className="w-3.5 h-3.5 text-brand-glow" /> Auto Fabric & Color Extraction
              </div>
            </div>
          )}

          {/* Preset Clothes Selector */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Choose Preset Outfit:
              </span>

              {/* Garment Category Selector */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-dark-bg border border-white/10 text-xs text-gray-200 rounded-lg px-2 py-1 focus:border-brand-cyber focus:outline-none"
              >
                <option value="Jacket / Coat">Jacket / Coat</option>
                <option value="Suit / Tuxedo">Suit / Tuxedo</option>
                <option value="Dress / Gown">Dress / Gown</option>
                <option value="Hoodie / Sweatshirt">Hoodie / Sweatshirt</option>
                <option value="Ethnic / Kurta">Ethnic / Kurta</option>
                <option value="Casual Top">Casual Top</option>
              </select>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {SAMPLE_CLOTHES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setClothingImage(sample);
                    if (sample.category) setCategory(sample.category);
                  }}
                  className={`relative h-16 rounded-xl overflow-hidden border transition-all ${
                    clothingImage?.id === sample.id
                      ? 'border-brand-glow ring-2 ring-brand-glow/50 scale-95'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                    <span className="text-[9px] font-medium text-white truncate">{sample.name.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Action CTA Button */}
      <div className="flex flex-col items-center justify-center pt-2">
        <button
          onClick={onGenerate}
          disabled={!humanImage || !clothingImage || isGenerating}
          className={`relative group px-10 py-5 rounded-2xl font-extrabold text-base tracking-wide text-white transition-all duration-300 shadow-2xl flex items-center gap-3 ${
            !humanImage || !clothingImage || isGenerating
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5'
              : 'bg-gradient-to-r from-brand-600 via-brand-glow to-brand-cyber hover:scale-[1.02] shadow-brand-500/40 active:scale-95 animate-glow'
          }`}
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-6 h-6 animate-spin text-brand-cyber" />
              <span>AI Fit Processing In Progress...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 text-brand-cyber group-hover:rotate-12 transition-transform" />
              <span>GENERATE VIRTUAL TRY-ON</span>
            </>
          )}
        </button>
        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
          <span>⚡ High Precision 8K Photorealistic Fitting</span>
        </p>
      </div>

    </div>
  );
}
