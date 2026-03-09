import { motion } from 'framer-motion';
import { CharacterNetworkGraph } from '../components/CharacterNetworkGraph';

export function CharactersPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-display font-bold text-gradient-gold">
          Characters
        </h1>
        <p className="text-fog-light mt-2">
          Discover the souls of this realm and the relationships that bind them.
        </p>
      </div>
      <CharacterNetworkGraph />
    </motion.div>
  );
}
