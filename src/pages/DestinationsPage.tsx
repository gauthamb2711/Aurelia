import React, { useState, useMemo } from 'react';
import { Destination, Region, TravelStyle, BudgetTier } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { DestinationCard } from '../components/DestinationCard';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, RotateCcw, MapPin, Sparkles } from 'lucide-react';

interface DestinationsPageProps {
  initialFilter?: { style?: string; region?: string; query?: string };
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  savedDestinationIds: string[];
  onToggleSaveDest: (id: string) => void;
  isDark: boolean;
  currency: string;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  initialFilter,
  onSelectDestination,
  onPlanTrip,
  savedDestinationIds,
  onToggleSaveDest,
  isDark,
  currency,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialFilter?.query || '');
  const [selectedRegion, setSelectedRegion] = useState<string>(initialFilter?.region || 'All');
  const [selectedStyle, setSelectedStyle] = useState<string>(initialFilter?.style || 'All');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('curated');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  React.useEffect(() => {
    if (initialFilter?.style) setSelectedStyle(initialFilter.style);
    if (initialFilter?.region) setSelectedRegion(initialFilter.region);
    if (initialFilter?.query !== undefined) setSearchQuery(initialFilter.query);
  }, [initialFilter]);

  const regions: (Region | 'All')[] = [
    'All',
    'India',
    'Southeast Asia',
    'Europe',
    'Middle East',
    'Africa',
    'North America',
    'South America',
    'Oceania',
  ];

  const travelStyles: (TravelStyle | 'All')[] = [
    'All',
    'Luxury',
    'Adventure',
    'Nature',
    'Culture',
    'Romantic',
    'Family',
    'Solo',
    'Budget',
  ];

  const budgetTiers: (BudgetTier | 'All')[] = [
    'All',
    'Budget',
    'Moderate',
    'Luxury',
    'Ultra-Luxury',
  ];

  // Filtering and Sorting logic
  const filteredAndSortedDestinations = useMemo(() => {
    let list = DESTINATIONS.filter((d) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q);

      // Region
      const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;

      // Style
      const matchesStyle = selectedStyle === 'All' || d.travelStyles.includes(selectedStyle as any);

      // Budget Tier
      const matchesBudget = selectedBudget === 'All' || d.estimatedBudgetTier === selectedBudget;

      return matchesSearch && matchesRegion && matchesStyle && matchesBudget;
    });

    // Sorting
    switch (sortBy) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'budget-asc':
        list.sort((a, b) => a.avgDailyCostINR - b.avgDailyCostINR);
        break;
      case 'budget-desc':
        list.sort((a, b) => b.avgDailyCostINR - a.avgDailyCostINR);
        break;
      case 'duration':
        list.sort((a, b) => a.suggestedDurationDays - b.suggestedDurationDays);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Curated: Trending & Highlights first
        list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
        break;
    }

    return list;
  }, [searchQuery, selectedRegion, selectedStyle, selectedBudget, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedStyle('All');
    setSelectedBudget('All');
    setSortBy('curated');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedRegion !== 'All' ||
    selectedStyle !== 'All' ||
    selectedBudget !== 'All' ||
    sortBy !== 'curated';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
          Global Atlas
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
          Explore Curated Global Sanctuaries
        </h1>
        <p className="text-xs sm:text-base text-gray-400 font-light leading-relaxed">
          Traverse 24 meticulously vetted global destinations spanning 8 continents and territories. Filter by budget, travel cadence, or style.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-6 ${
        isDark ? 'bg-[#0B132B]/80 border-white/10' : 'bg-white border-[#DFD5C2]'
      }`}>
        
        {/* Top Search & Layout Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, country, or terrain..."
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#D4AF37]' 
                  : 'bg-black/5 border-black/10 text-gray-900 placeholder-gray-400 focus:border-[#9A7B38]'
              }`}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort Destinations"
                className={`py-2.5 px-3 rounded-xl border text-xs font-medium focus:outline-none cursor-pointer ${
                  isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-gray-900'
                }`}
              >
                <option value="curated" className="bg-slate-900 text-white">Curated Highlights</option>
                <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
                <option value="budget-asc" className="bg-slate-900 text-white">Daily Budget: Low to High</option>
                <option value="budget-desc" className="bg-slate-900 text-white">Daily Budget: High to Low</option>
                <option value="duration" className="bg-slate-900 text-white">Suggested Duration</option>
                <option value="name" className="bg-slate-900 text-white">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Layout Mode Toggles */}
            <div className="flex items-center p-1 rounded-xl border border-white/10 bg-white/5">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'grid' ? 'bg-[#D4AF37] text-[#080E1E]' : 'text-gray-400 hover:text-white'
                }`}
                title="Grid view"
                aria-label="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'list' ? 'bg-[#D4AF37] text-[#080E1E]' : 'text-gray-400 hover:text-white'
                }`}
                title="Editorial List view"
                aria-label="Editorial list layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="p-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs flex items-center gap-1 transition-colors"
                title="Clear all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block mb-2">
            Region:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                  selectedRegion === reg
                    ? isDark
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080E1E] font-semibold'
                      : 'bg-[#9A7B38] border-[#9A7B38] text-white font-semibold'
                    : isDark
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                      : 'bg-black/5 border-black/10 text-gray-700 hover:border-black/30'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Style & Budget Filter Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">
              Travel Style:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {travelStyles.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStyle(st)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    selectedStyle === st
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-semibold'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">
              Budget Tier:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {budgetTiers.map((bt) => (
                <button
                  key={bt}
                  onClick={() => setSelectedBudget(bt)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    selectedBudget === bt
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-semibold'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Showing {filteredAndSortedDestinations.length} matching destinations</span>
        {selectedRegion !== 'All' && <span>Region: {selectedRegion}</span>}
      </div>

      {/* Destinations Grid / List */}
      {filteredAndSortedDestinations.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-white/20 bg-white/5 max-w-xl mx-auto space-y-4">
          <p className="text-lg font-editorial text-white">No Sanctuaries Match Your Criteria</p>
          <p className="text-xs text-gray-400">
            Try broadening your budget parameters, selecting "All" regions, or clearing your search term.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#080E1E] text-xs font-semibold uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            layoutMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredAndSortedDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSaved={savedDestinationIds.includes(dest.id)}
              onToggleSave={onToggleSaveDest}
              onSelect={onSelectDestination}
              onPlanTrip={onPlanTrip}
              isDark={isDark}
              layout={layoutMode}
              currency={currency}
            />
          ))}
        </div>
      )}

    </div>
  );
};
