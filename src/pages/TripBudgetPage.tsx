import React, { useState, useMemo } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { calculateTripBudget, formatCurrency, CURRENCY_RATES } from '../utils/calculator';
import { 
  Calculator, 
  Coins, 
  PiggyBank, 
  Compass, 
  Hotel, 
  Car, 
  Utensils, 
  Ticket, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Info 
} from 'lucide-react';

interface TripBudgetPageProps {
  isDark: boolean;
  currency: string;
  setCurrency: (c: string) => void;
}

export const TripBudgetPage: React.FC<TripBudgetPageProps> = ({
  isDark,
  currency,
  setCurrency,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(DESTINATIONS[0].id);
  const [travelers, setTravelers] = useState<number>(2);
  const [durationDays, setDurationDays] = useState<number>(6);
  const [accommodationType, setAccommodationType] = useState<any>('Boutique Hotel');
  const [transportPreference, setTransportPreference] = useState<any>('Private Chauffeur/Cabs');
  const [foodPreference, setFoodPreference] = useState<any>('Casual Dining');
  const [activitiesBudget, setActivitiesBudget] = useState<any>('Balanced Curated');

  const selectedDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  // Dynamic Calculation
  const budget = useMemo(() => {
    return calculateTripBudget({
      destinationId: selectedDestination.id,
      destinationAvgCostINR: selectedDestination.avgDailyCostINR,
      travelers,
      durationDays,
      accommodationType,
      transportPreference,
      foodPreference,
      activitiesBudget,
      currency: currency as any,
    });
  }, [
    selectedDestination,
    travelers,
    durationDays,
    accommodationType,
    transportPreference,
    foodPreference,
    activitiesBudget,
    currency,
  ]);

  // Breakdown percentages
  const total = budget.totalCost || 1;
  const accomPct = Math.round((budget.accommodationCost / total) * 100);
  const transPct = Math.round((budget.transportCost / total) * 100);
  const foodPct = Math.round((budget.foodCost / total) * 100);
  const actPct = Math.round((budget.activitiesCost / total) * 100);
  const miscPct = Math.round((budget.miscellaneousCost / total) * 100);

  const optClass = (active: boolean, align: string = 'text-left') =>
    `py-2.5 px-3 rounded-xl border ${align} font-medium transition-all ${
      active
        ? isDark
          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-semibold'
          : 'bg-[#9A7B38]/15 border-[#9A7B38] text-[#8A6F32] font-semibold'
        : isDark
          ? 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
          : 'border-black/10 bg-black/5 text-gray-700 hover:border-black/30'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      
      {/* Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className={`text-xs uppercase tracking-[0.3em] font-semibold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
          Intelligent Expenditure Forecast
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          TripBudget – Travel Cost Calculator
        </h1>
        <p className={`text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Simulate comprehensive, transparent trip budgets across accommodation, private transit, fine dining, and guided activities. Real-time conversion across 7 world currencies.
        </p>
      </div>

      {/* Main Grid: Inputs on Left, Output Visuals on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Inputs Form */}
        <div className={`lg:col-span-6 p-5 sm:p-8 rounded-3xl border shadow-xl space-y-5 sm:space-y-6 ${
          isDark ? 'bg-[#0B132B] border-white/10' : 'bg-white border-[#DFD5C2]'
        }`}>
          <h2 className={`text-xs uppercase tracking-widest font-bold flex items-center gap-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
            <Coins className="w-4 h-4" /> Journey Parameters
          </h2>

          <div className="space-y-5 text-xs">
            {/* Destination Selection */}
            <div>
              <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Target Destination
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                aria-label="Select Destination"
                className={`w-full py-3 px-4 rounded-xl border font-semibold focus:outline-none cursor-pointer ${
                  isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
                }`}
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                    {d.name}, {d.country} ({d.estimatedBudgetTier})
                  </option>
                ))}
              </select>
            </div>

            {/* Travelers & Duration */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Travelers: {travelers}
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  aria-label="Number of Travelers"
                  className={`w-full py-2.5 px-3 rounded-xl border font-semibold focus:outline-none ${
                    isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n} className="bg-slate-900 text-white">
                      {n} {n === 1 ? 'Person' : 'People'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Duration: {durationDays} Days
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  aria-label="Trip Duration"
                  className={`w-full py-2.5 px-3 rounded-xl border font-semibold focus:outline-none ${
                    isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
                  }`}
                >
                  {[2, 3, 4, 5, 6, 7, 10, 14, 21].map((d) => (
                    <option key={d} value={d} className="bg-slate-900 text-white">
                      {d} Days
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Accommodation Style */}
            <div>
              <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Accommodation Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Hostel/Guesthouse', 'Boutique Hotel', 'Luxury Resort', 'Heritage Palace'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAccommodationType(opt)}
                    className={optClass(accommodationType === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Transit Mode */}
            <div>
              <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Transit & Movement Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Public & Rail', 'Private Chauffeur/Cabs', 'Self-Drive Rental', 'Premium Executive'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTransportPreference(opt)}
                    className={optClass(transportPreference === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Gastronomy Tier */}
            <div>
              <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Dining & Gastronomy Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Street & Local Cafes', 'Casual Dining', 'Fine Dining & Michelin', 'Private Chef/Exclusive'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFoodPreference(opt)}
                    className={optClass(foodPreference === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities Budget Tier */}
            <div>
              <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Guided Experiences & Sightseeing Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {['Low/Free Walking', 'Balanced Curated', 'VIP & Private Guides'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setActivitiesBudget(opt)}
                    className={optClass(activitiesBudget === opt, 'text-left sm:text-center')}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Switcher */}
            <div className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <span className={`text-[10px] uppercase font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Calculation Currency:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['INR', 'USD', 'EUR', 'GBP', 'AED'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currency === c
                        ? 'bg-[#D4AF37] text-[#080E1E]'
                        : isDark
                          ? 'bg-white/5 text-gray-400 hover:text-white'
                          : 'bg-black/5 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Output Dashboard & Charts */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Total Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-[#0B132B] to-[#121B3B] border-[#D4AF37]/40 text-white' 
              : 'bg-gradient-to-br from-[#FAF6EE] to-[#EAE0D0] border-[#DFD5C2] text-gray-900 shadow-lg'
          }`}>
            <span className={`text-xs uppercase tracking-[0.25em] font-semibold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Estimated Total Odyssey Budget
            </span>
            <div className="flex items-baseline gap-2 mt-2 flex-wrap">
              <span className={`font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                {formatCurrency(budget.totalCost, currency)}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>({currency})</span>
            </div>

            <div className={`grid grid-cols-2 gap-4 mt-6 pt-6 border-t text-xs ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <div>
                <span className={`block text-[10px] uppercase ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Per Person Cost</span>
                <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(budget.costPerPerson, currency)}
                </span>
              </div>
              <div>
                <span className={`block text-[10px] uppercase ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Daily Average Cost</span>
                <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(budget.costPerDay, currency)} / day
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Breakdown Visual Bar */}
          <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0B132B]/80 border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
          }`}>
            <h3 className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Expense Category Distribution
            </h3>

            {/* Color Strip Chart */}
            <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${accomPct}%` }} className="bg-amber-400" title={`Accommodation: ${accomPct}%`} />
              <div style={{ width: `${transPct}%` }} className="bg-sky-400" title={`Transit: ${transPct}%`} />
              <div style={{ width: `${foodPct}%` }} className="bg-emerald-400" title={`Dining: ${foodPct}%`} />
              <div style={{ width: `${actPct}%` }} className="bg-purple-400" title={`Activities: ${actPct}%`} />
              <div style={{ width: `${miscPct}%` }} className="bg-rose-400" title={`Buffer: ${miscPct}%`} />
            </div>

            {/* Legend & Amounts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-[#FAF6EE] border-[#ECE3D2]'
              }`}>
                <span className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Accommodation
                </span>
                <span className="font-bold">{formatCurrency(budget.accommodationCost, currency)}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-[#FAF6EE] border-[#ECE3D2]'
              }`}>
                <span className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Transit & Chauffeur
                </span>
                <span className="font-bold">{formatCurrency(budget.transportCost, currency)}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-[#FAF6EE] border-[#ECE3D2]'
              }`}>
                <span className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Dining & Gastronomy
                </span>
                <span className="font-bold">{formatCurrency(budget.foodCost, currency)}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-[#FAF6EE] border-[#ECE3D2]'
              }`}>
                <span className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Guided Experiences
                </span>
                <span className="font-bold">{formatCurrency(budget.activitiesCost, currency)}</span>
              </div>

              <div className={`p-3 rounded-xl border sm:col-span-2 flex items-center justify-between ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-[#FAF6EE] border-[#ECE3D2]'
              }`}>
                <span className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Contingency Buffer (10%)
                </span>
                <span className="font-bold">{formatCurrency(budget.miscellaneousCost, currency)}</span>
              </div>
            </div>
          </div>

          {/* Actionable Savings Recommendations */}
          <div className={`p-5 sm:p-6 rounded-3xl border space-y-3 ${
            isDark ? 'bg-white/5 border-[#D4AF37]/30 text-white' : 'bg-[#FAF6EE] border-[#DFD5C2] text-gray-900'
          }`}>
            <h3 className={`text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              <PiggyBank className="w-4 h-4" /> Intelligent Budget Optimization Tips
            </h3>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {budget.savingsTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clear Disclaimer */}
          <div className={`p-4 rounded-2xl border text-[11px] flex items-start gap-2.5 ${
            isDark ? 'border-white/10 bg-black/40 text-gray-400' : 'border-[#DFD5C2] bg-white text-gray-600'
          }`}>
            <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> All calculations are deterministic estimates intended for travel architecture and financial planning. Actual hotel rates and flight tickets fluctuate with real-time seasonal demand, holiday surcharges, and local currency movements.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
