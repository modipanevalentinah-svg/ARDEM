import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2, MapPin, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportDetailModal: React.FC = () => {
  const { selectedReport, setSelectedReport, showToast } = useApp();

  if (!selectedReport) return null;

  const report = selectedReport;

  const handleExportCSV = () => {
    showToast(`Exported ${report.name} summary to CSV.`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:static">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity print:hidden"
        onClick={() => setSelectedReport(null)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden print:border-none print:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50 print:bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-amber-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500 font-semibold">{report.id}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-slate-200 text-slate-800">
                  {report.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                  {report.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                {report.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedReport(null)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition print:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Report Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Metadata banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 text-xs text-slate-500">
            <div>
              <span className="block font-medium">Reporting Period</span>
              <span className="font-bold text-slate-800">{report.reporting_period}</span>
            </div>
            <div>
              <span className="block font-medium">Date Generated</span>
              <span className="font-bold text-slate-800">{report.date_generated}</span>
            </div>
            <div>
              <span className="block font-medium">Authoring Engine</span>
              <span className="font-bold text-slate-800">ARDEM Spatial AI Core</span>
            </div>
          </div>

          {/* Key KPI Previews */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Metric Highlights
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {report.key_kpi_preview.map((kpi, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                  <span className="text-[11px] font-medium text-slate-500 block">{kpi.label}</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-bold text-slate-900 font-mono">{kpi.value}</span>
                    <span className="text-xs font-bold text-emerald-600">{kpi.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/40 p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Executive Briefing Summary
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Operational Takeaways
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {report.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Geographic Breakdown */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Regional Geographic Intelligence
            </h3>
            <div className="divide-y divide-slate-100 rounded-md border border-slate-200 overflow-hidden text-xs">
              {report.regional_highlights.map((reg, idx) => (
                <div key={idx} className="p-3 bg-white hover:bg-slate-50 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-600" />
                      {reg.region}
                    </span>
                    <p className="text-slate-600 text-[11px]">{reg.finding}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700 font-semibold">
                      {reg.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between print:hidden">
          <button
            type="button"
            onClick={() => setSelectedReport(null)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <Printer className="h-3.5 w-3.5 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
