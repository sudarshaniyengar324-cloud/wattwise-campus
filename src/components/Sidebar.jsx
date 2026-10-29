import React from 'react';
import {
  Zap,
  LayoutDashboard,
  Box,
  Cpu,
  AlertTriangle,
  FileText,
  Settings,
  ShieldCheck,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'twin', label: 'Digital Twin', icon: Box },
  { id: 'predictions', label: 'AI Predictions', icon: Cpu },
  { id: 'alerts', label: 'Anomaly Alerts', icon: AlertTriangle },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-campus-panel border-r border-slate-700/80 flex flex-col justify-between h-screen shrink-0 select-none">
      {/* Top Branding & Navigation */}
      <div>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700/80 gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
          </div>
          <div>
            <div className="font-bold text-base tracking-wide text-white flex items-center gap-1.5">
              <span>WattWise</span>
              <span className="text-emerald-400">Campus</span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Smart Energy Microgrid
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="py-6 space-y-1.5 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm transition-all duration-200 text-left ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10 border-l-4 border-emerald-400 font-semibold shadow-sm shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-l-4 border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Card at bottom */}
      <div className="p-4 border-t border-slate-700/80">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30 text-xs">
              CA
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-slate-200 truncate flex items-center gap-1">
              <span>Campus Admin</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              admin@wattwise.edu
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
