import { motion } from 'framer-motion';
import { useWorldStore } from '../store';

export function FactionsPage() {
  const factions = useWorldStore((state) => state.factions);
  
  const alignmentColors: Record<string, string> = {
    benevolent: 'bg-green-900/30 text-green-400',
    neutral: 'bg-gray-700/30 text-gray-400',
    malevolent: 'bg-red-900/30 text-red-400',
    ambiguous: 'bg-purple-900/30 text-purple-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-display font-bold text-gradient-gold">
          Factions
        </h1>
        <p className="text-fog-light mt-2">
          The powers that shape the world through ambition, faith, and force.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {factions.map((faction, i) => (
          <motion.div
            key={faction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-charcoal border border-white/10 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-display font-bold text-gold">{faction.name}</h3>
                <p className="text-sm text-fog mt-1">Power: {faction.power}/100</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${alignmentColors[faction.alignment]}`}>
                {faction.alignment.toUpperCase()}
              </span>
            </div>
            <p className="text-fog-light mb-4">{faction.description}</p>
            <div className="mb-4">
              <p className="text-xs text-fog mb-2">Goals:</p>
              <div className="flex flex-wrap gap-1">
                {faction.goals.map((goal: string, j: number) => (
                  <span key={j} className="px-2 py-1 rounded bg-mystic/20 text-mystic-light text-xs">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-fog mb-2">Territory:</p>
              <div className="flex flex-wrap gap-1">
                {faction.territory.map((region: string, j: number) => (
                  <span key={j} className="px-2 py-1 rounded bg-shadow text-fog text-xs">
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
