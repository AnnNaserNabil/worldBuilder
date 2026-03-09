/**
 * CHARACTER_WEAVER Agent
 * Generates characters with relationships and creates network graph component
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function loadWorldBible() {
  try {
    const data = readFileSync(join(process.cwd(), 'data', 'world-bible.json'), 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

const firstNames = ['Aldric', 'Morgana', 'Theron', 'Lilith', 'Kael', 'Seraphina', 'Darius', 'Nyssa', 'Viktor', 'Ravenna', 'Malcolm', 'Isolde', 'Gareth', 'Vesper', 'Lucian', 'Celeste', 'Damien', 'Evangeline', 'Felix', 'Guinevere'];
const lastNames = ['Shadowbane', 'Nightfall', 'Ironheart', 'Bloodworth', 'Voidwalker', 'Mistral', 'Stormborn', 'Frost', 'Ember', 'Darkwood', 'Ravencrest', 'Doomhammer', 'Whisperwind', 'Graveborn', 'Soulreaper'];
const titles = ['the Bold', 'the Cruel', 'the Wise', 'the Damned', 'the Pure', 'the Broken', 'the Eternal', 'the Forgotten', 'the Cursed', 'the Blessed', 'of the Void', 'of Shadows', 'the Unseen', 'the Redeemed'];
const roles = ['Necromancer', 'Knight', 'Rogue', 'Mage', 'Priest', 'Assassin', 'Warlord', 'Scholar', 'Merchant', 'Spy', 'Oracle', 'Blacksmith', 'Hunter', 'Pirate', 'Noble'];

function generateCharacters(worldBible) {
  console.log('CHARACTER_WEAVER: Generating characters...');
  
  const factions = worldBible?.factions || [];
  const factionNames = factions.length > 0 
    ? factions.map(f => ({ id: f.id, name: f.name }))
    : [
        { id: 'faction-1', name: 'Order of the Void' },
        { id: 'faction-2', name: 'Brotherhood of Shadow' },
        { id: 'faction-3', name: 'The Crimson Covenant' },
        { id: 'faction-4', name: 'The Iron Legion' },
        { id: 'faction-5', name: 'Circle of Whispers' }
      ];

  const characters = [];
  const numCharacters = randomRange(15, 25);

  for (let i = 0; i < numCharacters; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const title = randomElement(titles);
    const faction = randomElement(factionNames);
    
    characters.push({
      id: generateId('char'),
      name: `${firstName} ${lastName}`,
      title: `${firstName} ${title}`,
      faction: faction.id,
      factionName: faction.name,
      role: randomElement(roles),
      description: `A ${randomElement(['seasoned', 'notorious', 'mysterious', 'feared', 'respected', 'enigmatic'])} ${randomElement(roles).toLowerCase()} ${randomElement(['whose deeds are whispered in taverns', 'who walks between light and shadow', 'bound by ancient oaths', 'seeking redemption for past sins', 'with secrets that could shake kingdoms'])}.`,
      attributes: {
        strength: randomRange(1, 10),
        intelligence: randomRange(1, 10),
        charisma: randomRange(1, 10),
        wisdom: randomRange(1, 10),
        magic: randomRange(1, 10)
      },
      relationships: [],
      imageUrl: undefined
    });
  }

  // Generate relationships
  characters.forEach((char, index) => {
    const numRelationships = randomRange(1, 4);
    const potentialTargets = characters.filter((_, i) => i !== index);
    
    for (let r = 0; r < numRelationships && potentialTargets.length > 0; r++) {
      const targetIndex = randomRange(0, potentialTargets.length - 1);
      const target = potentialTargets.splice(targetIndex, 1)[0];
      
      const relationshipTypes = [
        { type: 'ally', description: 'Fights alongside in battle' },
        { type: 'enemy', description: 'Sworn adversaries' },
        { type: 'rival', description: 'Competes for the same goals' },
        { type: 'mentor', description: 'Taught them valuable skills' },
        { type: 'family', description: 'Blood relation' },
        { type: 'lover', description: 'Romantic involvement' },
        { type: 'servant', description: 'Serves loyally' },
        { type: 'master', description: 'Commands their loyalty' }
      ];
      
      const relType = randomElement(relationshipTypes);
      
      char.relationships.push({
        targetId: target.id,
        targetName: target.name,
        type: relType.type,
        description: relType.description,
        strength: randomRange(1, 10)
      });
    }
  });

  // Generate faction summary
  const factionData = factionNames.map(faction => ({
    id: faction.id,
    name: faction.name,
    members: characters.filter(c => c.faction === faction.id).map(c => c.id),
    influence: randomRange(20, 100)
  }));

  return { characters, factions: factionData };
}

function generateCharacterGraphComponent() {
  console.log('CHARACTER_WEAVER: Generating character graph component...');
  
  const component = `import { useState, useMemo, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Search, Filter, Users } from 'lucide-react';
import characterData from '../../data/characters.json';

interface Character {
  id: string;
  name: string;
  title: string;
  faction: string;
  factionName: string;
  role: string;
  description: string;
  attributes: {
    strength: number;
    intelligence: number;
    charisma: number;
    wisdom: number;
    magic: number;
  };
  relationships: Array<{
    targetId: string;
    targetName: string;
    type: string;
    description: string;
    strength: number;
  }>;
}

const relationshipColors: Record<string, string> = {
  ally: '#4ade80',
  enemy: '#f87171',
  rival: '#fbbf24',
  mentor: '#60a5fa',
  family: '#f472b6',
  lover: '#ec4899',
  servant: '#a78bfa',
  master: '#818cf8'
};

const factionColors: Record<string, string> = {
  'Order of the Void': '#6b4c8a',
  'Brotherhood of Shadow': '#1f2937',
  'The Crimson Covenant': '#8b1538',
  'The Iron Legion': '#4b5563',
  'Circle of Whispers': '#065f46'
};

export function CharacterNetworkGraph() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFaction, setFilterFaction] = useState<string>('all');
  const [filterRelationship, setFilterRelationship] = useState<string>('all');
  const fgRef = useRef<any>();

  const characters: Character[] = characterData.characters;
  const factions = characterData.factions;

  const graphData = useMemo(() => {
    let filteredChars = characters;
    
    if (searchTerm) {
      filteredChars = filteredChars.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterFaction !== 'all') {
      filteredChars = filteredChars.filter(c => c.faction === filterFaction);
    }

    const filteredIds = new Set(filteredChars.map(c => c.id));

    const nodes = filteredChars.map(char => ({
      id: char.id,
      name: char.name,
      val: 10 + (char.relationships.length * 2),
      faction: char.factionName,
      role: char.role,
      color: factionColors[char.factionName] || '#6b7280'
    }));

    const links: any[] = [];
    filteredChars.forEach(char => {
      char.relationships.forEach(rel => {
        if (filteredIds.has(rel.targetId)) {
          if (filterRelationship === 'all' || rel.type === filterRelationship) {
            links.push({
              source: char.id,
              target: rel.targetId,
              type: rel.type,
              strength: rel.strength,
              color: relationshipColors[rel.type] || '#9ca3af'
            });
          }
        }
      });
    });

    return { nodes, links };
  }, [characters, searchTerm, filterFaction, filterRelationship]);

  const handleNodeClick = (node: any) => {
    const character = characters.find(c => c.id === node.id);
    if (character) {
      setSelectedCharacter(character);
      if (fgRef.current) {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(2, 2000);
      }
    }
  };

  const handleBackgroundClick = () => {
    setSelectedCharacter(null);
    if (fgRef.current) {
      fgRef.current.zoom(1, 1000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fog" size={18} />
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-charcoal border border-white/10 text-bone placeholder-fog focus:outline-none focus:border-gold/50"
          />
        </div>
        
        <select
          value={filterFaction}
          onChange={(e) => setFilterFaction(e.target.value)}
          className="px-4 py-2 rounded-lg bg-charcoal border border-white/10 text-bone focus:outline-none focus:border-gold/50"
        >
          <option value="all">All Factions</option>
          {factions.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        <select
          value={filterRelationship}
          onChange={(e) => setFilterRelationship(e.target.value)}
          className="px-4 py-2 rounded-lg bg-charcoal border border-white/10 text-bone focus:outline-none focus:border-gold/50"
        >
          <option value="all">All Relationships</option>
          {Object.keys(relationshipColors).map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 text-sm text-fog">
          <Users size={16} />
          <span>{graphData.nodes.length} characters</span>
        </div>
      </div>

      {/* Graph */}
      <div className="relative h-[600px] rounded-xl overflow-hidden bg-void border border-white/10">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="name"
          nodeColor={(node: any) => node.color}
          nodeRelSize={6}
          linkColor={(link: any) => link.color}
          linkWidth={(link: any) => Math.max(1, link.strength / 3)}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelLen={0.8}
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
          backgroundColor="transparent"
          nodeCanvasObject={(node: any, ctx: any) => {
            const label = node.name;
            const size = node.val;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
            ctx.fillStyle = node.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.fillStyle = '#fff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, node.x, node.y + size + 12);
          }}
        />

        {/* Legend */}
        <div className="absolute top-4 left-4 p-3 rounded-lg bg-charcoal/90 border border-white/10 text-xs">
          <p className="font-semibold text-gold mb-2">Relationships</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(relationshipColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-0.5" style={{ backgroundColor: color }} />
                <span className="text-fog-light capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Character Detail Panel */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm" onClick={() => setSelectedCharacter(null)}>
          <div className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-xl bg-charcoal border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-gold">{selectedCharacter.name}</h3>
                <p className="text-mystic-light">{selectedCharacter.title}</p>
                <p className="text-sm text-fog">{selectedCharacter.role} • {selectedCharacter.factionName}</p>
              </div>
              <button onClick={() => setSelectedCharacter(null)} className="text-fog-light hover:text-bone text-2xl">×</button>
            </div>
            
            <p className="text-fog-light mb-6">{selectedCharacter.description}</p>
            
            {/* Attributes */}
            <div className="mb-6">
              <h4 className="font-semibold text-bone mb-3">Attributes</h4>
              <div className="grid grid-cols-5 gap-3">
                {Object.entries(selectedCharacter.attributes).map(([attr, value]) => (
                  <div key={attr} className="text-center">
                    <div className="text-2xl font-bold text-gold">{value}</div>
                    <div className="text-xs text-fog capitalize">{attr}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Relationships */}
            <div>
              <h4 className="font-semibold text-bone mb-3">Relationships ({selectedCharacter.relationships.length})</h4>
              <div className="space-y-2">
                {selectedCharacter.relationships.map((rel, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-shadow/50">
                    <span className="text-bone">{rel.targetName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-fog">{rel.description}</span>
                      <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: relationshipColors[rel.type], color: '#fff' }}>
                        {rel.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

  return component;
}

// Main execution
const worldBible = loadWorldBible();
const characterData = generateCharacters(worldBible);

// Write characters.json
writeFileSync(
  join(process.cwd(), 'data', 'characters.json'),
  JSON.stringify(characterData, null, 2)
);
console.log('CHARACTER_WEAVER: Written characters.json');

// Write React component
writeFileSync(
  join(process.cwd(), 'src', 'components', 'CharacterNetworkGraph.tsx'),
  generateCharacterGraphComponent()
);
console.log('CHARACTER_WEAVER: Written CharacterNetworkGraph.tsx');

// Create done marker
writeFileSync(join(process.cwd(), 'data', '.character_weaver.done'), new Date().toISOString());
console.log('CHARACTER_WEAVER: Character generation complete!');
