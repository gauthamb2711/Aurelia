import React, { useState, useEffect } from 'react';
import { Destination, TravelStyle, ItineraryDay, ItineraryActivity, SavedItinerary } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { generateSmartItinerary, formatCurrency } from '../utils/calculator';
import { saveItinerary } from '../utils/storage';
import { exportItineraryToPDF } from '../utils/pdfGenerator';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Printer, 
  Download, 
  BookmarkCheck, 
  MapPin, 
  Clock, 
  Coins, 
  Check, 
  ChevronRight,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DreamTripPageProps {
  initialDestination?: Destination;
  loadedItinerary?: SavedItinerary | null;
  onClearLoadedItinerary?: () => void;
  onOpenSavedModal: () => void;
  onItinerarySaved?: () => void;
  isDark: boolean;
  currency: string;
}

export const DreamTripPage: React.FC<DreamTripPageProps> = ({
  initialDestination,
  loadedItinerary,
  onClearLoadedItinerary,
  onOpenSavedModal,
  onItinerarySaved,
  isDark,
  currency,
}) => {
  // Input parameters
  const [selectedDestId, setSelectedDestId] = useState<string>(
    loadedItinerary?.destinationId || initialDestination?.id || DESTINATIONS[0].id
  );
  const [startingCity, setStartingCity] = useState<string>(
    loadedItinerary?.startingCity || 'Mumbai / International Hub'
  );
  const [daysCount, setDaysCount] = useState<number>(loadedItinerary?.travelDays || 5);
  const [travelersCount, setTravelersCount] = useState<number>(loadedItinerary?.travelers || 2);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(
    loadedItinerary?.travelStyle || 'Luxury'
  );

  // Itinerary state
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  // New activity modal / drawer state
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetDayIndex, setTargetDayIndex] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSlot, setNewSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Afternoon');
  const [newCost, setNewCost] = useState(1500);

  const selectedDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const travelStylesList: TravelStyle[] = [
    'Luxury',
    'Adventure',
    'Culture',
    'Romantic',
    'Nature',
    'Solo',
    'Family',
    'Budget',
  ];

  // Initialize or re-generate
  useEffect(() => {
    if (loadedItinerary) {
      setSelectedDestId(loadedItinerary.destinationId);
      setStartingCity(loadedItinerary.startingCity);
      setDaysCount(loadedItinerary.travelDays);
      setTravelersCount(loadedItinerary.travelers);
      setTravelStyle(loadedItinerary.travelStyle);
      setItineraryDays(loadedItinerary.days);
    } else {
      generateNewPlan();
    }
  }, [loadedItinerary]);

  const generateNewPlan = () => {
    const days = generateSmartItinerary(
      selectedDestination,
      daysCount,
      travelersCount,
      travelStyle,
      startingCity
    );
    setItineraryDays(days);
    setActiveDayIndex(0);
  };

  const handleDestinationChange = (id: string) => {
    setSelectedDestId(id);
    const dest = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];
    const days = generateSmartItinerary(
      dest,
      daysCount,
      travelersCount,
      travelStyle,
      startingCity
    );
    setItineraryDays(days);
    setActiveDayIndex(0);
  };

  // Reorder activity up
  const moveActivityUp = (dayIdx: number, actIdx: number) => {
    if (actIdx === 0) return;
    const updatedDays = [...itineraryDays];
    const activities = [...updatedDays[dayIdx].activities];
    const temp = activities[actIdx];
    activities[actIdx] = activities[actIdx - 1];
    activities[actIdx - 1] = temp;
    updatedDays[dayIdx].activities = activities;
    setItineraryDays(updatedDays);
  };

  // Reorder activity down
  const moveActivityDown = (dayIdx: number, actIdx: number) => {
    const updatedDays = [...itineraryDays];
    const activities = [...updatedDays[dayIdx].activities];
    if (actIdx === activities.length - 1) return;
    const temp = activities[actIdx];
    activities[actIdx] = activities[actIdx + 1];
    activities[actIdx + 1] = temp;
    updatedDays[dayIdx].activities = activities;
    setItineraryDays(updatedDays);
  };

  // Delete activity
  const removeActivity = (dayIdx: number, actId: string) => {
    const updatedDays = [...itineraryDays];
    updatedDays[dayIdx].activities = updatedDays[dayIdx].activities.filter((a) => a.id !== actId);
    // Recalculate day cost
    updatedDays[dayIdx].dayEstimatedCostINR = updatedDays[dayIdx].activities.reduce(
      (sum, a) => sum + a.estimatedCostINR,
      0
    ) * travelersCount;
    setItineraryDays(updatedDays);
  };

  // Add activity submission
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAct: ItineraryActivity = {
      id: `custom-${Date.now()}`,
      timeSlot: newSlot,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom curated exploration.',
      location: newLocation.trim() || selectedDestination.name,
      estimatedCostINR: Number(newCost) || 1200,
      category: 'Custom Experience',
      durationHours: 2,
    };

    const updatedDays = [...itineraryDays];
    updatedDays[targetDayIndex].activities.push(newAct);
    updatedDays[targetDayIndex].dayEstimatedCostINR = updatedDays[targetDayIndex].activities.reduce(
      (sum, a) => sum + a.estimatedCostINR,
      0
    ) * travelersCount;

    setItineraryDays(updatedDays);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewLocation('');
  };

  // Total trip cost
  const totalTripCostINR = itineraryDays.reduce(
    (acc, day) => acc + day.dayEstimatedCostINR,
    0
  );

  // Save to LocalStorage
  const handleSaveItinerary = () => {
    const savedObj: SavedItinerary = {
      id: loadedItinerary?.id || `itinerary-${Date.now()}`,
      title: `${selectedDestination.name} ${travelStyle} Expedition`,
      destinationId: selectedDestination.id,
      destinationName: selectedDestination.name,
      country: selectedDestination.country,
      startingCity,
      travelDays: daysCount,
      travelers: travelersCount,
      travelStyle,
      days: itineraryDays,
      createdAt: new Date().toLocaleDateString(),
      totalEstimatedCostINR: totalTripCostINR,
    };

    saveItinerary(savedObj);
    onItinerarySaved?.();
    setIsSavedFeedback(true);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
    setTimeout(() => setIsSavedFeedback(false), 3000);
  };

  // Export PDF
  const handleExportPDF = () => {
    const itineraryObj: SavedItinerary = {
      id: loadedItinerary?.id || `itinerary-${Date.now()}`,
      title: `${selectedDestination.name} ${travelStyle} Curated Journey`,
      destinationId: selectedDestination.id,
      destinationName: selectedDestination.name,
      country: selectedDestination.country,
      startingCity,
      travelDays: daysCount,
      travelers: travelersCount,
      travelStyle,
      days: itineraryDays,
      createdAt: new Date().toLocaleDateString(),
      totalEstimatedCostINR: totalTripCostINR,
    };
    exportItineraryToPDF(itineraryObj);
  };

  const inputCls = `w-full px-4 py-2.5 rounded-xl border focus:outline-none ${
    isDark ? 'border-white/15 bg-white/5 text-white focus:border-[#D4AF37]' : 'border-black/15 bg-black/5 text-gray-900 focus:border-[#9A7B38]'
  }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className={`text-xs uppercase tracking-[0.3em] font-semibold block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
          Deterministic Recommendation Engine
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal leading-tight [text-wrap:balance]">
          DreamTrip – Bespoke Journey Architect
        </h1>
        <p className={`text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Configure your travel coordinates. Our intelligent algorithm synthesizes cultural pacing, local seasonality, and realistic logistics into a fully editable day-by-day odyssey.
        </p>
      </div>

      {/* Control Panel / Configuration Bar */}
      <div className={`p-5 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
        isDark ? 'bg-[#0B132B] border-white/10' : 'bg-white border-[#DFD5C2]'
      }`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Destination Selector */}
          <div>
            <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Destination Sanctuary
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => handleDestinationChange(e.target.value)}
              aria-label="Select Destination"
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
                isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
              }`}
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  {d.name} ({d.country})
                </option>
              ))}
            </select>
          </div>

          {/* Starting City */}
          <div>
            <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Origin City / Gateway
            </label>
            <input
              type="text"
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              placeholder="e.g. Mumbai, London..."
              className={`w-full py-2.5 px-3 rounded-xl border text-xs focus:outline-none ${
                isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
              }`}
            />
          </div>

          {/* Duration in Days */}
          <div>
            <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Duration: {daysCount} Days
            </label>
            <div className="flex items-center gap-2 min-h-[38px]">
              <input
                type="range"
                min={1}
                max={14}
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <span className={`text-xs font-bold w-6 text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>{daysCount}d</span>
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Travelers: {travelersCount}
            </label>
            <select
              value={travelersCount}
              onChange={(e) => setTravelersCount(Number(e.target.value))}
              aria-label="Number of Travelers"
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
                isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                <option key={n} value={n} className="bg-slate-900 text-white">
                  {n} {n === 1 ? 'Solo Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Style */}
          <div>
            <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Travel Style
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
              aria-label="Travel Style"
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
                isDark ? 'bg-white/5 border-white/15 text-white' : 'bg-black/5 border-black/15 text-gray-900'
              }`}
            >
              {travelStylesList.map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Action Row */}
        <div className={`pt-4 border-t flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={generateNewPlan}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-900'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Regenerate
            </button>
            <button
              onClick={onOpenSavedModal}
              className={`px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                isDark
                  ? 'border-white/20 hover:border-[#D4AF37] text-gray-300 hover:text-white'
                  : 'border-black/15 hover:border-[#9A7B38] text-gray-700 hover:text-gray-900'
              }`}
            >
              Saved Vault
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveItinerary}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                isSavedFeedback
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E]'
              }`}
            >
              {isSavedFeedback ? (
                <>
                  <Check className="w-4 h-4" /> Saved
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4" /> Save Itinerary
                </>
              )}
            </button>

            <button
              onClick={handleExportPDF}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isDark
                  ? 'border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-[#9A7B38]/40 hover:bg-[#9A7B38]/10 text-[#8A6F32]'
              }`}
              title="Download Itinerary as PDF"
              aria-label="Download PDF"
            >
              <Download className="w-4 h-4" /> PDF
            </button>

            <button
              onClick={() => window.print()}
              className={`p-2.5 rounded-xl border text-xs transition-all ${
                isDark ? 'border-white/20 hover:bg-white/10 text-white' : 'border-black/15 hover:bg-black/5 text-gray-700'
              }`}
              title="Print Itinerary"
              aria-label="Print Itinerary"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <img
            src={selectedDestination.heroImage}
            alt={selectedDestination.name}
            className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37] flex-shrink-0"
          />
          <div>
            <span className={`text-[10px] uppercase font-bold tracking-widest block ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
              Planned Expedition
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl font-normal">
              {selectedDestination.name}, {selectedDestination.country}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {daysCount} Days • {travelersCount} Travelers • {travelStyle} Style
            </p>
          </div>
        </div>

        <div className={`w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 text-left sm:text-right ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <span className={`text-[10px] uppercase block font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Total Estimated Odyssey Cost
          </span>
          <span className={`font-editorial text-2xl sm:text-3xl font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {formatCurrency(totalTripCostINR, currency)}
          </span>
          <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            ~{formatCurrency(totalTripCostINR / (travelersCount || 1), currency)} per traveler
          </p>
        </div>
      </div>

      {/* Days Tabs Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-print">
        {itineraryDays.map((day, idx) => (
          <button
            key={day.dayNumber}
            onClick={() => setActiveDayIndex(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all flex items-center gap-2 ${
              activeDayIndex === idx
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080E1E] shadow-md'
                : isDark
                  ? 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                  : 'bg-white border-[#DFD5C2] text-gray-700 hover:border-[#9A7B38]'
            }`}
          >
            <span>Day {day.dayNumber}</span>
            <span className="text-[10px] opacity-75">
              ({formatCurrency(day.dayEstimatedCostINR, currency)})
            </span>
          </button>
        ))}
      </div>

      {/* Active Day View or Full Print Area */}
      <div className="print-area space-y-6 sm:space-y-8">
        {itineraryDays.map((day, dayIdx) => {
          const isVisible = dayIdx === activeDayIndex;

          return (
            <div
              key={day.dayNumber}
              className={`space-y-5 sm:space-y-6 ${isVisible ? 'block' : 'hidden print:block'}`}
            >
              {/* Day Header Banner */}
              <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isDark ? 'bg-[#0B132B]/90 border-[#D4AF37]/30 text-white' : 'bg-[#FAF6EE] border-[#DFD5C2] text-gray-900'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#D4AF37] text-[#080E1E] font-bold text-xs uppercase tracking-wider">
                      Day {day.dayNumber}
                    </span>
                    <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Daily Sequence</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal mt-1">
                    {day.theme}
                  </h3>
                  {day.notes && (
                    <p className={`text-xs mt-1 italic font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{day.notes}</p>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-black/10 dark:border-white/10">
                  <div className="text-left sm:text-right">
                    <span className={`text-[10px] uppercase block font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Day Total ({travelersCount} pax)
                    </span>
                    <span className={`font-semibold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {formatCurrency(day.dayEstimatedCostINR, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setTargetDayIndex(dayIdx);
                      setShowAddModal(true);
                    }}
                    className="no-print px-3.5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] text-xs font-semibold flex items-center gap-1.5 transition-all"
                    title="Add Activity to this Day"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Activity
                  </button>
                </div>
              </div>

              {/* Activities Timeline Cards */}
              <div className="space-y-4">
                {day.activities.map((act, actIdx) => (
                  <div
                    key={act.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-white/5 border-white/10 hover:border-white/20 text-white'
                        : 'bg-white border-[#DFD5C2] text-gray-900 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 w-full">
                      {/* Slot Badge */}
                      <div className={`px-2.5 py-1 rounded-lg text-center text-[11px] font-bold uppercase tracking-wider flex-shrink-0 ${
                        act.timeSlot === 'Morning'
                          ? isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-800 border border-amber-300'
                          : act.timeSlot === 'Afternoon'
                            ? isDark ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-sky-100 text-sky-800 border border-sky-300'
                            : isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                      }`}>
                        {act.timeSlot}
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-editorial text-lg sm:text-xl font-normal leading-tight">
                            {act.title}
                          </h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isDark ? 'bg-white/10 text-gray-300' : 'bg-black/5 text-gray-700'
                          }`}>
                            {act.category}
                          </span>
                        </div>
                        <p className={`text-xs max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {act.description}
                        </p>
                        <div className={`flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] pt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" /> {act.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4AF37]" /> ~{act.durationHours} hrs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cost & Reorder Controls */}
                    <div className={`flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 ${
                      isDark ? 'border-white/10' : 'border-black/10'
                    }`}>
                      <div className="text-left md:text-right flex-shrink-0">
                        <span className={`text-[10px] uppercase block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Est. Cost / pax</span>
                        <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          {formatCurrency(act.estimatedCostINR, currency)}
                        </span>
                      </div>

                      {/* Reorder and Delete (no-print) */}
                      <div className="flex items-center gap-1.5 no-print">
                        <button
                          onClick={() => moveActivityUp(dayIdx, actIdx)}
                          disabled={actIdx === 0}
                          className={`p-2 rounded-lg border disabled:opacity-30 ${
                            isDark
                              ? 'border-white/10 hover:border-white/30 text-gray-400 hover:text-white'
                              : 'border-black/15 hover:border-black/30 text-gray-600 hover:text-gray-900'
                          }`}
                          title="Move earlier"
                          aria-label="Move activity earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveActivityDown(dayIdx, actIdx)}
                          disabled={actIdx === day.activities.length - 1}
                          className={`p-2 rounded-lg border disabled:opacity-30 ${
                            isDark
                              ? 'border-white/10 hover:border-white/30 text-gray-400 hover:text-white'
                              : 'border-black/15 hover:border-black/30 text-gray-600 hover:text-gray-900'
                          }`}
                          title="Move later"
                          aria-label="Move activity later"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeActivity(dayIdx, act.id)}
                          className="p-2 rounded-lg border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 ml-1"
                          title="Remove activity"
                          aria-label="Remove activity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 ${
            isDark ? 'bg-[#0B132B] border-[#D4AF37]/30 text-white' : 'bg-[#FAF8F5] border-[#DFD5C2] text-gray-900'
          }`}>
            <h3 className="font-editorial text-2xl font-normal mb-1">
              Add Activity to Day {targetDayIndex + 1}
            </h3>
            <p className={`text-xs mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Incorporate an unscripted tea tasting, private viewpoint, or leisurely sunset stroll.
            </p>

            <form onSubmit={handleAddActivity} className="space-y-4 text-xs">
              <div>
                <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                  Activity Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sunrise Yoga overlooking the Aravalis..."
                  className={inputCls}
                />
              </div>

              <div>
                <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                  Time Slot
                </label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value as any)}
                  className={inputCls}
                >
                  <option value="Morning" className="bg-slate-900 text-white">Morning</option>
                  <option value="Afternoon" className="bg-slate-900 text-white">Afternoon</option>
                  <option value="Evening" className="bg-slate-900 text-white">Evening</option>
                </select>
              </div>

              <div>
                <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                  Location / Monument
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Gangaur Ghat, Udaipur"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detailed notes for the traveler..."
                  className={inputCls}
                />
              </div>

              <div>
                <label className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isDark ? 'text-[#D4AF37]' : 'text-[#8A6F32]'}`}>
                  Estimated Cost (INR per person)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className={inputCls}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-xl ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] font-bold"
                >
                  Confirm & Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
