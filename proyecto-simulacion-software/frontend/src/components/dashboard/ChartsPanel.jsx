import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs backdrop-blur-sm">
        <p className="text-slate-400 mb-2 font-mono">Día: {label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-slate-200 capitalize font-medium">{entry.name}:</span>
            <span className="font-mono text-white">{Number(entry.value).toFixed(1)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PanelBox = ({ title, children }) => (
  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl p-4 flex flex-col h-full relative overflow-hidden">
    <div className="flex items-center justify-between mb-4 pl-2 border-l-2 border-cyan-500/50">
       <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
    </div>
    <div className="flex-1 min-h-0 relative z-10">{children}</div>
  </div>
);

export default function ChartsPanel({ history }) {
  return (
    <div className="h-64 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-shrink-0 px-4 pb-4">
      <PanelBox title="Productividad">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorFeatures" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
            
            <XAxis dataKey="name" hide />
            
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="features" stroke="#10b981" fill="url(#colorFeatures)" strokeWidth={2} />
            <Area type="monotone" dataKey="bugs" stroke="#f43f5e" fill="url(#colorBugs)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </PanelBox>

      <PanelBox title="Estrés del Equipo">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
            <YAxis domain={[0, 100]} hide />
            
            <XAxis dataKey="name" hide />
            
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="stress" stroke="#fbbf24" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </PanelBox>
    </div>
  );
}