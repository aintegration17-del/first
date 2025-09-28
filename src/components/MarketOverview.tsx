import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export const MarketOverview: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  useEffect(() => {
    // Simulated market data with realistic updates
    const generateMarketData = (): MarketData[] => [
      {
        symbol: 'SPY',
        name: 'S&P 500 ETF',
        price: 445.67 + (Math.random() - 0.5) * 2,
        change: 2.34 + (Math.random() - 0.5) * 1,
        changePercent: 0.53 + (Math.random() - 0.5) * 0.2,
        volume: '125.4M'
      },
      {
        symbol: 'QQQ',
        name: 'Nasdaq 100 ETF',
        price: 387.23 + (Math.random() - 0.5) * 3,
        change: -1.45 + (Math.random() - 0.5) * 1,
        changePercent: -0.37 + (Math.random() - 0.5) * 0.3,
        volume: '89.2M'
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 178.45 + (Math.random() - 0.5) * 2,
        change: 3.21 + (Math.random() - 0.5) * 1.5,
        changePercent: 1.83 + (Math.random() - 0.5) * 0.4,
        volume: '67.8M'
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 248.32 + (Math.random() - 0.5) * 5,
        change: -4.67 + (Math.random() - 0.5) * 2,
        changePercent: -1.85 + (Math.random() - 0.5) * 0.5,
        volume: '98.5M'
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        price: 412.78 + (Math.random() - 0.5) * 3,
        change: 5.23 + (Math.random() - 0.5) * 2,
        changePercent: 1.28 + (Math.random() - 0.5) * 0.3,
        volume: '42.1M'
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 142.65 + (Math.random() - 0.5) * 2,
        change: 1.87 + (Math.random() - 0.5) * 1,
        changePercent: 1.33 + (Math.random() - 0.5) * 0.4,
        volume: '38.9M'
      }
    ];

    setMarketData(generateMarketData());
    
    // Update data every 3 seconds
    const interval = setInterval(() => {
      setMarketData(generateMarketData());
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Activity className="w-4 h-4 mr-2" />
            Live Market Data
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Market Overview
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real-time market data with advanced analytics and insights
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 p-1 rounded-xl">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Market Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((stock, index) => (
            <div
              key={stock.symbol}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-emerald-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {stock.symbol}
                  </h3>
                  <p className="text-sm text-slate-500">{stock.name}</p>
                </div>
                <div className={`p-2 rounded-lg ${
                  stock.change >= 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-slate-900">
                    ${stock.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      stock.changePercent >= 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-sm text-slate-500">Volume</span>
                  <span className="text-sm font-medium text-slate-700">{stock.volume}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Market Cap', value: '$42.8T', change: '+2.3%', positive: true },
            { label: 'Total Volume', value: '$1.2T', change: '+5.7%', positive: true },
            { label: 'Active Stocks', value: '4,247', change: '-1.2%', positive: false }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">{stat.label}</span>
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-sm font-medium ${
                  stat.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};