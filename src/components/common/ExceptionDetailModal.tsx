import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  TrendingDown, 
  Sparkles, 
  Building2, 
  FileCode, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExceptionDetailModal: React.FC = () => {
  const { selectedException, setSelectedException, resolveException, navigateTo } = useApp();
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedException) return null;

  const ex = selectedException;

  const handleResolve = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      resolveException(ex.exception_id, resolutionNotes || 'Extraction bounding box and tariff rules updated in schema registry.');
      setIsSubmitting(false);
      setSelectedException(null);
    }, 400);
  };

  const handleViewGeographicPattern = () => {
    setSelectedException(null);
    navigateTo('map', ex.region, {
      layer: 'hotspots'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedException(null)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with Severity Badge */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white ${
              ex.severity === 'Critical' 
                ? 'bg-rose-600 shadow-md shadow-rose-200' 
                : ex.severity === 'High'
                ? 'bg-amber-600 shadow-md shadow-amber-200'
                : 'bg-blue-600 shadow-md shadow-blue-200'
            }`}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500 font-semibold">{ex.exception_id}</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                  ex.severity === 'Critical'
                    ? 'bg-rose-100 text-rose-800'
                    : ex.severity === 'High'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {ex.severity} Severity
                </span>
                {ex.is_recurring && (
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[11px] font-semibold">
                    Recurring Pattern
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {ex.exception_type}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedException(null)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Impact Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
              <span className="text-[11px] font-medium text-slate-500 block">Financial Impact</span>
              <span className="text-base font-bold text-rose-600 font-mono">
                ${ex.financial_impact.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Annualized exposure</span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
              <span className="text-[11px] font-medium text-slate-500 block">Affected Transactions</span>
              <span className="text-base font-bold text-slate-900 font-mono">
                {ex.affected_count} records
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Clustered in queue</span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
              <span className="text-[11px] font-medium text-slate-500 block">Resolution Status</span>
              <span className={`text-xs font-bold block mt-1 ${
                ex.resolution_status === 'Resolved' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {ex.resolution_status}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Updated: {ex.detected_date}</span>
            </div>
          </div>

          {/* Geographic Context */}
          <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span>Geographic Territory Context</span>
              </div>
              <button
                type="button"
                onClick={handleViewGeographicPattern}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                <span>View Geographic Pattern</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Region</span>
                <span className="font-bold text-slate-900 capitalize">{ex.region}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Operational Facility</span>
                <span className="font-semibold text-slate-800 truncate block">{ex.location_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Primary Vendor</span>
                <span className="font-semibold text-slate-800">{ex.vendor_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Enterprise Client</span>
                <span className="font-semibold text-slate-800">{ex.client_name}</span>
              </div>
            </div>
          </div>

          {/* AI Root Cause Analysis */}
          <div className="rounded-lg border border-purple-200 bg-purple-50/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>AI ROOT CAUSE & EXCEPTION INTELLIGENCE</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {ex.ai_analysis}
            </p>
            <div className="pt-2 border-t border-purple-200/60 text-xs">
              <span className="font-semibold text-purple-950">Technical Root Cause: </span>
              <span className="text-slate-700">{ex.root_cause}</span>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              RECOMMENDED OPERATIONAL ACTION
            </span>
            <p className="text-xs text-slate-800 leading-relaxed">
              {ex.recommended_action}
            </p>
          </div>

          {/* Resolution Input if not yet resolved */}
          {ex.resolution_status !== 'Resolved' ? (
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Resolution & Rule Modification Notes (Optional)
              </label>
              <textarea
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="E.g., Updated coordinate parser for supplier PDF, adjusted column tolerances by +5px..."
                rows={2}
                className="w-full rounded-md border border-slate-300 p-2 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          ) : (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>This exception is marked as Resolved. Automated ingestion rule has been updated.</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedException(null)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleViewGeographicPattern}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-600" />
              <span>View Map</span>
            </button>
            {ex.resolution_status !== 'Resolved' && (
              <button
                type="button"
                onClick={handleResolve}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition disabled:opacity-50"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
                <span>{isSubmitting ? 'Resolving...' : 'Resolve Exception'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
