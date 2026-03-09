import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map,
  Clock,
  Users,
  Shield,
  Coins,
  BookOpen,
  Home,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Tooltip } from './shared/Tooltip';

const navItems = [
  { path: '/', label: 'Home', icon: Home, description: 'Realm Overview' },
  { path: '/map', label: 'World Map', icon: Map, description: 'Explore Lands' },
  { path: '/timeline', label: 'Timeline', icon: Clock, description: 'History & Events' },
  { path: '/characters', label: 'Characters', icon: Users, description: 'Heroes & Villains' },
  { path: '/factions', label: 'Factions', icon: Shield, description: 'Guilds & Orders' },
  { path: '/economy', label: 'Economy', icon: Coins, description: 'Trade & Resources' },
  { path: '/lore', label: 'Lore Library', icon: BookOpen, description: 'Ancient Knowledge' },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'transparent',
    }}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          borderRadius: '0.5rem',
          background: 'rgba(26, 26, 36, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 169, 89, 0.3)',
          color: '#c9a959',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(201, 169, 89, 0.2)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 169, 89, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(26, 26, 36, 0.9)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 40,
              cursor: 'pointer',
            }}
            className="md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isHoveringSidebar || isSidebarOpen ? 280 : 80,
          x: isSidebarOpen ? 0 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        onMouseEnter={() => setIsHoveringSidebar(true)}
        onMouseLeave={() => setIsHoveringSidebar(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 50,
          background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, rgba(18, 18, 26, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(201, 169, 89, 0.15)',
          boxShadow: '4px 0 30px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        className="hidden md:flex"
      >
        {/* World Sigil */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Sigil Icon */}
          <motion.div
            animate={{
              rotate: isHoveringSidebar ? 360 : 0,
              scale: isHoveringSidebar ? 1.05 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(107, 76, 138, 0.3) 0%, rgba(201, 169, 89, 0.3) 100%)',
              border: '2px solid rgba(201, 169, 89, 0.4)',
              boxShadow: '0 0 30px rgba(107, 76, 138, 0.3), inset 0 0 20px rgba(201, 169, 89, 0.1)',
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles
              size={28}
              style={{ color: '#c9a959' }}
            />
          </motion.div>

          {/* Sigil Text - Only show when expanded */}
          <AnimatePresence>
            {(isHoveringSidebar || isSidebarOpen) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ textAlign: 'center' }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, #dcc076 0%, #c9a959 50%, #8f7a3d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.1em',
                  }}
                >
                  REALMS
                </h1>
                <p
                  style={{
                    margin: '0.25rem 0 0',
                    fontSize: '0.625rem',
                    color: '#6b7280',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  World Builder
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            padding: '1rem 0.75rem',
            overflowY: 'auto',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Tooltip
                key={item.path}
                content={
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, color: '#c9a959' }}>{item.label}</div>
                    <div style={{ fontSize: '0.65rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {item.description}
                    </div>
                  </div>
                }
                position="right"
                delay={200}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '0.75rem',
                    marginBottom: '0.375rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: active ? '1px solid rgba(201, 169, 89, 0.3)' : '1px solid transparent',
                    background: active
                      ? 'linear-gradient(135deg, rgba(201, 169, 89, 0.15) 0%, rgba(107, 76, 138, 0.1) 100%)'
                      : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  {/* Golden Trail Effect - Active State */}
                  {active && (
                    <motion.div
                      layoutId="nav-golden-trail"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        duration: 0.5,
                      }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '3px',
                        background: 'linear-gradient(180deg, #c9a959 0%, #dcc076 50%, #c9a959 100%)',
                        boxShadow: '0 0 10px rgba(201, 169, 89, 0.6), 0 0 20px rgba(201, 169, 89, 0.3)',
                        borderRadius: '0 2px 2px 0',
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '0.5rem',
                      background: active
                        ? 'linear-gradient(135deg, rgba(201, 169, 89, 0.2) 0%, rgba(107, 76, 138, 0.2) 100%)'
                        : 'rgba(255, 255, 255, 0.03)',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: active ? '#c9a959' : '#9ca3af',
                        transition: 'color 0.2s ease',
                      }}
                    />
                  </div>

                  {/* Label - Only show when expanded */}
                  <AnimatePresence>
                    {(isHoveringSidebar || isSidebarOpen) && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: active ? '#d4c4a8' : '#9ca3af',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          style={{
                            fontSize: '0.625rem',
                            color: '#6b7280',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.description}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Chevron for active item */}
                  {(isHoveringSidebar || isSidebarOpen) && active && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: 0.1 }}
                    >
                      <ChevronRight
                        size={16}
                        style={{ color: '#c9a959' }}
                      />
                    </motion.div>
                  )}
                </Link>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Section - Version Info */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <AnimatePresence>
            {(isHoveringSidebar || isSidebarOpen) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  textAlign: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  background: 'rgba(107, 76, 138, 0.1)',
                  border: '1px solid rgba(107, 76, 138, 0.2)',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.625rem',
                    color: '#6b7280',
                    letterSpacing: '0.1em',
                  }}
                >
                  DARK FANTASY EDITION
                </p>
                <p
                  style={{
                    margin: '0.25rem 0 0',
                    fontSize: '0.75rem',
                    color: '#8b6ab5',
                  }}
                >
                  v1.0.0
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '85%',
              maxWidth: '320px',
              height: '100vh',
              zIndex: 50,
              background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(18, 18, 26, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(201, 169, 89, 0.15)',
              boxShadow: '4px 0 30px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            className="md:hidden"
          >
            {/* Mobile Sigil */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(107, 76, 138, 0.3) 0%, rgba(201, 169, 89, 0.3) 100%)',
                  border: '2px solid rgba(201, 169, 89, 0.4)',
                  boxShadow: '0 0 20px rgba(107, 76, 138, 0.3)',
                }}
              >
                <Sparkles
                  size={24}
                  style={{ color: '#c9a959' }}
                />
              </div>
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, #dcc076 0%, #c9a959 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  World Builder
                </h1>
                <p
                  style={{
                    margin: '0.25rem 0 0',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                  }}
                >
                  Dark Fantasy Edition
                </p>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav
              style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
              }}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      border: active ? '1px solid rgba(201, 169, 89, 0.3)' : '1px solid transparent',
                      background: active
                        ? 'linear-gradient(135deg, rgba(201, 169, 89, 0.15) 0%, rgba(107, 76, 138, 0.1) 100%)'
                        : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '0.5rem',
                        background: active
                          ? 'linear-gradient(135deg, rgba(201, 169, 89, 0.2) 0%, rgba(107, 76, 138, 0.2) 100%)'
                          : 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: active ? '#c9a959' : '#9ca3af' }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: active ? '#d4c4a8' : '#9ca3af',
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          margin: '0.25rem 0 0',
                          fontSize: '0.75rem',
                          color: '#6b7280',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          marginLeft: '80px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="md:ml-20"
      >
        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: '2rem',
            paddingTop: '5rem', // Account for mobile menu button
          }}
        >
          {children}
        </div>

        {/* Footer */}
        <footer
          style={{
            padding: '1.5rem 2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(10, 10, 15, 0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: '#6b7280',
              }}
            >
              © 2026 World Builder Engine. All realms reserved.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: '#6b7280',
              }}
            >
              <span>Built with AI</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6b7280' }} />
              <span>Dark Fantasy Edition</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
