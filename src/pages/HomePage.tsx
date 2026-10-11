import React, { useState } from 'react';
import { PageId, RCCar } from '../types';
import { soundEffects } from '../utils/audio';
import { 
  Compass, 
  Layers, 
  ArrowRight, 
  ChevronDown, 
  Zap, 
  Gauge, 
  Sparkles,
  Activity,
  Radio,
  Sliders,
  Cpu
} from 'lucide-react';

interface Props {
  onNavigate: (page: PageId) => void;
  onSelectCar: (carId: string) => void;
  cars: RCCar[];
}

export const HomePage: React.FC<Props> = ({ onNavigate, onSelectCar, cars }) => {
  const featuredCar = cars[0] || null;
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMousePos({ x: 0, y: 0 });
  };

  const handleExploreCars = () => {
    soundEffects.playClick();
    onNavigate('cars');
  };

  const handleEnterShowroom = () => {
    soundEffects.playSwitchCar();
    if (featuredCar) {
      onSelectCar(featuredCar.id);
    }
    onNavigate('showroom');
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Top Text Content */}
        <div className="text-center max-w-4xl mx-auto pt-4 sm:pt-8 space-y-4">
          {/* Subtitle tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explore. Experience. Control.</span>
          </div>

          {/* Main Cinematic Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-['Syne'] tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]">
            RC CAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">SHOWCASE</span>
          </h1>

          {/* Short Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover high-performance RC machines and explore every model in an immersive digital showroom.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleExploreCars}
              onMouseEnter={() => soundEffects.playHover()}
              className="px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase text-cyan-300 bg-cyan-950/60 border border-cyan-400/80 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>EXPLORE CARS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleEnterShowroom}
              onMouseEnter={() => soundEffects.playHover()}
              className="px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>ENTER SHOWROOM</span>
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>

        {/* Hero Cybernetic Showroom Stage (Clean Holographic Portal - No Car Image) */}
        <div
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          onClick={handleEnterShowroom}
          className="relative my-8 w-full max-w-5xl mx-auto h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#081729]/80 via-[#050D18]/90 to-[#02050B] p-4 sm:p-8 flex items-center justify-center overflow-hidden cursor-pointer group shadow-[0_0_60px_rgba(0,240,255,0.15)]"
        >
          {/* Studio Spotlight Cone */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-b from-cyan-400/15 via-blue-500/5 to-transparent pointer-events-none blur-2xl" />

          {/* Laser Scanner Horizontal Grid Beam */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_#00f0ff]" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />

          {/* Futuristic Circular Hologram Platform Floor */}
          <div 
            className="absolute bottom-6 sm:bottom-10 w-3/4 max-w-2xl h-24 sm:h-32 rounded-full border border-cyan-400/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] transition-transform duration-500 pointer-events-none"
            style={{
              transform: `perspective(500px) rotateX(72deg) translate3d(${heroMousePos.x * 25}px, ${heroMousePos.y * 15}px, 0)`,
              background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.18) 0%, rgba(5,11,20,0.85) 75%)',
            }}
          />

          {/* Concentric Holographic Radar Rings */}
          <div 
            className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full border border-cyan-500/20 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none"
            style={{
              transform: `perspective(600px) rotateX(65deg) translate3d(${heroMousePos.x * 20}px, ${heroMousePos.y * 10}px, 0)`,
            }}
          />

          {/* Central Telemetry Command Hub (Interactive 3D Portal - Clean & Futuristic) */}
          <div 
            className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center text-center space-y-5 transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${heroMousePos.x * 10}deg) rotateX(${-heroMousePos.y * 8}deg) translate3d(${heroMousePos.x * 20}px, ${heroMousePos.y * 12}px, 15px)`,
            }}
          >
            {/* Hologram Core Orb */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-950/70 border-2 border-cyan-400/70 flex items-center justify-center text-cyan-300 shadow-[0_0_35px_rgba(0,240,255,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(0,240,255,0.8)] transition-all duration-300">
                <Compass className="w-10 h-10 sm:w-12 sm:h-12 group-hover:rotate-90 transition-transform duration-700" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
              </span>
            </div>

            {/* Portal Title & Status */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300 tracking-wider">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>3D TURNTABLE SHOWROOM ACTIVE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne'] text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                INTERACTIVE 360° DIGITAL PLATFORM
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Step into the high-tech virtual turntable to inspect specs, chassis physics, and authentic RC engineering.
              </p>
            </div>

            {/* Live Interactive Telemetry Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-[11px] font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                <span>100+ MPH CAPABLE</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-[11px] font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>6S - 8S LiPo CORE</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-[11px] font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>360° ROTATION ENGINE</span>
              </div>
            </div>
          </div>

          {/* Click to inspect badge overlay */}
          <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/40 text-xs font-semibold text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-all">
            <span>Click to Enter Showroom</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Animated Scroll Indicator at Bottom */}
        <div className="flex flex-col items-center justify-center pt-2 pb-4 text-slate-400 text-xs font-semibold tracking-widest uppercase">
          <span className="mb-1 text-slate-400 text-[10px]">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-cyan-500/20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Syne'] tracking-wide text-white uppercase">
            NEXT-GEN SHOWROOM ARCHITECTURE
          </h2>
          <p className="text-sm text-slate-400">
            Engineered from the chassis up for RC enthusiasts and scale modeling precision.
          </p>
        </div>

        {/* 3 Futuristic Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: IMMERSIVE SHOWROOM */}
          <div 
            onClick={handleEnterShowroom}
            onMouseEnter={() => soundEffects.playHover()}
            className="group relative p-8 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-cyan-500/20 hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['Syne'] tracking-wide text-white group-hover:text-cyan-300 transition-colors uppercase">
                IMMERSIVE SHOWROOM
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Explore RC cars in an interactive digital showroom. Rotate in 360°, inspect chassis clearances, and explore realistic studio turntable lighting.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>ENTER SHOWROOM</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: PERFORMANCE DETAILS */}
          <div 
            onClick={handleExploreCars}
            onMouseEnter={() => soundEffects.playHover()}
            className="group relative p-8 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-cyan-500/20 hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['Syne'] tracking-wide text-white group-hover:text-cyan-300 transition-colors uppercase">
                PERFORMANCE DETAILS
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                View specifications, components and performance information. Analyze Kv ratings, ESC amp limits, LiPo battery configs, and mechanical telemetry.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>INSPECT SPECS</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: EXPLORE MODELS */}
          <div 
            onClick={handleExploreCars}
            onMouseEnter={() => soundEffects.playHover()}
            className="group relative p-8 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-cyan-500/20 hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['Syne'] tracking-wide text-white group-hover:text-cyan-300 transition-colors uppercase">
                EXPLORE MODELS
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Browse different RC car designs and choose a model to inspect. From high-speed GT racing and drift machines to extreme rock crawlers and monster trucks.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>BROWSE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Featured Mini Specs Grid */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/80 via-[#07111E]/90 to-slate-900/80 border border-cyan-500/30 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
              75+ MPH
            </div>
            <div className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">
              Top Tier Speed
            </div>
          </div>
          <div className="hidden sm:block w-[1px] h-10 bg-slate-800" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              6S / 8S LiPo
            </div>
            <div className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">
              Brushless Power Core
            </div>
          </div>
          <div className="hidden sm:block w-[1px] h-10 bg-slate-800" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">
              1:8 & 1:10
            </div>
            <div className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">
              Pro Competition Scale
            </div>
          </div>
          <div className="hidden sm:block w-[1px] h-10 bg-slate-800" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              100% Configurable
            </div>
            <div className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">
              Direct Store Links
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
