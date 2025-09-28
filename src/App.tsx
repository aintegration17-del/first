import React from 'react';
import { Hero } from './components/Hero';
import { MarketOverview } from './components/MarketOverview';
import { Portfolio } from './components/Portfolio';
import { NewsSection } from './components/NewsSection';
import { Newsletter } from './components/Newsletter';
import { Registration } from './components/Registration';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <MarketOverview />
      <Portfolio />
      <NewsSection />
      <Newsletter />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;