import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/journalData';
import { JournalArticle } from '../types/travel';
import { BookOpen, Clock, Calendar, ArrowRight, User } from 'lucide-react';

interface JournalPageProps {
  onOpenArticle: (art: JournalArticle) => void;
  isDark: boolean;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  onOpenArticle,
  isDark,
}) => {
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Cultural Discovery', 'Gastronomy', 'Destination Guide', 'Adventure'];

  const filteredArticles = JOURNAL_ARTICLES.filter(
    (art) => selectedCat === 'All' || art.category === selectedCat
  );

  const featured = JOURNAL_ARTICLES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Editorial Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className={`text-xs uppercase tracking-[0.3em] font-semibold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
          Slow Travel & Anthropology
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          The Aurelia Journal
        </h1>
        <p className={`text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Immersive essays, culinary investigations, and contemplative memoirs from writers who slow down to listen to the whispers of ancient places.
        </p>
      </div>

      {/* Featured Cover Story */}
      {featured && (
        <div
          onClick={() => onOpenArticle(featured)}
          className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl group cursor-pointer"
        >
          <div className="relative h-[400px] sm:h-[480px] w-full">
            <img
              src={featured.heroImage}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

            <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-12 right-5 sm:right-12 max-w-3xl text-white space-y-2.5 sm:space-y-3">
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#D4AF37] px-3 py-1 rounded-full bg-black/60 border border-[#D4AF37]/30 inline-block">
                Cover Story • {featured.category}
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-normal leading-tight">
                {featured.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light line-clamp-2 max-w-2xl">
                {featured.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div className="text-xs">
                    <p className="font-semibold">{featured.author.name}</p>
                    <p className="text-[10px] text-gray-400">{featured.readTime} • {featured.publishDate}</p>
                  </div>
                </div>

                <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Read Full Essay <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedCat === cat
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080E1E]'
                : isDark
                  ? 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                  : 'bg-white border-[#DFD5C2] text-gray-700 hover:border-[#9A7B38]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => onOpenArticle(art)}
            className={`rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
              isDark
                ? 'bg-[#0B132B] border-white/10 hover:border-[#D4AF37]/50 text-white'
                : 'bg-white border-[#DFD5C2] hover:border-[#9A7B38]/50 text-gray-900 shadow-sm'
            }`}
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-black/60 text-[#D4AF37] border border-white/20">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] text-gray-300">
                  {art.readTime}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="font-editorial text-2xl font-normal group-hover:text-[#D4AF37] transition-colors leading-tight">
                  {art.title}
                </h3>
                <p className={`text-xs line-clamp-3 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className={`p-5 sm:p-6 pt-3 border-t flex items-center justify-between text-xs mt-2 ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <div className="flex items-center gap-2">
                <img src={art.author.avatar} alt={art.author.name} className="w-6 h-6 rounded-full object-cover" />
                <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{art.author.name}</span>
              </div>
              <span className={`font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${
                isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'
              }`}>
                Read Story <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
