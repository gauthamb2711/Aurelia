import React from 'react';
import { Sparkles, CheckSquare, Compass, Shuffle, BookOpen, ArrowRight } from 'lucide-react';

interface ExperiencesHubPageProps {
  onOpenQuiz: () => void;
  onOpenChecklist: () => void;
  onOpenSerendipity: () => void;
  onNavigateTab: (tab: string) => void;
  isDark: boolean;
}

export const ExperiencesHubPage: React.FC<ExperiencesHubPageProps> = ({
  onOpenQuiz,
  onOpenChecklist,
  onOpenSerendipity,
  onNavigateTab,
  isDark,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className={`text-xs uppercase tracking-[0.3em] font-semibold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
          Interactive Voyager Labs
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          Curated Travel Experiences & Tools
        </h1>
        <p className={`text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Intuitive companion tools designed to spark discovery, simplify expedition preparation, and unveil unexpected corners of our planet.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Tool 1: Soul Quiz */}
        <div
          onClick={onOpenQuiz}
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group ${
            isDark
              ? 'bg-[#0B132B] border-white/10 hover:border-[#D4AF37] text-white'
              : 'bg-white border-[#DFD5C2] hover:border-[#9A7B38] text-gray-900 shadow-sm'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Deterministic Matching
            </span>
            <h3 className="font-editorial text-2xl font-normal mb-2 group-hover:text-[#D4AF37] transition-colors">
              Soul Sanctuary Quiz
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Answer 3 contemplative questions regarding your desired tempo, landscape affinity, and culinary spirit to discover your ideal global sanctuary.
            </p>
          </div>

          <div className={`mt-8 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
            isDark ? 'border-white/10 text-[#D4AF37]' : 'border-black/10 text-[#8A6F32]'
          }`}>
            <span>Take 60-Second Quiz</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Tool 2: Serendipity Roulette */}
        <div
          onClick={onOpenSerendipity}
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group ${
            isDark
              ? 'bg-[#0B132B] border-white/10 hover:border-[#D4AF37] text-white'
              : 'bg-white border-[#DFD5C2] hover:border-[#9A7B38] text-gray-900 shadow-sm'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-500 mb-6">
              <Shuffle className="w-6 h-6" />
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
              Spontaneous Horizon
            </span>
            <h3 className="font-editorial text-2xl font-normal mb-2 group-hover:text-[#D4AF37] transition-colors">
              Serendipity Roulette
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Spin the ancient compass and let random chance introduce you to a remote island, alpine glacial valley, or mystical desert citadel.
            </p>
          </div>

          <div className={`mt-8 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
            isDark ? 'border-white/10 text-[#D4AF37]' : 'border-black/10 text-[#8A6F32]'
          }`}>
            <span>Spin The Compass</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Tool 3: Packing Checklist Generator */}
        <div
          onClick={onOpenChecklist}
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group ${
            isDark
              ? 'bg-[#0B132B] border-white/10 hover:border-[#D4AF37] text-white'
              : 'bg-white border-[#DFD5C2] hover:border-[#9A7B38] text-gray-900 shadow-sm'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-500 mb-6">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Expedition Readiness
            </span>
            <h3 className="font-editorial text-2xl font-normal mb-2 group-hover:text-[#D4AF37] transition-colors">
              Packing Checklist Generator
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Personalized packing protocol spanning high-performance layers, field apothecary, tech, and travel documents with progress tracking.
            </p>
          </div>

          <div className={`mt-8 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
            isDark ? 'border-white/10 text-[#D4AF37]' : 'border-black/10 text-[#8A6F32]'
          }`}>
            <span>Generate Checklist</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </div>
  );
};
