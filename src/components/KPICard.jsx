import React from 'react';

export function KPICard({ title, value, unit, change, icon: Icon, color }) {
  const numericChange = typeof change === 'number' ? change : parseFloat(change);
  const isPositive = !isNaN(numericChange) ? numericChange >= 0 : true;

  return (
    <div className="bg-campus-panel rounded-xl p-5 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 shadow-md flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-950/20 group">
      {/* Top Row: Title + Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-300 transition-colors">
          {title}
        </span>
        {Icon && (
          <div
            className="p-2.5 rounded-lg border transition-transform duration-300 group-hover:scale-110"
            style={{
              color: color || '#10b981',
              backgroundColor: `${color || '#10b981'}15`,
              borderColor: `${color || '#10b981'}30`,
            }}
          >
            <Icon className="w-5 h-5 stroke-[2]" style={{ color: color || '#10b981' }} />
          </div>
        )}
      </div>

      {/* Value + Unit */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-black text-white tracking-tight">
          {value ?? 0}
        </span>
        {unit && (
          <span className="text-sm font-semibold text-slate-400">
            {unit}
          </span>
        )}
      </div>

      {/* Change Indicator */}
      <div className="flex items-center gap-1.5 text-xs font-medium">
        {change !== undefined && change !== null ? (
          <>
            <span
              className={`flex items-center font-bold px-1.5 py-0.5 rounded text-[11px] ${
                isPositive
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              }`}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(numericChange || 0)}%
            </span>
            <span className="text-slate-500 text-[11px]">vs last hour</span>
          </>
        ) : (
          <span className="text-slate-500 text-[11px]">Real-time telemetry</span>
        )}
      </div>
    </div>
  );
}

export default KPICard;
