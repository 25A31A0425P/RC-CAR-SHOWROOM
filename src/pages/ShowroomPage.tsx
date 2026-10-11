import React, { useState, useRef } from 'react';
import { RCCar, AppSettings } from '../types';
import { ShowroomCanvas } from '../components/ShowroomCanvas';
import { CarCardVisual } from '../components/CarCardVisual';
import { PartsModal } from '../components/PartsModal';
import { soundEffects } from '../utils/audio';
import { getDomainFromUrl } from '../utils/url';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Volume2, 
  Cpu, 
  Gauge, 
  Zap, 
  BatteryCharging, 
  Layers, 
  Clock, 
  Mountain,
  Share2,
  Check,
  Image as ImageIcon,
  Box,
  Maximize2,
  Sparkles,
  X
} from 'lucide-react';

interface Props {
  cars: RCCar[];
  selectedCarId: string;
  onSelectCar: (id: string) => void;
  onUpdateCar?: (car: RCCar) => void;
  settings: AppSettings;
}

export const ShowroomPage: React.FC<Props> = ({
  cars,
  selectedCarId,
  onSelectCar,
  onUpdateCar,
  settings,
}) => {
  const [isSwitching, setIsSwitching] = useState(false);
  const [isPartsOpen, setIsPartsOpen] = useState(false);
  const [isRevving, setIsRevving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [displayMode, setDisplayMode] = useState<'3d' | 'photo'>('3d');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Active Car
  const currentCar = cars.find((c) => c.id === selectedCarId) || cars[0] || null;
  const currentIndex = currentCar ? cars.findIndex((c) => c.id === currentCar.id) : 0;
  const carPhotos = currentCar?.gallery && currentCar.gallery.length > 0 
    ? currentCar.gallery 
    : (currentCar ? [currentCar.image] : []);
  const activePhotoUrl = carPhotos[activePhotoIdx] || currentCar?.image || '';
  const hasCustomPhoto = currentCar && (currentCar.image.startsWith('http') || currentCar.image.startsWith('data:'));

  // Car Navigation (Prev / Next)
  const handleNextCar = () => {
    if (cars.length === 0) return;
    const nextIdx = (currentIndex + 1) % cars.length;
    switchCar(cars[nextIdx].id);
  };

  const handlePrevCar = () => {
    if (cars.length === 0) return;
    const prevIdx = (currentIndex - 1 + cars.length) % cars.length;
    switchCar(cars[prevIdx].id);
  };

  const switchCar = (newId: string) => {
    if (newId === selectedCarId) return;
    soundEffects.playSwitchCar();
    setIsSwitching(true);
    setActivePhotoIdx(0);

    setTimeout(() => {
      onSelectCar(newId);
      setIsSwitching(false);
    }, 250);
  };

  const handleThrottleRev = () => {
    if (isRevving) return;
    setIsRevving(true);
    soundEffects.playBrushlessRev();
    setTimeout(() => {
      setIsRevving(false);
    }, 1200);
  };

  const handleCopyShare = () => {
    soundEffects.playClick();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!currentCar) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-slate-400">No RC cars available in showroom.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Showroom Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              VIRTUAL SHOWROOM 3D PLATFORM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-['Syne'] tracking-wide text-white uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            {currentCar.name}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switch: 3D Turntable vs Real Photo / Showcase Visual */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-cyan-500/30">
            <button
              onClick={() => {
                soundEffects.playClick();
                setDisplayMode('3d');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                displayMode === '3d'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Turntable</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setDisplayMode('photo');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                displayMode === 'photo'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{hasCustomPhoto ? 'Real Photo' : 'Studio Visual'}</span>
            </button>
          </div>

          {/* Throttle Rev sound trigger */}
          <button
            onClick={handleThrottleRev}
            disabled={isRevving}
            title="Throttle Sound: Rev High-Kv Brushless Motor"
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              isRevving
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-slate-900/80 border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-slate-800'
            }`}
          >
            <Volume2 className={`w-3.5 h-3.5 ${isRevving ? 'animate-bounce text-amber-400' : ''}`} />
            <span>{isRevving ? 'REV MOTOR' : 'REV MOTOR'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleCopyShare}
            title="Share Showroom Car"
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Showroom Area: Interactive 3D Turntable Platform or Real Photo Stage */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#081524]/90 via-[#050D18]/95 to-[#02050B] border border-cyan-500/30 overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.12)]">
        {/* Previous Car Floating Button */}
        <button
          onClick={handlePrevCar}
          onMouseEnter={() => soundEffects.playHover()}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 group cursor-pointer"
          aria-label="Previous RC Car"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Car Floating Button */}
        <button
          onClick={handleNextCar}
          onMouseEnter={() => soundEffects.playHover()}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 group cursor-pointer"
          aria-label="Next RC Car"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Main Display Area (3D Turntable OR Real Photo Visual) with smooth switching */}
        <div
          className={`w-full transition-all duration-300 ${
            isSwitching ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {displayMode === '3d' ? (
            <ShowroomCanvas car={currentCar} settings={settings} />
          ) : (
            <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden">
              {/* Studio spotlight */}
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />
              
              {/* Image Container with high-end frame and reflection */}
              <div className="relative z-10 w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
                <div 
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="group relative w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] bg-slate-950 cursor-pointer"
                >
                  <img
                    src={activePhotoUrl}
                    alt={`${currentCar.name} angle ${activePhotoIdx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050B]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Right Action Controls */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPhotoModalOpen(true);
                        soundEffects.playClick();
                      }}
                      className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all cursor-pointer"
                      title="View Fullscreen High-Resolution"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Top-Left Authentic Tag */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-xs font-bold text-cyan-300 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
                    <span>OFFICIAL RC MODEL PHOTO</span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="text-white drop-shadow-md">
                      {currentCar.name} · Angle {activePhotoIdx + 1} of {carPhotos.length}
                    </span>
                    <span className="hidden sm:inline px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 text-slate-400 text-[11px]">
                      Click to Enlarge
                    </span>
                  </div>
                </div>

                {/* Multi-Angle Gallery Thumbnails Selector */}
                {carPhotos.length > 1 && (
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                      Angles:
                    </span>
                    {carPhotos.map((photo, pIdx) => {
                      const isActive = activePhotoIdx === pIdx;
                      return (
                        <button
                          key={pIdx}
                          onClick={() => {
                            soundEffects.playClick();
                            setActivePhotoIdx(pIdx);
                          }}
                          className={`relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-105'
                              : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                          }`}
                        >
                          <img
                            src={photo}
                            alt={`Thumbnail ${pIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Horizontal Car Selector Carousel */}
        <div className="relative z-30 w-full px-4 py-3 bg-[#030811]/90 backdrop-blur-md border-t border-cyan-500/20 flex items-center justify-between gap-4 overflow-x-auto">
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase hidden md:inline whitespace-nowrap">
            Available Models ({cars.length})
          </span>
          <div className="flex items-center gap-3 mx-auto overflow-x-auto py-1 px-2 no-scrollbar">
            {cars.map((c) => {
              const isSelected = c.id === currentCar.id;
              return (
                <button
                  key={c.id}
                  onClick={() => switchCar(c.id)}
                  onMouseEnter={() => soundEffects.playHover()}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: c.accentColor }}
                  />
                  <span className="text-xs font-bold tracking-wide">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CAR INFORMATION PANEL */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Description & Performance Specifications */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#060F1A]/90 border border-cyan-500/25 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                {currentCar.category} CLASS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-['Syne'] tracking-wide text-white uppercase mt-1">
                {currentCar.name}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                {currentCar.scale}
              </span>
              <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                {currentCar.topSpeed}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {currentCar.description}
          </p>

          {/* Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span>TECHNICAL SPECIFICATIONS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Top Speed */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Top Speed</div>
                  <div className="text-sm font-bold text-white font-mono">{currentCar.topSpeed}</div>
                </div>
              </div>

              {/* Motor Type */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Motor Type</div>
                  <div className="text-sm font-bold text-white truncate max-w-[150px]">{currentCar.motor}</div>
                </div>
              </div>

              {/* Battery */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Battery</div>
                  <div className="text-sm font-bold text-white truncate max-w-[150px]">{currentCar.battery}</div>
                </div>
              </div>

              {/* Drive Type */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Drive Type</div>
                  <div className="text-sm font-bold text-white">{currentCar.driveType}</div>
                </div>
              </div>

              {/* Runtime */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Runtime</div>
                  <div className="text-sm font-bold text-white">{currentCar.runtime}</div>
                </div>
              </div>

              {/* Terrain Type */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                  <Mountain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Terrain Type</div>
                  <div className="text-sm font-bold text-white truncate max-w-[150px]">{currentCar.terrain}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions (ABOUT PARTS + VISIT STORE) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#091524]/90 to-[#040910]/95 border border-cyan-500/30 shadow-xl space-y-6">
          <div>
            <h3 className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-1">
              VEHICLE ACTIONS
            </h3>
            <p className="text-xs text-slate-400">
              Inspect components or purchase directly from the official distributor.
            </p>
          </div>

          {/* ABOUT PARTS BUTTON */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setIsPartsOpen(true);
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="w-full py-4 px-6 rounded-xl bg-slate-900/80 hover:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </span>
              <div className="text-left">
                <div className="font-extrabold font-['Syne']">ABOUT PARTS</div>
                <div className="text-[11px] text-slate-400 font-normal">Chassis, Motor, ESC & More</div>
              </div>
            </div>
            <span className="text-cyan-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
              EXPLORE →
            </span>
          </button>

          {/* VISIT STORE BUTTON (Configurable Store Link) */}
          <a
            href={currentCar.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            onMouseEnter={() => soundEffects.playHover()}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-slate-950/20 text-slate-950">
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="text-left">
                <div className="font-extrabold font-['Syne']">VISIT STORE</div>
                <div className="text-[11px] text-slate-900 font-semibold truncate max-w-[170px]">
                  {getDomainFromUrl(currentCar.storeUrl)}
                </div>
              </div>
            </div>
            <span className="text-slate-950 text-xs font-bold group-hover:translate-x-1 transition-transform">
              BUY NOW →
            </span>
          </a>

          {/* Quick Notice */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">Individual Store Assignment:</div>
            <div>
              This link is individually configured for <strong className="text-cyan-300">{currentCar.name}</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Parts Modal Component */}
      <PartsModal
        car={currentCar}
        isOpen={isPartsOpen}
        onClose={() => setIsPartsOpen(false)}
      />

      {/* High-Resolution Fullscreen Photo Lightbox Modal */}
      {isPhotoModalOpen && (
        <div 
          onClick={() => setIsPhotoModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close Fullscreen View"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full max-h-[78vh] rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.3)] bg-slate-950 flex items-center justify-center">
              <img
                src={activePhotoUrl}
                alt={currentCar.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-4 flex flex-wrap items-center justify-between w-full px-2 gap-3 text-sm text-slate-300 font-semibold">
              <div className="flex items-center gap-3">
                <span className="text-white text-base font-bold uppercase">{currentCar.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs">
                  {currentCar.category} · Original Real Photo
                </span>
              </div>
              {carPhotos.length > 1 && (
                <div className="flex items-center gap-2">
                  {carPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`w-14 h-9 rounded-md overflow-hidden border transition-all cursor-pointer ${
                        activePhotoIdx === idx 
                          ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_10px_#00f0ff]' 
                          : 'border-slate-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={photo} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

