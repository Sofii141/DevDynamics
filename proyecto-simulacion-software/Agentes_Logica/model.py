from mesa import Model
from mesa.time import RandomActivation
from mesa.space import MultiGrid
from Agentes_Logica.agents import Desarrollador

class OficinaDesarrollo(Model):
    def __init__(self, num_juniors, num_seniors, bug_prob, pressure, project_scope):
        super().__init__()
        self.schedule = RandomActivation(self)
        self.grid = MultiGrid(20, 20, torus=False)
        self.running = True
        
        self.backlog_total = project_scope    
        self.backlog_restante = project_scope 
        self.total_bugs = 0                   
        self.bugs_activos = 0                 
        
        self.bug_prob = bug_prob      
        self.pressure = pressure      
        
        id_counter = 0
        for _ in range(num_seniors):
            self.crear_agente(id_counter, "Senior")
            id_counter += 1
            
        for _ in range(num_juniors):
            self.crear_agente(id_counter, "Junior")
            id_counter += 1
            
    def crear_agente(self, uid, rol):
        a = Desarrollador(uid, self, rol)
        self.schedule.add(a)
        
        while True:
            x = self.random.randrange(self.grid.width)
            y = self.random.randrange(self.grid.height)
            if self.grid.is_cell_empty((x, y)):
                self.grid.place_agent(a, (x, y))
                break

    def step(self):
        if self.backlog_restante <= 0 and self.bugs_activos <= 0:
            self.running = False
            
        self.schedule.step()

    def registrar_bug(self):
        self.total_bugs += 1
        self.bugs_activos += 1
        pass
        
    def completar_tarea(self, puntos):
        if self.bugs_activos > 0 and self.random.random() < 0.7:
            self.bugs_activos = max(0, self.bugs_activos - 1)
            self.backlog_restante -= (puntos * 0.2)
        else:
            self.backlog_restante -= puntos