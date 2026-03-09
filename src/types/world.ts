// World Data Types

export interface WorldOverview {
  name: string;
  description: string;
  themes: string[];
  tagline: string;
}

export interface CreationMyth {
  title: string;
  story: string;
  entities: MythEntity[];
}

export interface MythEntity {
  id: string;
  name: string;
  domain: string;
  description: string;
}

export interface Region {
  id: string;
  name: string;
  biome: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  cities: City[];
}

export interface City {
  id: string;
  name: string;
  population: number;
  type: 'capital' | 'major' | 'minor' | 'outpost';
  coordinates: { x: number; y: number };
}

export interface Biome {
  type: string;
  color: string;
  characteristics: string[];
}

export interface MagicSystem {
  sources: MagicSource[];
  schools: MagicSchool[];
  limitations: string[];
}

export interface MagicSource {
  id: string;
  name: string;
  description: string;
}

export interface MagicSchool {
  id: string;
  name: string;
  description: string;
  associatedSource: string;
}

export interface Faction {
  id: string;
  name: string;
  description: string;
  goals: string[];
  territory: string[];
  symbol: string;
  alignment: 'benevolent' | 'neutral' | 'malevolent' | 'ambiguous';
  power: number;
}

export interface Epoch {
  id: string;
  name: string;
  startYear: number;
  endYear: number | null;
  description: string;
}

export interface TimelineEvent {
  id: string;
  epoch: string;
  year: number;
  title: string;
  description: string;
  significance: 'minor' | 'moderate' | 'major' | 'epoch-defining';
  involvedFactions?: string[];
  involvedCharacters?: string[];
}

export interface Character {
  id: string;
  name: string;
  title: string;
  faction: string;
  role: string;
  description: string;
  attributes: CharacterAttributes;
  relationships: Relationship[];
  imageUrl?: string;
}

export interface CharacterAttributes {
  strength: number;
  intelligence: number;
  charisma: number;
  wisdom: number;
  magic: number;
}

export interface Relationship {
  targetId: string;
  targetName: string;
  type: 'ally' | 'enemy' | 'lover' | 'family' | 'mentor' | 'rival' | 'servant' | 'master';
  description: string;
  strength: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'material' | 'magical' | 'agricultural' | 'crafted';
  description: string;
  baseValue: number;
  regions: string[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

export interface TradeRoute {
  id: string;
  from: string;
  to: string;
  goods: string[];
  volume: number;
  danger: number;
  description: string;
}

export interface EconomyData {
  resources: Resource[];
  tradeRoutes: TradeRoute[];
  cities: EconomyCity[];
  markets: Market[];
}

export interface EconomyCity {
  id: string;
  name: string;
  production: string[];
  consumption: string[];
  wealth: number;
  population: number;
}

export interface Market {
  resource: string;
  basePrice: number;
  volatility: number;
  trend: 'rising' | 'stable' | 'falling';
}

// World Bible Type
export interface WorldBible {
  overview: WorldOverview;
  creationMyth: CreationMyth;
  geography: {
    regions: Region[];
    biomes: Biome[];
  };
  magicSystem: MagicSystem;
  factions: Faction[];
  epochs: Epoch[];
}

// Timeline Data Type
export interface TimelineData {
  epochs: Epoch[];
  events: TimelineEvent[];
}

// Character Data Type
export interface CharacterData {
  characters: Character[];
  factions: {
    id: string;
    name: string;
    members: string[];
    influence: number;
  }[];
}

// Map Data Type
export interface MapData {
  regions: Region[];
  biomes: Biome[];
  boundaries: number[][][];
  scale: {
    pixelsPerKm: number;
    worldWidth: number;
    worldHeight: number;
  };
}
