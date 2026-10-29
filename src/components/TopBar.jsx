import React, { useState, useEffect } from 'react';
import { Download, Activity, Clock } from 'lucide-react';

const TITLE_MAP = {
  overview: 'Campus Overview',
  twin: 'Digital Twin — 3D Microgrid',
  predictions: 'AI Energy Predictions',
  alerts: 'Anomaly Alerts & Diagnostics',
  reports: 'Sustainability & Energy Reports',
  settings: 'System & IoT Sensor Settings',
};

export function TopBar({ title }) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', { hour12: false })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTitle =
    TITLE_MAP[title] ||
    (title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Overview');

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Timestamp,Campus Load (kW),Status\n' +
      `${new Date().toISOString()},167,Optimal\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `wattwise-campus-report-${Date.now()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="h-16 bg-campus-panel border-b border-slate-700/80 px-6 flex items-center justify-between shrink-0 select-none z-10">
      {/* Dynamic Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-white tracking-tight capitalize">
          {formattedTitle}
        </h1>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          KRUSHI & SMART CAMPUS
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Live Clock */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono text-xs shadow-inner">
          <Clock className="w-3.5 h-3.5 text-campus-cyan" />
          <span>{currentTime}</span>
        </div>

        {/* Live IoT Status Badge with pulsing green dot */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/60 text-xs font-medium text-slate-200 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold">IoT Stream Active</span>
        </div>

        {/* Export Report Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-campus-green hover:bg-emerald-600 active:scale-95 text-slate-950 font-semibold text-xs transition-all duration-200 shadow-md shadow-emerald-900/30"
          title="Download latest campus energy telemetry report (CSV)"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Export Report</span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
