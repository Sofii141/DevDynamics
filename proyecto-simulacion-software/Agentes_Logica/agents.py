from mesa import Agent
import math

class Desarrollador(Agent):
    def __init__(self, unique_id, model, rol="Junior"):
        super().__init__(unique_id, model)
        self.rol = rol
        self.energia = self.random.randint(80, 100) 
        self.estado = "ACTIVE"
        
        self.xp = 0 if rol == "Junior" else 2000
        self.dias_en_desgaste = 0 
        
        # ==============================================================================
        # 1. CALIBRACIÓN DE VELOCIDAD
        # ==============================================================================
        if self.rol == "Senior":
            self.velocidad_base = 0.70  
            self.tasa_error_base = 0.01 
            self.resistencia_estres = 1.0
        else:
            self.velocidad_base = 0.35 
            self.tasa_error_base = 0.04 
            self.resistencia_estres = 0.7

    def step(self):
        if self.estado == "DESGASTE":
            self.gestionar_desgaste()
            return

        # ==============================================================================
        # 2. LEY DE BROOKS MEJORADA (MODELO NO LINEAL)
        # ==============================================================================
        # Fórmula: Eficiencia = 1 / (1 + (k * exceso))
        # Esto asegura que nunca llegue a 0 eficiencia, pero baje asintóticamente
        # a medida que agregas 100, 200 o 1000 desarrolladores.
        
        total_desarrolladores = self.model.schedule.get_agent_count()
        exceso_personal = max(0, total_desarrolladores - 8)
        
        # Factor k=0.05 implica que cada persona extra añade un "peso" al denominador.
        # Si exceso=0 -> penalizacion = 0
        # Si exceso=12 (Total 20) -> penalizacion ~0.37 (37%)
        # Si exceso=92 (Total 100) -> penalizacion ~0.82 (82%) -> Caos total realista.
        eficiencia_coordinacion = 1 / (1 + (exceso_personal * 0.05))
        factor_burocracia = 1.0 - eficiencia_coordinacion
        
        # Factor Ruido
        vecinos = self.model.grid.get_neighbors(self.pos, moore=True, include_center=False, radius=1)
        cantidad_vecinos = len([a for a in vecinos if isinstance(a, Desarrollador)])
        factor_ruido_local = cantidad_vecinos * 0.03

        # ==============================================================================
        # 3. ENERGÍA
        # ==============================================================================
        descanso_base = 1.5 - (self.model.pressure / 70)
        descanso_real = descanso_base * (1 - factor_burocracia)
        
        if descanso_real > 0:
            self.energia = min(100, self.energia + descanso_real)

        # Mentoria
        seniors_cerca = [a for a in vecinos if isinstance(a, Desarrollador) and a.rol == "Senior" and a.estado == "ACTIVE"]
        modificador_habilidad = 0
        velocidad_mentoria = 0 
        
        if self.rol == "Junior" and len(seniors_cerca) > 0:
            modificador_habilidad = 0.10 
            self.xp += 5 
        elif self.rol == "Senior":
            juniors_cerca = [a for a in vecinos if isinstance(a, Desarrollador) and a.rol == "Junior"]
            if len(juniors_cerca) > 0:
                velocidad_mentoria = 0.15 

        # Deuda Técnica
        ratio_bugs = self.model.total_bugs / (self.model.backlog_total + 10)
        factor_deuda = min(0.6, ratio_bugs) 

        # Ejecutar Tarea
        self.realizar_tarea(modificador_habilidad, velocidad_mentoria, factor_ruido_local + factor_burocracia, factor_deuda)
        
        # Upskilling
        if self.rol == "Junior" and self.xp > 500:
            self.rol = "Senior"
            self.velocidad_base = 0.60 
            self.tasa_error_base = 0.02

        if self.random.random() < 0.15: 
            self.mover()

    def realizar_tarea(self, mod_habilidad, costo_mentoria, penalizacion_total, factor_deuda):
        if self.model.backlog_restante <= 0:
            return

        # Cálculo de Velocidad con la nueva penalización no lineal
        eficiencia_ambiental = max(0.1, 1.0 - penalizacion_total) 
        eficiencia_codigo = max(0.1, 1.0 - factor_deuda)
        
        velocidad_real = (self.velocidad_base * eficiencia_ambiental * eficiencia_codigo) - costo_mentoria
        velocidad_real = max(0.0, velocidad_real)
        
        presion_normalizada = self.model.pressure / 100 
        factor_ambiente = self.model.bug_prob * 0.3 
        
        prob_error = self.tasa_error_base + factor_ambiente + (presion_normalizada * 0.15) - mod_habilidad
        prob_error = max(0.001, min(0.8, prob_error))
        
        if self.random.random() > prob_error:
            self.model.completar_tarea(velocidad_real)
            self.xp += 1
            self.consumir_energia(1.0 + (presion_normalizada * 0.5)) 
        else:
            chance_detection = 0.95 if self.rol == "Senior" else 0.80
            if self.random.random() > chance_detection:
                self.model.registrar_bug()
                self.consumir_energia(1.8) 
            else:
                self.consumir_energia(1.3)

    def consumir_energia(self, cantidad):
        factor_resistencia = 2.0 - self.resistencia_estres 
        self.energia -= (cantidad * factor_resistencia)
        
        if self.energia <= 0:
            self.energia = 0
            self.estado = "DESGASTE" 
            self.dias_en_desgaste = 0

    def gestionar_desgaste(self):
        self.dias_en_desgaste += 1
        self.energia += 5 
        if self.energia >= 90: 
            self.estado = "ACTIVE"
            self.dias_en_desgaste = 0

    def mover(self):
        posibles = self.model.grid.get_neighborhood(self.pos, moore=True, include_center=False, radius=1)
        w, h = self.model.grid.width, self.model.grid.height
        validos = [p for p in posibles if 0 <= p[0] < w and 0 <= p[1] < h]
        if validos:
            nuevo = self.random.choice(validos)
            if self.model.grid.is_cell_empty(nuevo):
                self.model.grid.move_agent(self, nuevo)

    def to_dict(self):
        return {
            "id": self.unique_id,
            "x": self.pos[0],
            "y": self.pos[1],
            "role": self.rol,
            "energy": round(self.energia, 1),
            "status": self.estado
        }