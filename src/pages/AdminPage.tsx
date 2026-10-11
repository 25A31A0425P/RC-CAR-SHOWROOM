import React, { useState, useRef } from 'react';
import { RCCar, CarCategory } from '../types';
import { soundEffects } from '../utils/audio';
import { getDomainFromUrl } from '../utils/url';
import { CarCardVisual } from '../components/CarCardVisual';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Check,
  Compass
} from 'lucide-react';

interface Props {
  cars: RCCar[];
  onAddCar: (car: RCCar) => void;
  onUpdateCar: (car: RCCar) => void;
  onDeleteCar: (id: string) => void;
  onResetCars: () => void;
  onSelectCar?: (carId: string) => void;
  onNavigate?: (page: any) => void;
}

const EMPTY_FORM: Omit<RCCar, 'id'> = {
  name: '',
  category: 'Racing',
  description: '',
  image: '',
  topSpeed: '65 mph (105 km/h)',
  topSpeedNum: 65,
  motor: 'Brushless 2200Kv 4-Pole',
  battery: '4S - 6S LiPo 5000mAh',
  driveType: 'Shaft-Driven 4WD',
  scale: '1:8 Scale',
  runtime: '25 - 30 Minutes',
  terrain: 'All-Terrain / Asphalt',
  storeUrl: 'https://traxxas.com/',
  accentColor: '#00f0ff',
  bodyColor: '#0f172a',
};

// Preset high quality curated RC Car photography images that users can pick with 1 click
const CURATED_REAL_IMAGES = [
  {
    name: 'Supercar GT Racing',
    category: 'Racing',
    url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Baja Desert Buggy',
    category: 'Buggy',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Monster Truck Basher',
    category: 'Monster Truck',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Off-Road Crawler Mudder',
    category: 'Off-Road',
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Drift Silhouette Aero',
    category: 'Drift',
    url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Trail Rock Expedition',
    category: 'Rock Crawler',
    url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80',
  },
];

