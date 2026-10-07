import React from 'react';
import { History, Trash2, Download, Eye, Sparkles } from 'lucide-react';

export default function HistoryGallery({ historyList, onSelectHistoryItem, onClearHistory }) {
  if (!historyList || historyList.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center max-w-xl mx-auto border border-white/10 my-10">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-cyber flex items-center justify-center mx-auto mb-4 border border-brand-500/20">
          <History className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Try-On History Yet</h3>
        <p className="text-sm text-gray-400">
          Jab aap Try-On studio me images upload karke AI fit generate karenge, to yahan aapke sabhi outputs save hote rahenge.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-brand-cyber" />
            Your AI Try-On History
          </h2>
          <p className="text-xs text-gray-400">Previously generated outfits & virtual try-ons</p>
        </div>

        <button
          onClick={onClearHistory}
          className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <Trash2 className="w-4 h-4" /> Clear All History
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {historyList.map((item, idx) => (
          <div
            key={item.id || idx}
            className="group relative glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-brand-500/40 transition-all duration-300"
          >
            <div className="relative h-72 w-full overflow-hidden bg-dark-bg">
              <img
                src={item.imageUrl}
                alt="Try-on Result"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-dark-bg/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-brand-cyber">
                {new Date(item.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  {item.category || 'Virtual Outfit'}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {item.analytics?.fitScore || 98}% AI Match
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectHistoryItem(item)}
                  className="p-2 rounded-xl bg-brand-500/20 hover:bg-brand-500/40 text-brand-cyber transition-all"
                  title="View in Slider"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <a
                  href={item.imageUrl}
                  download={`tryon-history-${idx}.jpg`}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
