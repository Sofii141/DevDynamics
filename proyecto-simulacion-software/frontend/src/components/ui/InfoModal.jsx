import React from 'react';
import { X, Clock, Zap, Users, AlertTriangle, BookOpen } from 'lucide-react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="text-cyan-400" size={24} />
              Modelo de Simulación v3.1
            </h2>
            <p className="text-slate-400 text-xs uppercase tracking-wider mt-1">Calibrado con Métricas ISBSG & Capers Jones</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-slate-300">
          
          {/* Sección 1: Calibración */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-3">
              <Clock className="text-amber-400" size={20} />
              Base Científica de la Velocidad
            </h3>
            <p className="text-sm leading-relaxed mb-2">
              El modelo asume <strong>1 Tick = 1 Día Laboral</strong>. La productividad se ha ajustado según datos de <em>Capers Jones (Software Engineering Best Practices)</em>:
            </p>
            <ul className="list-disc list-inside text-sm space-y-2 text-slate-400 ml-2 mt-2">
              <li>
                <span className="text-cyan-300 font-mono">Senior Dev:</span> ~0.7 Puntos de Función (PF) / día.
                <span className="block text-xs text-slate-500 ml-5">Equivale a ~14 PF/mes (Alta productividad).</span>
              </li>
              <li>
                <span className="text-indigo-300 font-mono">Junior Dev:</span> ~0.35 PF / día.
                <span className="block text-xs text-slate-500 ml-5">Equivale a ~7 PF/mes.</span>
              </li>
              <li>
                <strong>Resultado esperado:</strong> 500 PF con 20 desarrolladores mixtos debería tomar entre 50 y 70 días (ticks).
              </li>
            </ul>
          </div>

          {/* Sección 2: Dinámicas de Equipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
              <h4 className="text-rose-300 font-medium flex items-center gap-2 mb-2 text-sm">
                <Users size={16} /> Ley de Brooks (No Lineal)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                <em>"Añadir mano de obra a un proyecto retrasado lo retrasa más."</em>
                <br/><br/>
                Penalizamos la <strong>Sobrecarga de Coordinación</strong>: Si el equipo supera los 8 miembros, aplicamos una curva de <strong>Rendimientos Decrecientes</strong>.
                <br/><br/>
                No existe un tope artificial; con equipos masivos (ej. 100 devs), la eficiencia individual cae drásticamente debido al costo exponencial de comunicación.
              </p>
            </div>
            
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
              <h4 className="text-emerald-300 font-medium flex items-center gap-2 mb-2 text-sm">
                <Zap size={16} /> Energía y Desgaste
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                La energía se consume por <strong>Estrés (Presión)</strong> y por <strong>Frustración (Bugs)</strong>.
                <br/><br/>
                Un Senior gestiona mejor el estrés (Resistencia 1.0) que un Junior (Resistencia 0.7). Si llega a 0, entra en baja médica (<strong>Desgaste</strong>).
              </p>
            </div>
          </div>

          {/* Sección 3: Bugs y Deuda */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
             <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
              <AlertTriangle className="text-rose-400" size={20} />
              Calidad vs Velocidad
            </h3>
            <p className="text-sm text-slate-400">
              Los errores no siempre son visibles. Existe un mecanismo de <strong>Detección de Errores</strong>:
            </p>
            <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="text-cyan-400 block font-bold mb-1">SENIOR</span>
                    Detecta el 95% de sus propios errores al momento (Rework). Solo el 5% se convierten en Bugs reales.
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="text-indigo-400 block font-bold mb-1">JUNIOR</span>
                    Detecta el 80%. El 20% restante se escapa a producción (Bugs), generando Deuda Técnica que ralentiza a todo el equipo.
                </div>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors text-sm shadow-lg shadow-cyan-500/20"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}