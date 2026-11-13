/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Destination, JournalArticle, SavedItinerary } from './types/travel';
import { DESTINATIONS } from './data/destinationsData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { WorldMap } from './components/WorldMap';
import { DreamTripPage } from './pages/DreamTripPage';
import { TripBudgetPage } from './pages/TripBudgetPage';
import { ComparePage } from './pages/ComparePage';
import { HiddenGemsPage } from './pages/HiddenGemsPage';
import { JournalPage } from './pages/JournalPage';
import { ExperiencesHubPage } from './pages/ExperiencesHubPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { SavedModal } from './components/SavedModal';
import { QuizModal } from './components/QuizModal';
import { ChecklistModal } from './components/ChecklistModal';
import { SerendipityModal } from './components/SerendipityModal';
import { JournalModal } from './components/JournalModal';
import {
  getSavedDestinationIds,
  toggleSaveDestination,
  getSavedItineraries,
  deleteSavedItinerary,
  clearAllSavedItineraries,
  saveItinerary,
  getStoredTheme,
  setStoredTheme,
  addRecentDestinationId,
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [plannedDestination, setPlannedDestination] = useState<Destination | undefined>(undefined);
  const [loadedItinerary, setLoadedItinerary] = useState<SavedItinerary | null>(null);

  // Storage synced states
  const [savedDestIds, setSavedDestIds] = useState<string[]>([]);
  const [savedItins, setSavedItins] = useState<SavedItinerary[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currency, setCurrency] = useState<string>('INR');
  const [exploreFilter, setExploreFilter] = useState<{ style?: string; region?: string; query?: string }>({});

  // Sync dark class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Modals state
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isSerendipityModalOpen, setIsSerendipityModalOpen] = useState(false);
  const [activeArticleModal, setActiveArticleModal] = useState<JournalArticle | null>(null);

  // Initialize storage
  useEffect(() => {
    setSavedDestIds(getSavedDestinationIds());
    setSavedItins(getSavedItineraries());
    setTheme(getStoredTheme());
  }, []);

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStoredTheme(next);
  };

  const handleToggleSaveDestination = (id: string) => {
    toggleSaveDestination(id);
    setSavedDestIds(getSavedDestinationIds());
  };

  const handleDeleteItinerary = (id: string) => {
    deleteSavedItinerary(id);
    setSavedItins(getSavedItineraries());
  };

  const handleClearAllItineraries = () => {
    clearAllSavedItineraries();
    setSavedItins([]);
  };

  const handleImportItineraries = (imported: SavedItinerary[]) => {
    imported.forEach((it) => saveItinerary(it));
    setSavedItins(getSavedItineraries());
  };

  // Navigation handlers
  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    addRecentDestinationId(dest.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanTrip = (dest?: Destination) => {
    if (dest) {
      setPlannedDestination(dest);
    }
    setSelectedDestination(null);
    setCurrentTab('dreamtrip');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSavedItinerary = (itinerary: SavedItinerary) => {
    setLoadedItinerary(itinerary);
    setSelectedDestination(null);
    setCurrentTab('dreamtrip');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setSelectedDestination(null);
  };

  const handleTabChange = (tab: string, filter?: { style?: string; region?: string; query?: string }) => {
    setSelectedDestination(null);
    if (filter) {
      setExploreFilter(filter);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isDark ? 'bg-[#080E1E] text-[#FAF8F5]' : 'bg-[#FAF8F5] text-[#111827]'
      }`}
    >
      {/* Top Luxury Navbar */}
      <Navbar
        currentTab={selectedDestination ? 'explore' : currentTab}
        setCurrentTab={handleTabChange}
        savedCount={savedDestIds.length + savedItins.length}
        theme={theme}
        toggleTheme={handleToggleTheme}
        currency={currency}
        setCurrency={setCurrency}
        onOpenSavedModal={() => {
          setSavedItins(getSavedItineraries());
          setSavedDestIds(getSavedDestinationIds());
          setIsSavedModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedDestination ? (
          /* Destination Detail Page View */
          <DestinationDetailPage
            destination={selectedDestination}
            onBack={handleBackFromDetail}
            onPlanTrip={handlePlanTrip}
            onSelectDestination={handleSelectDestination}
            isSaved={savedDestIds.includes(selectedDestination.id)}
            onToggleSave={handleToggleSaveDestination}
            isDark={isDark}
            currency={currency}
          />
        ) : (
          /* View Based on currentTab */
          <>
            {currentTab === 'home' && (
              <HomePage
                onSelectDestination={handleSelectDestination}
                onPlanTrip={handlePlanTrip}
                onNavigateTab={handleTabChange}
                onOpenArticle={(art) => setActiveArticleModal(art)}
                savedDestinationIds={savedDestIds}
                onToggleSaveDest={handleToggleSaveDestination}
                isDark={isDark}
                currency={currency}
              />
            )}

            {currentTab === 'explore' && (
              <DestinationsPage
                initialFilter={exploreFilter}
                onSelectDestination={handleSelectDestination}
                onPlanTrip={handlePlanTrip}
                savedDestinationIds={savedDestIds}
                onToggleSaveDest={handleToggleSaveDestination}
                isDark={isDark}
                currency={currency}
              />
            )}

            {currentTab === 'map' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                    Geographic Interface
                  </span>
                  <h1 className="font-editorial text-4xl sm:text-5xl font-normal">
                    Interactive World Explorer
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">
                    Pan across continents, zoom into regional clusters, click pins to preview sanctuaries, or plan your journey directly from the coordinates.
                  </p>
                </div>
                <WorldMap
                  onSelectDestination={handleSelectDestination}
                  onPlanTrip={handlePlanTrip}
                  isDark={isDark}
                  currency={currency}
                />
              </div>
            )}

            {currentTab === 'dreamtrip' && (
              <DreamTripPage
                initialDestination={plannedDestination}
                loadedItinerary={loadedItinerary}
                onClearLoadedItinerary={() => setLoadedItinerary(null)}
                onOpenSavedModal={() => setIsSavedModalOpen(true)}
                onItinerarySaved={() => setSavedItins(getSavedItineraries())}
                isDark={isDark}
                currency={currency}
              />
            )}

            {currentTab === 'budget' && (
              <TripBudgetPage
                isDark={isDark}
                currency={currency}
                setCurrency={setCurrency}
              />
            )}

            {currentTab === 'compare' && (
              <ComparePage
                onSelectDestination={handleSelectDestination}
                onPlanTrip={handlePlanTrip}
                isDark={isDark}
                currency={currency}
              />
            )}

            {currentTab === 'hiddengems' && (
              <HiddenGemsPage
                onSelectDestination={handleSelectDestination}
                onPlanTrip={handlePlanTrip}
                isDark={isDark}
                currency={currency}
              />
            )}

            {currentTab === 'journal' && (
              <JournalPage
                onOpenArticle={(art) => setActiveArticleModal(art)}
                isDark={isDark}
              />
            )}

            {currentTab === 'experiences' && (
              <ExperiencesHubPage
                onOpenQuiz={() => setIsQuizModalOpen(true)}
                onOpenChecklist={() => setIsChecklistModalOpen(true)}
                onOpenSerendipity={() => setIsSerendipityModalOpen(true)}
                onNavigateTab={handleTabChange}
                isDark={isDark}
              />
            )}

            {currentTab === 'about' && (
              <AboutContactPage isDark={isDark} />
            )}
          </>
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={handleTabChange} isDark={isDark} />

      {/* Modals & Dialogs */}
      {isSavedModalOpen && (
        <SavedModal
          isOpen={isSavedModalOpen}
          onClose={() => setIsSavedModalOpen(false)}
          savedDestinationIds={savedDestIds}
          savedItineraries={savedItins}
          onToggleSaveDest={handleToggleSaveDestination}
          onDeleteItinerary={handleDeleteItinerary}
          onClearAll={handleClearAllItineraries}
          onSelectDest={handleSelectDestination}
          onLoadItinerary={handleLoadSavedItinerary}
          onImportItineraries={handleImportItineraries}
          isDark={isDark}
          currency={currency}
        />
      )}

      {isQuizModalOpen && (
        <QuizModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          onSelectDestination={handleSelectDestination}
          onPlanTrip={handlePlanTrip}
          isDark={isDark}
        />
      )}

      {isChecklistModalOpen && (
        <ChecklistModal
          isOpen={isChecklistModalOpen}
          onClose={() => setIsChecklistModalOpen(false)}
          isDark={isDark}
        />
      )}

      {isSerendipityModalOpen && (
        <SerendipityModal
          isOpen={isSerendipityModalOpen}
          onClose={() => setIsSerendipityModalOpen(false)}
          onSelectDestination={handleSelectDestination}
          onPlanTrip={handlePlanTrip}
          isDark={isDark}
        />
      )}

      {activeArticleModal && (
        <JournalModal
          article={activeArticleModal}
          onClose={() => setActiveArticleModal(null)}
          onSelectDestination={handleSelectDestination}
          isDark={isDark}
        />
      )}
    </div>
  );
}
