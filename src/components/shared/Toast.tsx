import { useState, type ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { type ToastType, type ToastMessage, ToastContext } from './types';

/**
 * Toast Provider - Global toast notification system
 * Manages toast queue and rendering
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = {
      id,
      duration: 5000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after duration
    if (newToast.duration) {
      const timeoutId = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '400px',
        }}
        aria-live="polite"
        aria-label="Notifications"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: ToastMessage;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: {
      border: 'rgba(34, 197, 94, 0.4)',
      icon: '#22c55e',
      glow: 'rgba(34, 197, 94, 0.2)',
    },
    error: {
      border: 'rgba(239, 68, 68, 0.4)',
      icon: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.2)',
    },
    warning: {
      border: 'rgba(245, 158, 11, 0.4)',
      icon: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.2)',
    },
    info: {
      border: 'rgba(59, 130, 246, 0.4)',
      icon: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.2)',
    },
  };

  const Icon = icons[toast.type];
  const color = colors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="glass-panel"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: `1px solid ${color.border}`,
        boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${color.glow}`,
        cursor: 'pointer',
        minWidth: '280px',
      }}
      onClick={onClose}
      role="alert"
    >
      <Icon
        size={20}
        style={{ color: color.icon, flexShrink: 0 }}
      />
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#d4c4a8',
          }}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p
            style={{
              margin: '0.25rem 0 0',
              fontSize: '0.75rem',
              color: '#9ca3af',
            }}
          >
            {toast.message}
          </p>
        )}
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem',
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#d4c4a8')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

/**
 * Toast - Individual toast notification component
 * For use with external state management
 */
export function Toast({
  type = 'info',
  title,
  message,
  onClose,
}: {
  type?: ToastType;
  title: string;
  message?: string;
  onClose?: () => void;
}) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: {
      border: 'rgba(34, 197, 94, 0.4)',
      icon: '#22c55e',
      glow: 'rgba(34, 197, 94, 0.2)',
    },
    error: {
      border: 'rgba(239, 68, 68, 0.4)',
      icon: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.2)',
    },
    warning: {
      border: 'rgba(245, 158, 11, 0.4)',
      icon: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.2)',
    },
    info: {
      border: 'rgba(59, 130, 246, 0.4)',
      icon: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.2)',
    },
  };

  const Icon = icons[type];
  const color = colors[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="glass-panel"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: `1px solid ${color.border}`,
        boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${color.glow}`,
        maxWidth: '400px',
      }}
      role="alert"
    >
      <Icon
        size={20}
        style={{ color: color.icon, flexShrink: 0 }}
      />
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#d4c4a8',
          }}
        >
          {title}
        </p>
        {message && (
          <p
            style={{
              margin: '0.25rem 0 0',
              fontSize: '0.75rem',
              color: '#9ca3af',
            }}
          >
            {message}
          </p>
        )}
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#d4c4a8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
}
