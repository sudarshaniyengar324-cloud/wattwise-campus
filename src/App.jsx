import React, { useState } from 'react';
import {
  Zap,
  IndianRupee,
  Leaf,
  AlertTriangle,
} from 'lucide-react';
import useEnergySimulation from './hooks/useEnergySimulation';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KPICard from './components/KPICard';
import EnergyChart from './components/EnergyChart';
import AlertsPanel from './components/AlertsPanel';
import DigitalTwin from './components/DigitalTwin';
import AIPredictions from './components/AIPredictions';
import AnomalyAlerts from './components/AnomalyAlerts';
import Reports from './components/Reports';
import Settings from './components/Settings';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    buildings,
    alerts,
    currentLoad,
    todayCost,
    carbonFootprint,
    hourlyData,
  } = useEnergySimulation();

  return (
    <div className="flex h-screen bg-campus-dark text-slate-100 overflow-hidden font-sans">
      {/* Fixed Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <TopBar title={activeTab} />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <KPICard
                  title="Current Load"
                  value={currentLoad ?? 0}
                  unit="kW"
                  change={-2.4}
                  icon={Zap}
                  color="#10b981"
                />
                <KPICard
                  title="Today's Cost"
                  value={`₹${Number(todayCost || 0).toLocaleString('en-IN', {
                    maximumFractionDigits: 0,
                  })}`}
                  unit=""
                  change={3.8}
                  icon={IndianRupee}
                  color="#06b6d4"
                />
                <KPICard
                  title="Carbon Footprint"
                  value={carbonFootprint ?? 0}
                  unit="kg CO₂"
                  change={-1.8}
                  icon={Leaf}
                  color="#10b981"
                />
                <KPICard
                  title="Active Alerts"
                  value={alerts?.length ?? 0}
                  unit="events"
                  change={
                    alerts?.filter((a) => (a.severity || a.type) === 'critical')
                      .length > 0
                      ? 5.2
                      : -4.0
                  }
                  icon={AlertTriangle}
                  color={
                    alerts?.some((a) => (a.severity || a.type) === 'critical')
                      ? '#ef4444'
                      : '#f59e0b'
                  }
                />
              </div>

              {/* 3-Column Section: Energy Chart (2 cols) + Alerts Panel (1 col) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2">
                  <EnergyChart data={hourlyData} />
                </div>
                <div className="col-span-1">
                  <AlertsPanel alerts={alerts} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'twin' && (
            <div className="space-y-6">
              <DigitalTwin buildings={buildings} />
            </div>
          )}

          {activeTab === 'predictions' && <AIPredictions currentLoad={currentLoad} />}
          {activeTab === 'alerts' && <AnomalyAlerts alerts={alerts} />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;
