import { RCCar } from '../types';

export const INITIAL_CARS: RCCar[] = [
  {
    id: 'car-vortex-gtr',
    name: 'Traxxas XO-1® Supercar',
    category: 'Racing',
    description: 'The Traxxas XO-1 is the world\'s fastest Ready-To-Race 1/7 scale AWD electric supercar, rocketing from 0 to 60 mph in 2.3 seconds and blasting past 100+ mph in 4.92 seconds. Features computer-optimized aerodynamics with functional front splitter, high-downforce rear wing, 6S Castle Mamba Monster power system, and Traxxas Stability Management (TSM).',
    image: 'https://cdn.shopify.com/s/files/1/0583/6413/3582/products/64077-3_BLUEX_905bd4ce-1729-4716-aa91-5d00ae460834.jpg?v=1677888674',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/products/64077-3_BLUEX_905bd4ce-1729-4716-aa91-5d00ae460834.jpg?v=1677888674',
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/products/64077-3_REDX.jpg?v=1677888687',
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/products/64077-3_ORNG_6ffe1de8-d29a-4906-8a87-b27533e8d252.jpg?v=1677888683'
    ],
    topSpeed: '100+ mph (160+ km/h)',
    topSpeedNum: 100,
    motor: 'Traxxas Big Block 1650Kv Brushless',
    battery: 'Dual 3S LiPo (6S - 22.2V) 5000mAh 50C+',
    driveType: 'Shaft-Driven 4WD with Steel Spline CV Driveshafts',
    scale: '1/7 Scale Supercar',
    runtime: '20 - 25 Minutes',
    terrain: 'Smooth Asphalt, Speed Runs, Closed Dragstrips',
    storeUrl: 'https://traxxas.com/products/models/electric/xo-1-supercar',
    accentColor: '#00f0ff',
    bodyColor: '#0c1b2e',
    weight: '3.9 kg (8.6 lbs)',
    features: [
      'Computer-optimized aerodynamic downforce package',
      'Castle Mamba Monster Extreme 6S power system',
      'Traxxas Stability Management (TSM) electronic gyro',
      'Traxxas Link wireless telemetry for top speed unlock'
    ],
    parts: [
      {
        name: 'Chassis',
        role: 'Structural Baseline',
        description: 'CNC-machined 3mm 6061-T6 aluminum lower chassis with functional dark-anodized upper deck for extreme high-speed rigidity.',
        specs: '3.0mm 6061-T6 Aluminum'
      },
      {
        name: 'Motor',
        role: 'Propulsion Unit',
        description: 'Traxxas Big Block 1650Kv brushless motor with sintered neodymium magnets, finned cooling heatsink, and dual ball bearings.',
        specs: '1650Kv / 6S Rated / 45,000 RPM Max'
      },
      {
        name: 'ESC',
        role: 'Electronic Speed Controller',
        description: 'Castle Mamba Monster Extreme waterproof speed control with high-current Traxxas connectors and integrated data-logging capability.',
        specs: '150A Continuous / 6S LiPo Capable'
      },
      {
        name: 'Battery',
        role: 'Power Storage',
        description: 'Dual scalable battery compartments engineered specifically for twin 3-cell 11.1V Traxxas Power Cell LiPo packs in series.',
        specs: '6S 5000mAh 50C LiPo'
      },
      {
        name: 'Servo Motor',
        role: 'High-Speed Steering Actuator',
        description: 'Waterproof digital high-torque 2075 steering servo delivering pinpoint turn-in authority with integrated dual-bellcrank servo saver.',
        specs: '125 oz-in Torque / Metal Geared'
      },
      {
        name: 'Wheels & Tires',
        role: 'Traction Interface',
        description: 'Belted slick competition racing tires bonded to aerodynamic split-spoke black chrome wheels rated for 100+ mph centrifugal force.',
        specs: '100+ MPH Speed-Rated Belted Slicks'
      },
      {
        name: 'Suspension',
        role: 'Ground Dynamics',
        description: 'Hard-anodized GTR aluminum oil-filled shocks with PTFE-coated bodies and titanium-nitride shafts for razor-sharp track damping.',
        specs: 'GTR Threaded Aluminum Dampers'
      }
    ]
  },
  {
    id: 'car-titan-apex',
    name: 'ARRMA Kraton 6S BLX',
    category: 'Off-Road',
    description: 'The ARRMA Kraton 6S BLX is a premier 1/8 scale 4WD speed monster truck engineered for brutal all-terrain punishment and 60+ mph high-speed bashing. Powered by a Spektrum Firma 2050Kv brushless motor and 150A Smart ESC, it features an anodized aluminum chassis, metal-geared differentials, heavy-duty suspension arms, and dBoots Copperhead 2 all-terrain tires.',
    image: 'https://cdn.shopify.com/s/files/1/0683/7433/1480/files/57_ebb83681-e647-4f34-a5e2-b3f8c2db1502.jpg?v=1760462195',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0683/7433/1480/files/57_ebb83681-e647-4f34-a5e2-b3f8c2db1502.jpg?v=1760462195',
      'https://cdn.shopify.com/s/files/1/0683/7433/1480/files/57_ca19fe20-23eb-4ba3-983c-7faf132cd621.jpg?v=1760462195',
      'https://cdn.shopify.com/s/files/1/0683/7433/1480/files/57_f3414100-9dd7-429c-aa27-6ca673e11623.jpg?v=1760462195',
      'https://cdn.shopify.com/s/files/1/0683/7433/1480/files/57_cf59fef6-e200-4afd-9fa0-dec2996cd026.jpg?v=1760462195'
    ],
    topSpeed: '65+ mph (105+ km/h)',
    topSpeedNum: 65,
    motor: 'Spektrum Firma 4074 2050Kv Brushless',
    battery: '4S - 6S LiPo 5000mAh 50C Hardcase',
    driveType: 'Heavy-Duty 4WD with 3 All-Metal Differentials',
    scale: '1/8 Scale Speed Truck',
    runtime: '25 - 35 Minutes',
    terrain: 'Gravel, Dirt Jumps, Grass, Skateparks, Rough Terrain',
    storeUrl: 'https://www.horizonhobby.com/product/1-8-kraton-6s-v5-4wd-blx-speed-monster-truck-rtr/ARA8608V5.html',
    accentColor: '#ef4444',
    bodyColor: '#1c0808',
    weight: '4.85 kg (10.7 lbs)',
    features: [
      'Spektrum Firma 150A Smart waterproof ESC',
      'Anodized 6061-T6 aluminum chassis plate',
      'High-downforce rear wing and wheelie bar',
      'Oil-filled adjustable aluminum coil-over shocks'
    ],
    parts: [
      {
        name: 'Chassis',
        role: 'Heavy-Duty Backbone',
        description: 'Anodized 3mm 6061-T6 aluminum plate reinforced with center chassis brace for maximum durability during massive jumps.',
        specs: '3mm 6061-T6 Anodized Aluminum'
      },
      {
        name: 'Motor',
        role: 'Torque Generator',
        description: 'Spektrum Firma 4074 2050Kv 4-pole brushless motor designed for maximum torque bursts over dirt tracks and jump ramps.',
        specs: '2050Kv / 4074 Size / 4-Pole'
      },
      {
        name: 'ESC',
        role: 'Smart Power Management',
        description: 'Spektrum Firma 150A Smart ESC with dual IC5 connectors, telemetric battery cell monitoring, and active cooling fan.',
        specs: '150A Continuous / 6S LiPo Ready'
      },
      {
        name: 'Battery',
        role: 'Basher Power Reservoir',
        description: 'Rubber-strapped dual battery trays fitting standard 2x 3S or 1x 6S hardcase LiPo batteries securely.',
        specs: '6S 5000mAh 50C Hardcase'
      },
      {
        name: 'Servo Motor',
        role: 'High-Torque Metal Steerer',
        description: 'Spektrum S652 waterproof metal-geared digital servo delivering 265 oz-in of torque for high-speed obstacle clearing.',
        specs: '265 oz-in / Metal Geared / 23T'
      },
      {
        name: 'Wheels & Tires',
        role: 'High-Traction Claws',
        description: 'dBoots Copperhead 2 SB multi-surface tires pre-mounted on rugged multi-spoke nylon wheels with 17mm hex hubs.',
        specs: 'dBoots Copperhead 2 SB All-Terrain'
      },
      {
        name: 'Suspension',
        role: 'Jump Impact Absorption',
        description: 'Massive 16mm big-bore oil-filled aluminum shocks with heavy-duty silicone bladders and threaded spring collars.',
        specs: '16mm Big-Bore Aluminum Shocks'
      }
    ]
  },
  {
    id: 'car-phantom-drift',
    name: 'Yokomo RD2.0 Rookie Drift',
    category: 'Drift',
    description: 'The Yokomo RD2.0 is an authentic competition-grade Japanese 1/10 RWD RC drift car featuring an aggressively styled Pandem Nissan Fairlady Z body. Engineered with mid-rear motor positioning, a 4-gear transmission for sharp throttle response, 68-degree high-angle steering bellcranks, and specialized hard drift compound tires.',
    image: 'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/yokdp-rz34bl.jpg?v=1775156435',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/yokdp-rz34bl.jpg?v=1775156435',
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/kyo34501t1.webp?v=1743706384'
    ],
    topSpeed: '42 mph (68 km/h)',
    topSpeedNum: 42,
    motor: 'Yokomo ZERO-S 10.5T Sensored Brushless',
    battery: '2S Shorty LiPo (7.4V) 4500mAh 100C',
    driveType: 'Mid-Ship RWD (Rear-Wheel Drive) with Ball Diff',
    scale: '1/10 Scale Drift',
    runtime: '35 - 45 Minutes',
    terrain: 'Polished Concrete, P-Tile, Carpet Drift Tracks',
    storeUrl: 'https://teamyokomo.com/product/rdr-020/',
    accentColor: '#a855f7',
    bodyColor: '#170c24',
    weight: '1.45 kg (3.2 lbs)',
    features: [
      'Officially licensed Pandem Nissan Fairlady Z widebody',
      'Adjustable 68-degree high-angle steering knuckles',
      'Active magnetic gyro steering stabilization system',
      'Quick-change shorty LiPo battery hold-down system'
    ],
    parts: [
      {
        name: 'Chassis',
        role: 'Drift Balance Platform',
        description: 'Narrow lightweight composite main tub optimized for longitudinal flex, mid-rear motor mount, and ideal 35/65 rear weight distribution.',
        specs: 'Narrow Composite Low-CG Deck'
      },
      {
        name: 'Motor',
        role: 'Sensored Slide Power',
        description: 'Yokomo ZERO-S 10.5-turn sensored brushless motor providing silky smooth low-RPM throttle modulation for tandem drifting.',
        specs: '10.5T Sensored Brushless / 3500Kv'
      },
      {
        name: 'ESC',
        role: 'Smooth Throttle Controller',
        description: 'Yokomo BL-RS4 competition drift ESC with turbo boost and drag brake curves fine-tuned for smooth weight transfer.',
        specs: '120A Sensored / Drift Programmed'
      },
      {
        name: 'Battery',
        role: 'Lightweight Power',
        description: '2S Shorty LiPo pack centered longitudinally for minimum polar moment of inertia and lightning-fast transition flicks.',
        specs: '2S 7.4V 4500mAh 100C Shorty'
      },
      {
        name: 'Servo Motor',
        role: 'Ultra-Fast Counter-Steer',
        description: 'Coreless low-profile digital servo with titanium gears and 0.06s transit speed synced with an active steering gyro.',
        specs: '0.06s Transit / 12kg-cm / Coreless'
      },
      {
        name: 'Wheels & Tires',
        role: 'Low-Friction Slide Contact',
        description: 'High-density hard PE drift tires on deep-dish chrome rims with 6mm positive offset for aggressive fender flushness.',
        specs: 'Hard HDPE Competition Drift Compound'
      },
      {
        name: 'Suspension',
        role: 'Roll & Camber Control',
        description: 'Precision aluminum threaded coil-over dampers with ultra-soft drift springs and adjustable negative front camber.',
        specs: 'Aluminum Threaded Low-Friction Shocks'
      }
    ]
  },
  {
    id: 'car-colossus-monster',
    name: 'Traxxas X-Maxx® 8S',
    category: 'Monster Truck',
    description: 'The Traxxas X-Maxx 8S is an unstoppable 1/6 scale mammoth built to conquer the most extreme terrain. Delivering 30+ volts of dual-LiPo brushless energy, it rolls on colossal 8.4-inch belted chevron tires with heavy-duty Cush Drive, oversized GTX aluminum shocks, modular composite chassis, and patented push-button Self-Righting technology.',
    image: 'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/77096-4-x-maxx-belted-green-side__33004.jpg?v=1710270865',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/77096-4-x-maxx-belted-green-side__33004.jpg?v=1710270865',
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/77096-4-x-maxx-belted-orange-side__67029.jpg?v=1710270882'
    ],
    topSpeed: '55+ mph (88+ km/h)',
    topSpeedNum: 55,
    motor: 'Velineon 1200XL Big Block 8S Brushless',
    battery: 'Dual 4S LiPo (8S - 29.6V) 6700mAh 25C+',
    driveType: 'Steel Shaft 4WD with Cush Drive & Center Diff',
    scale: '1/6 Monster Scale',
    runtime: '20 - 30 Minutes',
    terrain: 'Dirt Mounds, Skateparks, Boulders, Grass, Sand',
    storeUrl: 'https://traxxas.com/products/landing/xmaxx/',
    accentColor: '#3b82f6',
    bodyColor: '#0a192f',
    weight: '8.66 kg (19.1 lbs)',
    features: [
      'Patented Traxxas Self-Righting technology',
      'Velineon VXL-8s waterproof speed control with telemetry',
      'Massive 8.4-inch Sledgehammer belted monster tires',
      'Full-time shaft-driven 4WD with steel differentials'
    ],
    parts: [
      {
        name: 'Chassis',
        role: 'Modular Mammoth Frame',
        description: 'Triangular interlocking modular composite chassis that separates into front, center, and rear sections for ultimate structural toughness.',
        specs: 'Reinforced Composite Monocoque'
      },
      {
        name: 'Motor',
        role: '8S Brushless Powerhouse',
        description: 'Velineon 1200XL big-block motor with 5mm hardened steel output shaft and dual-fan integrated aluminum heatsink.',
        specs: '1200Kv / 8S Capable / Finned Heatsink'
      },
      {
        name: 'ESC',
        role: 'VXL-8s High-Voltage Brain',
        description: 'Velineon VXL-8s waterproof electronic speed control with real-time temperature, voltage, and RPM telemetry broadcast.',
        specs: '8S LiPo (33.6V Max) / Dual Cooling Fans'
      },
      {
        name: 'Battery',
        role: 'Dual 4S High-Capacity Banks',
        description: 'Snap-lock battery hold-down trays accommodating two 4-cell 14.8V 6700mAh LiPo batteries in series.',
        specs: '8S 29.6V Total / 6700mAh 25C+'
      },
      {
        name: 'Servo Motor',
        role: 'Heavy-Duty Monster Steerer',
        description: 'Waterproof monster-scale steering servo outputting 365 oz-in of torque directly to an integrated cam-style servo saver.',
        specs: '365 oz-in Torque / Metal-Geared 2085X'
      },
      {
        name: 'Wheels & Tires',
        role: 'Giant All-Terrain Sledgehammers',
        description: 'Oversized 8.4-inch belted chevron-tread monster tires preventing ballooning at 50+ mph on rugged 24mm hex wheels.',
        specs: '8.4" Diameter Belted Chevron Treads'
      },
      {
        name: 'Suspension',
        role: 'Massive Travel Dampers',
        description: 'Huge GTX machined aluminum oil-filled shocks with extra-large bore and silicone seals absorbing 50-foot landing drops.',
        specs: 'Extra-Large Bore Aluminum GTX Shocks'
      }
    ]
  },
  {
    id: 'car-phantom-crawler',
    name: 'Axial SCX10™ III Jeep Gladiator',
    category: 'Rock Crawler',
    description: 'The Axial SCX10 III Jeep JT Gladiator 1/10 4WD Rock Crawler is the benchmark for realistic trail crawling and rock scaling. Engineered with high-clearance AR45 portal axles, replica V8 motor cover, 2-speed transmission with DIG functionality for front-wheel turning pivots, and detailed officially licensed Jeep body.',
    image: 'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/AXI-2443T1_A0_BOQRWS1J.jpg?v=1787644442',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/AXI-2443T1_A0_BOQRWS1J.jpg?v=1787644442',
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/files/AXI-2443T2_A0_P1KLBRYO.jpg?v=1787644426'
    ],
    topSpeed: '18 mph (29 km/h)',
    topSpeedNum: 18,
    motor: 'Axial 35T 540 Brushed High-Torque Motor',
    battery: '2S - 3S LiPo (11.1V) 3200mAh 30C Compact',
    driveType: '4WD with Portal Axles & Transmitter DIG Control',
    scale: '1/10 Scale Trail Crawler',
    runtime: '60 - 90 Minutes',
    terrain: 'Rocks, Boulders, Creek Beds, Mountain Trails, Mud',
    storeUrl: 'https://www.axialadventure.com/by-platform/scx10/',
    accentColor: '#10b981',
    bodyColor: '#0a2318',
    weight: '3.15 kg (6.9 lbs)',
    features: [
      'AR45 portal axles for superior ground clearance',
      'DIG transmission function allows locking rear axle from radio',
      'Scale replica V8 engine cover and transmission housing',
      'Officially licensed Jeep JT Gladiator body with interior'
    ],
    parts: [
      {
        name: 'Chassis',
        role: 'Scale C-Channel Steel Ladder',
        description: 'Rigid stamped-steel C-channel chassis rails with cross braces and adjustable wheelbase for scale realism and rigidity.',
        specs: 'Stamped C-Channel Steel Frame Rails'
      },
      {
        name: 'Motor',
        role: 'Crawler Torque Powerhouse',
        description: 'Axial 35-Turn 540-size brushed motor tuned for crawling resolution and downhill drag braking on steep inclines.',
        specs: '35T Brushed / 540 Can / High-Torque'
      },
      {
        name: 'ESC',
        role: 'Waterproof Crawler Controller',
        description: 'Spektrum Firma 40A brushed waterproof ESC and receiver combo with programmable 100% hill drag brake.',
        specs: '40A Continuous / 3S LiPo Compatible'
      },
      {
        name: 'Battery',
        role: 'Compact Trail Pack',
        description: 'Low-profile forward-mounted battery tray keeping center-of-gravity low and forward over the front axle for vertical climbs.',
        specs: '3S 11.1V 3200mAh LiPo Pack'
      },
      {
        name: 'Servo Motor',
        role: 'Chassis-Mounted High-Torque Servo',
        description: 'Spektrum S614 15kg metal-gear waterproof servo mounted to the chassis with panhard bar for zero bump steer.',
        specs: '15kg-cm / Metal Gears / Waterproof'
      },
      {
        name: 'Wheels & Tires',
        role: 'High-Grip Boulder Crawlers',
        description: 'Officially licensed Nitto Trail Grappler 1.9 tires on multi-piece 3-piece beadlock wheels with inner foam inserts.',
        specs: '4.7" Nitto Trail Grapplers on 1.9" Beadlocks'
      },
      {
        name: 'Suspension',
        role: 'Articulating Links & Shocks',
        description: 'Triangulated 4-link rear and 3-link front suspension with aluminum oil-filled shocks allowing 70 degrees of axle twist.',
        specs: 'Aluminum Coil-Over Shocks & Steel Links'
      }
    ]
  },
  {
    id: 'car-razorback-buggy',
    name: 'Losi Baja Rey® Ford Raptor',
    category: 'Buggy',
    description: 'The Losi Baja Rey Ford Raptor 1/10 4WD Desert Truck brings authentic Baja 1000 desert racing performance to life. Designed with a true-to-scale 4-link live rear axle with long-travel trailing arms, independent front suspension, full roll cage with functional spare tire, and Spektrum 3800Kv brushless power with AVC stability.',
    image: 'https://cdn.shopify.com/s/files/1/0583/6413/3582/products/LOS03020V2T1.jpg?v=1662598466',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/products/LOS03020V2T1.jpg?v=1662598466',
      'https://cdn.shopify.com/s/files/1/0583/6413/3582/products/LOS03020V2T2.jpg?v=1662598466'
    ],
    topSpeed: '50+ mph (80+ km/h)',
    topSpeedNum: 50,
    motor: 'Dynamite Fuze 3800Kv 4-Pole Brushless',
    battery: '2S - 3S LiPo 5000mAh 50C Hardcase',
    driveType: '4WD with Long-Travel 4-Link Live Rear Axle',
    scale: '1/10 Desert Truck / Buggy',
    runtime: '25 - 32 Minutes',
    terrain: 'Desert Dunes, Sand Pits, Dirt Ovals, Jumps',
    storeUrl: 'https://www.losi.com/product/1-10-baja-rey-4wd-desert-truck-brushless-rtr/LOS03020V2.html',
    accentColor: '#f59e0b',
    bodyColor: '#281c08',
    weight: '2.8 kg (6.1 lbs)',
    features: [
      'Authentic licensed Ford Raptor trophy truck body & King Shocks livery',
      'Long-travel 4-link live rear axle suspension',
      'Spektrum Active Vehicle Control (AVC) stability system',
      'Integral roll cage with functional rear-mounted spare tire'
    ],
    parts: [
      {
        name: 'Chassis',
        role: 'Anodized Desert Skid Plate',
        description: 'Hard-anodized 3mm aluminum chassis plate integrated into a full roll cage cage structure that deflects rock strikes and rollovers.',
        specs: '3mm Hard-Anodized Aluminum Skid'
      },
      {
        name: 'Motor',
        role: 'High-Kv Desert Brushless',
        description: 'Dynamite Fuze 3800Kv sensorless 4-pole brushless motor engineered for blistering roost-throwing sand acceleration.',
        specs: '3800Kv / 4-Pole / 540-Can'
      },
      {
        name: 'ESC',
        role: 'High-Velocity Controller',
        description: 'Dynamite 130A waterproof brushless ESC with thermal protection and reverse lockout for competition desert heats.',
        specs: '130A Continuous / 3S LiPo Ready'
      },
      {
        name: 'Battery',
        role: 'Rear-Load Power Compartment',
        description: 'Innovative rear-loading battery tray allows battery changes without unhooking or removing the body shell.',
        specs: '3S 11.1V 5000mAh 50C Hardcase'
      },
      {
        name: 'Servo Motor',
        role: 'Metal-Geared Desert Steerer',
        description: 'Spektrum S605 waterproof steering servo delivering rapid turn response over deep ruts and sand berms.',
        specs: '9kg-cm / Metal Gears / Waterproof'
      },
      {
        name: 'Wheels & Tires',
        role: 'Licensed Desert Race Claws',
        description: 'Officially licensed BFGoodrich Baja T/A KR2 tires mounted on Method 101 race wheels with functional beadlock look.',
        specs: 'BFGoodrich Baja T/A KR2 on Method 101s'
      },
      {
        name: 'Suspension',
        role: 'Baja Long-Travel System',
        description: 'Independent front A-arms with long-travel coil-over shocks and 4-link solid rear axle with trailing arms soaking up washboard bumps.',
        specs: 'Long-Travel Oil-Filled Aluminum Shocks'
      }
    ]
  }
];
