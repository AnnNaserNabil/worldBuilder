import { memo } from 'react';

/**
 * Vignette - Atmospheric overlay effect
 * Creates a subtle darkening at screen edges for depth
 * Matches GAME UI BIBLE §2 specifications
 */
export const Vignette = memo(function Vignette() {
  return (
    <div
      className="vignette-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        background: `
          radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 40%,
            rgba(10, 10, 15, 0.4) 70%,
            rgba(10, 10, 15, 0.8) 100%
          )
        `,
      }}
    />
  );
});
