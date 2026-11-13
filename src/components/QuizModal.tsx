import React, { useState } from 'react';
import { Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Compass } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isDark: boolean;
}

interface Question {
  id: number;
  text: string;
  subtext: string;
  options: {
    label: string;
    description: string;
    tag: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What kind of scenery speaks to your innermost soul?',
    subtext: 'Choose the landscape where your thoughts find absolute clarity.',
    options: [
      { label: 'High Alpine Crags & Glacial Lakes', description: 'Towering peaks, pristine glacial air, silent valleys', tag: 'alpine' },
      { label: 'Ancient Sun-Drenched Heritage & Palaces', description: 'Intricate marble courtyards, living traditions, regal history', tag: 'heritage' },
      { label: 'Pastel Mediterranean Cliffs & Coastlines', description: 'Cobalt sea, lemon groves, clifftop aperitivos', tag: 'mediterranean' },
      { label: 'Pristine Coral Lagoons & Remote Karsts', description: 'Turquoise waters, manta rays, island isolation', tag: 'ocean' },
    ],
  },
  {
    id: 2,
    text: 'What rhythm of travel do you crave on this journey?',
    subtext: 'How do you prefer your hours to unfold?',
    options: [
      { label: 'Slow, contemplative immersion & mindfulness', description: 'Tea ceremonies, quiet temples, wandering hidden gardens', tag: 'mindful' },
      { label: 'Epic expeditions & heart-pounding exploration', description: 'High passes, rugged hikes, wild open savannahs', tag: 'adventure' },
      { label: 'Refined hedonism & Michelin-starred luxury', description: 'Exclusive suites, private boat charters, vineyard estates', tag: 'luxury' },
      { label: 'Off-grid secrets & mystical desert silences', description: 'Stargazing, salt flats, ancient canyon caves', tag: 'mystic' },
    ],
  },
  {
    id: 3,
    text: 'Which culinary memory would you cherish most?',
    subtext: 'Gastronomy is the shortest path to a culture’s heart.',
    options: [
      { label: 'Multi-course seasonal Kaiseki or Royal Mewari feasts', description: 'Hyper-seasonal dishes served with royal ceremonial grace', tag: 'royal_dining' },
      { label: 'Fresh seafood & chilled white wine beside coastal waves', description: 'Grilled catch-of-the-day under bougainvillea pergolas', tag: 'coastal_dining' },
      { label: 'Steaming noodles & aromatic mountain teas by a hearth fire', description: 'Hearty restorative broths after a long crisp mountain walk', tag: 'mountain_dining' },
      { label: 'Spiced desert tagines roasted under the sand embers', description: 'Slow-simmered ancient spices shared under midnight constellations', tag: 'desert_dining' },
    ],
  },
];

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onPlanTrip,
  isDark,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [resultDestination, setResultDestination] = useState<Destination | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (tag: string) => {
    const updated = [...selectedAnswers, tag];
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Deterministic matching based on answers
      calculateMatch(updated);
    }
  };

  const calculateMatch = (answers: string[]) => {
    // Scoring logic
    let matchedId = 'kyoto-japan';

    if (answers.includes('alpine') && answers.includes('adventure')) {
      matchedId = 'swiss-alps-lauterbrunnen';
    } else if (answers.includes('alpine')) {
      matchedId = 'banff-canada';
    } else if (answers.includes('mediterranean') || answers.includes('coastal_dining')) {
      matchedId = 'amalfi-coast-italy';
    } else if (answers.includes('heritage') && (answers.includes('royal_dining') || answers.includes('luxury'))) {
      matchedId = 'udaipur-india';
    } else if (answers.includes('ocean')) {
      matchedId = 'raja-ampat-indonesia';
    } else if (answers.includes('mystic') || answers.includes('desert_dining')) {
      matchedId = 'petra-wadi-rum-jordan';
    } else if (answers.includes('mindful')) {
      matchedId = 'kyoto-japan';
    } else {
      matchedId = 'patagonia-torres-del-paine';
    }

    const found = DESTINATIONS.find((d) => d.id === matchedId) || DESTINATIONS[0];
    setResultDestination(found);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultDestination(null);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-5 sm:p-8 ${
          isDark ? 'bg-[#0B132B] border-[#D4AF37]/30 text-white' : 'bg-[#FAF8F5] border-[#D6C7B2] text-gray-900'
        }`}
      >
        <button
          onClick={onClose}
          className={`sticky top-0 float-right p-2 rounded-full transition-colors ${
            isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/10 text-gray-500 hover:text-gray-900'
          }`}
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!resultDestination ? (
          <div>
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className={`text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                <Compass className="w-4 h-4" /> Destination Intuition Quiz
              </span>
              <span className="text-xs text-gray-500">
                • Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question */}
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight mb-2">
              {QUIZ_QUESTIONS[currentStep].text}
            </h3>
            <p className={`text-xs sm:text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {QUIZ_QUESTIONS[currentStep].subtext}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.tag}
                  onClick={() => handleSelectOption(opt.tag)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-start justify-between gap-3 group ${
                    isDark
                      ? 'border-white/10 hover:border-[#D4AF37] bg-white/5 hover:bg-white/10'
                      : 'border-[#DFD5C2] hover:border-[#9A7B38] bg-white hover:bg-[#FAF6EE]'
                  }`}
                >
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base group-hover:text-[#D4AF37] transition-colors">
                      {opt.label}
                    </h4>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{opt.description}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 text-[#D4AF37] transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Revealed */
          <div className="text-center animate-fade-in py-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> 98% Soul Alignment Match
            </div>

            <h3 className="font-editorial text-2xl sm:text-4xl font-normal mb-2">
              Your Sanctuary Awaits: {resultDestination.name}
            </h3>
            <p className={`text-xs sm:text-sm italic font-serif mb-6 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              "{resultDestination.tagline}"
            </p>

            <div className="relative rounded-2xl overflow-hidden h-52 sm:h-60 w-full mb-6 border border-white/20 shadow-xl">
              <img
                src={resultDestination.heroImage}
                alt={resultDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs text-gray-200 text-left line-clamp-2">
                  {resultDestination.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onSelectDestination(resultDestination);
                  onClose();
                }}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold border transition-all ${
                  isDark ? 'border-white/20 hover:border-[#D4AF37] text-white' : 'border-black/20 hover:border-[#9A7B38] text-gray-900'
                }`}
              >
                Explore Story & Details
              </button>
              <button
                onClick={() => {
                  onPlanTrip(resultDestination);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold bg-[#D4AF37] text-[#080E1E] hover:bg-[#E5C158] transition-all"
              >
                Plan DreamTrip Now
              </button>
              <button
                onClick={handleReset}
                className={`p-3 rounded-xl transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                title="Retake Quiz"
                aria-label="Retake quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
