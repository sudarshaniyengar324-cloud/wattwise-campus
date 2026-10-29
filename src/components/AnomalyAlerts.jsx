import React from 'react';
import { AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export function AnomalyAlerts({ alerts = [] }) {
  const alertCount = Array.isArray(alerts) ? alerts.length : 0;

  return (
    <div className="space-y-6">
      {/* Top row: 3 KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: System Integrity */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md hover:border-emerald-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              System Integrity
            </span>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5 text-campus-green" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white tracking-tight">
              98.4%
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">Optimal</span>
            <span>Zero busbar failures</span>
          </div>
        </div>

        {/* Card 2: Active Warnings */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md hover:border-amber-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Warnings
            </span>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {alertCount}
            </span>
            <span className="text-sm font-semibold text-slate-400">events</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-amber-400 font-medium">Logged in current window</span>
          </div>
        </div>

        {/* Card 3: AI Diagnostics */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md hover:border-cyan-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              AI Diagnostics
            </span>
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-campus-cyan">
              <Activity className="w-5 h-5 text-campus-cyan" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-2xl font-black text-cyan-400 tracking-tight">
              Active
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Continuous sensor scan</span>
          </div>
        </div>
      </div>

      {/* Bottom section: Diagnostic Event Log */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-700/80">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Diagnostic Event Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated anomaly response and smart breaker orchestration telemetry
            </p>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-slate-300">
            {alertCount} Active
          </span>
        </div>

        {/* Alerts List */}
        {!alerts || alerts.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center p-6 bg-slate-900/40 rounded-lg border border-dashed border-slate-700">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mb-3" />
            <p className="text-sm font-semibold text-slate-200">
              No anomalies detected. Grid operating at maximum efficiency.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              All substation feeders and solar inverters operating within rated tolerances.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const isCritical =
                (alert.severity || alert.type)?.toLowerCase() === 'critical';

              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg bg-slate-900/60 border transition-all duration-200 hover:bg-slate-900/90 ${
                    isCritical
                      ? 'border-red-500/40 hover:border-red-500/70'
                      : 'border-amber-500/40 hover:border-amber-500/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <AlertTriangle
                          className={`w-5 h-5 shrink-0 ${
                            isCritical ? 'text-red-400' : 'text-amber-400'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 leading-snug">
                          {alert.message}
                        </div>
                        <div className="text-xs text-emerald-400 mt-1 font-medium">
                          Automated action: Dispatched maintenance alert.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:self-center shrink-0">
                      <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                        {alert.time}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isCritical
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {alert.severity || alert.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnomalyAlerts;
