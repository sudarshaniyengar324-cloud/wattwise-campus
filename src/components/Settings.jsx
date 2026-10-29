import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Database, Check } from 'lucide-react';

export function Settings() {
  const [refreshRate, setRefreshRate] = useState('3000ms');
  const [kwLimit, setKwLimit] = useState(145);
  const [automatedHvac, setAutomatedHvac] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-700 shadow-md">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-700/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <SettingsIcon className="w-6 h-6 text-campus-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                System Configuration
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage IoT telemetry broker, telemetry refresh cycles, and smart load-shedding thresholds
              </p>
            </div>
          </div>

          {saved && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-pulse">
              <Check className="w-3.5 h-3.5" />
              <span>Saved Successfully</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: IoT Data Ingestion */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-campus-cyan" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                IoT Data Ingestion
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-slate-900/60 border border-slate-700/80">
              {/* MQTT Broker URL (readOnly) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  MQTT Broker Endpoint
                </label>
                <input
                  type="text"
                  readOnly
                  value="mqtts://broker.campus-grid.wattwise.edu:8883/v2/telemetry"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono focus:outline-none cursor-not-allowed select-all"
                />
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Secured via TLS 1.3 mutual authentication (Fixed Gateway)
                </p>
              </div>

              {/* Refresh Rate Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Telemetry Refresh Rate
                </label>
                <select
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-campus-green transition-colors cursor-pointer"
                >
                  <option value="1000ms">1000ms (High Frequency Stream)</option>
                  <option value="3000ms">3000ms (Default Real-time Simulation)</option>
                  <option value="5000ms">5000ms (Standard Telemetry)</option>
                  <option value="10000ms">10000ms (Power Conservation Mode)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Frequency of smart meter state propagation to edge nodes
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Alert Thresholds */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Alert Thresholds
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-slate-900/60 border border-slate-700/80">
              {/* kW limit input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Peak Demand Safety Limit (kW)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="300"
                    value={kwLimit}
                    onChange={(e) => setKwLimit(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-campus-green transition-colors"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-mono">
                    kW
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Triggers critical substation alarms and dynamic battery shaving
                </p>
              </div>

              {/* Toggle switch for Automated HVAC Shutoff (styled as a green pill) */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="block text-xs font-semibold text-slate-300 mb-1">
                    Automated HVAC Shutoff
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Automatically sheds secondary AC chiller units during critical demand spikes
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAutomatedHvac(!automatedHvac)}
                    className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      automatedHvac ? 'bg-campus-green' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                        automatedHvac ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      automatedHvac ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {automatedHvac ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-700/80">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-campus-green hover:bg-emerald-600 active:scale-95 text-slate-950 font-bold text-xs transition-all duration-200 shadow-md shadow-emerald-950/40"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
