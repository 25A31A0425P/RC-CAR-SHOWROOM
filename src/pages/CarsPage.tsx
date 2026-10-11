import React, { useState } from 'react';
import { PageId, RCCar, CarCategory } from '../types';
import { soundEffects } from '../utils/audio';
import { getDomainFromUrl } from '../utils/url';
import { CarCardVisual } from '../components/CarCardVisual';
import { Search, Gauge, Zap, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  cars: RCCar[];
  onSelectCar: (carId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const CarsPage: React.FC<Props> = ({ cars, onSelectCar, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [cardTilt, setCardTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  const categories: string[] = [
    'All',
    'Racing',
    'Off-Road',
    'Drift',
    'Monster Truck',
    'Buggy',
    'Rock Crawler'
  ];

  // Filtering
  const filteredCars = cars.filter((car) => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.motor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (carId: string) => {
    soundEffects.playSwitchCar();
    onSelectCar(carId);
    onNavigate('showroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3D Tilt calculation on mouse move over individual card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, carId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setCardTilt((prev) => ({ ...prev, [carId]: { x, y } }));
  };

  const handleMouseLeave = (carId: string) => {
    setHoveredCardId(null);
    setCardTilt((prev) => ({ ...prev, [carId]: { x: 0, y: 0 } }));
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold font-['Syne'] tracking-wide text-white uppercase drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">
          RC CAR <span className="text-cyan-400">COLLECTION</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300">
          Choose a machine and enter the showroom.
        </p>
      </div>

      {/* Controls Bar: Search & Category Filter Buttons */}
      <div className="mb-10 space-y-4">
        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, motor, category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          />
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                    : 'bg-slate-900/60 border border-cyan-500/20 text-slate-300 hover:border-cyan-400/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Cars */}
      {filteredCars.length === 0 ? (
        <div className="py-20 text-center space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-slate-400 text-base">No RC cars found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider hover:bg-cyan-500 hover:text-slate-950 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => {
            const isHovered = hoveredCardId === car.id;
            const tilt = cardTilt[car.id] || { x: 0, y: 0 };

            return (
              <div
                key={car.id}
                onMouseEnter={() => {
                  soundEffects.playHover();
                  setHoveredCardId(car.id);
                }}
                onMouseMove={(e) => handleMouseMove(e, car.id)}
                onMouseLeave={() => handleMouseLeave(car.id)}
                onClick={() => handleCardClick(car.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${isHovered ? '-6px' : '0px'})`,
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
                }}
                className={`group relative rounded-2xl bg-gradient-to-b from-[#091524]/90 via-[#060E18]/95 to-[#03070E] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isHovered
                    ? 'border-cyan-400/90 shadow-[0_0_35px_rgba(0,240,255,0.3)]'
                    : 'border-cyan-500/20 shadow-xl'
                }`}
              >
                {/* Pointer Follow Light Spot */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${((tilt.x / 16) + 0.5) * 100}% ${((tilt.y / -16) + 0.5) * 100}%, rgba(0,240,255,0.12) 0%, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Top Section: Large Car Visual Stage */}
                <div className="relative w-full h-56 p-4 flex items-center justify-center overflow-hidden border-b border-cyan-500/10 bg-slate-950/40">
                  <CarCardVisual car={car} isHovered={isHovered} />

                  {/* Top-Right Speed Badge */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-bold text-cyan-300 shadow-md">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>{car.topSpeed}</span>
                  </div>

                  {/* Top-Left Category Tag */}
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {car.category}
                  </div>
                </div>

                {/* Bottom Section: Car Information */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-['Syne'] tracking-wide text-white group-hover:text-cyan-300 transition-colors uppercase">
                      {car.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  {/* Quick Specs Snapshot */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800/80">
                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-500 block">Motor</span>
                      <span className="text-slate-200 font-semibold truncate block">{car.motor}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-500 block">Scale</span>
                      <span className="text-slate-200 font-semibold block">{car.scale}</span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(car.id);
                      }}
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                      <span>VIEW CAR</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={car.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEffects.playClick();
                      }}
                      title={`Visit ${getDomainFromUrl(car.storeUrl)} store`}
                      className="py-2.5 px-3 rounded-xl border border-cyan-500/30 bg-slate-900/80 hover:bg-cyan-500/20 hover:border-cyan-400 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Store</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
