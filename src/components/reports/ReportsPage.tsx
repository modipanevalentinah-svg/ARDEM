import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  ChevronRight,
  Eye,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { REPORTS_DATA } from '../../data/mockData';
import { ReportData } from '../../types';

export const ReportsPage: React.FC = () => {
  const { setSelectedReport, showToast } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredReports = filterCategory === 'all' 
    ? REPORTS_DATA 
    : REPORTS_DATA.filter(r => r.category.toLowerCase().includes(filterCategory.toLowerCase()));

  const handleCopySummary = (report: ReportData) => {
    navigator.clipboard.writeText(report.summary);
    setCopiedId(report.id);
    showToast(`Executive summary for ${report.id} copied to clipboard.`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = (report: ReportData) => {
    showToast(`Exported ${report.name} data points to CSV.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Executive Reports & Briefings
            </h1>
            <span className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-mono font-medium text-slate-600 border border-slate-200">
              Audit Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Structured operational scorecards, geographic risk dossiers, and automation ROI assessments.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-8 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Report Categories</option>
            <option value="Executive">Executive Briefings</option>
            <option value="Geographic">Geographic Scorecards</option>
            <option value="Financial">Financial ROI</option>
            <option value="Quality">Exception Dossiers</option>
            <option value="Risk">Risk Assessments</option>
            <option value="Vendor">Vendor Conformance</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredReports.map(report => (
          <div
            key={report.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-400 hover:shadow-md transition"
          >
            <div className="space-y-3">
              {/* Top metadata */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{report.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {report.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {report.status}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    {report.name}
                  </h2>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopySummary(report)}
                    title="Copy Executive Summary"
                    className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                  >
                    {copiedId === report.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportCSV(report)}
                    title="Export CSV"
                    className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Reporting period */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Reporting Window: <strong>{report.reporting_period}</strong> (Generated: {report.date_generated})</span>
              </div>

              {/* Key KPI Previews (Prompt specification) */}
              <div className="grid grid-cols-3 gap-2">
                {report.key_kpi_preview.map((kpi, idx) => (
                  <div key={idx} className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/70 text-xs">
                    <span className="text-[10px] text-slate-500 block truncate">{kpi.label}</span>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="font-bold text-slate-900 font-mono">{kpi.value}</span>
                      <span className="text-[10px] font-bold text-emerald-600">{kpi.delta}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary snippet */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {report.summary}
              </p>

              {/* Regional snapshot highlights */}
              <div className="space-y-1 text-xs pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  GEOGRAPHIC BREAKDOWN SNAPSHOT
                </span>
                <div className="space-y-1">
                  {report.regional_highlights.slice(0, 2).map((rh, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] bg-slate-50 px-2 py-1 rounded">
                      <span className="font-medium text-slate-800 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-600" /> {rh.region}
                      </span>
                      <span className="font-mono text-slate-500">{rh.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {report.highlights.length} audit items verified
              </span>
              <button
                type="button"
                onClick={() => setSelectedReport(report)}
                className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
              >
                <Eye className="h-3.5 w-3.5 text-amber-400" />
                <span>Read Full Briefing</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
