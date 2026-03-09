import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  Clock, 
  Users, 
  Shield, 
  Coins, 
  BookOpen,
  Home
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/map', label: 'World Map', icon: Map },
  { path: '/timeline', label: 'Timeline', icon: Clock },
  { path: '/characters', label: 'Characters', icon: Users },
  { path: '/factions', label: 'Factions', icon: Shield },
  { path: '/economy', label: 'Economy', icon: Coins },
  { path: '/lore', label: 'Lore Library', icon: BookOpen },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-void/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mystic to-gold flex items-center justify-center">
                <span className="text-void font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-gradient-gold">
                  World Builder
                </h1>
                <p className="text-xs text-fog">AI-Generated Realm</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative px-4 py-2 rounded-lg text-sm font-medium
                      transition-colors duration-200
                      ${isActive 
                        ? 'text-gold bg-gold/10' 
                        : 'text-fog-light hover:text-bone hover:bg-white/5'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={16} />
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-gold/10 -z-10"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-fog-light hover:text-bone">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden border-t border-white/10 overflow-x-auto">
          <div className="flex px-4 py-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium
                    flex items-center gap-1.5
                    ${isActive 
                      ? 'text-gold bg-gold/10' 
                      : 'text-fog-light hover:text-bone'
                    }
                  `}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-fog">
              © 2026 World Builder Engine. All realms reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-fog">
              <span>Built with AI</span>
              <span className="w-1 h-1 rounded-full bg-fog" />
              <span>Dark Fantasy Edition</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
