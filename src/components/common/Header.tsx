import React from 'react';
import { 
  Globe2, 
  Search, 
  Bell, 
  Menu, 
  ShieldAlert, 
  CheckCircle2, 
  Layers, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RegionId } from '../../types';

export const Header: React.FC = () => {
  const { 
    activePage, 
    selectedRegion, 
    setSelectedRegion, 
    aggregateStats, 
    setMobileNavOpen,
    navigateTo,
    setSettingsOpen
  } = useApp();

  const getPageTitle = () => {
    switch (activePage) {
      case 'overview':
        return 'Overview';
      case 'map':
        return 'Operations Map';
      case 'exceptions':
        return 'Exception Intelligence';
      case 'ai-insights':
        return 'AI Operational Assistant';
      default:
        return 'ARDEM GeoOps Intelligence';
    }
  };

  const getPageSubtitle = () => {
    switch (activePage) {
      case 'overview':
        return 'WHAT is happening across national automated operations';
      case 'map':
        return 'WHERE exceptions are occurring geographically';
      case 'exceptions':
        return 'WHY recurring patterns emerge & WHAT to do';
      case 'ai-insights':
        return 'WHAT ACTION operations should take';
      default:
        return 'From Automated Data to Location-Aware Decisions';
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as RegionId | 'all';
    setSelectedRegion(val);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-xs">
      {/* Left side: Mobile menu toggle + Page title + Live Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          title="Open Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
              {getPageTitle()}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              Concept Demo
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-500">
            {getPageSubtitle()}
          </p>
        </div>
      </div>

      {/* Center/Right: Simulated Data Banner + Global Region Selector + Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Independent Concept Disclaimer pill */}
        <div className="hidden xl:flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600" title="Independent concept demonstration using simulated data. Not an official ARDEM product.">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
          <span>Independent Concept • Simulated Data</span>
        </div>

        {/* Global Region Filter Dropdown */}
        <div className="relative flex items-center">
          <Globe2 className="pointer-events-none absolute left-2.5 h-4 w-4 text-slate-400" />
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="h-9 appearance-none rounded-md border border-slate-200 bg-slate-50 pl-8 pr-8 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-100 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            title="Filter entire application by geographic region"
          >
            <option value="all">All Regions (National)</option>
            <option value="midwest">Midwest (Hotspots: Chicago, Detroit)</option>
            <option value="northeast">Northeast (High Cost: NJ, Boston)</option>
            <option value="south">South (Top Automation: Texas)</option>
            <option value="west">West (High Latency: CA, CO)</option>
            <option value="southeast">Southeast (Intermodal: GA, NC)</option>
            <option value="southwest">Southwest (Cross-Border: AZ, NV)</option>
            <option value="mid-atlantic">Mid-Atlantic (Federal / MD, VA)</option>
            <option value="pacific-northwest">Pacific Northwest (Maritime / WA, OR)</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-slate-400" />
        </div>

        {/* Exception Alerts Notification Quick Jump */}
        <button
          type="button"
          onClick={() => navigateTo('exceptions', selectedRegion)}
          className="relative flex h-9 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          title={`${aggregateStats.activeExceptions} active operational exceptions requiring review`}
        >
          <ShieldAlert className="h-4 w-4 text-amber-600" />
          <span className="hidden sm:inline">Exceptions</span>
          <span className="flex h-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-[11px] font-bold text-amber-900">
            {aggregateStats.activeExceptions}
          </span>
        </button>

        {/* Quick Settings Button */}
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
          title="GIS & Automation Platform Settings"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
