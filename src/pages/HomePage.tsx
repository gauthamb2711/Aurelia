import React, { useState } from 'react';
import { Destination, JournalArticle } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { JOURNAL_ARTICLES } from '../data/journalData';
import { DestinationCard } from '../components/DestinationCard';
import { WorldMap } from '../components/WorldMap';
import {
  Compass,
  Search,
  Users,
  Sparkles,
  ArrowRight,
  MapPin,
  Award,
  ChevronDown,
  Globe2,
} from 'lucide-react';

interface HomePageProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest?: Destination) => void;
  onNavigateTab: (tab: string, filter?: { style?: string; region?: string; query?: string }) => void;
  onOpenArticle: (article: JournalArticle) => void;
  savedDestinationIds: string[];
  onToggleSaveDest: (id: string) => void;
  isDark: boolean;
  currency: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectDestination,
  onPlanTrip,
  onNavigateTab,
  onOpenArticle,
  savedDestinationIds,
  onToggleSaveDest,
  isDark,
  currency,
}) => {
  // Quick Search Bar States
  const [searchQuery, setSearchQuery] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [selectedStyle, setSelectedStyle] = useState('Luxury');

  const trendingDestinations = DESTINATIONS.filter((d) => d.isTrending).slice(0, 6);
  const hiddenGems = DESTINATIONS.filter((d) => d.isHiddenGem).slice(0, 4);
  const destinationOfMonth = DESTINATIONS.find((d) => d.isDestinationOfMonth) || DESTINATIONS[0];

  const travelStyles = [
    { name: 'Luxury', desc: 'Private palaces, vintage charters & Michelin feasts', count: 8, icon: '👑' },
    { name: 'Culture', desc: 'Centuries-old temples, tea rituals & living craft', count: 12, icon: '🏛️' },
    { name: 'Adventure', desc: 'High trans-Himalayan passes, fjords & red rock trails', count: 10, icon: '🏔️' },
    { name: 'Nature', desc: 'Untamed marine frontiers, waterfalls & dark skies', count: 14, icon: '🌿' },
    { name: 'Romantic', desc: 'Pastel coastal villas, starry deserts & sunset lakes', count: 9, icon: '✨' },
    { name: 'Solo', desc: 'Contemplative walking odysseys & silent retreats', count: 7, icon: '🧭' },
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      const match = DESTINATIONS.find(
        (d) =>
          d.name.toLowerCase() === query.toLowerCase() ||
          d.country.toLowerCase() === query.toLowerCase()
      );
      if (match) {
        onSelectDestination(match);
        return;
      }
      onNavigateTab('explore', { query, style: selectedStyle !== 'Luxury' ? selectedStyle : undefined });
      return;
    }
    onNavigateTab('explore', { style: selectedStyle !== 'Luxury' ? selectedStyle : undefined });
  };

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-16">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[88svh] sm:min-h-[92vh] flex items-center justify-center -mt-16 pt-20 pb-10 lg:-mt-20 lg:pt-24 px-4 overflow-hidden">
        {/* Background Landscape with soft overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=90"
            alt="Cinematic World Landscape"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080E1E]/80 via-[#080E1E]/60 to-[#080E1E]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl w-full mx-auto text-center space-y-6 sm:space-y-8 py-6 sm:py-12">
          
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.35em] font-semibold text-[#D4AF37]">
            <span>Next-Generation Travel & Tourism</span>
            <span className="text-white/40 hidden sm:inline" aria-hidden="true">·</span>
            <span>AURELIA Odyssey</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white leading-[1.08] tracking-tight max-w-4xl mx-auto [text-wrap:balance]">
            The World Is Waiting. <br />
            <span className="italic font-light text-[#D4AF37]">Where Will You Go?</span>
          </h1>

          <p className="font-sans text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed px-1">
            Discover extraordinary destinations, uncover hidden places, and create journeys worth remembering.
            Don't just visit places. Experience stories.
          </p>

          {/* Quick Hero Interactive Search Bar */}
          <div className="max-w-4xl mx-auto p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl backdrop-blur-xl bg-[#0B132B]/90 border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 items-stretch">
              
              {/* Destination Input */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-colors">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Destination
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Udaipur, Kyoto, Banff..."
                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-colors">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Travelers
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    aria-label="Number of Travelers"
                    className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value={1} className="bg-slate-900 text-white">1 Solo Explorer</option>
                    <option value={2} className="bg-slate-900 text-white">2 Companions</option>
                    <option value={4} className="bg-slate-900 text-white">4 Family / Friends</option>
                    <option value={6} className="bg-slate-900 text-white">6+ Private Group</option>
                  </select>
                </div>
              </div>

              {/* Travel Style */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-colors">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Travel Style
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Compass className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    aria-label="Travel Style"
                    className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Luxury" className="bg-slate-900 text-white">Luxury & Heritage</option>
                    <option value="Adventure" className="bg-slate-900 text-white">Wilderness & Adventure</option>
                    <option value="Culture" className="bg-slate-900 text-white">Cultural Immersion</option>
                    <option value="Romantic" className="bg-slate-900 text-white">Romantic Sanctuary</option>
                    <option value="Nature" className="bg-slate-900 text-white">Untamed Nature</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="min-h-[48px] h-full py-3.5 px-6 rounded-2xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-widest font-bold transition-all shadow-lg flex items-center justify-center gap-2 sm:col-span-2 lg:col-span-1"
              >
                <Search className="w-4 h-4" /> Discover Now
              </button>
            </form>
          </div>

          {/* Quick Hero Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => onNavigateTab('explore')}
              className="min-h-[46px] px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold border border-white/30 text-white hover:bg-white/10 hover:border-[#D4AF37] transition-all text-center"
            >
              Explore All 24 Sanctuaries
            </button>
            <button
              onClick={() => onPlanTrip()}
              className="min-h-[46px] px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#D4AF37] text-[#080E1E] hover:bg-[#E5C158] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Plan Your DreamTrip
            </button>
          </div>

          {/* Subtle scroll indicator */}
          <div className="pt-4 sm:pt-8 hidden sm:flex flex-col items-center justify-center opacity-60">
            <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce mt-1" />
          </div>

        </div>
      </section>

      {/* ================= 1. TRENDING DESTINATIONS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              Curated Highlights
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal mt-1">
              Trending Destinations Worldwide
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('explore')}
            className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSaved={savedDestinationIds.includes(dest.id)}
              onToggleSave={onToggleSaveDest}
              onSelect={onSelectDestination}
              onPlanTrip={onPlanTrip}
              isDark={isDark}
              currency={currency}
            />
          ))}
        </div>
      </section>

      {/* ================= 2. EXPLORE BY TRAVEL STYLE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
            Tailored Archetypes
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal mt-1">
            Explore by Travel Style
          </h2>
          <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Every journey carries a distinct signature. Filter destinations tuned to your mood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {travelStyles.map((style) => (
            <div
              key={style.name}
              onClick={() => onNavigateTab('explore', { style: style.name })}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0B132B]/60 border-white/10 hover:border-[#D4AF37] hover:bg-[#0B132B]'
                  : 'bg-white border-[#E5DEC9] hover:border-[#9A7B38] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">{style.icon}</span>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                  {style.count} Sanctuaries
                </span>
              </div>
              <h3 className="font-editorial text-2xl font-normal group-hover:text-[#D4AF37] transition-colors">
                {style.name}
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {style.desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#D4AF37] font-semibold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <span>Browse {style.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. HIDDEN GEMS SPOTLIGHT ================= */}
      <section className={`py-20 border-y transition-colors ${
        isDark ? 'bg-[#070C1A] border-white/10' : 'bg-[#F2ECE1] border-[#DDD3C0]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Uncharted Horizons
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal mt-1">
                The World's Best-Kept Secrets
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl">
                Far from the tourist buses: secluded boulder kingdoms, pristine marine karsts, and ancient blue mountain alleys.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('hiddengems')}
              className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All Hidden Gems</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiddenGems.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer h-96 shadow-lg"
              >
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-amber-500/80 text-black">
                    Hidden Gem
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs text-amber-300 uppercase tracking-wider block font-medium">
                    {dest.country} • {dest.region}
                  </span>
                  <h3 className="font-editorial text-2xl font-normal mt-0.5 leading-tight">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mt-1 font-light">
                    {dest.tagline}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                    <span className="text-gray-400">{dest.suggestedDurationDays} Days</span>
                    <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                      Read Story <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. THE DREAMTRIP EXPERIENCE SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl border p-5 sm:p-10 lg:p-14 relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-r from-[#0B132B] to-[#121B3B] border-[#D4AF37]/30 text-white'
              : 'bg-gradient-to-r from-[#FAF6EE] to-[#EFE7D8] border-[#DFD5C2] text-gray-900'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" /> The DreamTrip Engine
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                Intelligent Itinerary Crafting. <br />
                Tailored to Your Soul's Cadence.
              </h2>
              <p className={`text-xs sm:text-base leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                No cookie-cutter packages or generic itineraries. DreamTrip computes daily routes with Morning, Afternoon, and Evening activities, accurate local expenses, realistic transit times, and customizable schedules.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-[#DFD5C2]'
                  }`}
                >
                  <span className="text-[#D4AF37] font-bold block text-sm">Deterministic</span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Curated real activity sequences</span>
                </div>
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-[#DFD5C2]'
                  }`}
                >
                  <span className="text-[#D4AF37] font-bold block text-sm">Editable</span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Reorder, add or tweak activities</span>
                </div>
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-[#DFD5C2]'
                  }`}
                >
                  <span className="text-[#D4AF37] font-bold block text-sm">Exportable</span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Print or Download Luxury PDF</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onPlanTrip()}
                  className="min-h-[46px] px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-widest font-bold shadow-xl transition-all text-center"
                >
                  Architect Your Itinerary
                </button>
                <button
                  onClick={() => onNavigateTab('budget')}
                  className={`min-h-[46px] px-7 py-3.5 rounded-xl border text-xs uppercase tracking-widest font-semibold transition-all text-center ${
                    isDark
                      ? 'border-white/20 hover:border-[#D4AF37] text-white'
                      : 'border-[#9A7B38]/40 hover:border-[#9A7B38] text-gray-900'
                  }`}
                >
                  Calculate Trip Budget
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className={`relative rounded-2xl overflow-hidden border shadow-2xl p-5 sm:p-6 space-y-4 ${
                  isDark ? 'border-[#D4AF37]/40 bg-black/60 text-white' : 'border-[#DFD5C2] bg-white text-gray-900'
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-3 ${
                    isDark ? 'border-white/10' : 'border-black/10'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#D4AF37]">Sample Plan: Day 1</span>
                  <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Kyoto Heritage</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF6EE] border-[#ECE3D2]'}`}>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Morning</span>
                    <p className="font-semibold">Fushimi Inari Torii Gate Ascent</p>
                    <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Walk thousands of vermilion shrines at dawn.</p>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF6EE] border-[#ECE3D2]'}`}>
                    <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-400">Afternoon</span>
                    <p className="font-semibold">Chado Tea Ceremony in Gion</p>
                    <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Private tea whisking with a 9th-generation master.</p>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF6EE] border-[#ECE3D2]'}`}>
                    <span className="text-[10px] uppercase font-bold text-amber-500 dark:text-amber-400">Evening</span>
                    <p className="font-semibold">Kaiseki Dinner by the Kamogawa</p>
                    <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Seasonal tasting menu on illuminated wooden decks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. INTERACTIVE WORLD EXPLORER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" /> Geographic Interface
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal mt-1">
              Interactive World Explorer
            </h2>
            <p className={`text-xs sm:text-sm mt-2 max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Tap any global pin or use the sanctuary strip below to inspect coordinates, seasonal timing, and launch your itinerary.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('map')}
            className="min-h-[40px] text-xs uppercase tracking-widest font-semibold text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Open Full-Page Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <WorldMap
          onSelectDestination={onSelectDestination}
          onPlanTrip={onPlanTrip}
          isDark={isDark}
          currency={currency}
          embedded={true}
        />
      </section>

      {/* ================= 8. DESTINATION OF THE MONTH ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl">
          <div className="relative min-h-[440px] sm:min-h-[500px] flex items-center">
            <img
              src={destinationOfMonth.heroImage}
              alt={destinationOfMonth.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30 sm:to-transparent" />

            <div className="relative z-10 p-6 sm:p-14 max-w-2xl text-white space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-[#D4AF37]">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Destination of the Month</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-5xl font-normal [text-wrap:balance]">
                {destinationOfMonth.name}, {destinationOfMonth.country}
              </h3>
              <p className="text-sm italic font-serif text-[#D4AF37]">
                "{destinationOfMonth.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                {destinationOfMonth.editorialStory}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-300">
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Best Season</span>
                  <span className="font-semibold text-white">{destinationOfMonth.bestTimeToVisit}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Ideal Stay</span>
                  <span className="font-semibold text-white">{destinationOfMonth.suggestedDurationDays} Days</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onSelectDestination(destinationOfMonth)}
                  className="min-h-[44px] px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-widest font-bold transition-all text-center"
                >
                  Explore Spotlight
                </button>
                <button
                  onClick={() => onPlanTrip(destinationOfMonth)}
                  className="min-h-[44px] px-6 py-3 rounded-xl border border-white/25 hover:border-[#D4AF37] text-white text-xs uppercase tracking-widest font-semibold transition-all text-center"
                >
                  Plan Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. TRAVEL JOURNAL STORIES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              The Travel Journal
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal mt-1">
              Dispatches from the Field
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('journal')}
            className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {JOURNAL_ARTICLES.slice(0, 2).map((art) => (
            <div
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer ${
                isDark ? 'bg-[#0B132B]/60 border-white/10 hover:border-[#D4AF37]' : 'bg-white border-[#E5DEC9] hover:border-[#9A7B38] shadow-sm'
              }`}
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-black/70 text-[#D4AF37] border border-[#D4AF37]/30">
                  {art.category}
                </span>
                <span className="absolute bottom-4 right-4 text-xs text-white/90">
                  {art.readTime}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-editorial text-2xl font-normal group-hover:text-[#D4AF37] transition-colors leading-tight">
                  {art.title}
                </h3>
                <p className={`text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {art.excerpt}
                </p>
                <div className={`mt-4 pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <div className="flex items-center gap-2">
                    <img src={art.author.avatar} alt={art.author.name} referrerPolicy="no-referrer" className="w-6 h-6 rounded-full object-cover" />
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{art.author.name}</span>
                  </div>
                  <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 9. INSPIRATIONAL TRAVEL GALLERY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
            Visual Tapestry
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal mt-1">
            Moments Frozen in Wonder
          </h2>
          <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Cinematic frames captured across our 24 sanctuaries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {DESTINATIONS.slice(0, 8).map((d, idx) => (
            <div
              key={d.id}
              onClick={() => onSelectDestination(d)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                idx === 0 || idx === 7
                  ? 'col-span-2 md:col-span-2 md:row-span-2 h-52 sm:h-64 md:h-96'
                  : idx === 3 || idx === 6
                    ? 'md:col-span-2 md:row-span-2 h-40 sm:h-48 md:h-96'
                    : 'h-40 sm:h-44'
              }`}
            >
              <img
                src={d.heroImage}
                alt={d.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] block">
                    {d.country}
                  </span>
                  <h4 className="font-editorial text-base sm:text-lg text-white font-normal leading-tight">{d.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
