from Agentes_Logica.server import app

if __name__ == '__main__':
    print("Servidor Python de Simulación corriendo en http://localhost:8000")
    app.run(debug=True, port=8000)