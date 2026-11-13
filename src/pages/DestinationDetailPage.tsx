import React, { useState } from 'react';
import { Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Utensils, 
  Compass, 
  ShieldCheck, 
  Sun, 
  Check, 
  ChevronRight 
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

  // Related destinations
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
    <div className="space-y-16 pb-20 animate-fade-in">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[80vh] min-h-[550px] w-full overflow-hidden -mt-20 pt-20">
        <img
          src={activePhoto}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/50 to-black/30" />

        {/* Back and Action Buttons */}
        <div className="absolute top-24 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full backdrop-blur-md bg-black/60 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 hover:bg-black/80 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Destinations
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full backdrop-blur-md bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all"
              title="Share Sanctuary"
              aria-label="Share sanctuary link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                isSaved
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080E1E]'
                  : 'bg-black/60 border-white/20 text-white hover:bg-white/20'
              }`}
              title={isSaved ? 'Bookmarked' : 'Bookmark Sanctuary'}
              aria-label="Toggle bookmark"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Bottom Hero Overlay */}
        <div className="absolute bottom-10 left-4 sm:left-8 right-4 sm:right-8 max-w-4xl text-white space-y-4">
          <div className="flex items-center gap-2 flex-wrap text-xs uppercase font-bold tracking-[0.25em] text-[#D4AF37] drop-shadow-md">
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
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {destination.rating.toFixed(2)} ({destination.reviewsCount} reviews)
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal leading-tight [text-wrap:balance]">
            {destination.name}
          </h1>

          <p className="text-base sm:text-xl font-serif italic text-amber-200/90 font-light max-w-2xl">
            "{destination.tagline}"
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onPlanTrip(destination)}
              className="px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-widest font-bold shadow-xl transition-all"
            >
              Plan DreamTrip for {destination.name}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT BODY ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Photo Gallery Switcher */}
        {destination.gallery.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-3">
              Sanctuary Gallery
            </h3>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActivePhoto(destination.heroImage)}
                className={`relative w-24 h-16 sm:w-36 sm:h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activePhoto === destination.heroImage ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={destination.heroImage} alt="Main" className="w-full h-full object-cover" />
              </button>
              {destination.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(img)}
                  className={`relative w-24 h-16 sm:w-36 sm:h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activePhoto === img ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editorial Story & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
                Editorial Perspective
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal mt-1">
                The Soul of {destination.name}
              </h2>
            </div>

            <p className="font-editorial text-xl italic text-[#D4AF37] border-l-2 border-[#D4AF37] pl-4 leading-relaxed">
              "{destination.editorialStory}"
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-gray-300 font-light">
              {destination.description}
            </p>

            {/* Travel Styles */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-2">
                Ideal For Travelers Seeking:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {destination.travelStyles.map((st) => (
                  <span
                    key={st}
                    className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-200"
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
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">
                Voyager Quick Brief
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4AF37]" /> Recommended Stay
                  </span>
                  <span className="font-bold">{destination.suggestedDurationDays} Days Ideal</span>
                </div>

                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-[#D4AF37]" /> Best Season
                  </span>
                  <span className="font-bold text-right max-w-[180px]">{destination.bestTimeToVisit}</span>
                </div>

                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <span className="text-gray-400">Budget Tier</span>
                  <span className="font-bold text-[#D4AF37]">{destination.estimatedBudgetTier}</span>
                </div>

                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <span className="text-gray-400">Est. Daily Cost</span>
                  <span className="font-bold text-emerald-400">
                    ~{formatCurrency(destination.avgDailyCostINR, currency)} / person
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-gray-400 block mb-1 font-semibold">Climate & Packing:</span>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {destination.climateInfo.tempRange} • {destination.climateInfo.packingAdvice}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onPlanTrip(destination)}
                className="w-full mt-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-widest font-bold transition-all text-center"
              >
                Launch DreamTrip Planner
              </button>
            </div>
          </div>
        </div>

        {/* Main Attractions */}
        <div>
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              Key Landmarks
            </span>
            <h2 className="font-editorial text-3xl font-normal mt-1">
              Main Attractions & Monuments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.mainAttractions.map((attr, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#DFD5C2] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                    {attr.category || 'Highlight'}
                  </span>
                  {attr.duration && (
                    <span className="text-[10px] text-gray-400">{attr.duration}</span>
                  )}
                </div>
                <h4 className="font-editorial text-xl font-medium text-white mb-2">
                  {attr.name}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {attr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Gastronomy & Food Highlights */}
        <div>
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
              Sensory Table
            </span>
            <h2 className="font-editorial text-3xl font-normal mt-1 flex items-center gap-2">
              <Utensils className="w-6 h-6 text-[#D4AF37]" /> Local Gastronomy & Delicacies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.foodHighlights.map((food, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#0B132B]/60 border-white/10' : 'bg-white border-[#DFD5C2]'
                }`}
              >
                <h4 className="font-editorial text-xl font-normal text-white">
                  {food.dish}
                </h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  {food.desc}
                </p>
                {food.recommendedSpot && (
                  <p className="text-[11px] text-[#D4AF37] font-medium mt-3">
                    Recommended Spot: {food.recommendedSpot}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Travel Tips Strip */}
        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-white/5 border-[#D4AF37]/30' : 'bg-[#FAF6EE] border-[#DFD5C2]'
        }`}>
          <h3 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Discerning Traveler Field Tips
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
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
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
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
                  className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer h-80 shadow-md"
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
