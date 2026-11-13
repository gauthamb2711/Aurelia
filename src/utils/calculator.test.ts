import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTripBudget, formatCurrency, generateSmartItinerary, compareTwoDestinations } from './calculator';
import { Destination } from '../types/travel';

const mockDestination: Destination = {
  id: 'test-kyoto',
  name: 'Kyoto',
  tagline: 'Timeless Zen and Autumn Gardens',
  country: 'Japan',
  region: 'Southeast Asia',
  coordinates: { lat: 35.0116, lng: 135.7681 },
  heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
  gallery: [],
  description: 'Ancient imperial capital surrounded by tranquil shrines and bamboo groves.',
  editorialStory: 'Walking through Gion at dusk...',
  bestTimeToVisit: 'March to May, October to November',
  suggestedDurationDays: 5,
  estimatedBudgetTier: 'Luxury',
  avgDailyCostINR: 14000,
  mainAttractions: [
    { name: 'Fushimi Inari Taisha', desc: 'Thousands of vermilion torii gates winding through sacred mountain trails.' },
    { name: 'Kinkaku-ji (Golden Pavilion)', desc: 'Zen Buddhist temple covered in radiant gold leaf reflecting across a peaceful pond.' },
    { name: 'Arashiyama Bamboo Grove', desc: 'Soaring green bamboo stalks rustling serenely in the gentle mountain breeze.' }
  ],
  localExperiences: [
    { title: 'Traditional Tea Ceremony in Gion', desc: 'Participate in the meditative art of chado with a master matcha artisan.', type: 'Culture' },
    { title: 'Morning Zen Meditation at Tenryu-ji', desc: 'Private guided silent sitting in a 14th-century monastery.', type: 'Wellness' }
  ],
  travelTips: ['Purchase an IC travel card for seamless transit', 'Reserve traditional ryokan accommodations months in advance'],
  foodHighlights: [
    { dish: 'Kyoto Kaiseki Multi-Course', desc: 'Hyper-seasonal gastronomy highlighting fresh mountain vegetables and delicate broths.' },
    { dish: 'Matcha Parfait & Yatsuhashi', desc: 'Crisp wafer pastry wrapped around sweet azuki beans paired with stone-ground green tea.' }
  ],
  climateInfo: {
    season: 'Spring / Autumn',
    tempRange: '12°C - 22°C',
    rainfall: 'Moderate spring showers',
    packingAdvice: 'Layered breathable fabrics, comfortable slip-on walking shoes'
  },
  travelStyles: ['Culture', 'Luxury', 'Romantic'],
  isHiddenGem: false,
  rating: 4.95,
  reviewsCount: 1420
};

test('calculateTripBudget produces valid breakdown and totals in INR', () => {
  const result = calculateTripBudget({
    destinationAvgCostINR: 10000,
    travelers: 2,
    durationDays: 5,
    accommodationType: 'Boutique Hotel',
    transportPreference: 'Private Chauffeur/Cabs',
    foodPreference: 'Casual Dining',
    activitiesBudget: 'Balanced Curated',
    currency: 'INR'
  });

  assert.ok(result.totalCost > 0);
  assert.equal(result.currency, 'INR');
  assert.equal(result.exchangeRate, 1);
  assert.equal(result.costPerPerson, result.totalCost / 2);
  assert.equal(result.costPerDay, result.totalCost / 5);
  assert.ok(result.savingsTips.length > 0);
});

test('calculateTripBudget converts accurately to USD', () => {
  const inrResult = calculateTripBudget({
    destinationAvgCostINR: 10000,
    travelers: 1,
    durationDays: 3,
    accommodationType: 'Luxury Resort',
    transportPreference: 'Public & Rail',
    foodPreference: 'Fine Dining & Michelin',
    activitiesBudget: 'VIP & Private Guides',
    currency: 'INR'
  });

  const usdResult = calculateTripBudget({
    destinationAvgCostINR: 10000,
    travelers: 1,
    durationDays: 3,
    accommodationType: 'Luxury Resort',
    transportPreference: 'Public & Rail',
    foodPreference: 'Fine Dining & Michelin',
    activitiesBudget: 'VIP & Private Guides',
    currency: 'USD'
  });

  assert.equal(usdResult.currency, 'USD');
  assert.equal(usdResult.exchangeRate, 0.012);
  assert.ok(Math.abs(usdResult.totalCost - inrResult.totalCost * 0.012) < 0.01);
});

test('formatCurrency handles symbols properly', () => {
  assert.equal(formatCurrency(5000, 'INR'), '₹5,000');
  assert.equal(formatCurrency(100, 'USD'), '$100');
  assert.equal(formatCurrency(150, 'EUR'), '€150');
});

test('generateSmartItinerary generates specified number of days with 3 activities each', () => {
  const days = 4;
  const itinerary = generateSmartItinerary(mockDestination, days, 2, 'Luxury', 'Mumbai');

  assert.equal(itinerary.length, days);
  for (const day of itinerary) {
    assert.equal(day.activities.length, 3);
    assert.equal(day.activities[0].timeSlot, 'Morning');
    assert.equal(day.activities[1].timeSlot, 'Afternoon');
    assert.equal(day.activities[2].timeSlot, 'Evening');
    assert.ok(day.dayEstimatedCostINR > 0);
  }
});

test('compareTwoDestinations computes differences accurately', () => {
  const mockSecond: Destination = {
    ...mockDestination,
    id: 'test-hampi',
    name: 'Hampi',
    country: 'India',
    region: 'India',
    avgDailyCostINR: 3500,
    suggestedDurationDays: 3,
    travelStyles: ['Culture', 'Adventure', 'Budget']
  };

  const comparison = compareTwoDestinations(mockDestination, mockSecond);
  assert.equal(comparison.cheaperDestination, 'Hampi');
  assert.equal(comparison.recommendedDaysDifference, 2);
  assert.ok(comparison.commonStyles.includes('Culture'));
});
