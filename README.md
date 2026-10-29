# ⚡ WattWise Campus
**AI & Digital Twin-Driven Smart Campus Energy Optimization Platform**

Built for the **KRUSHI & SMART CAMPUS IDEATHON** organized by Vemana Business Incubation Centre.

## 🚀 About the Project
WattWise Campus is a 100% software-based SaaS platform designed to transform traditional educational institutions into energy-efficient, carbon-neutral smart campuses. By processing simulated IoT telemetry, the system utilizes AI to predict energy loads, detect anomalies, and automate HVAC/lighting schedules. It features a WebGL 3D Digital Twin of the campus microgrid for real-time visualization.

## 🛠️ Tech Stack
*   **Frontend:** React (Vite), Tailwind CSS, Lucide React
*   **Data Visualization:** Recharts
*   **3D Digital Twin:** Three.js, @react-three/fiber, @react-three/drei
*   **State Management:** Custom React Hooks (Simulating live MQTT/WebSocket IoT feeds)

## 📊 Dashboard Features
1.  **Overview:** Real-time power consumption vs. AI prediction charts, live KPI metrics, and an anomaly feed.
2.  **3D Digital Twin:** Interactive WebGL simulation of campus buildings that change color (Green/Amber/Red) based on live energy loads.
3.  **AI Predictions:** Edge ML model monitoring, peak load forecasting, and dynamic scheduling status.
4.  **Anomaly Alerts:** Diagnostic logs for power spikes, voltage drops, and equipment degradation.
5.  **Reports:** Automated sustainability tracking and financial savings metrics.
6.  **Settings:** IoT MQTT broker configuration and alert threshold management.

## 💻 How to Run Locally
1. Clone the repository:
   `git clone https://github.com/sudarshaniyengar324-cloud/wattwise-campus.git`
2. Navigate to the folder:
   `cd wattwise-campus`
3. Install dependencies:
   `npm install`
4. Start the development server:
   `npm run dev`
5. Open `http://localhost:5173` in your browser.
