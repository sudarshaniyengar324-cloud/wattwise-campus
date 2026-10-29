import React from 'react';
import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export function AlertsPanel({ alerts = [] }) {
  const getSeverityBorder = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'border-l-4 border-l-red-500';
      case 'warning':
        return 'border-l-4 border-l-amber-500';
      case 'info':
        return 'border-l-4 border-l-cyan-500';
      default:
        return 'border-l-4 border-l-slate-500';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />;
      case 'info':
        return <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="bg-campus-panel rounded-xl p-5 border border-slate-700 shadow-md flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <h2 className="text-base font-bold text-white tracking-tight">
            Live Anomaly Feed
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700">
          {alerts.length} logged
        </span>
      </div>

      {/* Scrollable list */}
      <div className="max-h-96 overflow-y-auto pr-1 space-y-2.5">
        {!alerts || alerts.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-slate-800/30 rounded-lg border border-dashed border-slate-700">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
            <p className="text-sm font-semibold text-slate-300">
              ✅ No anomalies detected. System optimal.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              All microgrid building feeders within safety tolerances.
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-slate-800/50 hover:bg-slate-800/80 transition-colors p-3 rounded-r-lg border border-slate-700/60 ${getSeverityBorder(
                alert.severity || alert.type
              )}`}
            >
              <div className="flex items-start gap-2.5">
                {getSeverityIcon(alert.severity || alert.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-slate-500 text-xs font-mono">
                      {alert.time}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        (alert.severity || alert.type) === 'critical'
                          ? 'text-red-400'
                          : (alert.severity || alert.type) === 'warning'
                          ? 'text-amber-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      {alert.severity || alert.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlertsPanel;
