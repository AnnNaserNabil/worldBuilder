import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Map, Clock, Users, Shield, Coins, BookOpen } from 'lucide-react';
import { useWorldStore } from '../store';

export function HomePage() {
  const worldName = useWorldStore((state) => state.worldName);
  const worldDescription = useWorldStore((state) => state.worldDescription);
  const factions = useWorldStore((state) => state.factions);
  const characters = useWorldStore((state) => state.characters);
  const mapRegions = useWorldStore((state) => state.mapRegions);
  const timelineEvents = useWorldStore((state) => state.timelineEvents);
  const resources = useWorldStore((state) => state.resources);

  const navItems = [
    { path: '/map', label: 'World Map', desc: 'Explore interactive regions', icon: Map, color: 'from-green-600 to-emerald-800' },
    { path: '/timeline', label: 'Timeline', desc: 'Journey through history', icon: Clock, color: 'from-purple-600 to-indigo-800' },
    { path: '/characters', label: 'Characters', desc: 'Meet the realm\'s souls', icon: Users, color: 'from-blue-600 to-cyan-800' },
    { path: '/factions', label: 'Factions', desc: 'Discover powers at play', icon: Shield, color: 'from-red-600 to-rose-800' },
    { path: '/economy', label: 'Economy', desc: 'Track trade and wealth', icon: Coins, color: 'from-yellow-600 to-amber-800' },
    { path: '/lore', label: 'Lore Library', desc: 'Read myths and legends', icon: BookOpen, color: 'from-violet-600 to-purple-800' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-mystic to-gold flex items-center justify-center shadow-lg shadow-mystic/30">
            <span className="text-void font-bold text-3xl">W</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold mb-4"
        >
          <span className="text-gradient-gold">Welcome to</span>
          <br />
          <span className="text-gradient-mystic">{worldName}</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-fog-light max-w-3xl mx-auto mt-6 leading-relaxed"
        >
          {worldDescription}
        </motion.p>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Regions', value: mapRegions.length, color: 'text-green-400' },
          { label: 'Factions', value: factions.length, color: 'text-red-400' },
          { label: 'Characters', value: characters.length, color: 'text-blue-400' },
          { label: 'Events', value: timelineEvents.length, color: 'text-purple-400' },
          { label: 'Resources', value: resources.length, color: 'text-yellow-400' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-4 rounded-xl bg-charcoal border border-white/10 text-center"
          >
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-fog mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Navigation Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link
                to={item.path}
                className="group block p-6 rounded-xl bg-charcoal border border-white/10 hover:border-gold/50 transition-all card-hover"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-gold mb-2">{item.label}</h3>
                <p className="text-fog-light">{item.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </section>

      {/* Generation Status */}
      <section className="p-6 rounded-xl bg-charcoal/50 border border-white/10">
        <h2 className="text-2xl font-display font-bold text-bone mb-4">
          World Generation Status
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'World Bible', status: 'complete' },
            { label: 'Map Data', status: 'complete' },
            { label: 'Timeline', status: 'complete' },
            { label: 'Characters', status: 'complete' },
            { label: 'Economy', status: 'complete' },
            { label: 'Frontend', status: 'in_progress' }
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-void/50">
              <span className="text-fog-light">{item.label}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === 'complete' 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-yellow-900/30 text-yellow-400'
              }`}>
                {item.status === 'complete' ? '✓ COMPLETE' : '⋯ IN PROGRESS'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
