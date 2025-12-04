import React, { useState, useEffect, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import StatsHeader from './components/dashboard/StatsHeader';
import SimulationGrid from './components/dashboard/SimulationGrid';
import ChartsPanel from './components/dashboard/ChartsPanel';
import InfoModal from './components/ui/InfoModal';

const GRID_SIZE = 20;
const API_URL = "http://localhost:8000";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // === CONFIGURACIÓN INICIAL ===
  const [params, setParams] = useState({ 
    agentCount: 20, 
    seniority: 0.3, // 30% Seniors por defecto
    bugProb: 0.1,  
    difficulty: 40, 
    projectScope: 500 
  });
  
  const [config, setConfig] = useState({ deadline: 200, speed: 100 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [agents, setAgents] = useState([]);
  const [stats, setStats] = useState({ completed: 0, bugs: 0, remaining: 500, total: 500 });
  const [history, setHistory] = useState([]);
  const [tick, setTick] = useState(0);

  const avgStress = useMemo(() => {
    if (agents.length === 0) return 0;
    const totalEnergy = agents.reduce((acc, a) => acc + a.energy, 0);
    return 100 - (totalEnergy / agents.length);
  }, [agents]);

  const initModel = async (currentParams) => {
    try {
      await fetch(`${API_URL}/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentParams)
      });
      setTick(0);
      setHistory([]);
      setAgents([]);
      setStats({ 
        completed: 0, 
        bugs: 0, 
        remaining: currentParams.projectScope, 
        total: currentParams.projectScope 
      });
    } catch (error) {
      console.error("Error conectando con Python:", error);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    initModel(params);
  }, []);

  const handleParamChange = (newParams) => {
    setParams(newParams);
    if (!isPlaying) {
      initModel(newParams);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    initModel(params);
  };

  // Loop de simulación
  useEffect(() => {
    let interval;
    if (isPlaying) {
      if (tick >= config.deadline) {
          setIsPlaying(false);
          return;
      }

      interval = setInterval(async () => {
        try {
          const response = await fetch(`${API_URL}/step`);
          if (!response.ok) throw new Error("Error en el servidor");
          const data = await response.json();
          setAgents(data.agents);
          setStats(data.stats);

          setTick(t => {
            const newTick = t + 1;
            if (data.stats.remaining <= 0) {
                setIsPlaying(false);
            }
            if (newTick >= config.deadline) setIsPlaying(false);

            const currentStress = 100 - (data.agents.reduce((acc, a) => acc + a.energy, 0) / data.agents.length);
            
            // Solo actualizamos gráfico cada 3 ticks para mejor rendimiento
            if (newTick % 3 === 0 || data.stats.remaining <= 0) {
                setHistory(prev => [...prev, { name: newTick, features: data.stats.completed, bugs: data.stats.bugs, stress: currentStress || 0 }]);
            }
            return newTick;
          });
        } catch (error) {
          console.error("Error en el loop:", error);
          setIsPlaying(false); 
        }
      }, config.speed); 
    }
    return () => clearInterval(interval);
  }, [isPlaying, config.speed, config.deadline, tick]); 

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-200 selection:bg-cyan-500/30">
      <Sidebar 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)} 
        onReset={handleReset}
        params={params}
        setParams={handleParamChange}
        tick={tick}
        config={config}      
        setConfig={setConfig} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10"></div>

        <div className="relative">
          <StatsHeader 
            stats={{ ...stats, avgStress }} 
            activeAgents={agents.filter(a => a.status === 'ACTIVE').length} 
            totalAgents={agents.length} 
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute top-6 right-8 p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full transition-all hover:scale-110 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            title="Ver Reglas del Modelo"
          >
            <HelpCircle size={24} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto scroll-smooth">
          <SimulationGrid agents={agents} gridSize={GRID_SIZE} />
          <ChartsPanel history={history} />
        </div>
      </main>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;