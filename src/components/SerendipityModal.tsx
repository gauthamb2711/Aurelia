import React, { useState } from 'react';
import { Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { X, Sparkles, RefreshCw, ArrowRight, Compass, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SerendipityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isDark: boolean;
}

export const SerendipityModal: React.FC<SerendipityModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onPlanTrip,
  isDark,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [revealedDest, setRevealedDest] = useState<Destination | null>(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    setSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const rand = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
      setRevealedDest(rand);
      counter++;
      if (counter > 14) {
        clearInterval(interval);
        setSpinning(false);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#10B981', '#F59E0B']
          });
        } catch (e) {
          // ignore
        }
      }
    }, 90);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-5 sm:p-8 text-center ${
          isDark ? 'bg-[#0B132B] border-[#D4AF37]/30 text-white' : 'bg-[#FAF8F5] border-[#D6C7B2] text-gray-900'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/10 text-gray-500 hover:text-gray-900'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Serendipity Roulette
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-normal mb-2">
          Let Fate Choose Your Horizon
        </h3>
        <p className={`text-xs sm:text-sm max-w-md mx-auto mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Sometimes the most profound journeys begin without a map or premeditated agenda.
        </p>

        {revealedDest ? (
          <div className="animate-fade-in mb-4 sm:mb-6">
            <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-xl mb-4 group">
              <img
                src={revealedDest.heroImage}
                alt={revealedDest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-left">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {revealedDest.country} • {revealedDest.region}
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl text-white font-normal mt-0.5">
                  {revealedDest.name}
                </h4>
                <p className="text-xs text-amber-200/90 italic font-serif">
                  "{revealedDest.tagline}"
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onSelectDestination(revealedDest);
                  onClose();
                }}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold border transition-all ${
                  isDark ? 'border-white/20 hover:border-[#D4AF37] text-white' : 'border-black/20 hover:border-[#9A7B38] text-gray-900'
                }`}
              >
                Explore Sanctuary
              </button>
              <button
                onClick={() => {
                  onPlanTrip(revealedDest);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#D4AF37] text-[#080E1E] hover:bg-[#E5C158] transition-all"
              >
                Plan Journey
              </button>
              <button
                onClick={handleSpin}
                disabled={spinning}
                className={`p-2.5 rounded-xl transition-all ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/15 text-gray-900'
                }`}
                title="Spin Again"
                aria-label="Spin again"
              >
                <RefreshCw className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-10 sm:py-12">
            <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-[#D4AF37] flex items-center justify-center mb-6 text-[#D4AF37]">
              <Compass className={`w-12 h-12 ${spinning ? 'animate-spin text-amber-300' : ''}`} />
            </div>

            <button
              onClick={handleSpin}
              disabled={spinning}
              className="px-8 py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" /> Spin The Compass
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
