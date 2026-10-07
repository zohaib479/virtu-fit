import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Trash2, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey, onClearKey }) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputKey('');
    onClearKey();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-brand-glow/40">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-brand-500/20 border border-brand-500/40 text-brand-cyber">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              OpenAI API Key Configuration
            </h3>
            <p className="text-xs text-gray-400">
              Required for real-time GPT-4o Vision & GPT Image rendering
            </p>
          </div>
        </div>

        {/* Info box */}
        <div className="mb-6 p-4 rounded-2xl bg-brand-600/10 border border-brand-500/20 text-xs text-gray-300 space-y-2">
          <div className="flex items-center gap-2 text-brand-cyber font-semibold">
            <ShieldCheck className="w-4 h-4" />
            100% Client-Side Privacy Guaranteed
          </div>
          <p>
            Your API key stays in your browser's <code className="text-brand-cyber">localStorage</code> and is sent directly to OpenAI. It is not sent to an intermediary server.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Paste Your OpenAI API Key (<code className="text-brand-cyber">sk-...</code>)
            </label>
            
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-4 py-3.5 pr-24 rounded-2xl glass-input text-sm font-mono text-white placeholder-gray-500 border border-white/15 focus:border-brand-glow transition-all"
              />
              
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-all"
                  title={showKey ? "Hide key" : "Show key"}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>

                {inputKey && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/20 transition-all"
                    title="Clear key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick link to OpenAI Keys page */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Don't have an API key?</span>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-cyber hover:underline font-medium"
            >
              Get OpenAI Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-glow to-brand-cyber text-white font-bold text-sm shadow-lg shadow-brand-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  Save & Apply Key
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
          </div>

          {!inputKey && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Without a key, the app runs in <strong>Demo Mode</strong> with fast, standard mock rendering.</span>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}
