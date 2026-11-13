import React, { useState } from 'react';
import { Compass, Mail, Heart, Globe, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDark }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-[#050914] border-white/10 text-gray-400' 
        : 'bg-[#F4EFE6] border-[#DFD5C2] text-gray-600'
    }`}>
      {/* Editorial Newsletter Strip */}
      <div className={`border-b ${isDark ? 'border-white/5 bg-[#091024]' : 'border-[#DFD5C2] bg-[#EFE8DC]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className={`text-xs uppercase tracking-[0.25em] font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                The Aurelia Private Dispatch
              </span>
              <h3 className={`font-editorial text-2xl sm:text-3xl font-normal mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Receive our monthly private journal on remote archipelagos, forgotten palaces, and slow travel.
              </h3>
              <p className="text-xs sm:text-sm mt-2 text-gray-400 max-w-xl">
                No promotions or spam. Just exquisite photography, literary essays, and unlisted travel tips delivered to your inbox on the full moon.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Welcome to our private readership circle. Next dispatch arrives soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    aria-label="Email address for newsletter"
                    className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#0E162E] border-[#D4AF37]/30 text-white placeholder-gray-500 focus:border-[#D4AF37]' 
                        : 'bg-white border-[#D6C7B2] text-gray-900 placeholder-gray-400 focus:border-[#8A6F32]'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all ${
                      isDark
                        ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                        : 'bg-[#9A7B38] hover:bg-[#85682C] text-white'
                    }`}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                isDark ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#9A7B38] text-[#9A7B38]'
              }`}>
                <Compass className="w-4 h-4" />
              </div>
              <span className={`font-display text-lg tracking-[0.2em] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                AURELIA
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              "Don't Just Visit Places. Experience Stories."
              A high-concept travel discovery and intelligent journey-planning platform dedicated to meaningful global wandering.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs">
              <span className="flex items-center gap-1.5 text-amber-500/80">
                <Shield className="w-3.5 h-3.5" /> No Tracking / Zero Auth
              </span>
              <span className="flex items-center gap-1.5 text-emerald-500/80">
                <Globe className="w-3.5 h-3.5" /> 8 Global Regions
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Discovery
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-amber-400 transition-colors">
                  All Destinations (24)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-amber-400 transition-colors">
                  Interactive World Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hiddengems')} className="hover:text-amber-400 transition-colors">
                  Secret & Hidden Gems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-amber-400 transition-colors">
                  Side-by-Side Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Intelligent Engines */}
          <div>
            <h4 className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Engines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('dreamtrip')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" /> DreamTrip Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('budget')} className="hover:text-amber-400 transition-colors">
                  TripBudget Cost Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-amber-400 transition-colors">
                  The Travel Journal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experiences')} className="hover:text-amber-400 transition-colors">
                  Travel Quizzes & Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Standards */}
          <div>
            <h4 className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Philosophy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  The Aurelia Manifesto
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  Curatorial Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  Sustainable Exploration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 AURELIA. Crafted for discerning global travelers. All rights reserved.</p>
          <p className="opacity-70 text-[11px]">
            Estimates are calculated using structured local models. Maps powered by OpenStreetMap contributors.
          </p>
        </div>
      </div>
    </footer>
  );
};
