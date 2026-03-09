import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: number;
}

/**
 * Tooltip - Dark glass tooltip with gold border
 * Appears after configurable delay (default 200ms)
 * GPU-accelerated animations using Framer Motion
 */
export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  maxWidth = 250,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (showTimeout) {
        clearTimeout(showTimeout);
      }
    };
  }, [showTimeout]);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setShowTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
    }
    setShowTimeout(null);
    setIsVisible(false);
  };

  const getPositionStyles = () => {
    const gap = 8;
    
    switch (position) {
      case 'top':
        return {
          bottom: `calc(100% + ${gap}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          top: `calc(100% + ${gap}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          right: `calc(100% + ${gap}px)`,
          top: '50%',
          transform: 'translateY(-50%)',
        };
      case 'right':
        return {
          left: `calc(100% + ${gap}px)`,
          top: '50%',
          transform: 'translateY(-50%)',
        };
    }
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="glass-dark"
            style={{
              position: 'absolute',
              ...getPositionStyles(),
              maxWidth,
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(201, 169, 89, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              zIndex: 70,
              pointerEvents: 'none',
              fontSize: '0.75rem',
              color: '#d4c4a8',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
            role="tooltip"
          >
            {content}
            
            {/* Arrow indicator */}
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: 'rgba(26, 26, 36, 0.9)',
                border: '1px solid rgba(201, 169, 89, 0.3)',
                transform: 'rotate(45deg)',
                ...(position === 'top' && {
                  bottom: '-5px',
                  left: '50%',
                  marginLeft: '-4px',
                  borderRight: 'none',
                  borderTop: 'none',
                }),
                ...(position === 'bottom' && {
                  top: '-5px',
                  left: '50%',
                  marginLeft: '-4px',
                  borderLeft: 'none',
                  borderBottom: 'none',
                }),
                ...(position === 'left' && {
                  right: '-5px',
                  top: '50%',
                  marginTop: '-4px',
                  borderLeft: 'none',
                  borderTop: 'none',
                }),
                ...(position === 'right' && {
                  left: '-5px',
                  top: '50%',
                  marginTop: '-4px',
                  borderRight: 'none',
                  borderBottom: 'none',
                }),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
