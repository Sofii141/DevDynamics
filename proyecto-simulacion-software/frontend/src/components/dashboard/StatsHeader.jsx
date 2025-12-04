import React from 'react';
import { Activity, Bug, CheckCircle, Users } from 'lucide-react';
import StatCard from '../ui/StatCard'; 

export default function StatsHeader({ stats, activeAgents, totalAgents }) {
  return (
    <header className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Puntos Completados" 
        value={stats.completed}    
        subValue={`/ ${stats.total}`} 
        icon={CheckCircle} 
        color="text-emerald-400" 
        bg="bg-emerald-500/10" 
        border="border-emerald-500/20"
      />
      <StatCard 
        title="Bugs Totales" 
        value={stats.bugs} 
        icon={Bug} 
        color="text-rose-400" 
        bg="bg-rose-500/10" 
        border="border-rose-500/20"
      />
      <StatCard 
        title="Estrés Promedio" 
        value={`${stats.avgStress.toFixed(1)}%`} 
        icon={Activity} 
        color="text-amber-400" 
        bg="bg-amber-500/10" 
        border="border-amber-500/20"
      />
      <StatCard 
        title="Desarrolladores Activos" 
        value={activeAgents} 
        subValue={`/ ${totalAgents}`} 
        icon={Users} 
        color="text-cyan-400" 
        bg="bg-cyan-500/10" 
        border="border-cyan-500/20"
      />
    </header>
  );
}