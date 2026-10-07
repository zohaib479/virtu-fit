import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import ApiKeyModal from './components/ApiKeyModal';
import ImageUploader from './components/ImageUploader';
import ResultCompareSlider from './components/ResultCompareSlider';
import HistoryGallery from './components/HistoryGallery';
import { generateVirtualTryOn } from './services/openaiService';
import { SAMPLE_HUMANS, SAMPLE_CLOTHES } from './utils/constants';
import { Sparkles, Key, AlertTriangle, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

export default function App() {
  // State management
  const [apiKey, setApiKey] = useState(() => {
    const storedKey = localStorage.getItem('clothing_simulator_openai_key');
    const legacyKey = localStorage.getItem('aurafit_openai_key');
    if (!storedKey && legacyKey) {
      localStorage.setItem('clothing_simulator_openai_key', legacyKey);
      localStorage.removeItem('aurafit_openai_key');
    }
    return storedKey || legacyKey || '';
  });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('studio');

  // Selected Upload States
  const [humanImage, setHumanImage] = useState(SAMPLE_HUMANS[0]);
  const [clothingImage, setClothingImage] = useState(SAMPLE_CLOTHES[0]);
  const [category, setCategory] = useState('Jacket / Coat');

  // Generation & Results
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // History Gallery State
  const [historyList, setHistoryList] = useState(() => {
    try {
      const saved = localStorage.getItem('clothing_simulator_history');
      const legacySaved = localStorage.getItem('aurafit_history');
      if (!saved && legacySaved) {
        localStorage.setItem('clothing_simulator_history', legacySaved);
        localStorage.removeItem('aurafit_history');
      }
      return saved || legacySaved ? JSON.parse(saved || legacySaved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save history to localstorage
  useEffect(() => {
    try {
      localStorage.setItem('clothing_simulator_history', JSON.stringify(historyList));
    } catch (e) {
      console.error(e);
    }
  }, [historyList]);

  // Handle Save API Key
  const handleSaveKey = (key) => {
    setApiKey(key);
    localStorage.setItem('clothing_simulator_openai_key', key);
  };

  // Handle Clear API Key
  const handleClearKey = () => {
    setApiKey('');
    localStorage.removeItem('clothing_simulator_openai_key');
  };

  // Trigger Confetti Celebration
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Main Virtual Try-On Generation Trigger
  const handleGenerate = async () => {
    if (!humanImage || !clothingImage) return;

    setIsGenerating(true);
    setErrorMsg(null);
    setStatusMessage('Initiating AI Engine...');

    try {
      const result = await generateVirtualTryOn({
        apiKey,
        humanImage,
        clothingImage,
        category,
        onStatusUpdate: (msg) => setStatusMessage(msg)
      });

      if (result && result.success) {
        setResultData(result);
        
        // Add to history
        const newHistoryItem = {
          id: 'item-' + Date.now(),
          timestamp: Date.now(),
          imageUrl: result.imageUrl,
          humanImage,
          clothingImage,
          category,
          analytics: result.analytics
        };
        
        setHistoryList((prev) => [newHistoryItem, ...prev]);
        triggerConfetti();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'AI generation failed. Please check your OpenAI API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Navbar Header */}
      <Navbar
        apiKey={apiKey}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Hero Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">

        {/* Top Hero Banner */}
        <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-glow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyber/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-cyber text-xs font-semibold">
                <Sparkles className="w-4 h-4 animate-spin text-brand-glow" />
                <span>Next-Gen Photorealistic AI Fitting Room</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                AI Virtual <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-glow via-brand-cyber to-emerald-400">Try-On Studio</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl">
                Upload a photo of a person and a photo of any garment. ML models will create a realistic try-on image.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="glass-panel-glow p-4 rounded-2xl border border-brand-glow/30 flex items-center gap-4 text-xs">
              <div className="p-3 rounded-xl bg-brand-500/20 text-brand-cyber border border-brand-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Engine Mode</span>
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  {apiKey ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      OpenAI 
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Demo Mode (Paste Key for Live API)
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* API Key Alert Callout if no key is present */}
        {!apiKey && (
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Add Your OpenAI API Key</h4>
                <p className="text-xs text-gray-300">
                  Add your API key to generate try-on images with OpenAI.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-dark-bg font-extrabold text-xs hover:bg-amber-400 transition-all flex items-center gap-2 flex-shrink-0 shadow-lg shadow-amber-500/20"
            >
              <Key className="w-4 h-4" /> Paste API Key
            </button>
          </div>
        )}

        {/* Error Alert Message */}
        {errorMsg && (
          <div className="glass-panel p-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-xs underline hover:text-white">
              Dismiss
            </button>
          </div>
        )}

        {/* Loading Overlay state while generating */}
        {isGenerating && (
          <div className="glass-panel-glow rounded-3xl p-12 text-center space-y-6 max-w-2xl mx-auto border border-brand-glow/40">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-brand-cyber/20 border-t-brand-cyber animate-spin" />
              <Sparkles className="w-8 h-8 text-brand-glow animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">{statusMessage}</h3>
              <p className="text-xs text-gray-400 mt-2">
                ML Models are fitting the outfit onto the model posture...
              </p>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-brand-600 via-brand-cyber to-emerald-400 h-full animate-pulse" style={{ width: '80%' }} />
            </div>
          </div>
        )}

        {/* Studio Tab Content */}
        {activeTab === 'studio' && !isGenerating && (
          resultData ? (
            /* Show Compare Result Slider when generation completes */
            <ResultCompareSlider
              humanImage={humanImage}
              clothingImage={clothingImage}
              resultData={resultData}
              onReset={() => setResultData(null)}
            />
          ) : (
            /* Show Dual Image Uploaders */
            <ImageUploader
              humanImage={humanImage}
              setHumanImage={setHumanImage}
              clothingImage={clothingImage}
              setClothingImage={setClothingImage}
              category={category}
              setCategory={setCategory}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )
        )}

        {/* History Gallery Tab Content */}
        {activeTab === 'history' && (
          <HistoryGallery
            historyList={historyList}
            onSelectHistoryItem={(item) => {
              setHumanImage(item.humanImage || item.imageUrl);
              setClothingImage(item.clothingImage || item.imageUrl);
              setResultData({ imageUrl: item.imageUrl, analytics: item.analytics });
              setActiveTab('studio');
            }}
            onClearHistory={() => setHistoryList([])}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full glass-panel border-t border-white/10 py-6 px-4 text-center text-xs text-gray-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Clothing Simulator. Powered by ML Models.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Client Privacy Protected</span>
            <span>•</span>
            <span className="text-brand-cyber"> Vision Enabled</span>
          </div>
        </div>
      </footer>

      {/* API Key Modal Drawer */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
        onClearKey={handleClearKey}
      />

    </div>
  );
}
