import { useState, useMemo, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d';
import { Search, Users } from 'lucide-react';
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

interface Faction {
  id: string;
  name: string;
  members: string[];
  influence: number;
}

interface GraphNode {
  id: string;
  name: string;
  val: number;
  faction: string;
  role: string;
  color: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: string;
  strength: number;
  color: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
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
  const fgRef = useRef<ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>> | undefined>(undefined);

  const characters: Character[] = characterData.characters as Character[];
  const factionsList: Faction[] = (characterData as unknown as { characters: Character[]; factions?: Faction[] }).factions || [];

  const graphData: GraphData = useMemo(() => {
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

    const links: GraphLink[] = [];
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

  const handleNodeClick = (node: GraphNode) => {
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
          {factionsList.map((f: Faction) => (
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
          nodeColor={(node: GraphNode) => node.color}
          nodeRelSize={6}
          linkColor={(link: GraphLink) => link.color}
          linkWidth={(link: GraphLink) => Math.max(1, link.strength / 3)}
          linkDirectionalArrowLength={4}
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
          backgroundColor="transparent"
          nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D) => {
            const label = node.name;
            const size = node.val;
            const x = node.x ?? 0;
            const y = node.y ?? 0;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fillStyle = node.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x, y + size + 12);
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
