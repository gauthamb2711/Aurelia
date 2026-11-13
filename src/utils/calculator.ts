import { BudgetCalculationInput, BudgetBreakdown, Destination, ItineraryDay, ItineraryActivity, TravelStyle } from '../types/travel';

export const CURRENCY_RATES: Record<string, { rate: number; symbol: string; label: string }> = {
  INR: { rate: 1, symbol: '₹', label: 'Indian Rupee (INR)' },
  USD: { rate: 0.012, symbol: '$', label: 'US Dollar (USD)' },
  EUR: { rate: 0.011, symbol: '€', label: 'Euro (EUR)' },
  GBP: { rate: 0.0095, symbol: '£', label: 'British Pound (GBP)' },
  AED: { rate: 0.044, symbol: 'AED ', label: 'UAE Dirham (AED)' },
  AUD: { rate: 0.018, symbol: 'A$', label: 'Australian Dollar (AUD)' },
  JPY: { rate: 1.82, symbol: '¥', label: 'Japanese Yen (JPY)' },
};

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  const conf = CURRENCY_RATES[currency] || CURRENCY_RATES['INR'];
  const formatted = Math.round(amount).toLocaleString('en-US');
  return `${conf.symbol}${formatted}`;
}

export function calculateTripBudget(input: BudgetCalculationInput): BudgetBreakdown {
  const travelers = Math.max(1, input.travelers || 1);
  const duration = Math.max(1, input.durationDays || 1);
  const baseAvg = input.destinationAvgCostINR || 6500;

  // Base rooms needed (assuming double occupancy)
  const roomsNeeded = Math.ceil(travelers / 2);

  // Accommodation multipliers
  const accomDailyINR = {
    'Hostel/Guesthouse': Math.max(1500, baseAvg * 0.35),
    'Boutique Hotel': Math.max(4500, baseAvg * 0.85),
    'Luxury Resort': Math.max(12000, baseAvg * 1.8),
    'Heritage Palace': Math.max(25000, baseAvg * 3.2),
  }[input.accommodationType] || 5000;

  const accommodationTotalINR = accomDailyINR * roomsNeeded * duration;

  // Transport costs
  const transportDailyPerPersonINR = {
    'Public & Rail': 800,
    'Private Chauffeur/Cabs': 2600,
    'Self-Drive Rental': 3200,
    'Premium Executive': 7500,
  }[input.transportPreference] || 1500;

  const transportTotalINR = transportDailyPerPersonINR * travelers * duration;

  // Food costs per person per day
  const foodDailyPerPersonINR = {
    'Street & Local Cafes': 700,
    'Casual Dining': 1800,
    'Fine Dining & Michelin': 5500,
    'Private Chef/Exclusive': 12000,
  }[input.foodPreference] || 1500;

  const foodTotalINR = foodDailyPerPersonINR * travelers * duration;

  // Activities budget per person per day
  const activityDailyPerPersonINR = {
    'Low/Free Walking': 500,
    'Balanced Curated': 1800,
    'VIP & Private Guides': 5200,
  }[input.activitiesBudget] || 1500;

  const activitiesTotalINR = activityDailyPerPersonINR * travelers * duration;

  // Miscellaneous / Buffer (10% of subtotal)
  const subtotalINR = accommodationTotalINR + transportTotalINR + foodTotalINR + activitiesTotalINR;
  const miscTotalINR = subtotalINR * 0.1;
  const totalCostINR = subtotalINR + miscTotalINR;

  // Target currency conversion
  const currencyConf = CURRENCY_RATES[input.currency] || CURRENCY_RATES['INR'];
  const exRate = currencyConf.rate;

  const accommodationCost = accommodationTotalINR * exRate;
  const transportCost = transportTotalINR * exRate;
  const foodCost = foodTotalINR * exRate;
  const activitiesCost = activitiesTotalINR * exRate;
  const miscellaneousCost = miscTotalINR * exRate;
  const totalCost = totalCostINR * exRate;
  const costPerPerson = totalCost / travelers;
  const costPerDay = totalCost / duration;

  // Actionable savings recommendations
  const savingsTips: string[] = [];
  if (input.accommodationType === 'Heritage Palace' || input.accommodationType === 'Luxury Resort') {
    savingsTips.push('Book shoulder-season dates (mid-spring / early autumn) to reduce luxury suite rates by up to 35%.');
  }
  if (input.transportPreference === 'Private Chauffeur/Cabs' || input.transportPreference === 'Premium Executive') {
    savingsTips.push('Mix scenic rail journeys between major hubs and book private chauffeur transfers exclusively for day excursions.');
  }
  if (input.activitiesBudget === 'VIP & Private Guides') {
    savingsTips.push('Reserve museum and heritage tickets online 3-4 weeks in advance to waive expedited access premiums.');
  }
  savingsTips.push('Opt for local artisanal breakfast and street markets to immerse in authentic food culture while saving up to 25% on dining.');

  return {
    currency: input.currency,
    exchangeRate: exRate,
    accommodationCost,
    transportCost,
    foodCost,
    activitiesCost,
    miscellaneousCost,
    totalCost,
    costPerPerson,
    costPerDay,
    savingsTips,
  };
}

