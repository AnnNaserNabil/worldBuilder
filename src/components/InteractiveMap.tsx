import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import mapData from '../../data/map-data.json';

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
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
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
                  transform={`translate(${city.coordinates.x}, ${city.coordinates.y})`}
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
            d={`M ${boundary.map(([x, y]) => `${x},${y}`).join(' L ')}`}
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
