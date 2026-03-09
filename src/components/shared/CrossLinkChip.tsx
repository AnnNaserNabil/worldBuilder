import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CrossLinkChipProps {
  href: string;
  label: string;
  icon?: ReactNode;
  variant?: 'gold' | 'mystic' | 'blood';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * CrossLinkChip - Navigation chip for cross-referencing content
 * Dark glass with gold border, hover lift effect
 * Matches GAME UI BIBLE §12 specifications
 */
export function CrossLinkChip({
  href,
  label,
  icon,
  variant = 'gold',
  size = 'md',
}: CrossLinkChipProps) {
  const variants = {
    gold: {
      border: 'rgba(201, 169, 89, 0.4)',
      bg: 'rgba(201, 169, 89, 0.1)',
      text: '#c9a959',
      hoverBg: 'rgba(201, 169, 89, 0.2)',
      glow: 'rgba(201, 169, 89, 0.3)',
    },
    mystic: {
      border: 'rgba(107, 76, 138, 0.4)',
      bg: 'rgba(107, 76, 138, 0.1)',
      text: '#8b6ab5',
      hoverBg: 'rgba(107, 76, 138, 0.2)',
      glow: 'rgba(107, 76, 138, 0.3)',
    },
    blood: {
      border: 'rgba(139, 21, 56, 0.4)',
      bg: 'rgba(139, 21, 56, 0.1)',
      text: '#a31d44',
      hoverBg: 'rgba(139, 21, 56, 0.2)',
      glow: 'rgba(139, 21, 56, 0.3)',
    },
  };

  const sizes = {
    sm: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.7rem',
      iconSize: 12,
    },
    md: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.75rem',
      iconSize: 14,
    },
    lg: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      iconSize: 16,
    },
  };

  const style = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <Link
      to={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        borderRadius: '9999px',
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.text,
        textDecoration: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = style.hoverBg;
        e.currentTarget.style.borderColor = style.text;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 4px 12px ${style.glow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = style.bg;
        e.currentTarget.style.borderColor = style.border;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
      
      <span style={{ fontWeight: 500 }}>{label}</span>
      
      <motion.span
        initial={{ x: -4, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <ArrowRight size={sizeStyle.iconSize} />
      </motion.span>
    </Link>
  );
}

/**
 * CrossLinkChipGroup - Container for multiple link chips
 */
export function CrossLinkChipGroup({
  children,
  wrap = true,
}: {
  children: ReactNode;
  wrap?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: '0.5rem',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}
