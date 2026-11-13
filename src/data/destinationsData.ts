import { Destination } from '../types/travel';
import hampiSanctuaryImg from '../assets/images/hampi_sanctuary_1794550233708.jpg';
import petraWadiRumImg from '../assets/images/petra_wadi_rum_1794550234343.jpg';
import cappadociaDawnImg from '../assets/images/cappadocia_dawn_1794550234575.jpg';
import chefchaouenMedinaImg from '../assets/images/chefchaouen_medina_1794550235243.jpg';
import haidaGwaiiCoastImg from '../assets/images/haida_gwaii_coast_1794550235157.jpg';

export const DESTINATIONS: Destination[] = [
  // ==================== INDIA ====================
  {
    id: 'udaipur-india',
    name: 'Udaipur',
    tagline: 'The City of Floating Palaces & Sunset Mirages',
    country: 'India',
    region: 'India',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Set along the shimmering waters of Lake Pichola against the rugged Aravali hills, Udaipur embodies regal Rajputana grandeur with marble pavilions, courtyards draped in bougainvillea, and royal twilight boat rides.',
    editorialStory: 'As evening envelopes Lake Pichola, the City Palace transforms into an amber silhouette glowing over the tranquil waters. The distant echo of sitar melodies mingles with the chime of temple bells across the ghats, offering one of the subcontinent’s most timeless sensory journeys.',
    bestTimeToVisit: 'October to March (Pleasant winter breezes & royal festivals)',
    suggestedDurationDays: 4,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 11500,
    mainAttractions: [
      { name: 'City Palace Complex', desc: 'A sprawling 400-year-old marvel of granite, marble, mirrored mosaics, and painted balconies overlooking Lake Pichola.', category: 'Heritage', duration: '3-4 hrs' },
      { name: 'Lake Pichola Twilight Cruise', desc: 'Glide past the iconic white-marble Jag Mandir and Lake Palace as the sun dips behind the Aravali ridge.', category: 'Scenic', duration: '1.5 hrs' },
      { name: 'Saheliyon-ki-Bari', desc: 'Historic courtyard of the royal maidens, cooled by lotus pools, marble fountains, and stone elephants.', category: 'Gardens', duration: '1 hr' },
      { name: 'Jagdish Temple & Old Bazaars', desc: 'Vibrant 17th-century Hindu sanctuary adorned with intricate carved stone friezes and bustling spice lanes.', category: 'Culture', duration: '2 hrs' }
    ],
    localExperiences: [
      { title: 'Private Heritage Miniature Painting Workshop', desc: 'Learn delicate squirrel-hair brush techniques with master Rajasthani painters.', type: 'Art & Craft' },
      { title: 'Mewari Royal Dining under the Stars', desc: 'Savor multi-course game and lentil delicacies cooked over traditional charcoal sigris.', type: 'Gastronomy' },
      { title: 'Vintage Car Museum & Royal Garages', desc: 'Explore the private collection of classic Rolls-Royces and Cadillacs preserved by the Mewar dynasty.', type: 'History' }
    ],
    travelTips: [
      'Book Lake Pichola boat tickets at sunset 1 day in advance during peak winter season.',
      'Explore the ancient narrow lanes of Gangaur Ghat early in the morning when morning prayers begin.',
      'Wear slip-on shoes for temple visits where footwear must be removed.'
    ],
    foodHighlights: [
      { dish: 'Dal Baati Churma', desc: 'Crisp ghee-dipped wheat dumplings with spiced five-lentil stew and sweet crumbled jaggery.', recommendedSpot: 'Traditional Mewari Thal' },
      { dish: 'Laal Maas', desc: 'Fiery slow-cooked lamb curry infused with Mathania red chillies and smoked cloves.', recommendedSpot: 'Ambrai Waterfront Terrace' },
      { dish: 'Ghevar', desc: 'Disc-shaped honeycomb dessert soaked in saffron-cardamom sugar syrup and crowned with silver foil.', recommendedSpot: 'Jodhpur Sweets Udaipur' }
    ],
    climateInfo: {
      season: 'Winter / Post-Monsoon',
      tempRange: '12°C - 28°C',
      rainfall: 'Dry and clear skies with low humidity',
      packingAdvice: 'Light cottons for sunny afternoons, pashmina shawls and light jackets for lakeside nights.'
    },
    travelStyles: ['Romantic', 'Culture', 'Luxury', 'Family'],
    isHiddenGem: false,
    isTrending: true,
    isDestinationOfMonth: true,
    rating: 4.92,
    reviewsCount: 3120
  },
  {
    id: 'ladakh-india',
    name: 'Ladakh',
    tagline: 'High Passes, Moonscapes & Whispering Monasteries',
    country: 'India',
    region: 'India',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A surreal cold desert plateau perched over 11,000 feet in the northern Himalayas, famed for dramatic azure alpine lakes, whitewashed gompas perched on rocky crags, and high mountain passes.',
    editorialStory: 'Breathing the crisp mountain air of Thiksey Monastery before dawn, the reverberation of bronze horns calls monks to prayer. Below, the Indus River ribbons through arid brown valleys kissed by first light.',
    bestTimeToVisit: 'May to September (High mountain passes open, crystal clear skies)',
    suggestedDurationDays: 7,
    estimatedBudgetTier: 'Moderate',
    avgDailyCostINR: 6800,
    mainAttractions: [
      { name: 'Pangong Tso Lake', desc: '134-km long endorheic lake famous for changing colors from turquoise to deep cobalt throughout the day.', category: 'Nature', duration: 'Overnight' },
      { name: 'Thiksey & Hemis Monasteries', desc: 'Magnificent 12-storey Tibetan Buddhist gompa holding sacred silk thangkas and golden Maitreya statues.', category: 'Culture', duration: '3 hrs' },
      { name: 'Nubra Valley & Hunder Sand Dunes', desc: 'High-altitude desert dunes inhabited by double-humped Bactrian camels against snow-capped peaks.', category: 'Adventure', duration: 'Full Day' },
      { name: 'Khardung La Pass', desc: 'One of the world’s highest motorable mountain roads standing proud at 17,582 feet.', category: 'Adventure', duration: '2 hrs' }
    ],
    localExperiences: [
      { title: 'Morning Chanting with Thiksey Monks', desc: 'Witness ancient Buddhist hymns and butter tea rituals inside the prayer hall at 6:00 AM.', type: 'Spiritual' },
      { title: 'Stargazing at Hanle Dark Sky Reserve', desc: 'Camp under pristine Bortle-1 skies where the Milky Way spans like a celestial highway.', type: 'Astronomy' }
    ],
    travelTips: [
      'Strictly rest for the first 36-48 hours in Leh for altitude acclimatization.',
      'Carry hydration salts, sunscreen SPF 50+, and polar fleece layers.',
      'Inner Line Permits are mandatory for Pangong and Nubra (processed easily locally).'
    ],
    foodHighlights: [
      { dish: 'Tibetan Thukpa & Momos', desc: 'Hand-rolled buckwheat noodles in rich herbal bone or vegetable broth with steamed dumplings.', recommendedSpot: 'Leh Old Town Kitchen' },
      { dish: 'Butter Tea (Gur Gur Chai)', desc: 'Churned yak butter, black tea leaves, and rock salt served in hand-carved wooden bowls.', recommendedSpot: 'Hemis Tea Shelter' }
    ],
    climateInfo: {
      season: 'Summer / Monsoon-free',
      tempRange: '4°C - 22°C',
      rainfall: 'Virtually rain-shadowed; dry arid breeze',
      packingAdvice: 'Thermal base layers, windproof jacket, UV polarized sunglasses.'
    },
    travelStyles: ['Adventure', 'Nature', 'Culture', 'Solo'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.89,
    reviewsCount: 2450
  },
  {
    id: 'hampi-india',
    name: 'Hampi',
    tagline: 'The Boulder-Strewn Realm of the Forgotten Vijayanagara Empire',
    country: 'India',
    region: 'India',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    heroImage: hampiSanctuaryImg,
    gallery: [
      hampiSanctuaryImg,
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A UNESCO World Heritage dreamscape of giant precariously balanced granite boulders, coracle-laden rivers, and magnificent stone chariot temples dating back to the 14th century.',
    editorialStory: 'Sitting atop Matanga Hill as the crimson sun sets over the ruins of the Vijayanagara Empire feels like stepping onto another planet. Miles of golden monolithic stones, banana plantations, and ancient bazaar colonnades stretch into the horizon.',
    bestTimeToVisit: 'November to February (Pleasant winter sun and cool river breezes)',
    suggestedDurationDays: 3,
    estimatedBudgetTier: 'Budget',
    avgDailyCostINR: 3200,
    mainAttractions: [
      { name: 'Vijaya Vittala Temple & Stone Chariot', desc: 'Architectural masterpiece renowned for its iconic carved stone chariot and musical granite pillars.', category: 'Archaeology', duration: '2.5 hrs' },
      { name: 'Virupaksha Temple', desc: 'One of India’s oldest continuously active Hindu shrines dedicated to Lord Shiva on the Tungabhadra banks.', category: 'Heritage', duration: '2 hrs' },
      { name: 'Matanga Hill Sunrise Trek', desc: 'Climb 500 hand-hewn steps for an incomparable 360-degree panoramic vista across the kingdom ruins.', category: 'Trek', duration: '2 hrs' }
    ],
    localExperiences: [
      { title: 'Tungabhadra Coracle River Ride', desc: 'Navigate ancient river eddies in a round woven bamboo boat steered by local fishermen.', type: 'River Life' },
      { title: 'Sunset Bouldering & Sanapur Lake', desc: 'Discover hidden swimming spots amidst granite cliffs on the hippier side of the river.', type: 'Adventure' }
    ],
    travelTips: [
      'Rent a bicycle or electric moped to explore both sides of the Tungabhadra River.',
      'Hire a licensed ASI guide at Vittala Temple to understand the acoustics of the musical pillars.'
    ],
    foodHighlights: [
      { dish: 'South Indian Banana Leaf Thali', desc: 'Generous servings of rasam, sambar, coconut pachadi, and curd rice on freshly cut leaves.', recommendedSpot: 'Mango Tree Cafe' }
    ],
    climateInfo: {
      season: 'Winter',
      tempRange: '16°C - 31°C',
      rainfall: 'Dry with crisp clear skies',
      packingAdvice: 'Cotton shirts, sturdy walking shoes, sun hat and sunscreen.'
    },
    travelStyles: ['Culture', 'Adventure', 'Solo', 'Budget'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.88,
    reviewsCount: 1680
  },

  // ==================== SOUTHEAST & EAST ASIA ====================
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    tagline: 'Centuries of Zen Harmony, Cedar Shrines & Tea Ceremonies',
    country: 'Japan',
    region: 'Southeast Asia',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The cultural soul of Japan with over 2,000 Buddhist temples and Shinto shrines, bamboo groves that whisper in the wind, and centuries-old wooden machiya houses preserving traditional craft.',
    editorialStory: 'In the gentle twilight of Gion, wooden lattices glow with lantern light. A geiko clad in silk brocade slips silently through stone-flagged alleys, disappearing into an ochre tearoom as rain begins to fall on raked gravel gardens.',
    bestTimeToVisit: 'March to May (Sakura cherry blossoms) & October to November (Vibrant Japanese maple foliage)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 15500,
    mainAttractions: [
      { name: 'Fushimi Inari Taisha', desc: 'Over 10,000 vermilion torii gates ascending the forested sacred Mount Inari.', category: 'Spiritual', duration: '3 hrs' },
      { name: 'Arashiyama Bamboo Grove & Tenryu-ji', desc: 'Towering green bamboo stalks leading into a World Heritage Zen temple with pond reflection garden.', category: 'Nature', duration: '2.5 hrs' },
      { name: 'Kinkaku-ji (Golden Pavilion)', desc: 'Gilded pavilion reflected in the mirror pond, showcasing Muromachi-era aristocratic architecture.', category: 'Heritage', duration: '1.5 hrs' }
    ],
    localExperiences: [
      { title: 'Chado Tea Ceremony with a Grandmaster', desc: 'Private meditation and whisking of stone-ground Uji matcha in a 300-year-old tearoom.', type: 'Culture' },
      { title: 'Ryokan Stay with Onsen Thermal Spring', desc: 'Sleep on tatami mats, soak in aromatic Hinoki cedar waters, and indulge in seasonal Kaiseki dining.', type: 'Luxury' }
    ],
    travelTips: [
      'Visit Fushimi Inari at 6:30 AM before tour groups to experience the mystical silence.',
      'Purchase an IC transport card for buses and subways.'
    ],
    foodHighlights: [
      { dish: 'Kyoto Kaiseki Dining', desc: 'Twelve artistic micro-courses celebrating the fleeting season with seasonal mountain herbs and yuba tofu.', recommendedSpot: 'Gion Karyo' },
      { dish: 'Uji Matcha Soba', desc: 'Green tea infused cold buckwheat noodles served with dipping tsuyu and fresh wasabi.', recommendedSpot: 'Nishiki Market' }
    ],
    climateInfo: {
      season: 'Spring / Autumn',
      tempRange: '11°C - 22°C',
      rainfall: 'Occasional light romantic spring drizzle',
      packingAdvice: 'Comfortable slip-on shoes for temple floors, elegant smart-casual layers.'
    },
    travelStyles: ['Culture', 'Romantic', 'Luxury', 'Solo'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.96,
    reviewsCount: 4210
  },
  {
    id: 'raja-ampat-indonesia',
    name: 'Raja Ampat',
    tagline: 'The Last Marine Frontier: Karst Islets & Coral Sanctuaries',
    country: 'Indonesia',
    region: 'Southeast Asia',
    coordinates: { lat: -0.5000, lng: 130.5000 },
    heroImage: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An archipelago of over 1,500 emerald jungle-topped limestone islands rising from turquoise lagoons. Raja Ampat harbors the richest marine biodiversity on Earth.',
    editorialStory: 'Gliding on a traditional outrigger between towering limestone karsts, the water beneath is so transparent that giant manta rays and neon gorgonian fans are visible from the deck without even wearing a mask.',
    bestTimeToVisit: 'October to April (Calmest sea conditions, optimal diving visibility)',
    suggestedDurationDays: 6,
    estimatedBudgetTier: 'Ultra-Luxury',
    avgDailyCostINR: 22000,
    mainAttractions: [
      { name: 'Pianemo Karst Viewpoint', desc: 'Climb wooden stairs to witness the famed emerald mushroom islets surrounded by electric-blue water.', category: 'Panoramic', duration: '2 hrs' },
      { name: 'Cape Kri Coral Reef', desc: 'World record holder for highest fish species count recorded in a single dive (374 species).', category: 'Diving', duration: 'Half Day' },
      { name: 'Blue River of Kali Biru', desc: 'Pristine deep-jungle freshwater river shimmering with crystal icy-blue waters.', category: 'Wilderness', duration: '3 hrs' }
    ],
    localExperiences: [
      { title: 'Snorkeling with Friendly Oceanic Mantas', desc: 'Drift along Manta Sandy cleaning stations alongside gentle 4-meter wingspans.', type: 'Marine Life' },
      { title: 'Bird of Paradise Jungle Trek', desc: 'Guided pre-dawn trek to observe the mating dance of the rare Red Bird of Paradise.', type: 'Wildlife' }
    ],
    travelTips: [
      'Marine park conservation fee is required upon arrival at Sorong / Waisai.',
      'Bring reef-safe sunscreen and waterproof dry bags for island boat transfers.'
    ],
    foodHighlights: [
      { dish: 'Papuan Grilled Snapper with Dabu-Dabu', desc: 'Fresh-caught reef fish grilled over coconut husks topped with spicy tomato-shallot-lime relish.', recommendedSpot: 'Eco-Resort Overwater Pavilion' }
    ],
    climateInfo: {
      season: 'Tropical Equatorial',
      tempRange: '25°C - 31°C',
      rainfall: 'Brief tropical downpours interspersed with brilliant sunshine',
      packingAdvice: 'Rash guards, dive booties, dry bags, insect repellent.'
    },
    travelStyles: ['Nature', 'Adventure', 'Luxury', 'Romantic'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.97,
    reviewsCount: 880
  },
  {
    id: 'bali-ubud-indonesia',
    name: 'Bali & Ubud',
    tagline: 'Emerald Rice Cascades, Sacred Springs & Artisanal Sanctuaries',
    country: 'Indonesia',
    region: 'Southeast Asia',
    coordinates: { lat: -8.5069, lng: 115.2625 },
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The Island of the Gods balances spiritual Hindu traditions, verdant jungle river gorges, cliffside coastal temples, and world-renowned wellness sanctuaries.',
    editorialStory: 'Waking to the jungle chorus of the Ayung River valley, morning mist lifts to reveal emerald rice paddies cultivated using the thousand-year-old Subak irrigation system. Offerings of frangipani blossoms and incense greet every sunrise.',
    bestTimeToVisit: 'April to October (Dry season, golden sunsets & breezy evenings)',
    suggestedDurationDays: 6,
    estimatedBudgetTier: 'Moderate',
    avgDailyCostINR: 7500,
    mainAttractions: [
      { name: 'Tegallalang Rice Terraces', desc: 'Centuries-old tiered green terraces showcasing traditional Balinese cooperative farming.', category: 'Scenic', duration: '2 hrs' },
      { name: 'Uluwatu Clifftop Temple & Kecak Dance', desc: 'Perched 70 meters above crashing Indian Ocean waves, featuring hypnotic fire trance choir at dusk.', category: 'Culture', duration: '3 hrs' },
      { name: 'Tirta Empul Holy Water Temple', desc: 'Sacred water purification springs where pilgrims bathe under sacred stone spouts.', category: 'Spiritual', duration: '2 hrs' }
    ],
    localExperiences: [
      { title: 'Melukat Water Cleansing Ritual', desc: 'Private blessing with a local Balinese priest using consecrated holy spring water.', type: 'Wellness' },
      { title: 'Artisanal Silver Jewelry Workshop in Celuk', desc: 'Hand-forge your own silver pendant alongside master Balinese silversmiths.', type: 'Craft' }
    ],
    travelTips: [
      'Carry a traditional sarong and sash when visiting any temple in Bali.',
      'Stay in private jungle villas around Ubud for tranquility, and coastal Seminyak for dining.'
    ],
    foodHighlights: [
      { dish: 'Babi Guling', desc: 'Spit-roasted suckling pig stuffed with lemongrass, galangal, turmeric, and crispy crackling skin.', recommendedSpot: 'Warung Ibu Oka' },
      { dish: 'Nasi Campur Bali', desc: 'Fragrant rice bowl encircled by spiced chicken satay, lawar vegetables, and roasted sambal matah.', recommendedSpot: 'Bebek Bengil' }
    ],
    climateInfo: {
      season: 'Dry / Coastal Tropical',
      tempRange: '23°C - 30°C',
      rainfall: 'Low rainfall with refreshing coastal sea breezes',
      packingAdvice: 'Linen shirts, swimsuits, comfortable hiking sandals, light rain poncho.'
    },
    travelStyles: ['Romantic', 'Nature', 'Culture', 'Luxury'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.87,
    reviewsCount: 3890
  },

  // ==================== EUROPE ====================
  {
    id: 'amalfi-coast-italy',
    name: 'Amalfi Coast',
    tagline: 'Pastel Cliffside Villages & Scent of Terraced Lemon Groves',
    country: 'Italy',
    region: 'Europe',
    coordinates: { lat: 40.6340, lng: 14.6027 },
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A dramatic 50-kilometer stretch of coastline in southern Italy where vibrant pastel villas cling to sheer Mediterranean limestone cliffs above cobalt waters and fragrant citrus terraces.',
    editorialStory: 'Sailing along the coast in a vintage Riva wooden motorboat, Positano rises like an amphitheater of soft pink and terracotta. The salt spray carries the sharp aroma of sfusato amalfitano lemons ripening in the Mediterranean sunshine.',
    bestTimeToVisit: 'May to June & September to October (Warm sea, fewer crowds, mild sunshine)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Ultra-Luxury',
    avgDailyCostINR: 24000,
    mainAttractions: [
      { name: 'Positano Cliffside Village', desc: 'Iconic steep village crisscrossed by steep stairways, bougainvillea pergolas, and chic linen boutiques.', category: 'Townscape', duration: 'Full Day' },
      { name: 'Path of the Gods (Sentiero degli Dei)', desc: 'Legendary hiking path suspended high above the sea offering staggering panoramas to Capri.', category: 'Hiking', duration: '4 hrs' },
      { name: 'Ravello & Villa Cimbrone Gardens', desc: 'Clifftop garden terrace known as the Terrace of Infinity, adorned with Roman marble busts overlooking the sea.', category: 'Gardens', duration: '3 hrs' }
    ],
    localExperiences: [
      { title: 'Private Gozzo Boat Charter to Capri Grottoes', desc: 'Cruise hidden coves, swim in emerald grottos, and dock for lunch at beachfront trattorias.', type: 'Coastal Life' },
      { title: 'Organic Lemon Grove Harvest & Limoncello Crafting', desc: 'Walk under ancient chestnut pergolas and taste cold handmade limoncello in Amalfi.', type: 'Gastronomy' }
    ],
    travelTips: [
      'Travel by ferry or private boat between towns to avoid dizzying coastal traffic jams.',
      'Pack comfortable flat walking shoes; towns consist primarily of vertical stone stairways.'
    ],
    foodHighlights: [
      { dish: 'Scialatielli ai Frutti di Mare', desc: 'Thick fresh ribbon pasta tossed with clams, mussels, prawns, and sun-ripened cherry tomatoes.', recommendedSpot: 'Da Gemma Amalfi' },
      { dish: 'Delizia al Limone', desc: 'Sponge cake dome infused with fragrant Amalfi lemon curd and enveloped in light whipped cream.', recommendedSpot: 'Pasticceria Pansa 1830' }
    ],
    climateInfo: {
      season: 'Mediterranean Summer/Autumn',
      tempRange: '19°C - 29°C',
      rainfall: 'Dry, sunny Mediterranean climate with balmy coastal evenings',
      packingAdvice: 'Resort linen wear, stylish sunglasses, sun hats, swimwear.'
    },
    travelStyles: ['Luxury', 'Romantic', 'Culture'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.94,
    reviewsCount: 3950
  },
  {
    id: 'swiss-alps-lauterbrunnen',
    name: 'Swiss Alps (Lauterbrunnen)',
    tagline: 'Valley of 72 Waterfalls & Snow-Capped Alpine Solitude',
    country: 'Switzerland',
    region: 'Europe',
    coordinates: { lat: 46.5935, lng: 7.9079 },
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A breathtaking glacial valley flanked by towering 300-meter vertical limestone cliffs where 72 waterfalls plummet into emerald meadows dotted with traditional Swiss timber chalets.',
    editorialStory: 'The sound of cowbells ringing across alpine pastures blends with the roar of Staubbach Falls tumbling from the high crags. Above, the snow-draped titans—Eiger, Mönch, and Jungfrau—stand sentinel under a sapphire sky.',
    bestTimeToVisit: 'June to September (Lush wild meadows and scenic trains) & December to March (Winter skiing wonderland)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 21000,
    mainAttractions: [
      { name: 'Staubbach & Trümmelbach Falls', desc: 'Glacial waterfalls roaring inside mountain rock walls draining glaciers from Eiger and Jungfrau.', category: 'Nature', duration: '2.5 hrs' },
      { name: 'Jungfraujoch – Top of Europe', desc: 'Europe’s highest railway station at 3,454 meters with panoramic ice palace and Sphinx observatory.', category: 'Alpine', duration: '5 hrs' },
      { name: 'Car-Free Mürren & Schilthorn', desc: 'Idyllic cliff-edge village offering direct vistas of the sheer north face of the Eiger.', category: 'Village', duration: 'Half Day' }
    ],
    localExperiences: [
      { title: 'Panoramic Gondola Flight over Grindelwald First', desc: 'Fly across alpine meadows on a high-speed zipline and walk the thrilling First Cliff Walk.', type: 'Adventure' },
      { title: 'Artisanal Alpine Cheese Making in a High Alp Hut', desc: 'Watch master cheesemakers cook raw mountain milk over open wood fires.', type: 'Gastronomy' }
    ],
    travelTips: [
      'Invest in a Swiss Travel Pass or Berner Oberland Pass for unlimited trains, cable cars, and boats.',
      'Check live webcams in the morning before heading up to high mountain peaks like Jungfraujoch.'
    ],
    foodHighlights: [
      { dish: 'Swiss Fondue Moitié-Moitié', desc: 'Melted Gruyère and Vacherin Fribourgeois cheeses with white wine and kirsch, served with crusty bread.', recommendedSpot: 'Hotel Oberland Restaurant' },
      { dish: 'Crispy Rösti with Fried Egg', desc: 'Pan-fried golden shredded potatoes topped with raclette cheese and farm-fresh bacon.', recommendedSpot: 'Alpstübli Mürren' }
    ],
    climateInfo: {
      season: 'Alpine Summer',
      tempRange: '10°C - 24°C',
      rainfall: 'Occasional crisp alpine showers that leave clear fresh air',
      packingAdvice: 'Gore-Tex waterproof jacket, sturdy hiking boots, warm fleece layers.'
    },
    travelStyles: ['Nature', 'Luxury', 'Adventure', 'Family'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.98,
    reviewsCount: 4620
  },
  {
    id: 'lofoten-islands-norway',
    name: 'Lofoten Islands',
    tagline: 'Arctic Peaks, Midnight Sun & Crimson Fisherman Rorbuer',
    country: 'Norway',
    region: 'Europe',
    coordinates: { lat: 68.2000, lng: 13.7000 },
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An archipelago carved by glaciers inside the Arctic Circle, featuring sheer granite peaks shooting straight out of Norwegian fjords, white sandy beaches, and crimson wooden rorbu cabins.',
    editorialStory: 'Under the Arctic Midnight Sun, the sky never turns dark; instead, a four-hour golden hour douses the sawtooth mountains and glassy fjords in shades of apricot and amber. Kayaking through Reinefjorden in total silence is pure reverie.',
    bestTimeToVisit: 'June to August (24-hour Midnight Sun) & September to March (Vibrant Aurora Borealis)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 19500,
    mainAttractions: [
      { name: 'Reine & Hamnøy Villages', desc: 'World-famous fishing hamlets perched on rocky ocean outcrops backed by Olstind peak.', category: 'Scenic', duration: 'Full Day' },
      { name: 'Reinebringen Ridge Hike', desc: '1,560 stone Sherpa steps leading to Lofoten’s most celebrated clifftop panorama.', category: 'Hiking', duration: '3 hrs' },
      { name: 'Haukland & Uttakleiv Arctic Beaches', desc: 'Pristine turquoise waters and white shell sand flanked by soaring mountain walls.', category: 'Coastal', duration: '2 hrs' }
    ],
    localExperiences: [
      { title: 'Fjord Sea Kayaking under the Midnight Sun', desc: 'Paddle through sheltered crystal inlets surrounded by sea eagles and porpoises at midnight.', type: 'Adventure' },
      { title: 'Northern Lights Hunt from a Historic Rorbu', desc: 'Watch ribbons of emerald and violet aurora dance over silent Arctic waters from your cabin dock.', type: 'Astronomy' }
    ],
    travelTips: [
      'Rent a car with winter stud tires if visiting between November and April.',
      'Book traditional rorbu cabins months ahead as supply is strictly limited.'
    ],
    foodHighlights: [
      { dish: 'Arctic Skrei Cod & King Crab', desc: 'Pan-seared winter migratory cod served with melted butter, pea puree, and braised leeks.', recommendedSpot: 'Børsen Spiseri Svolvær' }
    ],
    climateInfo: {
      season: 'Sub-Arctic Maritime',
      tempRange: '8°C - 18°C (Summer) / -2°C - 4°C (Winter)',
      rainfall: 'Fast-moving maritime weather with sudden shifts between sun and rain',
      packingAdvice: 'Windproof and waterproof shell jacket, merino wool undergarments, hiking boots.'
    },
    travelStyles: ['Adventure', 'Nature', 'Photography', 'Solo'],
    isHiddenGem: true,
    isTrending: true,
    rating: 4.95,
    reviewsCount: 1530
  },

  // ==================== MIDDLE EAST ====================
  {
    id: 'petra-wadi-rum-jordan',
    name: 'Petra & Wadi Rum',
    tagline: 'Rose-Red Nabataean Tombs & Mars-like Desert Canyons',
    country: 'Jordan',
    region: 'Middle East',
    coordinates: { lat: 30.3285, lng: 35.4444 },
    heroImage: petraWadiRumImg,
    gallery: [
      petraWadiRumImg,
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An ancient kingdom carved directly into rose-tinted sandstone canyons by the Nabataeans over 2,000 years ago, coupled with the vast, silent crimson desert expanses of Wadi Rum.',
    editorialStory: 'Emerging from the narrow 1.2-kilometer chasm of the Siq, the first sight of Al-Khazneh (The Treasury) bathed in morning sun carved into sheer stone defies mortal imagination. At night in Wadi Rum, Bedouin campfires whisper ancient desert tales.',
    bestTimeToVisit: 'March to May & September to November (Pleasant temperatures, clear skies)',
    suggestedDurationDays: 4,
    estimatedBudgetTier: 'Moderate',
    avgDailyCostINR: 8800,
    mainAttractions: [
      { name: 'Al-Khazneh (The Treasury)', desc: 'Magnificent 40-meter-high Greco-Roman facade carved directly into rose-colored sandstone cliff.', category: 'Heritage', duration: '3 hrs' },
      { name: 'The Monastery (Ad Deir)', desc: 'Monumental temple reached via 800 hand-hewn canyon stairs with sweeping vistas over the Arava valley.', category: 'Hiking', duration: '4 hrs' },
      { name: 'Wadi Rum 4x4 Desert Safari', desc: 'Traverse crimson sand dunes, natural sandstone arches, and ancient Thamudic rock inscriptions.', category: 'Adventure', duration: 'Half Day' }
    ],
    localExperiences: [
      { title: 'Petra by Night under 1,500 Candles', desc: 'Walk through the candlelit Siq to sit before The Treasury under starry skies accompanied by Bedouin flutes.', type: 'Culture' },
      { title: 'Zarb Bedouin Underground Feast & Stargazing', desc: 'Feast on meats and spiced vegetables roasted under sand embers in the desert.', type: 'Gastronomy' }
    ],
    travelTips: [
      'Buy a Jordan Pass prior to arrival to waive the visa fee and cover Petra admission.',
      'Start your trek at 6:00 AM to beat midday desert heat and tour crowds.'
    ],
    foodHighlights: [
      { dish: 'Jordanian Mansaf', desc: 'Tender lamb cooked in fermented dried yogurt broth (jameed), served over turmeric rice and toasted almonds.', recommendedSpot: 'Al Qantarah Restaurant' },
      { dish: 'Bedouin Sage Tea & Kunafa', desc: 'Sweet cheese pastry baked in clarified butter topped with pistachio and hot fragrant cardamom tea.', recommendedSpot: 'Wadi Rum Desert Camp' }
    ],
    climateInfo: {
      season: 'Desert Spring/Autumn',
      tempRange: '15°C - 28°C',
      rainfall: 'Virtually zero rainfall with low humidity',
      packingAdvice: 'Keffiyeh scarf for desert dust, breathable linen layers, sturdy hiking shoes.'
    },
    travelStyles: ['Culture', 'Adventure', 'Solo', 'Romantic'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.93,
    reviewsCount: 2980
  },
  {
    id: 'muscat-wahiba-oman',
    name: 'Muscat & Wahiba Sands',
    tagline: 'White Domed Forts, Emerald Wadis & Rolling Ochre Dunes',
    country: 'Oman',
    region: 'Middle East',
    coordinates: { lat: 23.5859, lng: 58.4059 },
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An Arabian wonderland retaining authentic architecture without skyscrapers, featuring marble mosques, secret freshwater canyon pools in Wadi Shab, and towering rolling desert dunes.',
    editorialStory: 'Swimming deep into the narrow canyon of Wadi Shab, sunlight filters down through limestone crevices to light turquoise subterranean caves. Later, watching the sunset over the 100-meter dunes of Wahiba Sands reveals the pure magic of Arabia.',
    bestTimeToVisit: 'October to April (Warm pleasant sun, balmy gulf breezes)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 14500,
    mainAttractions: [
      { name: 'Sultan Qaboos Grand Mosque', desc: 'Architectural marvel featuring Italian Carrara marble, a 14-meter chandelier, and a handwoven Persian carpet.', category: 'Architecture', duration: '2 hrs' },
      { name: 'Wadi Shab Canyon Hike & Cave Swim', desc: 'Hike through palm groves and swim into a hidden cave with an underground waterfall.', category: 'Nature', duration: '4 hrs' },
      { name: 'Wahiba Sands (Sharqiya Sands)', desc: '10,000 square kilometers of rolling amber dunes reaching up to 100 meters high.', category: 'Desert', duration: 'Overnight' }
    ],
    localExperiences: [
      { title: 'Mutrah Souq Frankincense & Silver Discovery', desc: 'Bargain for rare Dhofari Hojari frankincense and antique Omani silver khanjars.', type: 'Culture' },
      { title: 'Dolphin Watching & Snorkeling in Bandar Khayran', desc: 'Sail alongside pods of spinner dolphins in sheltered turquoise fjords.', type: 'Marine' }
    ],
    travelTips: [
      'A 4x4 vehicle is essential for driving into the sands of Wahiba and mountainous Jebel Akhdar.',
      'Dress respectfully in public; cover shoulders and knees.'
    ],
    foodHighlights: [
      { dish: 'Omani Shuwa', desc: 'Meat marinated in date paste and spices, slow-cooked in an underground palm pit for 24-48 hours.', recommendedSpot: 'Bait Al Luban' },
      { dish: 'Omani Halwa & Kahwa', desc: 'Cardamom and rosewater gelatin sweet infused with saffron served with light roasted coffee.', recommendedSpot: 'Nizwa Heritage Market' }
    ],
    climateInfo: {
      season: 'Gulf Winter',
      tempRange: '18°C - 28°C',
      rainfall: 'Virtually rain-free with refreshing sea air',
      packingAdvice: 'Modest lightweight linen, water shoes for wadi hikes, sunglasses.'
    },
    travelStyles: ['Culture', 'Nature', 'Luxury', 'Adventure'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.91,
    reviewsCount: 1120
  },
  {
    id: 'cappadocia-turkey',
    name: 'Cappadocia',
    tagline: 'Fairy Chimneys, Hot Air Balloons & Underground Citadels',
    country: 'Turkey',
    region: 'Middle East',
    coordinates: { lat: 38.6431, lng: 34.8289 },
    heroImage: cappadociaDawnImg,
    gallery: [
      cappadociaDawnImg,
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A fantasy volcanic landscape of honeycombed hills, towering rock spires called fairy chimneys, early Christian cave churches, and hundreds of hot air balloons floating at dawn.',
    editorialStory: 'Floating silently 1,000 feet above Love Valley as dawn breaks, more than a hundred colorful balloons paint the pink-tinged morning sky. Below, ancient pigeon houses and cave homes carved into soft tuff rock tell stories of Roman refuges.',
    bestTimeToVisit: 'April to June & September to November (Mild weather, optimal balloon flight conditions)',
    suggestedDurationDays: 4,
    estimatedBudgetTier: 'Moderate',
    avgDailyCostINR: 9200,
    mainAttractions: [
      { name: 'Sunrise Hot Air Balloon Flight', desc: 'Drift serenely over rose valleys, fairy chimneys, and orchards as morning sun lights the Anatolian plateau.', category: 'Aerial', duration: '3 hrs' },
      { name: 'Göreme Open-Air Museum', desc: 'UNESCO-listed monastery complex carved into rock hills containing 10th-century Byzantine frescoes.', category: 'History', duration: '2.5 hrs' },
      { name: 'Derinkuyu Underground City', desc: 'Eight subterranean levels carved into rock that once sheltered up to 20,000 citizens with livestock and cellars.', category: 'Archaeology', duration: '2 hrs' }
    ],
    localExperiences: [
      { title: 'Cave Suite Stay in an Authentic Troglodyte Hotel', desc: 'Sleep inside centuries-old carved stone rooms with modern luxury baths and panoramic terraces.', type: 'Hospitality' },
      { title: 'Avanos Kick-Wheel Clay Pottery Workshop', desc: 'Shape red clay from the Kızılırmak river alongside multi-generational Anatolian master potters.', type: 'Craft' }
    ],
    travelTips: [
      'Book at least 3-4 mornings in Cappadocia to account for possible wind-related balloon cancellations.',
      'Bring a light jacket for early morning balloon takeoffs when temperatures hover near 5-10°C.'
    ],
    foodHighlights: [
      { dish: 'Testi Kebab (Pottery Kebab)', desc: 'Meat and root vegetables sealed in a clay amphora and baked over fire, cracked open dramatically at your table.', recommendedSpot: 'Dibek Traditional Cave Restaurant' }
    ],
    climateInfo: {
      season: 'Continental Spring/Autumn',
      tempRange: '10°C - 24°C',
      rainfall: 'Dry with crisp Anatolian mountain breeze',
      packingAdvice: 'Layers for chilly dawns and sunny afternoons, comfortable trail runners.'
    },
    travelStyles: ['Romantic', 'Adventure', 'Culture', 'Photography'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.92,
    reviewsCount: 3670
  },

  // ==================== AFRICA ====================
  {
    id: 'serengeti-tanzania',
    name: 'Serengeti & Ngorongoro',
    tagline: 'Endless Golden Savannahs & The Great African Migration',
    country: 'Tanzania',
    region: 'Africa',
    coordinates: { lat: -2.3333, lng: 34.8333 },
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The quintessential African wild frontier. Serengeti hosts the largest terrestrial wildlife migration on earth, alongside the ancient unbroken volcanic caldera of Ngorongoro.',
    editorialStory: 'A pride of black-maned lions rests atop a granite kopje watching two million wildebeest thunder across the golden acacia plains. Under the vast African sky, nature pulses with raw, primordial beauty.',
    bestTimeToVisit: 'June to October (Dry season, dramatic river crossings) & January to March (Calving season)',
    suggestedDurationDays: 6,
    estimatedBudgetTier: 'Ultra-Luxury',
    avgDailyCostINR: 28000,
    mainAttractions: [
      { name: 'Mara River Wildebeest Crossing', desc: 'Heart-stopping spectacle as millions of wildebeest and zebras brave crocodile-infested waters.', category: 'Wildlife', duration: 'Full Day' },
      { name: 'Ngorongoro Crater Floor Safari', desc: 'Descend 600 meters into a volcanic amphitheater home to over 25,000 large mammals including black rhinos.', category: 'Safari', duration: 'Full Day' },
      { name: 'Seronera Valley Predator Tracking', desc: 'Track leopards resting in sausage trees and cheetahs stalking gazelles across open savannahs.', category: 'Wildlife', duration: 'Half Day' }
    ],
    localExperiences: [
      { title: 'Hot Air Balloon Safari at Sunrise over the Plains', desc: 'Float silently above herds of elephants and giraffe, landing for a champagne bush breakfast.', type: 'Luxury' },
      { title: 'Maasai Cultural Village Immersion', desc: 'Learn tribal traditions, fire-making, and adumu jumping dance with Maasai pastoralists.', type: 'Culture' }
    ],
    travelTips: [
      'Pack binoculars (at least 8x42 or 10x42) and telephoto camera lenses.',
      'Neutral-colored clothing (khaki, olive, tan) is recommended; avoid dark blue and black which attract tsetse flies.'
    ],
    foodHighlights: [
      { dish: 'Nyama Choma & Ugali', desc: 'Slow-charcoal-grilled goat and beef seasoned with sea salt served with stone-ground maize porridge and kachumbari salad.', recommendedSpot: 'Luxury Safari Tented Camp' }
    ],
    climateInfo: {
      season: 'Savannah Dry Season',
      tempRange: '14°C - 27°C',
      rainfall: 'Dry with bright sunshine, chilly early morning game drives',
      packingAdvice: 'Warm fleece for open-top dawn drives, safari hat, polarized sunglasses.'
    },
    travelStyles: ['Adventure', 'Nature', 'Luxury', 'Family'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.99,
    reviewsCount: 3820
  },
  {
    id: 'chefchaouen-morocco',
    name: 'Chefchaouen & Rif Mountains',
    tagline: 'The Blue Pearl of Morocco & Olive-Covered Ridges',
    country: 'Morocco',
    region: 'Africa',
    coordinates: { lat: 35.1716, lng: -5.2697 },
    heroImage: chefchaouenMedinaImg,
    gallery: [
      chefchaouenMedinaImg,
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A serene mountain village painted in myriad hues of indigo, sky blue, and cobalt. Chefchaouen blends Andalusian and Moorish aesthetics against the craggy Rif Mountains.',
    editorialStory: 'Every corner in Chefchaouen feels like a surreal painting: cobalt stone steps lined with red clay flowerpots, heavy brass-studded cedar doors, and the sweet scent of mint tea wafting from roadside riads.',
    bestTimeToVisit: 'March to May & September to November (Mild weather, wildflower blooms in Rif Mountains)',
    suggestedDurationDays: 3,
    estimatedBudgetTier: 'Moderate',
    avgDailyCostINR: 6500,
    mainAttractions: [
      { name: 'Medina of Chefchaouen', desc: 'A labyrinth of striking blue-washed alleys, secret archways, and vibrant artisan weaving stalls.', category: 'Townscape', duration: 'Full Day' },
      { name: 'Spanish Mosque (Bouzafar)', desc: 'Perched on a green hill above the medina, offering the most iconic panoramic sunset viewpoint.', category: 'Scenic', duration: '2 hrs' },
      { name: 'Cascades d’Akchour Waterfall Trek', desc: 'Trek through lush canyons to natural turquoise rock pools and the famous God’s Bridge arch.', category: 'Hiking', duration: '5 hrs' }
    ],
    localExperiences: [
      { title: 'Moroccan Tagine Cooking Class in an Authentic Riad', desc: 'Shop for spices in the souq and learn to blend ras el hanout for slow-simmered lamb tagine.', type: 'Gastronomy' }
    ],
    travelTips: [
      'Always ask politely before photographing local medina residents.',
      'Wear shoes with good grip as the polished blue stones can be slippery when wet.'
    ],
    foodHighlights: [
      { dish: 'Rif Mountain Goat Cheese & Olive Oil', desc: 'Creamy artisanal goat cheese drizzled with fresh cold-pressed olive oil and hot flatbread.', recommendedSpot: 'Bab Ssour Riad' },
      { dish: 'Moroccan Chicken Pastilla', desc: 'Flaky layers of warqa pastry filled with tender spiced chicken, toasted almonds, cinnamon, and powdered sugar.', recommendedSpot: 'Cafe Clock' }
    ],
    climateInfo: {
      season: 'Mountain Mediterranean',
      tempRange: '12°C - 24°C',
      rainfall: 'Mild with clear mountain air and breezy evenings',
      packingAdvice: 'Comfortable rubber-soled walking shoes, modest casual cotton clothing.'
    },
    travelStyles: ['Culture', 'Photography', 'Solo', 'Romantic'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.88,
    reviewsCount: 1940
  },
  {
    id: 'franschhoek-south-africa',
    name: 'Franschhoek Wine Valley',
    tagline: 'The French Corner: Cape Dutch Estates & Gourmet Vineyards',
    country: 'South Africa',
    region: 'Africa',
    coordinates: { lat: -33.9100, lng: 19.1200 },
    heroImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'South Africa’s premier culinary capital nestled in a dramatic valley bordered by jagged mountains, founded by 17th-century French Huguenot settlers with whitewashed Cape Dutch manors.',
    editorialStory: 'Riding the open-air Franschhoek Wine Tram past rolling vineyards and centuries-old oak avenues, majestic granite peaks form a dramatic backdrop. Here, world-class Pinotage and Chenin Blanc pair with Michelin-caliber gastronomy.',
    bestTimeToVisit: 'October to April (Warm Cape summer, harvest season from January to March)',
    suggestedDurationDays: 4,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 13500,
    mainAttractions: [
      { name: 'Franschhoek Wine Tram Experience', desc: 'Hop-on hop-off double-decker open-sided tram touring premier historic wine estates.', category: 'Wine', duration: 'Full Day' },
      { name: 'Mont Rochelle Nature Reserve', desc: 'Spectacular hiking trails winding through endemic fynbos flora with panoramic valley vistas.', category: 'Hiking', duration: '3 hrs' },
      { name: 'Huguenot Memorial & Heritage Museum', desc: 'Monument celebrating the cultural and viticultural legacy of the French Huguenot pioneers.', category: 'History', duration: '1.5 hrs' }
    ],
    localExperiences: [
      { title: 'Fine Dining & Pairing at La Petite Colombe', desc: 'Multi-course sensory tasting menu showcasing South African coastal and game produce.', type: 'Gastronomy' },
      { title: 'Cellar Master Vintage Blending Masterclass', desc: 'Blend your own custom barrel-strength vintage under the mentorship of head winemakers.', type: 'Tasting' }
    ],
    travelTips: [
      'Book top vineyard restaurants weeks in advance, especially during the harvest season (Jan-Mar).',
      'Take the tram so everyone can sample wine tastings safely without driving.'
    ],
    foodHighlights: [
      { dish: 'Springbok Carpaccio with Truffle Aioli', desc: 'Thinly sliced cured indigenous venison garnished with shaved parmesan and wild Cape capers.', recommendedSpot: 'Reuben’s Restaurant' }
    ],
    climateInfo: {
      season: 'Cape Summer',
      tempRange: '16°C - 30°C',
      rainfall: 'Warm, dry sunny days with cool mountain valley nights',
      packingAdvice: 'Smart-casual resort attire, sun hat, light evening jacket.'
    },
    travelStyles: ['Luxury', 'Romantic', 'Culture'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.90,
    reviewsCount: 1240
  },

  // ==================== NORTH AMERICA ====================
  {
    id: 'banff-canada',
    name: 'Banff & Lake Louise',
    tagline: 'Glacial Turquoise Waters & Canadian Rocky Mountain Splendor',
    country: 'Canada',
    region: 'North America',
    coordinates: { lat: 51.1784, lng: -115.5708 },
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Canada’s first national park, nestled in the heart of the majestic Alberta Rockies. Home to iridescent turquoise glacial lakes, soaring limestone crags, and alpine wildlife.',
    editorialStory: 'Gliding across the mirror-like waters of Moraine Lake in a hand-crafted cedar canoe, the Valley of the Ten Peaks towers above like a fortress of stone and ice. The silence is profound, broken only by the drip of water from your paddle.',
    bestTimeToVisit: 'June to September (Turquoise lakes fully thawed, alpine hiking) & December to April (Powder ski resort season)',
    suggestedDurationDays: 6,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 18500,
    mainAttractions: [
      { name: 'Moraine Lake & Valley of the Ten Peaks', desc: 'World-renowned glacial lake whose vivid cyan blue water is created by light refracting off rock flour.', category: 'Scenic', duration: 'Half Day' },
      { name: 'Lake Louise & Plain of Six Glaciers', desc: 'Iconic alpine lake backed by Victoria Glacier and historic mountain teahouse trail.', category: 'Hiking', duration: 'Full Day' },
      { name: 'Icefields Parkway Scenic Drive', desc: 'One of the globe’s most magnificent highways connecting Banff to Jasper past over 100 glaciers.', category: 'Road Trip', duration: 'Full Day' }
    ],
    localExperiences: [
      { title: 'Canoeing Moraine Lake at Dawn', desc: 'Paddle across tranquil cyan waters before morning shuttle visitors arrive.', type: 'Nature' },
      { title: 'Soak in Banff Upper Hot Springs', desc: 'Relax in mineral-rich geothermal waters overlooking snow-draped Mount Rundle.', type: 'Wellness' }
    ],
    travelTips: [
      'Private vehicles are restricted at Moraine Lake; reserve Parks Canada shuttles well in advance.',
      'Always carry bear spray and make noise while hiking on mountain backcountry trails.'
    ],
    foodHighlights: [
      { dish: 'Alberta Bison Ribeye Steak', desc: 'Free-range Alberta bison seared to perfection with Saskatoon berry demi-glace.', recommendedSpot: 'The Bison Restaurant Banff' },
      { dish: 'Traditional Canadian Poutine', desc: 'Crispy hand-cut fries smothered in rich beef gravy and authentic squeaky cheese curds.', recommendedSpot: 'Banff Avenue Brewing' }
    ],
    climateInfo: {
      season: 'Alpine Summer',
      tempRange: '8°C - 23°C',
      rainfall: 'Crisp mountain air, occasional afternoon showers',
      packingAdvice: 'Layers! Fleece, waterproof shell, sturdy hiking boots, warm beanie for mornings.'
    },
    travelStyles: ['Nature', 'Adventure', 'Family', 'Photography'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.96,
    reviewsCount: 4500
  },
  {
    id: 'sedona-usa',
    name: 'Sedona & Red Rock Canyon',
    tagline: 'Crimson Sandstone Buttes, Vortex Energy & High Desert Solitude',
    country: 'United States',
    region: 'North America',
    coordinates: { lat: 34.8697, lng: -111.7610 },
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A mystical high-desert sanctuary framed by towering red-rock monoliths, juniper-scented canyons, and renowned natural vortex energy centers.',
    editorialStory: 'Standing on the sandstone ledge of Cathedral Rock as the setting sun ignites the red spires in blazing vermilion, a quiet hum seems to emanate through the earth. Sedona is where raw geological grandeur invites deep personal contemplation.',
    bestTimeToVisit: 'March to May & September to November (Ideal hiking temperatures, crisp desert dawns)',
    suggestedDurationDays: 4,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 17500,
    mainAttractions: [
      { name: 'Cathedral Rock Vortex Trail', desc: 'Iconic scramble up red sandstone ledges to a dramatic notch with vistas of Oak Creek.', category: 'Hiking', duration: '2.5 hrs' },
      { name: 'Devil’s Bridge Natural Arch', desc: 'Sedona’s largest natural sandstone bridge spanning a breathtaking desert canyon.', category: 'Adventure', duration: '3 hrs' },
      { name: 'Chapel of the Holy Cross', desc: 'Modernist architectural marvel built directly into the red rock cliffs in 1956.', category: 'Architecture', duration: '1 hr' }
    ],
    localExperiences: [
      { title: 'Pink Jeep Broken Arrow Off-Road Expedition', desc: 'Climb 45-degree slickrock trails and descend the famous The Road of No Return.', type: 'Adventure' },
      { title: 'Native American Sound Healing & Stargazing', desc: 'Flute melodies and crystal bowl resonance under International Dark Sky certified desert skies.', type: 'Wellness' }
    ],
    travelTips: [
      'Trailhead parking fills by 7:30 AM; utilize the free Sedona Shuttle on peak days.',
      'Carry minimum 2 liters of water per person even on short desert hikes.'
    ],
    foodHighlights: [
      { dish: 'Southwestern Prickly Pear Glazed Pork Chops', desc: 'Mesquite-smoked chops glazed with indigenous cactus fruit reduction and roasted sweet corn polenta.', recommendedSpot: 'Mariposa Latin Inspired Grill' }
    ],
    climateInfo: {
      season: 'High Desert',
      tempRange: '12°C - 27°C',
      rainfall: 'Dry with intensely bright desert sun',
      packingAdvice: 'Sun protection, trail shoes with excellent grip for slickrock, desert layers.'
    },
    travelStyles: ['Nature', 'Wellness', 'Adventure', 'Romantic'],
    isHiddenGem: false,
    isTrending: false,
    rating: 4.90,
    reviewsCount: 2600
  },
  {
    id: 'haida-gwaii-canada',
    name: 'Haida Gwaii',
    tagline: 'Galapagos of the North: Ancient Totems & Moss-Draped Rainforests',
    country: 'Canada',
    region: 'North America',
    coordinates: { lat: 53.2500, lng: -132.0000 },
    heroImage: haidaGwaiiCoastImg,
    gallery: [
      haidaGwaiiCoastImg
    ],
    description: 'An isolated archipelago off the coast of British Columbia, home to the Haida First Nation, thousand-year-old cedar totems, temperate rainforests, and abundant orca pods.',
    editorialStory: 'Walking into SGang Gwaay under ancient moss-covered Western red cedars, weathered mortuary poles gaze toward the Pacific. Here, nature and indigenous spirituality have existed in profound equilibrium for twelve thousand years.',
    bestTimeToVisit: 'June to August (Warmest temperatures, calm ocean crossings, active marine life)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 16000,
    mainAttractions: [
      { name: 'SGang Gwaay (Ninstints) UNESCO Site', desc: 'World’s most intact collection of standing 19th-century Haida mortuary and memorial totems.', category: 'Heritage', duration: 'Full Day' },
      { name: 'Gwaii Haanas National Park Reserve', desc: 'Pristine ecological wilderness of temperate rainforests, sea lion colonies, and secluded bays.', category: 'Wilderness', duration: 'Multi-Day' },
      { name: 'Haida Heritage Centre at Kay Llnagaay', desc: 'Celebrates living Haida culture with active carving sheds, master canoe builders, and museum galleries.', category: 'Culture', duration: '3 hrs' }
    ],
    localExperiences: [
      { title: 'Zodiac Marine Safari with Haida Watchmen', desc: 'Navigate wild channels to remote ancestral village sites guided by indigenous guardians.', type: 'Culture' }
    ],
    travelTips: [
      'Advance reservations are mandatory for Gwaii Haanas entry orientation.',
      'Bring rain gear even in summer; coastal temperate rainforest weather changes rapidly.'
    ],
    foodHighlights: [
      { dish: 'Wild Pacific Dungeness Crab & Halibut', desc: 'Freshly harvested seafood steamed with wild seaweed and served with locally foraged berries.', recommendedSpot: 'Ocean House Dining' }
    ],
    climateInfo: {
      season: 'Oceanic Temperate',
      tempRange: '10°C - 19°C',
      rainfall: 'Coastal mist and moderate rain',
      packingAdvice: 'Waterproof shell, wool sweater, sturdy rubber-soled boots.'
    },
    travelStyles: ['Culture', 'Nature', 'Adventure', 'Solo'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.93,
    reviewsCount: 740
  },

  // ==================== SOUTH AMERICA ====================
  {
    id: 'machu-picchu-peru',
    name: 'Cusco & Machu Picchu',
    tagline: 'Citadel in the Clouds & Sacred Valley of the Incas',
    country: 'Peru',
    region: 'South America',
    coordinates: { lat: -13.1631, lng: -72.5450 },
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The ancient heart of the Incan Empire. Perched at 2,430 meters above the cloud forests of the Urubamba River, Machu Picchu stands as one of humanity’s greatest architectural feats.',
    editorialStory: 'As the morning mist parts over Huayna Picchu, the stone agricultural terraces and temples of the Lost City appear suspended between heaven and earth. Llamas graze peacefully on emerald grass alongside interlocking mortarless granite walls.',
    bestTimeToVisit: 'May to October (Dry Andean winter, crisp blue skies)',
    suggestedDurationDays: 6,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 15000,
    mainAttractions: [
      { name: 'Machu Picchu Historic Sanctuary', desc: 'The 15th-century Incan royal estate featuring the Intihuatana stone, Sun Gate, and Temple of the Three Windows.', category: 'Archaeology', duration: 'Full Day' },
      { name: 'Sacred Valley of the Incas & Pisac', desc: 'Agricultural terraces, lively artisan textile markets, and Ollantaytambo sun fortress.', category: 'Heritage', duration: 'Full Day' },
      { name: 'Cusco Historic Center & Sacsayhuamán', desc: 'Inca capital featuring monumental stone walls and ornate Spanish colonial baroque cathedrals.', category: 'Townscape', duration: 'Half Day' }
    ],
    localExperiences: [
      { title: 'Luxury Hiram Bingham Train Journey', desc: 'Travel in 1920s Pullman-style vintage train cars with live Andean music and gourmet dining.', type: 'Luxury' },
      { title: 'Traditional Andean Pachamanca Earth Cooking', desc: 'Feast on meats and Andean tubers cooked under hot stones underground with herbs.', type: 'Gastronomy' }
    ],
    travelTips: [
      'Acclimatize in Cusco (3,400m) or the lower Sacred Valley (2,870m) for 2 days before hiking.',
      'Machu Picchu tickets are strictly timed and must be reserved months in advance.'
    ],
    foodHighlights: [
      { dish: 'Lomo Saltado', desc: 'Stir-fried beef tenderloin with red onions, aji amarillo chillies, and tomatoes served over rice and crispy fries.', recommendedSpot: 'Cicciolina Cusco' },
      { dish: 'Ceviche Clásico Peruano', desc: 'Fresh sea bass marinated in lime juice, tiger’s milk, red onion, sweet potato, and giant Andean corn.', recommendedSpot: 'Morena Peruvian Kitchen' }
    ],
    climateInfo: {
      season: 'Andean Dry Season',
      tempRange: '5°C - 21°C',
      rainfall: 'Dry with bright mountain sun; cold nights',
      packingAdvice: 'Thermal layers, sun hat, high SPF sunscreen, comfortable hiking boots.'
    },
    travelStyles: ['Culture', 'Adventure', 'History', 'Luxury'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.97,
    reviewsCount: 5120
  },
  {
    id: 'patagonia-torres-del-paine',
    name: 'Patagonia & Torres del Paine',
    tagline: 'Granite Horns, Electric Blue Glaciers & Wild Steppes',
    country: 'Chile',
    region: 'South America',
    coordinates: { lat: -51.2532, lng: -72.8814 },
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The end of the earth: a wild, windswept wilderness of jagged granite towers, massive calving blue glaciers, turquoise lakes, and herds of wild guanacos.',
    editorialStory: 'Watching the morning alpenglow turn the three granite horns of Torres del Paine into radiant pillars of flame, you feel the raw power of the Southern Hemisphere. Icebergs groan and crack as they drift slowly across Grey Lake.',
    bestTimeToVisit: 'November to March (Austral summer, long daylight hours, open hiking trails)',
    suggestedDurationDays: 6,
    estimatedBudgetTier: 'Ultra-Luxury',
    avgDailyCostINR: 23500,
    mainAttractions: [
      { name: 'The Three Towers (Base Las Torres) Trek', desc: 'Demanding trek culminating at the turquoise glacial tarn beneath the 2,800m sheer granite towers.', category: 'Hiking', duration: '8 hrs' },
      { name: 'Grey Glacier Ice Navigation & Ice Hike', desc: 'Cruise alongside 30-meter ice walls of the Southern Patagonian Ice Field.', category: 'Glacial', duration: 'Full Day' },
      { name: 'French Valley (Valle del Francés)', desc: 'Natural amphitheater bordered by hanging glaciers that avalanche thunderously across the valley.', category: 'Trek', duration: 'Full Day' }
    ],
    localExperiences: [
      { title: 'Gaucho Horseback Ride across Patagonian Estancias', desc: 'Ride criollo horses alongside traditional Chilean gauchos across the steppe.', type: 'Culture' }
    ],
    travelTips: [
      'Be prepared for four seasons in one day; gale-force Patagonian winds can exceed 100 km/h.',
      'Refugio and eco-camp reservations must be secured 6-9 months before travel.'
    ],
    foodHighlights: [
      { dish: 'Cordero al Palo (Patagonian Spit-Roasted Lamb)', desc: 'Whole lamb splayed on an iron cross and roasted over beechwood embers for 6 hours.', recommendedSpot: 'Estancia Cerro Guido' }
    ],
    climateInfo: {
      season: 'Austral Summer',
      tempRange: '6°C - 17°C',
      rainfall: 'Rapid weather shifts, frequent intense winds',
      packingAdvice: 'Windproof Gore-Tex gear, neck gaiter, gloves, trekking poles.'
    },
    travelStyles: ['Adventure', 'Nature', 'Photography', 'Luxury'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.96,
    reviewsCount: 3200
  },
  {
    id: 'salar-de-uyuni-bolivia',
    name: 'Salar de Uyuni',
    tagline: 'The World’s Largest Mirror: Infinite Horizons & Salt Hexagons',
    country: 'Bolivia',
    region: 'South America',
    coordinates: { lat: -20.1338, lng: -67.4891 },
    heroImage: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Over 10,000 square kilometers of blinding white salt crust perched at 3,656 meters in southwest Bolivia. During the wet season, a thin film of water transforms the flats into the world’s largest mirror.',
    editorialStory: 'Standing in the center of the Salar after rain, the horizon dissolves completely. Clouds reflect flawlessly below your feet, making you feel as though you are suspended weightlessly inside the sky.',
    bestTimeToVisit: 'January to April (Wet mirror effect) & May to November (Dry salt polygons & accessible islands)',
    suggestedDurationDays: 3,
    estimatedBudgetTier: 'Moderate',
    avgDailyCostINR: 7200,
    mainAttractions: [
      { name: 'The Endless Salt Flats', desc: 'Vast hexagonal crust of crystallized salt stretching into an infinite horizon.', category: 'Nature', duration: 'Full Day' },
      { name: 'Incahuasi Island (Cactus Island)', desc: 'Hilly island of fossilized coral covered in towering 1,000-year-old giant Trichocereus cacti.', category: 'Scenic', duration: '2 hrs' },
      { name: 'Laguna Colorada & Flamingo Colonies', desc: 'Rust-red alpine lake dotted with borax islands and thousands of rare James’s flamingos.', category: 'Wildlife', duration: 'Full Day' }
    ],
    localExperiences: [
      { title: 'Night Stargazing with Mirror Reflection', desc: 'Witness the Milky Way reflected on the flooded flats, creating a 360-degree sphere of stars.', type: 'Astronomy' },
      { title: 'Overnight in a Palace Built Entirely of Salt', desc: 'Stay in a hotel where walls, beds, tables, and sculptures are sculpted from pure salt blocks.', type: 'Hospitality' }
    ],
    travelTips: [
      'Bring extreme UV sunglasses and high-SPF sunscreen; salt reflection is blinding.',
      'Temperatures plunge below freezing at night; thermal undergarments are essential.'
    ],
    foodHighlights: [
      { dish: 'Llama Steak with Quinoa Real', desc: 'Lean, tender seared llama steak paired with royal Bolivian altiplano quinoa salad.', recommendedSpot: 'Palacio de Sal Dining Room' }
    ],
    climateInfo: {
      season: 'High Altiplano',
      tempRange: '-2°C - 19°C',
      rainfall: 'Dry most of the year, seasonal rain Dec-Mar',
      packingAdvice: 'Thermal layers, windbreaker, polarized sunglasses, lip balm.'
    },
    travelStyles: ['Adventure', 'Photography', 'Nature', 'Solo'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.92,
    reviewsCount: 1650
  },

  // ==================== OCEANIA ====================
  {
    id: 'queenstown-milford-sound',
    name: 'Queenstown & Milford Sound',
    tagline: 'Adventure Capital of the World & Fiordland Wonder',
    country: 'New Zealand',
    region: 'Oceania',
    coordinates: { lat: -45.0312, lng: 168.6626 },
    heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled on the shores of crystal Lake Wakatipu beneath the jagged Remarkables mountain range, Queenstown is the world capital of outdoor thrills, leading into the grandeur of Milford Sound.',
    editorialStory: 'Cruising beneath Mitre Peak in Milford Sound as waterfalls tumble thousands of feet directly into the dark fjord, fur seals bask on sunlit rocks while dolphins ride the bow wave. It is raw, primeval nature at its most majestic.',
    bestTimeToVisit: 'December to March (Southern summer, warm outdoor adventures) & June to August (Snow sports)',
    suggestedDurationDays: 6,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 19000,
    mainAttractions: [
      { name: 'Milford Sound Scenic Cruise & Flight', desc: 'Rudyard Kipling’s "Eighth Wonder of the World", featuring vertical cliff faces and Stirling Falls.', category: 'Fjord', duration: 'Full Day' },
      { name: 'Lake Wakatipu & TSS Earnslaw Steamship', desc: 'Cruise the glacial lake on a century-old coal-fired steamship to Walter Peak High Country Farm.', category: 'Scenic', duration: '3.5 hrs' },
      { name: 'Shotover River Jet Boat Canyon Thrill', desc: 'High-speed jet boating through narrow dramatic schist rock canyons at 85 km/h.', category: 'Adventure', duration: '1.5 hrs' }
    ],
    localExperiences: [
      { title: 'Helicopter Alpine Landing on Cecil Peak', desc: 'Land atop a knife-edge mountain ledge for a champagne toast overlooking Queenstown.', type: 'Luxury' },
      { title: 'Bannockburn Central Otago Pinot Noir Tasting', desc: 'Sample world-class cool-climate Pinot Noir at dramatic boutique wineries.', type: 'Wine' }
    ],
    travelTips: [
      'Take a scenic flight from Queenstown to Milford Sound to see glaciers and save hours of driving.',
      'Reserve Fergburger early or order online to skip the legendary hour-long street queue.'
    ],
    foodHighlights: [
      { dish: 'The Fergburger', desc: 'Prime New Zealand beef burger topped with streaky bacon, cheddar, aioli, and tomato relish.', recommendedSpot: 'Fergburger Queenstown' },
      { dish: 'Canterbury Lamb Rump', desc: 'Pasture-fed roast lamb with wild thyme glaze, kumara mash, and charred broccolini.', recommendedSpot: 'Botswana Butchery' }
    ],
    climateInfo: {
      season: 'Oceanic Summer/Autumn',
      tempRange: '10°C - 24°C',
      rainfall: 'Sunny alpine lake weather; Milford Sound has frequent dramatic rainforest downpours',
      packingAdvice: 'Waterproof jacket, layers, sunglasses, walking shoes.'
    },
    travelStyles: ['Adventure', 'Nature', 'Luxury', 'Romantic'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.97,
    reviewsCount: 4200
  },
  {
    id: 'lord-howe-island',
    name: 'Lord Howe Island',
    tagline: 'Crescent Lagoon, Twin Basalt Peaks & Capped Paradise',
    country: 'Australia',
    region: 'Oceania',
    coordinates: { lat: -31.5553, lng: 159.0821 },
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A crescent-shaped volcanic remnant in the Tasman Sea limiting visitors to just 400 at any one time. Features pristine turquoise lagoons, world’s southernmost coral reef, and Mount Gower.',
    editorialStory: 'Riding a bicycle under Kentia palms down roads with no cars, you arrive at Ned’s Beach where wild kingfish and silver spangled trevally swim right up to your ankles to feed from your hand. Paradise truly exists.',
    bestTimeToVisit: 'September to May (Warm swimming waters, calm snorkeling, nesting seabirds)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Ultra-Luxury',
    avgDailyCostINR: 26000,
    mainAttractions: [
      { name: 'Mount Gower Guided Day Climb', desc: 'Rated one of Australia’s top day walks, climbing 875 meters through misty cloud forest.', category: 'Trek', duration: '8 hrs' },
      { name: 'Ned’s Beach Fish Feeding & Snorkel', desc: 'Hand-feed wild wrasse and mullet in waist-deep crystalline water right off the sand.', category: 'Marine', duration: '2 hrs' },
      { name: 'Balls Pyramid Marine Expedition', desc: 'Sail to the world’s tallest volcanic sea stack (562m) rising sheer from deep ocean waters.', category: 'Ocean', duration: 'Half Day' }
    ],
    localExperiences: [
      { title: 'Glass-Bottom Lagoon Snorkel Tour', desc: 'Snorkel amongst colorful coral bommies and green turtles in protected calm water.', type: 'Nature' }
    ],
    travelTips: [
      'Only 400 visitors permitted at once; flights and eco-lodges must be booked 10-12 months ahead.',
      'There is no mobile phone reception on the island, guaranteeing a complete digital detox.'
    ],
    foodHighlights: [
      { dish: 'Fresh-Caught Kingfish Ceviche', desc: 'Line-caught local Lord Howe kingfish cured with lime, coconut cream, and garden chillies.', recommendedSpot: 'Capella Lodge Restaurant' }
    ],
    climateInfo: {
      season: 'Subtropical Maritime',
      tempRange: '18°C - 26°C',
      rainfall: 'Mild subtropical sea breezes with sunny mornings',
      packingAdvice: 'Snorkel gear, reef booties, comfortable cycling clothing, light windbreaker.'
    },
    travelStyles: ['Luxury', 'Nature', 'Romantic', 'Adventure'],
    isHiddenGem: true,
    isTrending: false,
    rating: 4.98,
    reviewsCount: 620
  },
  {
    id: 'whitsundays-australia',
    name: 'Great Barrier Reef & Whitsundays',
    tagline: 'Pure White Silica Sands & Living Coral Metropolises',
    country: 'Australia',
    region: 'Oceania',
    coordinates: { lat: -20.2500, lng: 148.9500 },
    heroImage: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '74 tropical continental islands nestled inside the World Heritage Great Barrier Reef, featuring Whitehaven Beach’s 98% pure silica sands and heart-shaped coral reefs.',
    editorialStory: 'From a seaplane flying low over the Coral Sea, the swirling sands of Hill Inlet look like a watercolor painting of cream and turquoise. Below, sea turtles glide above the natural coral sculpture of Heart Reef.',
    bestTimeToVisit: 'May to November (Dry tropical winter, balmy 25°C temperatures, low humidity)',
    suggestedDurationDays: 5,
    estimatedBudgetTier: 'Luxury',
    avgDailyCostINR: 20500,
    mainAttractions: [
      { name: 'Whitehaven Beach & Hill Inlet Lookout', desc: 'Seven kilometers of pure white silica sand that never heats up under the tropical sun.', category: 'Coastal', duration: 'Full Day' },
      { name: 'Heart Reef & Outer Barrier Reef Fly-Over', desc: 'Scenic flight over the world’s most famous naturally formed heart-shaped coral formation.', category: 'Aerial', duration: '2 hrs' },
      { name: 'Hamilton Island Catseye Beach', desc: 'Island resort base offering catamaran sailing, cockatoos, and panoramic passage views.', category: 'Resort', duration: 'Full Day' }
    ],
    localExperiences: [
      { title: 'Reefsleep Overnight under the Stars', desc: 'Sleep on a pontoon 40 nautical miles offshore on the Great Barrier Reef after day guests depart.', type: 'Luxury' }
    ],
    travelTips: [
      'Wear lycra stinger suits when swimming in open ocean water between October and May.',
      'Visit Hill Inlet during shifting mid-tide to observe the most dramatic swirling sand patterns.'
    ],
    foodHighlights: [
      { dish: 'Coral Coast Coral Trout & Moreton Bay Bugs', desc: 'Grilled local bay bugs with herb garlic butter and fresh Australian citrus salad.', recommendedSpot: 'Bommie Restaurant Hamilton Island' }
    ],
    climateInfo: {
      season: 'Tropical Winter/Spring',
      tempRange: '20°C - 28°C',
      rainfall: 'Low rainfall, gentle trade winds, crystal-clear water',
      packingAdvice: 'Swimwear, polarized sunglasses, linen shirts, sun hat.'
    },
    travelStyles: ['Romantic', 'Luxury', 'Nature', 'Family'],
    isHiddenGem: false,
    isTrending: true,
    rating: 4.95,
    reviewsCount: 3740
  }
];
