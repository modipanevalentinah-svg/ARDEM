import React, { useState } from 'react';
import { 
  Building, 
  Cpu, 
  AlertTriangle, 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GisMap } from '../map/GisMap';
import { REGIONS_DATA } from '../../data/mockData';

export const OverviewPage: React.FC = () => {
  const { 
    aggregateStats, 
    navigateTo, 
    setSelectedRegion 
  } = useApp();

  // Monthly trend data for Section 1: Transactions vs Exceptions
  const trendData = [
    { month: 'Apr', transactions: 38200, exceptions: 84, rate: 95.8 },
    { month: 'May', transactions: 40100, exceptions: 89, rate: 95.6 },
    { month: 'Jun', transactions: 41500, exceptions: 92, rate: 95.4 },
    { month: 'Jul', transactions: 42900, exceptions: 98, rate: 95.1 },
    { month: 'Aug', transactions: 43400, exceptions: 114, rate: 94.9 },
    { month: 'Sep (Current)', transactions: 42492, exceptions: 127, rate: 94.7 }
  ];

  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(5);
  const activeMonth = trendData[activeMonthIndex];

  const handleExploreMap = () => {
    setSelectedRegion('midwest');
    navigateTo('map', 'midwest', { layer: 'hotspots' });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Operational Overview
            </h1>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
              Question 1: What is happening?
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            High-level executive summary of automated business data throughput and geographic exception patterns.
          </p>
        </div>

        {/* Independent Concept Disclaimer */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-600 border border-slate-200">
          <Info className="h-3.5 w-3.5 text-slate-500 shrink-0" />
          <span>Independent Concept Demonstration • Simulated Data</span>
        </div>
      </div>

      {/* TOP KPI SECTION: Exactly 4 Clear KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Transactions Processed */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Transactions Processed</span>
            <Building className="h-4 w-4 text-slate-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
              {aggregateStats.totalTransactions.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span>+12.4% operational throughput</span>
          </div>
        </div>

        {/* KPI 2: Automation Rate */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Automation Rate</span>
            <Cpu className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
              {aggregateStats.automationRate}%
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <CheckCircle2 className="h-3 w-3" />
            <span>Target: 95.0% (Near optimal)</span>
          </div>
        </div>

        {/* KPI 3: Active Exceptions */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-xs transition hover:border-amber-300">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-xs font-bold uppercase tracking-wider">Active Exceptions</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-950">
              {aggregateStats.activeExceptions}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-amber-700">
            <TrendingUp className="h-3 w-3" />
            <span>+29.6% increase over last 60 days</span>
          </div>
        </div>

        {/* KPI 4: Geographic Hotspots */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 shadow-xs transition hover:border-rose-300">
          <div className="flex items-center justify-between text-rose-800">
            <span className="text-xs font-bold uppercase tracking-wider">Geographic Hotspots</span>
            <MapPin className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-rose-950">
              {aggregateStats.hotspotCount}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-rose-700">
            <span>Requires spatial triage (Top: Midwest)</span>
          </div>
        </div>
      </div>

      {/* OVERVIEW CONTENT: THREE MAJOR SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SECTION 1: Operational Trend (Transactions vs Exceptions) */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-slate-400">Section 1</span>
                <h2 className="text-base font-bold text-slate-900">
                  Operational Trend: Transactions vs. Exceptions
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assessing whether exception activity is increasing or decreasing relative to automated volume
                </p>
              </div>
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 border border-rose-200 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Exceptions Increasing
              </span>
            </div>

            {/* Custom SVG Dual-Metric Visualizer */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span className="h-2.5 w-2.5 rounded-xs bg-slate-800"></span>
                    Transactions (Volume)
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-rose-600">
                    <span className="h-2.5 w-2.5 rounded-xs bg-rose-500"></span>
                    Exceptions (Climbing)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Hover bar to inspect month</span>
              </div>

              {/* Bar & Trend Chart */}
              <div className="mt-4 grid grid-cols-6 gap-2 sm:gap-3 h-48 items-end pt-6">
                {trendData.map((item, idx) => {
                  const isSelected = idx === activeMonthIndex;
                  const maxVolume = 50000;
                  const volumeHeightPct = (item.transactions / maxVolume) * 100;
                  const maxEx = 140;
                  const exHeightPct = (item.exceptions / maxEx) * 100;

                  return (
                    <div 
                      key={item.month}
                      onMouseEnter={() => setActiveMonthIndex(idx)}
                      onClick={() => setActiveMonthIndex(idx)}
                      className={`group relative flex flex-col items-center h-full justify-end cursor-pointer rounded-lg p-1 transition ${
                        isSelected ? 'bg-slate-50 ring-1 ring-slate-300' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      {/* Bar Group: Volume (slate) & Exceptions (rose) */}
                      <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-36">
                        {/* Transaction Volume Bar */}
                        <div 
                          className="w-1/2 rounded-t transition-all bg-slate-800 group-hover:bg-slate-700"
                          style={{ height: `${volumeHeightPct}%` }}
                          title={`${item.transactions.toLocaleString()} Transactions`}
                        ></div>
                        {/* Exception Bar */}
                        <div 
                          className={`w-1/2 rounded-t transition-all ${
                            idx >= 4 ? 'bg-rose-500 group-hover:bg-rose-600' : 'bg-amber-400 group-hover:bg-amber-500'
                          }`}
                          style={{ height: `${exHeightPct}%` }}
                          title={`${item.exceptions} Exceptions`}
                        ></div>
                      </div>

                      {/* Month Label */}
                      <span className={`mt-2 text-[11px] font-semibold ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                        {item.month.replace(' (Current)', '')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trend Insight Footer */}
          <div className="mt-4 rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">
                Selected Period: <strong className="text-slate-900 font-mono">{activeMonth.month}</strong>
              </span>
              <span className="font-mono text-slate-600">
                Volume: <strong>{activeMonth.transactions.toLocaleString()}</strong> • Exceptions: <strong className="text-rose-600">{activeMonth.exceptions}</strong>
              </span>
            </div>
            <p className="text-slate-500 mt-1 text-[11px]">
              {activeMonthIndex >= 4 
                ? '⚠️ Sharp exception acceleration detected. While transaction volume expanded 2.3%, exception occurrences surged +29.6% due to regional supplier formatting mismatches.'
                : 'Operational automation rate remained stable above 95.4% during this baseline quarter.'}
            </p>
          </div>
        </div>

        {/* SECTION 2: Geographic Exception Snapshot (Interactive Map Preview) */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-slate-400">Section 2</span>
                <h2 className="text-base font-bold text-slate-900">
                  Geographic Exception Snapshot
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Interactive preview illustrating spatial variance between normal operations and critical anomaly zones
                </p>
              </div>
              <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-mono font-semibold text-amber-400">
                GIS Preview
              </span>
            </div>

            {/* Visual Status Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Normal Areas (South, PNW, SW, SE)
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-800 border border-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                Emerging Areas (West, Mid-Atlantic)
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-800 border border-rose-200">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                Critical Hotspots (Midwest, Northeast)
              </span>
            </div>

            {/* Map Preview Container */}
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
              <GisMap height="240px" isMiniPreview={true} />
            </div>
          </div>

          {/* Section 2 CTA: EXPLORE GEOGRAPHIC PATTERNS */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Interactive Leaflet GIS map with 100 enterprise facilities
            </span>
            <button
              type="button"
              onClick={handleExploreMap}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-amber-400 shadow-xs hover:bg-slate-800 transition"
            >
              <span>EXPLORE GEOGRAPHIC PATTERNS</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION 3: KEY OPERATIONAL INSIGHT (Prominent Intelligence Card) */}
        <div className="lg:col-span-12 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900 border border-amber-300">
                  <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                  KEY OPERATIONAL INSIGHT
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Synthesized across 248,592 transactions
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                  GEOGRAPHIC EXCEPTION PATTERN DETECTED
                </h3>
                <p className="text-sm font-medium text-slate-700 mt-1 leading-relaxed">
                  <strong>68% of recurring exceptions</strong> are concentrated across three operational regions. 
                  This suggests that the issue is associated with regional workflows or supplier processes rather than isolated processing incidents.
                </p>
              </div>

              {/* Data Breakdown Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-lg bg-white p-3 border border-amber-200 shadow-xs">
                  <span className="text-[11px] font-bold text-rose-700 block uppercase">Primary Hotspot</span>
                  <span className="text-sm font-black text-slate-900 block">Midwest Region (38 Exceptions)</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Recurring Supplier Documentation Mismatch</span>
                </div>
                <div className="rounded-lg bg-white p-3 border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-amber-700 block uppercase">Secondary Pattern</span>
                  <span className="text-sm font-black text-slate-900 block">Northeast Region (37 Exceptions)</span>
                  <span className="text-xs text-slate-500 block mt-0.5">Utility Tariff Variance & Cost Exposure</span>
                </div>
                <div className="rounded-lg bg-white p-3 border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase">Tertiary Pattern</span>
                  <span className="text-sm font-black text-slate-900 block">West Region (14 Exceptions)</span>
                  <span className="text-xs text-slate-500 block mt-0.5">State Compliance Document Latency</span>
                </div>
              </div>
            </div>

            {/* Section 3 CTA: VIEW ON MAP */}
            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleExploreMap}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-md hover:bg-amber-400 transition"
              >
                <span>VIEW ON MAP</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('exceptions', 'midwest')}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition"
              >
                <span>Examine Exception Root Cause</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
