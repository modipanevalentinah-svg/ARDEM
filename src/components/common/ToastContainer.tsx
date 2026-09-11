import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-2.5 rounded-lg p-3.5 shadow-lg border text-xs transition-all animate-in fade-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-slate-900 border-slate-700 text-white'
              : toast.type === 'warning'
              ? 'bg-amber-900 border-amber-700 text-amber-100'
              : 'bg-slate-800 border-slate-700 text-white'
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 leading-snug">{toast.message}</div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
