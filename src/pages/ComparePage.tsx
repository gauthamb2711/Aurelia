import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { Destination } from '../types/travel';
import { compareTwoDestinations, formatCurrency } from '../utils/calculator';
import { Scale, Sparkles, MapPin, Check, X, ArrowRight, Sun, Clock, Coins, Utensils } from 'lucide-react';

interface ComparePageProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isDark: boolean;
  currency: string;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  onSelectDestination,
  onPlanTrip,
  isDark,
  currency,
}) => {
  const [destAId, setDestAId] = useState<string>('udaipur-india');
  const [destBId, setDestBId] = useState<string>('kyoto-japan');

  const destA = DESTINATIONS.find((d) => d.id === destAId) || DESTINATIONS[0];
  const destB = DESTINATIONS.find((d) => d.id === destBId) || DESTINATIONS[1];

  const comparison = compareTwoDestinations(destA, destB);

  const cardSection = (d: Destination) => (
    <div className={`rounded-3xl border overflow-hidden shadow-2xl flex flex-col justify-between ${
      isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900'
    }`}>
      <div>
        <div className="relative h-56 sm:h-64 w-full">
          <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
              {d.region} • {d.country}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white">{d.name}</h3>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5 sm:space-y-6 text-xs">
          <p className={`italic font-serif text-sm ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>"{d.tagline}"</p>

          {/* Financial & Stay Metrics */}
          <div className={`grid grid-cols-2 gap-3 pb-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#FAF6EE] border-[#ECE3D2]'}`}>
              <span className={`block text-[10px] uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Daily Est.</span>
              <span className={`font-bold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {formatCurrency(d.avgDailyCostINR, currency)}
              </span>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#FAF6EE] border-[#ECE3D2]'}`}>
              <span className={`block text-[10px] uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Recommended Stay</span>
              <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{d.suggestedDurationDays} Days</span>
            </div>
          </div>

          {/* Best Season & Weather */}
          <div className={`space-y-1 pb-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <span className={`text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> Best Time & Climate
            </span>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{d.bestTimeToVisit}</p>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{d.climateInfo.tempRange} • {d.climateInfo.rainfall}</p>
          </div>

          {/* Top Landmarks */}
          <div className={`space-y-2 pb-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <span className={`text-[10px] uppercase font-bold tracking-widest block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Headline Landmarks
            </span>
            <ul className="space-y-1">
              {d.mainAttractions.slice(0, 3).map((a, i) => (
                <li key={i} className={`flex items-center gap-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>{a.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gastronomy Highlight */}
          <div className={`space-y-1 pb-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <span className={`text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" /> Iconic Dish
            </span>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{d.foodHighlights[0]?.dish}</p>
            <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{d.foodHighlights[0]?.desc}</p>
          </div>

          {/* Travel Styles */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {d.travelStyles.map((s) => (
              <span
                key={s}
                className={`px-2 py-0.5 rounded-md border text-[10px] ${
                  isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-[#FAF6EE] border-[#DFD5C2] text-gray-800'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 flex gap-2">
        <button
          onClick={() => onSelectDestination(d)}
          className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
            isDark ? 'border-white/20 hover:border-[#D4AF37] text-white' : 'border-[#9A7B38]/40 hover:border-[#9A7B38] text-gray-900'
          }`}
        >
          View Sanctuary
        </button>
        <button
          onClick={() => onPlanTrip(d)}
          className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-bold text-center transition-all"
        >
          Plan DreamTrip
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className={`text-xs uppercase tracking-[0.3em] font-semibold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
          Side-by-Side Evaluation
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          Destination Comparison Matrix
        </h1>
        <p className={`text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Weigh competing sanctuaries side by side across estimated budgets, recommended stay durations, seasonal weather, culinary character, and experiential alignment.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
        isDark ? 'bg-[#0B132B] border-white/10' : 'bg-white border-[#DFD5C2]'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
          <div>
            <label className={`text-[10px] uppercase font-bold tracking-widest block mb-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Primary Sanctuary (A)
            </label>
            <select
              value={destAId}
              onChange={(e) => setDestAId(e.target.value)}
              aria-label="Select First Destination"
              className={`w-full py-3 px-4 rounded-xl border text-sm font-semibold focus:outline-none cursor-pointer ${
                isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
              }`}
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  {d.name}, {d.country} ({d.region})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`text-[10px] uppercase font-bold tracking-widest block mb-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Contender Sanctuary (B)
            </label>
            <select
              value={destBId}
              onChange={(e) => setDestBId(e.target.value)}
              aria-label="Select Second Destination"
              className={`w-full py-3 px-4 rounded-xl border text-sm font-semibold focus:outline-none cursor-pointer ${
                isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
              }`}
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  {d.name}, {d.country} ({d.region})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Executive Summary Insight Card */}
      <div className={`p-5 sm:p-8 rounded-3xl border ${
        isDark ? 'bg-gradient-to-r from-[#0B132B] to-[#141C38] border-[#D4AF37]/30 text-white' : 'bg-[#FAF6EE] border-[#DFD5C2] text-gray-900'
      }`}>
        <h3 className={`text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
          <Sparkles className="w-4 h-4" /> Comparative Verdict
        </h3>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <strong>{destA.name}</strong> vs <strong>{destB.name}</strong>: {comparison.cheaperDestination} is the more economical sanctuary by approximately {comparison.budgetDifferencePercent}%. Both destinations share a common passion for{' '}
          <span className={`font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
            {comparison.commonStyles.join(', ') || 'diverse global exploration'}
          </span>
          .
        </p>
      </div>

      {/* Side-by-Side Visual Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {cardSection(destA)}
        {cardSection(destB)}
      </div>

    </div>
  );
};
