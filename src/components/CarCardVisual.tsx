import React, { useState } from 'react';
import { RCCar } from '../types';

interface Props {
  car: RCCar;
  className?: string;
  isHovered?: boolean;
}

export const CarCardVisual: React.FC<Props> = ({ car, className = '', isHovered = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isCustomUrl = car.image?.startsWith('http://') || car.image?.startsWith('https://') || car.image?.startsWith('data:');

  // If a valid external or custom uploaded image is provided and hasn't errored out
  if (isCustomUrl && !imageError) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#091524] to-[#030710] ${className}`}>
        {/* Loading shimmer placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
          </div>
        )}

        {/* Studio platform ambient light */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 65%, ${car.accentColor}22 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0.6,
          }}
        />

        {/* Real RC Model Car Photo */}
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`relative z-10 w-full h-full object-contain p-2 transition-all duration-500 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-108 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]' : 'scale-100'}`}
        />

        {/* Glowing cyan rim light on hover */}
        <div 
          className="absolute inset-0 border border-cyan-400/0 rounded-xl transition-all duration-500 pointer-events-none"
          style={{
            borderColor: isHovered ? `${car.accentColor}80` : 'transparent',
            boxShadow: isHovered ? `inset 0 0 25px ${car.accentColor}30` : 'none',
          }}
        />

        {/* Authentic Real RC Model Tag */}
        <div className="absolute bottom-2.5 right-2.5 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-black/85 border border-cyan-400/40 text-cyan-300 backdrop-blur-sm shadow-md">
            OFFICIAL MODEL
          </span>
        </div>
      </div>
    );
  }

  // High-precision futuristic vector visual render customized by category
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#091524] to-[#040910] ${className}`}>
      {/* Studio ambient glow backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${car.accentColor}25 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      {/* Grid Floor Perspective */}
      <div 
        className="absolute bottom-0 w-full h-24 opacity-25"
        style={{
          backgroundImage: `linear-gradient(to right, ${car.accentColor}33 1px, transparent 1px), linear-gradient(to bottom, ${car.accentColor}33 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          transform: 'perspective(200px) rotateX(60deg)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Circular Platform Ring underneath */}
      <div
        className="absolute bottom-4 w-4/5 h-8 rounded-full border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-500"
        style={{
          transform: 'perspective(150px) rotateX(65deg)',
          borderColor: `${car.accentColor}80`,
          boxShadow: `0 0 20px ${car.accentColor}40`,
        }}
      />

      {/* Vector Car Illustration by Category */}
      <div className={`relative z-10 w-full max-w-[340px] px-4 transition-transform duration-500 ease-out ${isHovered ? 'scale-105 -translate-y-1' : ''}`}>
        <svg
          viewBox="0 0 400 200"
          className="w-full h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Paint Shading Gradient */}
            <linearGradient id={`bodyGrad-${car.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="40%" stopColor={car.bodyColor || '#0f172a'} />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Neon Glow Light Gradient */}
            <linearGradient id={`neonGrad-${car.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor={car.accentColor} />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>

            {/* Wheel Tread Pattern */}
            <radialGradient id={`wheelGrad-${car.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>

          {/* Underglow Ground Shadow & Neon Light */}
          <ellipse
            cx="200"
            cy="165"
            rx="140"
            ry="14"
            fill={car.accentColor}
            opacity={isHovered ? "0.45" : "0.25"}
            className="transition-opacity duration-300"
          />

          {car.category === 'Racing' && (
            // Racing Supercar Silhouette: Low, Sleek, Rear Wing, Diffuser, Splitter
            <g>
              {/* Rear Aerodynamic GT Wing */}
              <path d="M 50 75 L 85 75 L 90 95 L 45 95 Z" fill="#0f172a" stroke={car.accentColor} strokeWidth="1.5" />
              <path d="M 35 70 L 95 68 L 105 76 L 40 78 Z" fill="#1e293b" stroke={car.accentColor} strokeWidth="1.5" />

              {/* Main Supercar Body */}
              <path
                d="M 60 145 L 85 110 L 150 90 L 250 88 L 320 115 L 360 135 L 365 150 L 335 152 L 320 135 L 290 135 L 275 152 L 140 152 L 125 135 L 95 135 L 80 152 Z"
                fill={`url(#bodyGrad-${car.id})`}
                stroke={car.accentColor}
                strokeWidth="1.5"
              />

              {/* Cockpit Canopy */}
              <path
                d="M 155 93 L 205 70 L 260 72 L 285 92 Z"
                fill="#00f0ff15"
                stroke={car.accentColor}
                strokeWidth="1.5"
              />

              {/* Front Splitter & LED Headlight Bar */}
              <path d="M 335 125 L 360 138 L 340 142 Z" fill={car.accentColor} opacity="0.9" />
              <line x1="330" y1="125" x2="355" y2="135" stroke="#ffffff" strokeWidth="2.5" />

              {/* Cyan Racing Livery Streak */}
              <path d="M 130 115 Q 220 100 310 125" stroke={car.accentColor} strokeWidth="2.5" strokeDasharray="6 3" />
            </g>
          )}

          {car.category === 'Off-Road' && (
            // Off-Road Truggy: Raised chassis, massive shocks, beadlock wheels
            <g>
              {/* Exposed Heavy-Duty Roll Cage */}
              <path d="M 100 130 L 130 75 L 240 75 L 280 120" stroke={car.accentColor} strokeWidth="3" strokeLinecap="round" />
              <path d="M 170 75 L 200 125" stroke={car.accentColor} strokeWidth="2.5" />

              {/* Truggy Body Panels */}
              <path
                d="M 80 135 L 115 105 L 245 105 L 340 130 L 335 145 L 295 145 L 285 130 L 260 130 L 245 145 L 155 145 L 140 130 L 115 130 L 100 145 Z"
                fill={`url(#bodyGrad-${car.id})`}
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Exposed Anodized Shock Springs */}
              <line x1="120" y1="110" x2="105" y2="145" stroke={car.accentColor} strokeWidth="4" />
              <line x1="280" y1="110" x2="295" y2="145" stroke={car.accentColor} strokeWidth="4" />

              {/* Front Bull Bar / Bumper */}
              <path d="M 335 125 L 365 125 L 360 145 L 330 145 Z" fill="#0f172a" stroke={car.accentColor} strokeWidth="2" />
            </g>
          )}

          {car.category === 'Drift' && (
            // Drift Spec: Slammed negative camber, widebody fenders, rear lip
            <g>
              {/* Rear Ducktail Wing */}
              <path d="M 55 105 L 85 92 L 95 105 Z" fill={car.accentColor} />

              {/* Widebody Coupe Stance */}
              <path
                d="M 65 145 L 85 108 L 140 88 L 235 88 L 305 110 L 355 132 L 350 148 L 325 148 L 310 135 L 275 135 L 260 148 L 145 148 L 130 135 L 95 135 L 80 148 Z"
                fill={`url(#bodyGrad-${car.id})`}
                stroke={car.accentColor}
                strokeWidth="1.5"
              />

              {/* Dark Tint Windshield */}
              <path d="M 145 92 L 180 72 L 245 74 L 275 92 Z" fill="#000000" stroke="#64748b" strokeWidth="1" />

              {/* Aggressive Headlight Projectors */}
              <polygon points="325,122 345,130 330,134" fill="#00f0ff" />
              <line x1="330" y1="124" x2="350" y2="132" stroke="#ffffff" strokeWidth="2" />

              {/* Side Skirt Aero Fin */}
              <line x1="145" y1="145" x2="260" y2="145" stroke={car.accentColor} strokeWidth="2" />
            </g>
          )}

          {car.category === 'Monster Truck' && (
            // Monster Truck: High suspension, giant chevron tires, reinforced cabin
            <g>
              {/* Aggressive High Cabin */}
              <path
                d="M 95 120 L 130 65 L 240 65 L 285 105 L 345 115 L 340 135 L 285 135 L 255 120 L 145 120 L 115 135 Z"
                fill={`url(#bodyGrad-${car.id})`}
                stroke={car.accentColor}
                strokeWidth="2"
              />

              {/* Dual Monster Shocks */}
              <line x1="130" y1="105" x2="105" y2="145" stroke="#ef4444" strokeWidth="4" />
              <line x1="140" y1="105" x2="115" y2="145" stroke="#ef4444" strokeWidth="4" />
              <line x1="260" y1="105" x2="285" y2="145" stroke="#ef4444" strokeWidth="4" />
              <line x1="270" y1="105" x2="295" y2="145" stroke="#ef4444" strokeWidth="4" />

              {/* Heavy Duty Skid Plates */}
              <rect x="145" y="125" width="110" height="15" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            </g>
          )}

          {car.category === 'Rock Crawler' && (
            // Rock Crawler: Portal axles, roof LED bar, extreme clearance
            <g>
              {/* Roof Rack & LED Light Bar */}
              <rect x="140" y="60" width="110" height="8" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
              <line x1="145" y1="64" x2="245" y2="64" stroke="#ffffff" strokeWidth="3" strokeDasharray="6 4" />

              {/* Scale Off-road Body */}
              <path
                d="M 100 130 L 135 75 L 255 75 L 300 115 L 345 120 L 340 140 L 290 140 L 260 125 L 145 125 L 115 140 Z"
                fill={`url(#bodyGrad-${car.id})`}
                stroke={car.accentColor}
                strokeWidth="1.5"
              />

              {/* High Clearance Solid Axle Links */}
              <line x1="135" y1="135" x2="105" y2="152" stroke="#94a3b8" strokeWidth="3" />
              <line x1="260" y1="135" x2="295" y2="152" stroke="#94a3b8" strokeWidth="3" />

              {/* Snorkel & Accessories */}
              <path d="M 275 80 L 285 80 L 285 110" stroke="#000" strokeWidth="2.5" />
            </g>
          )}

          {car.category === 'Buggy' && (
            // Dune Buggy: Tubular chassis, cockpit safety netting, rear fin
            <g>
              {/* Open Tubular Cockpit Frame */}
              <path d="M 90 125 L 140 70 L 230 70 L 285 115 L 340 135" stroke={car.accentColor} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="175" y1="70" x2="160" y2="125" stroke={car.accentColor} strokeWidth="2" />
              <line x1="210" y1="70" x2="225" y2="125" stroke={car.accentColor} strokeWidth="2" />

              {/* Lower Body Skid Pan */}
              <path
                d="M 80 135 L 125 115 L 260 115 L 330 135 L 320 145 L 275 145 L 255 130 L 145 130 L 125 145 Z"
                fill={`url(#bodyGrad-${car.id})`}
                stroke="#64748b"
                strokeWidth="1"
              />

              {/* Desert Spare Wheel on Back */}
              <ellipse cx="75" cy="115" rx="14" ry="18" fill="#1e293b" stroke={car.accentColor} strokeWidth="2" />
            </g>
          )}

          {/* FRONT & REAR WHEELS with Beadlock detail & Disc Brakes */}
          {/* Rear Wheel Assembly */}
          <g>
            <circle
              cx="110"
              cy={car.category === 'Monster Truck' ? 148 : 148}
              r={car.category === 'Monster Truck' ? 32 : 25}
              fill={`url(#wheelGrad-${car.id})`}
              stroke="#0f172a"
              strokeWidth="3"
            />
            {/* Rim Beadlock Ring */}
            <circle
              cx="110"
              cy={car.category === 'Monster Truck' ? 148 : 148}
              r={car.category === 'Monster Truck' ? 20 : 16}
              fill="#09131e"
              stroke={car.accentColor}
              strokeWidth="2"
            />
            {/* Center Lug Nut */}
            <circle cx="110" cy={car.category === 'Monster Truck' ? 148 : 148} r="5" fill="#e2e8f0" />
            {/* Multi-spoke Rim detail */}
            <line x1="110" y1="135" x2="110" y2="161" stroke={car.accentColor} strokeWidth="1.5" />
            <line x1="97" y1="148" x2="123" y2="148" stroke={car.accentColor} strokeWidth="1.5" />
          </g>

          {/* Front Wheel Assembly */}
          <g>
            <circle
              cx="285"
              cy={car.category === 'Monster Truck' ? 148 : 148}
              r={car.category === 'Monster Truck' ? 32 : 25}
              fill={`url(#wheelGrad-${car.id})`}
              stroke="#0f172a"
              strokeWidth="3"
            />
            {/* Rim Beadlock Ring */}
            <circle
              cx="285"
              cy={car.category === 'Monster Truck' ? 148 : 148}
              r={car.category === 'Monster Truck' ? 20 : 16}
              fill="#09131e"
              stroke={car.accentColor}
              strokeWidth="2"
            />
            {/* Center Lug Nut */}
            <circle cx="285" cy={car.category === 'Monster Truck' ? 148 : 148} r="5" fill="#e2e8f0" />
            {/* Multi-spoke Rim detail */}
            <line x1="285" y1="135" x2="285" y2="161" stroke={car.accentColor} strokeWidth="1.5" />
            <line x1="272" y1="148" x2="298" y2="148" stroke={car.accentColor} strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
};
