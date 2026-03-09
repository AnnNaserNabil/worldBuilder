# Task Master Configuration

## Project: Autonomous World-Builder Engine — Director's Cut

### Project Name
**Misthold: The Living Realm**

### Description
A cinematic, AAA-game-quality web application that generates and visualizes a complete fictional dark fantasy world with interactive maps, character networks, historical timelines, factions, economy, and lore.

### AI Provider Configuration
Using built-in task orchestration system with specialized agents:
- LORE_SMITH (World Content)
- CARTOGRAPHER (Map & Geography)
- CHRONICLER (History & Timeline)
- CHARACTER_WEAVER (NPCs & Factions)
- ECONOMY_ORACLE (Trade & Resources)
- FRONTEND_ARTISAN (UI/UX)
- QA_SENTINEL (Testing & Validation)
- INTEGRATOR (Assembly & Sync)

### Git Repository
- Remote: https://github.com/AnnNaserNabil/worldBuilder.git
- Branch: master
- Status: ✅ Initialized and published

### Project Structure
```
worldBuilder/
├── agents/                 # AI agent scripts
├── data/                   # Generated JSON world data
├── src/
│   ├── components/         # React components
│   ├── pages/              # Page components (7 pages)
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript types
│   └── utils/              # Helper functions
├── tests/                  # Test suite
├── WORLD_CONSTITUTION.md   # Design rules and schemas
├── ARCHITECTURE.md         # System architecture
├── README.md               # Project documentation
└── FINAL_REPORT.md         # Completion report
```

### Next Steps
1. ✅ Project initialized
2. ✅ Git repository configured
3. ✅ Basic structure created
4. 🔄 Ready to parse requirements and execute tasks

---

## Task Execution Protocol

### Self-Check Protocol (Run After EVERY Task)
- [ ] Does output match JSON schema in WORLD_CONSTITUTION.md?
- [ ] Does component render without console errors?
- [ ] Are all references (faction ID, character ID, location ID) resolvable?
- [ ] Are cross-links to related world entities complete?
- [ ] Does visual match GAME UI BIBLE specifications?
- [ ] Tested on mobile (375px) AND desktop (1440px)?
- [ ] Are animations GPU-accelerated (transform/opacity only)?
- [ ] No placeholder text exists?
- [ ] Ran lint and test after change?
- [ ] Committed with meaningful message?

### Operating Rules
1. COMMIT AFTER EVERY PHASE
2. READ BEFORE WRITE
3. TEST AFTER EVERY COMPONENT
4. NO PLACEHOLDER CONTENT
5. JSON SCHEMA CONSISTENCY
6. FIX BUILD ERRORS IMMEDIATELY
7. SELF-CHECK EVERY TASK
8. TRACK ALL TASKS WITH TODOS
9. RUN TEST SUITE EVERY 10 FILE CHANGES
10. INTEGRATOR DECIDES CONFLICTS
11. THE WORLD MUST BE ALIVE (interconnected entities)
12. MOBILE IS NOT AN AFTERTHOUGHT
13. ZERO DANGLING REFERENCES
14. MEANINGFUL ANIMATIONS ONLY
15. KEYBOARD NAVIGABLE EVERYTHING
