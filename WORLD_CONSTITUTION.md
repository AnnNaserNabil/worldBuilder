# World Constitution - Autonomous World-Builder Engine

## Project Vision

Build a complete AI-generated fictional world with interactive visualizations, featuring:
- **Lore & Mythology**: Creation myths, history, magic systems
- **Geography**: Interactive SVG map with regions, biomes, cities
- **Characters**: Network graph of relationships and factions
- **Timeline**: Historical events visualization
- **Economy**: Trade routes, resources, production chains

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State Management | Zustand |
| Routing | React Router DOM |
| Map Visualization | D3.js + SVG |
| Network Graph | react-force-graph-2d |
| Icons | Lucide React |

## Aesthetic Direction

**Theme**: Dark Fantasy
- Color Palette: Deep purples, charcoal grays, blood reds, gold accents
- Typography: Serif headings, clean sans-serif body
- Visual Elements: Ornate borders, subtle gradients, atmospheric effects

## Multi-Agent System Architecture

### Agent Roles

| Agent | Responsibility | Output |
|-------|---------------|--------|
| **LORE_SMITH** | World bible creation | `world-bible.json` |
| **CARTOGRAPHER** | Map generation | `map-data.json`, SVG components |
| **CHRONICLER** | Timeline events | `timeline.json` |
| **CHARACTER_WEAVER** | Characters & relationships | `characters.json` |
| **ECONOMY_ORACLE** | Economy simulation | `economy.json` |
| **FRONTEND_ARTISAN** | UI components & pages | React components |
| **QA_SENTINEL** | Testing & validation | Test reports |
| **INTEGRATOR** | Final assembly | Production build |

## Data Schema

### World Bible (`data/world-bible.json`)
```json
{
  "overview": { "name", "description", "themes" },
  "creationMyth": { "story", "entities" },
  "geography": { "regions", "biomes", "climate" },
  "magicSystem": { "sources", "schools", "limitations" },
  "factions": [{ "id", "name", "goals", "territory" }],
  "epochs": [{ "name", "startYear", "endYear", "events" }]
}
```

### Map Data (`data/map-data.json`)
```json
{
  "regions": [{ "id", "name", "biome", "coordinates", "cities" }],
  "biomes": [{ "type", "color", "characteristics" }],
  "boundaries": [[coordinates]],
  "scale": { "pixelsPerKm", "worldWidth", "worldHeight" }
}
```

### Characters (`data/characters.json`)
```json
{
  "characters": [{
    "id", "name", "faction", "role",
    "attributes": {}, "relationships": [{ "targetId", "type" }]
  }],
  "factions": [{ "id", "name", "members", "influence" }]
}
```

### Timeline (`data/timeline.json`)
```json
{
  "epochs": [{ "name", "start", "end", "description" }],
  "events": [{
    "id", "epoch", "year", "title", "description", "significance"
  }]
}
```

### Economy (`data/economy.json`)
```json
{
  "resources": [{ "id", "name", "type", "regions" }],
  "tradeRoutes": [{ "from", "to", "goods", "volume" }],
  "cities": [{ "id", "production", "consumption", "wealth" }],
  "markets": [{ "resource", "basePrice", "volatility" }]
}
```

## Page Structure

| Page | Route | Components | Data Source |
|------|-------|------------|-------------|
| Home | `/` | Hero, Overview cards | world-bible |
| World Map | `/map` | InteractiveMap, RegionTooltip | map-data |
| Timeline | `/timeline` | TimelineViz, EventModal | timeline |
| Characters | `/characters` | ForceGraph, CharacterCard | characters |
| Factions | `/factions` | FactionList, DetailPanel | world-bible |
| Economy | `/economy` | ResourceGrid, TradeFlow | economy |
| Lore Library | `/lore` | SearchableIndex, ArticleView | world-bible |

## Folder Structure

```
worldBuilder/
├── agents/           # AI agent scripts
│   ├── loreSmith.js
│   ├── cartographer.js
│   ├── chronicler.js
│   ├── characterWeaver.js
│   └── economyOracle.js
├── data/             # Generated world data
│   ├── world-bible.json
│   ├── map-data.json
│   ├── characters.json
│   ├── timeline.json
│   └── economy.json
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── store/        # Zustand store
│   ├── utils/        # Helper functions
│   └── types/        # TypeScript types
├── public/           # Static assets
└── WORLD_CONSTITUTION.md
```

## Development Phases

### Phase 0: Bootstrap
- Project scaffolding
- Dependencies installation
- Folder structure
- Design documentation

### Phase 1: World Genesis
- LORE_SMITH agent implementation
- Generate world-bible.json

### Phase 2: Parallel Construction
- CARTOGRAPHER → Map data + component
- CHRONICLER → Timeline data + component
- CHARACTER_WEAVER → Characters + graph
- ECONOMY_ORACLE → Economy data + dashboard

### Phase 3: Frontend Assembly
- Zustand store implementation
- 7 pages construction
- Shared components
- Animations & responsive design

### Phase 4: QA Loop
- TypeScript compilation
- ESLint validation
- Functional testing
- Bug fixes
- Performance optimization

### Phase 5: Polish & Finalization
- Documentation (README, ARCHITECTURE)
- Final report
- Deployment preparation

## Success Criteria

1. ✅ All 7 pages functional and visually polished
2. ✅ Interactive map with zoom/pan/tooltips
3. ✅ Force-directed character relationship graph
4. ✅ Scrollable timeline with event details
5. ✅ Economy dashboard with resource flows
6. ✅ Responsive design (mobile, tablet, desktop)
7. ✅ Smooth animations throughout
8. ✅ No TypeScript errors or ESLint warnings
9. ✅ Production build succeeds
10. ✅ Complete documentation

## Agent Communication Protocol

Agents communicate through:
1. **Shared Data Files**: JSON files in `/data` directory
2. **Status Files**: `.done` markers after completion
3. **Error Logs**: `.error` files with failure details

## Quality Standards

- **TypeScript**: Strict mode, no `any` types
- **Components**: Functional with hooks, proper typing
- **Styling**: Tailwind utility classes, consistent spacing
- **Performance**: Lazy loading, memoization where needed
- **Accessibility**: Semantic HTML, ARIA labels

---

*This document serves as the constitution for the world-builder engine. All agents and developers must adhere to these specifications.*
