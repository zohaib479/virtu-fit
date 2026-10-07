import React from 'react';
import { Sparkles, Key, CheckCircle2, ShieldAlert, Cpu, History, Image as ImageIcon } from 'lucide-react';

export default function Navbar({ apiKey, onOpenKeyModal, activeTab, setActiveTab }) {
  const isKeySet = Boolean(apiKey && apiKey.trim().length > 10);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-glow to-brand-cyber p-0.5 shadow-lg shadow-brand-500/20">
            <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-cyber animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-brand-cyber">
                AURA<span className="text-brand-glow">FIT</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-brand-cyber bg-brand-cyber/10 border border-brand-cyber/20 rounded-full uppercase">
                AI Pro v2.5
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Virtual Try-On Engine</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-dark-card/60 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'studio'
                ? 'bg-gradient-to-r from-brand-600 to-brand-glow text-white shadow-md shadow-brand-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Try-On Studio
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-brand-600 to-brand-glow text-white shadow-md shadow-brand-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <History className="w-4 h-4" />
            History Gallery
          </button>
        </nav>

        {/* OpenAI Key Input Trigger Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
              isKeySet
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-lg shadow-emerald-500/10'
                : 'bg-gradient-to-r from-brand-600/20 to-brand-glow/20 border-brand-glow/40 text-brand-100 hover:border-brand-glow hover:bg-brand-600/30 animate-pulse'
            }`}
          >
            <Key className="w-4 h-4 text-brand-cyber" />
            <span className="hidden sm:inline">
              {isKeySet ? 'OpenAI API Key Active' : 'Paste OpenAI API Key'}
            </span>
            <span className="sm:hidden">API Key</span>
            {isKeySet ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-400 ml-1" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
