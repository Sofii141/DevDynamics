import React from 'react';
import { Play, Pause, RotateCcw, Settings, Cpu, Clock, Users } from 'lucide-react';

const InputSlider = ({ label, value, min, max, step = 1, onChange, format, extraInfo }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-sm items-end">
      <label className="text-slate-300 font-medium">{label}</label>
      <div className="text-right">
          <span className="text-cyan-400 font-mono">{format ? format(value) : value}</span>
          {extraInfo && <div className="text-[10px] text-slate-500">{extraInfo}</div>}
      </div>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
    />
  </div>
);

export default function Sidebar({ isPlaying, onTogglePlay, onReset, params, setParams, tick, config, setConfig }) {
  
  const numSeniors = Math.floor(params.agentCount * params.seniority);
  const numJuniors = params.agentCount - numSeniors;

  return (
    <aside className="w-80 flex-shrink-0 flex flex-col bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 h-screen z-20 shadow-2xl">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Cpu className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white"><span className="text-cyan-400">DevDynamics: </span>Software Team Simulator</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="flex gap-2">
          <button 
            onClick={onTogglePlay}
            disabled={tick >= config.deadline || params.projectScope <= 0} 
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm tracking-wide transition-all ${
              tick >= config.deadline
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : isPlaying 
                  ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/50' 
                  : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
            }`}
          >
            {isPlaying ? <><Pause size={16} /> PAUSA</> : <><Play size={16} /> {tick >= config.deadline ? 'FIN' : 'INICIAR'}</>}
          </button>
          <button 
            onClick={onReset}
            className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
            title="Reiniciar Simulación"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-800">
            <Users size={12} /> Composición del Equipo
          </h3>
          
          <InputSlider 
            label="Total Desarrolladores" value={params.agentCount} min={5} max={40} 
            onChange={(v) => setParams({...params, agentCount: v})}
          />
          
          <InputSlider 
            label="Seniority Ratio" value={params.seniority} min={0} max={1} step={0.1}
            format={(v) => `${(v * 100).toFixed(0)}% Seniors`}
            extraInfo={`${numSeniors} Seniors / ${numJuniors} Juniors`}
            onChange={(v) => setParams({...params, seniority: v})}
          />
        </div>

        <div className="space-y-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-800">
            <Settings size={12} /> Entorno del Proyecto
          </h3>

          <InputSlider 
            label="Alcance (PF)" value={params.projectScope} min={100} max={2000} step={50} 
            extraInfo="Puntos de Función (Capers Jones)"
            onChange={(v) => setParams({...params, projectScope: v})}
          />
          <InputSlider 
            label="Complejidad (Bugs)" value={params.bugProb} min={0} max={0.5} step={0.05}
            format={(v) => `${(v * 100).toFixed(0)}%`}
            onChange={(v) => setParams({...params, bugProb: v})}
          />
          <InputSlider 
            label="Presión Externa" value={params.difficulty} min={0} max={100} 
            onChange={(v) => setParams({...params, difficulty: v})}
          />
        </div>

        <div className="space-y-5">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-800">
            <Clock size={12} /> Simulación
          </h3>
          
          <InputSlider 
            label="Velocidad (ms)" value={config.speed} min={50} max={1000} step={50}
            format={(v) => `${v}ms`}
            onChange={(v) => setConfig({...config, speed: v})}
          />
        </div>
      </div>
      
      <div className="p-4 bg-slate-950/50 border-t border-slate-800">
        <div className="flex justify-between items-center text-xs font-mono mb-2">
           <span className={isPlaying ? "text-emerald-500 animate-pulse" : "text-slate-500"}>
             ● {isPlaying ? "EJECUTANDO" : "ESPERA"}
           </span>
           <span className="text-slate-400">DÍA: <span className="text-cyan-400">{tick} / {config.deadline}</span></span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
                className="h-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (tick / config.deadline) * 100)}%` }}
            />
        </div>
      </div>
    </aside>
  );
}