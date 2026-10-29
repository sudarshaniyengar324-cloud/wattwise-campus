import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Box } from '@react-three/drei';

function getBuildingColor(load) {
  const val = Number(load) || 0;
  if (val < 60) return '#10b981';
  if (val <= 80) return '#f59e0b';
  return '#ef4444';
}

function Building({ position, color, name, load }) {
  return (
    <group position={position}>
      <Box args={[2, 2.5, 2]} position={[0, 1.25, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Box>
      <Html position={[0, 3, 0]} center>
        <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded border border-slate-600 shadow-md whitespace-nowrap text-center pointer-events-none select-none">
          <div className="font-semibold">{name}</div>
          <div className="font-mono text-emerald-400 font-bold">
            {load ?? 0} kW
          </div>
        </div>
      </Html>
    </group>
  );
}

export function DigitalTwin({ buildings = [] }) {
  const academic = buildings?.find(
    (b) => b.name === 'Main Academic Block'
  ) || { name: 'Main Academic Block', load: 54 };

  const library = buildings?.find(
    (b) => b.name === 'Central Library'
  ) || { name: 'Central Library', load: 68 };

  const cse = buildings?.find(
    (b) => b.name === 'CSE Laboratory'
  ) || { name: 'CSE Laboratory', load: 45 };

  return (
    <div className="h-[600px] bg-campus-dark rounded-xl overflow-hidden relative border border-slate-700 shadow-xl">
      {/* Overlay label top-left */}
      <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-2 shadow-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>3D Campus Microgrid — Live Simulation</span>
      </div>

      {/* Legend overlay top-right */}
      <div className="absolute top-4 right-4 z-10 px-3 py-2 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-[11px] text-slate-300 flex items-center gap-3 shadow-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
          <span>Optimal (&lt;60kW)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
          <span>Warning (60-80kW)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
          <span>Critical (&gt;80kW)</span>
        </div>
      </div>

      {/* Interaction tip bottom-right */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-[11px] text-slate-400 pointer-events-none">
        <span>Left Drag: Rotate • Right Drag: Pan • Scroll: Zoom</span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}
        frameloop="always"
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Ground */}
        <Box args={[14, 0.1, 14]} position={[0, -0.05, 0]}>
          <meshStandardMaterial color="#1e293b" />
        </Box>

        {/* 3 Campus Buildings */}
        <Building
          position={[-3, 0, -2]}
          name={academic.name}
          load={academic.load}
          color={getBuildingColor(academic.load)}
        />

        <Building
          position={[3, 0, -1]}
          name={library.name}
          load={library.load}
          color={getBuildingColor(library.load)}
        />

        <Building
          position={[0, 0, 3]}
          name={cse.name}
          load={cse.load}
          color={getBuildingColor(cse.load)}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

export default DigitalTwin;
