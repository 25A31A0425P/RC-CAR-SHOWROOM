import { AppSettings, RCCar } from '../types';
import { INITIAL_CARS } from '../data/initialCars';

const CARS_STORAGE_KEY = 'rc_showcase_cars_v6';
const SETTINGS_STORAGE_KEY = 'rc_showcase_settings_v1';
const ADMIN_AUTH_KEY = 'rc_showcase_admin_session_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  sound: true,
  motionEffects: true,
  animationIntensity: 'high',
  backgroundEffects: true,
  carRotation: true,
};

export function getStoredCars(): RCCar[] {
  if (typeof window === 'undefined') return INITIAL_CARS;
  try {
    const raw = localStorage.getItem(CARS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(INITIAL_CARS));
      return INITIAL_CARS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Migrate if stored cars still have old generic car names or old image URLs
      const needsMigration = parsed.some(
        (c: RCCar) => !c.image || c.name.includes('Apex Vortex') || c.image.includes('unsplash') || c.image.includes('OEGSQW4Y')
      );
      if (needsMigration) {
        localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(INITIAL_CARS));
        return INITIAL_CARS;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Failed to read stored cars:', err);
  }
  return INITIAL_CARS;
}

export function saveStoredCars(cars: RCCar[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(cars));
  } catch (err) {
    console.error('Failed to save cars:', err);
  }
}

export function resetStoredCars(): RCCar[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(INITIAL_CARS));
  }
  return INITIAL_CARS;
}

export function getStoredSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
  return DEFAULT_SETTINGS;
}

export function saveStoredSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
}

export function getAdminAuth(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function setAdminAuth(isAuth: boolean): void {
  if (typeof window === 'undefined') return;
  if (isAuth) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
