import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Scale, 
  Globe2 
} from 'lucide-react';
import { CURRENCY_RATES } from '../utils/calculator';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  savedCount: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currency: string;
  setCurrency: (c: any) => void;
  onOpenSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  savedCount,
  theme,
  toggleTheme,
  currency,
  setCurrency,
  onOpenSavedModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Destinations' },
    { id: 'dreamtrip', label: 'DreamTrip' },
    { id: 'budget', label: 'TripBudget' },
    { id: 'journal', label: 'Journal' },
    { id: 'experiences', label: 'Experiences' },
  ];

  const allMobileNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Destinations' },
    { id: 'map', label: 'World Map' },
    { id: 'dreamtrip', label: 'DreamTrip' },
    { id: 'budget', label: 'TripBudget' },
    { id: 'compare', label: 'Compare Matrix' },
    { id: 'hiddengems', label: 'Hidden Gems' },
    { id: 'journal', label: 'Journal' },
    { id: 'experiences', label: 'Experiences Hub' },
    { id: 'about', label: 'About & Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 border-b ${
      isDark 
        ? 'bg-[#080E1E]/90 border-[#D4AF37]/20 text-[#FAF8F5]' 
        : 'bg-[#FAF8F5]/95 border-[#E2D9C8] text-[#111827]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand Wordmark (Zone 1) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group whitespace-nowrap shrink-0"
            aria-label="Aurelia Home"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isDark 
                ? 'border-[#D4AF37] bg-[#0F172A] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080E1E]' 
                : 'border-[#9A7B38] bg-[#F3ECE0] text-[#9A7B38] group-hover:bg-[#9A7B38] group-hover:text-white'
            }`}>
              <Compass className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <div>
              <span className="font-display tracking-[0.25em] text-lg sm:text-xl font-bold uppercase block leading-none">
                AURELIA
              </span>
              <span className={`text-[8px] tracking-[0.3em] uppercase block mt-1 ${isDark ? 'text-[#D4AF37]/80' : 'text-[#8A6F32]'}`}>
                Curated Odyssey
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Zone 2) */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 relative transition-colors whitespace-nowrap shrink-0 group ${
                    active
                      ? 'text-[#D4AF37]'
                      : isDark
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Primary CTA (Zone 3) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Currency Selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Select Currency"
                className={`text-xs font-medium py-1.5 px-2.5 rounded-lg border appearance-none pr-6 cursor-pointer focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-[#0F172A] border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'
                    : 'bg-[#F5EFE6] border-[#D6C7B2] text-[#8A6F32] hover:border-[#8A6F32]'
                }`}
              >
                {Object.keys(CURRENCY_RATES).map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">
                    {c} ({CURRENCY_RATES[c].symbol})
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-70">
                ▼
              </span>
            </div>

            {/* Saved Bookmarks Button */}
            <button
              onClick={onOpenSavedModal}
              className={`relative p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'border-white/10 hover:border-[#D4AF37] text-gray-200 hover:text-[#D4AF37] bg-white/5'
                  : 'border-black/10 hover:border-[#9A7B38] text-gray-700 hover:text-[#9A7B38] bg-black/5'
              }`}
              aria-label={`Saved destinations and trips: ${savedCount}`}
              title="Saved Journeys & Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#080E1E] text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'border-white/10 hover:border-[#D4AF37] text-[#D4AF37] bg-white/5'
                  : 'border-black/10 hover:border-[#9A7B38] text-[#9A7B38] bg-black/5'
              }`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button (Zone 3) */}
            <button
              onClick={() => handleNavClick('dreamtrip')}
              className={`hidden md:inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                isDark
                  ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-[#9A7B38] hover:bg-[#85682C] text-white shadow-sm'
              }`}
            >
              Plan Journey
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 pt-4 pb-6 transition-colors ${
          isDark ? 'bg-[#080E1E] border-white/10' : 'bg-[#FAF8F5] border-black/10'
        }`}>
          <div className="grid grid-cols-2 gap-2">
            {allMobileNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors ${
                  currentTab === item.id
                    ? isDark
                      ? 'bg-[#D4AF37] text-[#080E1E]'
                      : 'bg-[#9A7B38] text-white'
                    : isDark
                      ? 'text-gray-300 hover:bg-white/5'
                      : 'text-gray-700 hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-400">AURELIA Curated Travels</span>
            <button
              onClick={() => {
                onOpenSavedModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" /> Saved Items ({savedCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
