import React from 'react';
import { TrendingUp, BarChart3, Shield, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-financial-district-at-night-4208/1080p.mp4"
            type="video/mp4"
          />
          <source
            src="https://cdn.coverr.co/videos/coverr-trading-floor-activity-5234/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-emerald-900/30" />
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <div className="inline-flex items-center bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-full px-6 py-2 mb-8">
          <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
          <span className="text-emerald-300 text-sm font-medium">Market Leaders Choose Us</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            Invest
          </span>{' '}
          <span className="text-white">Like a</span>{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Pro
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Advanced analytics, real-time data, and institutional-grade tools 
          to maximize your investment potential in today's markets.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { icon: BarChart3, text: 'Advanced Analytics' },
            { icon: Zap, text: 'Real-time Data' },
            { icon: Shield, text: 'Bank-level Security' }
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <Icon className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-white text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-105">
            <span className="relative z-10">Start Trading Now</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-emerald-400/50">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};