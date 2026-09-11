import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  TrendingDown, 
  DollarSign, 
  Cpu, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AI_INSIGHTS_DATA } from '../../data/mockData';
import { AIInsight } from '../../types';

export const AIInsightsPage: React.FC = () => {
  const { navigateTo, setSelectedException, showToast } = useApp();
  const [queryInput, setQueryInput] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'optimization'>('all');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string; action?: { label: string; route: string } }[]>([
    {
      sender: 'ai',
      text: 'Hello. I am the ARDEM GeoOps Intelligence Reasoning Engine. I continuously correlate spatial telemetry, document OCR extraction, and exception variance across your 100 enterprise facilities. How can I assist your operational review today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sampleQueries = [
    "Why are Midwest exceptions clustering around hydraulic parts?",
    "Which geographic territory carries the highest financial risk?",
    "How can we raise straight-through processing to 97%?",
    "Show me the recurring supplier format shift in Detroit."
  ];

  const handleSendQuery = (textToSend?: string) => {
    const q = textToSend || queryInput;
    if (!q.trim()) return;

    setChatHistory(prev => [...prev, { sender: 'user', text: q }]);
    setQueryInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let actionObj: { label: string; route: string } | undefined;

      const lower = q.toLowerCase();
      if (lower.includes('midwest') || lower.includes('hydraulic')) {
        aiReply = "Analysis indicates Atlas Hydraulic Parts shifted their invoice coordinate layout on Sept 1st. Invoices processed at the Detroit and Cleveland hubs exhibit a 45px vertical bounding box offset, causing automated line-item validation to fail. Annualized exposure is $184,000 across 38 queued records.";
        actionObj = { label: 'Examine Midwest Hotspot', route: 'map' };
      } else if (lower.includes('highest') || lower.includes('cost') || lower.includes('risk')) {
        aiReply = "The Northeast Region carries the highest financial exposure at $210,000 annually. This is driven by unit tariff variance on complex municipal utility invoices at Newark and Boston distribution hubs.";
        actionObj = { label: 'View Northeast Analytics', route: 'analytics' };
      } else if (lower.includes('97%') || lower.includes('increase') || lower.includes('raise')) {
        aiReply = "To reach 97% automation (up from 94.7%), prioritize deploying automated bounding box updates for Atlas Hydraulic Parts (+1.2% national gain) and enabling multi-page table auto-stitching in the West region (+0.9% gain). This will recover $332,000 in operational capacity.";
        actionObj = { label: 'Open Pipeline Settings', route: 'automation' };
      } else {
        aiReply = `Synthesizing spatial telemetry for "${q}" across 248,592 transactions and 100 facilities. Confidence is high that regional clustering correlates with supplier-specific documentation standards rather than facility hardware latency.`;
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiReply, action: actionObj }]);
      setIsTyping(false);
    }, 600);
  };

  const handleApplyRule = (insight: AIInsight) => {
    showToast(`Rule update applied for ${insight.id}. Automated regex deployed to edge workers.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              AI Operational & Spatial Insights
            </h1>
            <span className="rounded bg-purple-100 px-2.5 py-0.5 text-xs font-mono font-bold text-purple-800 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              ARDEM Spatial Reasoning Model
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Continuous synthesis across document taxonomies, physical facilities, and automated validation rules.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono self-start sm:self-auto">
          Model: ARDEM-Spatial-v4.2 • 99.4% Extraction Precision
        </span>
      </div>

      {/* Interactive AI Query Terminal / Chat */}
      <div className="rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50/40 via-white to-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-purple-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-900 text-amber-400">
              <Cpu className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-purple-950 uppercase tracking-wider">
              INTERACTIVE GEOGRAPHIC OPERATIONS COPILOT
            </span>
          </div>
          <span className="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-semibold">
            Live Natural Language Query
          </span>
        </div>

        {/* Chat message thread */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 text-xs">
          {chatHistory.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-2xl rounded-xl p-3.5 ${
                msg.sender === 'user' 
                  ? 'bg-slate-900 text-white rounded-br-none' 
                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80 shadow-xs'
              }`}>
                <div className="leading-relaxed">{msg.text}</div>
                {msg.action && (
                  <button
                    type="button"
                    onClick={() => navigateTo(msg.action!.route as any)}
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-purple-700 px-3 py-1 text-[11px] font-bold text-white hover:bg-purple-800 transition"
                  >
                    <span>{msg.action.label}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-xl bg-slate-100 p-3 text-xs text-slate-500 flex items-center gap-2">
                <RotateCw className="h-3.5 w-3.5 animate-spin text-purple-600" />
                <span>Correlating spatial points across 8 regions...</span>
              </div>
            </div>
          )}
        </div>

        {/* Query Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendQuery(); }}
            placeholder="Ask GeoOps AI about operational patterns, regional variances, or cost projections..."
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
          <button
            type="button"
            onClick={() => handleSendQuery()}
            className="flex items-center gap-1.5 rounded-lg bg-purple-900 px-4 py-2 text-xs font-bold text-white hover:bg-purple-800 transition"
          >
            <span>Ask AI</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Clickable prompt suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold text-slate-400">Suggested queries:</span>
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendQuery(sq)}
              className="rounded-full border border-purple-200 bg-white px-2.5 py-1 text-[11px] text-purple-900 hover:bg-purple-50 hover:border-purple-300 transition"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* DETAILED AI INSIGHT CARDS (Prompt Specification) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            SYNTHESIZED SPATIAL INTELLIGENCE DOSSIERS
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {AI_INSIGHTS_DATA.length} Validated Discoveries
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {AI_INSIGHTS_DATA.map((insight) => (
            <div 
              key={insight.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4 hover:border-purple-300 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">{insight.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        insight.priority === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {insight.priority} Priority
                      </span>
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {insight.confidence_level}% Confidence
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {insight.title}
                    </h3>
                  </div>
                </div>

                {/* Geographic Scope Banner */}
                <div className="flex items-center gap-2 rounded-md bg-slate-50 p-2 text-xs text-slate-600 border border-slate-200/60">
                  <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-slate-800">Geographic Scope:</span>
                  <span>{insight.geographic_scope} ({insight.region.toUpperCase()})</span>
                </div>

                {/* Evidence */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    SUPPORTING EVIDENCE & TELEMETRY
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {insight.evidence.map((ev, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Impact Box */}
                <div className="rounded-lg border border-rose-100 bg-rose-50/50 p-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-950 uppercase tracking-wider text-[10px]">
                      BUSINESS & SLA IMPACT
                    </span>
                    <span className="font-mono font-bold text-rose-700">{insight.business_impact.financial}</span>
                  </div>
                  <div className="text-slate-700 text-[11px]">
                    <div><strong>Operational:</strong> {insight.business_impact.operational}</div>
                    <div><strong>SLA Impact:</strong> {insight.business_impact.sla}</div>
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    RECOMMENDED ACTIONS
                  </span>
                  <ol className="list-decimal list-inside space-y-0.5 text-slate-700 text-[11px]">
                    {insight.recommended_actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Action Buttons strictly from Prompt */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo('map', insight.region, { layer: 'hotspots' })}
                  className="rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  View on Map
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyRule(insight)}
                  className="rounded bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Apply Rule Update</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
