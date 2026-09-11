import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  Flame,
  FileCode,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExceptionData, ExceptionSeverity, RegionId } from '../../types';
import { REGIONS_DATA } from '../../data/mockData';

export const ExceptionsPage: React.FC = () => {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    exceptionsList, 
    setSelectedException,
    navigateTo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter exceptions
  const filteredExceptions = useMemo(() => {
    return exceptionsList.filter(ex => {
      // Region filter
      if (selectedRegion !== 'all' && ex.region !== selectedRegion) return false;
      // Severity
      if (severityFilter !== 'all' && ex.severity !== severityFilter) return false;
      // Status
      if (statusFilter !== 'all' && ex.resolution_status !== statusFilter) return false;
      // Category / Type
      if (categoryFilter !== 'all' && ex.exception_type !== categoryFilter) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          ex.exception_id.toLowerCase().includes(q) ||
          ex.exception_type.toLowerCase().includes(q) ||
          ex.vendor_name.toLowerCase().includes(q) ||
          ex.client_name.toLowerCase().includes(q) ||
          ex.location_name.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [exceptionsList, selectedRegion, severityFilter, statusFilter, categoryFilter, searchQuery]);

  // Calculations
  const totalFinancialExposure = filteredExceptions.reduce((acc, curr) => acc + (curr.resolution_status !== 'Resolved' ? curr.financial_impact : 0), 0);
  const criticalCount = filteredExceptions.filter(e => e.severity === 'Critical' && e.resolution_status !== 'Resolved').length;
  const highCount = filteredExceptions.filter(e => e.severity === 'High' && e.resolution_status !== 'Resolved').length;
  const resolvedCount = filteredExceptions.filter(e => e.resolution_status === 'Resolved').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Value Proposition Banner */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Exception Intelligence
              </h1>
              <span className="rounded bg-rose-100 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-800">
                Root Cause & GIS Synthesis
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Transforming raw error logs into spatial root cause diagnostics: What failed, Why it failed, Where it failed, and How to fix it.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Unresolved Exposure:</span>
            <span className="text-sm font-bold font-mono text-rose-600 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              ${totalFinancialExposure.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 5-Pillar Core Value Callout */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 rounded-lg bg-slate-900 p-3 text-white text-xs">
          <div className="border-r border-slate-800 pr-2">
            <span className="text-slate-400 font-bold block text-[10px]">1. WHAT FAILED</span>
            <span className="text-slate-200 font-medium">Coordinate shift / Tax miscalc</span>
          </div>
          <div className="border-r border-slate-800 pr-2">
            <span className="text-slate-400 font-bold block text-[10px]">2. WHY IT FAILED</span>
            <span className="text-slate-200 font-medium">Supplier layout redesign</span>
          </div>
          <div className="border-r border-slate-800 pr-2">
            <span className="text-slate-400 font-bold block text-[10px]">3. WHERE IT FAILED</span>
            <span className="text-amber-400 font-medium">Midwest / Northeast Hubs</span>
          </div>
          <div className="border-r border-slate-800 pr-2">
            <span className="text-slate-400 font-bold block text-[10px]">4. WHAT IT COSTS</span>
            <span className="text-rose-400 font-medium font-mono">${totalFinancialExposure.toLocaleString()} exposure</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block text-[10px]">5. HOW TO FIX IT</span>
            <span className="text-emerald-400 font-medium">Schema bbox regex sync</span>
          </div>
        </div>
      </div>

      {/* Metric summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Critical Severity</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-rose-600">
              {criticalCount}
            </span>
          </div>
          <span className="text-[11px] text-rose-600 font-medium block mt-1">Requires immediate triage</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">High Severity</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-amber-600">
              {highCount}
            </span>
          </div>
          <span className="text-[11px] text-amber-600 font-medium block mt-1">Investigating workflows</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Active Filtered Records</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {filteredExceptions.length}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Across operational queues</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Resolved / Remediated</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-emerald-600">
              {resolvedCount}
            </span>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">Rules deployed to production</span>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search exceptions by ID, Vendor, Facility, or Root Cause..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Severity */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="Critical">Critical Severity</option>
            <option value="High">High Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="Low">Low Severity</option>
          </select>

          {/* Region */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as any)}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Regions (National)</option>
            {Object.values(REGIONS_DATA).map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Format / Layout Shift">Format / Layout Shift</option>
            <option value="Threshold Violations">Threshold Violations</option>
            <option value="Missing Required Data">Missing Required Data</option>
            <option value="OCR / Scanning Artifacts">OCR / Scanning Artifacts</option>
            <option value="Validation Failures">Validation Failures</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Exception Intelligence Cards List */}
      <div className="space-y-3">
        {filteredExceptions.length > 0 ? (
          filteredExceptions.map(ex => (
            <div
              key={ex.exception_id}
              onClick={() => setSelectedException(ex)}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Metadata & Titles */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {ex.exception_id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      ex.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800'
                        : ex.severity === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ex.severity} Severity
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {ex.exception_type}
                    </span>
                    {ex.is_recurring && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-100 text-purple-800 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Recurring Spatial Pattern
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      ex.resolution_status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Status: {ex.resolution_status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition">
                    {ex.root_cause}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {ex.ai_analysis}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-amber-600" />
                      <span className="font-semibold text-slate-700">{ex.location_name}</span> ({ex.region.toUpperCase()})
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      <span>Vendor: <strong>{ex.vendor_name}</strong></span>
                    </span>
                    <span>Client: <strong>{ex.client_name}</strong></span>
                    <span>Detected: {ex.detected_date}</span>
                  </div>
                </div>

                {/* Right: Financial Impact & Quick Actions */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-6 shrink-0 gap-2">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] text-slate-400 block font-medium">Financial Impact</span>
                    <span className="text-lg font-black font-mono text-rose-600">
                      ${ex.financial_impact.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {ex.affected_count} records affected
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('map', ex.region, { layer: 'hotspots' });
                      }}
                      className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-1"
                    >
                      <MapPin className="h-3.5 w-3.5 text-amber-600" />
                      <span>Map</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedException(ex);
                      }}
                      className="rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition flex items-center gap-1"
                    >
                      <span>Investigate</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-slate-800">No active exceptions match the selected criteria.</p>
            <p className="text-xs text-slate-400 mt-1">Try broadening your region or severity filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
