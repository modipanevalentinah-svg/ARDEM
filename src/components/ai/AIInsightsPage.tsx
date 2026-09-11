import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Cpu, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  RotateCw,
  Play,
  FileCheck,
  ShieldCheck,
  Compass,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StructuredAIResponse {
  question: string;
  finding: string;
  geographicContext: string;
  rootCause: string;
  recommendedAction: string;
  supportingMetrics?: { label: string; value: string }[];
}

export const AIInsightsPage: React.FC = () => {
  const { navigateTo, setSelectedRegion, showToast } = useApp();

  const [simulationActive, setSimulationActive] = useState<boolean>(false);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  // Structured operational responses library matching the 4 predefined prompts
  const structuredKnowledge: Record<string, StructuredAIResponse> = {
    midwest: {
      question: "Explain the Midwest exception concentration",
      finding: "A critical geographic cluster of 38 recurring exceptions is concentrated in the Midwest region, representing 68% of all recurring validation failures across national operations.",
      geographicContext: "Midwest Operational Region across three primary logistics hubs: Chicago Central Gateway (16 exceptions), Detroit Automotive Depot (14 exceptions), and Indianapolis Distribution Hub (8 exceptions).",
      rootCause: "Supplier Atlas Hydraulic Parts modified their invoice generation software on Sept 1st. The updated invoice template shifted line-item technician rate coordinates by 45 pixels vertically, falling outside standard OCR extraction bounding boxes.",
      recommendedAction: "Deploy updated optical coordinate schema adaptors for Atlas Hydraulic Parts. Re-align bounding box anchors and initiate automated re-processing for the 38 queued transactions.",
      supportingMetrics: [
        { label: "Active Midwest Exceptions", value: "38" },
        { label: "Financial Exposure", value: "$184,000" },
        { label: "Average Resolution Delay", value: "4.2 hours" }
      ]
    },
    suppliers: {
      question: "Which suppliers are causing automated workflow failures?",
      finding: "Two suppliers account for 82% of all automated document ingestion failures nationwide: Atlas Hydraulic Parts (Midwest) and Tri-State Utility Provider (Northeast).",
      geographicContext: "Midwest (Chicago, Detroit) and Northeast (Newark, Boston). Southern and Western suppliers show 97.4% automated conformance with standard EDI format specifications.",
      rootCause: "1) Atlas Hydraulic Parts modified column tabular formatting during an ERP upgrade. 2) Tri-State Utility Provider introduced a state-mandated clean energy surcharge code (NY PSC 22-A) billed outside standard line-item grids.",
      recommendedAction: "1) Issue supplier standardized ingestion templates to Atlas Hydraulic Parts. 2) Deploy regional utility tariff rule #22-A parser for Northeast municipal invoices. 3) Re-benchmark ingestion confidence thresholds.",
      supportingMetrics: [
        { label: "Atlas Hydraulic Failures", value: "38 records" },
        { label: "Tri-State Utility Failures", value: "37 records" },
        { label: "Combined Recoverable Impact", value: "$394,000" }
      ]
    },
    actions: {
      question: "What actions can resolve recurring geographic exceptions?",
      finding: "Systemic geographic exceptions cannot be resolved by manual re-entry alone; they require targeted operational and schema adjustments at the source.",
      geographicContext: "Applies primarily to Midwest (38 exceptions) and Northeast (37 exceptions), which represent over $394,000 in operational cost exposure.",
      rootCause: "Data capture engines fail when regional suppliers alter documentation layouts without updating integration mapping.",
      recommendedAction: "1) Update automated extraction rules: Apply dynamic anchor detection. 2) Supplier Outreach: Provide vendors with standardized EDI format guidelines. 3) Execute automated batch re-processing to clear existing backlogs.",
      supportingMetrics: [
        { label: "Expected Automation Lift", value: "+1.4% (to 96.1%)" },
        { label: "Exception Reduction", value: "-38 records immediately" },
        { label: "Time to Remediate", value: "< 15 minutes" }
      ]
    },
    performance: {
      question: "Summarize operational performance across all regions",
      finding: "National automated operations process 248,592 transactions at a 94.7% straight-through automation rate. Operations are healthy overall, but performance varies widely by geography.",
      geographicContext: "8 Geographic Operational Territories: South is top performer (97.4% automation), Midwest is primary exception hotspot (38 exceptions), Northeast carries highest cost exposure ($210k), and West experiences highest processing latency (3.8 min).",
      rootCause: "Performance variance correlates directly with regional supplier compliance standards and localized regulatory documentation requirements (such as California environmental manifests).",
      recommendedAction: "Adopt Southern region EDI ingestion standards as reference architecture across all 8 territories. Prioritize resolving Midwest supplier formatting to reach 96.1% national automation.",
      supportingMetrics: [
        { label: "National Transactions", value: "248,592" },
        { label: "Baseline Automation", value: "94.7%" },
        { label: "Total Exceptions", value: "127" }
      ]
    }
  };

  const [activeQueryKey, setActiveQueryKey] = useState<string>('midwest');
  const activeInsight = structuredKnowledge[activeQueryKey] || structuredKnowledge.midwest;

  // Handle running the interactive workflow simulation
  const handleRunSimulation = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      setSimulationActive(true);
      showToast('Workflow Simulation Applied: Midwest supplier schema re-indexed. National automation raised to 96.1%.', 'success');
    }, 1200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const lower = customInput.toLowerCase();
    if (lower.includes('midwest') || lower.includes('chicago') || lower.includes('detroit')) {
      setActiveQueryKey('midwest');
    } else if (lower.includes('supplier') || lower.includes('vendor') || lower.includes('atlas')) {
      setActiveQueryKey('suppliers');
    } else if (lower.includes('action') || lower.includes('resolve') || lower.includes('fix')) {
      setActiveQueryKey('actions');
    } else {
      setActiveQueryKey('performance');
    }
    setCustomInput('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Operational Intelligence Assistant
            </h1>
            <span className="rounded bg-purple-100 px-2.5 py-0.5 text-xs font-mono font-bold text-purple-800 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              Question 4: What action should operations take?
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Grounded spatial intelligence: Turning automated operational data into actionable decision guidance.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Spatial Reasoning Engine • Grounded in 248,592 Records
        </span>
      </div>

      {/* TOP SECTION: WORKFLOW SIMULATION ENGINE */}
      <div className="rounded-xl border-2 border-purple-300 bg-gradient-to-r from-purple-50/70 via-white to-amber-50/50 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-900 border border-purple-300 flex items-center gap-1">
                <Play className="h-3 w-3 text-purple-700" />
                INTERACTIVE OPERATIONAL SIMULATION
              </span>
              {simulationActive && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Simulation Active
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              Simulate Remediation of the Midwest Exception Hotspot
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Test how updating automated extraction rules for Midwest supplier documentation directly impacts national operational KPIs.
            </p>
          </div>

          {/* Simulation CTA Button */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleRunSimulation}
              disabled={simulationRunning}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-xs font-bold shadow-md transition ${
                simulationRunning
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                  : simulationActive
                  ? 'bg-purple-700 text-white hover:bg-purple-800'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <RotateCw className={`h-4 w-4 ${simulationRunning ? 'animate-spin' : ''}`} />
              <span>
                {simulationRunning 
                  ? 'RUNNING PIPELINE SIMULATION...' 
                  : simulationActive 
                  ? 'RE-RUN WORKFLOW SIMULATION' 
                  : 'RUN WORKFLOW SIMULATION'}
              </span>
            </button>
          </div>
        </div>

        {/* Live Simulation Impact Comparison */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-purple-100">
          {/* Metric 1: Automation Rate */}
          <div className="rounded-lg bg-white p-4 border border-purple-200 shadow-xs">
            <span className="text-xs font-bold uppercase text-slate-400 block">Automation Rate</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-2xl font-black font-mono ${simulationActive ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                94.7%
              </span>
              {simulationActive && (
                <span className="text-2xl font-black font-mono text-emerald-600">
                  → 96.1%
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-emerald-600 block mt-1">
              {simulationActive ? '✓ +1.4% straight-through gain' : 'Baseline national rate'}
            </span>
          </div>

          {/* Metric 2: Active Exceptions */}
          <div className="rounded-lg bg-white p-4 border border-purple-200 shadow-xs">
            <span className="text-xs font-bold uppercase text-slate-400 block">Active Exceptions</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-2xl font-black font-mono ${simulationActive ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                127
              </span>
              {simulationActive && (
                <span className="text-2xl font-black font-mono text-emerald-600">
                  → 89
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-emerald-600 block mt-1">
              {simulationActive ? '✓ 38 Midwest exceptions resolved' : 'Current pending triage'}
            </span>
          </div>

          {/* Metric 3: Processing Speed */}
          <div className="rounded-lg bg-white p-4 border border-purple-200 shadow-xs">
            <span className="text-xs font-bold uppercase text-slate-400 block">Processing Speed</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-2xl font-black font-mono ${simulationActive ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                2.8 min
              </span>
              {simulationActive && (
                <span className="text-2xl font-black font-mono text-emerald-600">
                  → 2.4 min
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-emerald-600 block mt-1">
              {simulationActive ? '✓ +14% faster throughput' : 'Average batch latency'}
            </span>
          </div>
        </div>
      </div>

      {/* PREDEFINED OPERATIONAL PROMPTS (4 Practical Questions) */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Select Predefined Operational Question
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setActiveQueryKey('midwest')}
            className={`text-left rounded-xl p-3.5 border transition ${
              activeQueryKey === 'midwest'
                ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-1 ring-purple-600 font-bold text-purple-950'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
            }`}
          >
            <span className="text-xs block font-bold">1. Explain Midwest concentration</span>
            <span className="text-[11px] text-slate-500 block mt-1">Why 38 exceptions cluster in Chicago & Detroit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQueryKey('suppliers')}
            className={`text-left rounded-xl p-3.5 border transition ${
              activeQueryKey === 'suppliers'
                ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-1 ring-purple-600 font-bold text-purple-950'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
            }`}
          >
            <span className="text-xs block font-bold">2. Identify failing suppliers</span>
            <span className="text-[11px] text-slate-500 block mt-1">Vendors causing automated ingestion failures</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQueryKey('actions')}
            className={`text-left rounded-xl p-3.5 border transition ${
              activeQueryKey === 'actions'
                ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-1 ring-purple-600 font-bold text-purple-950'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
            }`}
          >
            <span className="text-xs block font-bold">3. Recommended resolution actions</span>
            <span className="text-[11px] text-slate-500 block mt-1">Specific operations steps to eliminate pattern</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveQueryKey('performance')}
            className={`text-left rounded-xl p-3.5 border transition ${
              activeQueryKey === 'performance'
                ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-1 ring-purple-600 font-bold text-purple-950'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
            }`}
          >
            <span className="text-xs block font-bold">4. National performance summary</span>
            <span className="text-[11px] text-slate-500 block mt-1">Comparison across all 8 operational territories</span>
          </button>
        </div>
      </div>

      {/* STRUCTURED AI RESPONSE CARD: FINDING / GEOGRAPHIC CONTEXT / ROOT CAUSE / RECOMMENDED ACTION */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Response Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Operational Assistant Reasoning Response
            </span>
          </div>
          <span className="text-xs font-medium text-slate-400">
            Query: "{activeInsight.question}"
          </span>
        </div>

        {/* The 4-Part Structured Response Content */}
        <div className="p-6 space-y-6">
          
          {/* 1. FINDING */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-slate-700 font-mono">1</span>
              <span>FINDING (What Was Discovered)</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed pl-7">
              {activeInsight.finding}
            </p>
          </div>

          {/* 2. GEOGRAPHIC CONTEXT */}
          <div className="space-y-1.5 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-rose-50 text-rose-700 font-mono">2</span>
              <span>GEOGRAPHIC CONTEXT (Where The Pattern Appears)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-7">
              {activeInsight.geographicContext}
            </p>
          </div>

          {/* 3. ROOT CAUSE */}
          <div className="space-y-1.5 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-50 text-amber-700 font-mono">3</span>
              <span>ROOT CAUSE (Why It Is Happening)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-7 bg-amber-50/50 p-3 rounded-lg border border-amber-200">
              {activeInsight.rootCause}
            </p>
          </div>

          {/* 4. RECOMMENDED ACTION */}
          <div className="space-y-1.5 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-50 text-emerald-700 font-mono">4</span>
              <span>RECOMMENDED ACTION (What Operations Should Do)</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed pl-7">
              {activeInsight.recommendedAction}
            </p>
          </div>

          {/* Supporting Metrics Bar */}
          {activeInsight.supportingMetrics && (
            <div className="mt-4 pt-4 border-t border-slate-100 pl-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeInsight.supportingMetrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">{m.label}</span>
                  <span className="text-sm font-mono font-bold text-slate-900 block mt-0.5">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigateTo('map', 'midwest', { layer: 'hotspots' })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950"
            >
              <MapPin className="h-3.5 w-3.5 text-rose-500" />
              <span>Inspect on Operations Map</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('exceptions', 'midwest')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-amber-400 shadow-xs hover:bg-slate-800 transition"
            >
              <span>Examine Exception Intelligence Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Free-form Query Input */}
      <form onSubmit={handleCustomSubmit} className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask the Operational Intelligence Assistant anything (e.g. 'Why did Midwest invoices fail?')..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="h-10 flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs focus:border-purple-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-slate-900 px-4 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            <Send className="h-3.5 w-3.5 text-amber-400" />
            <span>Analyze</span>
          </button>
        </div>
      </form>

    </div>
  );
};
