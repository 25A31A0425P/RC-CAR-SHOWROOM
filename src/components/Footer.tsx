import React from 'react';
import { PageId } from '../types';
import { soundEffects } from '../utils/audio';

interface Props {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  const handleNav = (p: PageId) => {
    soundEffects.playClick();
    onNavigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-cyan-500/20 bg-[#02060D]/90 backdrop-blur-md pt-12 pb-8 overflow-hidden">
      {/* Subtle Cyan Light Line at Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(0,240,255,0.4)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">🏎️</span>
              <span className="text-xl font-black tracking-wider text-white font-['Syne']">
                RC CAR <span className="text-cyan-400">SHOWCASE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Designed for RC car enthusiasts.
            </p>
          </div>

          {/* Quick Nav */}
          <nav className="flex items-center gap-6 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            <button
              onClick={() => handleNav('home')}
              onMouseEnter={() => soundEffects.playHover()}
              className="hover:text-cyan-300 transition-colors"
            >
              Home
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNav('cars')}
              onMouseEnter={() => soundEffects.playHover()}
              className="hover:text-cyan-300 transition-colors"
            >
              Cars
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNav('showroom')}
              onMouseEnter={() => soundEffects.playHover()}
              className="hover:text-cyan-300 transition-colors"
            >
              Showroom
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNav('settings')}
              onMouseEnter={() => soundEffects.playHover()}
              className="hover:text-cyan-300 transition-colors"
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© RC CAR SHOWCASE. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>High Performance Virtual Showroom</span>
            <span>·</span>
            <span>Scale Modeling Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
