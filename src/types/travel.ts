export type Region =
  | 'India'
  | 'Southeast Asia'
  | 'Europe'
  | 'Middle East'
  | 'Africa'
  | 'North America'
  | 'South America'
  | 'Oceania';

export type TravelStyle =
  | 'Adventure'
  | 'Luxury'
  | 'Budget'
  | 'Nature'
  | 'Culture'
  | 'Romantic'
  | 'Family'
  | 'Solo'
  | 'Photography'
  | 'Wellness'
  | 'History';

export type BudgetTier = 'Budget' | 'Moderate' | 'Luxury' | 'Ultra-Luxury';

export interface Attraction {
  name: string;
  desc: string;
  duration?: string;
  category?: string;
  image?: string;
}

export interface FoodHighlight {
  dish: string;
  desc: string;
  recommendedSpot?: string;
}

export interface LocalExperience {
  title: string;
  desc: string;
  type: string;
}

export interface ClimateInfo {
  season: string;
  tempRange: string;
  rainfall: string;
  packingAdvice: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  country: string;
  region: Region;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  gallery: string[];
  description: string;
  editorialStory: string;
  bestTimeToVisit: string;
  suggestedDurationDays: number;
  estimatedBudgetTier: BudgetTier;
  avgDailyCostINR: number;
  mainAttractions: Attraction[];
  localExperiences: LocalExperience[];
  travelTips: string[];
  foodHighlights: FoodHighlight[];
  climateInfo: ClimateInfo;
  travelStyles: TravelStyle[];
  isHiddenGem: boolean;
  isTrending?: boolean;
  isDestinationOfMonth?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface ItineraryActivity {
  id: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  location: string;
  estimatedCostINR: number;
  category: string;
  durationHours: number;
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  activities: ItineraryActivity[];
  dayEstimatedCostINR: number;
  notes?: string;
}

export interface SavedItinerary {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  country: string;
  startingCity: string;
  travelDays: number;
  travelers: number;
  travelStyle: TravelStyle;
  days: ItineraryDay[];
  createdAt: string;
  totalEstimatedCostINR: number;
}

export interface BudgetCalculationInput {
  destinationId?: string;
  destinationAvgCostINR?: number;
  travelers: number;
  durationDays: number;
  accommodationType: 'Hostel/Guesthouse' | 'Boutique Hotel' | 'Luxury Resort' | 'Heritage Palace';
  transportPreference: 'Public & Rail' | 'Private Chauffeur/Cabs' | 'Self-Drive Rental' | 'Premium Executive';
  foodPreference: 'Street & Local Cafes' | 'Casual Dining' | 'Fine Dining & Michelin' | 'Private Chef/Exclusive';
  activitiesBudget: 'Low/Free Walking' | 'Balanced Curated' | 'VIP & Private Guides';
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'AUD' | 'JPY';
}

export interface BudgetBreakdown {
  currency: string;
  exchangeRate: number;
  accommodationCost: number;
  transportCost: number;
  foodCost: number;
  activitiesCost: number;
  miscellaneousCost: number;
  totalCost: number;
  costPerPerson: number;
  costPerDay: number;
  savingsTips: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  publishDate: string;
  category: 'Destination Guide' | 'Cultural Discovery' | 'Gastronomy' | 'Adventure' | 'Photography' | 'Hidden Stories';
  destinationId?: string;
  heroImage: string;
  galleryImages: string[];
  excerpt: string;
  contentParagraphs: string[];
  keyTakeaways: string[];
}
