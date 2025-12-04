# 🖥️ DevDynamics: Software Team Simulator

**DevDynamics** es una simulación académica basada en agentes (Agent-Based Modeling) diseñada para explorar las dinámicas complejas dentro de los equipos de desarrollo de software.

A diferencia de la gestión de proyectos lineal, este simulador considera variables humanas y sistémicas como la fatiga (desgaste), la comunicación (Ley de Brooks), la experiencia (Seniority) y la deuda técnica.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado-green)
![Python](https://img.shields.io/badge/Backend-Python%20%7C%20Mesa%20%7C%20Flask-blue)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind-cyan)

## 📋 Características del Modelo

El simulador permite configurar y visualizar en tiempo real:

*   **Ley de Brooks (No Lineal):** Modela cómo agregar más personal a un proyecto tarde lo retrasa más debido a la sobrecarga de coordinación.
*   **Gestión de Energía y Desgaste:** Los desarrolladores pueden entrar en baja médica si la presión excede su capacidad de recuperación.
*   **Seniority y Calidad:** Diferencia entre perfiles Junior y Senior en velocidad, tasa de errores y resistencia al estrés.
*   **Deuda Técnica:** Los bugs acumulados reducen la velocidad efectiva del equipo ("fricción").

## 🚀 Estructura del Proyecto

El proyecto está dividido en dos partes principales:

*   **Backend (`/Agentes_Logica` y `run.py`):** Lógica de simulación escrita en Python usando `Mesa` y expuesta vía API REST con `Flask`.
*   **Frontend (`/frontend`):** Interfaz de usuario interactiva construida con React, Recharts y Tailwind CSS.

## 🛠️ Instalación y Ejecución

Sigue estos pasos para correr el simulador en tu máquina local. Necesitarás dos terminales abiertas.

### Prerrequisitos
*   Python 3.8 o superior.
*   Node.js y npm.

### Paso 1: Configurar y Correr el Backend (Python)

1.  Abre una terminal en la carpeta raíz del proyecto.
2.  Crea y activa un entorno virtual (opcional pero recomendado):
    ```bash
    # En Windows
    python -m venv .venv
    .venv\Scripts\activate

    # En Mac/Linux
    python3 -m venv .venv
    source .venv/bin/activate
    ```
3.  Instala las dependencias necesarias:
    ```bash
    pip install mesa flask flask-cors
    ```
4.  Ejecuta el servidor desde la raíz:
    ```bash
    python run.py
    ```
    *Deberías ver un mensaje indicando que el servidor corre en `http://localhost:8000`.*

### Paso 2: Configurar y Correr el Frontend (React)

1.  Abre una **segunda terminal**.
2.  Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
3.  Instala las dependencias de Node:
    ```bash
    npm install
    ```
4.  Inicia la aplicación:
    ```bash
    npm run dev
    # O si usaste Create React App:
    # npm start
    ```
5.  Abre tu navegador en la dirección que te indique (usualmente `http://localhost:5173` o `http://localhost:3000`).

## 🧪 Escenarios de Prueba

El simulador está calibrado para probar los siguientes escenarios académicos:

1.  **Línea Base:** Comportamiento estable con presión media.
2.  **Ley de Brooks:** Demostración de rendimientos negativos al duplicar el equipo.
3.  **Impacto del Seniority:** Comparativa de eficiencia entre equipos Junior vs. Senior.
4.  **Marcha de la Muerte:** Efectos colaterales de mantener la presión al 100%.
5.  **Deuda Técnica:** Impacto de trabajar en entornos de alta complejidad (bugs).

## ✒️ Autor

**Ana Sofia Arango Yanza**
*   Facultad de Ingeniería Electrónica y Telecomunicaciones
*   Universidad del Cauca
*   Ingeniería de Sistemas

---
*Este proyecto fue desarrollado como parte del taller final de Teoría y Dinámica de Sistemas.*
