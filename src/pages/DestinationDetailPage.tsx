import React, { useState, useEffect } from 'react';
import { Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Utensils, 
  ShieldCheck, 
  Sun, 
  Check 
} from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface DestinationDetailPageProps {
  destination: Destination;
  onBack: () => void;
  onPlanTrip: (dest: Destination) => void;
  onSelectDestination: (dest: Destination) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  isDark: boolean;
  currency: string;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  destination,
  onBack,
  onPlanTrip,
  onSelectDestination,
  isSaved,
  onToggleSave,
  isDark,
  currency,
}) => {
  const [activePhoto, setActivePhoto] = useState(destination.heroImage);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActivePhoto(destination.heroImage);
  }, [destination.id, destination.heroImage]);

  const relatedDestinations = DESTINATIONS.filter(
    (d) => d.id !== destination.id && (d.region === destination.region || d.travelStyles.some((s) => destination.travelStyles.includes(s)))
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 animate-fade-in">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[76vh] sm:h-[80vh] min-h-[520px] w-full overflow-hidden -mt-16 lg:-mt-20 pt-16 lg:pt-20">
        <img
          src={activePhoto}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/55 to-black/35" />

        {/* Back and Action Buttons */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between gap-2 z-20">
          <button
            onClick={onBack}
            className="px-3.5 sm:px-4 py-2 min-h-[40px] rounded-full backdrop-blur-md bg-black/65 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 hover:bg-black/85 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden xs:inline">Back to </span>Destinations
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-black/65 border border-white/20 text-white hover:bg-white/20 transition-all"
              title="Share Sanctuary"
              aria-label="Share sanctuary link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md border transition-all ${
                isSaved
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080E1E]'
                  : 'bg-black/65 border-white/20 text-white hover:bg-white/20'
              }`}
              title={isSaved ? 'Bookmarked' : 'Bookmark Sanctuary'}
              aria-label="Toggle bookmark"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Bottom Hero Overlay */}
        <div className="absolute bottom-8 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8 max-w-4xl text-white space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 flex-wrap text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#D4AF37] drop-shadow-md">
            <span>{destination.region}</span>
            <span className="text-white/40" aria-hidden="true">·</span>
            <span>{destination.country}</span>
            {destination.isHiddenGem && (
              <>
                <span className="text-white/40" aria-hidden="true">·</span>
                <span className="text-amber-300 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" /> Hidden Gem
                </span>
              </>
            )}
            <span className="text-white/40" aria-hidden="true">·</span>
            <span className="text-white/90 font-normal flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {destination.rating.toFixed(2)} ({destination.reviewsCount})
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal leading-tight [text-wrap:balance]">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-xl font-serif italic text-amber-200/90 font-light max-w-2xl">
            "{destination.tagline}"
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onPlanTrip(destination)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-widest font-bold shadow-xl transition-all text-center"
            >
              Plan DreamTrip for {destination.name}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT BODY ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Photo Gallery Switcher */}
        {destination.gallery.length > 0 && (
          <div>
            <h3 className={`text-xs uppercase tracking-widest font-bold mb-3 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Sanctuary Gallery
            </h3>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActivePhoto(destination.heroImage)}
                className={`relative w-24 h-16 sm:w-36 sm:h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activePhoto === destination.heroImage ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-65 hover:opacity-100'
                }`}
              >
                <img src={destination.heroImage} alt="Main" className="w-full h-full object-cover" />
              </button>
              {destination.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(img)}
                  className={`relative w-24 h-16 sm:w-36 sm:h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activePhoto === img ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editorial Story & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className={`text-xs uppercase tracking-[0.2em] font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                Editorial Perspective
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal mt-1">
                The Soul of {destination.name}
              </h2>
            </div>

            <p className={`font-editorial text-lg sm:text-xl italic border-l-2 pl-4 leading-relaxed ${
              isDark ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-[#8A6F32] border-[#9A7B38]'
            }`}>
              "{destination.editorialStory}"
            </p>

            <p className={`text-sm sm:text-base leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {destination.description}
            </p>

            {/* Travel Styles */}
            <div className="pt-2">
              <span className={`text-xs uppercase tracking-wider font-semibold block mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Ideal For Travelers Seeking:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {destination.travelStyles.map((st) => (
                  <span
                    key={st}
                    className={`text-xs px-3 py-1 rounded-full border ${
                      isDark ? 'border-white/10 bg-white/5 text-gray-200' : 'border-[#DFD5C2] bg-[#FAF6EE] text-gray-800'
                    }`}
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics & Climate Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`p-6 rounded-3xl border ${
              isDark ? 'bg-[#0B132B] border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
            }`}>
              <h3 className={`text-xs uppercase tracking-widest font-bold mb-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                Voyager Quick Brief
              </h3>

              <div className="space-y-4 text-xs">
                <div className={`flex items-start justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <span className={`flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock className="w-4 h-4 text-[#D4AF37]" /> Recommended Stay
                  </span>
                  <span className="font-bold">{destination.suggestedDurationDays} Days Ideal</span>
                </div>

                <div className={`flex items-start justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <span className={`flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Sun className="w-4 h-4 text-[#D4AF37]" /> Best Season
                  </span>
                  <span className="font-bold text-right max-w-[180px]">{destination.bestTimeToVisit}</span>
                </div>

                <div className={`flex items-start justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Budget Tier</span>
                  <span className={`font-bold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>{destination.estimatedBudgetTier}</span>
                </div>

                <div className={`flex items-start justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Est. Daily Cost</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    ~{formatCurrency(destination.avgDailyCostINR, currency)} / person
                  </span>
                </div>

                <div className="pt-2">
                  <span className={`block mb-1 font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Climate & Packing:</span>
                  <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {destination.climateInfo.tempRange} • {destination.climateInfo.packingAdvice}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onPlanTrip(destination)}
                className="w-full mt-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-widest font-bold transition-all text-center"
              >
                Launch DreamTrip Planner
              </button>
            </div>
          </div>
        </div>

        {/* Main Attractions */}
        <div>
          <div className="mb-6 sm:mb-8">
            <span className={`text-xs uppercase tracking-[0.2em] font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Key Landmarks
            </span>
            <h2 className="font-editorial text-3xl font-normal mt-1">
              Main Attractions & Monuments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {destination.mainAttractions.map((attr, idx) => (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#DFD5C2] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                    {attr.category || 'Highlight'}
                  </span>
                  {attr.duration && (
                    <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{attr.duration}</span>
                  )}
                </div>
                <h4 className={`font-editorial text-xl font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {attr.name}
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {attr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Gastronomy & Food Highlights */}
        <div>
          <div className="mb-6 sm:mb-8">
            <span className={`text-xs uppercase tracking-[0.2em] font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Sensory Table
            </span>
            <h2 className="font-editorial text-3xl font-normal mt-1 flex items-center gap-2">
              <Utensils className="w-6 h-6 text-[#D4AF37]" /> Local Gastronomy & Delicacies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {destination.foodHighlights.map((food, idx) => (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border ${
                  isDark ? 'bg-[#0B132B]/60 border-white/10' : 'bg-white border-[#DFD5C2] shadow-sm'
                }`}
              >
                <h4 className={`font-editorial text-xl font-normal ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {food.dish}
                </h4>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {food.desc}
                </p>
                {food.recommendedSpot && (
                  <p className={`text-[11px] font-medium mt-3 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                    Recommended Spot: {food.recommendedSpot}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Travel Tips Strip */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          isDark ? 'bg-white/5 border-[#D4AF37]/30' : 'bg-[#FAF6EE] border-[#DFD5C2]'
        }`}>
          <h3 className={`text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
            <ShieldCheck className="w-4 h-4" /> Discerning Traveler Field Tips
          </h3>
          <ul className={`space-y-3 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {destination.travelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#D4AF37] font-bold text-base leading-none">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Sanctuaries */}
        {relatedDestinations.length > 0 && (
          <div>
            <div className="mb-6 sm:mb-8">
              <span className={`text-xs uppercase tracking-[0.2em] font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                Further Exploration
              </span>
              <h2 className="font-editorial text-3xl font-normal mt-1">
                You May Also Be Drawn To
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDestinations.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectDestination(rel)}
                  className={`group relative rounded-2xl overflow-hidden border cursor-pointer h-72 sm:h-80 shadow-md ${
                    isDark ? 'border-white/10' : 'border-[#DFD5C2]'
                  }`}
                >
                  <img
                    src={rel.heroImage}
                    alt={rel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                      {rel.country}
                    </span>
                    <h4 className="font-editorial text-2xl font-normal">{rel.name}</h4>
                    <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">{rel.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
