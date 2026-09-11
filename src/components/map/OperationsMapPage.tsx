import React from 'react';
import { 
  Layers, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Info,
  CheckCircle2,
  Table,
  Compass,
  FileSpreadsheet,
  Globe2
} from 'lucide-react';
import { useApp, MapLayerType } from '../../context/AppContext';
import { GisMap } from './GisMap';
import { REGIONS_DATA, OPERATIONAL_LOCATIONS } from '../../data/mockData';
import { RegionId } from '../../types';

export const OperationsMapPage: React.FC = () => {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    mapActiveLayer, 
    setMapActiveLayer,
    navigateTo
  } = useApp();

  // The 3 simplified business-focused map layers
  const layers: { id: MapLayerType; label: string; description: string; badge?: string }[] = [
    { 
      id: 'activity', 
      label: '1. Operational Activity', 
      description: 'Shows where transactions and operational throughput are occurring across facilities.' 
    },
    { 
      id: 'exceptions', 
      label: '2. Exceptions', 
      description: 'Shows where operational problems and validation failures are occurring.',
      badge: '127 Total'
    },
    { 
      id: 'hotspots', 
      label: '3. Hotspots', 
      description: 'Shows where exceptions are geographically concentrated into high-density clusters.',
      badge: '8 Hotspots'
    }
  ];

  // Active region for the side intelligence panel (defaults to Midwest if national)
  const activeRegionId: RegionId = selectedRegion === 'all' ? 'midwest' : selectedRegion;
  const currentRegion = REGIONS_DATA[activeRegionId] || REGIONS_DATA.midwest;

  // Filtered operational locations for the active region
  const regionLocations = OPERATIONAL_LOCATIONS.filter(loc => loc.region === activeRegionId);
  const primaryTerritories = activeRegionId === 'midwest'
    ? [
        { name: 'Chicago Central Logistics Gateway', state: 'IL', exceptions: 16, issue: 'Tabular coordinate displacement' },
        { name: 'Detroit Automotive Operations Depot', state: 'MI', exceptions: 14, issue: 'Vendor ERP template redesign' },
        { name: 'Indianapolis Distribution Hub', state: 'IN', exceptions: 8, issue: 'Tariff rate calculation variance' }
      ]
    : regionLocations.slice(0, 3).map(loc => ({
        name: loc.name,
        state: loc.state,
        exceptions: loc.exception_count,
        issue: loc.primary_issue
      }));

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Spatial Navigation */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Operations GIS Intelligence Map
            </h1>
            <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-400">
              Centerpiece GIS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Question 2: Where is it happening? Visualizing geographic concentration across enterprise facilities.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedRegion('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
              selectedRegion === 'all' 
                ? 'bg-slate-900 text-amber-400 font-bold shadow-xs' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Regions (National)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRegion('midwest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
              selectedRegion === 'midwest' 
                ? 'bg-rose-600 text-white font-bold shadow-xs' 
                : 'bg-white border border-rose-200 text-rose-700 hover:bg-rose-50'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
            Midwest (Primary Hotspot)
          </button>
          {(['northeast', 'south', 'west'] as RegionId[]).map(rId => (
            <button
              key={rId}
              type="button"
              onClick={() => setSelectedRegion(rId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
                selectedRegion === rId 
                  ? 'bg-slate-900 text-amber-400 font-bold shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {REGIONS_DATA[rId].name.replace(' Region', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Control Bar: EXACTLY 3 SIMPLIFIED BUSINESS LAYERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {layers.map((layer) => {
          const isActive = mapActiveLayer === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setMapActiveLayer(layer.id)}
              className={`text-left rounded-xl p-3.5 border transition flex flex-col justify-between ${
                isActive 
                  ? 'border-amber-500 bg-amber-50/50 shadow-xs ring-1 ring-amber-500' 
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${isActive ? 'text-amber-950' : 'text-slate-800'}`}>
                  {layer.label}
                </span>
                {layer.badge && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {layer.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                {layer.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Map + Side Intelligence Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CENTERPIECE GIS MAP (8 Cols) */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-950 shadow-md overflow-hidden flex flex-col">
          {/* Map Status Bar */}
          <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Compass className="h-4 w-4 text-amber-400" />
              <span className="font-semibold">Interactive Spatial Canvas</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400 font-mono">
                Active Layer: {mapActiveLayer.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                Pulsing Hotspots
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-sky-400"></span>
                Active Facilities
              </span>
            </div>
          </div>

          {/* Leaflet Map Component */}
          <GisMap height="520px" />
        </div>

        {/* SIDE INTELLIGENCE PANEL: REGIONAL DRILL-DOWN (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            
            {/* Panel Header */}
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {activeRegionId === 'midwest' ? 'Primary Anomaly Hotspot' : 'Regional Intelligence'}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">{currentRegion.code}</span>
              </div>
              <h2 className="text-lg font-black tracking-tight text-slate-900 mt-1">
                {currentRegion.name}
              </h2>
            </div>

            {/* Core Regional Figures */}
            <div className="grid grid-cols-2 gap-2.5 py-3 border-b border-slate-100">
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Transactions</span>
                <span className="text-lg font-black font-mono text-slate-900 block mt-0.5">
                  {currentRegion.transactions.toLocaleString()}
                </span>
              </div>
              <div className="rounded-lg bg-rose-50 p-2.5 border border-rose-100">
                <span className="text-[10px] font-bold uppercase text-rose-700 block">Active Exceptions</span>
                <span className="text-lg font-black font-mono text-rose-900 block mt-0.5">
                  {currentRegion.exception_count}
                </span>
              </div>
            </div>

            {/* Highest Recurring Issue */}
            <div className="py-3 border-b border-slate-100 space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                Highest Recurring Issue
              </span>
              <p className="text-xs font-bold text-slate-900">
                {activeRegionId === 'midwest' 
                  ? 'Supplier Documentation Mismatch' 
                  : currentRegion.primary_pattern}
              </p>
            </div>

            {/* Geographic Pattern */}
            <div className="py-3 border-b border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                Geographic Pattern
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exceptions are concentrated across three operational territories:
              </p>
              <div className="space-y-1.5 pt-1">
                {primaryTerritories.map((t) => (
                  <div key={t.name} className="flex items-center justify-between text-xs rounded-md bg-slate-50 p-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{t.name}</span>
                    </div>
                    <span className="font-mono font-bold text-rose-600 shrink-0 ml-2">
                      {t.exceptions} ex
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight */}
            <div className="py-3 border-b border-slate-100 space-y-1">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-900">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>AI Insight</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-200">
                "The geographic concentration of similar exceptions suggests a recurring regional process or supplier-related issue rather than isolated processing errors."
              </p>
            </div>

            {/* Recommended Action & CTA */}
            <div className="pt-3 space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                  Recommended Action
                </span>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  Review the supplier documentation workflow affecting this operational region.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('exceptions', activeRegionId)}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 px-4 text-xs font-bold text-amber-400 shadow-xs hover:bg-slate-800 transition"
              >
                <span>DRILL INTO EXCEPTION INTELLIGENCE</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* WHY LOCATION MATTERS: Spatial Intelligence vs Flat Spreadsheet */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Why Location Matters: Turning Data into Decisions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Flat Spreadsheet View */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs pb-2 border-b border-slate-200">
              <FileSpreadsheet className="h-4 w-4 text-slate-400" />
              <span>Flat Spreadsheet / Standard ERP Table</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              In a flat tabular list, 127 individual exception rows appear as random, disconnected statistical noise. 
              Operators treat each error as an isolated manual data-entry mistake, spending hours re-typing numbers without identifying systemic vendor defects.
            </p>
            <div className="mt-3 rounded bg-white p-2 text-[11px] font-mono text-slate-500 border border-slate-200 space-y-1">
              <div>Row 1042: EX-8821 • Invoice format mismatch • $4,840</div>
              <div>Row 1043: EX-8822 • Line item missing • $3,210</div>
              <div>Row 1044: EX-8823 • Tax calculation variance • $2,100</div>
            </div>
          </div>

          {/* GIS Spatial View */}
          <div className="rounded-lg border border-amber-300 bg-amber-50/40 p-4">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs pb-2 border-b border-amber-200">
              <Globe2 className="h-4 w-4 text-amber-600" />
              <span>ARDEM GIS Spatial Intelligence Layer</span>
            </div>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              Projecting automated transactions onto a geographic canvas instantly reveals that <strong>68% of recurring failures cluster into three specific industrial territories</strong> in the Midwest. 
              This immediately isolates a single root cause: a modified supplier invoice layout rather than manual worker error.
            </p>
            <div className="mt-3 rounded bg-white p-2 text-[11px] font-mono text-amber-900 border border-amber-200 font-bold">
              ✓ Pinpoints supplier ERP coordinate shift across Detroit, Chicago, and Indianapolis
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
