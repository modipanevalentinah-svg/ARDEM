import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Cpu, 
  Sparkles, 
  Filter, 
  Compass, 
  Maximize2, 
  ShieldAlert, 
  ChevronRight,
  BarChart3,
  Eye,
  Activity,
  Flame
} from 'lucide-react';
import { useApp, MapLayerType } from '../../context/AppContext';
import { GisMap } from './GisMap';
import { REGIONS_DATA, OPERATIONAL_LOCATIONS } from '../../data/mockData';
import { RegionId, LocationData } from '../../types';

export const OperationsMapPage: React.FC = () => {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    mapActiveLayer, 
    setMapActiveLayer,
    selectedLocation,
    setSelectedLocation,
    navigateTo,
    setSelectedException,
    exceptionsList
  } = useApp();

  const [spatialTab, setSpatialTab] = useState<'overview' | 'hotspots' | 'cost' | 'risk'>('overview');

  const layers: { id: MapLayerType; label: string; description: string; count?: number }[] = [
    { id: 'locations', label: '1. Operational Locations', description: 'All 100 enterprise distribution hubs, depots & processing facilities' },
    { id: 'volume', label: '2. Transaction Volume', description: 'Scaled density circles based on active document throughput' },
    { id: 'hotspots', label: '3. Exception Hotspots', description: 'Pulsing critical anomaly zones requiring immediate triage', count: 8 },
    { id: 'performance', label: '4. Regional Performance', description: 'GeoOps composite score centroids across 8 territories' },
    { id: 'cost', label: '5. Cost Impact', description: 'Geographic concentration of manual audit and exception financial exposure' },
    { id: 'automation', label: '6. Automation Performance', description: 'Straight-through automation efficiency by operational facility' }
  ];

  const currentRegion = selectedRegion === 'all' ? REGIONS_DATA.midwest : (REGIONS_DATA[selectedRegion] || REGIONS_DATA.midwest);
  
  const hotspotsList = OPERATIONAL_LOCATIONS.filter(l => l.is_hotspot || l.exception_count >= 8);

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Spatial Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Operations GIS Intelligence Map
            </h1>
            <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-400">
              ArcGIS & Leaflet Core
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Spatial Intelligence for Automated Business Operations: Visualizing where automation succeeds and where exceptions cluster.
          </p>
        </div>

        {/* Region Quick Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Territory:</span>
          <button
            type="button"
            onClick={() => setSelectedRegion('all')}
            className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 transition ${
              selectedRegion === 'all' 
                ? 'bg-slate-900 text-amber-400 font-bold' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            National (All 8 Regions)
          </button>
          {(Object.keys(REGIONS_DATA) as RegionId[]).map(rId => (
            <button
              key={rId}
              type="button"
              onClick={() => setSelectedRegion(rId)}
              className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 transition ${
                selectedRegion === rId 
                  ? 'bg-slate-900 text-amber-400 font-bold' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {REGIONS_DATA[rId].name.replace(' Region', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Map & Layer Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Layer Controls Sidebar */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-slate-600" />
                <span>GIS Map Layers</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">6 Layers Active</span>
            </div>

            <div className="mt-3 space-y-2">
              {layers.map(layer => {
                const isActive = mapActiveLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setMapActiveLayer(layer.id)}
                    className={`w-full text-left rounded-lg p-2.5 text-xs transition border ${
                      isActive
                        ? 'border-amber-500 bg-amber-50/60 shadow-xs ring-1 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isActive ? 'text-amber-950' : 'text-slate-800'}`}>
                        {layer.label}
                      </span>
                      {layer.count && (
                        <span className="rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] font-bold text-white">
                          {layer.count}
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] mt-1 leading-snug ${isActive ? 'text-amber-900/80' : 'text-slate-500'}`}>
                      {layer.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map Legend / Guidance */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Legend & Interaction
            </span>
            <div className="space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>Pulsing Red: Exception Hotspot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <span>Green: Automation &gt; 96%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span>Amber: Automation 93% - 96%</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 pt-1">
              Click any region centroid to fly into that regional territory.
            </p>
          </div>
        </div>

        {/* Central Map Canvas */}
        <div className="lg:col-span-3 rounded-xl border border-slate-200 bg-white p-2 shadow-xs flex flex-col">
          <GisMap height="580px" />
        </div>
      </div>

      {/* REGIONAL INTELLIGENCE PANEL (Prompt Specification) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Intelligence Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                REGIONAL INTELLIGENCE PANEL
              </span>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
                {currentRegion.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Operational Score</span>
              <span className="text-xl font-black font-mono text-amber-600">
                {currentRegion.geoops_score} / 100
              </span>
            </div>
          </div>

          {/* Regional KPI Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/70">
              <span className="text-slate-500 text-[11px] block">Transactions</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {currentRegion.transactions.toLocaleString()}
              </span>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/70">
              <span className="text-slate-500 text-[11px] block">Automation Rate</span>
              <span className="text-sm font-bold text-emerald-600 font-mono">
                {currentRegion.automation_rate}%
              </span>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/70">
              <span className="text-slate-500 text-[11px] block">Exceptions</span>
              <span className="text-sm font-bold text-rose-600 font-mono">
                {currentRegion.exception_count}
              </span>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/70">
              <span className="text-slate-500 text-[11px] block">Avg Processing Time</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {currentRegion.avg_processing_time} min
              </span>
            </div>
          </div>

          {/* Cost Impact */}
          <div className="rounded-lg bg-amber-50/60 p-3 border border-amber-200 text-xs">
            <span className="text-[11px] font-semibold text-amber-900 block">Estimated Cost Impact</span>
            <span className="text-lg font-black text-amber-950 font-mono">
              ${currentRegion.cost_impact.toLocaleString()}
            </span>
            <span className="text-[10px] text-amber-800 block mt-0.5">
              Annualized manual review & variance risk
            </span>
          </div>

          {/* AI Recommendation (Prompt Requirement) */}
          <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-purple-900 text-[11px] uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>AI RECOMMENDATION</span>
            </div>
            <p className="text-slate-800 leading-relaxed text-xs">
              {currentRegion.ai_recommendation}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('exceptions', currentRegion.id)}
            className="w-full rounded-md bg-slate-900 py-2 text-center text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            Review Regional Exceptions ({currentRegion.exception_count})
          </button>
        </div>

        {/* SPATIAL ANALYTICS (Prompt Specification) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Spatial Analytics & Risk Zones
              </h2>
              <p className="text-xs text-slate-500">
                Exception density, geographic cost concentration, and operational risk factors
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setSpatialTab('overview')}
                className={`px-2.5 py-1 rounded transition ${spatialTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
              >
                Hotspots
              </button>
              <button
                type="button"
                onClick={() => setSpatialTab('cost')}
                className={`px-2.5 py-1 rounded transition ${spatialTab === 'cost' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
              >
                Cost Concentration
              </button>
              <button
                type="button"
                onClick={() => setSpatialTab('risk')}
                className={`px-2.5 py-1 rounded transition ${spatialTab === 'risk' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
              >
                Risk Zones
              </button>
            </div>
          </div>

          {/* Tab 1: Hotspots table */}
          {spatialTab === 'overview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Identified Operational Hotspot Facilities ({hotspotsList.length} Active)</span>
                <span className="font-medium text-rose-600">74% of Critical Exceptions Origin</span>
              </div>
              <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden text-xs">
                {hotspotsList.map(hotspot => (
                  <div key={hotspot.location_id} className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 font-bold text-xs shrink-0 mt-0.5">
                        <Flame className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{hotspot.name}</div>
                        <div className="text-slate-500 text-[11px]">{hotspot.city}, {hotspot.state} • {hotspot.territory}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right shrink-0">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Exceptions</span>
                        <span className="font-mono font-bold text-rose-600">{hotspot.exception_count}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Cost Exposure</span>
                        <span className="font-mono font-bold text-amber-700">${hotspot.cost_impact.toLocaleString()}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedLocation(hotspot)}
                        className="rounded border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Cost Concentration */}
          {spatialTab === 'cost' && (
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Geographic Cost Concentration Matrix</span>
                  <span className="text-amber-700 font-mono">$727,000 Total National Exposure</span>
                </div>
                <div className="space-y-2">
                  {[
                    { region: 'Northeast Region', cost: 210000, pct: 28.9, factor: 'Unit tariff variance ($48.20/batch)' },
                    { region: 'Midwest Region', cost: 184000, pct: 25.3, factor: 'Supplier invoice coordinate shifts' },
                    { region: 'West Region', cost: 148000, pct: 20.4, factor: 'Environmental manifest multi-pass latency' },
                    { region: 'Southeast Region', cost: 58000, pct: 8.0, factor: 'Intermodal freight demurrage audit' },
                    { region: 'Mid-Atlantic Region', cost: 51000, pct: 7.0, factor: 'Federal contract FAR compliance checks' },
                    { region: 'South Region', cost: 42000, pct: 5.8, factor: 'Lowest regional cost exposure' }
                  ].map((row, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-semibold text-slate-800">{row.region}</span>
                        <span className="font-mono font-bold text-slate-900">${row.cost.toLocaleString()} ({row.pct}%)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block">{row.factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Risk Zones */}
          {spatialTab === 'risk' && (
            <div className="space-y-3 text-xs">
              <div className="rounded-lg border border-rose-200 bg-rose-50/40 p-3.5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <ShieldAlert className="h-4 w-4 text-rose-600" />
                  <span>ZONE 1: Great Lakes Industrial Manufacturing Corridor</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  High concentration of automotive component suppliers (Detroit, Cleveland, Chicago). High risk of unearned vendor discount forfeiture due to tabular parsing shifts.
                </p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-3.5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  <span>ZONE 2: Tri-State Municipal Utility Territory</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Complex regulatory surcharge changes (NY/NJ PSC addendums). Automated invoices defaulting to manual queue due to uncataloged tariff lines.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
