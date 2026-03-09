import { type ReactNode, type ElementType } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Search, Plus } from 'lucide-react';

interface EmptyStateProps {
  icon?: ElementType<{ size: number; style?: React.CSSProperties }>;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: 'default' | 'search' | 'create';
}

/**
 * EmptyState - Placeholder for empty content areas
 * Glass-morphism card with atmospheric styling
 * Matches GAME UI BIBLE §12 specifications
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
}: EmptyStateProps) {
  const defaultIcons: Record<string, ElementType<{ size: number; style?: React.CSSProperties }>> = {
    default: Inbox,
    search: Search,
    create: Plus,
  };

  const Icon = icon || defaultIcons[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        borderRadius: '1rem',
        textAlign: 'center',
        maxWidth: '480px',
        margin: '0 auto',
        border: '1px solid rgba(201, 169, 89, 0.15)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Icon with glow effect */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(201, 169, 89, 0.1)',
          border: '1px solid rgba(201, 169, 89, 0.2)',
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        {/* Glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201, 169, 89, 0.2) 0%, transparent 70%)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        />
        
        <Icon
          size={28}
          style={{
            color: '#c9a959',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>

      {/* Title */}
      <h3
        style={{
          margin: '0 0 0.5rem',
          fontSize: '1.25rem',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          color: '#d4c4a8',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          style={{
            margin: '0 0 1.5rem',
            fontSize: '0.875rem',
            color: '#6b7280',
            lineHeight: 1.6,
            maxWidth: '360px',
          }}
        >
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {action}
        </div>
      )}
    </motion.div>
  );
}

/**
 * EmptyStateList - For empty list states
 */
export function EmptyStateList({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <Inbox
          size={32}
          style={{ color: '#6b7280' }}
        />
      </div>
      
      <h4
        style={{
          margin: '0 0 0.5rem',
          fontSize: '1rem',
          fontWeight: 500,
          color: '#9ca3af',
        }}
      >
        {title}
      </h4>
      
      {description && (
        <p
          style={{
            margin: '0 0 1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          {description}
        </p>
      )}
      
      {action}
    </motion.div>
  );
}
