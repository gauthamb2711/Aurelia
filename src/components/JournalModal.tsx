import React from 'react';
import { JournalArticle, Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { X, Clock, Calendar, Bookmark, ArrowRight, Share2, Check } from 'lucide-react';

interface JournalModalProps {
  article: JournalArticle | null;
  onClose: () => void;
  onSelectDestination: (dest: Destination) => void;
  isDark: boolean;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  article,
  onClose,
  onSelectDestination,
  isDark,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const linkedDest = article.destinationId
    ? DESTINATIONS.find((d) => d.id === article.destinationId)
    : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl border shadow-2xl overflow-y-auto flex flex-col ${
          isDark ? 'bg-[#080E1E] border-[#D4AF37]/30 text-white' : 'bg-[#FAF8F5] border-[#D6C7B2] text-gray-900'
        }`}
      >
        {/* Hero Banner */}
        <div className="relative h-72 sm:h-96 w-full flex-shrink-0">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/45 to-black/35" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-black transition-colors border border-white/15"
            aria-label="Close article reader"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-8 right-5 sm:right-8 max-w-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 inline-block mb-3">
              {article.category}
            </span>
            <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Metadata Strip */}
        <div className={`px-5 sm:px-12 py-5 border-b flex flex-wrap items-center justify-between gap-4 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]"
            />
            <div>
              <p className="text-sm font-semibold">{article.author.name}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{article.author.role}</p>
            </div>
          </div>

          <div className={`flex items-center gap-3 sm:gap-4 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {article.publishDate}
            </span>
            <button
              onClick={handleShare}
              className={`p-2 rounded-lg border transition-colors ml-1 ${
                isDark ? 'border-white/10 hover:border-[#D4AF37]' : 'border-black/15 hover:border-[#9A7B38]'
              }`}
              title="Copy Story Link"
              aria-label="Copy story link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Story Body */}
        <div className="px-5 sm:px-12 py-6 sm:py-8 max-w-3xl mx-auto space-y-6">
          <p className={`text-base sm:text-xl font-editorial italic leading-relaxed border-l-2 pl-4 ${
            isDark ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-[#8A6F32] border-[#9A7B38]'
          }`}>
            "{article.excerpt}"
          </p>

          <div className={`space-y-5 text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {article.contentParagraphs.map((para, idx) => (
              <p key={idx} className={idx === 0 ? 'first-letter:text-5xl first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:text-[#D4AF37]' : ''}>
                {para}
              </p>
            ))}
          </div>

          {/* Key Takeaways Card */}
          <div className={`p-5 sm:p-6 rounded-2xl border my-6 sm:my-8 ${
            isDark ? 'bg-white/5 border-[#D4AF37]/30 text-white' : 'bg-[#FAF6EE] border-[#DFD5C2] text-gray-900'
          }`}>
            <h4 className={`text-xs uppercase tracking-widest font-bold mb-3 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Voyager's Field Notes & Etiquette
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {article.keyTakeaways.map((tip, idx) => (
                <li key={idx} className={`flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Link to Destination */}
          {linkedDest && (
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 ${
              isDark ? 'border-white/10 bg-black/40' : 'border-[#DFD5C2] bg-white shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <img
                  src={linkedDest.heroImage}
                  alt={linkedDest.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <span className={`text-[10px] uppercase font-bold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                    Featured Sanctuary
                  </span>
                  <h4 className={`font-editorial text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{linkedDest.name}, {linkedDest.country}</h4>
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectDestination(linkedDest);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#080E1E] text-xs font-semibold hover:bg-[#E5C158] transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Sanctuary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