export const AdminPage: React.FC<Props> = ({
  cars,
  onAddCar,
  onUpdateCar,
  onDeleteCar,
  onResetCars,
  onSelectCar,
  onNavigate,
}) => {
  // Car Form State
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<RCCar, 'id'>>(EMPTY_FORM);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [previewCar, setPreviewCar] = useState<RCCar | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Car Management Handlers
  const handleStartAdd = () => {
    soundEffects.playClick();
    setEditingCarId(null);
    setFormData(EMPTY_FORM);
    setPreviewCar({ ...EMPTY_FORM, id: 'preview-temp' });
    setIsFormOpen(true);
    setFormError('');
    setUploadStatus('');
  };

  const handleStartEdit = (car: RCCar) => {
    soundEffects.playClick();
    setEditingCarId(car.id);
    const { id, ...rest } = car;
    setFormData(rest);
    setPreviewCar(car);
    setIsFormOpen(true);
    setFormError('');
    setUploadStatus('');
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleFieldChange = (field: keyof typeof EMPTY_FORM, value: unknown) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setPreviewCar({ ...updated, id: editingCarId || 'preview-temp' });
  };

  // Real Image Upload (File -> Base64 data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    // Limit file size to ~3.5MB for snappy browser performance & localStorage
    if (file.size > 3.5 * 1024 * 1024) {
      setFormError('Image size is too large (max 3.5MB). Please choose a smaller photo.');
      return;
    }

    setUploadStatus('Loading real image...');
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      handleFieldChange('image', base64Url);
      setUploadStatus('Image uploaded successfully! (Stored & ready)');
      soundEffects.playSuccess();
    };
    reader.onerror = () => {
      setFormError('Failed to read image file. Please try again.');
      setUploadStatus('');
    };
    reader.readAsDataURL(file);
  };

  const handlePickCurated = (url: string) => {
    soundEffects.playClick();
    handleFieldChange('image', url);
    setUploadStatus('Selected curated RC car photo!');
  };

  const handleClearImage = () => {
    soundEffects.playClick();
    handleFieldChange('image', '');
    setUploadStatus('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!formData.name.trim()) {
      setFormError('Car Name is required.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required.');
      return;
    }
    if (!formData.storeUrl.trim()) {
      setFormError('Store URL is required.');
      return;
    }

    try {
      new URL(formData.storeUrl);
    } catch {
      setFormError('Store URL must be a valid URL (e.g., https://example.com/rc-car).');
      return;
    }

    soundEffects.playSuccess();

    if (editingCarId) {
      // Update
      const updatedCar: RCCar = {
        ...formData,
        id: editingCarId,
      };
      onUpdateCar(updatedCar);
      setSuccessMessage(`Vehicle "${updatedCar.name}" successfully updated.`);
    } else {
      // Add
      const newCar: RCCar = {
        ...formData,
        id: `car-${Date.now()}`,
      };
      onAddCar(newCar);
      setSuccessMessage(`New vehicle "${newCar.name}" added to showcase.`);
    }

    setIsFormOpen(false);
    setEditingCarId(null);
    setFormData(EMPTY_FORM);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleDelete = (carId: string, carName: string) => {
    soundEffects.playClick();
    if (window.confirm(`Are you sure you want to remove "${carName}" from the showcase?`)) {
      onDeleteCar(carId);
      if (editingCarId === carId) {
        setIsFormOpen(false);
        setEditingCarId(null);
      }
      setSuccessMessage(`Vehicle "${carName}" was removed.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleViewInShowroom = (carId: string) => {
    soundEffects.playSwitchCar();
    if (onSelectCar) onSelectCar(carId);
    if (onNavigate) onNavigate('showroom');
  };

  return (
    <div className="relative w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Bar: Direct Management Access without Login */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f0ff]" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              CAR SHOWCASE MANAGER
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Syne'] tracking-wide text-white uppercase drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            ADMIN & INVENTORY DASHBOARD
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Add or edit RC cars, upload real car photos, set specifications, and manage store links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartAdd}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>ADD NEW CAR</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2 shadow-lg animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* EDIT / ADD FORM SECTION (Collapsible) */}
      {isFormOpen && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#091524]/95 via-[#060F1A]/95 to-[#040910]/95 border border-cyan-500/40 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {editingCarId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
              <div>
                <h2 className="text-xl font-bold font-['Syne'] text-white uppercase">
                  {editingCarId ? 'UPDATE RC CAR MODEL' : 'ADD NEW RC CAR MODEL'}
                </h2>
                <p className="text-xs text-slate-400">
                  Fill in car specs and upload a real image or paste an image URL.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFormOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields: 8 columns */}
            <form onSubmit={handleSaveCar} className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Car Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Car Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g. Traxxas Slash 4X4 VXL"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFieldChange('category', e.target.value as CarCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm focus:outline-none"
                  >
                    <option value="Racing">Racing</option>
                    <option value="Off-Road">Off-Road</option>
                    <option value="Drift">Drift</option>
                    <option value="Monster Truck">Monster Truck</option>
                    <option value="Buggy">Buggy</option>
                    <option value="Rock Crawler">Rock Crawler</option>
                  </select>
                </div>
              </div>

              {/* REAL IMAGE UPLOAD & SELECTION BOX */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-cyan-400" />
                    <span>Real Car Image / Photo Upload</span>
                  </label>
                  {formData.image && (
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="text-[11px] text-rose-400 hover:text-rose-300 underline cursor-pointer"
                    >
                      Clear image
                    </button>
                  )}
                </div>

                {/* Upload from Computer / Device */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                    id="car-image-file-input"
                  />
                  <label
                    htmlFor="car-image-file-input"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 hover:text-cyan-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose File from Device</span>
                  </label>

                  <span className="text-xs text-slate-500 font-medium">or paste image URL:</span>
                </div>

                {/* URL Input */}
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => {
                    handleFieldChange('image', e.target.value);
                    setUploadStatus('');
                  }}
                  placeholder="https://example.com/rc-car-photo.jpg (or upload file above)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-xs focus:outline-none"
                />

                {uploadStatus && (
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>{uploadStatus}</span>
                  </div>
                )}

                {/* Quick Pick Real Photo Presets */}
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                    Or select a curated real RC photo:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {CURATED_REAL_IMAGES.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handlePickCurated(preset.url)}
                        title={preset.name}
                        className={`group relative h-12 rounded-lg overflow-hidden border transition-all ${
                          formData.image === preset.url
                            ? 'border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.5)] scale-105'
                            : 'border-slate-800 hover:border-cyan-500/50'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-0 inset-x-0 text-[8px] bg-black/70 text-slate-200 font-semibold truncate px-1 text-center">
                          {preset.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Detailed aerodynamic and drivetrain characteristics..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm focus:outline-none"
                />
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Top Speed
                  </label>
                  <input
                    type="text"
                    value={formData.topSpeed}
                    onChange={(e) => handleFieldChange('topSpeed', e.target.value)}
                    placeholder="75+ mph (120 km/h)"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Motor
                  </label>
                  <input
                    type="text"
                    value={formData.motor}
                    onChange={(e) => handleFieldChange('motor', e.target.value)}
                    placeholder="Viper 2200Kv 4-Pole"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Battery
                  </label>
                  <input
                    type="text"
                    value={formData.battery}
                    onChange={(e) => handleFieldChange('battery', e.target.value)}
                    placeholder="4S - 6S LiPo 5200mAh"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Drive Type
                  </label>
                  <input
                    type="text"
                    value={formData.driveType}
                    onChange={(e) => handleFieldChange('driveType', e.target.value)}
                    placeholder="Shaft-Driven 4WD"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Scale
                  </label>
                  <input
                    type="text"
                    value={formData.scale}
                    onChange={(e) => handleFieldChange('scale', e.target.value)}
                    placeholder="1:8 Scale"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Runtime
                  </label>
                  <input
                    type="text"
                    value={formData.runtime}
                    onChange={(e) => handleFieldChange('runtime', e.target.value)}
                    placeholder="25 - 35 Minutes"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Terrain & Store URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Terrain
                  </label>
                  <input
                    type="text"
                    value={formData.terrain}
                    onChange={(e) => handleFieldChange('terrain', e.target.value)}
                    placeholder="Asphalt, Track, Dirt Trails"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Configurable Store URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.storeUrl}
                    onChange={(e) => handleFieldChange('storeUrl', e.target.value)}
                    placeholder="https://traxxas.com/products/model"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Buttons: ADD/UPDATE, DELETE, CANCEL */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCarId ? 'UPDATE CAR' : 'ADD CAR'}</span>
                </button>

                {editingCarId && (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingCarId, formData.name)}
                    className="px-5 py-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>DELETE CAR</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </form>

            {/* LIVE PREVIEW PANEL: 5 columns */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <Eye className="w-4 h-4" />
                    <span>Live Showcase Preview</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Updates in Real-Time</span>
                </div>

                {previewCar && (
                  <div className="rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-900/80 p-3.5 space-y-3 shadow-xl">
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-950 relative">
                      <CarCardVisual car={previewCar} isHovered={true} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                          {previewCar.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                          {previewCar.topSpeed}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold font-['Syne'] text-white uppercase mt-1">
                        {previewCar.name || 'Untitled RC Model'}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                        {previewCar.description || 'Description preview will show here...'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800 text-slate-300">
                      <div className="p-2 rounded bg-slate-950/70 border border-slate-800 truncate">
                        <span className="text-slate-500 block text-[10px]">Motor</span>
                        <span className="font-semibold text-slate-200 truncate block">{previewCar.motor}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Scale</span>
                        <span className="font-semibold text-slate-200">{previewCar.scale}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-300">
                💡 <strong>Tip:</strong> Uploaded images are stored directly in your browser. They immediately appear in the Home hero, Cars collection, and Showroom.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXISTING CARS MANAGEMENT TABLE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-cyan-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold font-['Syne'] text-white uppercase tracking-wide">
              CURRENT SHOWROOM INVENTORY ({cars.length} Models)
            </h2>
            <p className="text-xs text-slate-400">
              Click Edit to change details or upload real photos.
            </p>
          </div>
          <button
            onClick={onResetCars}
            className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Catalog</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                <th className="py-3 px-4">Thumbnail</th>
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Top Speed</th>
                <th className="py-3 px-4">Motor</th>
                <th className="py-3 px-4">Store Link</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-sm">
              {cars.map((car) => {
                const hasRealImage = car.image.startsWith('http') || car.image.startsWith('data:');
                return (
                  <tr key={car.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                        {hasRealImage ? (
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-cyan-400">3D Vector</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-white font-['Syne']">
                      <div className="flex items-center gap-2">
                        <span>{car.name}</span>
                        {hasRealImage && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                            Real Photo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {car.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-300">
                      {car.topSpeed}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400 truncate max-w-[150px]">
                      {car.motor}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={car.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span className="truncate max-w-[110px]">
                          {getDomainFromUrl(car.storeUrl)}
                        </span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleViewInShowroom(car.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Open in 3D Showroom"
                      >
                        <Compass className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStartEdit(car)}
                        className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 transition-all cursor-pointer"
                        title="Edit RC Car"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id, car.name)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-slate-950 transition-all cursor-pointer"
                        title="Delete RC Car"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

