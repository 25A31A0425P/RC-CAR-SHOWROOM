import React, { useEffect, useRef } from 'react';
import { AppSettings } from '../types';

interface Props {
  settings: AppSettings;
}

export const FuturisticBackground: React.FC<Props> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle count according to animation intensity
    const getCount = () => {
      if (!settings.backgroundEffects) return 0;
      if (settings.animationIntensity === 'low') return 25;
      if (settings.animationIntensity === 'medium') return 55;
      return 85;
    };

    const particleCount = getCount();
    const speedMultiplier = settings.animationIntensity === 'low' ? 0.3 : settings.animationIntensity === 'medium' ? 0.6 : 1.0;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
      hue: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.4 * speedMultiplier,
        vy: -(Math.random() * 0.5 + 0.2) * speedMultiplier,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        hue: Math.random() > 0.7 ? 210 : 185, // blue or cyan
      });
    }

    // Light streaks
    interface LightStreak {
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
    }
    const streaks: LightStreak[] = [
      { x: width * 0.2, y: -100, length: 140, speed: 1.8 * speedMultiplier, alpha: 0.15 },
      { x: width * 0.7, y: -250, length: 200, speed: 2.2 * speedMultiplier, alpha: 0.12 },
      { x: width * 0.45, y: -400, length: 160, speed: 1.5 * speedMultiplier, alpha: 0.1 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (settings.backgroundEffects) {
        // Draw subtle moving particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaSpeed;

          if (p.alpha <= 0.1 || p.alpha >= 0.75) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.4)`;
          ctx.fill();
        }

        // Draw futuristic light streaks if intensity is high or medium
        if (settings.animationIntensity !== 'low') {
          for (let s of streaks) {
            s.y += s.speed;
            if (s.y > height + 200) {
              s.y = -200;
              s.x = Math.random() * width;
            }

            const gradient = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
            gradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
            gradient.addColorStop(0.5, `rgba(6, 182, 212, ${s.alpha})`);
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x, s.y + s.length);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (settings.motionEffects && settings.backgroundEffects) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (settings.motionEffects && settings.backgroundEffects) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings.backgroundEffects, settings.motionEffects, settings.animationIntensity]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Base deep navy / near-black gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#050B14] via-[#07111E] to-[#02060D]"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #0a192f 0%, #050B14 55%, #02060D 100%)'
        }}
      />

      {/* Atmospheric Soft Cyan and Electric Blue Glow Orbs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(59,130,246,0.1) 60%, transparent 80%)' }}
      />
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[160px] opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(30,58,138,0.15) 70%, transparent 80%)' }}
      />
      <div 
        className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full blur-[130px] opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(0,210,255,0.25) 0%, transparent 70%)' }}
      />

      {/* Subtle Futuristic Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.1) 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.1) 85%)'
        }}
      />

      {/* Dynamic Canvas Particles & Light Streaks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
