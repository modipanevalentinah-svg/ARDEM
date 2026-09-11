import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Compass,
  Building,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GisMap } from '../map/GisMap';
import { REGIONS_DATA, EXCEPTIONS_DATA } from '../../data/mockData';
import { RegionId } from '../../types';

export const OverviewPage: React.FC = () => {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    aggregateStats, 
    navigateTo, 
    openException = () => {}, 
    setSelectedException,
    currentRegionData
  } = useApp();

  // If a region is selected, use that region; otherwise showcase Midwest as the interactive showcase default or national
  const displayRegion = currentRegionData || REGIONS_DATA.midwest;

  const handleInvestigateMidwest = () => {
    const mwEx = EXCEPTIONS_DATA.find(e => e.exception_id === 'EX-MW-8821');
    if (mwEx) {
      setSelectedException(mwEx);
    } else {
      navigateTo('exceptions', 'midwest');
    }
  };

  const handleViewMidwestMap = () => {
    navigateTo('map', 'midwest', { layer: 'hotspots' });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Good morning, Operations Team
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-mono font-medium text-slate-600 border border-slate-200">
              Enterprise Dashboard
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time visibility into automated business operations and geographic performance.
          </p>
        </div>

        {/* Simulated disclaimer flag */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-800 border border-amber-200">
          <Info className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span className="font-medium">All figures represent simulated demonstration data</span>
        </div>
      </div>

      {/* TOP KPI ROW (Exact values from prompt) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Transactions Processed</span>
            <Building className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              {aggregateStats.totalTransactions.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span>+12.4% vs previous period</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Automation Rate</span>
            <Cpu className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              {aggregateStats.automationRate}%
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span>+3.2% vs target</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Active Exceptions</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              {aggregateStats.activeExceptions}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingDown className="h-3 w-3" />
            <span>-18% reduction</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Geographic Hotspots</span>
            <MapPin className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              {aggregateStats.hotspotCount}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-rose-600">
            <span>Requires attention</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Avg Processing Time</span>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              {aggregateStats.avgProcessingTime} min
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingDown className="h-3 w-3" />
            <span>-22% faster</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Operational Savings</span>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              {aggregateStats.savings}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <span>Annualized estimate</span>
          </div>
        </div>
      </div>

      {/* SECTION A & SECTION B: Operational Performance & Automation Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION A: Operational Performance Trends */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Operational Performance
                </h2>
                <p className="text-xs text-slate-500">
                  Transaction volume trend, automation rate, and manual review rate over the last 6 months
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-sm bg-slate-900"></span> Volume
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500"></span> Automation Rate
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-sm bg-rose-400"></span> Manual Review
                </span>
              </div>
            </div>

            {/* Custom SVG Data Visualization */}
            <div className="mt-6">
              <div className="h-48 w-full">
                <svg viewBox="0 0 600 160" className="h-full w-full overflow-visible">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="0" y1="70" x2="600" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="600" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#e2e8f0" />

                  {/* Volume Bars */}
                  {[
                    { month: 'Apr', vol: 32000, height: 75, x: 30, auto: 91.2, rev: 8.8 },
                    { month: 'May', vol: 36500, height: 90, x: 130, auto: 92.4, rev: 7.6 },
                    { month: 'Jun', vol: 39800, height: 105, x: 230, auto: 93.1, rev: 6.9 },
                    { month: 'Jul', vol: 43200, height: 118, x: 330, auto: 93.9, rev: 6.1 },
                    { month: 'Aug', vol: 46800, height: 132, x: 430, auto: 94.4, rev: 5.6 },
                    { month: 'Sep (YTD)', vol: 49492, height: 142, x: 530, auto: 94.7, rev: 5.3 }
                  ].map((bar, idx) => (
                    <g key={idx}>
                      {/* Bar for volume */}
                      <rect
                        x={bar.x - 18}
                        y={150 - bar.height}
                        width="36"
                        height={bar.height}
                        rx="4"
                        fill="#0f172a"
                        opacity="0.85"
                      />
                      {/* Automation trend point */}
                      <circle
                        cx={bar.x}
                        cy={150 - (bar.auto * 1.35)}
                        r="4"
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      {/* Month label */}
                      <text
                        x={bar.x}
                        y="165"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#64748b"
                        fontWeight="600"
                      >
                        {bar.month}
                      </text>
                    </g>
                  ))}

                  {/* Trend line connecting automation rates */}
                  <path
                    d="M 30,27 L 130,25 L 230,24 L 330,23 L 430,22 L 530,22"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Straight-through volume grew 54% over 6 months</span>
            <button 
              type="button"
              onClick={() => navigateTo('analytics')}
              className="font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition"
            >
              <span>Explore Analytics</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION B: Automation Performance (Donut chart & Rates) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Automation Performance
            </h2>
            <p className="text-xs text-slate-500">
              Current ingestion distribution and straight-through reliability
            </p>

            {/* Donut representation */}
            <div className="mt-4 flex items-center justify-center">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Manual Review slice (5.3%) */}
                  <path
                    className="text-amber-500"
                    strokeDasharray="5.3, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Automated slice (94.7%) */}
                  <path
                    className="text-slate-900"
                    strokeDasharray="94.7, 100"
                    strokeDashoffset="-5.3"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                    94.7%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600">
                    Automated
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-2 rounded-full bg-slate-900"></span> Fully Automated
                </span>
                <span className="font-bold text-slate-900 font-mono">94.7% (235,416)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span> Manual Review
                </span>
                <span className="font-bold text-amber-700 font-mono">5.3% (13,176)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Straight-Through Processing (STP)</span>
                <span className="font-bold text-emerald-700 font-mono">91.2%</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">Document Extraction Accuracy</span>
                <span className="font-bold text-emerald-700 font-mono">99.4%</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('automation')}
            className="mt-3 w-full rounded-md border border-slate-200 bg-slate-50 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            View Automation Pipeline
          </button>
        </div>
      </div>

      {/* SECTION C: Geographic Operations Snapshot (Interactive GIS Map Preview + Live Intelligence Panel) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Geographic Operations Snapshot
              </h2>
              <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                Interactive GIS
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Select any regional badge on the map or click below to update the spatial intelligence panel.
            </p>
          </div>

          {/* Region Quick Selector buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {Object.values(REGIONS_DATA).map(reg => (
              <button
                key={reg.id}
                type="button"
                onClick={() => setSelectedRegion(reg.id)}
                className={`rounded px-2 py-1 text-[11px] font-semibold transition ${
                  selectedRegion === reg.id
                    ? 'bg-slate-900 text-amber-400 font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg.name.replace(' Region', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Map and Regional Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Map Preview Container */}
          <div className="lg:col-span-2">
            <GisMap height="400px" isMiniPreview={true} />
          </div>

          {/* Regional Intelligence Panel (Prompt Midwest example default) */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Regional Intelligence
                  </span>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    {displayRegion.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">GeoOps Score</span>
                  <span className="text-base font-bold font-mono text-amber-600">
                    {displayRegion.geoops_score} / 100
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-white p-2.5 border border-slate-200/80">
                  <span className="text-slate-500 text-[11px] block">Transactions</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {displayRegion.transactions.toLocaleString()}
                  </span>
                </div>
                <div className="rounded bg-white p-2.5 border border-slate-200/80">
                  <span className="text-slate-500 text-[11px] block">Automation Rate</span>
                  <span className="font-bold text-emerald-600 font-mono">
                    {displayRegion.automation_rate}%
                  </span>
                </div>
                <div className="rounded bg-white p-2.5 border border-slate-200/80">
                  <span className="text-slate-500 text-[11px] block">Exceptions</span>
                  <span className="font-bold text-rose-600 font-mono">
                    {displayRegion.exception_count}
                  </span>
                </div>
                <div className="rounded bg-white p-2.5 border border-slate-200/80">
                  <span className="text-slate-500 text-[11px] block">Cost Impact</span>
                  <span className="font-bold text-amber-700 font-mono">
                    ${displayRegion.cost_impact.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* AI Insight Box */}
              <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  <span>AI Insight</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {displayRegion.ai_insight}
                </p>
              </div>
            </div>

            {/* Drilldown button */}
            <div className="pt-3 border-t border-slate-200 mt-3">
              <button
                type="button"
                onClick={() => navigateTo('map', displayRegion.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-md bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
              >
                <Compass className="h-3.5 w-3.5 text-amber-400" />
                <span>Open GIS Full Map for {displayRegion.name.replace(' Region', '')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION D: AI OPERATIONAL INSIGHT (Premium Intelligence Card from Prompt) */}
      <div className="rounded-xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-500/10 via-amber-50/60 to-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-900">
                AI OPERATIONAL INSIGHT
              </h3>
              <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 uppercase">
                High Priority
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-900">
              A recurring exception pattern has been detected across multiple Midwest operational territories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                  LIKELY CAUSE:
                </span>
                <p className="font-medium text-slate-800">
                  Supplier documentation inconsistencies (Atlas Hydraulic Parts & Midwest Power format shift).
                </p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                  POTENTIAL IMPACT:
                </span>
                <p className="font-bold text-rose-600 font-mono">
                  $184,000 annually across 38 queued transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons strictly from Prompt */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            <button
              type="button"
              onClick={handleInvestigateMidwest}
              className="rounded-md bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-700 transition"
            >
              Investigate Pattern
            </button>
            <button
              type="button"
              onClick={handleViewMidwestMap}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              View Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
