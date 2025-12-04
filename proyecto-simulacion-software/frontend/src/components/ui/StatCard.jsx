import React from 'react';

const StatCard = ({ title, value, subValue, icon, color, bg, border }) => {
  const Icon = icon;

  return (
    <div className="relative overflow-hidden rounded-xl p-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 flex items-start justify-between group hover:border-slate-600 transition-colors">
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">{value}</h2>
          {subValue && <span className="text-sm text-slate-500">{subValue}</span>}
        </div>
      </div>
      <div className={`p-3 rounded-lg ${bg} ${border} border shadow-inner transition-transform group-hover:scale-110`}>
        {/* Renderizado condicional: Solo renderiza si Icon existe */}
        {Icon && <Icon className={`w-6 h-6 ${color}`} />}
      </div>
    </div>
  );
};

export default StatCard;