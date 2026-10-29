import { useState, useEffect } from 'react';
import {
  hourlyData as initialHourlyData,
  initialBuildings,
  initialAlerts,
} from '../data/mockData';

const POTENTIAL_ALERTS = [
  {
    type: 'critical',
    severity: 'critical',
    message: 'Server rack thermal threshold exceeded in CSE Laboratory',
  },
  {
    type: 'warning',
    severity: 'warning',
    message: 'Power factor degradation (< 0.88) on Central Library feeder',
  },
  {
    type: 'warning',
    severity: 'warning',
    message: 'Rooftop solar generation dip detected due to overcast sky',
  },
  {
    type: 'info',
    severity: 'info',
    message: 'Smart load-shedding protocol initiated for idle lecture halls',
  },
  {
    type: 'info',
    severity: 'info',
    message: 'Campus battery storage (BESS) discharging to shave peak demand',
  },
  {
    type: 'critical',
    severity: 'critical',
    message: 'Overcurrent spike detected on Main Academic Block Phase-2',
  },
  {
    type: 'warning',
    severity: 'warning',
    message: 'Chiller unit power draw elevated above baseline by 18%',
  },
];

export function useEnergySimulation() {
  const [buildings, setBuildings] = useState(initialBuildings);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [hourlyData, setHourlyData] = useState(initialHourlyData);

  // Initial load calculation from starting buildings
  const initialTotalLoad = initialBuildings.reduce(
    (sum, b) => sum + (Number(b.load) || 0),
    0
  );
  const [currentLoad, setCurrentLoad] = useState(initialTotalLoad);
  const [todayCost, setTodayCost] = useState(12840);
  const [carbonFootprint, setCarbonFootprint] = useState(
    +(initialTotalLoad * 0.82).toFixed(1)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const isPeakHours = hour >= 9 && hour <= 17;

      // Update buildings with ±10 variance clamped between 5 and 95
      setBuildings((prevBuildings) => {
        const updated = prevBuildings.map((building) => {
          // Variance between -10 and +10
          let delta = Math.floor(Math.random() * 21) - 10;
          
          // Higher load bias during 9AM - 5PM
          if (isPeakHours && building.load < 55) {
            delta += Math.floor(Math.random() * 6);
          } else if (!isPeakHours && building.load > 40) {
            delta -= Math.floor(Math.random() * 6);
          }

          const rawLoad = (building.load || 50) + delta;
          const newLoad = Math.min(95, Math.max(5, rawLoad));

          // load < 60 = "optimal", 60-80 = "warning", > 80 = "critical"
          let status = 'optimal';
          if (newLoad > 80) {
            status = 'critical';
          } else if (newLoad >= 60) {
            status = 'warning';
          }

          return {
            ...building,
            load: newLoad,
            status,
          };
        });

        // Compute total load from updated buildings
        const newTotalLoad = updated.reduce(
          (sum, b) => sum + (Number(b.load) || 0),
          0
        );
        setCurrentLoad(newTotalLoad);

        // Carbon footprint (kg CO2 = load * 0.82)
        const newCarbon = +(newTotalLoad * 0.82).toFixed(1);
        setCarbonFootprint(newCarbon);

        // Today's cost update (₹/kWh = 8, incrementing smoothly with live consumption)
        setTodayCost((prevCost) => {
          const costDelta = (newTotalLoad * 8 * (3 / 3600));
          return Math.round((prevCost + costDelta) * 100) / 100;
        });

        return updated;
      });

      // 10% chance to add new alert to top of alerts array (cap at 6 alerts)
      if (Math.random() < 0.1) {
        const randomTemplate =
          POTENTIAL_ALERTS[Math.floor(Math.random() * POTENTIAL_ALERTS.length)];
        const timeString = new Date().toLocaleTimeString('en-US', {
          hour12: false,
        });

        const newAlert = {
          id: `alt-${Date.now()}`,
          type: randomTemplate.type,
          severity: randomTemplate.severity,
          message: randomTemplate.message,
          time: timeString,
        };

        setAlerts((prevAlerts) => [newAlert, ...prevAlerts].slice(0, 6));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    buildings,
    alerts,
    currentLoad,
    todayCost,
    carbonFootprint,
    hourlyData,
  };
}

export default useEnergySimulation;
