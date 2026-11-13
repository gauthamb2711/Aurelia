import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { MapPin, Navigation, RotateCcw, X, Compass, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface WorldMapProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isDark: boolean;
  currency: string;
  embedded?: boolean;
}

// Simplified GeoJSON-style equirectangular landmass silhouettes for offline/fallback vector atlas
const CONTINENT_PATHS = [
  // North America
  'M -168 65 L -140 70 -95 72 -60 52 -67 45 -80 25 -90 21 -97 19 -85 10 -78 9 -83 15 -96 15 -106 20 -117 32 -125 48 -135 58 -155 60 Z',
  // Greenland
  'M -55 76 L -20 82 -18 70 -44 60 -52 68 Z',
  // South America
  'M -78 10 L -62 10 -50 2 -35 -6 -38 -22 -52 -34 -65 -54 -73 -52 -75 -38 -71 -18 -81 -5 Z',
  // Europe & Eurasia & Asia
  'M -9 36 L -9 43 -2 48 6 54 12 58 20 68 32 70 68 70 105 74 140 68 170 66 162 54 142 48 130 35 121 24 108 16 103 2 98 15 90 22 80 12 72 20 62 25 48 28 36 32 30 36 22 38 14 38 4 36 Z',
  // UK & Ireland
  'M -6 50 L -2 58 1 56 -1 51 Z',
  // Japan
  'M 130 31 L 136 35 141 42 145 44 140 36 132 31 Z',
  // Indonesia / Maritime SE Asia
  'M 96 5 L 105 -5 114 -8 106 0 Z M 115 2 L 122 2 120 -3 Z M 130 -2 L 140 -5 138 -9 128 -5 Z',
  // Africa
  'M -17 15 L -6 35 10 37 25 32 34 28 43 12 51 11 41 -5 40 -16 33 -27 20 -35 15 -22 9 -4 2 5 -13 7 Z',
  // Madagascar
  'M 44 -13 L 49 -12 47 -25 43 -24 Z',
  // Australia
  'M 114 -22 L 130 -12 142 -11 153 -25 148 -38 136 -35 125 -34 114 -33 Z',
  // New Zealand
  'M 173 -35 L 178 -38 170 -46 166 -45 Z',
];

