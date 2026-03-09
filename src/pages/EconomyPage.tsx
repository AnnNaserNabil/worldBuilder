import { motion } from 'framer-motion';
import { EconomyDashboard } from '../components/EconomyDashboard';

export function EconomyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-display font-bold text-gradient-gold">
          Economy
        </h1>
        <p className="text-fog-light mt-2">
          Track resources, trade routes, and the flow of wealth across the realm.
        </p>
      </div>
      <EconomyDashboard />
    </motion.div>
  );
}
