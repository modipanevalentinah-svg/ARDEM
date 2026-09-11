import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  FileText, 
  Clock, 
  DollarSign, 
  Building, 
  Cpu, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TransactionDetailDrawer: React.FC = () => {
  const { selectedTransaction, setSelectedTransaction, navigateTo } = useApp();

  if (!selectedTransaction) return null;

  const tx = selectedTransaction;

  const handleViewOnMap = () => {
    setSelectedTransaction(null);
    navigateTo('map', tx.region, {
      layer: 'locations'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setSelectedTransaction(null)}
      />

      {/* Slide-over panel */}
      <div className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl border-l border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-amber-400 font-mono font-bold text-sm">
              TX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 font-mono">
                  {tx.transaction_id}
                </h2>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                  tx.automation_status === 'Fully Automated' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : tx.automation_status === 'Flagged Exception'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {tx.automation_status}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {tx.document_type} • Ingested {tx.date} at {tx.time}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTransaction(null)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
            <div>
              <span className="text-[11px] font-medium text-slate-500">Stated Amount</span>
              <p className="text-sm font-bold text-slate-900 font-mono">
                ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500">AI Confidence</span>
              <p className="text-sm font-bold text-slate-900 font-mono">
                {tx.confidence_score}%
              </p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500">Processing Time</span>
              <p className="text-sm font-bold text-slate-900 font-mono">
                {tx.processing_time} min
              </p>
            </div>
          </div>

          {/* Business Entity Metadata */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Commercial Entities
            </h3>
            <div className="rounded-md border border-slate-200 p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-slate-400" /> Enterprise Client
                </span>
                <span className="font-semibold text-slate-900">{tx.client_name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-slate-400" /> Vendor / Supplier
                </span>
                <span className="font-semibold text-slate-900">{tx.vendor_name}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> Ingestion Pipeline
                </span>
                <span className="font-mono text-slate-700">AWS Textract + ARDEM Spatial Core</span>
              </div>
            </div>
          </div>

          {/* Spatial & GIS Intelligence Context */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Spatial & Location Enrichment
              </h3>
              <button
                type="button"
                onClick={handleViewOnMap}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                <span>View on Map</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="rounded-md border border-slate-200 p-3.5 bg-slate-50/50 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">{tx.location_name}</div>
                  <div className="text-slate-500 text-[11px]">{tx.city}, {tx.state} • Region: {tx.region.toUpperCase()}</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Location ID: <code className="font-mono text-slate-700">{tx.location_id}</code></span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium">
                  Geocoded & Verified
                </span>
              </div>
            </div>
          </div>

          {/* AI Extracted Fields */}
          {tx.extracted_fields && tx.extracted_fields.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  AI Extraction Results
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  Confidence Score: {tx.confidence_score}%
                </span>
              </div>
              <div className="rounded-md border border-slate-200 divide-y divide-slate-100 overflow-hidden text-xs">
                {tx.extracted_fields.map((field, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white hover:bg-slate-50">
                    <div>
                      <span className="font-medium text-slate-500 block">{field.field_name}</span>
                      <span className="font-semibold text-slate-900 font-mono">{field.value}</span>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        field.confidence >= 95 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : field.confidence >= 85 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {field.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Automated Validation Checks */}
          {tx.validation_checks && tx.validation_checks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Automated Validation Rules
              </h3>
              <div className="space-y-2">
                {tx.validation_checks.map((rule, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-md border p-3 text-xs flex items-start gap-2.5 ${
                      rule.passed 
                        ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900' 
                        : 'border-rose-200 bg-rose-50/40 text-rose-900'
                    }`}
                  >
                    {rule.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold block">{rule.rule}</span>
                      <span className="text-[11px] opacity-90">{rule.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedTransaction(null)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleViewOnMap}
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>Locate on GIS Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
