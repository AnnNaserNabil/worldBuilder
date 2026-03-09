/**
 * CHRONICLER Agent
 * Generates timeline data and creates timeline visualization component
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function loadTimelineData() {
  try {
    const data = readFileSync(join(process.cwd(), 'data', 'timeline.json'), 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.log('CHRONICLER: No timeline.json found, generating new data');
    return null;
  }
}

function generateTimelineComponent(timelineData) {
  console.log('CHRONICLER: Generating timeline component...');
  
  const component = `import { useState, useMemo } from 'react';
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
  const events: TimelineEvent[] = timelineData.events;

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
    if (year < 0) return \`\${Math.abs(year)} B.E.\`;
    return \`\${year} A.E.\`;
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2">
        {['all', 'minor', 'moderate', 'major', 'epoch-defining'].map((sig) => (
          <button
            key={sig}
            onClick={() => setFilter(sig)}
            className={\`px-4 py-2 rounded-lg text-sm font-medium transition-colors \${
              filter === sig
                ? 'bg-gold text-void'
                : 'bg-charcoal border border-white/10 text-fog-light hover:border-gold/50'
            }\`}
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
                          className={\`relative pl-6 pr-4 py-3 rounded-lg border-l-2 cursor-pointer transition-colors \${significanceColors[event.significance]}\`}
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
              <span className={\`px-3 py-1 rounded-full text-xs font-medium \${significanceColors[selectedEvent.significance]}\`}>
                {selectedEvent.significance.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
`;

  return component;
}

// Main execution
let timelineData = loadTimelineData();

if (!timelineData) {
  console.log('CHRONICLER: Generating timeline data from scratch...');
  // Generate basic timeline if none exists
  timelineData = {
    epochs: [
      { id: 'epoch-0', name: 'The Age of Dawn', startYear: -5000, endYear: -4000, description: 'The first light after the Shattering.' },
      { id: 'epoch-1', name: 'The Era of Shadows', startYear: -4000, endYear: -3000, description: 'Darkness spread across the lands.' },
      { id: 'epoch-2', name: 'The Time of Sundering', startYear: -3000, endYear: -2000, description: 'Great conflicts tore the world apart.' },
      { id: 'epoch-3', name: 'The Age of Ash', startYear: -2000, endYear: -500, description: 'Civilization rebuilt from the ashes.' },
      { id: 'epoch-4', name: 'The Current Darkness', startYear: -500, endYear: null, description: 'The present age of uncertainty.' }
    ],
    events: []
  };
  
  // Generate events
  const eventTemplates = [
    { title: 'The {adj} {noun}', significance: 'major' },
    { title: 'Fall of {place}', significance: 'epoch-defining' },
    { title: 'The {noun} War', significance: 'major' },
    { title: 'Discovery of {artifact}', significance: 'moderate' },
    { title: 'Birth of {person}', significance: 'moderate' },
    { title: 'The Great {event}', significance: 'major' }
  ];
  
  const adjectives = ['Crimson', 'Eternal', 'Silent', 'Bitter', 'Hollow', 'Frozen', 'Cursed', 'Sacred'];
  const nouns = ['Betrayal', 'Awakening', 'Convergence', 'Purge', 'Exodus', 'Reckoning', 'Schism'];
  const places = ['Blackhold', 'Ravenspire', 'The Voidwood', 'Ironpeak', 'Bloodmarsh'];
  const artifacts = ['The Shadow Crown', 'The Void Stone', 'The Blood Chalice', 'The Star Orb'];
  const persons = ['The First Necromancer', 'The Shadow King', 'The Void Prophet', 'The Blood Saint'];
  const eventTypes = ['Darkening', 'Sundering', 'Convergence', 'Awakening'];
  
  for (let i = 0; i < 25; i++) {
    const template = randomElement(eventTemplates);
    let title = template.title;
    title = title.replace('{adj}', randomElement(adjectives));
    title = title.replace('{noun}', randomElement(nouns));
    title = title.replace('{place}', randomElement(places));
    title = title.replace('{artifact}', randomElement(artifacts));
    title = title.replace('{person}', randomElement(persons));
    title = title.replace('{event}', randomElement(eventTypes));
    
    timelineData.events.push({
      id: generateId('event'),
      epoch: `epoch-${randomRange(0, 4)}`,
      year: randomRange(-4500, 0),
      title,
      description: `A ${template.significance} event that shaped the course of history.`,
      significance: template.significance
    });
  }
  
  timelineData.events.sort((a, b) => a.year - b.year);
  
  writeFileSync(
    join(process.cwd(), 'data', 'timeline.json'),
    JSON.stringify(timelineData, null, 2)
  );
  console.log('CHRONICLER: Written timeline.json');
}

// Generate component
writeFileSync(
  join(process.cwd(), 'src', 'components', 'TimelineVisualization.tsx'),
  generateTimelineComponent(timelineData)
);
console.log('CHRONICLER: Written TimelineVisualization.tsx');

// Create done marker
writeFileSync(join(process.cwd(), 'data', '.chronicler.done'), new Date().toISOString());
console.log('CHRONICLER: Timeline generation complete!');
