import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
  worldName: string;
  tagline: string;
}

export function LoadingScreen({ onComplete, worldName, tagline }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);
  const [typedName, setTypedName] = useState('');

  useEffect(() => {
    // Stage 1: Black screen (0-500ms)
    const timer1 = setTimeout(() => setStage(1), 500);

    // Stage 2: Sigil fades in (500ms-1500ms)
    const timer2 = setTimeout(() => setStage(2), 1500);

    // Stage 3: Type world name (1500ms-2800ms, 80ms per char)
    const timer3 = setTimeout(() => {
      let i = 0;
      const typing = setInterval(() => {
        setTypedName(worldName.slice(0, i + 1));
        i++;
        if (i >= worldName.length) {
          clearInterval(typing);
          setStage(3);
        }
      }, 80);
    }, 2800);

    // Stage 4: Tagline fades in (2800ms-3500ms)
    const timer4 = setTimeout(() => setStage(4), 3500);

    // Stage 5: Ready (4000ms)
    const timer5 = setTimeout(() => {
      localStorage.setItem('worldbuilder_visited', 'true');
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [worldName, onComplete]);

  const shouldShow = localStorage.getItem('worldbuilder_visited') !== 'true';

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 1, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-void"
      >
        {/* Particle burst on exit */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 2],
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 600
              }}
              transition={{ duration: 1.5, delay: 4 + Math.random() * 0.5 }}
              className="absolute left-1/2 top-1/2 w-1 h-1 bg-gold rounded-full"
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* World Sigil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: stage >= 1 ? 1 : 0,
              scale: stage >= 1 ? 1 : 0.5
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl bg-gradient-to-br from-gold via-mystic to-blood flex items-center justify-center shadow-2xl shadow-gold-glow">
              <span className="text-void font-display font-bold text-5xl md:text-6xl">
                {worldName.charAt(0)}
              </span>
            </div>
          </motion.div>

          {/* World Name (typing effect) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-display font-bold text-gold mb-4 min-h-[3rem] md:min-h-[5rem]">
              {typedName}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1 h-8 md:h-12 ml-1 bg-gold align-middle"
              />
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: stage >= 3 ? 1 : 0,
              y: stage >= 3 ? 0 : 10
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-bone italic font-serif mb-8"
          >
            {tagline}
          </motion.p>

          {/* Begin Journey Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: stage >= 4 ? 1 : 0,
              y: stage >= 4 ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-8 py-3 border-2 border-gold text-gold font-display text-sm tracking-widest uppercase rounded-lg hover:bg-gold hover:text-void transition-all shadow-lg shadow-gold-glow"
          >
            Begin Your Journey
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