export function generateSmartItinerary(
  destination: Destination,
  days: number,
  travelers: number,
  travelStyle: TravelStyle,
  startingCity: string = 'International Gateway'
): ItineraryDay[] {
  const safeDays = Math.min(Math.max(1, days), 14);
  const attractions = [...destination.mainAttractions];
  const experiences = [...destination.localExperiences];
  const foods = [...destination.foodHighlights];

  const itinerary: ItineraryDay[] = [];

  const dayThemes = [
    'Arrival & Grand Introduction',
    'Heritage, Architecture & Living Traditions',
    'Natural Splendors & Scenic Vistas',
    'Culinary Odysseys & Hidden Neighborhoods',
    'Deep Cultural Immersion & Artisans',
    'Adventure, Wilderness & Panoramic Trails',
    'Serene Retreat, Sunset Cruises & Farewell',
    'Coastal Escapes & Hidden Coves',
    'Mountain Peaks & Ancient Sanctuaries',
    'Local Markets & Secret Sanctuaries',
    'Off-the-Beaten-Track Rural Expedition',
    'Art, Galleries & Creative Enclaves',
    'Gastronomic Tasting Trails',
    'Grand Horizon & Golden Hour Reflections',
  ];

  for (let i = 0; i < safeDays; i++) {
    const dayNumber = i + 1;
    const theme = dayThemes[i % dayThemes.length];
    const dayActivities: ItineraryActivity[] = [];

    // Select attractions and experiences deterministically
    const attrMorning = attractions[i % attractions.length];
    const expAfternoon = experiences[i % experiences.length];
    const foodEvening = foods[i % foods.length];

    // Morning activity
    dayActivities.push({
      id: `act-${dayNumber}-1`,
      timeSlot: 'Morning',
      title: i === 0 ? `Arrival from ${startingCity} & Check-in` : `Explore ${attrMorning.name}`,
      description: i === 0
        ? `Arrive in ${destination.name}, private check-in to your sanctuary, and relax with welcoming herbal infusions.`
        : `${attrMorning.desc} Best explored during early morning soft light before peak hours.`,
      location: attrMorning.name,
      estimatedCostINR: i === 0 ? 1200 : 800,
      category: 'Sightseeing',
      durationHours: 3,
    });

    // Afternoon activity
    dayActivities.push({
      id: `act-${dayNumber}-2`,
      timeSlot: 'Afternoon',
      title: expAfternoon.title,
      description: `${expAfternoon.desc} Tailored for ${travelStyle.toLowerCase()} travelers looking for authentic moments.`,
      location: destination.name,
      estimatedCostINR: travelStyle === 'Luxury' ? 3500 : 1500,
      category: expAfternoon.type || 'Experience',
      durationHours: 2.5,
    });

    // Evening activity
    dayActivities.push({
      id: `act-${dayNumber}-3`,
      timeSlot: 'Evening',
      title: `Savor ${foodEvening.dish} & Sunset Gathering`,
      description: `${foodEvening.desc} Enjoy an atmospheric dinner${foodEvening.recommendedSpot ? ` at ${foodEvening.recommendedSpot}` : ''} under evening skies.`,
      location: foodEvening.recommendedSpot || `${destination.name} Old Quarter`,
      estimatedCostINR: travelStyle === 'Luxury' ? 4200 : 1800,
      category: 'Dining & Leisure',
      durationHours: 3,
    });

    const dayCost = dayActivities.reduce((acc, act) => acc + act.estimatedCostINR, 0) * travelers;

    itinerary.push({
      dayNumber,
      theme,
      activities: dayActivities,
      dayEstimatedCostINR: dayCost,
      notes: `Dress comfortably; local customs encourage modest attire when visiting heritage monuments and temples in ${destination.name}.`,
    });
  }

  return itinerary;
}

export function compareTwoDestinations(a: Destination, b: Destination) {
  const budgetRatio = a.avgDailyCostINR / (b.avgDailyCostINR || 1);
  const commonStyles = a.travelStyles.filter(s => b.travelStyles.includes(s));

  return {
    cheaperDestination: a.avgDailyCostINR <= b.avgDailyCostINR ? a.name : b.name,
    budgetDifferencePercent: Math.round(Math.abs(1 - budgetRatio) * 100),
    commonStyles,
    recommendedDaysDifference: a.suggestedDurationDays - b.suggestedDurationDays,
    climateComparison: {
      destA: { name: a.name, season: a.climateInfo.season, temp: a.climateInfo.tempRange },
      destB: { name: b.name, season: b.climateInfo.season, temp: b.climateInfo.tempRange },
    },
  };
}
