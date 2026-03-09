import { create } from 'zustand';
import worldBibleData from '../../data/world-bible.json';
import mapData from '../../data/map-data.json';
import timelineData from '../../data/timeline.json';
import characterData from '../../data/characters.json';
import economyData from '../../data/economy.json';

interface WorldState {
  // World Bible
  worldName: string;
  worldDescription: string;
  factions: any[];
  magicSystem: any;
  creationMyth: any;
  
  // Map
  mapRegions: any[];
  mapBiomes: any[];
  
  // Timeline
  epochs: any[];
  timelineEvents: any[];
  
  // Characters
  characters: any[];
  characterFactions: any[];
  
  // Economy
  resources: any[];
  cities: any[];
  tradeRoutes: any[];
  markets: any[];
  
  // UI State
  isLoading: boolean;
  activePage: string;
  searchQuery: string;
  
  // Actions
  setActivePage: (page: string) => void;
  setSearchQuery: (query: string) => void;
  getFactionById: (id: string) => any | null;
  getCharacterById: (id: string) => any | null;
  getRegionById: (id: string) => any | null;
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
