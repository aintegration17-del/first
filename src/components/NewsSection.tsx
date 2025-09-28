import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, TrendingUp, AlertCircle, Globe, DollarSign } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'market' | 'crypto' | 'commodities' | 'global';
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  source: string;
  image: string;
}

export const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const generateNews = (): NewsItem[] => [
      {
        id: '1',
        title: 'Federal Reserve Signals Potential Rate Cut in Q2',
        summary: 'Fed officials hint at monetary policy shifts as inflation shows signs of cooling across multiple sectors.',
        category: 'market',
        time: '2 hours ago',
        sentiment: 'positive',
        source: 'Financial Times',
        image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg'
      },
      {
        id: '2',
        title: 'Bitcoin Surges Past $65K on Institutional Adoption',
        summary: 'Major corporations continue to add cryptocurrency to their treasury reserves, driving price momentum.',
        category: 'crypto',
        time: '4 hours ago',
        sentiment: 'positive',
        source: 'CoinDesk',
        image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg'
      },
      {
        id: '3',
        title: 'Oil Prices Decline Amid Supply Concerns',
        summary: 'Crude oil futures drop 3% as geopolitical tensions ease and production capacity increases.',
        category: 'commodities',
        time: '6 hours ago',
        sentiment: 'negative',
        source: 'Reuters',
        image: 'https://images.pexels.com/photos/1144834/pexels-photo-1144834.jpeg'
      },
      {
        id: '4',
        title: 'European Markets Rally on GDP Growth Data',
        summary: 'Strong economic indicators from major EU economies boost investor confidence across the continent.',
        category: 'global',
        time: '8 hours ago',
        sentiment: 'positive',
        source: 'Bloomberg',
        image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg'
      },
      {
        id: '5',
        title: 'Tech Stocks Lead Market Recovery',
        summary: 'FAANG stocks post significant gains as quarterly earnings exceed analyst expectations.',
        category: 'market',
        time: '12 hours ago',
        sentiment: 'positive',
        source: 'CNBC',
        image: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg'
      },
      {
        id: '6',
        title: 'Gold Reaches New Monthly High',
        summary: 'Precious metals gain momentum as hedge against market volatility and currency fluctuations.',
        category: 'commodities',
        time: '1 day ago',
        sentiment: 'neutral',
        source: 'MarketWatch',
        image: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg'
      }
    ];

    setNewsItems(generateNews());
  }, []);

  const categories = [
    { id: 'all', label: 'All News', icon: Globe },
    { id: 'market', label: 'Markets', icon: TrendingUp },
    { id: 'crypto', label: 'Crypto', icon: DollarSign },
    { id: 'commodities', label: 'Commodities', icon: AlertCircle },
    { id: 'global', label: 'Global', icon: Globe }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/10';
      case 'negative': return 'text-red-400 bg-red-500/10';
      default: return 'text-yellow-400 bg-yellow-500/10';
    }
  };

  const getSentimentDot = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-400';
      case 'negative': return 'bg-red-400';
      default: return 'bg-yellow-400';
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <AlertCircle className="w-4 h-4 mr-2" />
            Breaking News
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Financial News & Analysis
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay informed with the latest market developments and expert insights
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === id
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <article
              key={news.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-slate-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(news.sentiment)}`}>
                    <div className={`w-2 h-2 rounded-full ${getSentimentDot(news.sentiment)} inline-block mr-1`} />
                    {news.sentiment.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-500">{news.source}</span>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {news.time}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-3">
                  {news.summary}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    news.category === 'market' ? 'bg-blue-100 text-blue-800' :
                    news.category === 'crypto' ? 'bg-orange-100 text-orange-800' :
                    news.category === 'commodities' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {news.category}
                  </span>
                  
                  <button className="flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                    <span className="text-sm mr-1">Read more</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors inline-flex items-center">
            Load More Articles
            <TrendingUp className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};