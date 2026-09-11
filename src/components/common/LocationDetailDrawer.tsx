import React from 'react';
import { 
  X, 
  MapPin, 
  Building2, 
  Cpu, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  ArrowRight,
  Flame,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RECENT_TRANSACTIONS, REGIONS_DATA } from '../../data/mockData';

export const LocationDetailDrawer: React.FC = () => {
  const { selectedLocation, setSelectedLocation, setSelectedTransaction, navigateTo } = useApp();

  if (!selectedLocation) return null;

  const loc = selectedLocation;
  const regionInfo = REGIONS_DATA[loc.region];

  // Associated transactions from this location
  const facilityTransactions = RECENT_TRANSACTIONS.filter(t => t.location_id === loc.location_id);

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setSelectedLocation(null)}
      />

      {/* Slide-over panel */}
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl border-l border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white ${
              loc.is_hotspot ? 'bg-rose-600' : 'bg-slate-900 text-amber-400'
            }`}>
              {loc.is_hotspot ? <Flame className="h-5 w-5 text-white" /> : <MapPin className="h-5 w-5 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500 font-semibold">{loc.location_id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 text-slate-800">
                  {loc.facility_type}
                </span>
                {loc.is_hotspot && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800 animate-pulse">
                    Hotspot
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {loc.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedLocation(null)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-xs">
          {/* Spatial Coordinates & Territory */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Physical Address</span>
                <span className="font-bold text-slate-900">{loc.address}</span>
                <span className="text-slate-600 block">{loc.city}, {loc.state}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Territory</span>
                <span className="font-semibold text-slate-800">{loc.territory}</span>
                <span className="text-slate-500 block capitalize">{loc.region} Region</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>LAT: {loc.latitude.toFixed(4)}</span>
              <span>LON: {loc.longitude.toFixed(4)}</span>
              <span className="text-emerald-700 font-sans font-semibold">Geocoded & Active</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Operational Performance Telemetry
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs">
                <span className="text-[11px] text-slate-500 block">Active Throughput</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {loc.active_volume.toLocaleString()} tx
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Continuous ingestion</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs">
                <span className="text-[11px] text-slate-500 block">Automation Rate</span>
                <span className={`text-base font-bold font-mono ${
                  loc.automation_rate >= 96 ? 'text-emerald-600' : loc.automation_rate >= 93 ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {loc.automation_rate}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Straight-through</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs">
                <span className="text-[11px] text-slate-500 block">Active Exceptions</span>
                <span className={`text-base font-bold font-mono ${
                  loc.exception_count > 5 ? 'text-rose-600' : 'text-slate-900'
                }`}>
                  {loc.exception_count}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">In triage queue</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs">
                <span className="text-[11px] text-slate-500 block">Cost Exposure</span>
                <span className="text-base font-bold text-amber-700 font-mono">
                  ${loc.cost_impact.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Annualized variance</span>
              </div>
            </div>
          </div>

          {/* Regional Context Banner */}
          {regionInfo && (
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Regional Ecosystem: {regionInfo.name}
              </span>
              <p className="text-slate-700 leading-relaxed text-xs">
                {regionInfo.primary_pattern}
              </p>
              <div className="pt-1.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Regional GeoOps Score: <strong>{regionInfo.geoops_score}/100</strong></span>
                <span className="font-semibold text-slate-700">Status: <strong className="capitalize">{regionInfo.status}</strong></span>
              </div>
            </div>
          )}

          {/* Associated Transactions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Sample Ingestion Records for Facility
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{facilityTransactions.length} Sampled</span>
            </div>

            {facilityTransactions.length > 0 ? (
              <div className="divide-y divide-slate-100 rounded-md border border-slate-200 overflow-hidden text-xs">
                {facilityTransactions.map(tx => (
                  <div 
                    key={tx.transaction_id}
                    onClick={() => {
                      setSelectedLocation(null);
                      setSelectedTransaction(tx);
                    }}
                    className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between cursor-pointer transition"
                  >
                    <div>
                      <div className="font-mono font-bold text-slate-900">{tx.transaction_id}</div>
                      <div className="text-slate-500 text-[11px]">{tx.document_type} • {tx.vendor_name}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-800 block">${tx.amount.toLocaleString()}</span>
                      <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                        tx.automation_status === 'Fully Automated' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tx.automation_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-slate-200 p-4 text-center text-slate-500 text-xs">
                All 40+ routine transactions for this facility processed straight-through without manual review.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedLocation(null)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedLocation(null);
              navigateTo('exceptions', loc.region);
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            <span>Review Exceptions ({loc.exception_count})</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
