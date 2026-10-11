import React, { useState } from 'react';
import { RCCar, CarPart } from '../types';
import { X, Cpu, BatteryCharging, Gauge, Shield, Disc, Cog, Zap } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface Props {
  car: RCCar;
  isOpen: boolean;
  onClose: () => void;
}

export const PartsModal: React.FC<Props> = ({ car, isOpen, onClose }) => {
  const [selectedPartIndex, setSelectedPartIndex] = useState(0);

  if (!isOpen) return null;

  // Default parts if not defined on car
  const defaultParts: CarPart[] = [
    {
      name: 'Chassis',
      role: 'Structural Spine & Platform',
      description: 'The foundation of the RC vehicle that mounts all internal components, electronics, and suspension geometries. Engineered for high torsional stiffness and impact dampening.',
      specs: 'CNC-Milled Aerospace Aluminum / High-Tensile Carbon Composite'
    },
    {
      name: 'Motor',
      role: 'High-Power Propulsion Core',
      description: 'Translates electrical power from the battery into explosive rotational kinetic energy. Employs precision sintered neodymium magnets and high-efficiency coils.',
      specs: car.motor
    },
    {
      name: 'ESC',
      role: 'Electronic Speed Controller',
      description: 'The brain of the drivetrain that processes throttle signals from the receiver and regulates precise current distribution to the motor with active regenerative braking.',
      specs: 'High-Amp Waterproof Intelligent ESC with Low-Voltage Cutoff'
    },
    {
      name: 'Battery',
      role: 'Chemical Energy Storage',
      description: 'High-discharge Lithium-Polymer (LiPo) power cell that provides explosive continuous amperage and burst current to fuel peak acceleration.',
      specs: car.battery
    },
    {
      name: 'Servo Motor',
      role: 'Steering Precision Actuator',
      description: 'Ultra-fast proportional electric actuator linked to steering tie-rods and knuckles, providing sub-tenth-second response to wheel commands.',
      specs: 'Coreless Digital High-Torque Metal-Gear Servo'
    },
    {
      name: 'Suspension',
      role: 'All-Terrain Articulation & Dampening',
      description: 'Absorbs landing impacts, controls body roll during cornering, and keeps tires firmly planted using threaded oil-filled shock absorbers with progressive rate springs.',
      specs: 'Threaded Big-Bore Aluminum Oil Dampers with Anti-Roll Sway Bars'
    },
    {
      name: 'Wheels & Tires',
      role: 'Traction & Ground Interface',
      description: 'Engineered rubber compounds with foam inserts and reinforced beadlock rims designed for maximum grip, directional stability, and lateral traction.',
      specs: car.terrain + ' Optimized Compound'
    }
  ];

  const parts = car.parts && car.parts.length > 0 ? car.parts : defaultParts;
  const currentPart = parts[selectedPartIndex] || parts[0];

  const getPartIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'chassis':
        return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'motor':
        return <Zap className="w-5 h-5 text-blue-400" />;
      case 'esc':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'battery':
        return <BatteryCharging className="w-5 h-5 text-emerald-400" />;
      case 'servo motor':
        return <Cog className="w-5 h-5 text-amber-400" />;
      case 'suspension':
        return <Gauge className="w-5 h-5 text-sky-400" />;
      case 'wheels & tires':
      case 'wheels/tires':
        return <Disc className="w-5 h-5 text-cyan-300" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#07111E] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold font-['Syne'] tracking-wide text-white uppercase">
                ABOUT PARTS <span className="text-cyan-400 text-sm font-normal">· {car.name}</span>
              </h2>
              <p className="text-xs text-slate-400">
                Detailed anatomical breakdown of high-performance RC architecture
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Close parts modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Left List + Right Detail */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Part Selection Column */}
          <div className="md:col-span-5 p-4 overflow-y-auto space-y-2 max-h-[300px] md:max-h-[500px]">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-2 block mb-2">
              Components ({parts.length})
            </span>
            {parts.map((p, idx) => {
              const isSelected = idx === selectedPartIndex;
              return (
                <button
                  key={p.name}
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedPartIndex(idx);
                  }}
                  onMouseEnter={() => soundEffects.playHover()}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400/60 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      {getPartIcon(p.name)}
                    </span>
                    <div>
                      <div className="text-sm font-bold tracking-wide">{p.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{p.role}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Part Detail Inspection Column */}
          <div className="md:col-span-7 p-6 overflow-y-auto flex flex-col justify-between max-h-[500px]">
            <div className="space-y-6">
              {/* Part Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
                    {currentPart.role}
                  </div>
                  <h3 className="text-2xl font-black font-['Syne'] tracking-wide text-white uppercase">
                    {currentPart.name}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30">
                  {getPartIcon(currentPart.name)}
                </div>
              </div>

              {/* Technical Description */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Engineering Function
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentPart.description}
                </p>
              </div>

              {/* Technical Specifications */}
              {currentPart.specs && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-500/30">
                  <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                    Installed Model Specification
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    {currentPart.specs}
                  </div>
                </div>
              )}

              {/* Core Components Summary Table */}
              <div className="border-t border-slate-800 pt-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  System Architecture Quick Reference
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-400">Power Delivery:</span>{' '}
                    <span className="text-slate-200 font-medium">Brushless / LiPo</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-400">Drivetrain:</span>{' '}
                    <span className="text-slate-200 font-medium">{car.driveType}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-400">Scale Factor:</span>{' '}
                    <span className="text-slate-200 font-medium">{car.scale}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/40 border border-slate-800/80">
                    <span className="text-slate-400">Response Rate:</span>{' '}
                    <span className="text-cyan-400 font-medium">2.4GHz FHSS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
              >
                Back to Showroom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
