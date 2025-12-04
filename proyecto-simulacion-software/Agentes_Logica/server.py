from flask import Flask, jsonify, request
from flask_cors import CORS
from Agentes_Logica.model import OficinaDesarrollo

app = Flask(__name__)
CORS(app)

global_model = None

@app.route('/init', methods=['POST'])
def init_model():
    global global_model
    data = request.json
    
    agent_count = int(data.get('agentCount', 15))
    seniority_ratio = float(data.get('seniority', 0.3)) # Default 30% Seniors
    
    # Cálculo preciso de roles
    num_seniors = int(agent_count * seniority_ratio)
    num_juniors = agent_count - num_seniors
    
    bug_prob = float(data.get('bugProb', 0.1)) 
    pressure = int(data.get('difficulty', 50)) 
    scope = int(data.get('projectScope', 500))
    
    print(f"Iniciando: {num_juniors} Juniors, {num_seniors} Seniors, Alcance: {scope}")
    
    global_model = OficinaDesarrollo(num_juniors, num_seniors, bug_prob, pressure, scope)
    
    return jsonify({
        "message": "Modelo iniciado", 
        "config": {"juniors": num_juniors, "seniors": num_seniors}
    })

@app.route('/step', methods=['GET'])
def step():
    global global_model
    if global_model is None:
        return jsonify({"error": "Modelo no iniciado"}), 400
        
    global_model.step()
    
    agents_data = [agent.to_dict() for agent in global_model.schedule.agents]
    
    raw_completed = global_model.backlog_total - global_model.backlog_restante
    clean_completed = max(0, int(round(raw_completed)))

    stats = {
        "remaining": int(global_model.backlog_restante),
        "total": int(global_model.backlog_total),
        "completed": clean_completed, 
        "bugs": global_model.total_bugs
    }
    
    return jsonify({
        "agents": agents_data,
        "stats": stats
    })

if __name__ == '__main__':
    app.run(debug=True, port=8000)