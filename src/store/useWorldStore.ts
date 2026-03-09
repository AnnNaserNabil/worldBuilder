import { create } from 'zustand';
import worldBibleData from '../../data/world-bible.json';
import mapData from '../../data/map-data.json';
import timelineData from '../../data/timeline.json';
import characterData from '../../data/characters.json';
import economyData from '../../data/economy.json';

// World Bible types
interface Faction {
  id: string;
  name: string;
  description: string;
  goals: string[];
  territory: string[];
  symbol: string;
  alignment: string;
  power: number;
}

interface MagicSource {
  id: string;
  name: string;
  description: string;
}

interface MagicSchool {
  id: string;
  name: string;
  description: string;
}

interface MagicSystem {
  sources: MagicSource[];
  schools: MagicSchool[];
  limitations: string[];
}

interface Entity {
  id: string;
  name: string;
  domain: string;
  description: string;
}

interface CreationMyth {
  title: string;
  story: string;
  entities: Entity[];
}

// Map types
interface Coordinates {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface MapCity {
  id: string;
  name: string;
  population: number;
  type: string;
  coordinates: Coordinates;
}

interface Region {
  id: string;
  name: string;
  biome: string;
  description: string;
  coordinates: Coordinates;
  cities: MapCity[];
}

interface Biome {
  type: string;
  color: string;
  characteristics: string[];
}

// Economy City type (different from MapCity)
interface EconomyCity {
  id: string;
  name: string;
  production: string[];
  consumption: string[];
  wealth: number;
  population: number;
}

// Timeline types
interface Epoch {
  id: string;
  name: string;
  startYear: number;
  endYear?: number | null;
  description: string;
}

interface TimelineEvent {
  id: string;
  epoch: string;
  year: number;
  title: string;
  description: string;
  significance: string;
}

// Character types
interface CharacterAttributes {
  strength: number;
  intelligence: number;
  charisma: number;
  wisdom: number;
  magic: number;
}

interface CharacterRelationship {
  targetId: string;
  targetName: string;
  type: string;
  description: string;
  strength: number;
}

interface Character {
  id: string;
  name: string;
  title: string;
  faction: string;
  factionName: string;
  role: string;
  description: string;
  attributes: CharacterAttributes;
  relationships: CharacterRelationship[];
}

interface CharacterFaction {
  id: string;
  name: string;
  members: string[];
  influence: number;
}

// Economy types
interface Resource {
  id: string;
  name: string;
  type: string;
  description: string;
  baseValue: number;
  regions: string[];
  rarity: string;
}

interface TradeRoute {
  id: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  goods: string[];
  volume: number;
  danger: number;
  description: string;
}

interface Market {
  resource: string;
  basePrice: number;
  volatility: number;
  trend: string;
}

// World State interface
interface WorldState {
  // World Bible
  worldName: string;
  worldDescription: string;
  factions: Faction[];
  magicSystem: MagicSystem;
  creationMyth: CreationMyth;

  // Map
  mapRegions: Region[];
  mapBiomes: Biome[];

  // Timeline
  epochs: Epoch[];
  timelineEvents: TimelineEvent[];

  // Characters
  characters: Character[];
  characterFactions: CharacterFaction[];

  // Economy
  resources: Resource[];
  cities: EconomyCity[];
  tradeRoutes: TradeRoute[];
  markets: Market[];

  // UI State
  isLoading: boolean;
  activePage: string;
  searchQuery: string;

  // Actions
  setActivePage: (page: string) => void;
  setSearchQuery: (query: string) => void;
  getFactionById: (id: string) => Faction | null;
  getCharacterById: (id: string) => Character | null;
  getRegionById: (id: string) => Region | null;
}

export const useWorldStore = create<WorldState>((set, get) => ({
  // Initialize from JSON data
  worldName: worldBibleData.overview.name,
  worldDescription: worldBibleData.overview.description,
  factions: worldBibleData.factions,
  magicSystem: worldBibleData.magicSystem,
  creationMyth: worldBibleData.creationMyth,
  
  mapRegions: mapData.regions,
  mapBiomes: mapData.biomes,
  
  epochs: timelineData.epochs,
  timelineEvents: timelineData.events,
  
  characters: characterData.characters,
  characterFactions: characterData.factions,
  
  resources: economyData.resources,
  cities: economyData.cities,
  tradeRoutes: economyData.tradeRoutes,
  markets: economyData.markets,
  
  // UI State
  isLoading: false,
  activePage: '/',
  searchQuery: '',
  
  // Actions
  setActivePage: (page) => set({ activePage: page }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFactionById: (id) => {
    const { factions } = get();
    return factions.find(f => f.id === id) || null;
  },
  
  getCharacterById: (id) => {
    const { characters } = get();
    return characters.find(c => c.id === id) || null;
  },
  
  getRegionById: (id) => {
    const { mapRegions } = get();
    return mapRegions.find(r => r.id === id) || null;
  }
}));
