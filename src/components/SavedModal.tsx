import React, { useRef } from 'react';
import { Destination, SavedItinerary } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { X, Bookmark, Trash2, Download, Upload, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { exportItineraryToPDF } from '../utils/pdfGenerator';
import { formatCurrency } from '../utils/calculator';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedDestinationIds: string[];
  savedItineraries: SavedItinerary[];
  onToggleSaveDest: (id: string) => void;
  onDeleteItinerary: (id: string) => void;
  onClearAll: () => void;
  onSelectDest: (dest: Destination) => void;
  onLoadItinerary: (itinerary: SavedItinerary) => void;
  onImportItineraries: (itineraries: SavedItinerary[]) => void;
  isDark: boolean;
  currency: string;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedDestinationIds,
  savedItineraries,
  onToggleSaveDest,
  onDeleteItinerary,
  onClearAll,
  onSelectDest,
  onLoadItinerary,
  onImportItineraries,
  isDark,
  currency,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const savedDestinations = DESTINATIONS.filter((d) => savedDestinationIds.includes(d.id));

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedItineraries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Aurelia_Saved_Journeys_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportItineraries(parsed);
          setImportStatus('Successfully imported journeys.');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Invalid itinerary file format.');
          setTimeout(() => setImportStatus(null), 4000);
        }
      } catch (err) {
        setImportStatus('Failed to parse JSON file.');
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
          isDark ? 'bg-[#0B132B] border-[#D4AF37]/30 text-white' : 'bg-[#FAF8F5] border-[#D6C7B2] text-gray-900'
        }`}
      >
        {/* Header */}
        <div className={`p-4 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <Bookmark className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="font-editorial text-xl sm:text-2xl font-normal leading-tight">
                  Your Saved Sanctuary & Journeys
                </h2>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Stored privately in your browser storage. No cloud tracking.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`sm:hidden p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/10 text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportJSON}
              className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                isDark
                  ? 'border-white/20 hover:border-[#D4AF37] text-gray-300 hover:text-white'
                  : 'border-black/15 hover:border-[#9A7B38] text-gray-700 hover:text-gray-900'
              }`}
              title="Export all itineraries as JSON"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                isDark
                  ? 'border-white/20 hover:border-[#D4AF37] text-gray-300 hover:text-white'
                  : 'border-black/15 hover:border-[#9A7B38] text-gray-700 hover:text-gray-900'
              }`}
              title="Import itineraries from JSON"
            >
              <Upload className="w-3.5 h-3.5" /> Import JSON
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={onClose}
              className={`hidden sm:inline-flex p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/10 text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Tabs / Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {importStatus && (
            <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs text-center font-medium">
              {importStatus}
            </div>
          )}
          
          {/* Section 1: Saved Itineraries */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xs uppercase tracking-widest font-bold flex items-center gap-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                <FileText className="w-4 h-4" /> Custom DreamTrip Plans ({savedItineraries.length})
              </h3>
              {savedItineraries.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-rose-500 hover:text-rose-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              )}
            </div>

            {savedItineraries.length === 0 ? (
              <div className={`p-6 sm:p-8 text-center rounded-2xl border border-dashed ${
                isDark ? 'border-white/15 bg-white/5' : 'border-[#DFD5C2] bg-white'
              }`}>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>No itineraries created yet.</p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Head over to the DreamTrip Planner to architect your bespoke journey and save it here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedItineraries.map((it) => (
                  <div
                    key={it.id}
                    className={`p-4 rounded-2xl border hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between ${
                      isDark ? 'border-white/10 bg-white/5' : 'border-[#DFD5C2] bg-white shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                            {it.destinationName} • {it.country}
                          </span>
                          <h4 className={`font-editorial text-lg font-medium mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {it.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => onDeleteItinerary(it.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete itinerary"
                          aria-label={`Delete itinerary ${it.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className={`mt-3 flex items-center gap-3 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span>{it.travelDays} Days</span>
                        <span>•</span>
                        <span>{it.travelers} Travelers</span>
                        <span>•</span>
                        <span className={isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}>{it.travelStyle}</span>
                      </div>

                      <p className={`mt-2 text-xs font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        Est. {formatCurrency(it.totalEstimatedCostINR, currency)}
                      </p>
                    </div>

                    <div className={`mt-4 pt-3 border-t flex items-center gap-2 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      <button
                        onClick={() => {
                          onLoadItinerary(it);
                          onClose();
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all text-center ${
                          isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-900'
                        }`}
                      >
                        Open in Planner
                      </button>
                      <button
                        onClick={() => exportItineraryToPDF(it)}
                        className="p-2 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-semibold transition-all"
                        title="Download as PDF"
                        aria-label="Download as PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Bookmarked Destinations */}
          <div>
            <h3 className={`text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              <Bookmark className="w-4 h-4" /> Bookmarked Destinations ({savedDestinations.length})
            </h3>

            {savedDestinations.length === 0 ? (
              <div className={`p-6 sm:p-8 text-center rounded-2xl border border-dashed ${
                isDark ? 'border-white/15 bg-white/5' : 'border-[#DFD5C2] bg-white'
              }`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>No destinations bookmarked yet.</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Click the bookmark icon on any destination card to curate your personal bucket list.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedDestinations.map((d) => (
                  <div
                    key={d.id}
                    className={`group relative rounded-xl overflow-hidden border hover:border-[#D4AF37] transition-all cursor-pointer ${
                      isDark ? 'border-white/10 bg-black/40' : 'border-[#DFD5C2] bg-white'
                    }`}
                    onClick={() => {
                      onSelectDest(d);
                      onClose();
                    }}
                  >
                    <div className="h-32 w-full relative">
                      <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSaveDest(d.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-[#D4AF37] hover:bg-black"
                        title="Remove bookmark"
                        aria-label={`Remove bookmark for ${d.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-2 left-3">
                        <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                          {d.country}
                        </span>
                        <h4 className="font-editorial text-base text-white">{d.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-white/10 bg-black/20 text-gray-400' : 'border-black/10 bg-[#EFE8DC] text-gray-600'
        }`}>
          <span>AURELIA Local Vault</span>
          <button onClick={onClose} className={isDark ? 'hover:text-white transition-colors' : 'hover:text-gray-900 font-medium transition-colors'}>
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
