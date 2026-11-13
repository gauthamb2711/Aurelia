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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block">
          Side-by-Side Evaluation
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          Destination Comparison Matrix
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Weigh competing sanctuaries side by side across estimated budgets, recommended stay durations, seasonal weather, culinary character, and experiential alignment.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className={`p-6 rounded-3xl border shadow-xl ${
        isDark ? 'bg-[#0B132B] border-white/10' : 'bg-white border-[#DFD5C2]'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block mb-2">
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
            <label className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block mb-2">
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
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isDark ? 'bg-gradient-to-r from-[#0B132B] to-[#141C38] border-[#D4AF37]/30 text-white' : 'bg-[#FAF6EE] border-[#DFD5C2] text-gray-900'
      }`}>
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Comparative Verdict
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          <strong>{destA.name}</strong> vs <strong>{destB.name}</strong>: {comparison.cheaperDestination} is the more economical sanctuary by approximately {comparison.budgetDifferencePercent}%. Both destinations share a common passion for{' '}
          <span className="text-[#D4AF37] font-semibold">
            {comparison.commonStyles.join(', ') || 'diverse global exploration'}
          </span>
          .
        </p>
      </div>

      {/* Side-by-Side Visual Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* DESTINATION A */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl flex flex-col justify-between ${
          isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900'
        }`}>
          <div>
            <div className="relative h-64 w-full">
              <img src={destA.heroImage} alt={destA.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  {destA.region} • {destA.country}
                </span>
                <h3 className="font-editorial text-3xl font-normal text-white">{destA.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6 text-xs">
              <p className="italic font-serif text-[#D4AF37] text-sm">"{destA.tagline}"</p>

              {/* Financial & Stay Metrics */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase">Daily Est.</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {formatCurrency(destA.avgDailyCostINR, currency)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase">Recommended Stay</span>
                  <span className="font-bold text-white text-sm">{destA.suggestedDurationDays} Days</span>
                </div>
              </div>

              {/* Best Season & Weather */}
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> Best Time & Climate
                </span>
                <p className="font-semibold text-white">{destA.bestTimeToVisit}</p>
                <p className="text-gray-400">{destA.climateInfo.tempRange} • {destA.climateInfo.rainfall}</p>
              </div>

              {/* Top Landmarks */}
              <div className="space-y-2 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Headline Landmarks
                </span>
                <ul className="space-y-1">
                  {destA.mainAttractions.slice(0, 3).map((a, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-gray-300">
                      <span className="text-[#D4AF37] font-bold">•</span>
                      <span>{a.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gastronomy Highlight */}
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" /> Iconic Dish
                </span>
                <p className="font-semibold text-white">{destA.foodHighlights[0]?.dish}</p>
                <p className="text-gray-400 text-[11px]">{destA.foodHighlights[0]?.desc}</p>
              </div>

              {/* Travel Styles */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {destA.travelStyles.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 flex gap-2">
            <button
              onClick={() => onSelectDestination(destA)}
              className="flex-1 py-2.5 rounded-xl border border-white/20 hover:border-[#D4AF37] text-xs font-semibold text-center transition-all"
            >
              View Sanctuary
            </button>
            <button
              onClick={() => onPlanTrip(destA)}
              className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-bold text-center transition-all"
            >
              Plan DreamTrip
            </button>
          </div>
        </div>

        {/* DESTINATION B */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl flex flex-col justify-between ${
          isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900'
        }`}>
          <div>
            <div className="relative h-64 w-full">
              <img src={destB.heroImage} alt={destB.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  {destB.region} • {destB.country}
                </span>
                <h3 className="font-editorial text-3xl font-normal text-white">{destB.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6 text-xs">
              <p className="italic font-serif text-[#D4AF37] text-sm">"{destB.tagline}"</p>

              {/* Financial & Stay Metrics */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase">Daily Est.</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {formatCurrency(destB.avgDailyCostINR, currency)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gray-400 block text-[10px] uppercase">Recommended Stay</span>
                  <span className="font-bold text-white text-sm">{destB.suggestedDurationDays} Days</span>
                </div>
              </div>

              {/* Best Season & Weather */}
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> Best Time & Climate
                </span>
                <p className="font-semibold text-white">{destB.bestTimeToVisit}</p>
                <p className="text-gray-400">{destB.climateInfo.tempRange} • {destB.climateInfo.rainfall}</p>
              </div>

              {/* Top Landmarks */}
              <div className="space-y-2 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Headline Landmarks
                </span>
                <ul className="space-y-1">
                  {destB.mainAttractions.slice(0, 3).map((a, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-gray-300">
                      <span className="text-[#D4AF37] font-bold">•</span>
                      <span>{a.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gastronomy Highlight */}
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" /> Iconic Dish
                </span>
                <p className="font-semibold text-white">{destB.foodHighlights[0]?.dish}</p>
                <p className="text-gray-400 text-[11px]">{destB.foodHighlights[0]?.desc}</p>
              </div>

              {/* Travel Styles */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {destB.travelStyles.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 flex gap-2">
            <button
              onClick={() => onSelectDestination(destB)}
              className="flex-1 py-2.5 rounded-xl border border-white/20 hover:border-[#D4AF37] text-xs font-semibold text-center transition-all"
            >
              View Sanctuary
            </button>
            <button
              onClick={() => onPlanTrip(destB)}
              className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-bold text-center transition-all"
            >
              Plan DreamTrip
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
