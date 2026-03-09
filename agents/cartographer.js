/**
 * CARTOGRAPHER Agent
 * Generates map data and creates interactive SVG map component
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Read world bible for region data
function loadWorldBible() {
  try {
    const data = readFileSync(join(process.cwd(), 'data', 'world-bible.json'), 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.log('CARTOGRAPHER: No world-bible.json found, generating standalone map data');
    return null;
  }
}

// Generate map boundaries using simplified polygon generation
function generateBoundaries() {
  const boundaries = [];
  const centerX = 500;
  const centerY = 350;
  const numPoints = 20;
  const baseRadius = 300;
  
  const outerBoundary = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const variance = randomRange(-50, 50);
    const radius = baseRadius + variance;
    outerBoundary.push([
      Math.round(centerX + Math.cos(angle) * radius),
      Math.round(centerY + Math.sin(angle) * radius)
    ]);
  }
  boundaries.push(outerBoundary);
  
  // Add some internal boundaries (mountain ranges, rivers)
  for (let r = 0; r < 3; r++) {
    const internalBoundary = [];
    const startAngle = randomRange(0, Math.PI);
    const endAngle = startAngle + Math.PI;
    for (let i = 0; i <= 10; i++) {
      const angle = startAngle + (i / 10) * (endAngle - startAngle);
      const radius = randomRange(100, 250);
      internalBoundary.push([
        Math.round(centerX + Math.cos(angle) * radius),
        Math.round(centerY + Math.sin(angle) * radius)
      ]);
    }
    boundaries.push(internalBoundary);
  }
  
  return boundaries;
}

function generateMapData(worldBible) {
  console.log('CARTOGRAPHER: Generating map data...');
  
  const regions = worldBible?.geography?.regions || [];
  const biomes = worldBible?.geography?.biomes || [
    { type: 'dark_forest', color: '#1a2f1a', characteristics: ['Dense canopy', 'Bioluminescent fungi'] },
    { type: 'barren_wasteland', color: '#2d2418', characteristics: ['Cracked earth', 'Ash deposits'] },
    { type: 'mountain_peaks', color: '#3d3d4a', characteristics: ['Jagged peaks', 'Snow-capped'] },
    { type: 'swamp_marsh', color: '#1f291f', characteristics: ['Still waters', 'Twisted trees'] },
    { type: 'coastal_cliffs', color: '#2a3d4a', characteristics: ['Crashing waves', 'Sheer drops'] },
    { type: 'frozen_tundra', color: '#4a5d6a', characteristics: ['Permafrost', 'Ice formations'] }
  ];

  // If no regions from world bible, generate some
  const mapRegions = regions.length > 0 ? regions : [
    {
      id: generateId('region'),
      name: 'The Shadowed Vale',
      biome: 'dark_forest',
      description: 'A dark forest characterized by dense canopy, bioluminescent fungi.',
      coordinates: { x: 100, y: 100, width: 200, height: 150 },
      cities: [
        { id: generateId('city'), name: 'Shadowhaven', population: 15000, type: 'capital', coordinates: { x: 180, y: 160 } }
      ]
    },
    {
      id: generateId('region'),
      name: 'Iron Peaks',
      biome: 'mountain_peaks',
      description: 'Jagged mountain peaks with snow-capped summits.',
      coordinates: { x: 400, y: 50, width: 180, height: 200 },
      cities: [
        { id: generateId('city'), name: 'Ironhold', population: 8000, type: 'major', coordinates: { x: 480, y: 120 } }
      ]
    },
    {
      id: generateId('region'),
      name: 'Bloodmarsh',
      biome: 'swamp_marsh',
      description: 'A treacherous swamp with still waters and twisted trees.',
      coordinates: { x: 150, y: 400, width: 250, height: 180 },
      cities: [
        { id: generateId('city'), name: 'Bogwatch', population: 3000, type: 'minor', coordinates: { x: 250, y: 480 } }
      ]
    },
    {
      id: generateId('region'),
      name: 'Voidwood',
      biome: 'dark_forest',
      description: 'Ancient forest where shadows linger longer than elsewhere.',
      coordinates: { x: 600, y: 200, width: 200, height: 250 },
      cities: [
        { id: generateId('city'), name: 'Nightspire', population: 12000, type: 'major', coordinates: { x: 680, y: 300 } }
      ]
    },
    {
      id: generateId('region'),
      name: 'Frostbite Tundra',
      biome: 'frozen_tundra',
      description: 'Frozen wasteland with permafrost and ice formations.',
      coordinates: { x: 50, y: 50, width: 150, height: 120 },
      cities: [
        { id: generateId('city'), name: 'Frostgate', population: 5000, type: 'minor', coordinates: { x: 120, y: 100 } }
      ]
    }
  ];

  const mapData = {
    regions: mapRegions,
    biomes,
    boundaries: generateBoundaries(),
    scale: {
      pixelsPerKm: 0.5,
      worldWidth: 1000,
      worldHeight: 700
    }
  };

  return mapData;
}

function generateMapComponent(mapData) {
  console.log('CARTOGRAPHER: Generating React map component...');
  
  const component = `import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import mapData from '../../data/map-data.json';
import worldBible from '../../data/world-bible.json';

interface Region {
  id: string;
  name: string;
  biome: string;
  description: string;
  coordinates: { x: number; y: number; width: number; height: number };
  cities: Array<{ id: string; name: string; population: number; type: string; coordinates: { x: number; y: number } }>;
}

interface Biome {
  type: string;
  color: string;
  characteristics: string[];
}

export function InteractiveMap() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions: Region[] = mapData.regions;
  const biomes: Record<string, Biome> = useMemo(() => {
    const map: Record<string, Biome> = {};
    mapData.biomes.forEach((b: Biome) => { map[b.type] = b; });
    return map;
  }, []);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedRegion(null);
  };

  const getBiomeColor = (biomeType: string) => {
    return biomes[biomeType]?.color || '#2d2d3d';
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-void border border-white/10">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => handleZoom(0.25)}
          className="p-2 rounded-lg bg-charcoal border border-white/10 text-fog-light hover:text-gold hover:border-gold/50 transition-colors"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={() => handleZoom(-0.25)}
          className="p-2 rounded-lg bg-charcoal border border-white/10 text-fog-light hover:text-gold hover:border-gold/50 transition-colors"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-charcoal border border-white/10 text-fog-light hover:text-gold hover:border-gold/50 transition-colors"
        >
          <Maximize size={20} />
        </button>
      </div>

      {/* Map SVG */}
      <svg
        className="w-full h-full cursor-grab active:cursor-grabbing"
        viewBox="0 0 1000 700"
        style={{
          transform: \`translate(\${pan.x}px, \${pan.y}px) scale(\${zoom})\`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* World boundary */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="1000" height="700" fill="url(#grid)" />
        
        {/* Ocean/Void background */}
        <rect x="50" y="50" width="900" height="600" rx="20" fill="#0f0f1a" />

        {/* Regions */}
        {regions.map((region) => {
          const { x, y, width, height } = region.coordinates;
          const color = getBiomeColor(region.biome);
          const isSelected = selectedRegion?.id === region.id;
          const isHovered = hoveredRegion === region.id;

          return (
            <g key={region.id}>
              <motion.rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx="8"
                fill={color}
                stroke={isSelected ? '#c9a959' : isHovered ? '#c9a959' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                filter={isSelected ? 'url(#glow)' : undefined}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => setSelectedRegion(region)}
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Region label */}
              <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="14"
                fontFamily="Georgia, serif"
                className="pointer-events-none select-none"
              >
                {region.name}
              </text>

              {/* Cities */}
              {region.cities.map((city) => (
                <g
                  key={city.id}
                  transform={\`translate(\${city.coordinates.x}, \${city.coordinates.y})\`}
                  className="cursor-pointer"
                >
                  <circle
                    r={city.type === 'capital' ? 8 : city.type === 'major' ? 6 : 4}
                    fill={city.type === 'capital' ? '#c9a959' : '#8b6ab5'}
                    stroke="#fff"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  {city.type === 'capital' && (
                    <polygon points="0,-12 3,-4 12,-4 5,2 7,10 0,6 -7,10 -5,2 -12,-4 -3,-4" fill="#c9a959" />
                  )}
                </g>
              ))}
            </g>
          );
        })}

        {/* Map boundaries (mountain ranges, etc.) */}
        {mapData.boundaries.map((boundary, index) => (
          <path
            key={index}
            d={\`M \${boundary.map(([x, y]) => \`\${x},\${y}\`).join(' L ')}\`}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            strokeDasharray={index === 0 ? 'none' : '5,5'}
          />
        ))}
      </svg>

      {/* Region Info Panel */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 rounded-xl bg-charcoal/95 border border-white/10 backdrop-blur-md"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-display font-bold text-gold">{selectedRegion.name}</h3>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-fog hover:text-bone"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-fog-light mb-3">{selectedRegion.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-shadow text-fog">{selectedRegion.biome.replace('_', ' ')}</span>
            <span className="text-fog">{selectedRegion.cities.length} cities</span>
          </div>
          {selectedRegion.cities.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-fog mb-2">Major Settlements:</p>
              <div className="flex flex-wrap gap-1">
                {selectedRegion.cities.map(city => (
                  <span key={city.id} className="text-xs px-2 py-1 rounded bg-mystic/20 text-mystic-light">
                    {city.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Zoom indicator */}
      <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-charcoal/80 text-xs text-fog">
        Zoom: {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}
`;

  return component;
}

// Main execution
const worldBible = loadWorldBible();
const mapData = generateMapData(worldBible);

// Write map-data.json
writeFileSync(
  join(process.cwd(), 'data', 'map-data.json'),
  JSON.stringify(mapData, null, 2)
);
console.log('CARTOGRAPHER: Written map-data.json');

// Write React component
writeFileSync(
  join(process.cwd(), 'src', 'components', 'InteractiveMap.tsx'),
  generateMapComponent(mapData)
);
console.log('CARTOGRAPHER: Written InteractiveMap.tsx');

// Create done marker
writeFileSync(join(process.cwd(), 'data', '.cartographer.done'), new Date().toISOString());
console.log('CARTOGRAPHER: Map generation complete!');
