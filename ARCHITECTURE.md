# Architecture Documentation

## System Overview

The World Builder Engine follows a multi-agent architecture where specialized AI agents generate different aspects of the world, which are then consumed by a React frontend.

```
┌─────────────────────────────────────────────────────────────────┐
│                      AI Agent Layer                              │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────┤
│ LORE_SMITH  │CARTOGRAPHER │ CHRONICLER  │CHARACTER_   │ECONOMY_ │
│             │             │             │WEAVER       │ORACLE   │
└──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴────┬────┘
       │             │             │             │           │
       ▼             ▼             ▼             ▼           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer (JSON)                           │
│  world-bible.json  map-data.json  timeline.json  characters.json│
│  economy.json                                                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    React Frontend Layer                          │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  Zustand Store  │   Components    │           Pages             │
│  (State Mgmt)   │  (Reusable UI)  │  (7 Route-based Views)      │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

## Component Architecture

### Pages (src/pages/)

| Page | Route | Component | Data Source |
|------|-------|-----------|-------------|
| HomePage | `/` | HomePage | Zustand (all) |
| MapPage | `/map` | InteractiveMap | map-data.json |
| TimelinePage | `/timeline` | TimelineVisualization | timeline.json |
| CharactersPage | `/characters` | CharacterNetworkGraph | characters.json |
| FactionsPage | `/factions` | FactionsPage | Zustand (factions) |
| EconomyPage | `/economy` | EconomyDashboard | economy.json |
| LorePage | `/lore` | LorePage | Zustand (bible) |

### Core Components (src/components/)

1. **Layout** - Main application shell with navigation
2. **InteractiveMap** - SVG-based world map with D3.js
3. **TimelineVisualization** - Scrollable timeline with epochs
4. **CharacterNetworkGraph** - Force-directed graph using react-force-graph-2d
5. **EconomyDashboard** - Tabbed dashboard for economy data

### State Management (src/store/)

Zustand store provides:
- Centralized access to all world data
- Computed selectors for derived data
- UI state management (active page, search query)

```typescript
interface WorldState {
  // Data from JSON files
  worldName: string;
  factions: Faction[];
  characters: Character[];
  // ...
  
  // UI State
  activePage: string;
  searchQuery: string;
  
  // Actions
  setActivePage: (page: string) => void;
  setSearchQuery: (query: string) => void;
}
```

## Data Flow

```
Agent Generation → JSON Files → Import → Zustand Store → Components
                                              ↓
                                         User Interaction
                                              ↓
                                      State Updates → Re-render
```

## Agent Communication

Agents communicate through:
1. **Shared Data Files** - JSON files in `/data` directory
2. **Status Markers** - `.done` files indicating completion
3. **World Bible** - Primary source that other agents can reference

## Styling Architecture

### Tailwind Configuration
- Custom theme in `src/index.css` using `@theme` directive
- Dark fantasy color palette defined as CSS variables
- Custom animations for fade-in, slide-up, pulse-glow effects

### Component Styling
- Utility-first Tailwind classes
- Custom utility classes in index.css:
  - `.card-hover` - Hover lift effect
  - `.text-gradient-gold` - Gold gradient text
  - `.border-gradient` - Gradient border effect

## Performance Considerations

1. **Code Splitting** - Routes are lazy-loadable
2. **Memoization** - useMemo for expensive computations
3. **Virtual Scrolling** - Force graph handles large node counts
4. **SVG Optimization** - Map uses efficient SVG rendering

## Security

- No user authentication required
- All data is static JSON (no injection risks)
- Content Security Policy compatible

## Build Process

```
npm run build
    ↓
tsc (TypeScript compilation)
    ↓
vite build (bundling)
    ↓
dist/ (production assets)
```

## Deployment

The application is a static SPA that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static file host

Required: Serve `dist/` directory with SPA routing support.

## Extensibility

### Adding New Agents
1. Create agent script in `agents/`
2. Generate JSON data file
3. Add types to `src/types/`
4. Update Zustand store
5. Create components/pages

### Adding New Visualizations
1. Create component in `src/components/`
2. Import data from JSON or store
3. Use Framer Motion for animations
4. Follow dark fantasy theme

## Testing Strategy

- TypeScript provides compile-time type safety
- Build process catches import errors
- Manual testing of all 7 pages
- Visual regression through consistent theming
