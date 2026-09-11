import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Search, 
  Filter, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Database,
  RefreshCw,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WORKFLOWS_DATA, RECENT_TRANSACTIONS } from '../../data/mockData';
import { TransactionData, DocumentType, AutomationStatus } from '../../types';

export const AutomationPage: React.FC = () => {
  const { 
    selectedRegion, 
    setSelectedRegion, 
    setSelectedTransaction,
    navigateTo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocType, setSelectedDocType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof TransactionData>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Visual Automation Pipeline steps (Exact 8 steps from Prompt)
  const pipelineSteps = [
    { number: 1, title: 'DOCUMENT RECEIVED', desc: 'Ingestion from EDI, Email, Portal', stat: '248,592 total' },
    { number: 2, title: 'AI CLASSIFICATION', desc: 'DocType & Taxonomy ID', stat: '99.8% precision' },
    { number: 3, title: 'DATA EXTRACTION', desc: 'OCR & Tabular Key-Values', stat: '98.4% conf' },
    { number: 4, title: 'AUTOMATED VALIDATION', desc: 'ERP PO 3-way match & tariffs', stat: '94.7% pass' },
    { number: 5, title: 'VALID OR EXCEPTION', desc: 'Straight-through vs triage', stat: '127 active flags' },
    { number: 6, title: 'LOCATION ENRICHMENT', desc: 'Facility geocode & territory', stat: '100 facilities' },
    { number: 7, title: 'GIS INTELLIGENCE', desc: 'Spatial risk clustering', stat: '8 hotspots' },
    { number: 8, title: 'BUSINESS ANALYTICS', desc: 'Operations score & savings', stat: '$1.84M saved' },
  ];

  // Filtering & Sorting transactions
  const filteredTransactions = useMemo(() => {
    return RECENT_TRANSACTIONS.filter(tx => {
      // Region filter
      if (selectedRegion !== 'all' && tx.region !== selectedRegion) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          tx.transaction_id.toLowerCase().includes(q) ||
          tx.client_name.toLowerCase().includes(q) ||
          tx.vendor_name.toLowerCase().includes(q) ||
          tx.location_name.toLowerCase().includes(q) ||
          tx.city.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // DocType filter
      if (selectedDocType !== 'all' && tx.document_type !== selectedDocType) return false;
      // Status filter
      if (selectedStatus !== 'all' && tx.automation_status !== selectedStatus) return false;

      return true;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA === undefined || valB === undefined) return 0;
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [selectedRegion, searchQuery, selectedDocType, selectedStatus, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: keyof TransactionData) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Automation Command Center
            </h1>
            <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-800">
              94.7% Automation Rate
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            End-to-end document classification, spatial location enrichment, and straight-through processing telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Queue Status:</span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Zero Ingestion Lag
          </span>
        </div>
      </div>

      {/* AUTOMATION METRICS (Prompt Specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Documents Processing</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              42 Active
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">In real-time ingestion queue</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Automation Success Rate</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-emerald-600">
              94.7%
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 mt-1 block font-semibold">+3.2% vs target</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Manual Review Queue</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-amber-600">
              14 Pending
            </span>
          </div>
          <span className="text-[10px] text-amber-600 mt-1 block font-semibold">-34% this week</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Average Processing Time</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-slate-900">
              2.8 min
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 mt-1 block font-semibold">-22% faster</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Processing Accuracy</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono tracking-tight text-emerald-600">
              99.4%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Verified across 250k tx</span>
        </div>
      </div>

      {/* COMPLETE AUTOMATION PIPELINE DIAGRAM (Prompt Specification) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              COMPLETE AUTOMATION PIPELINE ARCHITECTURE
            </h2>
            <p className="text-xs text-slate-500">
              Ingestion, validation, and spatial enrichment workflow sequence
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">8 Stage Synchronous Flow</span>
        </div>

        {/* Responsive Horizontal / Grid Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {pipelineSteps.map((step, idx) => (
            <div 
              key={idx} 
              className="relative flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs hover:border-amber-400 hover:bg-amber-50/30 transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-amber-400 font-mono">
                    {step.number}
                  </span>
                  {idx < 7 && (
                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-amber-500 transition hidden lg:block" />
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-[11px] leading-tight mb-1">
                  {step.title}
                </h3>
                <p className="text-[10px] text-slate-500 leading-snug">
                  {step.desc}
                </p>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-200/60 font-mono text-[10px] font-bold text-amber-700">
                {step.stat}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT TRANSACTIONS TABLE (Prompt Specification) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Transactions Queue
            </h2>
            <p className="text-xs text-slate-500">
              Click any transaction row to inspect AI extraction results, confidence score, and spatial context.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search ID, Client, Vendor, City..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="h-8 w-48 sm:w-60 rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* DocType filter */}
            <select
              value={selectedDocType}
              onChange={(e) => { setSelectedDocType(e.target.value); setCurrentPage(1); }}
              className="h-8 rounded-md border border-slate-200 bg-slate-50 px-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Document Types</option>
              <option value="Utility Invoice">Utility Invoice</option>
              <option value="Freight Invoice">Freight Invoice</option>
              <option value="Service Report">Service Report</option>
              <option value="Purchase Document">Purchase Document</option>
              <option value="Operational Record">Operational Record</option>
            </select>

            {/* Status filter */}
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="h-8 rounded-md border border-slate-200 bg-slate-50 px-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Fully Automated">Fully Automated</option>
              <option value="Manual Review">Manual Review</option>
              <option value="Flagged Exception">Flagged Exception</option>
            </select>
          </div>
        </div>

        {/* Transactions Data Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
              <tr>
                <th className="p-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('transaction_id')}>
                  Transaction ID {sortField === 'transaction_id' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="p-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('document_type')}>
                  Document Type {sortField === 'document_type' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="p-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('client_name')}>
                  Client & Vendor {sortField === 'client_name' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="p-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('location_name')}>
                  Location & Territory {sortField === 'location_name' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="p-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('automation_status')}>
                  Automation Status {sortField === 'automation_status' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="p-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('confidence_score')}>
                  Confidence {sortField === 'confidence_score' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="p-3 cursor-pointer hover:text-slate-800" onClick={() => handleSort('processing_time')}>
                  Time {sortField === 'processing_time' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="p-3">Exception Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map(tx => (
                  <tr
                    key={tx.transaction_id}
                    onClick={() => setSelectedTransaction(tx)}
                    className="hover:bg-slate-50 cursor-pointer transition"
                  >
                    <td className="p-3 font-mono font-bold text-slate-900">
                      {tx.transaction_id}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{tx.document_type}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">${tx.amount.toLocaleString()}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-slate-900">{tx.client_name}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{tx.vendor_name}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{tx.location_name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-4">{tx.city}, {tx.state}</div>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        tx.automation_status === 'Fully Automated'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : tx.automation_status === 'Flagged Exception'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {tx.automation_status}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold">
                      <span className={tx.confidence_score >= 95 ? 'text-emerald-700' : tx.confidence_score >= 85 ? 'text-amber-700' : 'text-rose-700'}>
                        {tx.confidence_score}%
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-600">
                      {tx.processing_time} min
                    </td>
                    <td className="p-3">
                      {tx.exception_status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{tx.exception_severity}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">None</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedTransaction(tx); }}
                        className="rounded border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    No transactions match current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>
            <span className="font-mono font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
