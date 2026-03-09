import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import timelineData from '../../data/timeline.json';

interface Epoch {
  id: string;
  name: string;
  startYear: number;
  endYear: number | null;
  description: string;
}

interface TimelineEvent {
  id: string;
  epoch: string;
  year: number;
  title: string;
  description: string;
  significance: 'minor' | 'moderate' | 'major' | 'epoch-defining';
}

const significanceColors = {
  minor: 'border-fog bg-fog/10',
  moderate: 'border-mystic bg-mystic/10',
  major: 'border-gold bg-gold/10',
  'epoch-defining': 'border-blood bg-blood/10'
};

const significanceIcons = {
  minor: '●',
  moderate: '◆',
  major: '★',
  'epoch-defining': '✦'
};

export function TimelineVisualization() {
  const [expandedEpoch, setExpandedEpoch] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const epochs: Epoch[] = timelineData.epochs;
  const events: TimelineEvent[] = timelineData.events as TimelineEvent[];

  const eventsByEpoch = useMemo(() => {
    const map: Record<string, TimelineEvent[]> = {};
    epochs.forEach(epoch => { map[epoch.id] = []; });
    events.forEach(event => {
      if (map[event.epoch]) {
        map[event.epoch].push(event);
      }
    });
    // Sort events by year within each epoch
    Object.keys(map).forEach(key => {
      map[key].sort((a, b) => a.year - b.year);
    });
    return map;
  }, [epochs, events]);

  const filteredEpochs = useMemo(() => {
    if (filter === 'all') return epochs;
    return epochs.filter(epoch => 
      eventsByEpoch[epoch.id]?.some(e => e.significance === filter)
    );
  }, [epochs, eventsByEpoch, filter]);

  const formatYear = (year: number) => {
    if (year < 0) return `${Math.abs(year)} B.E.`;
    return `${year} A.E.`;
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2">
        {['all', 'minor', 'moderate', 'major', 'epoch-defining'].map((sig) => (
          <button
            key={sig}
            onClick={() => setFilter(sig)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === sig
                ? 'bg-gold text-void'
                : 'bg-charcoal border border-white/10 text-fog-light hover:border-gold/50'
            }`}
          >
            {sig === 'all' ? 'All Events' : sig.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Central timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mystic via-gold to-mystic" />

        <div className="space-y-8">
          {filteredEpochs.map((epoch, index) => {
            const epochEvents = eventsByEpoch[epoch.id] || [];
            const isExpanded = expandedEpoch === epoch.id;
            const visibleEvents = isExpanded ? epochEvents : epochEvents.slice(0, 3);

            return (
              <motion.div
                key={epoch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-20"
              >
                {/* Epoch marker */}
                <div className="absolute left-6 top-0 w-5 h-5 rounded-full bg-gradient-to-br from-mystic to-gold border-2 border-void shadow-lg shadow-mystic/30" />

                {/* Epoch header */}
                <div
                  className="p-4 rounded-xl bg-charcoal border border-white/10 cursor-pointer hover:border-mystic/50 transition-colors"
                  onClick={() => setExpandedEpoch(isExpanded ? null : epoch.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-bold text-gold">{epoch.name}</h3>
                      <p className="text-sm text-fog mt-1">
                        {formatYear(epoch.startYear)} - {epoch.endYear ? formatYear(epoch.endYear) : 'Present'}
                      </p>
                    </div>
                    <button className="text-fog-light hover:text-gold">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  <p className="text-fog-light mt-3">{epoch.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-fog">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {epochEvents.length} events
                    </span>
                    <span className="px-2 py-1 rounded bg-shadow">
                      {epochEvents.filter(e => e.significance === 'epoch-defining').length} epoch-defining
                    </span>
                  </div>
                </div>

                {/* Events */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3"
                    >
                      {visibleEvents.map((event, eventIndex) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: eventIndex * 0.05 }}
                          className={`relative pl-6 pr-4 py-3 rounded-lg border-l-2 cursor-pointer transition-colors ${significanceColors[event.significance]}`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <span className="absolute left-0 top-3 w-3 h-3 -translate-x-[22px] rounded-full bg-current opacity-60" />
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-fog">{formatYear(event.year)}</span>
                                <span className="text-xs">{significanceIcons[event.significance]}</span>
                              </div>
                              <h4 className="font-semibold text-bone mt-1">{event.title}</h4>
                              <p className="text-sm text-fog-light mt-1 line-clamp-2">{event.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {epochEvents.length > 3 && (
                        <button
                          onClick={() => setExpandedEpoch(null)}
                          className="text-sm text-mystic-light hover:text-gold"
                        >
                          Show less...
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="max-w-lg w-full p-6 rounded-xl bg-charcoal border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs text-fog">{formatYear(selectedEvent.year)}</span>
                <h3 className="text-xl font-display font-bold text-gold mt-1">{selectedEvent.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-fog-light hover:text-bone text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-fog-light mb-4">{selectedEvent.description}</p>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${significanceColors[selectedEvent.significance]}`}>
                {selectedEvent.significance.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
