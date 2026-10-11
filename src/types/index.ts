export type CarCategory = 
  | 'Racing' 
  | 'Off-Road' 
  | 'Drift' 
  | 'Monster Truck' 
  | 'Buggy' 
  | 'Rock Crawler';

export interface CarPart {
  name: string;
  role: string;
  description: string;
  specs?: string;
  iconName?: string;
}

export interface RCCar {
  id: string;
  name: string;
  category: CarCategory;
  description: string;
  image: string;
  gallery?: string[];
  topSpeed: string;
  topSpeedNum: number; // for gauge in mph
  motor: string;
  battery: string;
  driveType: string;
  scale: string;
  runtime: string;
  terrain: string;
  storeUrl: string;
  accentColor: string; // Hex color for lighting/glow
  bodyColor?: string;
  weight?: string;
  features?: string[];
  parts?: CarPart[];
}

export interface AppSettings {
  sound: boolean;
  motionEffects: boolean;
  animationIntensity: 'low' | 'medium' | 'high';
  backgroundEffects: boolean;
  carRotation: boolean;
}

export type PageId = 'home' | 'cars' | 'showroom' | 'settings';
