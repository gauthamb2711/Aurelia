import { SavedItinerary, TravelStyle } from '../types/travel';

const KEYS = {
  SAVED_DESTINATIONS: 'aurelia_saved_destinations',
  SAVED_ITINERARIES: 'aurelia_saved_itineraries',
  RECENT_DESTINATIONS: 'aurelia_recent_destinations',
  USER_PREFERENCES: 'aurelia_user_preferences',
  CHECKLIST_STATE: 'aurelia_checklist_state',
  THEME: 'aurelia_theme',
};

export interface UserPreferences {
  defaultCurrency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'AUD' | 'JPY';
  preferredTravelStyle: TravelStyle;
  startingCity: string;
}

const DEFAULT_PREFS: UserPreferences = {
  defaultCurrency: 'INR',
  preferredTravelStyle: 'Luxury',
  startingCity: 'Mumbai / New Delhi',
};

// Safe storage wrapper
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key "${key}":`, err);
  }
}

// ================= Saved Destinations (Bookmarks) =================
export function getSavedDestinationIds(): string[] {
  return safeGet<string[]>(KEYS.SAVED_DESTINATIONS, []);
}

export function isDestinationSaved(id: string): boolean {
  const list = getSavedDestinationIds();
  return list.includes(id);
}

export function toggleSaveDestination(id: string): boolean {
  const list = getSavedDestinationIds();
  const exists = list.includes(id);
  const updated = exists ? list.filter(item => item !== id) : [...list, id];
  safeSet(KEYS.SAVED_DESTINATIONS, updated);
  return !exists;
}

// ================= Saved Itineraries =================
export function getSavedItineraries(): SavedItinerary[] {
  return safeGet<SavedItinerary[]>(KEYS.SAVED_ITINERARIES, []);
}

export function saveItinerary(itinerary: SavedItinerary): void {
  const current = getSavedItineraries();
  const existingIndex = current.findIndex(item => item.id === itinerary.id);
  let updated: SavedItinerary[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = itinerary;
  } else {
    updated = [itinerary, ...current];
  }
  safeSet(KEYS.SAVED_ITINERARIES, updated);
}

export function deleteSavedItinerary(id: string): void {
  const current = getSavedItineraries();
  const updated = current.filter(item => item.id !== id);
  safeSet(KEYS.SAVED_ITINERARIES, updated);
}

export function clearAllSavedItineraries(): void {
  safeSet(KEYS.SAVED_ITINERARIES, []);
}

// ================= Recently Viewed Destinations =================
export function getRecentDestinationIds(): string[] {
  return safeGet<string[]>(KEYS.RECENT_DESTINATIONS, []);
}

export function addRecentDestinationId(id: string): void {
  const current = getRecentDestinationIds().filter(item => item !== id);
  const updated = [id, ...current].slice(0, 8);
  safeSet(KEYS.RECENT_DESTINATIONS, updated);
}

// ================= User Preferences =================
export function getUserPreferences(): UserPreferences {
  return safeGet<UserPreferences>(KEYS.USER_PREFERENCES, DEFAULT_PREFS);
}

export function saveUserPreferences(prefs: Partial<UserPreferences>): UserPreferences {
  const current = getUserPreferences();
  const merged = { ...current, ...prefs };
  safeSet(KEYS.USER_PREFERENCES, merged);
  return merged;
}

// ================= Checklist State =================
export function getStoredChecklist(): Record<string, boolean> {
  return safeGet<Record<string, boolean>>(KEYS.CHECKLIST_STATE, {});
}

export function saveStoredChecklist(state: Record<string, boolean>): void {
  safeSet(KEYS.CHECKLIST_STATE, state);
}

// ================= Theme =================
export function getStoredTheme(): 'light' | 'dark' {
  try {
    const t = localStorage.getItem(KEYS.THEME);
    if (t === 'dark' || t === 'light') return t;
  } catch (e) {
    // ignore
  }
  return 'dark'; // Aurelia default is rich midnight luxury dark aesthetic
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(KEYS.THEME, theme);
  } catch (e) {
    // ignore
  }
}
