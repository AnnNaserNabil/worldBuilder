import { motion } from 'framer-motion';
import { TimelineVisualization } from '../components/TimelineVisualization';

export function TimelinePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-display font-bold text-gradient-gold">
          Timeline
        </h1>
        <p className="text-fog-light mt-2">
          Journey through the epochs of history, from the Age of Dawn to the Current Darkness.
        </p>
      </div>
      <TimelineVisualization />
    </motion.div>
  );
}
