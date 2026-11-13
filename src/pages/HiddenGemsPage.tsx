import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { Destination } from '../types/travel';
import { Sparkles, MapPin, Compass, ArrowRight, Star, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface HiddenGemsPageProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isDark: boolean;
  currency: string;
}

export const HiddenGemsPage: React.FC<HiddenGemsPageProps> = ({
  onSelectDestination,
  onPlanTrip,
  isDark,
  currency,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const hiddenGems = DESTINATIONS.filter((d) => d.isHiddenGem);
  const regions = ['All', 'India', 'Southeast Asia', 'Europe', 'Middle East', 'Africa', 'North America', 'South America', 'Oceania'];

  const filteredGems = hiddenGems.filter(
    (g) => selectedRegion === 'All' || g.region === selectedRegion
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className={`text-xs uppercase tracking-[0.3em] font-semibold block ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
          Uncharted Horizons
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          The Hidden Gems Atlas
        </h1>
        <p className={`text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Sanctuaries sheltered from over-tourism: pristine karst archipelagos, ancient boulder kingdoms, cloud forest archipelagos, and quiet blue mountain medinas.
        </p>
      </div>

      {/* Region Filter */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {regions.map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedRegion === reg
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080E1E]'
                : isDark
                  ? 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                  : 'bg-white border-[#DFD5C2] text-gray-700 hover:border-[#9A7B38]'
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Editorial Grid of Hidden Gems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredGems.map((gem) => (
          <article
            key={gem.id}
            onClick={() => onSelectDestination(gem)}
            className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl cursor-pointer flex flex-col justify-between ${
              isDark
                ? 'bg-[#0B132B] border-white/10 hover:border-[#D4AF37]/50 text-white'
                : 'bg-white border-[#DFD5C2] hover:border-[#9A7B38]/50 text-gray-900 shadow-sm'
            }`}
          >
            <div>
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={gem.heroImage}
                  alt={gem.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-amber-500 text-black">
                    Hidden Gem
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">
                    {gem.country} • {gem.region}
                  </span>
                  <h3 className="font-editorial text-2xl font-normal mt-0.5 leading-tight">
                    {gem.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <p className={`text-xs font-serif italic ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                  "{gem.tagline}"
                </p>
                <p className={`text-xs line-clamp-3 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {gem.editorialStory}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2">
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-[#FAF6EE] border-[#ECE3D2] text-gray-700'}`}>
                    <span className={`text-[9px] uppercase block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Duration</span>
                    <span className="font-semibold">{gem.suggestedDurationDays} Days Ideal</span>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-[#FAF6EE] border-[#ECE3D2] text-gray-700'}`}>
                    <span className={`text-[9px] uppercase block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Daily Budget</span>
                    <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      ~{formatCurrency(gem.avgDailyCostINR, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDestination(gem);
                }}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  isDark ? 'border-white/20 hover:border-[#D4AF37] text-white' : 'border-[#9A7B38]/40 hover:border-[#9A7B38] text-gray-900'
                }`}
              >
                Read Odyssey
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlanTrip(gem);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-bold text-center transition-all"
              >
                Plan DreamTrip
              </button>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
