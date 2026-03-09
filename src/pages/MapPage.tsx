import { motion } from 'framer-motion';
import { InteractiveMap } from '../components/InteractiveMap';
import { useWorldStore } from '../store';

export function MapPage() {
  const worldName = useWorldStore((state) => state.worldName);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-display font-bold text-gradient-gold">
          World Map
        </h1>
        <p className="text-fog-light mt-2">
          Explore the lands of {worldName}, from dark forests to frozen tundras.
        </p>
      </div>
      <InteractiveMap />
    </motion.div>
  );
}
