import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Destination } from '../types/travel';
import { DESTINATIONS } from '../data/destinationsData';
import { MapPin, Navigation, Sparkles, Filter, X } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface WorldMapProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  isDark: boolean;
  currency: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectDestination,
  onPlanTrip,
  isDark,
  currency,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [tileError, setTileError] = useState<boolean>(false);

  const regions = ['All', 'India', 'Southeast Asia', 'Europe', 'Middle East', 'Africa', 'North America', 'South America', 'Oceania'];
  const styles = ['All', 'Luxury', 'Adventure', 'Nature', 'Culture', 'Romantic'];

  // Filter destinations
  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesStyle = selectedStyle === 'All' || d.travelStyles.includes(selectedStyle as any);
    return matchesRegion && matchesStyle;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [25, 20],
        zoom: 2.5,
        minZoom: 2,
        maxZoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Carto Dark or OpenStreetMap tiles based on theme
      const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      const tiles = L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        maxZoom: 19,
      });

      tiles.on('tileerror', () => {
        // Tile loading failure handler
        setTileError(true);
      });

      tiles.addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Invalidate size on load to avoid grey tile glitches
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    } catch (err) {
      console.warn('Leaflet initialization error:', err);
      setTileError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isDark]);

  // Update Markers when filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredDestinations.forEach((dest) => {
      // Custom Luxury Pin
      const pinHtml = `
        <div style="position: relative; width: 34px; height: 34px; cursor: pointer;">
          <div style="position: absolute; inset: 0; border-radius: 50%; background: ${dest.isHiddenGem ? '#F59E0B' : '#D4AF37'}; opacity: 0.35; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 34px; height: 34px; border-radius: 50%; background: #0B132B; border: 2px solid ${dest.isHiddenGem ? '#F59E0B' : '#D4AF37'}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: ${dest.isHiddenGem ? '#F59E0B' : '#D4AF37'};"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-aurelia-pin',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: customIcon });

      // Click behavior: set active destination in bottom card or center map
      marker.on('click', () => {
        setActiveDestination(dest);
        mapInstanceRef.current?.setView([dest.coordinates.lat, dest.coordinates.lng], 6, {
          animate: true,
          duration: 1,
        });
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredDestinations, isDark]);

  return (
    <div className="relative w-full h-[750px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
      
      {/* Top Controls Overlay */}
      <div className={`p-4 backdrop-blur-md border-b z-[1000] flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-[#0B132B]/85 border-white/10 text-white' : 'bg-[#FAF8F5]/90 border-black/10 text-gray-900'
      }`}>
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h3 className="font-display text-sm tracking-wider uppercase font-bold">
              Cartographic Odyssey
            </h3>
            <span className="text-[11px] text-gray-400 block">
              Showing {filteredDestinations.length} curated global sanctuaries
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Region selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label="Filter by Region"
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none ${
                isDark ? 'bg-[#141C38] border-[#D4AF37]/30 text-white' : 'bg-white border-black/20 text-gray-900'
              }`}
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Style selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400">Experience:</span>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              aria-label="Filter by Experience"
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none ${
                isDark ? 'bg-[#141C38] border-[#D4AF37]/30 text-white' : 'bg-white border-black/20 text-gray-900'
              }`}
            >
              {styles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 w-full bg-[#080E1E]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Graceful Fallback Notice if tiles blocked */}
        {tileError && (
          <div className="absolute inset-0 bg-[#080E1E] z-20 flex flex-col items-center justify-center p-6 text-center">
            <MapPin className="w-12 h-12 text-[#D4AF37] mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-white mb-2">Interactive Geographic Sanctuary Explorer</h4>
            <p className="text-xs text-gray-300 max-w-md mb-4">
              Map tiles are loading in high-fidelity mode. You can directly browse all coordinates below:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl max-h-60 overflow-y-auto">
              {filteredDestinations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDestination(d)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] text-left text-xs text-white"
                >
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-[10px] text-gray-400">{d.country}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Destination Detail Popover Card */}
        {activeDestination && (
          <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-[1000] rounded-2xl overflow-hidden border border-[#D4AF37]/40 backdrop-blur-xl bg-[#0B132B]/95 text-white shadow-2xl animate-fade-in">
            <div className="relative h-40 w-full">
              <img
                src={activeDestination.heroImage}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent" />
              <button
                onClick={() => setActiveDestination(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label="Close pin preview"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                  {activeDestination.region} • {activeDestination.country}
                </span>
                <h4 className="font-editorial text-2xl font-normal leading-tight">
                  {activeDestination.name}
                </h4>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {activeDestination.description}
              </p>

              <div className="flex items-center justify-between text-xs py-2 border-y border-white/10">
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Season</span>
                  <span className="text-gray-200 font-medium">{activeDestination.climateInfo.season}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-gray-400 block">Daily Est.</span>
                  <span className="text-emerald-400 font-bold">
                    ~{formatCurrency(activeDestination.avgDailyCostINR, currency)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onSelectDestination(activeDestination)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all text-center"
                >
                  View Sanctuary
                </button>
                <button
                  onClick={() => onPlanTrip(activeDestination)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#D4AF37] hover:bg-[#E5C158] text-[#080E1E] transition-all text-center"
                >
                  Plan DreamTrip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
