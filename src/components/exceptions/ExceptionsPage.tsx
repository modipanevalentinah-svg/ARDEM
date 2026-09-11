import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Info,
  RotateCw,
  Search,
  ExternalLink,
  ChevronRight,
  Filter,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExceptionData, RegionId } from '../../types';
import { REGIONS_DATA } from '../../data/mockData';

export const ExceptionsPage: React.FC = () => {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    exceptionsList, 
    setSelectedException,
    showToast,
    navigateTo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [isReprocessing, setIsReprocessing] = useState<boolean>(false);
  const [reprocessingComplete, setReprocessingComplete] = useState<boolean>(false);

  // Handle running the automated reprocessing test
  const handleRunReprocessingTest = () => {
    setIsReprocessing(true);
    setReprocessingComplete(false);

    setTimeout(() => {
      setIsReprocessing(false);
      setReprocessingComplete(true);
      showToast('Automated Reprocessing Test Complete: 38/38 Midwest transactions successfully validated with updated coordinate schema.', 'success');
    }, 1800);
  };

  // Filtered exceptions for the ledger
  const filteredExceptions = useMemo(() => {
    return exceptionsList.filter(ex => {
      if (selectedRegion !== 'all' && ex.region !== selectedRegion) return false;
      if (severityFilter !== 'all' && ex.severity !== severityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          ex.exception_id.toLowerCase().includes(q) ||
          ex.exception_type.toLowerCase().includes(q) ||
          ex.vendor_name.toLowerCase().includes(q) ||
          ex.location_name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [exceptionsList, selectedRegion, severityFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Purpose Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Exception Intelligence
            </h1>
            <span className="rounded bg-rose-100 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-800">
              Question 3: Why is it happening?
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding systemic patterns behind operational exceptions rather than treating them as isolated errors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateTo('ai-insights', selectedRegion)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-amber-400 shadow-xs hover:bg-slate-800 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Operational Assistant</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* EXCEPTION PATTERN SUMMARY: 4 Clear Metric Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Most Common Exception */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Most Common Exception
          </span>
          <span className="text-base font-black text-slate-900 block mt-2 leading-snug">
            Supplier Documentation Mismatch
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Coordinate layout offset in billing ERP
          </span>
        </div>

        {/* Primary Geographic Region Affected */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
            Primary Region Affected
          </span>
          <span className="text-base font-black text-rose-950 block mt-2">
            Midwest Operational Region
          </span>
          <span className="text-xs text-rose-700 block mt-1 font-medium">
            Chicago, Detroit, & Indianapolis hubs
          </span>
        </div>

        {/* Total Exceptions in Pattern */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
            Total Exceptions in Pattern
          </span>
          <span className="text-2xl font-black font-mono text-amber-950 block mt-1">
            38 Active Exceptions
          </span>
          <span className="text-xs text-amber-800 block mt-1 font-semibold">
            68% of recurring national exceptions
          </span>
        </div>

        {/* Estimated Cost or Resolution Impact */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Resolution Financial Impact
          </span>
          <span className="text-2xl font-black font-mono text-emerald-600 block mt-1">
            $184,000 Recoverable
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Eliminates 4.2h manual audit cycle
          </span>
        </div>
      </div>

      {/* PRIMARY INVESTIGATION WORKFLOW (Highlighted Pattern Card) */}
      <div className="rounded-xl border-2 border-rose-300 bg-white shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-rose-500 to-amber-600 px-6 py-3.5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            <h2 className="text-sm sm:text-base font-bold tracking-tight">
              PRIMARY INVESTIGATION: Recurring Geographic Exception Pattern
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-black/30 px-2.5 py-1 rounded">
            Pattern ID: PAT-MW-8821
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Top Row: Issue, Spread, and Affected Locations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-100">
            {/* Recurring Issue */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Recurring Issue
              </span>
              <h3 className="text-base font-black text-slate-900">
                Supplier Documentation Mismatch
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Vendor: <strong>Atlas Hydraulic Parts / Midwest Supply</strong>
                <br />Document Type: Industrial Parts Invoices & Work Orders
              </p>
            </div>

            {/* Geographic Spread */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Geographic Spread
              </span>
              <h3 className="text-base font-black text-rose-700">
                Midwest Operational Region
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Persistent across 3 primary intermodal facilities within a 350-mile logistics corridor.
              </p>
            </div>

            {/* Affected Locations */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Affected Locations
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs rounded-md bg-slate-50 px-2.5 py-1.5 border border-slate-200">
                  <span className="font-semibold text-slate-800">Chicago Central Logistics Gateway</span>
                  <span className="font-mono font-bold text-rose-600">16 ex</span>
                </div>
                <div className="flex items-center justify-between text-xs rounded-md bg-slate-50 px-2.5 py-1.5 border border-slate-200">
                  <span className="font-semibold text-slate-800">Detroit Automotive Operations Depot</span>
                  <span className="font-mono font-bold text-rose-600">14 ex</span>
                </div>
                <div className="flex items-center justify-between text-xs rounded-md bg-slate-50 px-2.5 py-1.5 border border-slate-200">
                  <span className="font-semibold text-slate-800">Indianapolis Distribution Hub</span>
                  <span className="font-mono font-bold text-rose-600">8 ex</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Root Cause Analysis */}
          <div className="rounded-lg bg-amber-50/60 p-4 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>ROOT CAUSE ANALYSIS</span>
            </div>
            <p className="text-xs text-slate-800 mt-1.5 leading-relaxed">
              <strong>Recent changes in supplier invoice formatting caused automated data capture to fail validation rules.</strong>
              <br />
              On September 1st, supplier Atlas Hydraulic Parts upgraded their ERP billing module. The technician labor charge column shifted 45 pixels vertically outside the automated OCR extraction anchor box. As a result, the automation engine flagged valid invoices as missing required billing coordinates.
            </p>
          </div>

          {/* Bottom Row: Recommended Operational Action + Interactive Reprocessing Button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-2">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Recommended Operational Action
              </span>
              <div className="space-y-1 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">1</span>
                  <span><strong>Update automated extraction rules</strong> (re-align OCR anchor coordinates for Atlas Hydraulic Parts).</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">2</span>
                  <span><strong>Contact supplier regarding document formatting</strong> to establish standardized EDI ingestion.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">3</span>
                  <span><strong>Re-process affected transactions</strong> using updated schema rules.</span>
                </div>
              </div>
            </div>

            {/* Reprocessing Action Button */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={handleRunReprocessingTest}
                disabled={isReprocessing}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-xs font-bold shadow-md transition ${
                  reprocessingComplete
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : isReprocessing
                    ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
              >
                <RotateCw className={`h-4 w-4 ${isReprocessing ? 'animate-spin' : ''}`} />
                <span>
                  {isReprocessing 
                    ? 'TESTING EXTRACTION ENGINE...' 
                    : reprocessingComplete 
                    ? 'RE-TEST COMPLETED (38/38 PASSED)' 
                    : 'RUN AUTOMATED REPROCESSING TEST'}
                </span>
              </button>

              {reprocessingComplete && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>38 Midwest exceptions verified ready for batch resolution</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* SECONDARY REGIONAL EXCEPTION PATTERNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Northeast Pattern */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-amber-700 uppercase">Secondary Regional Pattern</span>
            <span className="text-xs font-mono font-bold text-slate-500">Northeast Region</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-2">
            Utility Tariff Rate Variance (NY PSC 22-A Surcharge)
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            37 active exceptions concentrated in Newark and Boston hubs. State clean energy tariff addendum billed outside standard line item grids.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="font-semibold text-rose-600">$210,000 Financial Exposure</span>
            <button
              type="button"
              onClick={() => setSelectedRegion('northeast')}
              className="font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1"
            >
              <span>Filter Northeast</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* West Pattern */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700 uppercase">Tertiary Regional Pattern</span>
            <span className="text-xs font-mono font-bold text-slate-500">West Region</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-2">
            Multi-Page Environmental Compliance Latency
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            14 active exceptions in California logistics depots. Mandatory hazardous material and air resources chain-of-custody stamp validation.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="font-semibold text-amber-600">+1.2 min Processing Delay</span>
            <button
              type="button"
              onClick={() => setSelectedRegion('west')}
              className="font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1"
            >
              <span>Filter West</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* FILTERABLE EXCEPTION LEDGER */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Exception Investigation Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredExceptions.length} records matching current geographic filters
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search exceptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 rounded-md border border-slate-200 bg-white pl-8 pr-3 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="h-8 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">All Regions</option>
              <option value="midwest">Midwest (38)</option>
              <option value="northeast">Northeast (37)</option>
              <option value="west">West (14)</option>
              <option value="south">South (10)</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/75 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Exception ID</th>
                <th className="py-3 px-4">Region & Hub</th>
                <th className="py-3 px-4">Issue Description</th>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4">Impact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExceptions.map((ex) => (
                <tr key={ex.exception_id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {ex.exception_id}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{ex.location_name}</span>
                    <span className="text-[11px] text-slate-400 capitalize">{ex.region} • {ex.city}, {ex.state}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900 block">{ex.exception_type}</span>
                    <span className="text-[11px] text-slate-500">{ex.document_type}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {ex.vendor_name}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-rose-600">
                    ${ex.financial_impact.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      ex.resolution_status === 'Resolved' || (reprocessingComplete && ex.region === 'midwest')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {reprocessingComplete && ex.region === 'midwest' ? 'Remediated' : ex.resolution_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedException(ex)}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
                    >
                      <span>Investigate</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
