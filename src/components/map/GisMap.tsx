import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useApp, MapLayerType } from '../../context/AppContext';
import { REGIONS_DATA, OPERATIONAL_LOCATIONS } from '../../data/mockData';
import { LocationData, RegionId } from '../../types';

interface GisMapProps {
  height?: string;
  isMiniPreview?: boolean;
  onRegionSelect?: (regionId: RegionId) => void;
  onLocationSelect?: (location: LocationData) => void;
}

export const GisMap: React.FC<GisMapProps> = ({
  height = '560px',
  isMiniPreview = false,
  onRegionSelect,
  onLocationSelect
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const isFirstRender = useRef(true);

  const {
    selectedRegion,
    setSelectedRegion,
    mapActiveLayer,
    setSelectedLocation
  } = useApp();

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center of US
    const initialCenter: [number, number] = [39.8283, -98.5795];
    const initialZoom = isMiniPreview ? 4 : 4;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: !isMiniPreview,
      attributionControl: false,
      scrollWheelZoom: !isMiniPreview,
      doubleClickZoom: !isMiniPreview,
      trackResize: true
    });

    // Add CartoDB Dark Matter tiles (premium enterprise GIS styling)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    layerGroupRef.current = layerGroup;

    // Invalidate size once container layout stabilizes
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    // Watch for container resize (e.g. sidebar toggle or window resize)
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isMiniPreview]);

  // Adjust view when selectedRegion changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Skip flyTo on initial mount to prevent Leaflet zero-dimension animation error
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const size = map.getSize();
    const hasValidDimensions = size.x > 0 && size.y > 0;

    if (selectedRegion === 'all') {
      const nationalCenter: [number, number] = [39.8283, -98.5795];
      const nationalZoom = 4;
      if (hasValidDimensions && !isMiniPreview) {
        map.flyTo(nationalCenter, nationalZoom, { duration: 0.8 });
      } else {
        map.setView(nationalCenter, nationalZoom);
      }
    } else {
      const reg = REGIONS_DATA[selectedRegion];
      if (reg && reg.center && typeof reg.center[0] === 'number' && typeof reg.center[1] === 'number' && !isNaN(reg.center[0]) && !isNaN(reg.center[1])) {
        const targetZoom = reg.zoom || 6;
        if (hasValidDimensions && !isMiniPreview) {
          map.flyTo(reg.center, targetZoom, { duration: 1 });
        } else {
          map.setView(reg.center, targetZoom);
        }
      }
    }
  }, [selectedRegion, isMiniPreview]);

  // Render dynamic GIS layers on map based on mapActiveLayer and selectedRegion
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Filter locations by region if selected
    const locationsToDisplay = selectedRegion === 'all' 
      ? OPERATIONAL_LOCATIONS 
      : OPERATIONAL_LOCATIONS.filter(l => l.region === selectedRegion);

    // 1. Regional Centroids & Performance Markers (always render unless zoomed in tight)
    Object.values(REGIONS_DATA).forEach((region) => {
      if (!region.center || typeof region.center[0] !== 'number' || typeof region.center[1] !== 'number' || isNaN(region.center[0]) || isNaN(region.center[1])) {
        return;
      }

      const isSelected = selectedRegion === region.id;
      
      const regionBadgeHtml = `
        <div class="cursor-pointer transition-transform hover:scale-105" style="transform: translate(-50%, -50%);">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-lg border ${
            isSelected 
              ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400/50' 
              : region.status === 'critical'
              ? 'bg-slate-900/95 text-rose-300 border-rose-500/80'
              : region.status === 'attention'
              ? 'bg-slate-900/95 text-amber-300 border-amber-500/80'
              : 'bg-slate-900/95 text-slate-200 border-slate-700'
          }">
            <span class="text-[11px] font-bold tracking-tight">${region.name.replace(' Region', '')}</span>
            <span class="text-[10px] font-mono px-1 py-0.2 rounded ${
              isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
            }">${region.geoops_score}</span>
          </div>
        </div>
      `;

      const regionIcon = L.divIcon({
        html: regionBadgeHtml,
        className: 'custom-region-icon',
        iconSize: [120, 30],
        iconAnchor: [60, 15]
      });

      const regMarker = L.marker(region.center, { icon: regionIcon });
      regMarker.on('click', () => {
        setSelectedRegion(region.id);
        if (onRegionSelect) onRegionSelect(region.id);
      });

      regMarker.bindTooltip(`
        <div class="p-2 text-xs font-sans">
          <div class="font-bold text-white mb-1">${region.name} (${region.code})</div>
          <div class="text-slate-300 text-[11px] space-y-0.5">
            <div>Score: <strong class="text-amber-400 font-mono">${region.geoops_score}/100</strong></div>
            <div>Transactions: <strong class="text-slate-200 font-mono">${region.transactions.toLocaleString()}</strong></div>
            <div>Automation Rate: <strong class="text-emerald-400 font-mono">${region.automation_rate}%</strong></div>
            <div>Active Exceptions: <strong class="text-rose-400 font-mono">${region.exception_count}</strong></div>
            <div>Cost Exposure: <strong class="text-amber-300 font-mono">$${region.cost_impact.toLocaleString()}</strong></div>
          </div>
        </div>
      `, { direction: 'top', className: 'enterprise-map-tooltip' });

      layerGroup.addLayer(regMarker);
    });

    // 2. Render Location Markers based on active layer
    locationsToDisplay.forEach((loc) => {
      // Validate coordinates strictly
      if (typeof loc.latitude !== 'number' || typeof loc.longitude !== 'number' || isNaN(loc.latitude) || isNaN(loc.longitude)) {
        return;
      }

      let markerColor = '#f59e0b'; // amber default
      let radius = 6;
      let strokeColor = '#ffffff';
      let isHotspotPulse = false;

      if (mapActiveLayer === 'activity') {
        // Proportional circle based on volume (4k to 14k)
        radius = Math.max(6, Math.min(18, (loc.active_volume / 14000) * 16));
        markerColor = '#38bdf8'; // sky blue
        strokeColor = '#bae6fd';
      } else if (mapActiveLayer === 'exceptions') {
        // Scaled by exception count
        radius = Math.max(7, Math.min(18, loc.exception_count * 1.5));
        markerColor = loc.exception_count >= 8 ? '#f97316' : '#f59e0b'; // orange to amber
        strokeColor = '#ffffff';
      } else if (mapActiveLayer === 'hotspots') {
        if (loc.is_hotspot || loc.exception_count >= 8) {
          markerColor = '#ef4444';
          radius = 12;
          isHotspotPulse = true;
        } else {
          markerColor = '#475569';
          radius = 5;
        }
      }

      // If hotspot pulse, render pulse divIcon
      if (isHotspotPulse && (mapActiveLayer === 'hotspots' || isMiniPreview)) {
        const pulseHtml = `
          <div class="relative flex items-center justify-center">
            <span class="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-rose-500 opacity-60"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-rose-600 border-2 border-white shadow-lg"></span>
          </div>
        `;
        const pulseIcon = L.divIcon({
          html: pulseHtml,
          className: 'pulse-hotspot-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const pulseMarker = L.marker([loc.latitude, loc.longitude], { icon: pulseIcon });
        pulseMarker.on('click', () => {
          setSelectedLocation(loc);
          if (onLocationSelect) onLocationSelect(loc);
        });

        pulseMarker.bindPopup(`
          <div class="p-3 text-xs">
            <div class="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
              <span class="h-2 w-2 rounded-full bg-rose-500"></span>
              <span>OPERATIONAL HOTSPOT</span>
            </div>
            <div class="font-bold text-white text-sm">${loc.name}</div>
            <div class="text-slate-400 text-[11px] mb-2">${loc.city}, ${loc.state} • ${loc.territory}</div>
            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/80 font-mono text-[11px]">
              <div>Exceptions: <strong class="text-rose-400">${loc.exception_count}</strong></div>
              <div>Cost Impact: <strong class="text-amber-400">$${loc.cost_impact.toLocaleString()}</strong></div>
              <div>Automation: <strong class="text-slate-200">${loc.automation_rate}%</strong></div>
              <div>Throughput: <strong class="text-slate-200">${loc.active_volume.toLocaleString()}</strong></div>
            </div>
          </div>
        `);
        layerGroup.addLayer(pulseMarker);
      } else {
        // Standard circle marker
        const circleMarker = L.circleMarker([loc.latitude, loc.longitude], {
          radius: radius,
          fillColor: markerColor,
          color: strokeColor,
          weight: 1.5,
          opacity: 0.9,
          fillOpacity: 0.85
        });

        circleMarker.on('click', () => {
          setSelectedLocation(loc);
          if (onLocationSelect) onLocationSelect(loc);
        });

        circleMarker.bindTooltip(`
          <div class="p-2 text-xs font-sans">
            <div class="font-bold text-white">${loc.name}</div>
            <div class="text-slate-400 text-[11px]">${loc.city}, ${loc.state} (${loc.facility_type})</div>
            <div class="mt-1 space-y-0.5 text-slate-300 font-mono text-[11px]">
              <div>Volume: <strong>${loc.active_volume.toLocaleString()}</strong></div>
              <div>Automation: <strong class="text-emerald-400">${loc.automation_rate}%</strong></div>
              <div>Exceptions: <strong class="${loc.exception_count > 5 ? 'text-rose-400' : 'text-slate-300'}">${loc.exception_count}</strong></div>
              <div>Cost Impact: <strong class="text-amber-300">$${loc.cost_impact.toLocaleString()}</strong></div>
            </div>
          </div>
        `, { direction: 'top', className: 'enterprise-map-tooltip' });

        layerGroup.addLayer(circleMarker);
      }
    });

  }, [selectedRegion, mapActiveLayer, onRegionSelect, onLocationSelect, setSelectedRegion, setSelectedLocation, isMiniPreview]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-slate-800 bg-[#0f172a]" style={{ height }}>
      {/* Map DOM target */}
      <div ref={mapContainerRef} className="h-full w-full" />

      {/* Mini controls overlay */}
      {!isMiniPreview && (
        <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedRegion('all')}
            className="flex items-center gap-1.5 rounded-md bg-slate-900/90 px-2.5 py-1.5 text-xs font-semibold text-slate-200 shadow-md backdrop-blur-xs hover:bg-slate-800 hover:text-white border border-slate-700 transition"
            title="Reset to National United States View"
          >
            <span>Reset National View</span>
          </button>
        </div>
      )}

      {/* Layer legend badge */}
      <div className="absolute bottom-3 left-3 z-[400] pointer-events-none">
        <div className="rounded-md bg-slate-950/85 px-3 py-1.5 text-[11px] font-mono text-slate-300 backdrop-blur-xs border border-slate-800 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          <span className="uppercase tracking-wider">
            Layer: {mapActiveLayer.toUpperCase()}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">
            {selectedRegion === 'all' ? 'National Operations View' : `${REGIONS_DATA[selectedRegion]?.name || 'Selected Region'}`}
          </span>
        </div>
      </div>
    </div>
  );
};
