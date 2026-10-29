import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function EnergyChart({ data }) {
  // Ensure data is valid with numeric actual and predicted
  const sanitizedData = Array.isArray(data)
    ? data.map((item) => ({
        time: item.time || '',
        actual: Number(item.actual) || 0,
        predicted: Number(item.predicted) || 0,
      }))
    : [];

  return (
    <div className="bg-campus-panel rounded-xl p-5 border border-slate-700 shadow-md flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Real-time Power vs AI Prediction</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            24-Hour campus load profile compared with Edge Neural Network inference
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-campus-green"></span>
          <span>Actual</span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-campus-cyan ml-2"></span>
          <span>AI Predicted</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sanitizedData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#334155' }}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#334155' }}
              unit=" kW"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: '#f8fafc',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
              itemStyle={{ color: '#f8fafc' }}
              formatter={(val, name) => [
                `${val} kW`,
                name === 'actual' ? 'Actual Load' : 'AI Prediction',
              ]}
            />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
            />

            <Area
              type="monotone"
              dataKey="actual"
              name="actual"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#actualGradient)"
            />

            <Area
              type="monotone"
              dataKey="predicted"
              name="predicted"
              stroke="#06b6d4"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EnergyChart;
