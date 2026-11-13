import React from 'react';
import { Destination } from '../types/travel';
import { Bookmark, Star, ArrowRight, MapPin, Sparkles, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface DestinationCardProps {
  destination: Destination;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isDark: boolean;
  layout?: 'grid' | 'list';
  currency?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isSaved,
  onToggleSave,
  onSelect,
  onPlanTrip,
  isDark,
  layout = 'grid',
  currency = 'INR',
}) => {
  const isList = layout === 'list';

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${
        isDark
          ? 'bg-[#0A1022] border-white/10 hover:border-[#D4AF37]/50'
          : 'bg-white border-[#E5DEC9] hover:border-[#9A7B38]/50 shadow-sm'
      } ${isList ? 'flex flex-col md:flex-row gap-6' : 'flex flex-col'}`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isList ? 'md:w-5/12 h-64 md:h-auto min-h-[220px]' : 'h-64 sm:h-72 w-full'}`}>
        <img
          src={destination.heroImage}
          alt={`${destination.name}, ${destination.country}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Scrim Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.2em] text-white/90 drop-shadow-md">
            <span>{destination.region}</span>
            {destination.isHiddenGem && (
              <>
                <span className="text-amber-400" aria-hidden="true">·</span>
                <span className="text-amber-300 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-2.5 h-2.5" /> Hidden Gem
                </span>
              </>
            )}
            {destination.isTrending && (
              <>
                <span className="text-[#D4AF37]" aria-hidden="true">·</span>
                <span className="text-[#D4AF37]">Trending</span>
              </>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(destination.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isSaved
                ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-md'
                : 'bg-black/50 border-white/20 text-white hover:bg-white/20'
            }`}
            aria-label={isSaved ? `Remove ${destination.name} from saved` : `Save ${destination.name}`}
            title={isSaved ? 'Saved' : 'Save destination'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Floating Quick Stats on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium">
              <MapPin className="w-3 h-3 text-amber-300" />
              <span>{destination.country}</span>
            </div>
            <h3 className="font-editorial text-2xl font-normal leading-tight drop-shadow-md">
              {destination.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-xs">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-semibold">{destination.rating.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className={`p-5 flex-1 flex flex-col justify-between ${isList ? 'md:py-6 md:pr-6 md:pl-0' : ''}`}>
        <div>
          <p className={`italic text-xs font-serif mb-2 line-clamp-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
            "{destination.tagline}"
          </p>
          <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {destination.description}
          </p>

          {/* Key Meta Badges */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-[11px]">
            <div className={`p-2 rounded-lg border ${isDark ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-[#FAF6EE] border-[#ECE3D2] text-gray-700'}`}>
              <span className={`text-[10px] uppercase tracking-wider block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Duration</span>
              <span className="font-semibold flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-amber-500" /> {destination.suggestedDurationDays} Days Ideal
              </span>
            </div>
            <div className={`p-2 rounded-lg border ${isDark ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-[#FAF6EE] border-[#ECE3D2] text-gray-700'}`}>
              <span className={`text-[10px] uppercase tracking-wider block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Daily Est.</span>
              <span className={`font-semibold mt-0.5 block ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                ~{formatCurrency(destination.avgDailyCostINR, currency)}
              </span>
            </div>
          </div>

          {/* Style Pills */}
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {destination.travelStyles.slice(0, 3).map((st) => (
              <span
                key={st}
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                  isDark
                    ? 'border-white/10 text-gray-300 bg-white/5'
                    : 'border-black/10 text-gray-700 bg-black/5'
                }`}
              >
                {st}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={`pt-3 border-t flex items-center gap-2 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <button
            onClick={() => onSelect(destination)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-medium tracking-wide border transition-all flex items-center justify-center gap-1.5 ${
              isDark
                ? 'border-white/15 text-white hover:border-[#D4AF37] hover:bg-white/5'
                : 'border-[#9A7B38]/30 text-gray-800 hover:border-[#9A7B38] hover:bg-[#9A7B38]/5'
            }`}
          >
            <span>Story & Details</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onPlanTrip(destination)}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              isDark
                ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E]'
                : 'bg-[#9A7B38] hover:bg-[#85682C] text-white'
            }`}
            title="Generate personalized DreamTrip itinerary"
          >
            Plan Itinerary
          </button>
        </div>
      </div>
    </article>
  );
};
