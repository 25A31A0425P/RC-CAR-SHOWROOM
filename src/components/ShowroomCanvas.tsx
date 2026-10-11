import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RCCar, AppSettings } from '../types';
import { RotateCw, ZoomIn, ZoomOut, Camera, Sparkles, Box, Image as ImageIcon } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface Props {
  car: RCCar;
  settings: AppSettings;
}

export const ShowroomCanvas: React.FC<Props> = ({ car, settings }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const turntableRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{ rim1: THREE.PointLight; rim2: THREE.PointLight } | null>(null);

  // Interaction State
  const [renderMode, setRenderMode] = useState<'photo' | 'cad'>('photo');
  const [isAutoRotating, setIsAutoRotating] = useState(settings.carRotation);
  const [activeViewPreset, setActiveViewPreset] = useState<'3/4' | 'side' | 'front' | 'top'>('3/4');

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef(0);
  const targetRotationRef = useRef({ x: 0.2, y: -0.6 });
  const currentRotationRef = useRef({ x: 0.2, y: -0.6 });
  const cameraDistanceRef = useRef(7.5);
  const targetCameraDistanceRef = useRef(7.5);

  // Sync setting
  useEffect(() => {
    setIsAutoRotating(settings.carRotation);
  }, [settings.carRotation]);

  // Build Procedural 3D Car Model based on Category and Accent Color
  const buildCarModel = useCallback((targetCar: RCCar): THREE.Group => {
    const group = new THREE.Group();
    const accentHex = parseInt(targetCar.accentColor.replace('#', '0x'), 16);
    const bodyHex = targetCar.bodyColor ? parseInt(targetCar.bodyColor.replace('#', '0x'), 16) : 0x0f172a;

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: bodyHex,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.5,
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.4,
      roughness: 0.6,
    });

    const accentNeonMaterial = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });

    const rubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.1,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
    });

    // 1. Lower Chassis Plate
    const chassisGeo = new THREE.BoxGeometry(1.6, 0.08, 3.4);
    const chassisMesh = new THREE.Mesh(chassisGeo, carbonMaterial);
    chassisMesh.position.y = 0.45;
    group.add(chassisMesh);

    // 2. Underglow Neon Strips
    const underglowGeo = new THREE.BoxGeometry(1.5, 0.03, 3.1);
    const underglowMesh = new THREE.Mesh(underglowGeo, accentNeonMaterial);
    underglowMesh.position.y = 0.38;
    group.add(underglowMesh);

    // Category specific body shapes & accessories
    if (targetCar.category === 'Racing') {
      // Sleek low-slung aerodynamic GT body
      const mainBodyGeo = new THREE.BoxGeometry(1.7, 0.4, 3.5);
      const mainBody = new THREE.Mesh(mainBodyGeo, bodyMaterial);
      mainBody.position.y = 0.7;
      group.add(mainBody);

      // Cabin Canopy
      const canopyGeo = new THREE.ConeGeometry(0.75, 1.8, 4);
      const canopy = new THREE.Mesh(canopyGeo, carbonMaterial);
      canopy.rotation.x = Math.PI / 2;
      canopy.rotation.y = Math.PI / 4;
      canopy.scale.set(1.1, 1.4, 0.35);
      canopy.position.set(0, 1.0, -0.1);
      group.add(canopy);

      // Front Splitter
      const splitterGeo = new THREE.BoxGeometry(1.85, 0.05, 0.6);
      const splitter = new THREE.Mesh(splitterGeo, carbonMaterial);
      splitter.position.set(0, 0.45, 1.8);
      group.add(splitter);

      // Rear GT Wing
      const wingBladeGeo = new THREE.BoxGeometry(1.9, 0.05, 0.4);
      const wingBlade = new THREE.Mesh(wingBladeGeo, carbonMaterial);
      wingBlade.position.set(0, 1.35, -1.65);

      const wingStalk1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.2), accentNeonMaterial);
      wingStalk1.position.set(0.5, 1.15, -1.6);
      const wingStalk2 = wingStalk1.clone();
      wingStalk2.position.set(-0.5, 1.15, -1.6);

      group.add(wingBlade, wingStalk1, wingStalk2);
    } else if (targetCar.category === 'Off-Road' || targetCar.category === 'Buggy') {
      // Rugged open-cabin buggy / truggy with roll cage
      const mainBodyGeo = new THREE.BoxGeometry(1.5, 0.5, 3.0);
      const mainBody = new THREE.Mesh(mainBodyGeo, bodyMaterial);
      mainBody.position.y = 0.8;
      group.add(mainBody);

      // Roll cage tubes
      const tubeMat = new THREE.MeshStandardMaterial({ color: accentHex, metalness: 0.8, roughness: 0.3 });
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.6);
      
      const bar1 = new THREE.Mesh(barGeo, tubeMat);
      bar1.position.set(0.65, 1.3, -0.2);
      bar1.rotation.x = 0.3;
      const bar2 = bar1.clone();
      bar2.position.x = -0.65;

      const crossBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3), tubeMat);
      crossBar.rotation.z = Math.PI / 2;
      crossBar.position.set(0, 1.7, -0.4);

      group.add(bar1, bar2, crossBar);

      // Front Bull Bar
      const bullBar = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.04, 8, 16, Math.PI), tubeMat);
      bullBar.position.set(0, 0.7, 1.6);
      group.add(bullBar);
    } else if (targetCar.category === 'Monster Truck') {
      // Lifted Monster truck with massive frame
      const cabGeo = new THREE.BoxGeometry(1.8, 0.8, 3.0);
      const cab = new THREE.Mesh(cabGeo, bodyMaterial);
      cab.position.y = 1.3;
      group.add(cab);

      // Twin Vertical Chassis Plates
      const plateGeo = new THREE.BoxGeometry(0.08, 0.9, 2.8);
      const plate1 = new THREE.Mesh(plateGeo, carbonMaterial);
      plate1.position.set(0.5, 0.8, 0);
      const plate2 = plate1.clone();
      plate2.position.set(-0.5, 0.8, 0);
      group.add(plate1, plate2);

      // Heavy Duty Wheelie Bar
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.8), accentNeonMaterial);
      bar.position.set(0, 0.6, -1.8);
      group.add(bar);
    } else if (targetCar.category === 'Rock Crawler') {
      // Scale Crawler Truck with roof rack & light bar
      const cabGeo = new THREE.BoxGeometry(1.5, 0.7, 3.2);
      const cab = new THREE.Mesh(cabGeo, bodyMaterial);
      cab.position.y = 1.0;
      group.add(cab);

      // Roof Rack
      const rackGeo = new THREE.BoxGeometry(1.3, 0.1, 1.4);
      const rack = new THREE.Mesh(rackGeo, carbonMaterial);
      rack.position.set(0, 1.45, -0.2);
      group.add(rack);

      // Roof LED Light Bar
      const ledBarGeo = new THREE.BoxGeometry(1.2, 0.1, 0.12);
      const ledBar = new THREE.Mesh(ledBarGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      ledBar.position.set(0, 1.5, 0.5);
      group.add(ledBar);
    } else {
      // Drift Spec RWD: Slammed coupe, negative camber, wide fenders
      const bodyGeo = new THREE.BoxGeometry(1.7, 0.45, 3.3);
      const body = new THREE.Mesh(bodyGeo, bodyMaterial);
      body.position.y = 0.65;
      group.add(body);

      // Ducktail Spoiler
      const ducktail = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 0.2), accentNeonMaterial);
      ducktail.position.set(0, 0.95, -1.6);
      ducktail.rotation.x = -0.4;
      group.add(ducktail);

      // Dual Exhaust Pipes
      const pipeGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 12);
      const pipe1 = new THREE.Mesh(pipeGeo, chromeMaterial);
      pipe1.rotation.x = Math.PI / 2;
      pipe1.position.set(0.35, 0.5, -1.7);
      const pipe2 = pipe1.clone();
      pipe2.position.x = 0.52;
      group.add(pipe1, pipe2);
    }

    // RC Internal Mechanical Details: Brushless Motor & ESC
    const motorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16);
    const motorMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.9, roughness: 0.2 });
    const motor = new THREE.Mesh(motorGeo, motorMat);
    motor.rotation.z = Math.PI / 2;
    motor.position.set(0.25, 0.65, 0.2);
    group.add(motor);

    // ESC with finned heat sink
    const escGeo = new THREE.BoxGeometry(0.4, 0.2, 0.4);
    const esc = new THREE.Mesh(escGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 }));
    esc.position.set(-0.3, 0.62, 0.3);
    group.add(esc);

    // Front Headlights
    const lightBarGeo = new THREE.BoxGeometry(0.4, 0.08, 0.1);
    const light1 = new THREE.Mesh(lightBarGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
    light1.position.set(0.55, 0.7, 1.72);
    const light2 = light1.clone();
    light2.position.set(-0.55, 0.7, 1.72);
    group.add(light1, light2);

    // 4 Wheels with Rims, Hubs & Coilovers
    const wheelRadius = targetCar.category === 'Monster Truck' ? 0.75 : targetCar.category === 'Rock Crawler' ? 0.55 : 0.45;
    const wheelWidth = targetCar.category === 'Monster Truck' ? 0.65 : 0.4;
    const wheelY = targetCar.category === 'Monster Truck' ? 0.75 : targetCar.category === 'Rock Crawler' ? 0.55 : 0.45;
    const posX = targetCar.category === 'Monster Truck' ? 1.25 : 1.0;
    const frontZ = 1.15;
    const rearZ = -1.15;

    const createWheel = (x: number, y: number, z: number, isRight: boolean) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      // Outer Tire
      const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 24);
      const tire = new THREE.Mesh(tireGeo, rubberMaterial);
      tire.rotation.z = Math.PI / 2;

      // Rim
      const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.65, wheelRadius * 0.65, wheelWidth * 1.05, 16);
      const rim = new THREE.Mesh(rimGeo, accentNeonMaterial);
      rim.rotation.z = Math.PI / 2;

      // Brake Rotor Disc
      const discGeo = new THREE.CylinderGeometry(wheelRadius * 0.5, wheelRadius * 0.5, 0.04, 16);
      const disc = new THREE.Mesh(discGeo, chromeMaterial);
      disc.rotation.z = Math.PI / 2;
      disc.position.x = isRight ? -0.1 : 0.1;

      wheelGroup.add(tire, rim, disc);

      // Coilover shock absorber behind wheel
      const shockGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5);
      const shock = new THREE.Mesh(shockGeo, accentNeonMaterial);
      shock.position.set(isRight ? -0.2 : 0.2, 0.25, 0);
      shock.rotation.z = isRight ? 0.3 : -0.3;
      group.add(shock);

      return wheelGroup;
    };

    group.add(createWheel(posX, wheelY, frontZ, true));
    group.add(createWheel(-posX, wheelY, frontZ, false));
    group.add(createWheel(posX, wheelY, rearZ, true));
    group.add(createWheel(-posX, wheelY, rearZ, false));

    return group;
  }, []);

  // Build Realistic Vehicle Photo Standee for 3D Turntable Platform
  const buildPhotoStandeeModel = useCallback((targetCar: RCCar): THREE.Group => {
    const group = new THREE.Group();
    const accentHex = parseInt(targetCar.accentColor.replace('#', '0x'), 16);

    // 1. Contact Drop Shadow on turntable platform
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 64, 15, 128, 64, 110);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.8, 1.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    group.add(shadowMesh);

    // 2. Cybernetic Pedestal Base on Turntable
    const baseGeo = new THREE.BoxGeometry(3.0, 0.1, 0.4);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x091322,
      metalness: 0.9,
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.05;
    group.add(baseMesh);

    // Neon Accent Trim on Base
    const neonBaseGeo = new THREE.BoxGeometry(3.05, 0.03, 0.42);
    const neonBaseMat = new THREE.MeshBasicMaterial({ color: accentHex });
    const neonBaseMesh = new THREE.Mesh(neonBaseGeo, neonBaseMat);
    neonBaseMesh.position.y = 0.04;
    group.add(neonBaseMesh);

    // Underglow Light casting onto turntable (soft ambient glow)
    const underglowLight = new THREE.PointLight(accentHex, 1.5, 4.0);
    underglowLight.position.set(0, 0.15, 0);
    group.add(underglowLight);

    // 3. Texture Loading for the Realistic Vehicle Image (Ultra-Crisp, Unwashed True-Color)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    const panelWidth = 4.0;
    const panelHeight = 2.4;
    const panelGeo = new THREE.PlaneGeometry(panelWidth, panelHeight);

    const texture = textureLoader.load(targetCar.image, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      const maxAniso = rendererRef.current?.capabilities.getMaxAnisotropy() || 16;
      tex.anisotropy = maxAniso;
      tex.needsUpdate = true;
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    });

    // Solid backing plate to eliminate any see-through faintness or light bleed
    const backGeo = new THREE.BoxGeometry(panelWidth + 0.04, panelHeight + 0.04, 0.02);
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x050b14,
      roughness: 0.7,
      metalness: 0.3,
    });
    const backPlate = new THREE.Mesh(backGeo, backMat);
    backPlate.position.y = 1.25;
    group.add(backPlate);

    // Front photo plane with toneMapped: false for 100% exact original photo contrast & clarity
    const photoMat = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
      transparent: true,
      alphaTest: 0.02,
      depthWrite: true,
      side: THREE.FrontSide,
    });

    const frontPanel = new THREE.Mesh(panelGeo, photoMat);
    frontPanel.position.set(0, 1.25, 0.012);
    group.add(frontPanel);

    // Reverse side photo plane (so 360° rotation shows vehicle on both sides clearly)
    const backPhotoMat = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
      transparent: true,
      alphaTest: 0.02,
      depthWrite: true,
      side: THREE.FrontSide,
    });
    const backPanel = new THREE.Mesh(panelGeo, backPhotoMat);
    backPanel.rotation.y = Math.PI;
    backPanel.position.set(0, 1.25, -0.012);
    group.add(backPanel);

    // 4. Sleek Cybernetic Glowing Bezel Frame
    const frameGeo = new THREE.BoxGeometry(panelWidth + 0.06, panelHeight + 0.06, 0.024);
    const frameEdges = new THREE.EdgesGeometry(frameGeo);
    const frameLineMat = new THREE.LineBasicMaterial({
      color: accentHex,
      transparent: true,
      opacity: 0.85,
    });
    const frameLines = new THREE.LineSegments(frameEdges, frameLineMat);
    frameLines.position.y = 1.25;
    group.add(frameLines);

    // Corner Precision Reticles / Hologram Brackets
    const bracketMat = new THREE.MeshBasicMaterial({ color: accentHex });
    const cornerT = 0.03;

    // Left edge neon marker
    const leftMarker = new THREE.Mesh(new THREE.BoxGeometry(cornerT, 0.45, 0.05), bracketMat);
    leftMarker.position.set(-panelWidth / 2 - 0.02, 1.25, 0);
    // Right edge neon marker
    const rightMarker = new THREE.Mesh(new THREE.BoxGeometry(cornerT, 0.45, 0.05), bracketMat);
    rightMarker.position.set(panelWidth / 2 + 0.02, 1.25, 0);

    group.add(leftMarker, rightMarker);

    return group;
  }, []);

  // Set Preset View Angle
  const setPresetAngle = (preset: '3/4' | 'side' | 'front' | 'top') => {
    soundEffects.playClick();
    setActiveViewPreset(preset);
    setIsAutoRotating(false);
    if (preset === '3/4') {
      targetRotationRef.current = { x: 0.22, y: -0.6 };
      targetCameraDistanceRef.current = 7.5;
    } else if (preset === 'side') {
      targetRotationRef.current = { x: 0.05, y: -Math.PI / 2 };
      targetCameraDistanceRef.current = 6.8;
    } else if (preset === 'front') {
      targetRotationRef.current = { x: 0.05, y: 0 };
      targetCameraDistanceRef.current = 6.8;
    } else if (preset === 'top') {
      targetRotationRef.current = { x: Math.PI / 2 - 0.1, y: 0 };
      targetCameraDistanceRef.current = 8.2;
    }
  };

  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    soundEffects.playClick();
    if (direction === 'in') {
      targetCameraDistanceRef.current = Math.max(4.5, targetCameraDistanceRef.current - 1.2);
    } else {
      targetCameraDistanceRef.current = Math.min(11, targetCameraDistanceRef.current + 1.2);
    }
  };

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // transparent background so futuristic CSS gradients show through

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.2, cameraDistanceRef.current);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffffff, 4.5);
    mainSpot.position.set(0, 9, 2);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.6;
    scene.add(mainSpot);

    const rimLight1 = new THREE.PointLight(parseInt(car.accentColor.replace('#', '0x'), 16), 3.0, 18);
    rimLight1.position.set(4, 2, -4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0x00f0ff, 2.5, 18);
    rimLight2.position.set(-4, 2, -4);
    scene.add(rimLight2);
    lightsRef.current = { rim1: rimLight1, rim2: rimLight2 };

    // 5. Circular Neon Platform / Turntable
    const turntable = new THREE.Group();
    turntableRef.current = turntable;

    // Dark Base Cylinder
    const baseGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.25, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x060f1c,
      roughness: 0.35,
      metalness: 0.9,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.125;
    turntable.add(baseMesh);

    // Glowing Neon Ring Edge
    const ringGeo = new THREE.TorusGeometry(3.65, 0.035, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: parseInt(car.accentColor.replace('#', '0x'), 16),
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    turntable.add(ringMesh);

    // Outer Concentric Glow Ring with tick marks
    const outerRingGeo = new THREE.TorusGeometry(4.2, 0.02, 16, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    turntable.add(outerRing);

    // Platform Reflective Grid Inset
    const gridDiscGeo = new THREE.CircleGeometry(3.5, 48);
    const gridDiscMat = new THREE.MeshStandardMaterial({
      color: 0x040810,
      roughness: 0.15,
      metalness: 0.95,
    });
    const gridDisc = new THREE.Mesh(gridDiscGeo, gridDiscMat);
    gridDisc.rotation.x = -Math.PI / 2;
    gridDisc.position.y = 0.005;
    turntable.add(gridDisc);

    scene.add(turntable);

    // 6. Car Model (Realistic Photo Standee on 3D Turntable or Procedural CAD Mesh)
    const carModel = renderMode === 'photo' ? buildPhotoStandeeModel(car) : buildCarModel(car);
    carGroupRef.current = carModel;
    turntable.add(carModel);

    // 7. Ambient Particle Field
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = Math.random() * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    // 8. Animation & Render Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Auto-rotation when not dragging
      if (isAutoRotating && !isDraggingRef.current && settings.motionEffects) {
        targetRotationRef.current.y += 0.008;
      }

      // Smooth damping interpolation for rotation
      const ease = 0.1;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * ease;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * ease;

      // Smooth damping for zoom
      cameraDistanceRef.current += (targetCameraDistanceRef.current - cameraDistanceRef.current) * 0.12;

      // Apply rotation to turntable
      if (turntableRef.current) {
        turntableRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Apply pitch angle to camera
      if (cameraRef.current) {
        const radius = cameraDistanceRef.current;
        const pitch = currentRotationRef.current.x;
        cameraRef.current.position.y = Math.sin(pitch) * radius + 1.2;
        cameraRef.current.position.z = Math.cos(pitch) * radius;
        cameraRef.current.lookAt(0, 0.6, 0);
      }

      // Gentle pulse on rim lights
      if (lightsRef.current && settings.backgroundEffects) {
        lightsRef.current.rim1.intensity = 2.8 + Math.sin(elapsed * 2) * 0.6;
        lightsRef.current.rim2.intensity = 2.4 + Math.cos(elapsed * 1.8) * 0.5;
      }

      // Gentle particle drift
      if (particlePoints && settings.backgroundEffects) {
        particlePoints.rotation.y = elapsed * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      baseGeo.dispose();
      baseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      gridDiscGeo.dispose();
      gridDiscMat.dispose();
    };
  }, [car, buildCarModel, buildPhotoStandeeModel, renderMode, settings.backgroundEffects, settings.motionEffects]);

  // Handle Drag to Rotate
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    // Clamp vertical tilt between flat and top-down
    targetRotationRef.current.x = Math.max(0.02, Math.min(1.2, targetRotationRef.current.x + deltaY * 0.005));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.003;
    targetCameraDistanceRef.current = Math.max(4.5, Math.min(11, targetCameraDistanceRef.current + zoomDelta));
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center overflow-hidden select-none">
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none z-10"
      />

      {/* Floating Futuristic HUD Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        {/* Model Mode Toggle: Realistic Photo Standee vs 3D CAD Mesh */}
        <div className="flex items-center p-1 bg-slate-900/80 backdrop-blur-md rounded-lg border border-cyan-500/30 text-xs font-semibold">
          <button
            onClick={() => {
              soundEffects.playClick();
              setRenderMode('photo');
            }}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              renderMode === 'photo'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Realistic Photo</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setRenderMode('cad');
            }}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              renderMode === 'cad'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D CAD Model</span>
          </button>
        </div>

        {/* Preset Angles */}
        <div className="flex items-center p-1 bg-slate-900/80 backdrop-blur-md rounded-lg border border-cyan-500/30 text-xs font-semibold">
          <button
            onClick={() => setPresetAngle('3/4')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeViewPreset === '3/4'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3/4 View
          </button>
          <button
            onClick={() => setPresetAngle('side')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeViewPreset === 'side'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setPresetAngle('front')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeViewPreset === 'front'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setPresetAngle('top')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeViewPreset === 'top'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chassis Top
          </button>
        </div>
      </div>

      {/* Right HUD Controls: Auto-Rotate & Zoom */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => {
            soundEffects.playClick();
            setIsAutoRotating(!isAutoRotating);
          }}
          title={isAutoRotating ? 'Pause Turntable' : 'Auto-Rotate Turntable'}
          className={`p-2 rounded-lg backdrop-blur-md border transition-all text-xs font-semibold flex items-center gap-1.5 ${
            isAutoRotating
              ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
              : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-slate-200'
          }`}
        >
          <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">{isAutoRotating ? 'Rotating' : 'Rotate'}</span>
        </button>

        <div className="flex items-center p-1 bg-slate-900/80 backdrop-blur-md rounded-lg border border-cyan-500/30">
          <button
            onClick={() => handleZoom('in')}
            title="Zoom In"
            className="p-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-3 bg-slate-700 mx-1" />
          <button
            onClick={() => handleZoom('out')}
            title="Zoom Out"
            className="p-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 text-[11px] text-cyan-400/80 font-medium">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>Drag to orbit 360° · Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
};
