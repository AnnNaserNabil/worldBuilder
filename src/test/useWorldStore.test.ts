import { describe, it, expect, beforeEach } from 'vitest';
import { useWorldStore } from '../store/useWorldStore';

describe('useWorldStore', () => {
  beforeEach(() => {
    // Reset UI state before each test
    useWorldStore.setState({
      activePage: '/',
      searchQuery: '',
      isLoading: false,
    });
  });

  it('initializes with world name from data', () => {
    const state = useWorldStore.getState();
    expect(state.worldName).toBeTruthy();
  });

  it('initializes with world description', () => {
    const state = useWorldStore.getState();
    expect(state.worldDescription).toBeTruthy();
  });

  it('has factions loaded', () => {
    const state = useWorldStore.getState();
    expect(state.factions.length).toBeGreaterThan(0);
  });

  it('has characters loaded', () => {
    const state = useWorldStore.getState();
    expect(state.characters.length).toBeGreaterThan(0);
  });

  it('has map regions loaded', () => {
    const state = useWorldStore.getState();
    expect(state.mapRegions.length).toBeGreaterThan(0);
  });

  it('has timeline events loaded', () => {
    const state = useWorldStore.getState();
    expect(state.timelineEvents.length).toBeGreaterThan(0);
  });

  it('has resources loaded', () => {
    const state = useWorldStore.getState();
    expect(state.resources.length).toBeGreaterThan(0);
  });

  it('has trade routes loaded', () => {
    const state = useWorldStore.getState();
    expect(state.tradeRoutes.length).toBeGreaterThan(0);
  });

  it('sets active page', () => {
    useWorldStore.getState().setActivePage('/map');
    const state = useWorldStore.getState();
    expect(state.activePage).toBe('/map');
  });

  it('sets search query', () => {
    useWorldStore.getState().setSearchQuery('test query');
    const state = useWorldStore.getState();
    expect(state.searchQuery).toBe('test query');
  });

  it('gets faction by id', () => {
    const state = useWorldStore.getState();
    if (state.factions.length > 0) {
      const faction = state.factions[0];
      const result = useWorldStore.getState().getFactionById(faction.id);
      expect(result).toEqual(faction);
    }
  });

  it('returns null for unknown faction id', () => {
    const result = useWorldStore.getState().getFactionById('unknown-id');
    expect(result).toBeNull();
  });

  it('gets character by id', () => {
    const state = useWorldStore.getState();
    if (state.characters.length > 0) {
      const character = state.characters[0];
      const result = useWorldStore.getState().getCharacterById(character.id);
      expect(result).toEqual(character);
    }
  });

  it('gets region by id', () => {
    const state = useWorldStore.getState();
    if (state.mapRegions.length > 0) {
      const region = state.mapRegions[0];
      const result = useWorldStore.getState().getRegionById(region.id);
      expect(result).toEqual(region);
    }
  });
});
