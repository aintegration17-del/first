import React, { useState } from 'react';
import { Mail, CheckCircle, TrendingUp, BarChart, DollarSign, Shield } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const preferences = [
    { id: 'market-updates', label: 'Market Updates', icon: TrendingUp, description: 'Daily market summaries and analysis' },
    { id: 'investment-tips', label: 'Investment Tips', icon: BarChart, description: 'Expert strategies and insights' },
    { id: 'portfolio-alerts', label: 'Portfolio Alerts', icon: DollarSign, description: 'Performance notifications' },
    { id: 'security-updates', label: 'Security Updates', icon: Shield, description: 'Account and platform security news' }
  ];

  const handlePreferenceToggle = (preferenceId: string) => {
    setSelectedPreferences(prev =>
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedPreferences.length > 0) {
      setIsSubscribed(true);
      // Here you would typically send the subscription data to your API
      console.log('Newsletter subscription:', { email, preferences: selectedPreferences });
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Successfully Subscribed!
            </h3>
            <p className="text-xl text-emerald-100 mb-8">
              Thank you for subscribing to our newsletter. You'll receive your first update within 24 hours.
            </p>
            <div className="bg-white/10 rounded-2xl p-6 text-left">
              <h4 className="text-white font-semibold mb-4">Your Subscription Preferences:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferences
                  .filter(pref => selectedPreferences.includes(pref.id))
                  .map(pref => {
                    const IconComponent = pref.icon;
                    return (
                      <div key={pref.id} className="flex items-center text-white">
                        <IconComponent className="w-5 h-5 mr-3 text-emerald-200" />
                        <span>{pref.label}</span>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-emerald-500 to-teal-600">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <Mail className="w-4 h-4 mr-2" />
            Stay Informed
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Never Miss a Market Move
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Get personalized investment insights, market analysis, and exclusive tips delivered to your inbox
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Input */}
            <div>
              <label className="block text-white font-medium mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-200 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-emerald-200 focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Subscription Preferences */}
            <div>
              <label className="block text-white font-medium mb-4">Choose Your Interests</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferences.map(pref => {
                  const IconComponent = pref.icon;
                  const isSelected = selectedPreferences.includes(pref.id);
                  return (
                    <label
                      key={pref.id}
                      className={`flex items-start p-4 rounded-xl cursor-pointer transition-all border-2 ${
                        isSelected
                          ? 'bg-white/20 border-white/50'
                          : 'bg-white/10 border-white/20 hover:bg-white/15'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handlePreferenceToggle(pref.id)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                        isSelected ? 'bg-white border-white' : 'border-white/50'
                      }`}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <IconComponent className="w-4 h-4 text-emerald-200 mr-2" />
                          <span className="text-white font-medium">{pref.label}</span>
                        </div>
                        <p className="text-emerald-100 text-sm">{pref.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!email || selectedPreferences.length === 0}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  email && selectedPreferences.length > 0
                    ? 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                Subscribe to Newsletter
              </button>
              <p className="text-emerald-100 text-sm mt-4">
                Free to subscribe • Unsubscribe anytime • No spam, ever
              </p>
            </div>
          </form>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-emerald-100 mb-6">Join 50,000+ investors already subscribed</p>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-emerald-200 text-sm">Newsletter Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-emerald-200 text-sm">Active Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Daily</div>
              <div className="text-emerald-200 text-sm">Market Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};