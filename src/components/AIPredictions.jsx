import React from 'react';
import { Cpu, TrendingUp, Zap, BrainCircuit } from 'lucide-react';

export function AIPredictions({ currentLoad = 0 }) {
  const safeLoad = Number(currentLoad) || 0;

  return (
    <div className="space-y-6">
      {/* Top row: 3 KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Edge ML Model Accuracy */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md hover:border-emerald-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Edge ML Model Accuracy
            </span>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <BrainCircuit className="w-5 h-5 text-campus-green" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white tracking-tight">
              94.2%
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">↑ 1.2%</span>
            <span>vs 7-day moving baseline</span>
          </div>
        </div>

        {/* Card 2: Peak Prediction */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md hover:border-cyan-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Peak Prediction
            </span>
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-campus-cyan">
              <TrendingUp className="w-5 h-5 text-campus-cyan" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white tracking-tight">
              142.5
            </span>
            <span className="text-sm font-semibold text-slate-400">kW</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-cyan-400 font-medium">Estimated at 14:00 today</span>
          </div>
        </div>

        {/* Card 3: Dynamic Scheduling */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md hover:border-emerald-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Dynamic Scheduling
            </span>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-5 h-5 text-campus-green" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-2xl font-black text-emerald-400 tracking-tight">
              ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Automated peak shaving engaged</span>
          </div>
        </div>
      </div>

      {/* Bottom section: AI Engine Card */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-campus-cyan shadow-inner">
              <Cpu className="w-10 h-10 animate-spin text-campus-cyan [animation-duration:8s]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  AI Optimization Engine Running
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                Continuous recursive neural telemetry inference optimizing campus HVAC, EV chargers, and substation transformer load distribution in real-time.
              </p>
            </div>
          </div>

          {/* Small info boxes */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial px-4 py-3 rounded-lg bg-slate-900/70 border border-slate-700/80 min-w-[170px]">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                Telemetry Load
              </div>
              <div className="text-sm font-bold text-white font-mono">
                Current Input: <span className="text-campus-green">{safeLoad} kW</span>
              </div>
            </div>

            <div className="flex-1 md:flex-initial px-4 py-3 rounded-lg bg-slate-900/70 border border-slate-700/80 min-w-[170px]">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                Inference Latency
              </div>
              <div className="text-sm font-bold text-white font-mono">
                Processing Time: <span className="text-campus-cyan">12ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Pipeline Progress Indicators */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-700/60 flex items-center justify-between">
            <span className="text-slate-400">Transformer Neural Net:</span>
            <span className="font-semibold text-emerald-400">Converged (Epoch 240)</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-700/60 flex items-center justify-between">
            <span className="text-slate-400">Grid Load Balancing:</span>
            <span className="font-semibold text-cyan-400">Optimal (Loss 0.014)</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-700/60 flex items-center justify-between">
            <span className="text-slate-400">BESS Storage Target:</span>
            <span className="font-semibold text-emerald-400">Peak Shaving Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIPredictions;
