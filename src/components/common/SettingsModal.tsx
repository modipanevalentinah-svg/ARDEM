import React, { useState } from 'react';
import { X, Sliders, Map, Cpu, ShieldCheck, Database } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsModal: React.FC = () => {
  const { settingsOpen, setSettingsOpen, showToast } = useApp();
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [mapTheme, setMapTheme] = useState<'carto-dark' | 'carto-light' | 'osm'>('carto-dark');
  const [clusterSensitivity, setClusterSensitivity] = useState<'high' | 'medium' | 'low'>('medium');
  const [autoEnrichment, setAutoEnrichment] = useState(true);

  if (!settingsOpen) return null;

  const handleSave = () => {
    showToast('Platform preferences updated successfully.', 'success');
    setSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSettingsOpen(false)}
      />

      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-amber-400">
              <Sliders className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Platform & GIS Settings
              </h2>
              <p className="text-xs text-slate-500">
                Configure spatial thresholds and automation parameters
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSettingsOpen(false)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {/* AI Confidence Threshold Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-amber-600" />
                <span>AI Straight-Through Confidence Threshold</span>
              </label>
              <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min="70"
              max="98"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Transactions with confidence below this score are automatically routed to manual review or flagged as exceptions.
            </p>
          </div>

          {/* GIS Basemap Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Map className="h-4 w-4 text-slate-600" />
              <span>GIS Basemap Style</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMapTheme('carto-dark')}
                className={`p-2 rounded-lg border text-center font-medium transition ${
                  mapTheme === 'carto-dark'
                    ? 'border-amber-500 bg-amber-50/50 text-amber-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Dark Enterprise
              </button>
              <button
                type="button"
                onClick={() => setMapTheme('carto-light')}
                className={`p-2 rounded-lg border text-center font-medium transition ${
                  mapTheme === 'carto-light'
                    ? 'border-amber-500 bg-amber-50/50 text-amber-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Positron Light
              </button>
              <button
                type="button"
                onClick={() => setMapTheme('osm')}
                className={`p-2 rounded-lg border text-center font-medium transition ${
                  mapTheme === 'osm'
                    ? 'border-amber-500 bg-amber-50/50 text-amber-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Standard Street
              </button>
            </div>
          </div>

          {/* Spatial Location Auto-Enrichment Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Real-time Location Geocoding</span>
              <span className="text-[11px] text-slate-500 block">
                Automatically verify physical facility coordinates on document ingestion
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAutoEnrichment(!autoEnrichment)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoEnrichment ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoEnrichment ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Data Environment Notice */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex items-start gap-2 text-slate-600">
            <Database className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              Environment connected to ARDEM synthetic telemetry simulation. All 250,000 transactions and 100 facilities operate in demonstration mode.
            </span>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSettingsOpen(false)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
