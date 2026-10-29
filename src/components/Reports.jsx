import React, { useState } from 'react';
import { FileText, Download, Leaf, TrendingDown, Check } from 'lucide-react';

const MOCK_REPORTS = [
  {
    id: 'rep-1',
    name: 'Monthly Carbon Offset & Sustainability Audit',
    date: '2026-10-28',
    type: 'PDF Document',
    size: '2.4 MB',
  },
  {
    id: 'rep-2',
    name: 'Microgrid Energy Efficiency & Loss Analysis',
    date: '2026-10-25',
    type: 'CSV Dataset',
    size: '840 KB',
  },
  {
    id: 'rep-3',
    name: 'Peak Demand Shaving & Battery Storage (BESS) Report',
    date: '2026-10-20',
    type: 'PDF Document',
    size: '1.8 MB',
  },
  {
    id: 'rep-4',
    name: 'Solar PV Array & Substation Feed Telemetry Log',
    date: '2026-10-15',
    type: 'XLSX Sheet',
    size: '3.1 MB',
  },
];

export function Reports() {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = (report) => {
    setDownloadingId(report.id);
    const dummyContent = `WattWise Campus Energy Report\nReport: ${report.name}\nDate: ${report.date}\nType: ${report.type}\nStatus: Verified`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top row: 2 gradient KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Total Carbon Saved */}
        <div className="rounded-xl p-6 bg-gradient-to-br from-emerald-950/60 via-slate-800 to-slate-800 border border-emerald-500/30 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Total Carbon Saved
            </span>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-campus-green" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-white tracking-tight">
              12.4
            </span>
            <span className="text-lg font-bold text-emerald-400">Tons</span>
          </div>
          <div className="text-xs text-slate-400">
            Equivalent to planting <span className="text-emerald-400 font-semibold">562 trees</span> across campus zones
          </div>
        </div>

        {/* Card 2: Financial Savings */}
        <div className="rounded-xl p-6 bg-gradient-to-br from-cyan-950/60 via-slate-800 to-slate-800 border border-cyan-500/30 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Financial Savings
            </span>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-campus-cyan group-hover:scale-110 transition-transform">
              <TrendingDown className="w-6 h-6 text-campus-cyan" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-white tracking-tight">
              ₹1,42,500
            </span>
          </div>
          <div className="text-xs text-slate-400">
            Achieved through <span className="text-cyan-400 font-semibold">peak-shaving tariffs</span> & AI load balancing
          </div>
        </div>
      </div>

      {/* Bottom section: Generated Reports */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-700/80">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Generated Reports
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated compliance, carbon accounting, and microgrid performance audits
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {MOCK_REPORTS.length} available
          </span>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {MOCK_REPORTS.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-lg bg-slate-900/60 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-campus-cyan group-hover:text-emerald-400 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {report.name}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-mono">
                    <span>{report.date}</span>
                    <span>•</span>
                    <span className="text-slate-300">{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(report)}
                className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-emerald-500/10 border border-slate-700 hover:border-emerald-500/30 text-xs font-semibold text-slate-200 hover:text-emerald-400 transition-all duration-200 shrink-0"
              >
                {downloadingId === report.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;