export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectDestination,
  onPlanTrip,
  isDark,
  currency,
  embedded = false,
}) => {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [tileErrorCount, setTileErrorCount] = useState<number>(0);

  const regions = [
    'All',
    'India',
    'Southeast Asia',
    'Europe',
    'Middle East',
    'Africa',
    'North America',
    'South America',
    'Oceania',
  ];
  const styles = ['All', 'Luxury', 'Adventure', 'Nature', 'Culture', 'Romantic'];

  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesStyle = selectedStyle === 'All' || d.travelStyles.includes(selectedStyle as any);
    return matchesRegion && matchesStyle;
  });

  const handleResetView = useCallback(() => {
    setActiveDestination(null);
    const map = mapInstanceRef.current;
    if (!map) return;

    const isMobile = window.innerWidth < 640;
    if (filteredDestinations.length > 0 && filteredDestinations.length < DESTINATIONS.length) {
      const bounds = L.latLngBounds(
        filteredDestinations.map((d) => [d.coordinates.lat, d.coordinates.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 6, animate: true });
    } else {
      map.setView([20, 10], isMobile ? 0.75 : 2.3, { animate: true });
    }
  }, [filteredDestinations]);

  const focusDestination = useCallback((dest: Destination) => {
    setActiveDestination(dest);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([dest.coordinates.lat, dest.coordinates.lng], window.innerWidth < 640 ? 4.5 : 5.5, {
        duration: 0.9,
      });
    }
  }, []);

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const isMobile = window.innerWidth < 640;
    const map = L.map(mapContainerRef.current, {
      center: [20, 10],
      zoom: isMobile ? 0.75 : 2.3,
      minZoom: 0.75,
      maxZoom: 12,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      zoomControl: true,
      scrollWheelZoom: !embedded,
      worldCopyJump: true,
    });

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
    });
    resizeObserver.observe(mapContainerRef.current);

    const timer = setTimeout(() => {
      map.invalidateSize({ animate: false });
    }, 300);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      tileLayerRef.current = null;
      markersLayerRef.current = null;
    };
  }, [embedded]);

  // Update tile layer when theme changes (using reliable key-free Esri / OSM tiles)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    setTileErrorCount(0);

    // Key-free reliable tile servers: Esri World Dark Gray Base (dark mode) & Esri World Topo Map (light mode)
    const primaryTileUrl = isDark
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';

    const tiles = L.tileLayer(primaryTileUrl, {
      attribution: '&copy; Esri & OpenStreetMap contributors',
      maxZoom: 16,
      className: isDark ? 'aurelia-dark-tiles' : 'aurelia-light-tiles',
    });

    tiles.on('tileerror', () => {
      setTileErrorCount((prev) => prev + 1);
    });

    tiles.addTo(map);
    tileLayerRef.current = tiles;
  }, [isDark]);

  // Update destination pins when filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    filteredDestinations.forEach((dest) => {
      const isSelected = activeDestination?.id === dest.id;
      const pinColor = dest.isHiddenGem ? '#F59E0B' : '#D4AF37';
      const pinHtml = `
        <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background: ${pinColor}; opacity: ${isSelected ? '0.45' : '0.22'}; transform: scale(${isSelected ? '1.15' : '1'});"></div>
          <div style="position: relative; width: ${isSelected ? '28px' : '22px'}; height: ${isSelected ? '28px' : '22px'}; border-radius: 50%; background: #0B132B; border: 2.5px solid ${pinColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.45); transition: transform 0.2s;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${pinColor};"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-aurelia-pin',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
        icon: customIcon,
        title: `${dest.name}, ${dest.country}`,
        alt: `${dest.name}, ${dest.country}`,
      });

      marker.on('click', () => {
        focusDestination(dest);
      });

      markersGroup.addLayer(marker);
    });
  }, [filteredDestinations, activeDestination, focusDestination]);

  // Adjust bounds smoothly when region filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedRegion === 'All' && selectedStyle === 'All') {
      const isMobile = window.innerWidth < 640;
      map.setView([20, 10], isMobile ? 0.75 : 2.3, { animate: true });
      return;
    }

    if (filteredDestinations.length > 0) {
      const bounds = L.latLngBounds(
        filteredDestinations.map((d) => [d.coordinates.lat, d.coordinates.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [45, 45], maxZoom: 6, animate: true });
    }
  }, [selectedRegion, selectedStyle]);

  const showVectorFallback = tileErrorCount >= 4;

  return (
    <div
      ref={mapWrapperRef}
      className={`relative w-full isolate rounded-2xl sm:rounded-3xl overflow-hidden border shadow-2xl flex flex-col ${
        isDark ? 'border-white/10 bg-[#080E1E]' : 'border-[#DFD5C2] bg-[#FAF8F5]'
      }`}
    >
      {/* Top Controls Bar */}
      <div
        className={`p-3.5 sm:p-4 backdrop-blur-md border-b z-30 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
          isDark
            ? 'bg-[#0B132B]/95 border-white/10 text-white'
            : 'bg-[#FAF8F5]/95 border-[#DFD5C2] text-gray-900'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <Navigation className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div className="min-w-0">
              <h3 className="font-display text-xs sm:text-sm tracking-wider uppercase font-bold truncate">
                Cartographic Odyssey
              </h3>
              <span className={`text-[11px] block truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredDestinations.length} curated global sanctuaries
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetView}
            className={`md:hidden min-h-[38px] px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1 shrink-0 transition-colors ${
              isDark
                ? 'border-white/15 bg-white/5 text-gray-200 hover:border-[#D4AF37]'
                : 'border-black/15 bg-white text-gray-700 hover:border-[#9A7B38]'
            }`}
            title="Reset world view"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs min-w-0">
            <span className={`hidden sm:inline ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label="Filter by Region"
              className={`w-full sm:w-auto min-h-[40px] text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none cursor-pointer ${
                isDark
                  ? 'bg-[#141C38] border-[#D4AF37]/30 text-white'
                  : 'bg-white border-[#D6C7B2] text-gray-900'
              }`}
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r === 'All' ? 'All Regions' : r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs min-w-0">
            <span className={`hidden sm:inline ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Style:</span>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              aria-label="Filter by Experience"
              className={`w-full sm:w-auto min-h-[40px] text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none cursor-pointer ${
                isDark
                  ? 'bg-[#141C38] border-[#D4AF37]/30 text-white'
                  : 'bg-white border-[#D6C7B2] text-gray-900'
              }`}
            >
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Styles' : s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleResetView}
            className={`hidden md:inline-flex min-h-[40px] px-3 py-1.5 rounded-lg border text-xs font-semibold items-center gap-1.5 transition-colors ${
              isDark
                ? 'border-white/15 bg-white/5 text-gray-200 hover:border-[#D4AF37]'
                : 'border-black/15 bg-white text-gray-700 hover:border-[#9A7B38]'
            }`}
            title="Reset world view"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset View
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas */}
      <div
        className={`relative w-full h-[420px] sm:h-[540px] lg:h-[620px] ${
          isDark ? 'bg-[#081124]' : 'bg-[#DCE6EC]'
        }`}
      >
        <div
          ref={mapContainerRef}
          className="w-full h-full z-10"
          aria-label="Interactive World Map of Aurelia Sanctuaries"
        />

        {/* Vector SVG World Atlas Fallback (renders automatically if external tiles fail) */}
        {showVectorFallback && (
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden ${
              isDark ? 'bg-[#081124]' : 'bg-[#EAE4D7]'
            }`}
          >
            <svg
              viewBox="-180 -85 360 170"
              className="w-full h-full object-contain select-none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Vector World Atlas"
            >
              {/* Latitude & Longitude Graticules */}
              {[-60, -30, 0, 30, 60].map((lat) => (
                <line
                  key={`lat-${lat}`}
                  x1={-180}
                  y1={-lat}
                  x2={180}
                  y2={-lat}
                  stroke={isDark ? 'rgba(212,175,55,0.08)' : 'rgba(138,111,50,0.12)'}
                  strokeWidth={0.4}
                />
              ))}
              {[-120, -60, 0, 60, 120].map((lng) => (
                <line
                  key={`lng-${lng}`}
                  x1={lng}
                  y1={-85}
                  x2={lng}
                  y2={85}
                  stroke={isDark ? 'rgba(212,175,55,0.08)' : 'rgba(138,111,50,0.12)'}
                  strokeWidth={0.4}
                />
              ))}

              {/* Continent Landmasses */}
              {CONTINENT_PATHS.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  transform="scale(1, -1)"
                  fill={isDark ? '#162447' : '#D5CBB8'}
                  stroke={isDark ? 'rgba(212,175,55,0.35)' : 'rgba(138,111,50,0.45)'}
                  strokeWidth={0.6}
                />
              ))}

              {/* Interactive Sanctuary Pins */}
              {filteredDestinations.map((dest) => {
                const isSelected = activeDestination?.id === dest.id;
                const fill = dest.isHiddenGem ? '#F59E0B' : '#D4AF37';
                return (
                  <g
                    key={dest.id}
                    transform={`translate(${dest.coordinates.lng}, ${-dest.coordinates.lat})`}
                    onClick={() => setActiveDestination(dest)}
                    className="cursor-pointer"
                  >
                    <circle r={isSelected ? 6 : 4} fill={fill} opacity={0.28} />
                    <circle
                      r={isSelected ? 3.2 : 2.3}
                      fill="#0B132B"
                      stroke={fill}
                      strokeWidth={0.9}
                    />
                    <circle r={1} fill={fill} />
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* Map Legend Pill */}
        <div
          className={`hidden sm:flex items-center gap-4 px-3.5 py-2 rounded-xl border text-[11px] backdrop-blur-md z-20 absolute bottom-4 left-4 ${
            isDark
              ? 'bg-[#0B132B]/85 border-white/15 text-gray-200'
              : 'bg-white/90 border-black/15 text-gray-800 shadow-sm'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" /> Iconic Sanctuary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Hidden Gem
          </span>
        </div>

        {/* Active Destination Popover Card */}
        {activeDestination && (
          <div
            className={`absolute bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 sm:w-96 z-30 rounded-2xl overflow-hidden border backdrop-blur-xl shadow-2xl ${
              isDark
                ? 'bg-[#0B132B]/95 border-[#D4AF37]/40 text-white'
                : 'bg-white/95 border-[#9A7B38]/40 text-gray-900'
            }`}
          >
            <div className="relative h-32 sm:h-40 w-full">
              <img
                src={activeDestination.heroImage}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={() => setActiveDestination(null)}
                className="absolute top-2.5 right-2.5 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full bg-black/65 text-white hover:bg-black/85"
                aria-label="Close pin preview"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2.5 left-3.5 right-10 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  {activeDestination.region} · {activeDestination.country}
                </span>
                <h4 className="font-editorial text-xl sm:text-2xl font-normal leading-tight truncate">
                  {activeDestination.name}
                </h4>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 space-y-3">
              <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {activeDestination.description}
              </p>

              <div
                className={`flex items-center justify-between text-xs py-2 border-y ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <div>
                  <span className={`text-[10px] uppercase block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Season
                  </span>
                  <span className="font-medium">{activeDestination.climateInfo.season}</span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] uppercase block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Daily Est.
                  </span>
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold tabular-nums">
                    ~{formatCurrency(activeDestination.avgDailyCostINR, currency)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectDestination(activeDestination)}
                  className={`flex-1 min-h-[42px] py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                      : 'bg-black/5 hover:bg-black/10 text-gray-900 border-black/15'
                  }`}
                >
                  View Sanctuary
                </button>
                <button
                  onClick={() => onPlanTrip(activeDestination)}
                  className="flex-1 min-h-[42px] py-2 px-3 rounded-xl text-xs font-semibold bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] transition-all text-center"
                >
                  Plan DreamTrip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Touch-Friendly Quick Sanctuary Selector Strip (Ideal for Mobile & Desktop Pin Selection) */}
      <div
        className={`px-3.5 py-3 border-t z-20 ${
          isDark ? 'bg-[#0A1124] border-white/10' : 'bg-[#F4EFE6] border-[#DFD5C2]'
        }`}
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#D4AF37] whitespace-nowrap shrink-0 flex items-center gap-1 pr-1">
            <Compass className="w-3.5 h-3.5" /> Quick Jump:
          </span>
          {filteredDestinations.map((dest) => {
            const isActive = activeDestination?.id === dest.id;
            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => focusDestination(dest)}
                className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 border transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080E1E] font-semibold'
                    : isDark
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:border-[#D4AF37]/60'
                      : 'bg-white border-black/10 text-gray-700 hover:border-[#9A7B38]'
                }`}
              >
                <MapPin className="w-3 h-3 shrink-0" />
                <span>{dest.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
