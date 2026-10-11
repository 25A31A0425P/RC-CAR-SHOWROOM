/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, RCCar, AppSettings } from './types';
import { 
  getStoredCars, 
  saveStoredCars, 
  resetStoredCars, 
  getStoredSettings, 
  saveStoredSettings, 
  DEFAULT_SETTINGS,
  getAdminAuth,
  setAdminAuth
} from './utils/storage';
import { soundEffects } from './utils/audio';
import { FuturisticBackground } from './components/FuturisticBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CarsPage } from './pages/CarsPage';
import { ShowroomPage } from './pages/ShowroomPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [cars, setCars] = useState<RCCar[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string>('');
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Initialize data on mount
  useEffect(() => {
    const loadedCars = getStoredCars();
    setCars(loadedCars);
    if (loadedCars.length > 0) {
      setSelectedCarId(loadedCars[0].id);
    }

    const loadedSettings = getStoredSettings();
    setSettings(loadedSettings);
    soundEffects.setEnabled(loadedSettings.sound);

    setIsAdminAuthenticated(getAdminAuth());
  }, []);

  // Navigation with smooth transition
  const handleNavigate = (newPage: PageId) => {
    if (newPage === activePage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsTransitioning(false);
    }, 150);
  };

  // Car Selection (e.g. from Collection or Home into Showroom)
  const handleSelectCar = (carId: string) => {
    setSelectedCarId(carId);
  };

  // Settings Handlers
  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    soundEffects.setEnabled(newSettings.sound);
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    saveStoredSettings(DEFAULT_SETTINGS);
    soundEffects.setEnabled(DEFAULT_SETTINGS.sound);
  };

  const handleToggleSound = () => {
    const updated = { ...settings, sound: !settings.sound };
    handleUpdateSettings(updated);
  };

  // Admin Car Management Handlers
  const handleAddCar = (newCar: RCCar) => {
    const updated = [newCar, ...cars];
    setCars(updated);
    saveStoredCars(updated);
  };

  const handleUpdateCar = (updatedCar: RCCar) => {
    const updated = cars.map((c) => (c.id === updatedCar.id ? updatedCar : c));
    setCars(updated);
    saveStoredCars(updated);
    if (selectedCarId === updatedCar.id) {
      setSelectedCarId(updatedCar.id);
    }
  };

  const handleDeleteCar = (carId: string) => {
    const updated = cars.filter((c) => c.id !== carId);
    setCars(updated);
    saveStoredCars(updated);
    if (selectedCarId === carId && updated.length > 0) {
      setSelectedCarId(updated[0].id);
    }
  };

  const handleResetCars = () => {
    if (window.confirm('Reset all cars to the initial default catalog? This will overwrite custom additions.')) {
      const reset = resetStoredCars();
      setCars(reset);
      if (reset.length > 0) {
        setSelectedCarId(reset[0].id);
      }
      soundEffects.playSuccess();
    }
  };

  const handleSetAuth = (isAuth: boolean) => {
    setIsAdminAuthenticated(isAuth);
    setAdminAuth(isAuth);
  };

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background with glowing orbs, grid lines & animated particles */}
      <FuturisticBackground settings={settings} />

      {/* Desktop Custom Glowing Cyber Cursor */}
      {settings.motionEffects && <CustomCursor />}

      {/* Futuristic Sticky Top Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        settings={settings}
        onToggleSound={handleToggleSound}
      />

      {/* Main Dynamic View with Transition */}
      <main
        className={`flex-1 transition-opacity duration-200 ${
          isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'
        }`}
      >
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCar={handleSelectCar}
            cars={cars}
          />
        )}

        {activePage === 'cars' && (
          <CarsPage
            cars={cars}
            onSelectCar={handleSelectCar}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'showroom' && (
          <ShowroomPage
            cars={cars}
            selectedCarId={selectedCarId}
            onSelectCar={handleSelectCar}
            onUpdateCar={handleUpdateCar}
            settings={settings}
          />
        )}

        {activePage === 'settings' && (
          <SettingsPage
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetSettings={handleResetSettings}
          />
        )}
      </main>

      {/* Dark Futuristic Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
