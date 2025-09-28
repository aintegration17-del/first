import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Eye, EyeOff, MoreVertical } from 'lucide-react';

interface PortfolioItem {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  change: number;
  changePercent: number;
  allocation: number;
}

interface PerformanceData {
  date: string;
  value: number;
}

export const Portfolio: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const portfolioData: PortfolioItem[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 250,
      avgPrice: 165.43,
      currentPrice: 178.45,
      value: 44612.50,
      change: 3255.00,
      changePercent: 7.88,
      allocation: 35.2
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 100,
      avgPrice: 245.67,
      currentPrice: 248.32,
      value: 24832.00,
      change: 265.00,
      changePercent: 1.08,
      allocation: 19.6
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 85,
      avgPrice: 398.21,
      currentPrice: 412.78,
      value: 35086.30,
      change: 1238.45,
      changePercent: 3.66,
      allocation: 27.7
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 150,
      avgPrice: 138.92,
      currentPrice: 142.65,
      value: 21397.50,
      change: 559.50,
      changePercent: 2.69,
      allocation: 16.9
    }
  ];

  const performanceData: PerformanceData[] = [
    { date: '1/1', value: 115000 },
    { date: '1/8', value: 118500 },
    { date: '1/15', value: 121200 },
    { date: '1/22', value: 119800 },
    { date: '1/29', value: 123400 },
    { date: '2/5', value: 125928 }
  ];

  const pieData = portfolioData.map(item => ({
    name: item.symbol,
    value: item.allocation,
    color: getColorForSymbol(item.symbol)
  }));

  function getColorForSymbol(symbol: string): string {
    const colors = {
      'AAPL': '#10B981',
      'TSLA': '#F59E0B',
      'MSFT': '#3B82F6',
      'GOOGL': '#EF4444'
    };
    return colors[symbol as keyof typeof colors] || '#8B5CF6';
  }

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalGain = portfolioData.reduce((sum, item) => sum + item.change, 0);
  const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100;

  const periods = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-emerald-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Portfolio Performance
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Investment Portfolio
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Track your investments with detailed analytics and performance insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Portfolio Value</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-white">
                      {showBalance ? `$${totalValue.toLocaleString()}` : '••••••'}
                    </span>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className={`text-lg font-semibold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {totalGain >= 0 ? '+' : ''}${totalGain.toLocaleString()}
                    </span>
                    <span className={`ml-2 text-sm px-2 py-1 rounded-full ${
                      totalGainPercent >= 0 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Period Selector */}
                <div className="bg-white/10 p-1 rounded-lg">
                  {periods.map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        selectedPeriod === period
                          ? 'bg-emerald-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Performance Chart */}
              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Holdings Table */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white">Holdings</h4>
                {portfolioData.map((item, index) => (
                  <div key={item.symbol} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-emerald-500/50 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: getColorForSymbol(item.symbol) }} />
                        <div>
                          <h5 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                            {item.symbol}
                          </h5>
                          <p className="text-sm text-slate-400">{item.name}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-slate-400">{item.shares} shares</p>
                            <p className="text-white font-semibold">${item.value.toLocaleString()}</p>
                          </div>
                          <div className={`text-right ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.change >= 0 ? (
                              <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 mx-auto mb-1" />
                            )}
                            <p className="text-sm font-semibold">
                              {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Allocation */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-white mb-6">Asset Allocation</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-6">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-white font-medium">{entry.name}</span>
                    </div>
                    <span className="text-slate-400">{entry.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-white mb-6">Quick Actions</h4>
              <div className="space-y-4">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors">
                  Add Funds
                </button>
                <button className="w-full border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors">
                  Rebalance Portfolio
                </button>
                <button className="w-full border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};