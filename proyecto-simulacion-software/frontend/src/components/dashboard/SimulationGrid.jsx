import React from 'react';
import { Skull, Zap, Code2 } from 'lucide-react';

export default function SimulationGrid({ agents, gridSize = 20 }) {
  return (
    <div className="flex-1 relative min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900/30 rounded-2xl border border-slate-800/50 m-4">
      <div className="relative p-4 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:40px_40px] rounded-xl pointer-events-none opacity-20"></div>

        <div 
          className="grid gap-1 relative z-10"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: '500px',
            height: '500px'
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) => (
             <div key={i} className="bg-slate-800/40 rounded-sm border border-slate-700/30" />
          ))}

          {agents.map((agent) => {
            const isDesgaste = agent.status === 'DESGASTE';
            
            let barColor = 'bg-emerald-500';
            if (agent.energy < 50) barColor = 'bg-amber-500';
            if (agent.energy < 25) barColor = 'bg-rose-500';

            return (
              <div
                key={agent.id}
                className="absolute transition-all duration-500 ease-in-out flex flex-col items-center justify-center z-20"
                style={{
                  left: `calc(${(Math.min(agent.x, gridSize - 1) / gridSize) * 100}% + 2px)`,
                  top: `calc(${(Math.min(agent.y, gridSize - 1) / gridSize) * 100}% + 2px)`,
                  width: `calc(${100/gridSize}% - 4px)`,
                  height: `calc(${100/gridSize}% - 4px)`
              }}
              >
                <div className={`w-full h-full flex flex-col items-center justify-center rounded-md shadow-lg transition-all relative ${
                  isDesgaste 
                    ? 'bg-slate-800 text-rose-500 border border-rose-900/50' 
                    : agent.role === 'Senior' 
                      ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                      : 'bg-indigo-900/40 text-indigo-300 border border-indigo-500/30' 
                }`}>
                  
                  {isDesgaste ? <Skull size={14} className="animate-pulse" /> : (agent.role === 'Senior' ? <Zap size={14} fill="currentColor" /> : <Code2 size={14} />)}
                  
                  <div className="absolute -bottom-1 w-[80%] h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                    <div 
                        className={`h-full transition-all duration-300 ${barColor}`}
                        style={{ width: `${agent.energy}%` }}
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}