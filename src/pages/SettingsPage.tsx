import React from 'react';
import { AppSettings } from '../types';
import { soundEffects } from '../utils/audio';
import { 
  Volume2, 
  VolumeX, 
  Zap, 
  Sparkles, 
  RotateCw, 
  Sliders, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface Props {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onResetSettings: () => void;
}

export const SettingsPage: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  onResetSettings,
}) => {
  const handleToggleSound = () => {
    const updated = { ...settings, sound: !settings.sound };
    soundEffects.setEnabled(updated.sound);
    if (updated.sound) {
      soundEffects.playSuccess();
    }
    onUpdateSettings(updated);
  };

  const handleToggleMotion = () => {
    soundEffects.playClick();
    onUpdateSettings({ ...settings, motionEffects: !settings.motionEffects });
  };

  const handleToggleBackground = () => {
    soundEffects.playClick();
    onUpdateSettings({ ...settings, backgroundEffects: !settings.backgroundEffects });
  };

  const handleToggleRotation = () => {
    soundEffects.playClick();
    onUpdateSettings({ ...settings, carRotation: !settings.carRotation });
  };

  const handleSetIntensity = (intensity: 'low' | 'medium' | 'high') => {
    soundEffects.playClick();
    onUpdateSettings({ ...settings, animationIntensity: intensity });
  };

  const handleReset = () => {
    soundEffects.playClick();
    onResetSettings();
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest">
          <Sliders className="w-3.5 h-3.5" />
          <span>Custom Configuration</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-['Syne'] tracking-wide text-white uppercase drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">
          SHOWROOM <span className="text-cyan-400">SETTINGS</span>
        </h1>
        <p className="text-base text-slate-300 max-w-xl mx-auto">
          Customize audio immersion, background rendering, and 3D turntable dynamics.
          All settings persist automatically.
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#091524]/90 to-[#040910]/95 border border-cyan-500/30 shadow-2xl space-y-6">
        {/* SETTING 1: SOUND */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${settings.sound ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
              {settings.sound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-wide">SOUND</div>
              <div className="text-xs text-slate-400">
                Synthesized high-Kv motor revs, cyber clicks & UI feedback
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleSound}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              settings.sound
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            {settings.sound ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* SETTING 2: MOTION EFFECTS */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${settings.motionEffects ? 'bg-blue-500/15 border-blue-400/40 text-blue-300' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-wide">MOTION EFFECTS</div>
              <div className="text-xs text-slate-400">
                Smooth transitions, 3D card tilt & parallax tracking
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleMotion}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              settings.motionEffects
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            {settings.motionEffects ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* SETTING 3: ANIMATION INTENSITY */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl border bg-purple-500/15 border-purple-400/40 text-purple-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-wide">ANIMATION INTENSITY</div>
              <div className="text-xs text-slate-400">
                Particle count, light streak velocity & physics settling
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-end sm:self-auto">
            {(['low', 'medium', 'high'] as const).map((intensity) => {
              const isActive = settings.animationIntensity === intensity;
              return (
                <button
                  key={intensity}
                  onClick={() => handleSetIntensity(intensity)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {intensity}
                </button>
              );
            })}
          </div>
        </div>

        {/* SETTING 4: BACKGROUND EFFECTS */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${settings.backgroundEffects ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-wide">BACKGROUND EFFECTS</div>
              <div className="text-xs text-slate-400">
                Animated ambient particles, perspective grid & cyan glows
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleBackground}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              settings.backgroundEffects
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            {settings.backgroundEffects ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* SETTING 5: CAR ROTATION */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${settings.carRotation ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-500'}`}>
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-wide">CAR ROTATION</div>
              <div className="text-xs text-slate-400">
                Continuous auto-rotation on the circular neon turntable
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleRotation}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              settings.carRotation
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            {settings.carRotation ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Action Row: Reset to Defaults & Test Feedback */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Preferences saved locally</span>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
