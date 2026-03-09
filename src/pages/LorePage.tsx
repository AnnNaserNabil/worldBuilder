import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';
import { useWorldStore } from '../store';

export function LorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<'overview' | 'myth' | 'magic' | 'geography'>('overview');
  
  const worldName = useWorldStore((state) => state.worldName);
  const worldDescription = useWorldStore((state) => state.worldDescription);
  const creationMyth = useWorldStore((state) => state.creationMyth);
  const magicSystem = useWorldStore((state) => state.magicSystem);
  const mapBiomes = useWorldStore((state) => state.mapBiomes);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'myth', label: 'Creation Myth', icon: null },
    { id: 'magic', label: 'Magic System', icon: null },
    { id: 'geography', label: 'Geography', icon: null }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-display font-bold text-gradient-gold">
          Lore Library
        </h1>
        <p className="text-fog-light mt-2">
          The accumulated knowledge and legends of {worldName}.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-fog" size={20} />
        <input
          type="text"
          placeholder="Search the archives..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-charcoal border border-white/10 text-bone placeholder-fog focus:outline-none focus:border-gold/50"
        />
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-white/10 overflow-x-auto">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`px-4 py-3 flex items-center gap-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-fog hover:text-bone'
              }`}
            >
              {Icon && <Icon size={16} />}
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-2xl font-display font-bold text-gold mb-4">{worldName}</h2>
            <p className="text-fog-light text-lg leading-relaxed">{worldDescription}</p>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-charcoal border border-white/10">
                <h3 className="text-lg font-display font-semibold text-bone mb-3">Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {['Dark Fantasy', 'Moral Ambiguity', 'Ancient Evils', 'Forbidden Magic', 'Political Intrigue', 'Survival Horror'].map((theme) => (
                    <span key={theme} className="px-3 py-1 rounded-full bg-mystic/20 text-mystic-light text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-charcoal border border-white/10">
                <h3 className="text-lg font-display font-semibold text-bone mb-3">Quick Facts</h3>
                <ul className="space-y-2 text-fog-light">
                  <li>• {useWorldStore.getState().factions.length} major factions</li>
                  <li>• {useWorldStore.getState().mapRegions.length} known regions</li>
                  <li>• {magicSystem.schools.length} schools of magic</li>
                  <li>• {useWorldStore.getState().epochs.length} historical epochs</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'myth' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-charcoal border border-white/10">
              <h2 className="text-2xl font-display font-bold text-gold mb-4">{creationMyth.title}</h2>
              <p className="text-fog-light whitespace-pre-line leading-relaxed">{creationMyth.story}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold text-bone mb-4">Primordial Entities</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {creationMyth.entities.map((entity: any, i: number) => (
                  <motion.div
                    key={entity.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-void border border-white/10"
                  >
                    <h4 className="font-semibold text-mystic-light">{entity.name}</h4>
                    <p className="text-xs text-fog mt-1">{entity.domain}</p>
                    <p className="text-sm text-fog-light mt-2">{entity.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'magic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-display font-semibold text-bone mb-4">Sources of Magic</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {magicSystem.sources.map((source: any) => (
                  <div key={source.id} className="p-4 rounded-xl bg-charcoal border border-white/10">
                    <h4 className="font-semibold text-gold">{source.name}</h4>
                    <p className="text-sm text-fog-light mt-2">{source.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold text-bone mb-4">Schools of Magic</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {magicSystem.schools.map((school: any) => (
                  <div key={school.id} className="p-4 rounded-xl bg-void border border-white/10">
                    <h4 className="font-semibold text-mystic-light">{school.name}</h4>
                    <p className="text-sm text-fog-light mt-2">{school.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-blood/10 border border-blood/30">
              <h3 className="text-lg font-display font-semibold text-blood-light mb-3">Limitations</h3>
              <ul className="space-y-2 text-fog-light">
                {magicSystem.limitations.map((limit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blood mt-1">•</span>
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {activeSection === 'geography' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-display font-semibold text-bone">Biomes of {worldName}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mapBiomes.map((biome: any) => (
                <div key={biome.type} className="p-4 rounded-xl bg-charcoal border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: biome.color }} />
                    <h4 className="font-semibold text-bone capitalize">{biome.type.replace('_', ' ')}</h4>
                  </div>
                  <ul className="space-y-1">
                    {biome.characteristics.map((char: string, j: number) => (
                      <li key={j} className="text-sm text-fog-light">• {char}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
