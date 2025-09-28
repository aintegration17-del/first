import React from 'react';
import { 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Facebook,
  Shield,
  Award,
  Clock
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-emerald-400 mr-3" />
              <span className="text-2xl font-bold">InvestPro</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Empowering investors with advanced analytics, real-time data, and institutional-grade tools 
              to make informed investment decisions.
            </p>
            
            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-400">
                <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                <span>SEC Regulated & SIPC Protected</span>
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <Award className="w-4 h-4 mr-2 text-emerald-400" />
                <span>Award-Winning Platform</span>
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <Clock className="w-4 h-4 mr-2 text-emerald-400" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-4">
              {[
                'Trading Platform',
                'Portfolio Analytics',
                'Market Research',
                'Mobile App',
                'API Documentation',
                'Educational Resources'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Investment Options */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Investments</h3>
            <ul className="space-y-4">
              {[
                'Stocks & ETFs',
                'Mutual Funds',
                'Options Trading',
                'Cryptocurrency',
                'Bonds & Fixed Income',
                'International Markets'
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-slate-400">
                  <p>123 Financial District</p>
                  <p>New York, NY 10005</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-emerald-400 mr-3" />
                <a href="tel:+1-800-INVEST" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  1-800-INVEST-1
                </a>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-emerald-400 mr-3" />
                <a href="mailto:support@investpro.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  support@investpro.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Facebook, href: '#', label: 'Facebook' }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-slate-400">
              <span>&copy; 2025 InvestPro. All rights reserved.</span>
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Risk Disclosure</a>
            </div>
            
            {/* Regulatory Info */}
            <div className="text-sm text-slate-500 text-center md:text-right">
              <p>Member FINRA & SIPC</p>
              <p>Securities offered through InvestPro Securities LLC</p>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>Investment Disclaimer:</strong> All investments involve risk, including the potential loss of principal. 
              Past performance does not guarantee future results. Before investing, consider your investment objectives and 
              InvestPro's charges and expenses. This information is not intended as a recommendation to buy or sell any security.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};