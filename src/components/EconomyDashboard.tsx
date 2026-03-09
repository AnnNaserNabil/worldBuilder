import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Coins, Package, Route, Building } from 'lucide-react';
import economyData from '../../data/economy.json';

interface Resource {
  id: string;
  name: string;
  type: string;
  description: string;
  baseValue: number;
  regions: string[];
  rarity: string;
}

interface City {
  id: string;
  name: string;
  production: string[];
  consumption: string[];
  wealth: number;
  population: number;
}

interface TradeRoute {
  id: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  goods: string[];
  volume: number;
  danger: number;
  description: string;
}

interface Market {
  resource: string;
  basePrice: number;
  volatility: number;
  trend: string;
}

const rarityColors: Record<string, string> = {
  common: 'bg-fog/20 text-fog',
  uncommon: 'bg-mystic/20 text-mystic-light',
  rare: 'bg-gold/20 text-gold',
  legendary: 'bg-blood/20 text-blood-light'
};

const trendIcons: Record<string, any> = {
  rising: TrendingUp,
  stable: Minus,
  falling: TrendingDown
};

const trendColors: Record<string, string> = {
  rising: 'text-green-400',
  stable: 'text-fog',
  falling: 'text-red-400'
};

export function EconomyDashboard() {
  const [activeTab, setActiveTab] = useState<'resources' | 'cities' | 'trade' | 'market'>('resources');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const resources: Resource[] = economyData.resources;
  const cities: City[] = economyData.cities;
  const tradeRoutes: TradeRoute[] = economyData.tradeRoutes;
  const markets: Market[] = economyData.markets;

  const stats = useMemo(() => ({
    totalResources: resources.length,
    totalCities: cities.length,
    totalRoutes: tradeRoutes.length,
    totalWealth: cities.reduce((sum, c) => sum + c.wealth, 0),
    avgDanger: Math.round(tradeRoutes.reduce((sum, r) => sum + r.danger, 0) / tradeRoutes.length)
  }), [resources, cities, tradeRoutes]);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const getDangerColor = (danger: number) => {
    if (danger <= 3) return 'text-green-400';
    if (danger <= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-charcoal border border-white/10">
          <div className="flex items-center gap-2 text-fog mb-1">
            <Package size={16} />
            <span className="text-xs">Resources</span>
          </div>
          <div className="text-2xl font-bold text-gold">{stats.totalResources}</div>
        </div>
        <div className="p-4 rounded-xl bg-charcoal border border-white/10">
          <div className="flex items-center gap-2 text-fog mb-1">
            <Building size={16} />
            <span className="text-xs">Cities</span>
          </div>
          <div className="text-2xl font-bold text-gold">{stats.totalCities}</div>
        </div>
        <div className="p-4 rounded-xl bg-charcoal border border-white/10">
          <div className="flex items-center gap-2 text-fog mb-1">
            <Route size={16} />
            <span className="text-xs">Trade Routes</span>
          </div>
          <div className="text-2xl font-bold text-gold">{stats.totalRoutes}</div>
        </div>
        <div className="p-4 rounded-xl bg-charcoal border border-white/10">
          <div className="flex items-center gap-2 text-fog mb-1">
            <Coins size={16} />
            <span className="text-xs">Total Wealth</span>
          </div>
          <div className="text-2xl font-bold text-gold">{formatNumber(stats.totalWealth)}</div>
        </div>
        <div className="p-4 rounded-xl bg-charcoal border border-white/10">
          <div className="flex items-center gap-2 text-fog mb-1">
            <span className="text-xs">Avg Danger</span>
          </div>
          <div className={`text-2xl font-bold ${getDangerColor(stats.avgDanger)}`}>{stats.avgDanger}/10</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {[
          { id: 'resources', label: 'Resources', icon: Package },
          { id: 'cities', label: 'Cities', icon: Building },
          { id: 'trade', label: 'Trade Routes', icon: Route },
          { id: 'market', label: 'Market', icon: Coins }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 flex items-center gap-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-fog hover:text-bone'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'resources' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedResource(resource)}
                className="p-4 rounded-xl bg-charcoal border border-white/10 cursor-pointer hover:border-gold/50 transition-colors card-hover"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-bone">{resource.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs ${rarityColors[resource.rarity]}`}>
                    {resource.rarity}
                  </span>
                </div>
                <p className="text-xs text-fog mb-3">{resource.type}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gold">{resource.baseValue} gold</span>
                  <span className="text-xs text-fog">{resource.regions.length} regions</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'cities' && (
          <div className="space-y-4">
            {cities.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-charcoal border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-display font-bold text-gold">{city.name}</h3>
                    <p className="text-sm text-fog">Population: {formatNumber(city.population)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-mystic-light">{formatNumber(city.wealth)}</div>
                    <div className="text-xs text-fog">wealth</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-fog mb-2">Production</p>
                    <div className="flex flex-wrap gap-1">
                      {city.production.map(res => (
                        <span key={res} className="px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs">{res}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-fog mb-2">Consumption</p>
                    <div className="flex flex-wrap gap-1">
                      {city.consumption.map(res => (
                        <span key={res} className="px-2 py-1 rounded bg-red-900/30 text-red-400 text-xs">{res}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'trade' && (
          <div className="space-y-4">
            {tradeRoutes.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-charcoal border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-bone">{route.fromName}</span>
                      <Route size={16} className="text-fog" />
                      <span className="font-semibold text-bone">{route.toName}</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${getDangerColor(route.danger)}`}>
                    Danger: {route.danger}/10
                  </div>
                </div>
                <p className="text-sm text-fog mb-3">{route.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-fog">Goods: <span className="text-bone">{route.goods.join(', ')}</span></span>
                  <span className="text-fog">Volume: <span className="text-bone">{formatNumber(route.volume)}</span></span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-fog">Resource</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-fog">Base Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-fog">Volatility</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-fog">Trend</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => {
                  const TrendIcon = trendIcons[market.trend];
                  return (
                    <tr key={market.resource} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-bone">{market.resource}</td>
                      <td className="text-right py-3 px-4 text-gold">{market.basePrice}</td>
                      <td className="text-right py-3 px-4 text-fog">{(market.volatility * 100).toFixed(0)}%</td>
                      <td className="text-center py-3 px-4">
                        <TrendIcon size={16} className={`inline ${trendColors[market.trend]}`} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm" onClick={() => setSelectedResource(null)}>
          <div className="max-w-md w-full p-6 rounded-xl bg-charcoal border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-display font-bold text-gold">{selectedResource.name}</h3>
                <p className="text-sm text-fog">{selectedResource.type} • {selectedResource.rarity}</p>
              </div>
              <button onClick={() => setSelectedResource(null)} className="text-fog-light hover:text-bone text-2xl">×</button>
            </div>
            <p className="text-fog-light mb-4">{selectedResource.description}</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-fog">Base Value</span>
                <span className="text-gold">{selectedResource.baseValue} gold</span>
              </div>
              <div>
                <span className="text-fog">Found in Regions</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedResource.regions.map(region => (
                    <span key={region} className="px-2 py-1 rounded bg-shadow text-fog text-xs">{region}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
