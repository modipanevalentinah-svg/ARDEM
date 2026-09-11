import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Download, 
  Printer, 
  Filter, 
  Layers, 
  Building,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { REGIONS_DATA, VENDORS_DATA, OPERATIONAL_LOCATIONS } from '../../data/mockData';

export const AnalyticsPage: React.FC = () => {
  const { selectedRegion, setSelectedRegion, showToast } = useApp();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('monthly');

  const handleExport = (format: string) => {
    showToast(`Exported Analytics Telemetry dataset (${format.toUpperCase()}) successfully.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Export Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Operations & Geographic Analytics
            </h1>
            <span className="rounded bg-slate-900 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-400">
              Executive BI
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Operational cost per transaction, cross-regional benchmarking, and vendor SLA performance.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-md text-xs font-semibold text-slate-600">
            {(['daily', 'weekly', 'monthly', 'quarterly'] as const).map(tf => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded capitalize transition ${
                  timeframe === tf ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleExport('csv')}
            className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Financial & Operational High-Level Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Cost Per Transaction</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900">$0.42</span>
            <span className="text-xs font-bold text-emerald-600">-68% vs manual</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Manual benchmark: $1.32</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">SLA Compliance Rate</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-emerald-600">99.1%</span>
            <span className="text-xs font-bold text-emerald-600">+1.4%</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Under 15-minute SLA target</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Annualized Savings</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-amber-600">$1,840,000</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Straight-through labor savings</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Cost of Exceptions</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-rose-600">$727,000</span>
          </div>
          <span className="text-[11px] text-rose-600 font-medium block mt-1">Opportunity for recovery</span>
        </div>
      </div>

      {/* Regional Performance Benchmarking & Volume Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance Benchmarking */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                GEOGRAPHIC PERFORMANCE BENCHMARKING (8 REGIONS)
              </h2>
              <p className="text-xs text-slate-500">
                Composite GeoOps operational scores, automation efficiency, and variance exposure
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">ARDEM Index</span>
          </div>

          {/* Regional comparison bars */}
          <div className="space-y-3">
            {Object.values(REGIONS_DATA).map(reg => (
              <div key={reg.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{reg.name}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-500">{reg.transactions.toLocaleString()} tx</span>
                    <span className="text-emerald-700 font-bold">{reg.automation_rate}% auto</span>
                    <span className={`px-2 py-0.2 rounded text-[11px] font-bold ${
                      reg.geoops_score >= 90 
                        ? 'bg-emerald-100 text-emerald-900' 
                        : reg.geoops_score >= 80 
                        ? 'bg-amber-100 text-amber-900' 
                        : 'bg-rose-100 text-rose-900'
                    }`}>
                      Score: {reg.geoops_score}/100
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <div 
                    className={`h-full rounded-full ${
                      reg.geoops_score >= 90 ? 'bg-emerald-500' : reg.geoops_score >= 80 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${reg.geoops_score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Volume & Ingestion Mix */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              DOCUMENT TAXONOMY MIX
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Volume split by enterprise document category
            </p>

            <div className="mt-4 space-y-3">
              {[
                { name: 'Utility & Energy Invoices', count: '104,200', pct: 42, color: 'bg-slate-900' },
                { name: 'Freight & Bill of Lading', count: '69,600', pct: 28, color: 'bg-amber-500' },
                { name: 'Direct Purchase Orders', count: '39,800', pct: 16, color: 'bg-emerald-500' },
                { name: 'Service Inspection Reports', count: '24,800', pct: 10, color: 'bg-sky-500' },
                { name: 'Tax & Regulatory Addendums', count: '10,192', pct: 4, color: 'bg-purple-500' },
              ].map((doc, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-700">{doc.name}</span>
                    <span className="font-mono font-bold text-slate-900">{doc.count} ({doc.pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${doc.color}`} style={{ width: `${doc.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 leading-relaxed">
            Utility invoices represent the highest volume class with 96.2% straight-through efficiency.
          </div>
        </div>
      </div>

      {/* Vendor Exception League Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              VENDOR CONFORMANCE & EXCEPTION LEAGUE TABLE
            </h2>
            <p className="text-xs text-slate-500">
              Tracking supplier document formatting stability and variance frequency
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Top 5 Analyzed</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
              <tr>
                <th className="p-3">Vendor / Supplier</th>
                <th className="p-3">Primary Category</th>
                <th className="p-3">Primary Geographic Territory</th>
                <th className="p-3">Total Invoices</th>
                <th className="p-3">Exception Rate</th>
                <th className="p-3">Annualized Impact</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {VENDORS_DATA.slice(0, 5).map(v => (
                <tr key={v.vendor_id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{v.name}</td>
                  <td className="p-3 text-slate-600">{v.category}</td>
                  <td className="p-3 font-medium text-slate-700 capitalize">{v.primary_region}</td>
                  <td className="p-3 font-mono text-slate-800">{v.total_invoices.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold">
                    <span className={v.exception_rate > 5 ? 'text-rose-600' : 'text-emerald-600'}>
                      {v.exception_rate}%
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-amber-700">
                    ${v.cost_impact.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                      v.exception_rate > 5 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {v.exception_rate > 5 ? 'Format Review' : 'Optimal'}
                    </span>
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
