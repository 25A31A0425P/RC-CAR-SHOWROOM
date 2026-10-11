import React, { useState } from 'react';
import { PageId, AppSettings } from '../types';
import { soundEffects } from '../utils/audio';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  settings: AppSettings;
  onToggleSound: () => void;
}

export const Navbar: React.FC<Props> = ({
  activePage,
  onNavigate,
  settings,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'cars', label: 'CARS' },
    { id: 'showroom', label: 'SHOWROOM' },
    { id: 'settings', label: 'SETTINGS' },
  ];

  const handleNavClick = (page: PageId) => {
    soundEffects.playClick();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#050B14]/85 border-b border-cyan-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo - Zone 1: Clean single element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          onMouseEnter={() => soundEffects.playHover()}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 transition-transform"
          aria-label="RC CAR SHOWCASE Home"
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
            🏎️
          </span>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-['Syne'] group-hover:text-cyan-400 transition-colors uppercase drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              RC CAR <span className="text-cyan-400 group-hover:text-white transition-colors">SHOWCASE</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation - Zone 2: 4 nav links with glowing cyan underline */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEffects.playHover()}
                className={`relative py-2 text-sm font-semibold tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:text-cyan-300 whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}

                {/* Glowing cyan underline when active */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f0ff] animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick Controls / Audio Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              onToggleSound();
              soundEffects.playClick();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            title={settings.sound ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-2 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
            aria-label="Toggle Sound"
          >
            {settings.sound ? (
              <Volume2 className="w-5 h-5 text-cyan-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              onToggleSound();
              soundEffects.playClick();
            }}
            className="p-2 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-cyan-400"
            aria-label="Toggle Sound"
          >
            {settings.sound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyan-500/30 bg-[#07111E]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 transition-all">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-3 px-4 rounded-lg font-bold tracking-wider uppercase text-base transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
